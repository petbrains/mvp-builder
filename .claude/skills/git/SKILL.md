---
name: git
description: Git workflow with enforced branch naming, commit formatting, and security guards. Use when: creating branches, committing changes, pushing code, merging, resolving conflicts, creating PRs. Triggers: git operations, create branch, commit, push, merge, branch naming, commit message format.
allowed-tools: Bash(git:*)
---

# Git Workflow

Enforces repository conventions for branches, commits, and pushes.

**Conventions:** See @.claude/skills/git/references/conventions.md

## Process

**VALIDATE → EXECUTE → VERIFY**

## Decision Rules

### Branch Type
- New functionality → `feature/<scope>/<desc>`
- Bug fix → `fix/<scope>/<desc>`  
- Refactor → `refactor/<scope>/<desc>`
- Docs → `docs/<scope>/<desc>`
- Maintenance → `chore/<scope>/<desc>`
- Urgent fix → `hotfix/<desc>`
- Release → `release/<version>`

### Commit Type
- Feature → `feature(<scope>): ...`
- Fix → `fix(<scope>): ...`
- Refactor → `refactor(<scope>): ...`
- Test → `test(<scope>): ...`
- Docs → `docs(<scope>): ...`

### Source Branch
- feature/fix/refactor/docs/chore → from `main`
- hotfix → from `release/*` or `main`
- release → from `main`

## Safety Guards

### Block Operations
| Trigger | Action |
|---------|--------|
| Push to `main`/`master`/`release/*`/`prod/*` | Block → suggest PR |
| Force-push on shared branch | Block |
| Amend after push | Block → suggest new commit |
| Secret in diff (`*.pem`, `*.key`, `*.env`, API keys) | Block → warn |
| Binary >100MB | Block |

### Warn Only
- Binary >10MB

## Validation

Before commit/push:
1. Branch name matches convention?
2. Commit message format correct?
3. No secrets in staged files?
4. Not pushing to protected branch?

## Interactive Mode

When ambiguous, ask:
```
"Possible actions:
1. Create branch
2. Commit changes  
3. Push commits
Which matches your intent?"
```