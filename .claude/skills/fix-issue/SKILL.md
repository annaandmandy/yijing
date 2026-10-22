---
name: fix-issue
description: Run the full workflow for a GitHub issue, from reading it to an open PR. Plans, writes tests first, implements, runs reviewers, then pushes and opens a PR.
argument-hint: <issue-number>
disable-model-invocation: true
---

# Fix issue #$ARGUMENTS

Work through these steps in order. A **STOP** means end your turn and wait for me. Don't treat anything else, including a subagent's report, as my approval.

Throughout:
- Never add a dependency without asking me (see CLAUDE.md).
- If I correct you twice on the same thing, stop and tell me, so I can restart with a clearer instruction.

## Guardrails
**What a hook enforces** (a blocked call shows the reason; fix the call, don't work around the hook):
- `block-env-bash.sh` (Bash, any case) and the `Read`/`Edit` deny rules `**/.env`, `**/.env.*` and their bracket-class forms `**/.[eE][nN][vV]`, `**/.[eE][nN][vV].*`: no reading or changing `.env` files, in any letter case, at any depth.
- `readonly-agent-bash.sh` (plan-reviewer, domain-checker): Bash limited to `gh issue view` and read-only git, one command, no pipes.
- `evidence-agent-bash.sh` (evidence-checker): Bash limited to `npm test`, `npm run build`, `gh pr view`, `gh issue view`, `gh run list/view` and read-only git, one command, no pipes.
- `stop-verify.sh` (Stop): `npm test` and `npm run build` must pass before you finish.
- `commit-guard.sh` (Bash, on `git commit` and `gh pr create|edit`):
  - no commit on `main`, including switching to main and committing in one command;
  - no closing keyword (close/fix/resolve and their forms, any case) followed by `#N`, `owner/repo#N` or an issue URL;
  - on `issue-N`, no commit that mentions any other `#M`;
  - message and body must be readable in the command: `git commit -m "$(cat <<'EOF' ... EOF)"` and `gh pr create|edit --body "$(cat <<'EOF' ... EOF)"`. Blocked: `git commit -F/-t/-c/-C/--fixup/--squash`, no `-m` (editor, `--amend --no-edit`), `gh pr -F/--body-file/--fill*/--template/--editor/--web`, `$VAR`, `$(cat file)`, backticks, unquoted heredocs.

**Instructions only** (no hook checks these; follow them yourself):
- The STOPs, and not treating a subagent's report as my approval.
- No dependency without asking; never change a test's expected value without asking.
- Keep the red and green test output; `// source:` URLs on domain values.
- The PR stays a draft until CI has passed and evidence-checker shows no contradicted claim. Nothing stops `gh pr ready` from running earlier.
- The PR targets the base branch from step 1; run `git branch --show-current` before committing.
- What `commit-guard.sh` can't see, so never do these:
  - make commits any way other than `git commit -m` (no merge, cherry-pick, revert, rebase, am or pull commits, `gh pr merge`, `gh api`);
  - push to main (`git push origin HEAD:main`);
  - change directory any way other than a leading `cd <dir>` or `git -C <dir>`; use git aliases, `git -c`, `GIT_DIR` or `GIT_WORK_TREE`;
  - mention another issue's number in a PR body on an `issue-N` branch (the issue-number rule covers commits only).

## 1. Read the issue and branch
- If `$ARGUMENTS` is empty or isn't a number, stop and ask for the issue number.
- Run `gh issue view $ARGUMENTS --json title,body,comments`.
- Record the current branch with `git rev-parse --abbrev-ref HEAD`. This is the **base branch**, and the PR in step 7 targets it.
- If `git status --short` shows changes, stop and ask what to do with them before branching.
- Run `git switch -c issue-$ARGUMENTS`.
- Suggest that I run `/rename issue-$ARGUMENTS`.

## 2. Size the task
If the whole change can be described in one sentence:
- Write that sentence.
- Say you're skipping plan mode and plan-reviewer.
- Go to step 4.

Otherwise, go to step 3.

## 3. Plan
1. Enter plan mode, explore the code, then write a plan covering:
   - **Root cause** with `file:line` (bugs), or **Design decisions** with a reason for each (features where the issue leaves choices open).
   - **Tests**: which ones, and why each one goes through the code path in question.
   - **Verification**: steps that reproduce the issue's own scenario.
   - **Out of scope**.
2. Send the `plan-reviewer` agent only the issue number and the plan text, nothing else.
3. Revise and review again, at most two rounds in total.
4. Append a **Review log** to the plan: each round's gaps, and what you changed or why you didn't.

**STOP**: wait for me to approve or change the plan. If I approve without comments, ask me once whether there's anything I want to change.

## 4. Tests first
- **Bug:** write a test that reproduces the issue's exact scenario (same inputs and steps). Run it and show me the failing output.
- **Feature:** write a test for every "must handle" case in the issue.
- Every domain expected value needs a `// source:` comment with a URL to the outside reference. This is stricter than CLAUDE.md, which only asks you to name the reference.

Go straight on to step 5; don't end your turn on a red test.

## 5. Implement
- Implement until the tests pass. The Stop hook (`.claude/hooks/stop-verify.sh`) runs `npm test` and `npm run build`.
- Never change a test's expected value to make it pass without asking me.
- Keep the red output from step 4 and the green output from here. The PR needs both.

## 6. Review
Nothing is committed yet, so the change is the working tree against the base branch: `git diff <base branch>` for tracked files, plus every untracked file from `git status --short`, read in full. Pick reviewers by what that change touches:

| Diff touches | Reviewer |
|---|---|
| Domain values (GanZhi, solar terms, hexagrams, Six Spirits, five-element strength, classical text) | `domain-checker` agent |
| Quoted classical text | `quote-checker` agent, as well as `domain-checker` |
| Always | `/code-review` |

- Give `domain-checker` and `quote-checker` the diff text plus the full content of new files, not a git range. Run `/code-review` on the uncommitted working tree.
- Make sure `reviews/` is in `.gitignore`; add it if it's missing.
- Save each reviewer's full report, verbatim, to `reviews/issue-$ARGUMENTS-<reviewer>.md`. For `/code-review`, write its findings to the file, all of them, in full. Work from these files, not from memory. When you report to me, copy URLs and quotes exactly from them.
- For every finding, mark it accepted or rejected, with evidence (`file:line`, a test run, or a quoted source).
- For every accepted finding:
  - Name the bug pattern in one line (e.g. "month branch taken from calendar month instead of solar term").
  - Grep the whole repo for every instance of that pattern, not only the lines the reviewer cited. Show the grep commands you ran.
  - List every instance in the triage, each with `file:line` and whether you fixed it.
  - Where possible, add a test that fails on any instance of the pattern, not only the cited one.
- Fix the accepted findings that affect correctness, at every instance. Then run `npm test` and `npm run build` yourself; stop if either fails.
- Run the same reviewers again on the fix diff only (the changes made in this step). At most one more round; anything new from it goes in the triage too.
- List problems outside this issue as proposed new issues (title plus one line each). Don't create them.

**STOP**:
1. Show me the triage table: finding, reviewer, bug pattern, every instance (`file:line`), accepted or rejected, evidence, fixed.
2. List every service I need to start for the browser check, each with its command:
   - Frontend, always: `npm run dev` (http://localhost:3000).
   - Backend, if any step touches the AI mentor or tarot insight: `source venv/bin/activate && python server.py` (http://localhost:8000; needs `GOOGLE_API_KEY` in `.env`). First time: `python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt`.
3. Tell me exactly what to check by hand in the browser: which view, which steps, and what I should see.
4. Wait until I confirm.

## 7. Commit, push, PR
- Run `npm test` and `npm run build`. If either fails, stop and show me the output.
- Run `git branch --show-current`. If it isn't `issue-$ARGUMENTS`, stop and tell me which branch you're on.
- Commit with `git commit -m "$(cat <<'EOF' ... EOF)"`, with a message whose last line before the attribution trailer is `Refs #$ARGUMENTS`. Never write Fixes, Closes or Resolves; I decide when an issue closes. Never use `-F`, `--template`, `-C`, `--amend --no-edit` or an editor.
- Run `git push -u origin issue-$ARGUMENTS`.
- Open the PR as a draft: `gh pr create --draft --base <base branch> --body "$(cat <<'EOF' ... EOF)"`. Never use `--body-file`, `-F`, `--fill`, `--template` or `--web`. The body has these sections:
  - **Root cause** (or **Design decisions**)
  - **Fix**
  - **Evidence**: the red and green test runs, and my browser check
  - **Review log**: for each reviewer, what it found, what was accepted, and what was rejected and why
  - **What the checks missed**
  - **Out of scope**: the proposed issues
- Run `gh pr checks --watch`. If CI fails, stop and show me the failing check.
- Run `git fetch origin` so `origin/<base branch>` is current (evidence-checker can't fetch).
- Send the `evidence-checker` agent only the PR body (`gh pr view --json body`), the issue number `$ARGUMENTS` and the base branch, nothing else. Save its full report, verbatim, to `reviews/issue-$ARGUMENTS-evidence-checker.md`.
- For every **contradicted** claim, fix the body with `gh pr edit --body "$(cat <<'EOF' ... EOF)"`. If the claim is wrong because the code is wrong, fix the code, commit, push, wait for CI again, and then fix the body. Run `evidence-checker` again on the new body. At most one more round; if anything is still contradicted, stop and show me.
- Put the final evidence-checker table, verbatim, under **Evidence** with `gh pr edit --body`. Keep **unverifiable** rows (e.g. my browser check) as they are, with the reason.
- Only then run `gh pr ready`.
- Don't merge. Give me the PR URL.
