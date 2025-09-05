# Git сommands:

## Branch Naming
Prefixes: `feature|fix|refactor|docs|chore|hotfix|release`
Format: `<prefix>/<scope>/<desc>` or `hotfix|release/<desc>`
Regex: `^(feature|fix|refactor|docs|chore)/[a-z0-9._-]+/[a-z0-9._-]+|(hotfix|release)/[a-z0-9._-]+$`

Source branches:
- `feature/fix/refactor/docs/chore`: from `main`
- `hotfix`: from `release/x.y.z` or `main`
- `release`: from `main`

## Commit Format
`[KEY-123] <type>(<scope>): <summary>`
Types: `feature|fix|refactor|docs|chore|test|build|ci`

## Commands

### Stage files
- `git add <files>` - specific files
- `git add .` - all changes
- `git add -p` - interactive

### List/manage branches
- `git branch [-r|-a]` - local/remote/all
- `git branch --[no-]contains <sha>` - filter by commit

### Change branch
- `git checkout <branch>`
- `git switch <branch>`

### Create & switch branch
- `git checkout -b <name> [<start>]`

### Record changes
- `git commit -m "<msg>"` - single line
- `git commit -m "<title>" -m "<body>"` - multi-line
- `git commit --amend` - modify last

### Compare changes
- `git diff [<ref>]` - unstaged/vs ref
- `git diff --staged` - staged changes
- `-U<n>` - context lines

### Initialize repo
- `git init [<path>]`

### Show history
- `git log --oneline -n <count>`
- `git log --stat -n <count>`
- `git log --graph --all`

### Unstage files
- `git reset [<file>]` - unstage
- `git reset --hard` - discard all (DANGER)

### Display commit
- `git show <ref>`

### Working tree status
- `git status [-s|--porcelain]`

### Upload commits
- `git push [-u origin <branch>]`

### Fetch & merge
- `git pull [--rebase]`

### Combine branches
- `git merge [--no-ff] <branch>`

### Store changes temporarily
- `git stash [save "<msg>"]`
- `git stash pop|list`