# Command Template for Claude Code

## File Header (Required)

```yaml
---
name: command-name                    # Required: Command identifier (lowercase, hyphens)
description: Brief one-line description of what this command does  # Required
allowed-tools: Tool1, Tool2, Tool3    # Required: Comma-separated list of allowed tools
argument-hints: [prompt]               # Optional: Expected argument types/formats
---
```

## Available Tools Reference

Common tools you can specify in `allowed-tools`:
- `Read` - Read files from the filesystem
- `Write` - Write/modify files
- `Bash (*)` - Execute any bash commands
- `Bash(git:*)` - Execute git-specific bash commands
- `mcp__sequential-thinking` - Sequential thinking analysis tool
- Other MCP tools as needed

## Command Structure

### 1. Instructions Section (Required)

```markdown
# Instructions

High-level description of the command's purpose and approach.

**Tools Usage:** (if using special tools)
- Describe how each tool will be used
- Reference documentation: `See @.claude/tools/[tool].md for details`
```

### 2. Usage Section (Required)

```markdown
## Usage

```
/command-name [arguments]
```

Describe argument patterns:
- `[prompt]` - Optional prompt/description
- `<required>` - Required parameter
- No arguments - What happens when run without arguments
```

### 3. Execution Flow (Required)

```markdown
## Execution

### Phase 1: [Phase Name]

#### Step 1: [Step Description]

Actions to perform:
```bash
# Example bash commands if needed
command --flag
```

Expected outcomes:
- What should happen
- What to check for

#### Step 2: [Next Step]

Continue with detailed steps...

### Phase 2: [Next Phase Name]

Structure subsequent phases similarly...
```

### 4. Output Format (Recommended)

```markdown
## Output Format

### Section Header with Emoji 📊
- **Key metric:** Value
- **Status:** Description

### Detailed Results

Format of the output the user will see:
1. **Item Name**
   - **Property:** Description
   - **Impact:** Measurement
   - **Details:** Additional information

### Summary Section
Total impact or final status message
```

### 5. Interactive Mode (Optional - if command supports dialogue)

```markdown
## Interactive Mode

When the command needs clarification, it enters interactive mode:

```dialogue
"Question or prompt for the user"
Options:
1. First option
2. Second option
3. Provide more details
```

User responses trigger different workflows...
```

### 6. Safety Guards (Optional - if handling sensitive operations)

```markdown
## Safety Guards

- List of checks performed before operations
- Protected resources or patterns
- Automatic rejections or warnings
- Rollback conditions
```

### 7. Examples Section (Highly Recommended)

```markdown
## Examples

### Example 1: [Use Case Name]
```
/command-name specific arguments
```
Expected behavior and output description

### Example 2: [Another Use Case]
```
/command-name different arguments
```
What this variation accomplishes

### No Arguments Example
```
/command-name
```
Default behavior or help display
```

### 8. Error Handling (Optional but recommended)

```markdown
## Error Handling

Common errors and solutions:
- **Error condition:** How to resolve
- **Missing requirements:** What to check
- **Validation failures:** Correction steps
```

### 9. Related Commands (Optional)

```markdown
## Related Commands

- `/related-command` - How it connects to this command
- `/another-command` - When to use instead or in combination
```