#!/usr/bin/env bash
# Stop hook: run npm test and npm run build before Claude finishes.
# Exit 2 sends the failure output (stderr) back to Claude to fix.
# If Claude is already continuing because of this hook (stop_hook_active),
# don't block again: warn the user via systemMessage and exit 0.

input=$(cat)

if command -v jq >/dev/null 2>&1; then
  active=$(printf '%s' "$input" | jq -r '.stop_hook_active // false')
else
  # No jq: fall back to scanning the raw hook input
  if printf '%s' "$input" | grep -Eq '"stop_hook_active"[[:space:]]*:[[:space:]]*true'; then
    active=true
  else
    active=false
  fi
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0
export NO_COLOR=1 FORCE_COLOR=0

report=""
failed=""
for step in "test" "run build"; do
  if ! out=$(npm $step 2>&1); then
    failed="$failed, npm $step"
    report="$report
=== npm $step failed (last 60 lines) ===
$(printf '%s\n' "$out" | tail -n 60)
"
  fi
done

[ -z "$failed" ] && exit 0
failed=${failed#, }

if [ "$active" = "true" ]; then
  msg="Stop hook: $failed still failing after one fix attempt."
  if command -v jq >/dev/null 2>&1; then
    jq -n --arg m "$msg" '{systemMessage: $m}'
  else
    printf '{"systemMessage": "%s"}\n' "$msg"
  fi
  exit 0
fi

echo "Blocked: $failed failed. Fix the failures below before finishing.$report" >&2
exit 2
