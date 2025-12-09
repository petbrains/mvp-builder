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
- Self-Improve: For interpreting user intent, extracting findings with sources, assessing complexity
- Sequential Thinking Methodology: For deep analysis when complexity flagged
  - Tool: `/mcp__sequential-thinking__sequentialthinking`
- Prompt Optimizer: For structuring agent spec into TCRO format
- Agent Creator: For applying template and generating final agent file

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
- Maximum 6 configuration points in single block
- Questions based on analysis, not generic
- Wait for user response before proceeding

## Sequential Thinking Usage
- Apply when Self-Improve flags Complexity = "Needs analysis"
- Apply when user clarifications introduce new requirements
- Skip for simple agents with clear intent and obvious tools
- Use for: workflow design, decision points mapping, error handling

## Tool Inference Rules

**From intent keywords:**

| Pattern | Inferred File Tools |
|---------|---------------------|
| "analyze", "check", "review", "validate" | Read, Glob, Grep |
| "fix", "modify", "update", "patch" | Read, Edit |
| "create", "generate", "scaffold" | Read, Write |
| "refactor", "restructure" | Read, Edit, MultiEdit |
| "search", "find" | Read, Glob, Grep, LS |

| Pattern | Inferred Execution |
|---------|-------------------|
| "test", "lint", "format" | Bash(npm:*) |
| "commit", "branch", "merge", "blame" | Bash(git:*) |
| "deploy", "build", "docker" | Bash(docker:*) |
| "run", "execute", "script" | Bash |
| read-only intent | none |

**Model selection:**

| Signal | Model |
|--------|-------|
| Single-purpose, read-only, fast tasks | haiku |
| Multi-step workflow, file modifications | sonnet |
| Deep analysis, autonomous decisions, complex orchestration | opus |

**Color mapping:**

| Domain | Color |
|--------|-------|
| Frontend, UI, React, Vue | blue |
| Backend, API, database | green |
| Debug, fix, error | red |
| DevOps, deploy, CI/CD | gray |
| Security, audit | red |
| Testing, QA | purple |
| Documentation | cyan |

## Tool Assembly
Final `tools:` field in agent combines:
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
- Stack (language, framework from extensions and configs)
- Structure (directories, src modules)
- Markers (AICODE-NOTE, TODO, FIX with locations)
- Git state (branch, modified files)

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

Parse skill names and descriptions for Phase 3 options.

## Phase 2: Analyze Intent

### 2.1 Interpret Intent

**Apply Self-Improve skill** with:
- Input: description + code context + feature context (if loaded)
- Output:
  - Intent (action, subject, implicit assumptions)
  - Findings with traceable sources
  - Complexity assessment (Simple | Needs analysis: [reason])

### 2.2 Infer Configuration

**Apply Tool Inference Rules** to derive from intent:
- Suggested model (from complexity + task type)
- Suggested file tools (from intent patterns)
- Suggested execution level (from intent patterns)
- Suggested color (from domain mapping)
- Suggested skills (from task requirements)

## Phase 3: Clarify & Enrich

### 3.1 Present Analysis

```dialogue
"🔍 Analysis Complete

**Intent:** [action + subject from Self-Improve]

**Findings:**
1. [discovery] → [source]
2. [discovery] → [source]
3. [discovery] → [source]

**Suggested Configuration:**
- Model: [model] — [rationale from inference]
- File Tools: [list from inference]
- Execution: [level from inference]
- Skills: [list from inference]
```

### 3.2 Configuration Clarification

```dialogue
"**Configuration**

1️⃣ **Model** (suggested: [model] — [rationale])
   Options: haiku (fast, simple) | sonnet (balanced) | opus (complex reasoning)
   → Adjust?

2️⃣ **File Operations** (suggested: [list])
   Options: Read, Write, Edit, MultiEdit, Glob, Grep, LS
   → Adjust? (add/remove or 'ok')

3️⃣ **Execution** (suggested: [level])
   Options: Bash | Bash(git:*) | Bash(npm:*) | Bash(docker:*) | none
   → Adjust?

4️⃣ **Skills** (suggested: [list])
   Available: [parsed skill names from 1.3]
   → Adjust?

5️⃣ **MCP Tools** (suggested: [list or none])
   Options: sequential-thinking, context7, [other detected]
   → Adjust?

6️⃣ **Additional requirements?**
   Domain knowledge, constraints, special behaviors...

Your input:"
```

Wait for user response.

### 3.3 Deep Analysis (conditional)

If Self-Improve Complexity = "Needs analysis" OR user added significant new requirements:

**Apply Sequential Thinking Methodology** to:
- Synthesize all inputs (description + context + clarifications)
- Design workflow phases with clear objectives
- Map tools to specific responsibilities per phase
- Define decision points and autonomous behaviors
- Plan error handling and recovery strategies
- Validate architecture completeness

If Complexity = "Simple" and no new requirements:
- Derive workflow directly from intent (2-3 phases)
- Map tools to obvious responsibilities

## Phase 4: Design Agent

### 4.1 Structure Specification

**Apply Prompt Optimizer skill** to structure agent spec in TCRO format:

```
Task: [Agent objective from intent.action + intent.subject]
Context: 
  - Stack: [from Code Analyzer]
  - Feature: [from Feature Analyzer if loaded]
  - Constraints: [from findings]
Requirements:
  1. [Primary capability from intent]
  2. [Secondary capability from findings]
  3. [User-specified requirements from clarifications]
  4. [Constraints and boundaries]
Output: [What agent produces/achieves]
```

### 4.2 Design Workflow

From Phase 3.3 analysis (or direct derivation):

Define workflow phases (typically 2-4):
- Phase name and objective
- Tools used in this phase
- Expected output/state after phase

### 4.3 Define Responsibilities

Extract from TCRO Requirements:
- Primary responsibility (main task from intent.action)
- Secondary responsibilities (supporting tasks from findings)
- Boundaries (what agent should NOT do)

### 4.4 Compile Properties

| Property | Source |
|----------|--------|
| name | intent.subject → kebab-case |
| description | intent + key findings summary |
| tools | file ops + execution + MCP (from Phase 3 selections) |
| skills | user selections from Phase 3.2 |
| model | user selection from Phase 3.2 (default: suggested) |
| color | domain mapping from inference |

## Phase 5: Confirm & Generate

### 5.1 Final Summary

```dialogue
"📋 Agent Ready

**Name:** [name]
**Model:** [model]
**Color:** [color]

**Tools:** [full assembled list]
**Skills:** [list or none]

**Responsibilities:**
- [primary from 4.3]
- [secondary from 4.3]
- [boundaries from 4.3]

**Workflow:**
1. [Phase name] — [objective, tools]
2. [Phase name] — [objective, tools]
3. [Phase name] — [objective, tools]

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

**Apply Agent Creator skill** with compiled specification from Phase 4.

Agent Creator applies its template to generate `.claude/agents/[name].md` with:
- YAML frontmatter (name, description, tools, skills, model, color)
- Core Responsibilities section
- Approach & Methodology with workflow phases from 4.2
- Autonomous Decision Criteria
- Domain-Specific Knowledge (if feature context loaded)
- Constraints & Safety from boundaries
- Error Handling from 3.3 analysis
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