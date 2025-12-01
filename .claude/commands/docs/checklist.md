---
description: Generate requirement quality checklists for features.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate "Unit Tests for Requirements" — deterministic checklists that validate requirement quality.

**Tools:** `Read`, `Write`, `Bash`

**Skills:**
- Feature Analyzer: Load all feature artifacts
- Sequential Thinking: `/mcp__sequential-thinking__sequentialthinking`

**Templates:**
- @.claude/templates/checklist-template.md
- @.claude/templates/resolutions-template.md

**Input:** `/checklist [feature-path]`

**Output:**
- `[feature]/checklists/requirements-checklist.md` — from spec.md
- `[feature]/checklists/ux-checklist.md` — from ux.md
- `[feature]/checklists/api-checklist.md` — from contracts/, plan.md
- `[feature]/checklists/data-checklist.md` — from data-model.md
- `[feature]/checklists/resolutions.md` — Phase 4 decisions (if any)
- `[feature]/tasks.md` — updated with resolution tasks (if any)

# Rules

## Core Principle

Checklists test whether **requirements are well-specified**, not whether implementation works.
- ✅ "Is error behavior documented for [scenario]?"
- ❌ "Verify error handling works correctly"

## Domain Configuration

| Domain | Primary | Secondary | Focus |
|--------|---------|-----------|-------|
| `requirements` | spec.md | plan.md, tasks.md | FR coverage, acceptance criteria, edge cases |
| `ux` | ux.md | spec.md | Flows, states, accessibility, errors |
| `api` | contracts/, plan.md | spec.md | Endpoints, messages, schemas, auth |
| `data` | data-model.md | spec.md | Entities, validation, states, relationships |

## Categories

| Category | Pattern |
|----------|---------|
| Completeness | "Is [X] documented?" |
| Clarity | "Is [X] unambiguous/quantified?" |
| Consistency | "Does [X] align with [Y]?" |
| Measurability | "Can [X] be objectively verified?" |
| Coverage | "Are all [scenarios] addressed?" |
| Edge Case | "Is behavior for [boundary] defined?" |
| **Cross-Artifact** | "Does [X] in [source-A] match [Y] in [source-B]?" |

**Per-domain defaults:**
- `requirements`: Completeness, Clarity, Consistency, Coverage, **Cross-Artifact**
- `ux`: Completeness, Clarity, Coverage, Edge Case, **Cross-Artifact**
- `api`: Completeness, Clarity, Consistency, Coverage, **Cross-Artifact**
- `data`: Completeness, Clarity, Consistency, Edge Case, **Cross-Artifact**

## Cross-Artifact Checks (mandatory)

Each domain MUST include these cross-checks:

**requirements:**
- Are all FR-XXX covered by TEST tasks in tasks.md?
- Are all edge cases from spec.md covered by TEST tasks?

**ux:**
- Are all accessibility requirements covered by TEST tasks?
- Are all error types from Error Presentation defined in contracts/?
- Are exit path behaviors covered by state tests in tasks.md?

**data:**
- Do constants in data-model.md match quantified values in ux.md?
- Are all state transitions covered by TEST tasks?
- Do entity fields match schemas in openapi.yaml?

**api:**
- Do error response codes match error types in ux.md?

## Item Format

```
- [ ] CHK### Question [Reference]
```

**Components:**
- `CHK###`: Sequential ID across ALL checklists (CHK001, CHK002... CHK073, etc.)
- Question: Tests requirement quality, not implementation
- `[Reference]`: Source or resolution marker

**Numbering order:** requirements → ux → api → data (follows artifact chain: spec → ux → contracts → data-model)

**References:**
- `[FR-XXX]`, `[UX-XXX]` — requirement IDs
- `[source: Section]` — artifact section
- `[source-A → source-B]` — cross-artifact check
- `[Resolution: CHK###]` — Phase 4 decision

**Intermediate markers (resolved in Phase 4):**
- `[Gap]` — missing specification
- `[Ambiguity]` — unclear specification
- `[Conflict]` — disagreeing specifications
- `[Assumption]` — implicit requirement

