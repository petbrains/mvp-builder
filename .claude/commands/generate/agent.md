---
name: generate:agent
description: Interactive agent generator that creates autonomous multi-step workflow agents with intelligent tool selection and decision logic
allowed-tools: Read, Write, mcp__sequential-thinking, Bash(ls)
argument-hints: [initial-description]
---

# Instructions

Interactive agent generator that uses sequential thinking to analyze requirements and creates sophisticated autonomous agents. Ensures agents follow best practices with decision trees, error recovery, and intelligent tool selection.

**Tools Usage:**
- `mcp__sequential-thinking` - Analyzes requirements and optimizes dialogue flow. See @.claude/tools/sequential-thinking.md for details
- `Read` - Reads agent templates and existing agents/commands for reference
- `Write` - Creates the final agent file
- `Bash(ls)` - Checks existing agents and commands to avoid duplicates

## Usage

```
/generate:agent [initial-description]
```

- `[initial-description]` - Optional description of the agent's purpose and capabilities
- No arguments - Starts with exploratory questions to understand agent requirements

## Execution

### Phase 1: Requirements Analysis

#### Step 1: Analyze Initial Input

Use `/mcp__sequential-thinking__sequentialthinking` to process the description:

```
1. Parse initial description:
   - Extract core purpose and objectives
   - Identify implied autonomous behaviors
   - Detect workflow complexity patterns
   - Find decision point requirements

2. Generate hypotheses:
   - Agent type and complexity level
   - Required tools and permissions
   - Workflow phases and branching
   - Success/failure criteria

3. Optimize dialogue strategy:
   - Determine essential vs inferable info
   - Plan minimal question set
   - Prepare intelligent defaults
```

#### Step 2: Initial Classification

```dialogue
"🤖 Let's create an autonomous agent. I'll analyze your requirements using sequential thinking.

[If initial description provided]:
Based on '[summarized purpose]', I've identified this as a [simple/moderate/complex] agent task.

[If no description]:
First, what complex or repetitive task should this agent automate?

Key question: What decisions should the agent make autonomously?"
```

### Phase 2: Duplicate Detection & Validation

#### Step 1: Check Existing Solutions

```bash
# Check for existing agents
ls .claude/agents/ 2>/dev/null || echo "No agents directory"

# Check for existing commands
ls .claude/commands/**/*.md 2>/dev/null
```

Use sequential thinking to analyze existing solutions:
- Compare descriptions and functionality
- Identify potential overlaps
- Determine if new agent is truly needed

#### Step 2: Validation Dialogue

If similar solution found:
```dialogue
"⚠️ Found existing [agent/command] with similar functionality:
- [Name]: [Description]

Options:
1. Use existing [agent/command] instead
2. Modify existing one to add your requirements
3. Create new agent with different focus

What would you prefer?"
```

If no duplicates:
```dialogue
"✅ No existing solution matches your requirements.

This task [does/doesn't] warrant an agent because:
[Reasoning based on complexity, autonomy needs, decision points]

[If doesn't warrant agent]:
Would you like me to create a simpler command instead?

[If warrants agent]:
Let's proceed with the agent creation."
```

### Phase 3: Intelligent Information Gathering

#### Stage 1: Core Agent Definition

```dialogue
"Based on analysis, I suggest naming this agent:
`[suggested-name]`

The agent's objective would be:
'[generated objective based on description]'

Does this capture your intent? (yes/modify/different)"
```

#### Stage 2: Autonomous Decision Criteria

```dialogue
"What conditions should trigger autonomous decisions?

Based on your description, I'm inferring:
- [Condition 1]: [Action]
- [Condition 2]: [Action]

Additional decision points to add?"
```

#### Stage 3: Smart Tool Detection

```dialogue
"From the workflow, this agent needs these tools:
- [Tool 1]: for [specific purpose]
- [Tool 2]: for [specific purpose]
[Auto-detected tools]

Special tools needed:
- Task tool: [yes/no - for sub-agents]
- TodoWrite: [yes/no - for progress tracking]
- mcp__sequential-thinking: [yes/no - for complex analysis]

Confirm or modify tool list:"
```

#### Stage 4: Workflow Architecture

```dialogue
"I've designed this workflow structure:

**Phase 1: [Name]** - [Purpose]
  → Decision: [Condition]
    ✓ Yes: [Action/Next Phase]
    ✗ No: [Alternative Action]

**Phase 2: [Name]** - [Purpose]
  [Continue structure]

This provides [benefits]. Approve this architecture?"
```

