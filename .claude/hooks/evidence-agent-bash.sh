#!/usr/bin/env bash
# PreToolUse hook for evidence-checker's Bash tool.
# Allows only `npm test`, `npm run build`, `gh pr view`, `gh issue view`,
# `gh run list`, `gh run view` and read-only git, with no chaining, pipes,
# redirection or substitution. Exit 2 blocks; stderr goes to the agent.

input=$(cat)

if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
else
  echo "Blocked: jq is required to check this agent's Bash commands." >&2
  exit 2
fi

deny() {
  echo "Blocked: evidence-checker may only run 'npm test', 'npm run build', 'gh pr view', 'gh issue view', 'gh run list', 'gh run view' or read-only git (status, diff, log, show, blame, grep, ls-files, rev-parse, rev-list, merge-base, cat-file, for-each-ref, ls-remote, branch listing), one command, no pipes/redirection/chaining. Use Read, Grep or Glob for files." >&2
  exit 2
}

# One plain command only: no newlines, ; & | < > ` $( or other substitution
case "$cmd" in
  *$'\n'*|*';'*|*'&'*|*'|'*|*'<'*|*'>'*|*'`'*|*'$'*) deny ;;
esac

# Strip leading and trailing whitespace
cmd="${cmd#"${cmd%%[![:space:]]*}"}"
cmd="${cmd%"${cmd##*[![:space:]]}"}"

# Exactly these two npm commands, no extra arguments
case "$cmd" in
  "npm test"|"npm run build") exit 0 ;;
esac

if printf '%s' "$cmd" | grep -Eq '^gh[[:space:]]+((pr|issue)[[:space:]]+view|run[[:space:]]+(list|view))([[:space:]]|$)'; then
  # --web opens a browser
  if printf '%s' "$cmd" | grep -Eq '(^|[[:space:]])(-w|--web)([[:space:]]|=|$)'; then
    deny
  fi
  exit 0
fi

if printf '%s' "$cmd" | grep -Eq '^git[[:space:]]+branch([[:space:]]|$)'; then
  # Listing only: no create, delete, rename, copy or upstream changes. A bare
  # name is allowed only as the argument of a filter option or with --list.
  set -f
  # shellcheck disable=SC2086
  set -- $cmd
  shift 2
  list=""
  for arg in "$@"; do [ "$arg" = "--list" ] || [ "$arg" = "-l" ] && list=1; done
  expect_value=""
  for arg in "$@"; do
    if [ -n "$expect_value" ]; then expect_value=""; continue; fi
    case "$arg" in
      --show-current|--list|-l|-a|--all|-r|--remotes|-v|-vv|--verbose|--no-color|--color|--color=*|--column|--no-column|--sort=*|--format=*|--contains=*|--no-contains=*|--merged=*|--no-merged=*|--points-at=*) ;;
      --contains|--no-contains|--merged|--no-merged|--points-at|--sort|--format) expect_value=1 ;;
      -*) deny ;;
      *) [ -n "$list" ] || deny ;;
    esac
  done
  exit 0
fi

if printf '%s' "$cmd" | grep -Eq '^git[[:space:]]+(status|diff|log|show|blame|grep|ls-files|rev-parse|rev-list|merge-base|cat-file|for-each-ref|ls-remote)([[:space:]]|$)'; then
  # Options that write files or run external programs
  if printf '%s' "$cmd" | grep -Eq '(^|[[:space:]])(--output(=|[[:space:]])|-o[[:space:]]|--ext-diff|--open-files-in-pager|-O)'; then
    deny
  fi
  # Options that read files outside the index or ignore .gitignore. git accepts
  # unique prefixes of long options (e.g. --untrack), so match by prefix.
  if printf '%s' "$cmd" | grep -Eq '(^|[[:space:]])--(no-in|unt|no-exc)[a-z-]*(=|[[:space:]]|$)'; then
    deny
  fi
  exit 0
fi

deny
