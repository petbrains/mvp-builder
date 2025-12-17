---
description: Validate requirements and generate quality checklists for features.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate "Unit Tests for Requirements" — deterministic checklists that validate requirement quality.

**Tools Usage:**
- `Read`: For loading feature artifacts
- `Write`: For saving checklist files and updating tasks.md
- `Bash`: For directory creation and file verification

**Skills:**
- Feature Analyzer: For loading complete feature context from artifacts
  - Scans and loads: spec.md, ux.md, plan.md, tasks.md, data-model.md, contracts/, research.md, setup.md
- Sequential Thinking Methodology: For structured reasoning during analysis and generation
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

**Templates:**
- Checklist: @.claude/templates/checklist-template.md
- Resolutions: @.claude/templates/resolutions-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (requires core artifacts)
- Output: 
  - `./ai-docs/features/[feature]/validation/[domain]-checklist.md` (4 files)
  - `./ai-docs/features/[feature]/validation/resolutions.md` (if any)
  - `./ai-docs/features/[feature]/tasks.md` (updated with resolution tasks)

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

| Category | Dimension | Pattern |
|----------|-----------|---------|
| Completeness | `Completeness` | "Is [X] documented?" |
| Clarity | `Clarity` | "Is [X] unambiguous/quantified?" |
| Consistency | `Consistency` | "Does [X] align with [Y]?" |
| Coverage | `Coverage` | "Are all [scenarios] addressed?" |
| Edge Case | `Edge Case` | "Is behavior for [boundary] defined?" |
| **Cross-Artifact** | `Consistency`/`Coverage` | "Does [X] in [source-A] match [Y] in [source-B]?" |

**Per-domain categories (required):**
- `requirements`: Completeness, Clarity, Consistency, Coverage, **Cross-Artifact**
- `ux`: Completeness, Clarity, Coverage, Edge Case, **Cross-Artifact**
- `api`: Completeness, Clarity, Consistency, Coverage, **Cross-Artifact**
- `data`: Completeness, Clarity, Consistency, Edge Case, **Cross-Artifact**

May add other categories if content warrants.

## Cross-Artifact Checks (mandatory)

Each domain MUST include these cross-checks:

**requirements:**
- Are all FR-XXX covered by TEST tasks in tasks.md?
- Are all edge cases from spec.md covered by TEST tasks?
- Are all scenario types covered: Primary, Alternate, Exception/Error, Recovery?

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
- Are all message/endpoint handlers covered by TEST tasks?

## Item Format

```
- [ ] CHK### Question [Dimension, Reference]
```

**Components:**
- `CHK###`: Sequential ID across ALL checklists (CHK001, CHK002... CHK073, etc.)
- Question: Tests requirement quality, not implementation
- `[Dimension, Reference]`: Quality dimension + source

**Quality Dimensions:**
- `Completeness` — Is requirement present?
- `Clarity` — Is requirement unambiguous/quantified?
- `Consistency` — Does requirement align with others?
- `Coverage` — Are all scenarios addressed?
- `Edge Case` — Are boundary conditions defined?

