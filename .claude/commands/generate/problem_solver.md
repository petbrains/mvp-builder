---
allowed-tools: [mcp__sequential-thinking__sequentialthinking, Task, TodoWrite, MultiEdit, Read, Grep, Glob, WebSearch]
argument-hint: [problem description or technical challenge]
description: Break down complex technical challenges into sequential thinking chains with systematic reasoning
---

## Your task

Solve the complex technical challenge described in $ARGUMENTS by breaking it down into sequential thinking chains, analyzing dependencies, creating execution plans, and validating solutions through systematic reasoning. I'll use structured problem decomposition and iterative refinement to ensure comprehensive solutions.

## Process

I'll follow these steps:
1. **Problem Decomposition** - Break down the challenge into discrete components and identify dependencies
2. **Sequential Analysis** - Apply chain-of-thought reasoning to explore solution paths systematically
3. **Dependency Mapping** - Identify relationships between components and order of execution
4. **Solution Planning** - Create detailed execution plan with validation checkpoints
5. **Implementation & Verification** - Execute the plan and validate each step against success criteria

## No Prompt / Help Mode

If you run `/problem-solver` with **no prompt** (i.e., just `/problem-solver` or only whitespace), display this help message:

**Purpose:** Solve complex technical challenges through systematic reasoning and sequential thinking

**Usage:** `/problem-solver [description of technical problem]`

**Quick examples:**
- `/problem-solver optimize database query performance across microservices`
- `/problem-solver debug memory leak in production application`
- `/problem-solver design scalable event-driven architecture`
- `/problem-solver refactor legacy codebase to modern patterns`
- `/problem-solver resolve circular dependency in module system`

**What gets solved:**
- Multi-step technical challenges
- System design problems
- Performance optimization issues
- Architecture decisions
- Complex debugging scenarios
- Integration challenges

## Interactive Mode

When the problem description is ambiguous or requires clarification:

```
I need more details to solve this problem effectively:

1. **Problem Context**: What system/application is affected?
2. **Current State**: What's the existing situation or error?
3. **Desired Outcome**: What should the solution achieve?
4. **Constraints**: Any limitations (time, resources, compatibility)?
5. **Previous Attempts**: What has been tried already?
6. **Success Criteria**: How will we know the problem is solved?

Please provide these details or I can guide you through each aspect.
```

## Problem Analysis Framework

### Initial Assessment
- **Problem Classification**: Technical debt, performance, architecture, integration, debugging
- **Complexity Level**: Simple (1-3 steps), Medium (4-7 steps), Complex (8+ steps)
- **Risk Assessment**: Impact analysis and potential side effects
- **Resource Requirements**: Tools, dependencies, and expertise needed

### Decomposition Strategy
- **Component Identification**: Break into atomic, solvable units
- **Dependency Analysis**: Map relationships and execution order
- **Critical Path**: Identify essential vs optional components
- **Parallel Opportunities**: Find independent tasks for concurrent execution

### Sequential Thinking Process
- **Hypothesis Generation**: Multiple solution approaches
- **Path Exploration**: Systematic evaluation of each approach
- **Branch Management**: Track alternative solutions
- **Revision Capability**: Adjust thinking based on new insights
- **Verification Steps**: Validate reasoning at each stage

## Solution Development

### Thinking Chain Structure
1. **Initial Thoughts** (1-3)
   - Problem understanding and scope definition
   - Identify key challenges and constraints
   - Establish solution criteria

2. **Analysis Thoughts** (4-7)
   - Deep dive into technical details
   - Explore solution alternatives
   - Evaluate trade-offs

3. **Planning Thoughts** (8-11)
   - Design implementation approach
   - Define execution sequence
   - Identify validation points

4. **Verification Thoughts** (12+)
   - Test hypothesis against requirements
   - Validate solution completeness
   - Refine based on findings

### Execution Planning
- **Task Breakdown**: Detailed action items with clear outcomes
- **Dependency Graph**: Visual representation of task relationships
- **Timeline Estimation**: Realistic timeframes for each phase
- **Checkpoint Definition**: Validation points throughout execution
- **Rollback Strategy**: Recovery plans for each critical step

### Solution Validation
- **Correctness Verification**: Does it solve the stated problem?
- **Completeness Check**: Are all aspects addressed?
- **Performance Validation**: Does it meet efficiency requirements?
- **Edge Case Testing**: Handle unusual or extreme scenarios
- **Integration Testing**: Works with existing systems

