# Claude Code Command Template

## Template

```markdown
---
# Optional YAML frontmatter for configuration
name: command-name                     # Optional: Uses filename if not specified
description: Brief one-line description # Optional: Uses first line if not specified
allowed-tools: Read, Write, Edit, Bash(git:*), Grep, Glob  # Optional: Inherits from conversation
argument-hint: [prompt]                 # Optional: Shows expected arguments in autocomplete
model: claude-3-5-sonnet-20241022     # Optional: Specific model (inherits from conversation)
disable-model-invocation: false        # Optional: Prevents SlashCommand tool from calling this
---

# Command Title

Brief description of what this command does (becomes description if not in frontmatter).

## Usage
/command-name [arguments]

**Argument patterns:**
- `[optional]` - Optional arguments in brackets
- `$ARGUMENTS` - Captures all arguments as single string
- `$1`, `$2`, `$3` - Individual positional arguments

## Task

Clear instructions for what Claude should do:

1. **Analyze** - Examine the provided context
2. **Execute** - Perform specific actions
3. **Report** - Summarize results

Be specific about expected behavior and constraints.

## Examples

### Basic Usage
/command-name

Runs with default behavior, processing current context.

### With Arguments
/command-name feature-branch

Processes specific branch or feature.

### Multiple Arguments
/command-name fix $1 --priority $2

Uses positional arguments for structured input.

## Error Handling (Optional)

Common issues and solutions:
- **Missing files:** Check paths and permissions
- **Invalid arguments:** Verify format and requirements
- **Tool permissions:** Ensure allowed-tools includes necessary permissions

## Safety Guards (Optional)

- Protected patterns: `*.env`, `secrets/*`, `credentials.json`
- Confirmation required for: Production changes, deletions
- Automatic backups: Before major modifications
```

## Configuration Fields

| Field                      | Required | Description                                                            |
|----------------------------|----------|------------------------------------------------------------------------|
| `name`                     | No       | Command identifier (uses filename if not specified)                    |
| `description`              | No       | Brief description shown in `/help` (uses first line if not specified) |
| `allowed-tools`            | No       | Comma-separated list of allowed tools (inherits from conversation)    |
| `argument-hint`            | No       | Expected arguments shown in autocomplete                              |
| `model`                    | No       | Specific model to use (inherits from conversation)                    |
| `disable-model-invocation` | No       | Prevents SlashCommand tool from calling this command                  |

## Available Tools

### File Operations
- `Read` - Read file contents
- `Write` - Create/overwrite files
- `Edit` - Modify specific file sections
- `MultiEdit` - Edit multiple files
- `Glob` - Find files by pattern
- `Grep` - Search file contents
- `LS` - List directories

### Bash Commands
- `Bash` - Execute any command (requires permissions)
- `Bash(git:*)` - Git commands only
- `Bash(npm:*)` - NPM commands only
- `Bash(npm run:*)` - NPM scripts only
- `Bash(docker:*)` - Docker commands only

### MCP Tools
- Format: `mcp__server_name__tool_name`
- Access any configured MCP server tools
- Tool availability depends on MCP server configuration

## Argument Variables

| Variable      | Description                              | Example Usage                     |
|---------------|------------------------------------------|-----------------------------------|
| `$ARGUMENTS`  | All arguments as single string          | `Fix issue: $ARGUMENTS`          |
| `$1`          | First positional argument               | `Review PR #$1`                  |
| `$2`          | Second positional argument              | `Priority: $2`                    |
| `$3`          | Third positional argument               | `Assign to: $3`                  |
| `${1:-default}` | Argument with default value           | `Branch: ${1:-main}`             |

## Special Syntax

| Syntax        | Description                              | Example                           |
|---------------|------------------------------------------|-----------------------------------|
| `!`command``  | Execute bash command and include output | `!`git status``                  |
| `@path`       | Include file or directory content       | `@src/utils.js`                  |
| `/command`    | Invoke another slash command            | Referenced in instructions        |

## Best Practices

1. **Single Purpose** - Each command should do one thing well
2. **Clear Naming** - Command name should indicate its function
3. **Minimal Tools** - Only request necessary permissions
4. **Dynamic Context** - Use `!` and `@` for current state
5. **Argument Documentation** - Explain expected formats
6. **Error Handling** - Anticipate common failures
7. **Test First** - Verify in safe environment
8. **Use Frontmatter** - Explicit configuration is better
9. **Provide Examples** - Show usage patterns

## Key Aspect

| Aspect          | Commands                              |
|-----------------|---------------------------------------|
| **Purpose**     | Single-turn prompt templates          |
| **Location**    | `.claude/commands/`                   |
| **Arguments**   | Supports `$ARGUMENTS`, `$1`, `$2`     |
| **Context**     | Runs in main conversation             |
| **Complexity**  | Simple, focused tasks                 |
| **Model**       | Can specify, usually inherits         |
| **Invocation**  | `/command-name args`                  |