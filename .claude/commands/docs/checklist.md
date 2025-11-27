---
description: Generate requirement quality checklists for features.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate "Unit Tests for Requirements" — deterministic checklists that validate requirement quality and guide implementation decisions.

**Tools Usage:**
- `Read`: For loading feature artifacts
- `Write`: For saving checklist files
- `Bash`: For directory creation and file verification
- `/mcp__sequential-thinking__sequentialthinking`: For gap analysis, item generation, and resolution proposals
  - Uses Sequential Thinking methodology for structured reasoning

**Skills:**
- Feature Analyzer: For loading complete feature context from artifacts
  - Scans and loads: spec.md, ux.md, plan.md, tasks.md, data-model.md, contracts/, research.md, setup.md

**Template:**
- Checklist: @.claude/templates/checklist-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (requires all core artifacts)
- Output: `./ai-docs/features/[feature]/checklists/[domain]-checklist.md` (4 files)

# Task

Generate checklists that validate requirements quality: completeness, clarity, consistency, and measurability.
Each checklist item asks whether requirements are well-written, not whether implementation works.
Checklists serve as source of truth for implementation agents — all items must be deterministic with concrete validation criteria.

**Input format:** `/checklist [feature-path]`
- `feature-path`: Path to feature folder (required)

**Output:** 4 deterministic checklists:
- `requirements-checklist.md` — from spec.md
- `ux-checklist.md` — from ux.md
- `api-checklist.md` — from contracts/, plan.md
- `data-checklist.md` — from data-model.md

# Rules

## Core Principle

**Checklists are unit tests for requirements writing.**

If your spec is code written in English, the checklist is its test suite. You test whether requirements are well-written, complete, unambiguous, and ready for implementation — NOT whether the implementation works.

| ❌ Wrong (tests implementation) | ✅ Correct (tests requirements) |
|--------------------------------|--------------------------------|
| "Verify button clicks correctly" | "Are click behavior requirements defined for all buttons?" |
| "Test error handling works" | "Are error scenarios documented with expected behaviors?" |
| "Confirm API returns 200" | "Are success response formats specified for all endpoints?" |

## Domain Configuration

| Domain | Primary Source | Secondary | Focus |
|--------|---------------|-----------|-------|
| `requirements` | spec.md | plan.md, tasks.md | FR coverage, acceptance criteria, edge cases |
| `ux` | ux.md | spec.md (UX-XXX) | Flows, interactions, states, accessibility, errors |
| `api` | contracts/, plan.md | spec.md | Endpoints, messages, storage, errors, auth |
| `data` | data-model.md | spec.md | Entities, validation, states, relationships |

**Categories:**

| Category | Question Pattern | Implementation Trigger |
|----------|-----------------|----------------------|
| Completeness | "Is [X] documented/specified?" | If no: check secondary sources, implement default |
| Clarity | "Is [X] unambiguous/quantified?" | If no: interpret conservatively, document choice |
| Consistency | "Does [X] align with [Y]?" | If no: follow domain-primary source |
| Measurability | "Can [X] be objectively verified?" | If no: define concrete success criteria |
| Coverage | "Are all [X scenarios] addressed?" | If no: enumerate missing cases, implement each |
| Edge Case | "Is behavior for [boundary] defined?" | If no: implement defensive handling |

**Default categories per domain:**
- `requirements`: Completeness, Clarity, Consistency, Measurability, Coverage
- `ux`: Completeness, Clarity, Consistency, Coverage, Edge Case
- `api`: Completeness, Clarity, Consistency, Coverage, Edge Case
- `data`: Completeness, Clarity, Consistency, Edge Case

## Item Format Rules

**Structure:**
```
- [ ] CHK### Question about requirement quality [Reference]
```

**Components:**
- `CHK###`: Sequential ID starting from CHK001 per checklist
- Question: Asks about requirement completeness, clarity, or consistency
- `[Reference]`: See Reference Format below

**Reference Format (final output):**
- `[FR-XXX]`, `[UX-XXX]` — requirement IDs from spec.md
- `[source: Section]` — section within artifact, e.g., `[data-model: Validation Rules]`

