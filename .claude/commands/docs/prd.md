---
description: Generate MVP PRD.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate MVP Product Requirements Document through interactive dialogue with incremental validation and saving.

**Tools Usage:**
- `Read`: For loading current PRD state before updates
- `Write`: For incremental PRD saving after each stage
- `Bash`: For project discovery

**Skills:**
- Sequential Thinking Methodology: For analysis at decision points and validation
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

**Output:** `./ai-docs/PRD.md`

# Task

Generate focused MVP Product Requirements Document through interactive dialogue.
Collect requirements progressively, validate at each stage, save incrementally.
Final PRD contains: Core Proposition, Solution Design, Technical Requirements, UX Details.

# Rules

## Dialogue Rules
- Ask 3-4 questions per stage maximum
- Wait for user response before proceeding
- Share analysis results before saving
- Save only after user confirms with "ok"

## Writing Rules
- Use hierarchical bullet points for structure
- Keep each bullet 1-2 sentences maximum
- Include rationale as sub-bullets
- No UI elements (✅, ⚠️) in PRD document
- Each section must be self-contained

## Save Rules
- Incremental saves after each confirmed stage
- Always Read before Write when updating
- Preserve all existing content when updating
- Location: ./ai-docs/PRD.md

# Execution Flow

## Phase 1: Pre-Flight Check

### 1. Validate clean start
Check if `./ai-docs/PRD.md` exists:
- If exists: ERROR: "PRD.md already exists. Delete or move existing file to regenerate." Exit.
- If not exists: Continue

### 2. Project scan
```bash
ls -la | head -10
ls ./README.md ./docs/ 2>/dev/null
```
Note context without assumptions.

### 3. Start dialogue
"Project scan complete. Let's create your Product Requirements Document."

## Phase 2: Interactive Dialogue

### Stage 1: Core Proposition

Opening: "Let me understand your product idea."

Questions:
1. What would you name this product?
2. Who is your target user?
3. What specific problem are they experiencing?
4. How would you describe the solution?

After answers:

**Apply Sequential Thinking Methodology** for user-problem fit analysis:
- Analyze user-problem fit
- Explore solution effectiveness
- Generate hypothesis
- Verify assumptions

Share analysis → Wait for "ok"

**Save after confirmation:**
```bash
mkdir -p ./ai-docs
```
Write to ./ai-docs/PRD.md:
- Section: Core Proposition
- Include: Target User, Problem, Core Solution Proposition

"Saved core proposition to ai-docs/PRD.md"

### Stage 2: Solution Design

Opening: "Now let's define the solution scope."

Questions:
1. Describe the main user flow - how does a user interact with your product from start to finish?
2. Describe how the main feature of your product will work
3. What supporting features are essential for the MVP?

After answers:

**Apply Sequential Thinking Methodology** for MVP scope analysis:
- Analyze flow effectiveness
- Explore feature necessity
- Generate MVP scope
- Verify completeness
- Enumerate discrete capabilities within Core MVP Feature for downstream traceability

Share analysis → Wait for "ok"

**Save after confirmation:**
Read ./ai-docs/PRD.md → Write updated version with:
- Section: Solution Design
- Include: Core User Flow, Core MVP Feature, Supporting Features

"Saved solution design to ai-docs/PRD.md"

### Stage 3: Technical Requirements

Opening: "Let me determine the optimal stack for your requirements."

Questions:
1. Any technical constraints or specific requirements?
2. Any preferences for specific technologies or platforms?
3. Any measurable constraints (numeric limits, thresholds, quotas)?

After answers:

**Apply Sequential Thinking Methodology** for technology selection:
- Analyze requirements
- Explore stack options
- Generate technology hypothesis
- Verify feasibility

Present recommendation with rationale → Wait for "ok"

**Save after confirmation:**
Read ./ai-docs/PRD.md → Write updated version with:
- Section: Technical Requirements
- Include: Tech Stack, Technical Constraints

"Saved technical requirements to ai-docs/PRD.md"

### Stage 4: UX Details

Opening: "Let's finalize the UX details."

Questions:
1. Any specific UX preferences (mobile-first, desktop-first, design style)?
2. Any additional design or interface requirements?

After answers:

**Apply Sequential Thinking Methodology** for UX analysis:
- Analyze interface requirements
- Explore UX patterns
- Generate design hypothesis
- Verify flow

Share analysis → Wait for "ok"

**Save after confirmation:**
Read ./ai-docs/PRD.md → Write updated version with:
- Section: UX Details
- Include: Platform Strategy, Interface Requirements

"Saved UX details to ai-docs/PRD.md"

## Phase 3: Validation

Read ./ai-docs/PRD.md

**Apply Sequential Thinking Methodology** for final validation:
- Analyze coherence
- Explore completeness
- Generate readiness hypothesis
- Verify clarity

If issues found:
"Validation notes: [issues]. Would you like to address these? (specify / 'ok' to proceed)"

Fix issues if requested → Write updated PRD.md

## Phase 4: Review & Iteration

Read ./ai-docs/PRD.md → Present summary:

"PRD generation complete!

Summary:
- Product: [name]
- For: [user] solving [problem]
- Core Feature: [feature]
- Tech Stack: [stack]

Full PRD saved at ./ai-docs/PRD.md

Would you like to:
1. Modify any section
2. Add additional details
3. Finalize (type 'done')"

If modifications requested:
- Read ./ai-docs/PRD.md
- Apply requested changes to section
- **Apply Sequential Thinking Methodology** for consistency verification
- Show before/after comparison
- Wait for user confirmation ("ok")
- Write updated ./ai-docs/PRD.md
- Loop until 'done'

"PRD finalized! Ready for implementation. Next: /docs:feature"

# Error Handling

- **No user response**: "Please provide an answer to continue or 'skip' to use placeholder"
- **File write failed**: "Failed to save PRD to ./ai-docs/PRD.md: [error]"
- **PRD already exists**: "PRD.md already exists. Delete or move existing file to regenerate"
- **Missing required fields**: "Cannot proceed without: [product name, target user, core problem]"
- **Contradicting requirements**: "Conflict detected: [detail]. Please clarify"