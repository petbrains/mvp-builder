# Agent Template

## YAML Frontmatter

```yaml
---
name: agent-name           # Required: lowercase, hyphens only
description: When to use   # Required: trigger conditions
tools: Read, Write, Bash   # Optional: COMMA-SEPARATED, single line
skills: skill1, skill2     # Optional: COMMA-SEPARATED, single line
model: sonnet              # Optional: sonnet/opus/haiku/inherit
color: blue                # Optional: display color in UI
---
```

## Format Rules

**CRITICAL: tools and skills must be comma-separated on a single line.**

| Field | Format | ✓ Correct | ✗ Wrong |
|-------|--------|-----------|---------|
| `tools` | Comma-separated, single line | `tools: Read, Write, Bash` | `tools:\n  - Read` |
| `skills` | Comma-separated, single line | `skills: git, context7` | `skills:\n  - git` |

```yaml
# ✓ CORRECT FORMAT
tools: Read, Write, Edit, Bash(git:*)
skills: feature-analyzer, git, sequential-thinking

# ✗ WRONG FORMAT (YAML list with dashes)
tools:
  - Read
  - Write
skills:
  - feature-analyzer
```

## Required Fields

| Field | Format | Example |
|-------|--------|---------|
| `name` | kebab-case | `react-expert`, `security-specialist` |
| `description` | Natural language | "Use when optimizing React performance" |

## Optional Fields

| Field | Default | Options |
|-------|---------|---------|
| `tools` | All inherited | Comma-separated list |
| `skills` | None | Comma-separated skill names |
| `model` | sonnet | `sonnet`, `opus`, `haiku`, `inherit` |
| `color` | — | `blue`, `green`, `red`, `yellow`, `purple`, `cyan`, `gray` |

## Model Selection

| Model | Use Case |
|-------|----------|
| `opus` | Complex reasoning, deep analysis |
| `sonnet` | Balanced tasks (default) |
| `haiku` | Fast, simple tasks |
| `inherit` | Match parent conversation |

## Available Tools

### File Operations
| Tool | Description |
|------|-------------|
| `Read` | Read file contents |
| `Write` | Create/overwrite files |
| `Edit` | Modify file sections |
| `MultiEdit` | Edit multiple files |
| `Glob` | Find files by pattern |
| `Grep` | Search in files |
| `LS` | List directories |

### Execution
| Tool | Description |
|------|-------------|
| `Bash` | Any bash command |
| `Bash(git:*)` | Git only |
| `Bash(npm:*)` | NPM only |
| `Bash(docker:*)` | Docker only |

### MCP Tools
Format: `mcp__server__tool`

## Template Structure

```markdown
---
name: example-agent
description: Use when [specific condition]. Specializes in [domain].
tools: Read, Write, Edit, Bash
skills: feature-analyzer, git, sequential-thinking
model: sonnet
color: blue
---

You are a [Role] specialist focused on [specific domain].

## Core Responsibilities

- [Primary objective]
- [Types of problems solved]
- [Scope boundaries]

## Approach

1. **Assess** - Analyze request and context
2. **Plan** - Develop systematic approach
3. **Execute** - Implement step-by-step
4. **Validate** - Verify correctness
5. **Report** - Summarize results

## Domain Guidelines

### [Category 1]
[Specific instructions, patterns, standards]

### [Category 2]
[Implementation guidance]

## Constraints

- Never modify [protected resources]
- Always validate [conditions]
- Require confirmation for [sensitive operations]

## Error Handling

- If [condition], then [action]
- When [error], [response]
- For missing [requirement], [fallback]
```

## Examples

### Minimal Agent
```markdown
---
name: quick-review
description: Use for fast code reviews
model: haiku
color: purple
---

You are a code review specialist. Provide concise feedback on code quality, potential bugs, and improvements.

Focus on:
- Logic errors
- Security issues
- Performance problems

Keep reviews brief and actionable.
```

### Restricted Agent
```markdown
---
name: readonly-analyzer
description: Use for code analysis without modifications
tools: Read, Glob, Grep, LS
color: gray
---

You are a code analyzer. Examine codebases and provide insights.

## Constraints
- NEVER modify files
- Only read and analyze
- Report findings without implementing fixes
```

### Full Agent
```markdown
---
name: api-designer
description: Use when designing REST or GraphQL APIs
tools: Read, Write, Edit, Bash(npm:*)
skills: openapi-validator, backend-master
model: sonnet
color: green
---

You are an API design specialist focused on RESTful and GraphQL API architecture.

## Core Responsibilities
- Design consistent API schemas
- Define endpoint structures
- Create OpenAPI/GraphQL specifications

## Approach
1. **Assess** - Understand data models and use cases
2. **Design** - Create resource hierarchy
3. **Specify** - Write OpenAPI/GraphQL schema
4. **Validate** - Check consistency and standards

## API Guidelines
- Use plural nouns for resources
- Version APIs in URL path
- Consistent error response format
- HATEOAS where appropriate

## Constraints
- Follow REST conventions
- Validate against OpenAPI spec
- Document all endpoints
```