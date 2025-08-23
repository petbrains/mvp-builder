---
allowed-tools: [mcp__sequential-thinking]
argument-hint: [agent-purpose-description]
description: Generate new agents with sequential thinking capabilities for complex problem-solving
---

## Your task

Create a new agent that utilizes the mcp__sequential-thinking tool to solve complex problems through structured reasoning. Based on [prompt], generate a complete agent markdown file with:
- Sequential thinking workflow implementation
- Proper metadata and tool declarations
- Thought structure and reasoning patterns
- Validation rules and error handling
- Usage examples demonstrating the agent's capabilities

The agent will use dynamic, reflective problem-solving that can adapt and evolve as understanding deepens.

---

## No Prompt / Help Mode

If you run `/create-agent` with **no prompt** (i.e., just `/create-agent` or only whitespace), display this help message:

**Purpose:** Generate intelligent agents with sequential thinking capabilities

**Usage:** `/create-agent [description of what the agent should solve]`

**Quick examples:**
- `/create-agent code review analyzer with architectural insights`
- `/create-agent data pipeline optimizer for ETL workflows`
- `/create-agent security vulnerability scanner with remediation`
- `/create-agent performance bottleneck detector`
- `/create-agent test case generator with edge cases`

**What gets created:**
- A complete `.md` file with the agent specification
- Sequential thinking workflow with adaptive reasoning
- Thought revision and branching capabilities
- Hypothesis generation and verification
- Interactive clarification mode

**Agent capabilities:**
- Break down complex problems into thinking steps
- Revise and question previous thoughts
- Branch into alternative approaches
- Generate and verify hypotheses
- Filter irrelevant information
- Maintain context across multiple steps

---

## Interactive Mode

The agent creation process follows these essential steps:

### Step 1: Requirements Gathering
- **Validate agent purpose:** If the description is ambiguous, ask for clarification:
  ```
  "I need more details to create the agent properly:
  1. What type of problems should this agent solve?
  2. What is the expected input/output format?
  3. Should it have hypothesis generation capabilities?
  4. What validation or verification steps are needed?
  5. Any specific domain knowledge required?
  
  Please provide details or I can guide you through each step."
  ```
- **Determine thinking complexity:** Assess if the agent needs:
  - Linear thinking (simple step-by-step)
  - Branching logic (multiple paths)
  - Revision capabilities (self-correction)
  - Hypothesis testing (solution verification)

### Step 2: Agent Structure Generation
- **Create agent file:** Generate markdown with all required sections
- **Define metadata:** 
  ```markdown
  ---
  allowed-tools: [mcp__sequential-thinking, additional_tools]
  argument-hint: [problem-description]
  description: Agent purpose and capabilities
  ---
  ```
- **Implement thinking workflow:**
  - Initial thought estimation
  - Adaptive thought adjustment
  - Revision and branching logic
  - Hypothesis generation rules
  - Verification procedures
- **Add validation rules:** Input validation and output verification
- **Generate examples:** 2-3 practical usage scenarios

### Step 3: Finalization
- **Verify agent completeness:** Check all sections are present
- **Test thinking flow:** Ensure logical progression
- **Save agent file:** Use pattern `agent_[domain]_[function].md`
- **Output success message:**
  ```
  ✅ Agent successfully created: agent_[name].md
  
  Your agent capabilities:
  - Sequential thinking with [X] initial steps
  - Adaptive reasoning and revision
  - [Specific capabilities based on requirements]
  
  To use your new agent:
  /agent-[name] [problem-description]
  
  Example:
  /agent-[name] "analyze this complex scenario..."
  ```

---

## Rules

### Agent Structure Requirements
Every generated agent must include:

```markdown
---
allowed-tools: [mcp__sequential-thinking, domain_specific_tools]
argument-hint: [expected-problem-format]
description: Agent purpose and problem-solving approach
---

## Your task
[Agent's primary objective and thinking approach]

## Thinking Workflow
- Initial thought estimation strategy
- Revision and branching conditions
- Hypothesis generation triggers
- Verification procedures
- Completion criteria

## No Prompt / Help Mode
[Help text when no problem provided]

## Interactive Mode
[Clarification behavior for ambiguous problems]

## Domain Rules (optional)
[Specific constraints for the problem domain]

## Examples
[2-3 demonstration scenarios]
```