**Intermediate markers (must be resolved before output):**
- `[Gap]` — specification missing
- `[Ambiguity]` — specification unclear
- `[Conflict]` — specifications disagree
- `[Assumption]` — implicit requirement

All intermediate markers are resolved in Phase 4. Final checklists contain only concrete references.

**Conflict reference format (during generation):**
When specifications disagree, item question must name both conflicting sources:
```markdown
- [ ] CHK### Does [X] in [source-A] align with [Y] in [source-B]? [Conflict]
```

**Valid patterns:**
- "Are [requirements] defined/specified/documented for [scenario]?"
- "Is [vague term] quantified with specific criteria?"
- "Are requirements consistent between [section A] and [section B]?"
- "Can [requirement] be objectively measured/verified?"
- "Does the spec define [missing aspect]?"

**Examples (final output):**
```markdown
- [ ] CHK001 Are success criteria defined with measurable values? [FR-001]
- [ ] CHK002 Is Bearer token authentication implemented for all endpoints? [spec: Technical Context]
- [ ] CHK003 Is timeout duration 300 seconds per MAX_OPTIMIZATION_DURATION? [data-model: Constants]
```

## Traceability Rules

- **Minimum 80%** of items must include reference
- All reference types count toward threshold
- Item question must be self-descriptive: specify what aspects need documentation
- For intermediate markers: question must enumerate expected specification elements
- Before marking `[Gap]`: verify information not present in secondary sources per Domain Configuration
- **Final output must have 0% intermediate markers** — all resolved in Phase 4

## Content Rules

- **Soft cap**: Maximum 40 items per checklist
- **Prioritize** by risk/impact if candidates exceed cap
- **Merge** near-duplicates checking same requirement aspect
- **Consolidate** low-impact edge cases: "Are edge cases X, Y, Z addressed? [Gap]"

## Anti-Patterns

**Prohibited — these test implementation:**
- ❌ "Verify", "Test", "Confirm", "Check" + implementation behavior
- ❌ "Displays correctly", "works properly", "functions as expected"
- ❌ "Click", "navigate", "render", "load", "execute"
- ❌ References to code execution or user actions
- ❌ Test cases, QA procedures, manual testing steps

**Borderline — rewrite these patterns:**
- "Is X mapped/linked to Y" → "Is relationship between X and Y documented?"
- "Is X properly specified" → "Is X specified with [criteria]?"
- "Does X handle Y" → "Is X behavior for Y scenario documented?"
- "Test/Verify X works" → "Are success criteria for X defined?"

# Execution Flow

## Phase 0: Context & Validation

### 0.1 Parse Input
Extract `FEATURE_PATH` from command arguments.

### 0.2 Load Feature Context

**Apply Feature Analyzer skill** to scan and load feature artifacts:
- Validates core files exist (spec.md, ux.md, plan.md, tasks.md)
- Loads all available artifacts into context
- Reports missing files if any

If core files missing → Report error and exit.

**Artifacts loaded into context:**
- spec.md → Requirements, user stories, acceptance criteria
- ux.md → Flows, interactions, states, error presentation
- plan.md → Architecture, components, tech stack
- tasks.md → Implementation phases, TDD coverage
- data-model.md → Entities, validation, states
- contracts/ → API specs, message formats

## Phase 1: Analyze Context

Apply `/mcp__sequential-thinking__sequentialthinking`:
```
"Analyze all feature artifacts:
→ Extract requirements with IDs (FR-XXX, UX-XXX)
→ Cross-reference research.md and setup.md for undocumented assumptions
→ Identify gaps per domain (missing specifications)
→ Detect ambiguities (vague terms, unmeasurable criteria)
→ Find inconsistencies (conflicting requirements between sources)
→ Map findings to categories
→ Prioritize by implementation impact"
```

## Phase 2: Generate Checklists

```bash
mkdir -p $FEATURE_PATH/checklists
```

**For each domain** (requirements, ux, api, data):

### 2.1 Select Categories
Select 4-5 categories from Domain Configuration defaults.

### 2.2 Generate Items

