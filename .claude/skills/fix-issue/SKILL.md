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
- Fix the accepted findings that affect correctness. Then run `npm test` and `npm run build` yourself; stop if either fails.
- List problems outside this issue as proposed new issues (title plus one line each). Don't create them.

**STOP**:
1. Show me the triage table: finding, reviewer, accepted or rejected, evidence, fixed.
2. Tell me exactly what to check by hand in the browser: which view, which steps, and what I should see.
3. Wait until I confirm.

## 7. Commit, push, PR
- Run `npm test` and `npm run build`. If either fails, stop and show me the output.
- Run `git branch --show-current`. If it isn't `issue-$ARGUMENTS`, stop and tell me which branch you're on.
- Commit with a message whose last line before the attribution trailer is `Refs #$ARGUMENTS`. Never write Fixes, Closes or Resolves; I decide when an issue closes.
- Run `git push -u origin issue-$ARGUMENTS`.
- Run `gh pr create --base <base branch>`. The body has these sections:
  - **Root cause** (or **Design decisions**)
  - **Fix**
  - **Evidence**: the red and green test runs, and my browser check
  - **Review log**: for each reviewer, what it found, what was accepted, and what was rejected and why
  - **What the checks missed**
  - **Out of scope**: the proposed issues
- Don't merge. Give me the PR URL.
