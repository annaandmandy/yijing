#!/usr/bin/env bash
# PreToolUse hook for browser-checker's Bash and Playwright tools.
# Bash: only the commands needed to start the app, check it's up, read the
# issue and keep screenshots, one command, no chaining, pipes, redirection or
# substitution. Playwright: the every-session rules in playwright-guard.sh
# (no .env in any argument, any case; localhost:3000/8000 only), plus, for
# this agent only, screenshots only under reviews/issue-N-browser/ and no
# evaluate/run_code. Exit 2 blocks; stderr goes to the agent.

input=$(cat)

if ! command -v jq >/dev/null 2>&1; then
  echo "Blocked: jq is required to check browser-checker's tool calls." >&2
  exit 2
fi

tool=$(printf '%s' "$input" | jq -r '.tool_name // empty')

block() {
  echo "Blocked: $1" >&2
  exit 2
}


case "$tool" in
  Bash)
    cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
    # Strip leading and trailing whitespace
    cmd="${cmd#"${cmd%%[![:space:]]*}"}"
    cmd="${cmd%"${cmd##*[![:space:]]}"}"
    case "$cmd" in
      *$'\n'*|*';'*|*'&'*|*'|'*|*'<'*|*'>'*|*'`'*|*'$'*)
        block "browser-checker runs one plain command at a time, no pipes, redirection, chaining or substitution." ;;
    esac
    case "$cmd" in
      "BROWSER=none npm run dev -- --strictPort" | \
      "venv/bin/python server.py" | \
      "curl -s http://localhost:3000/" | \
      "curl -s http://localhost:8000/" | \
      "ls -a")
        exit 0 ;;
    esac
    if printf '%s' "$cmd" | grep -Eq '^gh issue view [0-9]+ --json title,body,comments$' ||
       printf '%s' "$cmd" | grep -Eq '^(mkdir -p|ls) reviews/issue-[0-9]+-browser$'; then
      exit 0
    fi
    block "browser-checker may only run: 'BROWSER=none npm run dev -- --strictPort', 'venv/bin/python server.py', 'curl -s http://localhost:3000/', 'curl -s http://localhost:8000/', 'gh issue view <N> --json title,body,comments', 'mkdir -p reviews/issue-<N>-browser', 'ls reviews/issue-<N>-browser' or 'ls -a'."
    ;;

  mcp__plugin_playwright_playwright__browser_run_code_unsafe | mcp__plugin_playwright_playwright__browser_evaluate)
    block "browser-checker can't run arbitrary code in the browser or in Playwright. Use clicks, typing and snapshots."
    ;;

  mcp__plugin_playwright_playwright__*)
    # The rules that hold in every session: no .env (any case), localhost only.
    # Called here too, so this agent stays covered on its own.
    printf '%s' "$input" | "$(dirname "$0")"/playwright-guard.sh || exit 2

    if [ "$tool" = "mcp__plugin_playwright_playwright__browser_take_screenshot" ]; then
      file=$(printf '%s' "$input" | jq -r '.tool_input.filename // empty')
      # Accept the path relative to the project or absolute under it
      [ -n "$CLAUDE_PROJECT_DIR" ] && file=${file#"$CLAUDE_PROJECT_DIR"/}
      printf '%s' "$file" | grep -Eq '^reviews/issue-[0-9]+-browser/[A-Za-z0-9_-]+\.png$' ||
        block "screenshots must be saved as reviews/issue-<N>-browser/<name>.png (letters, digits, - and _ only)."
    fi
    exit 0
    ;;
esac

exit 0
