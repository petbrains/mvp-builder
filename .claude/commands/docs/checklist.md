---
description: Generate requirement quality checklists for features.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate "Unit Tests for Requirements" — checklists that validate requirement quality, not implementation correctness.

**Tools Usage:**
- `Read`: For loading feature artifacts
- `Write`: For saving checklist files
- `Bash`: For directory creation and file verification
- `/mcp__sequential-thinking__sequentialthinking`: For gap analysis and item generation
  - Uses Sequential Thinking methodology for structured reasoning

**Skills:**
- Feature Analyzer: For loading complete feature context from artifacts
  - Scans and loads: spec.md, ux.md, plan.md, tasks.md, data-model.md, contracts/, research.md, setup.md

**Template:**
- Checklist: @.claude/templates/checklist-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (requires all core artifacts)
- Output: `./ai-docs/features/[feature]/checklists/[domain]-checklist.md`

# Task

Generate checklists that validate requirements quality: completeness, clarity, consistency, and measurability.
Each checklist item asks whether requirements are well-written, not whether implementation works.

**Input format:** `/checklist [feature-path] [domain]`
- `feature-path`: Path to feature folder (required)
- `domain`: Checklist type — requirements | ux | api | data (required)

# Rules

## Core Principle

**Checklists are unit tests for requirements writing.**

If your spec is code written in English, the checklist is its test suite. You test whether requirements are well-written, complete, unambiguous, and ready for implementation — NOT whether the implementation works.

| ❌ Wrong (tests implementation) | ✅ Correct (tests requirements) |
|--------------------------------|--------------------------------|
| "Verify button clicks correctly" | "Are click behavior requirements defined for all buttons?" |
| "Test error handling works" | "Are error scenarios documented with expected behaviors?" |
| "Confirm API returns 200" | "Are success response formats specified for all endpoints?" |

## Domain Types

| Domain | Primary Source | Focus |
|--------|---------------|-------|
| `requirements` | spec.md | Overall requirement quality, FR/NFR coverage, acceptance criteria |
| `ux` | ux.md | Visual specs, interactions, states, accessibility, error presentation |
| `api` | contracts/, plan.md | Endpoints, errors, auth, versioning, request/response formats |
| `data` | data-model.md | Entities, validation rules, states, relationships, constraints |

Each domain maps to specific categories based on its primary source file.

## Item Format Rules

**Structure:**
```
- [ ] CHK### Question about requirement quality [Dimension, Reference]
```

**Components:**
- `CHK###`: Sequential ID starting from CHK001
- Question: Asks about requirement completeness, clarity, or consistency
- `[Dimension]`: Completeness | Clarity | Consistency | Measurability | Coverage | Edge Case
- `[Reference]`: `Spec §FR-XXX` | `Gap` | `Ambiguity` | `Conflict` | `Assumption`

**Valid patterns:**
- "Are [requirements] defined/specified/documented for [scenario]?"
- "Is [vague term] quantified with specific criteria?"
- "Are requirements consistent between [section A] and [section B]?"
- "Can [requirement] be objectively measured/verified?"
- "Does the spec define [missing aspect]?"

**Examples:**
```markdown
- [ ] CHK001 Are visual hierarchy requirements defined with measurable criteria? [Clarity, Spec §FR-001]
- [ ] CHK002 Is fallback behavior specified when images fail to load? [Edge Case, Gap]
- [ ] CHK003 Are loading state requirements defined for async data? [Completeness, Gap]
- [ ] CHK004 Can "prominent display" be objectively measured? [Measurability, Spec §FR-004]
```

## Category Structure

Group items by quality dimensions:

| Category | Question Focus |
|----------|---------------|
| Requirement Completeness | Are all necessary requirements documented? |
| Requirement Clarity | Are requirements specific and unambiguous? |
| Requirement Consistency | Do requirements align without conflicts? |
| Acceptance Criteria Quality | Are success criteria measurable? |
| Scenario Coverage | Are all flows/cases addressed? |
| Edge Case Coverage | Are boundary conditions defined? |
| Non-Functional Requirements | Are NFRs (performance, security, a11y) specified? |
| Dependencies & Assumptions | Are external dependencies documented? |

Select 4-6 relevant categories based on domain type.

## Traceability Rules

- **Minimum 80%** of items must include traceability reference
- Reference format: `[Spec §FR-XXX]`, `[Spec §UX-XXX]`, `[Plan §Section]`
- Gap markers: `[Gap]`, `[Ambiguity]`, `[Conflict]`, `[Assumption]`
- If no ID system exists, include: "Is a requirement ID scheme established? [Traceability, Gap]"

## Content Rules

- **Soft cap**: Maximum 40 items per checklist
- **Prioritize** by risk/impact if candidates exceed cap
- **Merge** near-duplicates checking same requirement aspect
- **Consolidate** low-impact edge cases: "Are edge cases X, Y, Z addressed? [Coverage]"

## Anti-Patterns

