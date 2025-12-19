---
name: agent-creator
description: Create specialized Claude Code agents (subagents) with proper YAML frontmatter, tool permissions, and domain expertise. Use when: creating new agents, designing agent prompts, configuring agent tools and models. Triggers: create agent, new agent, agent template, subagent, agent design.
allowed-tools: Read, Write
---

# Agent Creator

Create specialized Claude Code agents in `.claude/agents/` directory.

**Template:** See `references/template.md` for YAML structure, format rules, tools, skills, models, color, and examples.

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

| Domain | Color |
|--------|-------|
| Frontend | blue |
| Backend | green |
| Security | red |
| Performance | yellow |
| Testing | purple |
| DevOps | gray |

## Step 3: Implement

Create file `.claude/agents/<name>.md` following @.claude/skills/agent-creator/references/template.md exactly.

**Important:** Follow Format Rules from template.md for YAML fields.

## Step 4: Validate

Check before saving:
- [ ] Name matches filename (kebab-case)
- [ ] Description explains when to use
- [ ] Tools minimal (only what needed)
- [ ] YAML format per template.md Format Rules
- [ ] Clear expertise boundaries
- [ ] Constraints defined

## Decision Rules

### Tool Restriction

Restrict tools when:
- Agent should only read, not modify
- Limited to specific commands (e.g., `Bash(git:*)`)
- Security-sensitive domain

Grant all tools when:
- General-purpose agent
- Needs full file system access
- Complex multi-step workflows