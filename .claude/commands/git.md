---
allowed-tools: git mcp
argument-hint: [prompt]
description: Implements a simple git workflow
---

## Context

- Use the instructions for mcp commands from @~/.claude/tools/git.md

## Your task

Based on the commands described in the context and rules described below, perform work with git mcp based on [prompt].

---

## No Prompt / Help Mode

If you run `/git` with **no prompt** (i.e., just `/git` or only whitespace), Claude Code will show a concise help message explaining the command’s purpose and how to use it, plus quick examples.

**Purpose:** Turn a natural-language instruction into a compliant Git workflow (create a branch, make scoped commits, push, and optionally open a PR) via **MCP Git**, respecting repository policies.

**Quick examples:**
- `/git create branch for new feature`
- `/git create commit`
- `/git push changes`

---

## Interactive Mode

When /git encounters ambiguous prompts, it enters interactive mode:
/git update auth system

→ "I see several possible actions:
   1. Add new authentication method
   2. Create new branch for update auth method
   3. Commit updated auth method
   
   Which one matches your intent? (or provide more details)"
This prevents incorrect assumptions and ensures the right workflow is chosen.

---

## Protected Branch Policy

The command **refuses to push** directly to any of the following:

- `main`, `master`, `release/*`, `hotfix/*`, `prod/*`

---

## Branch Naming Rules

Use one of the allowed prefixes:

```
feature/<scope>/<short-desc>
fix/<scope>/<short-desc>
refactor/<scope>/<short-desc>
docs/<scope>/<short-desc>
chore/<scope>/<short-desc>
hotfix/<short-desc>
release/<version>
```

- Lowercase letters, numbers, dot, dash, underscore only.
- Recommended regex policy for GitHub/GitLab:

```
^(?:
 (?:feature|fix|refactor|docs|chore)/[a-z0-9._-]+/[a-z0-9._-]+
|(?:hotfix|release)/[a-z0-9._-]+
)$
```

**Examples:** `feature/auth/device-flow`, `fix/payments/rounding-bug`, `release/1.4.0`.

### Source Branch

- `feature/*`, `fix/*`, `refactor/*`, `docs/*`, `chore/*`: **create from latest `main`**.
- `hotfix/*`: from active `release/x.y.z` if present, otherwise from `main`.
- `release/x.y.z`: from `main`.

When `/git` sees your prompt, it derives a branch name, ensures the correct source branch, and creates the new branch if needed.

---

## Commit Message Format (Conventional Commits)

```
[KEY-123] <type>(<scope>)!: <short summary>

[optional body — reasoning, links, decisions]

[optional footer — BREAKING CHANGE: ..., Closes #...]
```

- `type ∈ {feature, fix, refactor, docs, chore, test, build, ci}`

`/git` auto-generates commit messages from your prompt and the change context; include a task/issue key in your prompt if you want it in the header.

---

## Security & Compliance

- Respect **CODEOWNERS** for critical areas.
- Prefer **signed commits/tags** if enabled.
- Run or respect secret scanners (e.g., detect-secrets, trufflehog) in pre-commit/CI.
- `/git` will refuse to add files that match common secret patterns and will warn on large binaries.

Enhanced secret detection patterns:

- API keys, tokens, credentials
- Private keys and certificates
- Database connection strings
- Cloud service credentials

---

## Safety Guards

- Detect and block **direct pushes** to protected branches.
- Disallow **force-push**.
- Warn or block on **large binary** additions without LFS.
- Refuse to commit files that look like **secrets**.

---

## Troubleshooting

- **Branch name rejected:** ensure it matches the regex policy above.
- **Checks failing:** fix lint/tests/build locally and re-run `/git`.

---

## Conflict Resolution

When merge conflicts occur, /git provides smart resolution assistance:

- /git resolve conflicts --interactive
- /git merge main with preview

- Auto-detects conflict types (code, config, documentation)
- Suggests resolution strategies based on change patterns
- Preview mode shows merge result before applying
- Interactive guidance for complex conflicts with context

---

## Examples

```xml
<gitInstructions version="1.0">
  <example id="feature-auth-device-flow" kind="feature">
    <title>New feature (auth device flow)</title>
    <command>/git Implement device authorization flow for OAuth</command>
    <branch>
      <name>feature/auth/device-authorization</name>
      <from>main</from>
    </branch>
    <commits>
      <commit>feature(auth): add device grant endpoint contracts</commit>
      <commit>feature(auth): implement device code polling</commit>
      <commit>test(auth): cover device flow edge cases</commit>
    </commits>
  </example>
```

```xml
  <example id="bugfix-payments-rounding" kind="bugfix">
    <title>Bug fix (payments rounding)</title>
    <command>/git Fix rounding bug in VAT calculation (KEY-451)</command>
    <branch>
      <name>fix/payments/rounding-bug</name>
      <from>main</from>
    </branch>
    <tracking>
      <ticket system="Jira">KEY-451</ticket>
    </tracking>
    <commits>
      <commit>[KEY-451] fix(payments): correct VAT rounding to bankers rounding</commit>
      <commit>[KEY-451] test(payments): add regression cases for .5 values</commit>
    </commits>
  </example>
</gitInstructions>
```

---

