---
description: Agent generator
allowed-tools: Read, Write, mcp__sequential-thinking__sequentialthinking, Bash(ls)
argument-hints: [initial-description]
---

# Instructions

Interactive agent generator that uses sequential thinking to analyze requirements and creates sophisticated autonomous agents. Ensures agents follow best practices with decision trees, error recovery, and intelligent tool selection.

**Tools Usage:**
- `Read` - Reads agent templates and existing agents/commands for reference
- `Write` - Creates the final agent file
- `Bash(ls)` - Checks existing agents and commands to avoid duplicates
- `/mcp__sequential-thinking__sequentialthinking`: For analyzing requirements and optimizing dialogue flow
  - Uses Sequential Thinking methodology for structured reasoning

**Template:** @.claude/templates/agent-template.md

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

Use `/mcp__sequential-thinking__sequentialthinking` to analyze existing solutions:
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

**Core Responsibilities** (per template):
- Main focus: [what the agent primarily does]
- Problem types: [specific problems it solves]
- Boundaries: [what it should NOT do]

Does this capture your intent? Any boundaries or limitations to add?"
```

#### Stage 2: Model Selection

```dialogue
"Which Claude model should this agent use?

- **sonnet** (default) - Balanced performance for most tasks
- **opus** - Complex reasoning and analysis tasks
- **haiku** - Fast, simple operations
- **inherit** - Use the same model as main conversation

Based on complexity, I recommend: [suggested-model]
Choice (sonnet/opus/haiku/inherit):"
```

#### Stage 3: Autonomous Decision Criteria & Specific Instructions

```dialogue
"What conditions should trigger autonomous decisions?

Based on your description, I'm inferring:
- [Condition 1]: [Action]
- [Condition 2]: [Action]

Additional decision points to add?

For the agent's methodology (per template structure):
**Analysis Phase:**
- [How agent examines problems]
- [Key patterns to identify]

**Implementation Phase:**
- [Best practices to follow]
- [Common pitfalls to avoid]

**Output Guidelines:**
- [How to structure responses]
- [Level of detail required]

Any specific instructions to add?"
```

#### Stage 4: Smart Tool Detection

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

#### Stage 5: Domain Knowledge Requirements

```dialogue
"Does this agent need specialized domain knowledge?

[If yes detected]:
I'll include (per template):
- Technical specifications: [relevant to task]
- Industry standards: [best practices]
- Common patterns and anti-patterns: [domain-specific]

Additional domain knowledge to include?"
```

#### Stage 6: Workflow Architecture

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

#### Stage 7: Safety, Constraints & Recovery

```dialogue
"For robust operation, I'll add:

**Constraints & Safety (per template):**
- Never modify: [protected patterns]
- Always validate: [critical conditions]
- Require confirmation for: [sensitive ops]
- Respect: [project conventions]

**Success Criteria:**
- [Measurable condition 1]
- [Measurable condition 2]

**Error Recovery:**
- On [error type]: [recovery action]
- On [failure type]: [fallback strategy]

**Context Persistence:**
- Maintains: [state between phases]
- Resets: [cleared between runs]

Any modifications or additional safety guards needed?"
```

#### Stage 8: Examples (Optional)

```dialogue
"Would you like to provide example scenarios for the agent?

Example format:
- Trigger: [what initiates]
- Expected behavior: [what happens]
- Result: [outcome]

Add examples? (yes/no/skip):"
```

### Phase 4: Architecture Design

#### Step 1: Build Decision Trees

Use `/mcp__sequential-thinking__sequentialthinking` to optimize the agent's decision logic:
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
- Model: [selected-model]
- Objective: [final-objective]
- Boundaries: [what it won't do]
- Autonomy Level: [Low/Medium/High]

**Architecture:**
- Phases: [count] with [total] decision points
- Tools: [final-tool-list]
- Error Recovery: [Comprehensive/Basic]
- Safety Guards: [count] constraints
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
tools: [comma-separated-tools]
model: [selected-model]
---

# Agent System Prompt

You are a specialized [role] expert focused on [specific domain].

## Core Responsibilities

[Clear statement per template structure]
- Main objective and focus area
- Types of problems this agent solves
- Boundaries of what this agent should/shouldn't do

## Approach & Methodology

When invoked, follow this structured approach:

### Execution Workflow

#### Phase 1: [Phase Name]
**Objective:** [What this phase accomplishes]

**Steps:**
1. [Action with tool usage]
2. [Decision point]
   - If [condition]: [action]
   - Else: [alternative]

[Continue with all phases]

## Specific Instructions

### Analysis Phase
- [How to examine the problem]
- [What to look for first]
- [Key patterns to identify]

### Implementation Phase
- [Best practices to follow]
- [Common pitfalls to avoid]
- [Quality standards to maintain]

### Output Guidelines
- [How to structure responses]
- [Level of detail required]
- [Format for presenting results]

## Autonomous Decision Criteria
[When and how the agent makes decisions without user input]
- [Decision point 1]: [Criteria and action]
- [Decision point 2]: [Criteria and action]

## Domain-Specific Knowledge

[Include per template if applicable]
- Technical specifications: [if relevant]
- Industry standards: [if relevant]
- Best practice guidelines: [if relevant]
- Common patterns and anti-patterns: [if relevant]

## Constraints & Safety

- Never modify [protected files/patterns]
- Always validate [specific conditions]
- Require confirmation for [sensitive operations]
- Respect existing [project conventions]
- [Additional safety guards from Stage 7]

## Error Handling

How to handle common issues:
- If [condition], then [action]
- When encountering [error], [response]
- For missing [requirement], [fallback]

## Success Criteria
Define what constitutes successful completion:
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

## Examples

### Example 1: [Scenario]
Trigger: [What initiates the agent]
Expected Behavior: [What happens]
Result: [Outcome]

[Additional examples if provided in Stage 8]
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
- Core Responsibilities: [defined]
- Tools: [selected]
- Model: [chosen]
- Workflow: [structure]
- Constraints: [defined]
- Still needed: [remaining items]
```

## Safety Guards

- Validates agent name uniqueness before creation
- Checks for existing solutions to prevent duplicates
- Ensures decision trees have no infinite loops
- Validates all error paths have handlers
- Confirms tool permissions match operations
- Enforces constraints and safety boundaries per template
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