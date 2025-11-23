---
name: self-improve
description: Analyzes workflow patterns to identify automation opportunities through commands, agents, and optimizations
allowed-tools: Read, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Workflow Optimizer Skill

Analyzes workflow patterns to identify automation opportunities through commands, agents, and optimizations.

**Tools Usage:**
- `mcp__sequential-thinking__sequentialthinking`: For iterative analysis with hypothesis generation and verification

## Usage

When invoked with specific prompt - focuses analysis on those task workflows.
No prompt - comprehensive workflow analysis.

## Execution

### 1. Pattern Analysis

Use `mcp__sequential-thinking__sequentialthinking` to analyze:

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

### 2. Prompt Quality Check

When analyzing prompts in workflows, check:

- **Context field**: Is project tech stack and constraints specified?
- **Task field**: Is the objective clear and specific?
- **Instructions field**: Are steps numbered and sequential?
- **Requirements field**: Are constraints non-negotiable and clear?
- **Examples field**: Are good/bad patterns provided for clarity?
- **Success criteria field**: Are outcomes measurable?
- **Thinking field**: Is complex reasoning prompted where needed?

### 3. Categorize by Priority

**High Priority:**
- Daily repetitive tasks
- Workflows >10 min that could be automated
- Simple implementation, high value

**Medium Priority:**
- Weekly tasks
- Workflow improvements
- Moderate complexity

**Low Priority:**
- Occasional workflows
- Advanced features
- Complex implementation

## Output Format

### 📊 Workflow Analysis Summary
- **Patterns identified:** [X]
- **Time savings potential:** [Y hours/week]
- **Recommended implementations:** [Z]

### 🔴 High Priority Improvements

1. **Create command `/[command-name]`**
   - **Description:** [What the command does, e.g., "Automatically generates test files for Python modules"]
   - **Automates:** [Current manual process]
   - **Usage frequency:** [X times/day]
   - **Time saved:** [Y minutes per use]
   - **Implementation complexity:** Simple/Moderate/Complex

2. **Create agent `[agent-name]`**
   - **Description:** [What the agent handles, e.g., "Manages complete code review workflow including tests, linting, and PR preparation"]
   - **Replaces workflow:** [Current manual steps]
   - **Time saved:** [Y minutes per workflow]
   - **Key features:** [List main capabilities]

### 🟡 Medium Priority Improvements

1. **Create command `/[command-name]`**
   - **Description:** [Detailed functionality description]
   - **Use case:** [When and why to use it]
   - **Weekly time savings:** [X minutes]

2. **Create template `[template-name]`**
   - **Description:** [What structure it provides]
   - **Common scenarios:** [Where it applies]
   - **Benefit:** [Standardization/speed improvement]

### 🟢 Low Priority Improvements

1. **Create utility command `/[command-name]`**
   - **Description:** [What it accomplishes]
   - **Nice-to-have because:** [Reason for lower priority]
   - **Future benefit:** [Long-term value]

2. **Create advanced agent `[agent-name]`**
   - **Description:** [Complex functionality it would provide]
   - **Advanced features:** [What makes it complex]
   - **Consider when:** [Conditions that would elevate priority]

### 💡 Implementation Roadmap

**Week 1:** 
- Implement [highest impact command/agent]
- Expected outcome: [X hours saved weekly]

**Week 2-3:**
- Deploy [second priority items]
- Cumulative benefit: [Total improvement]

**Future considerations:**
- [Long-term optimization opportunities]
- [Scalability improvements]

**Total estimated time savings:** [X hours/week once fully implemented]

## Examples of Improvement Types

**Command Examples:**
- `/test-gen` - Generates comprehensive test suites for modules
- `/docs-update` - Updates documentation based on code changes
- `/dep-check` - Validates and updates dependencies

**Agent Examples:**
- `refactor-assistant` - Handles complete refactoring workflows
- `deployment-manager` - Manages build, test, and deploy pipeline
- `code-reviewer` - Performs thorough code review with suggestions

**Template Examples:**
- API endpoint templates
- Test suite structures
- Documentation frameworks