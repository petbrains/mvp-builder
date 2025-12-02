# Git Conventions

## Branch Naming

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

## Commit Format
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

## Protected Branches

Never push directly:
- `main`, `master`
- `release/*`, `hotfix/*`, `prod/*`

## Secret Patterns

Block commits containing:
- `*.pem`, `*.key`, `*.env`
- `credentials.*`, `secrets.*`
- API keys, tokens