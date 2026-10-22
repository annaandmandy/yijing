#!/usr/bin/env bash
# PreToolUse hook for Bash: guard `git commit` and `gh pr create|edit`.
# Exit 2 blocks the tool call; stderr is shown to Claude as the reason.
#
# Blocks:
# - a commit on main (branch read in the hook's cwd, after a leading `cd <dir>`
#   or `git -C <dir>`), or a command that switches to main and then commits;
# - a GitHub closing keyword (close/closes/closed, fix/fixes/fixed,
#   resolve/resolves/resolved, any case) followed by #N, owner/repo#N or an
#   issue URL, anywhere in a commit or gh pr command;
# - on a branch named issue-N, a commit command that mentions #M with M != N;
# - forms whose message or body this hook can't read: git commit -F/--file,
#   -t/--template, -c/-C/--reuse-message/--reedit-message, --fixup, --squash,
#   no -m (editor, or --amend reusing the old message); gh pr -F/--body-file,
#   --fill*, -T/--template, -e/--editor, -w/--web; any $VAR, $(...), backtick
#   or unquoted heredoc. The one allowed expansion is the quoted heredoc
#   git commit -m "$(cat <<'EOF' ... EOF)", whose text is in the command.
#
# Can't see (instructions only, see the fix-issue skill):
# - commits not made by `git commit`: merge, cherry-pick, revert, rebase, am,
#   pull, `gh pr merge` (its squash/merge message lands on main), `gh api`,
#   the GitHub web UI, anything run outside Claude;
# - `git push origin HEAD:main` and other pushes to main;
# - directory changes other than a leading `cd <dir>` or `git -C <dir>`,
#   git aliases, `git -c alias...`, GIT_DIR / GIT_WORK_TREE;
# - issue numbers in PR bodies on issue-N branches (that rule is commit-only).

input=$(cat)

if ! command -v jq >/dev/null 2>&1; then
  # No jq: can't read the command or cwd reliably, so fail closed for commits and PRs
  if printf '%s' "$input" | grep -Eq 'commit|gh[[:space:]]+pr'; then
    echo "Blocked: jq is required to check git commit and gh pr commands." >&2
    exit 2
  fi
  exit 0
fi

cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
cwd=$(printf '%s' "$input" | jq -r '.cwd // empty')
[ -n "$cwd" ] || cwd=$PWD

block() {
  echo "Blocked: $1" >&2
  exit 2
}

