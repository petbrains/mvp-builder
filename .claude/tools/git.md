# git_tool.md — Compact Git via Bash

> Minimal, token‑efficient cheat sheet for daily Git. Defaults assume `main` and one remote `origin`.

## Branch naming
- `feature/<scope>/<desc>` · `fix/<scope>/<desc>` · `refactor/<scope>/<desc>` · `docs/<scope>/<desc>` · `chore/<scope>/<desc>` · `hotfix/<desc>` · `release/<version>`  
- Allowed chars: `[a-z0-9._-]` (lowercase).  
- Regex: `^(?:(?:feature|fix|refactor|docs|chore)/[a-z0-9._-]+/[a-z0-9._-]+|(?:hotfix|release)/[a-z0-9._-]+)$`
- Start point: `feature|fix|refactor|docs|chore -> main`; `hotfix -> release/x.y.z or main`; `release/x.y.z -> main`.

## Commits (Conventional)
`[KEY-123] <type>(<scope>)!: <summary>` → body → footer (`BREAKING CHANGE: …`, `Closes #…`)  
`type ∈ {feature, fix, refactor, docs, chore, test, build, ci}`

## Init / Clone / Remote
```bash
git init [<dir>]                          # new repo
git clone <url> [<dir>]                   # clone
git remote add origin <url>               # set remote
git remote -v                             # list remotes
```

## Status / Stage / Unstage
```bash
git status -s                             # short status
git add <path…> | -p | .                  # stage
git restore --staged <path…>              # unstage (safe)
git reset <path…>                         # unstage (legacy)
```

## Diff / Inspect
```bash
git diff [--staged]                       # changes
git diff <a>..<b> [-U<n>]                 # between refs
git show <ref>                            # object
git blame <file> [-L <start>,<end>]       # who/when
```

## Commit
```bash
git commit -m "<title>" [-m "<body>"]     # commit
git commit --amend [--no-edit]            # amend
git commit --fixup=<sha>                  # fixup
git rebase -i --autosquash <upstream>     # squash fixups
```

## Branches
```bash
git branch [-a|-r]                        # list
git switch <name>                         # change
git switch -c <name> [<start>]            # create
git branch -d <name> | -D <name>          # delete
git branch -m <new>                       # rename
```

## Sync (Fetch / Pull / Push)
```bash
git fetch --prune                         # update refs
git pull --rebase                         # update current
git push -u origin <branch>               # first push
git push                                  # subsequent
git remote prune origin                   # drop gone
```

## Merge / Rebase / Cherry‑pick / Revert
```bash
git merge <branch> [--no-ff]              # merge
git rebase main                           # rebase onto main
git rebase --continue | --abort           # flow
git cherry-pick <sha>                     # take commit
git revert <sha>                          # new inverse
```

## Stash
```bash
git stash push -m "<msg>"                 # save
git stash list                            # list
git stash show -p stash@{0}               # peek
git stash pop | apply                     # restore
git stash drop | clear                    # delete
```

## Logs
```bash
git log --oneline -n <N>                  # short
git log --graph --decorate --all          # topology
git shortlog -sn                          # authors
```

## Tags / Releases
```bash
git tag -a vX.Y.Z -m "msg"                # annotate
git tag                                   # list
git push origin vX.Y.Z                    # publish tag
git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z   # delete
```

## Undo / Clean  ⚠
```bash
git restore <path…>                       # discard unstaged (safe)
git reset --hard HEAD                     # reset tree to HEAD  # DANGER
git clean -fdx                            # drop untracked/ignored  # DANGER
```

## Useful one‑liners
```bash
git log --oneline --graph --decorate --all --date=relative   --pretty=format:'%C(auto)%h %d %s %Cgreen(%cr) %Cblue<%an>'
git diff --name-only <a>..<b>             # files changed
git rev-parse --short HEAD                # short SHA
```
