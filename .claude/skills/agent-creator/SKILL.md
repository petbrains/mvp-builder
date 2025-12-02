---
name: agent-creator
description: Create specialized Claude Code agents (subagents) with proper YAML frontmatter, tool permissions, and domain expertise. Use when: creating new agents, designing agent prompts, configuring agent tools and models. Triggers: create agent, new agent, agent template, subagent, agent design.
allowed-tools: Read, Write, Bash(*)
---

# Agent Creator

Create specialized Claude Code agents in `.claude/agents/` directory.

**Template:** See `references/template.md` for YAML structure, tools, and model options.

## Process

**ANALYZE → DESIGN → IMPLEMENT → VALIDATE**

## Step 1: Analyze

Determine agent requirements:
- What specific domain or task?
- What tools needed?
- What model appropriate?
- Clear trigger conditions?

## Step 2: Design

### Agent Type

| Type | Pattern | Example |
|------|---------|---------|
| Technical | `[technology]-expert` | `react-expert`, `postgres-expert` |
| Domain | `[domain]-specialist` | `security-specialist`, `performance-specialist` |
| Process | `[process]-agent` | `code-review-agent`, `refactor-agent` |

### Color by Domain

| Domain | Colors |
|--------|--------|
| Frontend | blue, cyan, teal |
| Backend | green, emerald |
| Security | red, crimson |
| Performance | yellow, orange |
| Testing | purple, violet |
| DevOps | gray, slate |

## Step 3: Implement

Create file in `.claude/agents/<name>.md`:

```markdown
---
name: <agent-name>
description: <when to use + specialization>
tools: <optional: specific tools>
model: <optional: sonnet/opus/haiku>
---

You are a [Role] specialist focused on [domain].

## Core Responsibilities
- [Primary task]
- [Secondary task]

## Approach
1. **Assess** - Analyze request
2. **Plan** - Develop approach
3. **Execute** - Implement solution
4. **Validate** - Verify result

## Domain Guidelines
[Specific instructions for this domain]

## Constraints
- Never [prohibited action]
- Always [required check]
```

## Step 4: Validate

Check before saving:
- [ ] Name matches filename (kebab-case)
- [ ] Description explains when to use
- [ ] Tools minimal (only what needed)
- [ ] Clear expertise boundaries
- [ ] Constraints defined

## Decision Rules

### Model Selection

| Task Type | Model | Why |
|-----------|-------|-----|
| Complex reasoning | `opus` | Deep analysis |
| Balanced tasks | `sonnet` | Default, good balance |
| Fast/simple | `haiku` | Speed priority |
| Match parent | `inherit` | Consistency |

### Tool Restriction

Restrict tools when:
- Agent should only read, not modify
- Limited to specific commands (e.g., `Bash(git:*)`)
- Security-sensitive domain

Grant all tools when:
- General-purpose agent
- Needs full file system access
- Complex multi-step workflows