## Problem-Solving Patterns

### Performance Optimization
1. **Profiling & Measurement**
   - Identify bottlenecks systematically
   - Establish baseline metrics
   - Define improvement targets

2. **Root Cause Analysis**
   - Trace performance issues to source
   - Distinguish symptoms from causes
   - Prioritize optimization opportunities

3. **Solution Implementation**
   - Apply targeted optimizations
   - Measure impact of changes
   - Iterate based on results

### System Design
1. **Requirements Analysis**
   - Functional requirements mapping
   - Non-functional requirements consideration
   - Constraint identification

2. **Architecture Planning**
   - Component design and interfaces
   - Data flow and communication patterns
   - Scalability and reliability considerations

3. **Implementation Strategy**
   - Technology selection
   - Development phases
   - Testing and deployment approach

### Debugging Complex Issues
1. **Issue Reproduction**
   - Isolate problem conditions
   - Create minimal test cases
   - Document reproduction steps

2. **Systematic Investigation**
   - Binary search for root cause
   - Log analysis and tracing
   - State examination at failure points

3. **Fix Development**
   - Solution design and testing
   - Side effect analysis
   - Regression prevention

## Best Practices

### Thinking Chain Management
- **Start Broad**: Begin with high-level understanding
- **Progressive Refinement**: Add detail as understanding deepens
- **Track Assumptions**: Document and validate assumptions
- **Embrace Revision**: Adjust thinking when new information emerges
- **Maintain Context**: Keep problem goals visible throughout

### Solution Quality
- **Completeness Over Speed**: Ensure all aspects are addressed
- **Validate Early**: Test assumptions before deep implementation
- **Document Reasoning**: Explain why, not just what
- **Consider Alternatives**: Evaluate multiple approaches
- **Plan for Failure**: Include error handling and recovery

### Communication Excellence
- **Clear Problem Statement**: Articulate the challenge precisely
- **Structured Presentation**: Organize thoughts logically
- **Visual Aids**: Use diagrams and examples when helpful
- **Progress Updates**: Communicate status at checkpoints
- **Solution Summary**: Provide clear, actionable conclusions

## Error Handling

### Common Pitfalls
- **Incomplete Problem Definition**: Missing critical context
- **Assumption Errors**: Invalid or untested assumptions
- **Dependency Oversights**: Missing critical relationships
- **Scope Creep**: Problem expanding beyond original bounds
- **Premature Optimization**: Solving wrong problem perfectly

### Recovery Strategies
- **Backtrack and Revise**: Return to earlier thinking when stuck
- **Parallel Exploration**: Try multiple approaches simultaneously
- **Incremental Progress**: Solve sub-problems when whole is blocked
- **External Resources**: Leverage documentation and references
- **Iterative Refinement**: Improve solution through multiple passes

## Output Format

The solution will be presented as:

```
## Problem Analysis
- Problem Type: [Classification]
- Complexity: [Simple/Medium/Complex]
- Key Challenges: [List of main difficulties]

## Sequential Thinking Chain
[Thought 1]: Initial understanding...
[Thought 2]: Dependency analysis...
[Thought N]: Solution validation...

## Execution Plan
1. [Task 1]: Description (Dependencies: none)
2. [Task 2]: Description (Dependencies: Task 1)
3. [Task N]: Description (Dependencies: Tasks X, Y)

## Solution Implementation
[Detailed steps with code/commands as needed]

## Validation Results
- ✅ Requirement 1: Met
- ✅ Requirement 2: Met
- ⚠️ Edge Case: Handled with limitation

## Summary
[Concise solution description with key outcomes]
```

## Examples

### Example 1: Performance Optimization
```
/problem-solver Application response time degraded from 200ms to 2s after recent deployment
```

Solves by:
- Analyzing recent changes and their impact
- Profiling application to identify bottlenecks
- Creating optimization plan with priorities
- Implementing fixes with measurement
- Validating improvements meet targets

### Example 2: Architecture Design
```
/problem-solver Design event-driven system to handle 100k concurrent users with real-time updates
```

Solves by:
- Breaking down scalability requirements
- Evaluating architectural patterns
- Designing component interactions
- Planning implementation phases
- Creating validation framework

### Example 3: Complex Debugging
```
/problem-solver Production API intermittently returns 500 errors under load with no clear pattern
```

Solves by:
- Analyzing error patterns and conditions
- Creating reproduction strategy
- Systematically eliminating causes
- Developing targeted fix
- Implementing monitoring for prevention