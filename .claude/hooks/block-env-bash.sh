#!/usr/bin/env bash
# PreToolUse hook for Bash: block commands that reference .env files.
# Exit 2 blocks the tool call; stderr is shown to Claude as the reason.

input=$(cat)

if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
else
  # No jq: fall back to scanning the raw hook input
  cmd=$input
fi

# Match .env as a path component (.env, ./.env, src/.env.local, ".env")
# but not process.env, config.env, or .envrc. Case-insensitive: this volume
# is case-insensitive, so .ENV and .Env open the same file.
if printf '%s' "$cmd" | grep -Eiq '(^|[^A-Za-z0-9_])\.env([^A-Za-z0-9_-]|$)'; then
  echo "Blocked: this command references a .env file, which may contain secrets. Reading or modifying .env files via Bash is not allowed in this project. Ask the user to supply any needed values instead." >&2
  exit 2
fi

exit 0