#### Stage 5: Error Recovery & Success Criteria

```dialogue
"For robust operation, I'll add:

**Success Criteria:**
- [Inferred success condition 1]
- [Inferred success condition 2]

**Error Recovery:**
- On [error type]: [recovery action]
- On [failure type]: [fallback strategy]

**Context Persistence:**
- [What state to maintain between phases]

Any modifications needed?"
```

### Phase 4: Architecture Design

#### Step 1: Build Decision Trees

Use sequential thinking to optimize the agent's decision logic:
```
1. Map all decision points
2. Create branching logic
3. Define state transitions
4. Establish rollback conditions
```

#### Step 2: Structure Validation

Validate the complete agent architecture:
- Ensure all paths lead to completion
- Verify error handlers cover all cases
- Check for infinite loops or deadlocks
- Confirm success criteria are achievable

### Phase 5: Generation & Validation

#### Step 1: Final Confirmation

```dialogue
"📋 Agent Analysis Complete:

**Agent Summary:**
- Name: [final-name]
- Objective: [final-objective]
- Complexity: [Simple/Moderate/Complex]
- Autonomy Level: [Low/Medium/High]

**Architecture:**
- Phases: [count] with [total] decision points
- Tools: [final-tool-list]
- Error Recovery: [Comprehensive/Basic]
- Sub-agents: [Yes/No]

**Key Features:**
- [Feature 1]
- [Feature 2]
- [Feature 3]

Ready to generate the agent file? (yes/no/modify)"
```

#### Step 2: Generate Agent File

Write to `./.claude/agents/[agent-name].md`:

```markdown
---
name: [agent-name]
description: [agent-description]
allowed-tools: [comma-separated-tools]
agent-type: autonomous
complexity: [level]
---

# Agent: [Agent Name]

## Objective
[Clear statement of what this agent accomplishes autonomously]

## Autonomous Decision Criteria
[When and how the agent makes decisions without user input]

## Execution Workflow

### Phase 1: [Phase Name]
**Objective:** [What this phase accomplishes]

**Steps:**
1. [Action with tool usage]
2. [Decision point]
   - If [condition]: [action]
   - Else: [alternative]

[Continue with all phases]

## Success Criteria
- [Measurable success condition 1]
- [Measurable success condition 2]

## Error Recovery
- **[Error Type]:** [Recovery strategy]
- **[Failure Type]:** [Fallback approach]

## Context Management
- Maintains: [What state is preserved]
- Resets: [What is cleared between runs]

## Sub-Agent Spawning
[If applicable, when and how sub-agents are created]

## Safety Guards
- [Protection 1]
- [Protection 2]

## Examples

### Example 1: [Scenario]
Trigger: [What initiates the agent]
Expected Behavior: [What happens]
Result: [Outcome]
```

#### Step 3: Post-Generation

```dialogue
"✅ Agent successfully created at ./.claude/agents/[agent-name].md

The agent is ready to deploy. You can:
1. Test the agent now with /[agent-name]
2. Create another agent
3. View the generated file
4. Done

What's next?"
```

## Interactive Mode

The generator maintains context throughout the dialogue:

```dialogue
"[Contextual question based on previous answers]"

Context so far:
- Purpose: [defined]
- Tools: [selected]
- Workflow: [structure]
- Still needed: [remaining items]
```

## Safety Guards

- Validates agent name uniqueness before creation
- Checks for existing solutions to prevent duplicates
- Ensures decision trees have no infinite loops
- Validates all error paths have handlers
- Confirms tool permissions match operations
- Prevents overwriting existing agents without confirmation

## Error Handling

**During Analysis:**
- No clear purpose → Guide to better description
- Too simple for agent → Suggest command instead
- Too complex → Suggest breaking into multiple agents

**During Generation:**
- Duplicate name → Suggest alternatives
- Missing templates → Use embedded defaults
- Invalid tool combination → Explain conflicts

## Examples

### Example 1: Code Review Agent
```
/generate:agent automated code reviewer that checks style, security, and suggests improvements
```
Creates sophisticated agent with multi-phase review process

### Example 2: Deployment Agent
```
/generate:agent staging deployment with automated rollback on failure
```
Generates agent with decision trees for deployment validation

### Example 3: No Arguments
```
/generate:agent
```
Starts with exploratory questions to understand requirements

## Related Commands

- `/generate:command` - For simpler, linear automation tasks
- `/self-improve` - Analyzes patterns to suggest new agents
- `/list-agents` - Shows existing agents to avoid duplicates