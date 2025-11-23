---
name: git
description: Git workflow management with branch naming conventions, commit formatting, safety guards, and security compliance
allowed-tools: Bash(git:*)
---

**Template:** @.claude/skills/git/templates/git-template.md

# Git Workflow Skill

Based on git workflow rules, perform requested git operations using Bash commands based on user prompt.

**Important:** Follow all git operations, branch naming conventions, commit message formats, and safety checks.

## No Arguments / Help Mode

If invoked with no prompt or only whitespace, show help:

**Purpose:** Turn natural-language instruction into compliant Git workflow (create branch, make scoped commits, push, optionally open PR) respecting repository policies.

**Quick examples:**
- `create branch for new feature`
- `create commit`
- `push changes`

## Interactive Mode

When encountering ambiguous prompts, enter interactive mode:

```
"I see several possible actions:
1. Add new authentication method
2. Create new branch for update auth method
3. Commit updated auth method

Which matches your intent? (or provide more details)"
```

## Branch Naming Conventions

### Allowed Prefixes
`feature/`, `fix/`, `refactor/`, `docs/`, `chore/`, `hotfix/`, `release/`

### Format
- Standard: `<prefix>/<scope>/<description>`
- Special: `hotfix/<description>` or `release/<description>`

### Validation Regex
```regex
^(feature|fix|refactor|docs|chore)/[a-z0-9._-]+/[a-z0-9._-]+|(hotfix|release)/[a-z0-9._-]+$
```

### Source Rules
- `feature/`, `fix/`, `refactor/`, `docs/`, `chore/`: from `main`
- `hotfix/`: from `release/x.y.z` or `main`
- `release/`: from `main`

## Commit Message Format

`[KEY-123] <type>(<scope>): <summary>`

**Types:** `feature`, `fix`, `refactor`, `docs`, `chore`, `test`, `build`, `ci`

**Guidelines:**
- Summary ≤50 chars, imperative mood
- Include ticket number if applicable

## Protected Branch Policy

**NEVER push directly to:**
- `main`, `master`, `release/*`, `hotfix/*`, `prod/*`

Refuse operation and suggest feature branch + PR instead.

## Security & Compliance

### Secret Detection
Check for: API keys, tokens, credentials, private keys, `*.pem`, `*.key`, `*.env`, `credentials.*`, `secrets.*`

If detected:
1. Block operation
2. Warn about specific file
3. Suggest `.env.example`
4. Request explicit confirmation

### Additional Checks
- Warn on binaries >10MB, block >100MB
- Check CODEOWNERS for critical areas
- Prefer signed commits if enabled
- Respect secret scanners (detect-secrets, trufflehog)

## Safety Guards

- Block direct pushes to protected branches
- Disallow `force-push` except on personal branches
- Block amend if commit already pushed
- Pre-operation checks: uncommitted changes, current branch, intent

## Conflict Resolution

When merge conflicts occur:
- `resolve conflicts --interactive`
- `merge main with preview`

Auto-detect conflict types, suggest strategies, preview before applying.

## Workflow Commands

### Status Check
```bash
git status
git branch -a
```

### Create Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/auth/oauth-implementation
```

### Commit Changes
```bash
git diff
git add <files>  # or git add .
git commit -m "[KEY-123] feature(auth): implement OAuth 2.0 flow"
```

### Push Changes
```bash
git push -u origin feature/auth/oauth-implementation
```

## Troubleshooting

**Branch name rejected:** Ensure regex compliance, use lowercase/hyphens
**Merge conflicts:** Pull first, use resolution workflow
**Push rejected:** Pull and merge/rebase first
**Checks failing:** Fix lint/test/build locally

## Examples

### Feature Branch
**Input:** "Implement device authorization flow for OAuth"
**Branch:** `feature/auth/device-authorization`
**Commits:**
- `feature(auth): add device grant endpoint contracts`
- `feature(auth): implement device code polling`
- `test(auth): cover device flow edge cases`

### Bug Fix
**Input:** "Fix rounding bug in VAT calculation (KEY-451)"
**Branch:** `fix/payments/rounding-bug`
**Commits:**
- `[KEY-451] fix(payments): correct VAT rounding to bankers rounding`
- `[KEY-451] test(payments): add regression cases for .5 values`

### Creating PR
**Input:** "Create PR for authentication feature"
**Action:**
1. Push: `git push -u origin feature/auth/oauth-implementation`
2. Create PR with title, description, test plan, reviewers

## Implementation Notes

**State Management:** Track current branch, uncommitted changes, merge status

**Validation Pipeline:**
1. Validate branch name format
2. Check for secrets/credentials
3. Verify commit message format
4. Ensure not pushing to protected branch
5. Confirm tests pass (if applicable)

**User Communication:** Provide clear feedback, explain blocks, suggest alternatives, preview operations