Apply `/mcp__sequential-thinking__sequentialthinking`:
```
"For [domain] checklist:
→ Extract relevant requirements from primary source
→ Check secondary sources before marking [Gap]
→ Formulate self-descriptive quality validation questions
→ Apply item format rules and reference format
→ Ensure traceability per Rules
→ Filter against anti-patterns
→ Prioritize by implementation impact"
```

Generate 5-10 items per category.

### 2.3 Consolidate
- Remove near-duplicates
- Merge related edge cases
- Ensure total ≤40 items
- Verify sequential CHK### numbering (starting CHK001 per file)

### 2.4 Write Draft Output
Write draft checklists to: `$FEATURE_PATH/checklists/[domain]-checklist.md`

**Exclude from output:** Review Checklist section (template internal validation only)

## Phase 3: Validate Draft

For each generated checklist verify:
- All items follow format rules
- No anti-pattern violations
- Traceability ≥80%
- Categories match domain
- Sequential numbering correct
- Conflict items name both sources

## Phase 4: Resolve Uncertainties

### 4.1 Collect Unresolved Items
Scan all 4 checklists for items marked `[Gap]`, `[Ambiguity]`, `[Conflict]`, `[Assumption]`.

If none found → Proceed to Phase 5.

### 4.2 Generate Resolution Options

For each unresolved item, apply `/mcp__sequential-thinking__sequentialthinking`:
```
"Resolve uncertainty for CHK###:
→ Extract context from source artifacts
→ Generate 2-3 concrete resolution options (MVP-focused)
→ Assess implications of each option
→ Formulate recommended option with rationale"
```

### 4.3 Present Resolution Dialogue

Present unresolved items per checklist (max 5 per batch):
```
⚠️ [count] items need resolution in [domain]-checklist.md:

1. CHK### [original question]
   a) [option-1]: [brief implication]
   b) [option-2]: [brief implication]
   → Recommend: [a/b] — [rationale]

2. CHK### [original question]
   a) [option-1]
   b) [option-2]
   → Recommend: [a/b] — [rationale]

Select all (e.g., "1a, 2b"):
```

**Wait for user response.** Do not proceed until selection received.

### 4.4 Rewrite Resolved Items

For each resolved item:

Apply `/mcp__sequential-thinking__sequentialthinking`:
```
"Rewrite CHK### with resolution [user selection]:
→ Transform question to concrete validation check
→ Remove intermediate marker
→ Add appropriate reference to source artifact
→ Ensure question is deterministic and verifiable"
```

**Transformation example:**
```
Before:  "Is API auth mechanism specified? [Gap]"
User:    "1a" (Bearer token)
After:   "Is Bearer token authentication specified for all endpoints? [spec: Technical Context]"
```

### 4.5 Update Checklists

Read checklist → Replace resolved items → Write updated file.

Repeat 4.3-4.5 for each checklist with remaining unresolved items.

## Phase 5: Final Report

### 5.1 Final Validation
Verify all checklists:
- Zero intermediate markers remaining
- All items have concrete references
- Traceability 100% (no unresolved items)

### 5.2 Report

```
✅ Checklists Generated

Feature: [FEATURE_NAME]
Location: [FEATURE_PATH]/checklists/

Files created:
- requirements-checklist.md ([count] items)
- ux-checklist.md ([count] items)
- api-checklist.md ([count] items)
- data-checklist.md ([count] items)

Total: [total] items across 4 checklists
Resolved: [count] uncertainties
```

# Error Handling

- **Missing feature path**: "Error: Feature path required. Usage: /checklist [feature-path]"
- **Missing core files**: "Error: [file] not found. Run [command] first."
- **Anti-pattern detected**: "Error: Item CHK### violates anti-pattern rules. Regenerating..."
- **Low traceability**: "Warning: Traceability below 80% minimum. Adding references..."
- **Conflict without sources**: "Error: Item CHK### marked [Conflict] but missing source references in question."
- **No user response**: "Waiting for resolution selection. Enter choices (e.g., '1a, 2b')."
- **Invalid selection**: "Invalid selection '[input]'. Use format: 1a, 2b, 3c"
- **Unresolved items remaining**: "Error: [count] items still unresolved. Cannot finalize checklists."