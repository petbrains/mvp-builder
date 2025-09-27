# Instructions for `/mcp__sequential-thinking__sequentialthinking`

## Sequential Thinking Enhancement Rules

### 1. Complexity Assessment
**First Thought Must:**
1. Classify complexity: Simple | Medium | Complex
2. Identify success criteria from context
3. Choose appropriate depth strategy
4. **Generate initial hypothesis** (если применимо)

### 2. Strategic Decision Points

**When to Branch (`branch_from_thought` + `branch_id`):**
- Current confidence <60% AND viable alternative exists
- Multiple equally valid interpretations
- Need to test opposing hypotheses
- **Assign unique `branch_id` for tracking** (e.g., "alt-1", "hypothesis-B")

**When to Revise (`is_revision=true` + `revises_thought`):**
- Direct contradiction discovered
- Fundamental error in previous logic
- Better approach becomes apparent
- **Hypothesis verification failed** - revise generating thought

**When to Continue Linear:**
- Default choice unless branch/revise criteria met
- Confidence 60-90%
- Making measurable progress
- **Hypothesis still being tested**

**When to Add More Thoughts (`needs_more_thoughts=true`):**
- Reaching `total_thoughts` but solution incomplete
- New complexity discovered
- **Hypothesis needs additional verification steps**

### 3. Quality Scoring System
**Starting score: 0**

**+Points (Strong Logic):**
- Clear cause→effect: +1
- Verified assumption: +2
- Resolved contradiction: +2
- Tested alternative: +1
- **Hypothesis verified: +3**

**-Points (Weak Logic):**
- Circular reasoning: -3
- Unverified assumption: -2
- Ignored contradiction: -2
- Logical leap: -1
- **Hypothesis unverified: -1**

**Minimum acceptable score: 5 points**
**If score <5 at end: trigger revision or branch**

### 4. Hypothesis-Driven Protocol
1. **Generate hypothesis** when pattern emerges (typically thoughts 2-4)
2. **Mark hypothesis thought** for potential revision
3. **Verify hypothesis** in subsequent thoughts
4. **If verification fails:** `is_revision=true`, `revises_thought=[hypothesis_number]`
5. **If partially correct:** branch to explore variations

### 5. Self-Consistency Protocol
**Trigger when confidence <70% after initial exploration:**
1. Save current chain state
2. Generate alternative reasoning chain **with new `branch_id`**
3. Compare conclusions and logic paths
4. Select chain with higher quality score
5. If equal: choose higher confidence path

### 6. 80/20 Optimization Strategy
- **Initial thoughts (20% of total):** Explore problem breadth
- **Middle thoughts (60% of total):** Deep dive on most promising path + hypothesis testing
- **Final thoughts (20% of total):** Verification and gap-filling

### 7. Meta-Rules
**Before starting sequential_thinking:**
- Skip for simple factual questions
- Skip if no multi-step reasoning needed
- Skip for routine/templated tasks

**Progress indicators:**
- Each thought should advance toward solution
- If cycling detected: force branch or conclude
- If confidence plateaus: evaluate alternatives
- If quality score negative: reassess approach
- **Set `next_thought_needed=false` only when answer is satisfactory**

**Convergence principles:**
- Always increment toward conclusion
- Prioritize resolution over exploration
- Synthesize findings when patterns emerge
- **Final thought must provide single, correct answer**