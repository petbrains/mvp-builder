---
name: Sequential Thinking Methodology
description: |
  Structured reasoning framework for complex multi-step analysis.
  Skip for: simple factual questions, direct fixes, single-step answers, routine tasks.
  Apply when: 3+ logical steps required, multiple valid approaches, 
  debugging unclear root causes, <70% confidence, state transitions, causal chains.
  Provides: thought structure (max 7), branch/revise thresholds (60%/20%), 
  quality scoring (min 5 points), self-consistency checks, 
  80/20 convergence distribution, state-based reasoning.
allowed-tools: Read, mcp__sequential-thinking__sequentialthinking
---

# Sequential Thinking Methodology

Apply this framework when using `/mcp__sequential-thinking__sequentialthinking` tool.

## 1. Pre-Assessment Protocol (ALWAYS DO FIRST)

### Skip MCP entirely for:
- Simple factual questions
- Direct code fixes with obvious solutions  
- Single-step answers
- Routine/templated tasks

### Apply MCP when:
- Problem requires 3+ logical steps
- Multiple valid approaches exist
- Debugging complex issues with unclear root causes
- Initial attempt yields <70% confidence
- Problem involves state transitions or causal chains

### Complexity Classification
**First Thought Must:**
1. Classify: Simple → Skip | Medium → 3-4 thoughts | Complex → up to 7 thoughts
2. Define initial state and goal state
3. Extract explicit success criteria

## 2. State-Based Reasoning Framework

### For Sequential Problems:
1. **Current state**: What facts/conditions are true now?
2. **Preconditions**: What must be true for next action?
3. **Apply effects**: How does action change the state?
4. **Verify new state**: Valid and closer to goal?
5. **Check goal**: Success criteria met?

### Thought Structure:

**Thought N: [Hypothesis/Analysis/Action]**
- State: [explicit description]
- Assumption: [what's given]
- Logic: [deduction|induction|abduction|causal]
- Confidence: X%
- Next: [what this enables]

## 3. Decision Thresholds

### Branch (`branch_from_thought` + unique `branch_id`):
- Confidence <60% WITH viable alternative
- Contradiction discovered
- Equal validity paths (Δ confidence <10%)

### Revise (`is_revision=true` + `revises_thought`):
- Fundamental error found
- Precondition proven false  
- Better approach found (>20% confidence gain)

### Add More (`needs_more_thoughts=true`):
- Reaching limit but incomplete
- New complexity discovered

## 4. Quality Scoring (Start: 0)

### Positive:
- Clear mechanism (+2)
- Verified assumption (+2)
- Resolved contradiction (+2)
- Valid state transition (+1)

### Negative:
- Circular reasoning (-3)
- Invalid state transition (-3)
- Unverified assumption (-2)
- Logical leap (-1)

**Minimum: 5 points** | **If <5 after 3 thoughts: reassess**

## 5. Self-Consistency Check

### Trigger if:
- Confidence <70% after exploration
- Score <5 after 3 thoughts
- Circular reasoning detected

### Process:
1. Save current chain
2. Generate ONE alternative (max 3 steps)
3. Compare scores and confidence
4. Document choice rationale

## 6. Convergence Rules

### 80/20 Distribution:
- Thoughts 1-2: Breadth exploration (20%)
- Thoughts 3-5: Deep dive (60%)
- Thoughts 6-7: Verification only (20%)

### Hard Termination:
- 7 thoughts maximum
- Confidence >90% for 2 consecutive
- Cycling detected
- Success criteria met

## 7. Natural Language Integration

### Use these markers:
- "Let me work through this systematically..."
- "This leads me to consider..."
- "Testing an alternative approach..."
- "A potential issue here is..."

### Never expose:
- Internal scores
- Framework mechanics
- Artificial confidence %

## 8. Code-Specific Additions

### Track:
- Variable states/invariants
- Pre/postconditions
- Resource constraints
- Error recovery paths

### Verify:
- Execution traces
- Edge cases
- Resource cleanup
- Thread safety (if relevant)

## 9. Meta-Rules

### Framework Integrity:
- Admit uncertainty rather than guess
- Don't fake confidence to avoid branching
- Acknowledge when problem exceeds capability

### Progress Requirements:
- Each thought must advance solution
- No pure repetition
- Increase confidence OR identify obstacles

---

**Remember:** Apply judiciously. Framework enhances reasoning but shouldn't compromise conversation flow.