**Examples:**
```markdown
- [ ] CHK007 Is the 60-second timeout explicitly defined with units? [Clarity, FR-009]
- [ ] CHK018 Are all error types covered by TEST tasks? [Coverage, ux.md → tasks.md]
- [ ] CHK042 Is behavior defined when estimated time exceeds timeout? [Edge Case, Resolution: CHK042]
```

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
- Every item must include quality dimension: `[Dimension, Reference]`

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
- `validation/*.md` — checklist files
- `validation/resolutions.md` — decisions log  
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
**Coverage**:
- Resolution: [CHK### decision summary]

#### RED Phase
- [ ] TEST-{N} [USX] Test [resolved requirement] in [path]

#### GREEN Phase
- [ ] IMPL-{N} [USX] Implement [resolved requirement] in [path]
```

### Target Phase Determination

New tasks inherit [USX] from resolution context and are placed in corresponding phase:

| Task Label | Target Phase |
|------------|--------------|
| [US1] | Phase containing "User Story 1" |
| [US2] | Phase containing "User Story 2" |
| [USN] | Phase containing "User Story N" |
| INIT-* | Phase 1: Core Infrastructure |
| No label | Last user story phase |

**Rule:** Tasks are appended as new TDD Cycles at the end of their target phase, preserving phase integrity and logical grouping.

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

### 0.2 Load Feature Context

**Apply Feature Analyzer skill** to scan and load feature artifacts:
- Validates core files exist (spec.md, ux.md, plan.md, tasks.md, data-model.md)
- Loads all available artifacts into context
- Reports missing files if any

If core files missing → Report error and exit.

### 0.3 Extract Numbering
From tasks.md: `LAST_TEST_NUM`, `LAST_IMPL_NUM`, `LAST_PHASE_NUM`.

### 0.4 Build Phase Map
Parse tasks.md to create phase-to-story mapping:
```
PHASE_MAP = {}
For each "## Phase N:" header:
  - Extract phase number N
  - Extract user story label from header (e.g., "User Story 1" → US1)
  - PHASE_MAP[USX] = N
```

## Phase 1: Analyze Context

**Apply Sequential Thinking Methodology** for artifact analysis:
- Extract requirements with IDs (FR-XXX, UX-XXX)
- Identify gaps, ambiguities, conflicts per domain
- Map findings to categories including Cross-Artifact
- Detect scenario coverage gaps (Primary, Alternate, Exception, Recovery)
- Prioritize by implementation impact

## Phase 2: Generate Checklists

```bash
mkdir -p $FEATURE_PATH/checklists
```

**Generate in order:** requirements → ux → api → data (follows artifact chain)

Track `LAST_CHK_NUM = 0` across all domains.

For each domain:

### 2.1 Generate Items

**Apply Sequential Thinking Methodology** for item generation:
- Extract relevant requirements from primary source
- Check secondary sources before marking [Gap]
- Formulate quality validation questions with dimensions
- Apply item format rules and reference format
- Filter against anti-patterns
- Include mandatory Cross-Artifact checks

Generate 5-10 items per category.

### 2.2 Consolidate
- Remove duplicates
- Enforce ≤40 items per checklist
- Sequential CHK### numbering across all domains

### 2.3 Write Draft
Write to `$FEATURE_PATH/validation/[domain]-checklist.md`

**Exclude from output:** Review Checklist section (template internal validation only)

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

### 4.2 Generate Resolution Options

**Apply Sequential Thinking Methodology** for each unresolved item:
- Generate 2-3 concrete resolution options (MVP-focused)
- Determine task impact for each option (NEW, UPDATE, or DEFERRED)
- Find related tasks in tasks.md
- Formulate recommended option with rationale

### 4.3 Present Resolution Dialogue

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
     → NEW: TEST-XXX, IMPL-XXX [USX] → Phase N
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

**Apply Sequential Thinking Methodology** for each selection:

**4.4.1 Rewrite Checklist Item**
- Transform to concrete validation
- Replace marker with `[Resolution: CHK###]`

**4.4.2 Record Decision**
Add to `RESOLUTIONS[]` with task_impact field.

**4.4.3 Apply Task Impact**

If **NEW tasks**:
```
LAST_TEST_NUM++; LAST_IMPL_NUM++
Extract [USX] label from resolution context (from related tasks or requirement reference)
Determine target_phase using PHASE_MAP:
  - [USX] found in PHASE_MAP → target_phase = PHASE_MAP[USX]
  - INIT-* prefix → target_phase = 1
  - No US context → target_phase = LAST_PHASE_NUM (last user story phase)
Add to NEW_TASKS[] with {task, target_phase, chk_id, us_label}
```

If **UPDATE existing**:
```
Search tasks.md for task by ID (TEST-XXX or IMPL-XXX)
If NOT FOUND:
  Show error: "⚠️ Task [ID] not found in tasks.md"
  List 3 closest matches by Coverage/Requirements
  Ask: "Select correct task ID or enter manually:"
  Wait for user input
If FOUND:
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

**4.5.2.1 Group Tasks by Target Phase**
```
PHASE_GROUPS = {}
For each task in NEW_TASKS[]:
  phase = task.target_phase
  PHASE_GROUPS[phase].append(task)
```

**4.5.2.2 Insert into Existing Phases**
For each phase in PHASE_GROUPS (sorted by phase number ascending):
```
- Locate "## Phase {N}:" section in tasks.md
- Find last "### TDD Cycle" or "### From CHK" subsection in that phase
- After last subsection (before next "## Phase" or end of file), append:

### From CHK###: [Resolution Title]
**Coverage**:
- Resolution: [CHK### decision summary]

#### RED Phase
- [ ] TEST-{N} [USX] [description]

#### GREEN Phase
- [ ] IMPL-{N} [USX] [description]
```

**4.5.2.3 Numbering Continuity**
- TEST-/IMPL- numbers continue sequentially from LAST_TEST_NUM/LAST_IMPL_NUM
- Numbers reflect creation order, not position in file
- Execution order determined by file structure (Phase → Cycle → Task)

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
Location: [PATH]/validation/

Files:
- requirements-checklist.md ([N] items)
- ux-checklist.md ([N] items)
- api-checklist.md ([N] items)
- data-checklist.md ([N] items)
- resolutions.md ([N] decisions)

Resolved: [N] uncertainties
Tasks impact:
- New: [N] tasks added
- Updated: [N] tasks clarified
- Deferred: [N] items (see Notes)

Next: Use feature-setup <feature-path>
```

# Error Handling

- **Missing feature path**: "Error: Feature path required. Usage: /checklist [feature-path]"
- **Missing core files**: "Error: [file] not found. Run [command] first."
- **Anti-pattern detected**: "Error: CHK### violates anti-patterns. Regenerating..."
- **Low traceability**: "Warning: Below 80%. Adding references..."
- **No user response**: "Waiting for selection. Use ↑/↓ and Enter."
- **Unresolved remaining**: "Error: [N] items unresolved. Cannot finalize."
- **tasks.md error**: "Error: Could not update tasks.md."
- **Phase not found**: "Error: Cannot locate Phase [N] for [USX]. Check tasks.md structure."