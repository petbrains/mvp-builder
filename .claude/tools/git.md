# Git mcp commands:

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
- Recommended regex policy:

```
^(?:
 (?:feature|fix|refactor|docs|chore)/[a-z0-9._-]+/[a-z0-9._-]+
|(?:hotfix|release)/[a-z0-9._-]+
)$
```

**Examples:** `feature/auth/device-flow`, `fix/payments/rounding-bug`, `release/1.4.0`.

---

## Source Branch

- `feature/*`, `fix/*`, `refactor/*`, `docs/*`, `chore/*`: **create from latest `main`**.
- `hotfix/*`: from active `release/x.y.z` if present, otherwise from `main`.
- `release/x.y.z`: from `main`.

---

## Commit Message Format (Conventional Commits)

```
[KEY-123] <type>(<scope>)!: <short summary>

[optional body — reasoning, links, decisions]

[optional footer — BREAKING CHANGE: ..., Closes #...]
```

- `type ∈ {feature, fix, refactor, docs, chore, test, build, ci}`

---

## Git Commands (Bash)

### !`git add` - Add selected files to the index. Use to prepare minimal, atomic commits.
**Usage:**
- `git add <file1> <file2> ...` - Add specific files
- `git add .` - Add all changes in current directory
- `git add -p` - Interactive staging (choose hunks)

```bash
<example>
git add src/index.ts README.md
</example>
```

---

### !`git branch` - List branches (local/remote/all). Use for navigation and for filtering by commit containment.
**Usage:**
- `git branch` - List local branches
- `git branch -r` - List remote branches  
- `git branch -a` - List all branches
- `git branch --contains <sha>` - Branches containing a commit
- `git branch --no-contains <sha>` - Branches NOT containing a commit

```bash
<example>
git branch -a
</example>
```

---

### !`git checkout` / `git switch` - Switch to an existing branch. Use to change the working context.
**Usage:**
- `git checkout <branch-name>` - Switch to branch
- `git switch <branch-name>` - Modern alternative to checkout

```bash
<example>
git checkout feature/ui/buttons
</example>
```

---

### !`git commit` - Record staged changes with a message. Use frequently in small, logical steps. Returns commit hash.
**Usage:**
- `git commit -m "<message>"` - Single line message
- `git commit -m "<title>" -m "<description>"` - Multi-line message
- `git commit --amend` - Amend last commit

```bash
<example>
git commit -m "[ABC-123] feat: add index bootstrap"
</example>
```

```bash
<bad_example>
git commit -m "fix"
</bad_example>
```

---

### !`git checkout -b` / `git branch` - Create a new branch from a specific start point. Use to isolate tasks and experiments.
**Usage:**
- `git checkout -b <branch-name> [<start-point>]` - Create and switch
- `git branch <branch-name> [<start-point>]` - Just create

```bash
<example>
git checkout -b feature/ui/buttons main
</example>
```

```bash
<bad_example>
git checkout -b "Feature/X Big Thing"
</bad_example>
```

---

### !`git diff` - Compare the working copy or HEAD with a given branch/commit. Use to review differences between branches/history points.
**Usage:**
- `git diff` - Unstaged changes
- `git diff <branch|commit>` - Compare with branch/commit
- `git diff -U<n>` - Show n lines of context (default 3)
- `git diff <branch1>..<branch2>` - Compare two branches

```bash
<example>
git diff main -U3
</example>
```

---

### !`git diff --staged` / `git diff --cached` - Review staged changes. Use right before committing.
**Usage:**
- `git diff --staged` - Show staged changes
- `git diff --staged -U<n>` - With n lines of context

```bash
<example>
git diff --staged -U3
</example>
```

---

### !`git diff` (unstaged) - Review unstaged changes precisely. Use before `git add` to double-check edits.
**Usage:**
- `git diff` - Show unstaged changes
- `git diff -U<n>` - With n lines of context

```bash
<example>
git diff -U3
</example>
```

---

### !`git init` - Initialize a new repository at the target directory. Use once before starting work or to turn an existing folder into a Git repository.
**Usage:**
- `git init` - Initialize in current directory
- `git init <path>` - Initialize in specific directory

```bash
<example>
git init
</example>
```

---

### !`git log` - Show commit history. Use to navigate changes and find a target revision.
**Usage:**
- `git log --oneline -n <count>` - Compact format
- `git log --stat -n <count>` - With file statistics
- `git log --graph --all` - Visual branch graph

```bash
<example>
git log --oneline -n 20
</example>
```

---

### !`git reset` - Unstage files (without discarding local edits). Use to undo an accidental `git add`.
**Usage:**
- `git reset` - Unstage all files
- `git reset <file>` - Unstage specific file
- `git reset --hard` - Discard all changes (DANGEROUS)

```bash
<example>
git reset
</example>
```

```bash
<bad_example>
git reset --hard  # Without understanding consequences
</bad_example>
```

---

### !`git show` - Show the contents and metadata of a specific commit/object. Use to inspect a precise change.
**Usage:**
- `git show <sha|ref>` - Show commit details
- `git show HEAD~1` - Show previous commit

```bash
<example>
git show HEAD~1
</example>
```

---

### !`git status` - Show the working tree and index status. Use before diff/commit to assess pending changes.
**Usage:**
- `git status` - Full status
- `git status -s` - Short format
- `git status --porcelain` - Machine-readable format

```bash
<example>
git status
</example>
```

---

### Additional Common Commands

### !`git push` - Push commits to remote repository.
**Usage:**
- `git push` - Push current branch
- `git push -u origin <branch>` - Push and set upstream
- `git push origin <branch>` - Push specific branch

```bash
<example>
git push -u origin feature/ui/buttons
</example>
```

---

### !`git pull` - Fetch and merge changes from remote.
**Usage:**
- `git pull` - Pull current branch
- `git pull --rebase` - Pull with rebase instead of merge

```bash
<example>
git pull --rebase
</example>
```

---

### !`git merge` - Merge another branch into current branch.
**Usage:**
- `git merge <branch>` - Merge branch
- `git merge --no-ff <branch>` - Force merge commit

```bash
<example>
git merge --no-ff feature/auth/device-flow
</example>
```

---

### !`git stash` - Temporarily store changes.
**Usage:**
- `git stash` - Stash changes
- `git stash pop` - Apply and remove latest stash
- `git stash list` - Show all stashes

```bash
<example>
git stash save "work in progress on auth"
</example>
```

---