**Prohibited — these test implementation:**
- ❌ "Verify", "Test", "Confirm", "Check" + implementation behavior
- ❌ "Displays correctly", "works properly", "functions as expected"
- ❌ "Click", "navigate", "render", "load", "execute"
- ❌ References to code execution or user actions
- ❌ Test cases, QA procedures, manual testing steps

# Execution Flow

## Phase 0: Context & Validation

### 0.1 Parse Input
Extract from command arguments:
- `FEATURE_PATH`: Path to feature folder
- `DOMAIN`: Checklist type (requirements | ux | api | data)

Validate domain is one of allowed types.

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
- data-model.md → Entities, validation, states (if exists)
- contracts/ → API specs, message formats (if exists)

## Phase 1: Analyze Context

### 1.1 Map Domain to Sources

| Domain | Primary | Secondary |
|--------|---------|-----------|
| requirements | spec.md | plan.md, tasks.md |
| ux | ux.md | spec.md (UX-XXX requirements) |
| api | contracts/, plan.md | spec.md (API requirements) |
| data | data-model.md | spec.md (entity requirements) |

### 1.2 Analyze Requirements Quality

Apply `/mcp__sequential-thinking__sequentialthinking`:
```
"Analyze [domain] requirements from [primary source]:
→ Identify requirement gaps (missing specifications)
→ Detect ambiguities (vague terms, unmeasurable criteria)
→ Find inconsistencies (conflicting requirements)
→ Map to quality dimensions (completeness, clarity, consistency, measurability)
→ Prioritize findings by impact on implementation"
```

**Extract:**
- Existing requirements with IDs (FR-XXX, UX-XXX, NFR-XXX)
- Vague terms needing quantification
- Missing scenario coverage
- Undefined edge cases
- Assumption dependencies

## Phase 2: Generate Checklist

### 2.1 Select Categories

Based on domain and analysis results, select 4-6 categories from Category Structure.

**Domain defaults:**
- `requirements`: Completeness, Clarity, Consistency, Acceptance Criteria, Scenario Coverage
- `ux`: Completeness, Clarity, Consistency, Edge Case Coverage, Non-Functional (Accessibility)
- `api`: Completeness, Clarity, Consistency, Edge Case Coverage, Dependencies
- `data`: Completeness, Clarity, Consistency, Edge Case Coverage

### 2.2 Generate Items

Apply `/mcp__sequential-thinking__sequentialthinking`:
```
"For each selected category:
→ Extract relevant requirements from source files
→ Formulate quality validation questions
→ Apply item format rules (question pattern, dimension, reference)
→ Ensure ≥80% traceability
→ Filter against anti-patterns
→ Prioritize by implementation impact"
```

**Per category:** Generate 5-10 items focusing on requirement quality.

### 2.3 Consolidate Items

- Remove near-duplicates
- Merge related edge cases
- Ensure total ≤40 items
- Verify sequential CHK### numbering

### 2.4 Create Output

```bash
mkdir -p $FEATURE_PATH/checklists
```

**If file exists:** Warn and overwrite
```
Warning: Existing [domain]-checklist.md will be overwritten.
```

**Fill template and write:**
Write to: `$FEATURE_PATH/checklists/[domain]-checklist.md`

**Output structure:**
```markdown
# [DOMAIN] Requirements Quality Checklist: [Feature Name]

**Purpose**: Validate [domain] requirement quality for [feature]
**Created**: [DATE]
**Feature**: [feature-path]/spec.md

## [Category 1]

- [ ] CHK001 [Question] [Dimension, Reference]
- [ ] CHK002 [Question] [Dimension, Reference]

## [Category 2]

- [ ] CHK003 [Question] [Dimension, Reference]
...

## Notes

- Items validate requirement quality, not implementation
- Check off when requirement is confirmed complete/clear
- [Gap] items indicate missing requirements to add
```

## Phase 3: Validate & Report

### 3.1 Validation

Verify generated checklist:
- All items follow format rules
- No anti-pattern violations
- Traceability ≥80%
- Categories match domain
- Sequential numbering correct

### 3.2 Report

```
✅ Checklist Generated

Feature: [feature-name]
Domain: [domain]
Location: [feature-path]/checklists/[domain]-checklist.md

Summary:
- Categories: [count]
- Total Items: [count]
- Traceability: [percentage]%

Categories covered:
- [Category 1]: [count] items
- [Category 2]: [count] items
...
```

# Error Handling

- **Invalid domain**: "Error: Unknown domain '[domain]'. Use: requirements | ux | api | data"
- **Missing feature path**: "Error: Feature path required. Usage: /checklist [feature-path] [domain]"
- **Missing core files**: "Error: [file] not found. Run [command] first."
- **Primary source missing**: "Error: [domain] requires [file] which is not available."
- **Anti-pattern detected**: "Error: Item CHK### violates anti-pattern rules. Regenerating..."
- **Low traceability**: "Warning: Traceability at [X]%, below 80% minimum. Adding references..."