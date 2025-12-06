---
name: git
description: Git workflow with enforced branch naming, commit formatting, secret protection, and safety guards. Use when: creating branches, committing changes, pushing code, merging, resolving conflicts, creating PRs. Triggers: git operations, create branch, commit, push, merge, branch naming, commit message format.
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

## Secret Protection

### Protected Patterns

**Files (block commit):**
```
*.env
*.env.*
*.pem
*.key
*.p12
*.pfx
*.crt
credentials.*
secrets.*
*_secret.*
*.keystore
```

**Directories (block commit):**
```
.secrets/
.credentials/
```

**Allowed exceptions:**
```
*.env.example
*.example
```

### Pre-Commit Check

Before any commit, scan staged files:

```bash
git diff --cached --name-only
```

If protected pattern detected:

```
⚠ Secret Protection

Detected secret file staged for commit:
  [filename]

Action: Adding to .gitignore and unstaging file.
```

Then:
1. Add pattern to .gitignore
2. Unstage file: `git reset HEAD [file]`
3. Continue commit without secret

### .gitignore Management

**If .gitignore doesn't exist:**

```
ℹ Creating .gitignore

Project has no .gitignore. Creating with security patterns.
```

Create with standard security block:

```gitignore
# Secrets - NEVER COMMIT
.env
.env.*
!.env.example
*.pem
*.key
*.p12
*.secret
.secrets/
.credentials/
```

**If .gitignore exists but missing pattern:**

Append missing pattern to existing .gitignore.

## Safety Guards

### Block Operations

| Trigger | Action |
|---------|--------|
| Push to `main`/`master`/`release/*`/`prod/*` | Block → suggest PR |
| Force-push on shared branch | Block |
| Amend after push | Block → suggest new commit |
| Secret file in staged changes | Block → update .gitignore |
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