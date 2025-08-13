# `/git` + [prompt] command that will help you work with git

A focused, safe, and policy-compliant Git workflow that Claude Code executes through **git mcp server** when you run:

```
/git <prompt>
```

> **Goal:** Turn a natural-language task prompt into a clean, reviewable branch, a series of logically scoped commits, and (optionally) a pull request — all following the repository’s branch, commit, and release policies.

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

## What `/git` Does

1. **Read your prompt** and infer intent (feature, fix, refactor, docs, chore, etc.).
2. **Ensure you’re not on a protected branch** and **create a working branch** from the correct source (usually `main`, see rules below).
3. **Apply the changes** needed for the task, splitting them into **small, logical commits**.
4. **Format commit messages** using **Conventional Commits** (+ optional task key).
5. **Run basic checks** available locally (lint/tests/build) if configured.
6. **Push the branch** and (optionally) **open a PR** using the standard PR template.
7. **Never force-push**, **never commit secrets**, and **never push directly to protected branches**.

---

## Protected Branch Policy

The command **refuses to push** directly to any of the following:

- `main`, `master`, `release/*`, `hotfix/*`, `prod/*`

Pull requests into protected branches must satisfy repository rules (reviews and status checks). The command will open PRs but will not bypass required checks or reviews.

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

## Merge Strategy

- Into `main` and `release/*` → **Squash merge** (1 commit per PR in history).
- Working branches may have multiple commits as long as they are **logically separated**.
- The command **won’t merge** if required checks haven’t passed or if target is protected.

---

## Commit Message Format (Conventional Commits)

```
[KEY-123] <type>(<scope>)!: <short summary>

[optional body — reasoning, links, decisions]

[optional footer — BREAKING CHANGE: ..., Closes #...]
```

- `type ∈ {feature, fix, refactor, docs, chore, test, build, ci}`
- **Never commit secrets** or large binaries (use Git LFS if necessary).

`/git` auto-generates commit messages from your prompt and the change context; include a task/issue key in your prompt if you want it in the header.

---

## Releases & Versioning (SemVer)

- Recommend **semantic-release** or **changesets** automation.
- Auto-bump rules derived from commit types:
  - `feature:` → **minor**
  - `fix:` → **patch**
  - `feature!` or `BREAKING CHANGE:` → **major**

`/git` can open and maintain the `release/*` branch based on your prompt. It will not tag or publish unless CI is configured for that.

---

## Hotfix Policy

- Create `hotfix/<short-desc>` from `release/x.y.z` (preferred) or `main`.
- Open PR into the current release branch and **also** ensure changes are merged forward/back to `main`.

`/git` will enforce the two-path merge (release and main) when you request a hotfix.

---

## Pull Request Requirements

PR descriptions should include:

- **What changed** (short bullet list).
- **Context/motivation** and links to issues/specs.
- **How to test** (commands, scenarios, screenshots if relevant).
- **API/schema/migration** notes.
- **Checklist:** tests, lint, docs updated.

If the repository has `.github/pull_request_template.md`, `/git` will prefill the PR using that template.

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

## Examples

- **New feature (auth device flow):**
  ```
  /git Implement device authorization flow for OAuth
  ```
  - Creates `feature/auth/device-authorization` from `main`.
  - Makes incremental commits like:
    - `feature(auth): add device grant endpoint contracts`
    - `feature(auth): implement device code polling`
    - `test(auth): cover device flow edge cases`

- **Bug fix (payments rounding):**
  ```
  /git Fix rounding bug in VAT calculation (KEY-451)
  ```
  - Creates `fix/payments/rounding-bug` from `main`.
  - Commits:
    - `[KEY-451] fix(payments): correct VAT rounding to bankers rounding`
    - `[KEY-451] test(payments): add regression cases for .5 values`

- **Hotfix:**
  ```
  /git Hotfix production NPE in auth callback
  ```
  - Creates `hotfix/auth-callback-npe` from active `release/x.y.z` (or `main`).
  - Opens PR to the release branch and a follow-up sync to `main`.

---

## Safety Guards

- Detect and block **direct pushes** to protected branches.
- Disallow **force-push**.
- Warn or block on **large binary** additions without LFS.
- Refuse to commit files that look like **secrets**.
- Require successful local checks (if configured) **before opening PR**.

---

## Troubleshooting

- **Branch name rejected:** ensure it matches the regex policy above.
- **Checks failing:** fix lint/tests/build locally and re-run `/git`.
- **No PR opened:** check `--no-pr` flag or repository permissions.

---