# Drop the bodies of quoted heredocs (<<'EOF' ... EOF): their text is literal.
heredoc_stripped=$(printf '%s\n' "$cmd" | awk -v q="'" '
  term != "" {
    line = $0; sub(/^\t+/, "", line)
    if (line == term) { term = ""; print line }
    next
  }
  {
    print
    if (match($0, "<<-?[ \t]*" q "[A-Za-z_][A-Za-z0-9_]*" q)) {
      t = substr($0, RSTART, RLENGTH); sub("^<<-?[ \t]*" q, "", t); sub(q "$", "", t)
      term = t
    }
  }')

# Blank the contents of quoted strings. mode=single blanks only '...';
# mode=all blanks '...' and "..." too.
blank_quotes() {
  awk -v mode="$1" -v sq="'" '
    {
      out = ""; q = ""; n = length($0)
      for (i = 1; i <= n; i++) {
        c = substr($0, i, 1)
        if (q == "") {
          if (c == sq || (mode == "all" && c == "\"")) q = c
          out = out c
        } else if (c == q) {
          q = ""; out = out c
        } else if (q == "\"" && c == "\\") {
          i++
        }
      }
      print out
    }'
}

# Command skeleton: heredoc bodies gone, quoted strings empty, one line
skeleton=$(printf '%s' "$heredoc_stripped" | tr '\n' ' ' | blank_quotes all)

set -f  # word-split the skeleton without globbing

dir=$cwd
switched_main=""
guarded=""
issue_branch=""

resolve_dir() {
  case "$1" in
    "" | '""' | "''") printf '' ;;
    /*) printf '%s' "$1" ;;
    *) printf '%s/%s' "$dir" "$1" ;;
  esac
}

check_commit() {
  local has_m="" arg letters branch
  [ -n "$switched_main" ] && block "this command switches to main and then commits. Never commit on main; commit on a feature branch."
  for arg in "$@"; do
    case "$arg" in
      --message | --message=*) has_m=1 ;;
      --file* | --template* | --reuse-message* | --reedit-message* | --fixup* | --squash*)
        block "git commit $arg takes the message from somewhere this hook can't read. Pass it with -m \"\$(cat <<'EOF' ... EOF)\"." ;;
      --*) ;;
      -?*)
        # Short-option cluster: letters up to the first m (the rest is -m's value)
        letters=${arg#-}
        letters=${letters%%m*}
        case "$letters" in
          *[FtcC]*) block "git commit $arg takes the message from somewhere this hook can't read. Pass it with -m \"\$(cat <<'EOF' ... EOF)\"." ;;
        esac
        case "${arg#-}" in *m*) has_m=1 ;; esac
        ;;
    esac
  done
  [ -n "$has_m" ] || block "git commit without -m opens an editor or reuses an old message, which this hook can't read. Pass the message with -m \"\$(cat <<'EOF' ... EOF)\"."

  branch=$(git -C "$dir" branch --show-current 2>/dev/null) || block "couldn't read the current branch in '$dir'. Run the commit from the repo on a named branch."
  [ -n "$branch" ] || block "couldn't read the current branch in '$dir' (detached HEAD?). Commit on a named branch."
  [ "$branch" = "main" ] && block "this commit would go on main. Never commit on main; commit on a feature branch."
  case "$branch" in
    issue-*) issue_branch=${branch#issue-} ;;
  esac
  # issue-12abc isn't an issue branch
  case "$issue_branch" in "" | *[!0-9]*) issue_branch="" ;; esac
}

check_pr() {
  local arg
  for arg in "$@"; do
    case "$arg" in
      --body-file* | --fill* | --template* | --editor | --web)
        block "gh pr $arg takes the body from somewhere this hook can't read. Pass it with --body \"\$(cat <<'EOF' ... EOF)\"." ;;
      --*) ;;
      -?*)
        case "${arg#-}" in
          *[FTew]*) block "gh pr $arg takes the body from somewhere this hook can't read. Pass it with --body \"\$(cat <<'EOF' ... EOF)\"." ;;
        esac
        ;;
    esac
  done
}

# Walk each simple command: split on ; & | and newlines
segments=$(printf '%s' "$skeleton" | tr ';&|' '\n\n\n')
while IFS= read -r seg; do
  # shellcheck disable=SC2086
  set -- $seg
  # Skip leading VAR=value assignments
  while [ $# -gt 0 ] && printf '%s' "$1" | grep -Eq '^[A-Za-z_][A-Za-z0-9_]*='; do shift; done
  [ $# -gt 0 ] || continue
  case "$1" in
    cd)
      dir=$(resolve_dir "$2")
      ;;
    git)
      shift
      gdir=$dir
      while [ $# -gt 0 ]; do
        case "$1" in
          -C) gdir=$(resolve_dir "$2"); shift 2 ;;
          -c) shift 2 ;;
          -*) shift ;;
          *) break ;;
        esac
      done
      sub=$1
      [ $# -gt 0 ] && shift
      case "$sub" in
        switch | checkout)
          for arg in "$@"; do [ "$arg" = "main" ] && switched_main=1; done
          ;;
        commit)
          guarded=1
          saved_dir=$dir
          dir=$gdir
          [ -n "$dir" ] && [ -d "$dir" ] || block "git -C or cd points at a directory this hook can't resolve. Run the commit from the repo directory."
          check_commit "$@"
          dir=$saved_dir
          ;;
      esac
      ;;
    gh)
      if [ "$2" = "pr" ] && { [ "$3" = "create" ] || [ "$3" = "edit" ]; }; then
        guarded=1
        shift 3
        check_pr "$@"
      fi
      ;;
  esac
done <<EOF
$segments
EOF

[ -n "$guarded" ] || exit 0

# Expansions this hook can't read. The quoted-heredoc opener $(cat <<'EOF' is allowed.
leftover=$(printf '%s' "$heredoc_stripped" | blank_quotes single \
  | sed -E "s/\\\$\\(cat[[:space:]]+<<-?[[:space:]]*'[^']*'//g")
case "$leftover" in
  *'$'* | *'`'* | *'<<'*)
    block "the message or body uses \$VAR, \$(...), backticks or an unquoted heredoc, which this hook can't read. Write the text into the command, with -m/--body \"\$(cat <<'EOF' ... EOF)\"." ;;
esac

# Closing keywords anywhere in the command, heredoc bodies included
if printf '%s' "$cmd" | grep -Eiq '(^|[^[:alnum:]_])(close[sd]?|fix(e[sd])?|resolve[sd]?)[[:space:]]*:?[[:space:]]*([[:alnum:]_.-]+/[[:alnum:]_.-]+)?#[0-9]+|(^|[^[:alnum:]_])(close[sd]?|fix(e[sd])?|resolve[sd]?)[[:space:]]*:?[[:space:]]*https?://github\.com/[^[:space:]]+/issues/[0-9]+'; then
  block "a closing keyword (Fixes/Closes/Resolves and their forms) is followed by an issue reference. The user decides when an issue closes; use 'Refs #N' instead."
fi

# On issue-N, every #M in the command must be #N
if [ -n "$issue_branch" ]; then
  for ref in $(printf '%s' "$cmd" | grep -oE '#[0-9]+'); do
    [ "${ref#\#}" = "$issue_branch" ] || block "this commit on issue-$issue_branch mentions $ref. Reference only #$issue_branch on this branch."
  done
fi

exit 0
