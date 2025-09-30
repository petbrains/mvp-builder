# Claude Code Agent (Subagent) Template

## Template

```markdown
---
# Required YAML frontmatter
name: agent-name                       # Required: Unique identifier (lowercase, hyphens)
description: When to use this agent     # Required: Clear trigger description for Claude
tools: Read, Write, Edit, Bash         # Optional: Specific tools (omit to inherit all)
model: sonnet                          # Optional: sonnet, opus, haiku, or inherit
---

# Agent System Prompt (Required)

You are a specialized [role] expert focused on [specific domain].

## Core Responsibilities

Define the agent's primary purpose and scope:
- Main objective and focus area
- Types of problems this agent solves
- Boundaries of what this agent should/shouldn't do

## Approach & Methodology

When invoked, follow this structured approach:

1. **Assess** - Analyze the request and context
2. **Plan** - Develop a systematic approach
3. **Execute** - Implement the solution step-by-step
4. **Validate** - Verify correctness and completeness
5. **Report** - Summarize findings and results

## Specific Instructions

### Analysis Phase
- How to examine the problem
- What to look for first
- Key patterns to identify

### Implementation Phase
- Best practices to follow
- Common pitfalls to avoid
- Quality standards to maintain

### Output Guidelines
- How to structure responses
- Level of detail required
- Format for presenting results

## Constraints & Safety

- Never modify [protected files/patterns]
- Always validate [specific conditions]
- Require confirmation for [sensitive operations]
- Respect existing [project conventions]

## Domain-Specific Knowledge

Include any specialized knowledge, formulas, or references:
- Technical specifications
- Industry standards
- Best practice guidelines
- Common patterns and anti-patterns

## Error Handling

How to handle common issues:
- If [condition], then [action]
- When encountering [error], [response]
- For missing [requirement], [fallback]

## Success Criteria

Define what constitutes successful completion:
- All tests passing
- No security vulnerabilities
- Performance benchmarks met
- Documentation updated
```

## Configuration Fields

| Field         | Required | Description                                                           |
|---------------|----------|-----------------------------------------------------------------------|
| `name`        | Yes      | Unique identifier using lowercase letters and hyphens                 |
| `description` | Yes      | Natural language description of when to use this agent                |
| `tools`       | No       | Comma-separated list of allowed tools (omit to inherit all)           |
| `model`       | No       | Model selection: `sonnet`, `opus`, `haiku`, or `inherit`              |

## Model Options

| Value     | Description                                    | Use Case                        |
|-----------|------------------------------------------------|---------------------------------|
| `sonnet`  | Claude 3.5 Sonnet (default if omitted)         | Balanced performance            |
| `opus`    | Claude 3 Opus                                  | Complex reasoning tasks         |
| `haiku`   | Claude 3 Haiku                                 | Fast, simple tasks              |
| `inherit` | Use main conversation's model                  | Consistency with parent context |

## Available Tools

### File Operations
- `Read` - Read file contents
- `Write` - Create/overwrite files  
- `Edit` - Modify specific file sections
- `MultiEdit` - Edit multiple files simultaneously
- `Glob` - Find files by pattern
- `Grep` - Search within file contents
- `LS` - List directory contents

### Execution Tools
- `Bash` - Execute any bash command (requires permission)
- `Bash(git:*)` - Git operations only
- `Bash(npm:*)` - NPM commands only
- `Bash(docker:*)` - Docker commands only

### MCP Tools
- Format: `mcp__server_name__tool_name`
- Access any configured MCP server tools
- Tool availability depends on MCP server configuration

## Best Practices

1. **Single Responsibility** - Each agent should excel at one specific domain
2. **Clear Triggers** - Description must clearly indicate when to use
3. **Proactive Behavior** - Use "PROACTIVELY" or "MUST BE USED" in descriptions
4. **Minimal Tools** - Only grant necessary tools for security
5. **Structured Prompts** - Use clear sections and methodology
6. **Error Handling** - Include fallback strategies and diagnostic steps
7. **Success Criteria** - Define clear completion conditions

## Key Aspect

| Aspect          | Agents                                |
|-----------------|---------------------------------------|
| **Purpose**     | Multi-turn specialized AI assistants  |
| **Location**    | `.claude/agents/`                     |
| **Arguments**   | No argument substitution              |
| **Context**     | Isolated context window               |
| **Complexity**  | Complex, multi-step workflows         |
| **Model**       | Can specify different model           |
| **Invocation**  | Automatic or "use agent-name"         |