### Sequential Thinking Configuration
- **Initial thoughts:** Start with reasonable estimate (3-10 based on complexity)
- **Adaptive adjustment:** Allow increasing/decreasing total_thoughts
- **Revision markers:** Use is_revision and revises_thought appropriately
- **Branching:** Implement branch_from_thought for alternative paths
- **Completion:** Only set next_thought_needed=false when solution is verified

### Naming Conventions
- **Agent names:** Use pattern `agent_[domain]_[function]`
- **File names:** Lowercase with underscores (e.g., `agent_code_reviewer.md`)
- **Forbidden prefixes:** system_, internal_, admin_

---

## Security & Compliance

### Agent Capability Restrictions
- **Prohibited capabilities:**
  - Direct system command execution without validation
  - Unfiltered data access or modification
  - Bypassing security checks
  - Infinite thinking loops without termination

### Required Safety Measures
- **Thought limits:** Maximum 50 thoughts to prevent infinite loops
- **Input sanitization:** Validate problem descriptions
- **Output verification:** Check generated solutions
- **Resource constraints:** Monitor thinking time and complexity
- **Audit trail:** Log thinking paths for debugging

---

## Examples

```xml
<example id="create-code-review-agent" kind="creation">
  <title>Create code review analyzer agent</title>
  <command>/create-agent intelligent code reviewer that analyzes architecture patterns and suggests improvements</command>
  <creates>
    <file>agent_code_reviewer.md</file>
    <structure>
      - Metadata with mcp__sequential-thinking, Read, Grep tools
      - Thinking workflow for code analysis
      - Pattern recognition logic
      - Architecture assessment criteria
      - Improvement hypothesis generation
    </structure>
  </creates>
  <output>
    ✅ Agent successfully created: agent_code_reviewer.md
    
    Your agent capabilities:
    - Sequential analysis with 8 initial thinking steps
    - Pattern recognition and architecture assessment
    - Improvement suggestion generation
    
    To use: /agent-code-reviewer [file-or-directory]
    Example: /agent-code-reviewer src/services/
  </output>
</example>
```

```xml
<example id="create-optimization-agent" kind="creation">
  <title>Create performance optimization agent</title>
  <command>/create-agent performance bottleneck detector with optimization strategies</command>
  <creates>
    <file>agent_performance_optimizer.md</file>
    <structure>
      - Metadata with mcp__sequential-thinking, profiling tools
      - Bottleneck detection workflow
      - Hypothesis generation for optimizations
      - Verification procedures
      - Benchmark comparison logic
    </structure>
  </creates>
  <output>
    ✅ Agent successfully created: agent_performance_optimizer.md
    
    Your agent capabilities:
    - Sequential bottleneck analysis
    - Multiple optimization hypothesis generation
    - Performance impact verification
    
    To use: /agent-performance-optimizer [code-section]
    Example: /agent-performance-optimizer "database query module"
  </output>
</example>
```

```xml
<example id="create-test-generator-agent" kind="creation">
  <title>Create test case generator agent</title>
  <command>/create-agent test case generator focusing on edge cases and boundary conditions</command>
  <creates>
    <file>agent_test_generator.md</file>
    <structure>
      - Metadata with mcp__sequential-thinking, testing tools
      - Edge case identification workflow
      - Boundary condition analysis
      - Test scenario branching
      - Coverage verification
    </structure>
  </creates>
  <output>
    ✅ Agent successfully created: agent_test_generator.md
    
    Your agent capabilities:
    - Sequential test case generation
    - Edge case and boundary analysis
    - Coverage assessment with branching
    
    To use: /agent-test-generator [function-or-module]
    Example: /agent-test-generator "authentication service"
  </output>
</example>
```