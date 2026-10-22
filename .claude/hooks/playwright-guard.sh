#!/usr/bin/env bash
# PreToolUse hook for every Playwright MCP tool, in every session (registered in
# .claude/settings.json; browser-checker-guard.sh also calls it).
# - No .env in any string argument (URLs, file paths, typed text), any case:
#   this volume is case-insensitive, so .ENV opens the same file.
# - Any URL must be http://localhost:3000, http://localhost:8000 or about:blank,
#   with no %-encoding, '..' or '@fs' (they can reach files outside the app).
#   This rules out file:// and every other scheme or host.
# Exit 2 blocks; stderr is shown to Claude as the reason.

input=$(cat)

if ! command -v jq >/dev/null 2>&1; then
  echo "Blocked: jq is required to check Playwright tool calls." >&2
  exit 2
fi

block() {
  echo "Blocked: $1" >&2
  exit 2
}

if printf '%s' "$input" | jq -r '.tool_input | .. | strings' | grep -Eiq '(^|[^A-Za-z0-9_])\.env([^A-Za-z0-9_-]|$)'; then
  block "this Playwright call references a .env file. Never read, open, upload or type .env (any case) through the browser."
fi

# Every "url" field anywhere in the input (browser_navigate, browser_tabs, ...)
urls=$(printf '%s' "$input" | jq -r '.tool_input | .. | objects | .url? // empty | strings')
while IFS= read -r url; do
  [ -z "$url" ] || [ "$url" = "about:blank" ] && continue
  printf '%s' "$url" | grep -Eq '^http://localhost:(3000|8000)(/.*)?$' ||
    block "Playwright may only open http://localhost:3000, http://localhost:8000 or about:blank (no file:// or other sites)."
  case "$url" in
    *%* | *..* | *@fs*) block "URLs with %-encoding, '..' or '@fs' are not allowed (they can reach files outside the app)." ;;
  esac
done <<EOF
$urls
EOF

exit 0