## Traceability

- Minimum 80% items with references
- Final output: 0% intermediate markers
- Before `[Gap]`: verify not in secondary sources
- `[Conflict]` items must name both sources in question

## Content Limits

- Maximum 40 items per checklist
- Merge near-duplicates
- Prioritize by implementation risk

## Anti-Patterns

**Prohibited verbs:** Verify, Test, Confirm, Check + behavior
**Prohibited phrases:** "works correctly", "functions as expected", "displays properly"

**Rewrite:**
- "Does X handle Y" → "Is X behavior for Y documented?"
- "Test X works" → "Are success criteria for X defined?"

## Resolution Task Rules

**Scope:** Checklist command modifies ONLY:
- `checklists/*.md` — checklist files
- `checklists/resolutions.md` — decisions log  
- `tasks.md` — task updates

**DO NOT propose changes to:** spec.md, ux.md, plan.md, data-model.md, contracts/, or any other artifacts. Resolutions flow INTO tasks.md only.

**Every resolution MUST update tasks.md.** No exceptions. Options:
1. **NEW** — add TEST + IMPL tasks
2. **UPDATE** — clarify existing task description
3. **DEFERRED** — add to Notes section (still tracked)

### Determine Task Impact

| Resolution Type | Task Impact |
|-----------------|-------------|
| `[Gap]` → new feature | NEW: TEST + IMPL |
| `[Gap]` → specific value/config | UPDATE: existing task with value |
| `[Gap]` → "not MVP" | DEFERRED: add to Notes |
| `[Conflict]` → new approach | NEW: TEST + IMPL |
| `[Conflict]` → choose existing | UPDATE: existing task with decision |
| `[Ambiguity]` → clarify value | UPDATE: existing task with value |
| `[Assumption]` → confirmed | UPDATE: existing task with confirmation |
| `[Assumption]` → changed | NEW: TEST + IMPL |

**PROHIBITED:** Options with "No tasks generated" or "No task impact"

### New Task Format
```markdown
### From CHK###: [Title]
- [ ] TEST-{N} [USX] Test [resolved requirement] in [path]
- [ ] IMPL-{N} [USX] Implement [resolved requirement] in [path]
```

### Update Existing Task Format
```markdown
Before: - [ ] TEST-045 [US5] Test stage-level retry with exponential backoff
After:  - [ ] TEST-045 [US5] Test stage-level retry with exponential backoff (500ms, 1s, 2s per CHK002)
```

### Deferred Format
```markdown
Notes section:
- Deferred: CHK### - [brief reason] (post-MVP)
```

# Execution Flow

## Phase 0: Validation

### 0.1 Parse Input
Extract `FEATURE_PATH`.

### 0.2 Load Context
Apply Feature Analyzer skill. Require: spec.md, ux.md, plan.md, tasks.md.

### 0.3 Extract Numbering
From tasks.md: `LAST_TEST_NUM`, `LAST_IMPL_NUM`, `LAST_PHASE_NUM`.

## Phase 1: Analyze

Apply Sequential Thinking:
- Extract FR-XXX, UX-XXX requirements
- Identify gaps, ambiguities, conflicts per domain
- Map to categories including Cross-Artifact

## Phase 2: Generate

```bash
mkdir -p $FEATURE_PATH/checklists
```

**Generate in order:** requirements → ux → api → data (follows artifact chain)

Track `LAST_CHK_NUM = 0` across all domains.

For each domain:

### 2.1 Generate Items
- 5-10 items per category
- Include mandatory Cross-Artifact checks
- Apply item format and anti-patterns

### 2.2 Consolidate
- Remove duplicates
- Enforce ≤40 items per checklist
- Sequential CHK### numbering across all domains

### 2.3 Write Draft
Write to `$FEATURE_PATH/checklists/[domain]-checklist.md`

## Phase 3: Validate

Verify per checklist:
- Format compliance
- No anti-patterns
- Traceability ≥80%
- Cross-Artifact checks present
- Conflict items name both sources

