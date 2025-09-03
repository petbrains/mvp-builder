---
name: self_improve
description: Workflow optimization command that analyzes Claude Code patterns and suggests automated solutions
allowed-tools: Read, Bash (*), mcp__sequential-thinking
argument-hints: [prompt]
---

# Instructions

Analyzes workflow patterns to identify automation opportunities through commands, agents, and optimizations.

**Tools Usage:**
- See @.claude/tools/sequential-thinking.md for iterative analysis with hypothesis generation and verification
- `Read`: For loading current PRD state before updates

## Usage

```
/self-improve [prompt]
```

If `[prompt]` provided - focuses analysis on specific task workflows.
No prompt - comprehensive workflow analysis.

## Execution

### 1. Pattern Analysis

Use `/mcp__sequential-thinking__sequentialthinking` to analyze:

```
1. Identify patterns:
   - Repetitive tasks and commands
   - Multi-step workflows
   - Time-consuming operations
   - Manual processes

2. Calculate impact:
   - Frequency of occurrence
   - Time spent per pattern
   - Automation potential
   - Implementation complexity

3. Generate solutions:
   - Commands for frequent tasks
   - Agents for complex workflows
   - Templates for repetitive structures
```

### 2. Categorize by Priority

**Priority 1 (High Impact):**
- Daily repetitive tasks
- Workflows >10 min that could be automated
- Simple implementation, high value

**Priority 2 (Moderate):**
- Weekly tasks
- Workflow improvements
- Medium complexity

**Priority 3 (Nice-to-have):**
- Occasional workflows
- Advanced features
- Complex implementation

### 3. Output Report


## Workflow Optimization Analysis

### 📊 Summary
- Patterns found: [X]
- Time savings potential: [Y hours/week]

### 🔴 Priority 1: High Impact

**Command: /[name]**
- Automates: [task]
- Frequency: [X/day]
- Saves: [Y min/use]

**Agent: [name]**
- Handles: [workflow]
- Current: [manual steps]
- Benefit: [time saved]

### 🟡 Priority 2: Moderate Value

**[Optimization name]**
- Issue: [current problem]
- Solution: [approach]
- Benefit: [improvement]

### 🟢 Priority 3: Future

**[Enhancement]**
- Opportunity: [description]
- Value: [long-term benefit]

### 💡 Recommendations
1. Start with: [highest impact item]
2. Then: [second priority]
3. Consider: [third item]

Estimated total savings: [X hours/week]

## Focus Areas

**Command candidates:** Repeated single tasks
**Agent candidates:** Multi-step workflows  
**Template candidates:** Repetitive structures
**Automation targets:** Manual validations, batch operations