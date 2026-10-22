#!/usr/bin/env bash
# PreToolUse hook for the read-only subagents' Bash tool (plan-reviewer, domain-checker).
# Allows only `gh issue view` and read-only git subcommands, with no chaining,
# pipes, redirection or substitution. Exit 2 blocks; stderr goes to the agent.

input=$(cat)

if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
else
  echo "Blocked: jq is required to check this agent's Bash commands." >&2
  exit 2
fi

deny() {
  echo "Blocked: this agent may only run 'gh issue view ...' or read-only git (status, diff, log, show, blame, grep, ls-files, rev-parse), one command, no pipes/redirection/chaining. Use Read, Grep or Glob instead." >&2
  exit 2
}

# One plain command only: no newlines, ; & | < > ` $( or other substitution
case "$cmd" in
  *$'\n'*|*';'*|*'&'*|*'|'*|*'<'*|*'>'*|*'`'*|*'$'*) deny ;;
esac

# Strip leading whitespace
cmd="${cmd#"${cmd%%[![:space:]]*}"}"

if printf '%s' "$cmd" | grep -Eq '^gh[[:space:]]+issue[[:space:]]+view([[:space:]]|$)'; then
  exit 0
fi

if printf '%s' "$cmd" | grep -Eq '^git[[:space:]]+(status|diff|log|show|blame|grep|ls-files|rev-parse)([[:space:]]|$)'; then
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