## Phase 4: Resolve

### 4.1 Collect
Scan for `[Gap]`, `[Ambiguity]`, `[Conflict]`, `[Assumption]`.

If none → Phase 5.

Build list: `UNRESOLVED[] = [{id, domain, marker, question}, ...]`

### 4.2 Summary
```
⚠️ [N] items need resolution:
- requirements-checklist.md: [n] items
- ux-checklist.md: [n] items
- api-checklist.md: [n] items
- data-checklist.md: [n] items
```

### 4.3 Iterate One-by-One

**CRITICAL: Process ONE item at a time. Do NOT batch multiple questions.**

For each item in `UNRESOLVED[]`:

**4.3.1 Find Related Tasks**
Search tasks.md for tasks referencing same FR-XXX, UX-XXX, or component.
Store as `RELATED_TASKS[]`.

**4.3.2 Present Dialogue**

**Each option MUST show task impact. Never show "No tasks generated".**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Resolution [current]/[total]

[domain]-checklist.md | [marker]
CHK###: [question]

> a) [option]
     → NEW: TEST-XXX, IMPL-XXX
  b) [option]
     → UPDATE: TEST-XXX (add: [clarification])
  c) Defer to post-MVP
     → DEFERRED: add to Notes

Related: [RELATED_TASKS or "None found"]

↑/↓ select · Enter confirm · Esc skip
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Rules for options:**
- Implementation decision → NEW or UPDATE
- "Keep as-is" / "Use default" → UPDATE with confirmation
- "Not MVP" / "Defer" → DEFERRED (tracked in Notes)
- Never propose changes to spec.md, ux.md, plan.md, data-model.md, contracts/

**Wait for user selection before showing next item.**

### 4.4 Process Resolution

For each selection:

**4.4.1 Rewrite Checklist Item**
- Transform to concrete validation
- Replace marker with `[Resolution: CHK###]`

**4.4.2 Record Decision**
Add to `RESOLUTIONS[]` with task_impact field.

**4.4.3 Apply Task Impact**

If **NEW tasks**:
```
LAST_TEST_NUM++; LAST_IMPL_NUM++
Add to NEW_TASKS[]
```

If **UPDATE existing**:
```
Find task in tasks.md by ID
Append clarification: "(value per CHK###)"
Add to UPDATED_TASKS[]
```

If **DEFERRED**:
```
Add to DEFERRED[] for Notes section
```

### 4.5 Update Files

After ALL resolutions complete:

**4.5.1 Update Checklists**
Write rewritten items to checklist files.

**4.5.2 Update tasks.md**

If `NEW_TASKS[]` not empty:
- Add Phase N: Checklist Resolutions section
- Insert new tasks

If `UPDATED_TASKS[]` not empty:
- Find each task by ID
- Append clarification to description

If `DEFERRED[]` not empty:
- Add to Notes: "Deferred: CHK### - [reason]"

**4.5.3 Create resolutions.md**
Write per template with task_impact for each decision.

## Phase 5: Report

```
✅ Checklists Generated

Feature: [NAME]
Location: [PATH]/checklists/

Files:
- requirements-checklist.md ([N] items)
- ux-checklist.md ([N] items)
- api-checklist.md ([N] items)
- data-checklist.md ([N] items)
- resolutions.md ([N] decisions)

Resolved: [N] uncertainties
Tasks impact:
- New: [N] tasks added (Phase [X])
- Updated: [N] tasks clarified
- Deferred: [N] items (see Notes)
```

# Error Handling

- **Missing feature path**: "Error: Feature path required. Usage: /checklist [feature-path]"
- **Missing core files**: "Error: [file] not found. Run [command] first."
- **Anti-pattern detected**: "Error: CHK### violates anti-patterns. Regenerating..."
- **Low traceability**: "Warning: Below 80%. Adding references..."
- **No user response**: "Waiting for selection. Use ↑/↓ and Enter."
- **Unresolved remaining**: "Error: [N] items unresolved. Cannot finalize."
- **tasks.md error**: "Error: Could not update tasks.md."