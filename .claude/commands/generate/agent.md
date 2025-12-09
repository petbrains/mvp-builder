---
description: Generate specialized Claude Code agents from user intent and project context.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate specialized AI agents by analyzing user intent, loading project context, and clarifying requirements through targeted dialogue.

**Tools Usage:**
- `Read`: For loading skills, feature artifacts, project rules, existing agents
- `Write`: For creating agent file
- `Bash`: For running analyzer scripts, checking directories

**Skills:**
- Feature Analyzer: For loading complete feature context when path provided
- Code Analyzer: For scanning codebase structure, markers, git state
- Self-Improve: For interpreting user intent, extracting findings with sources
- Sequential Thinking Methodology: For synthesizing inputs and designing agent architecture
  - Tool: `/mcp__sequential-thinking__sequentialthinking`
- Prompt Optimizer: For structuring agent spec into TCRO format
- Agent Creator: For generating final agent file from spec

**File Structure:**
- Input: User description + optional feature path (via dialogue)
- Output: `.claude/agents/{agent-name}.md`

# Task

Transform user intent into specialized agent through context analysis and targeted clarification.
Derive maximum from context, ask minimum from user.
Generate agent following Agent Creator template structure.

# Rules

## Input Rules
- Description is REQUIRED — do not proceed without it
- Feature path is OPTIONAL — ask in dialogue if features exist
- No flags or special syntax — natural language input

## Skill Invocation
- Skills invoked by name: "Apply [Skill Name] skill"
- Skills know their own execution logic
- Pass relevant context to each skill

## Clarification Rules
- Present findings BEFORE asking questions
- Maximum 5 clarification points in single block
- Questions based on analysis, not generic
- Wait for user response before proceeding

## Sequential Thinking Usage
- ALWAYS apply after clarifications received
- Use for: synthesis, architecture design, validation
- Not optional — core part of pipeline

## Tool Assembly
Final `tools:` field combines:
1. File Operations (Read, Write, Edit, etc.)
2. Execution tools (Bash levels)
3. MCP tools (format: `mcp__server__tool`)

# Execution Flow

## Phase 0: Validate Input

### 0.1 Parse Description

Extract agent description from user message.

If empty or unclear:
```dialogue
"Agent description required. What task should this agent automate?

Example: 'bug fixer for React components'"
```

Wait for response. Do not proceed without description.

## Phase 1: Load Context

### 1.1 Code Context

**Apply Code Analyzer skill** to extract:
- Stack (language, framework, tools)
- Structure (directories, modules)
- Markers (AICODE-NOTE, TODO, FIX)
- Git state (branch, changes)

### 1.2 Feature Context

Check if `./ai-docs/features/` exists.

If exists:
```dialogue
"Found features: [list feature folder names]

Link agent to specific feature? (name / skip)"
```

If user provides feature name:

**Apply Feature Analyzer skill** to load:

**Core Documents:**
- spec.md → Requirements (FR-XXX, UX-XXX), acceptance criteria, edge cases
- ux.md → User flows, states, error handling, accessibility
- plan.md → Architecture, components, code organization
- tasks.md → TDD cycles, implementation sequence

**Data & Contracts:**
- data-model.md → Entities, validation rules, state machines, constants
- contracts/ → API specs, message schemas
  - openapi.yaml
  - contracts.md

**Supporting Documents:**
- research.md → Technical decisions, rationale
- setup.md → Environment, dependencies, commands

### 1.3 Available Skills

```bash
ls .claude/skills/*/SKILL.md 2>/dev/null
```

Parse skill names and descriptions. Keep in context for Phase 3.

## Phase 2: Analyze Intent

**Apply Self-Improve skill** with:
- Input: description + code context + feature context (if loaded)
- Output:
  - Intent (action, subject, implicit assumptions)
  - Findings with traceable sources
  - Gaps requiring clarification

## Phase 3: Clarify & Enrich

### 3.1 Present Analysis

```dialogue
"🔍 Analysis Complete

**Intent:** [interpreted action + subject]

**Findings:**
1. [discovery] → [source]
2. [discovery] → [source]
3. [discovery] → [source]

**Suggested Configuration:**
- Model: [haiku/sonnet/opus] — [one-line rationale]
- File Tools: [inferred list]
- Execution: [inferred Bash level]
```

### 3.2 Tools & Integration Clarification

```dialogue
"**Configuration**

1️⃣ **File Operations** (suggested: [list])
   Options: Read, Write, Edit, MultiEdit, Glob, Grep, LS
   → Adjust? (add/remove or 'ok')

2️⃣ **Execution** (suggested: [level])
   Options: Bash | Bash(git:*) | Bash(npm:*) | Bash(docker:*) | none
   → Adjust?

3️⃣ **Skills** (suggested: [list based on intent])
   Available: [parsed skill names]
   → Adjust?

4️⃣ **MCP Tools** (suggested: [list or none])
   Options: sequential-thinking, context7, [other detected]
   → Adjust?

5️⃣ **Additional requirements?**
   Domain knowledge, constraints, special behaviors...

Your input:"
```

Wait for user response.

### 3.3 Synthesize

**Apply Sequential Thinking Methodology** to:
- Combine: description + context + findings + tool selections
- Design workflow phases with clear objectives
- Map tools to specific responsibilities
- Define decision points and autonomous behaviors
- Plan error handling and recovery
- Validate architecture completeness

## Phase 4: Design Agent

**Apply Prompt Optimizer skill** to structure final agent specification.

### Derive Agent Properties

| Property | Source |
|----------|--------|
| name | intent.subject → kebab-case |
| description | intent + key findings summary |
| tools | file ops + execution + MCP combined |
| skills | user selections from Phase 3 |
| model | from analysis rationale |
| color | domain mapping (frontend→blue, backend→green, debug→red, devops→gray, security→red, test→purple) |

## Phase 5: Confirm & Generate

### 5.1 Final Summary

```dialogue
"📋 Agent Ready

**Name:** [name]
**Model:** [model]

**Tools:** [full assembled list]
**Skills:** [list or none]

**Responsibilities:**
- [primary responsibility]
- [secondary responsibility]
- [constraints/boundaries]

**Workflow:**
1. [Phase name] — [what it does]
2. [Phase name] — [what it does]
3. [Phase name] — [what it does]

Generate? (yes / modify / cancel)"
```

If user says "modify" — ask what to change, update spec, show summary again.

### 5.2 Check Name Availability

```bash
ls .claude/agents/[name].md 2>/dev/null
```

If file exists:
```dialogue
"Name '[name]' already taken.

Suggestions: [alternative-1], [alternative-2]
Or enter custom name:"
```

Wait for response. Use provided or selected name.

### 5.3 Generate Agent

**Apply Agent Creator skill** to generate `.claude/agents/[name].md`

Agent file includes:
- YAML frontmatter (name, description, tools, skills, model, color)
- Core Responsibilities section
- Approach & Methodology with workflow phases
- Specific Instructions per phase
- Autonomous Decision Criteria
- Domain-Specific Knowledge (if applicable)
- Constraints & Safety
- Error Handling
- Success Criteria

### 5.4 Complete

```dialogue
"✅ Created: .claude/agents/[name].md

To test: /[name] [task description]"
```

# Error Handling

| Situation | Action |
|-----------|--------|
| No description provided | Prompt for description, wait |
| Feature path not found | Warn, continue with code context |
| No code context available | Warn about limited analysis, continue |
| Skills directory missing | Note limitation, skip skill suggestions |
| Name collision | Offer alternatives, wait for choice |
| User cancels | "Agent creation cancelled." |
| User says "modify" | Ask what to change, loop to 5.1 |