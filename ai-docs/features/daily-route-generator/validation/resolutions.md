# Resolutions: Daily Route Generator

## Summary

| Metric | Count |
|--------|-------|
| Total resolved | 7 |
| Gaps filled | 4 |
| Conflicts resolved | 0 |
| Ambiguities clarified | 2 |
| Assumptions confirmed | 1 |
| New tasks created | 4 |
| Existing tasks updated | 2 |
| Deferred to future | 3 |

## Decisions

### CHK001: Group Description Validation

- **Source**: requirements-checklist.md
- **Type**: Gap
- **Original**: Is a functional requirement defined for group_description field validation?
- **Options**: a) Add FR-009 / b) Include in FR-003 / c) Defer
- **Decision**: Option A - Add FR-009: group_description must be non-empty string
- **Rationale**: GroupData.group_description is required in data-model.md but had no corresponding functional requirement or test
- **Task Impact**: NEW: TEST-040, IMPL-018 [US1] → Phase 2

### CHK005: Rating Range Specification

- **Source**: requirements-checklist.md
- **Type**: Ambiguity
- **Original**: Is the rating validation range (1.0-5.0) explicitly stated in FR-003?
- **Options**: a) Clarify FR-003 / b) Keep implicit in data-model.md / c) Add new FR-010
- **Decision**: Option B - data-model.md defines the authoritative range
- **Rationale**: Range is already validated by TEST-012; no spec change needed, just clarification
- **Task Impact**: UPDATE: TEST-012 (add: "per data-model.md CHK005")

### CHK006: Story Length Constraint

- **Source**: requirements-checklist.md
- **Type**: Gap
- **Original**: Is the story length constraint (2-3 sentences) quantified with validation criteria?
- **Options**: a) Add character validation / b) Editorial guideline only / c) Soft warning
- **Decision**: Option B - Editorial guideline, not code validation
- **Rationale**: Story content is curated in JSON, not user-generated; validation adds no value
- **Task Impact**: DEFERRED: add to Notes

### CHK013: Extra Groups Behavior

- **Source**: requirements-checklist.md
- **Type**: Gap
- **Original**: Is behavior defined for JSON with extra groups beyond GROUP_NAMES?
- **Options**: a) Ignore silently / b) Fail with warning / c) Defer
- **Decision**: Option A - Ignore extra groups silently
- **Rationale**: Defensive coding pattern; curated JSON unlikely to have extras; don't break on extra data
- **Task Impact**: UPDATE: TEST-003 (add: "extra groups ignored per CHK013")

### CHK017: Rating Type Coercion

- **Source**: requirements-checklist.md
- **Type**: Gap
- **Original**: Is behavior defined when rating field contains string instead of number?
- **Options**: a) Fail on wrong type / b) Auto-coerce / c) Defer
- **Decision**: Option A - Build fails when rating is not a number type
- **Rationale**: Type safety prevents runtime errors; explicit failure catches data issues early
- **Task Impact**: NEW: TEST-041, IMPL-019 [US1] → Phase 2

### CHK022: Embedding Failure Exit Path

- **Source**: ux-checklist.md
- **Type**: Assumption
- **Original**: Is exit path behavior defined for embedding failure scenario?
- **Options**: a) Add custom handler / b) Log and continue / c) Framework-handled
- **Decision**: Option C - Next.js framework handles embedding failures
- **Rationale**: Static export failures are build-level errors; no custom code needed
- **Task Impact**: DEFERRED: add to Notes

### CHK026: CI/CD Timeout Quantification

- **Source**: ux-checklist.md
- **Type**: Ambiguity
- **Original**: Is the "reasonable time for CI/CD" constraint quantified with specific timeout value?
- **Options**: a) Add 30s timeout / b) No timeout needed / c) Defer
- **Decision**: Option B - No timeout needed for synchronous file operations
- **Rationale**: File reads are milliseconds; seedrandom selection is instant; no async operations
- **Task Impact**: DEFERRED: add to Notes

---

## Tasks Cross-Reference

### New Tasks
| CHK | Tasks | Story | Description |
|-----|-------|-------|-------------|
| CHK001 | TEST-040, IMPL-018 | US1 | Group description non-empty validation |
| CHK017 | TEST-041, IMPL-019 | US1 | Rating type check (typeof === 'number') |

### Updated Tasks
| CHK | Task | Change |
|-----|------|--------|
| CHK005 | TEST-012 | Added: "(per data-model.md CHK005)" |
| CHK013 | TEST-003 | Added: "(extra groups ignored per CHK013)" |

### Deferred
| CHK | Reason |
|-----|--------|
| CHK006 | Editorial guideline, not code validation (post-MVP) |
| CHK022 | Framework-handled embedding (post-MVP) |
| CHK026 | No timeout needed for sync operations (post-MVP) |
