# Git mcp commands:

### !`/mcp__git__git_add` - Add selected files to the index. Use to prepare minimal, atomic commits. 
**Params:**
- repo_path="./" 
- files=["<file1>", "<file2>", ...]

```xml
<example>
/mcp__git__git_add  repo_path="./"  files="[\"src/index.ts\", \"README.md\"]"
</example>
```

---

### !`/mcp__git__git_branch` - List branches (local/remote/all). Use for navigation and for filtering by commit containment via contains/not_contains.
**Params:**
- repo_path="./" 
- branch_type="all" 
- contains="<sha>" 
- not_contains="<sha>"

```xml
<example>
/mcp__git__git_branch  repo_path="./"  branch_type="all"
</example>
```

---

### !`/mcp__git__git_checkout` - Switch to an existing branch. Use to change the working context. 
**Params:**
- repo_path="./" 
- branch_name="<name>".

```xml
<example>
/mcp__git__git_checkout  repo_path="./"  branch_name="feature/ui/buttons"
</example>
```

---

### !`/mcp__git__git_commit` - Record staged changes with a message. Use frequently in small, logical steps. Returns commit hash. 
**Params:**
- repo_path="./" 
- message="..." 

```xml
<example>
/mcp__git__git_commit  repo_path="./"  message="[ABC-123] feat: add index bootstrap"
</example>
```

```xml
<bad_example>
/mcp__git__git_commit  repo_path="./"  message="fix"
</bad_example>
```

---

### !`/mcp__git__git_create_branch` - Create a new branch from a specific start point. Use to isolate tasks and experiments. **Params:**
- repo_path="./" 
- branch_name="<name>" 
- start_point="<sha|branch>"

```xml
<example>
/mcp__git__git_create_branch  repo_path="./"  branch_name="feature/ui/buttons" start_point="main"
</example>
```


```xml
<bad_example>
/mcp__git__git_create_branch  repo_path="./"  branch_name="Feature/X Big Thing"
</bad_example>
```

---

### !`/mcp__git__git_diff` - Compare the working copy or HEAD with a given branch/commit. Use to review differences between branches/history points. 
**Params:**
- repo_path="./" 
- target="<branch|commit>" 
- context_lines=3

```xml
<example>
/mcp__git__git_diff  repo_path="./"  target="main" context_lines="3"
</example>
```

---

### !`/mcp__git__git_diff_staged` - Review staged changes. Use right before committing.
**Params:**
- repo_path="./" 
- context_lines=3

```xml
<example>
/mcp__git__git_diff_staged  repo_path="./"  context_lines="3"
</example>
```

---

### !`/mcp__git__git_diff_unstaged` - Review unstaged changes precisely. Use before `git add` to double-check edits. 
**Params:**
- repo_path="./" 
- context_lines=3

```xml
<example>
/mcp__git__git_diff_unstaged  repo_path="./"  context_lines="3"
</example>
```

---

### !`/mcp__git__git_init` - Initialize a new repository at the target directory. Use once before starting work or to turn an existing folder into a Git repository.
**Params:**
- repo_path="<path>"

```xml
<example>
/mcp__git__git_init  repo_path="./" 
</example>
```

---

### !`/mcp__git__git_log` - Show commit history. Use to navigate changes and find a target revision. 
**Params:**
- repo_path="./" 
- max_count=10

```xml
<example>
/mcp__git__git_log  repo_path="./"  max_count="20"
</example>
```

---

### !`/mcp__git__git_reset` - Unstage files (without discarding local edits). Use to undo an accidental `git add`.
**Params:**
- repo_path="./"

```xml
<example>
/mcp__git__git_reset  repo_path="./" 
</example>
```

```xml
<bad_example>
/mcp__git__git_reset
</bad_example>
```

---

### !`/mcp__git__git_show` - Show the contents and metadata of a specific commit/object. Use to inspect a precise change. 
**Params:**
- repo_path="./" 
- revision="<sha|ref>"

```xml
<example>
/mcp__git__git_show  repo_path="./"  revision="HEAD~1"
</example>
```

---

### !`/mcp__git__git_status` - Show the working tree and index status. Use before diff/commit to assess pending changes.
**Params:**
- repo_path="<path>"

```xml
<example>
/mcp__git__git_status  repo_path="./" 
</example>
```

---
