# Git Workflow

Enforces repository conventions for branches, commits, and pushes.

## Conventions

### Branch Naming

**Format:** `<prefix>/<scope>/<description>`

**Prefixes:** `feature/`, `fix/`, `refactor/`, `docs/`, `chore/`, `hotfix/`, `release/`

**Regex:**
```regex
^(feature|fix|refactor|docs|chore)/[a-z0-9._-]+/[a-z0-9._-]+|(hotfix|release)/[a-z0-9._-]+$
```

**Examples:**
```
feature/auth/oauth-implementation
fix/payments/rounding-bug
hotfix/critical-security-patch
release/2.1.0
```

### Commit Format
```
[KEY-123] <type>(<scope>): <summary>
```

**Types:** `feature`, `fix`, `refactor`, `docs`, `chore`, `test`, `build`, `ci`

**Rules:**
- Summary ≤50 chars
- Imperative mood

**Examples:**
```
[KEY-123] feature(auth): implement OAuth 2.0 flow
[KEY-456] fix(payments): correct VAT rounding
refactor(api): extract validation middleware
```

## Decision Rules

### Source Branch
- feature/fix/refactor/docs/chore → from `main`
- hotfix → from `release/*` or `main`
- release → from `main`

### Protected Branches

Never push directly: `main`, `master`, `release/*`, `hotfix/*`, `prod/*`

## Secret Protection

### Protected Patterns

**Files (block commit):**
```
*.env, *.env.*, *.pem, *.key, *.p12, *.pfx, *.crt
credentials.*, secrets.*, *_secret.*, *.keystore
```

**Directories (block commit):** `.secrets/`, `.credentials/`

**Allowed exceptions:** `*.env.example`, `*.example`

### Pre-Commit Check

Before any commit, scan staged files:
```bash
git diff --cached --name-only
```

If protected pattern detected:
1. Add pattern to `.gitignore`
2. Unstage file: `git reset HEAD [file]`
3. Continue commit without secret

### .gitignore Management

If `.gitignore` missing — create with standard security block:
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

If `.gitignore` exists but missing pattern — append it.

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