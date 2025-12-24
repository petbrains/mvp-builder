# Resolutions: Group Selector

## Summary

| Metric | Count |
|--------|-------|
| Total resolved | 7 |
| Gaps filled | 4 |
| Conflicts resolved | 0 |
| Ambiguities clarified | 2 |
| Assumptions confirmed | 1 |
| New tasks created | 10 |
| Existing tasks updated | 2 |
| Deferred to future | 0 |

## Decisions

### CHK002: Alphabetical Pill Order

- **Source**: requirements-checklist.md
- **Type**: Ambiguity
- **Original**: Is the "fixed order" of pills explicitly documented with the sequence?
- **Options**: a) GROUP_NAMES order / b) Alphabetical order
- **Decision**: Alphabetical order
- **Rationale**: User selected alphabetical ordering for consistent, predictable UI
- **Task Impact**: NEW: TEST-030, IMPL-014 [US1] → Phase 2

---

### CHK005: Maintain Card Position on Group Switch

- **Source**: requirements-checklist.md
- **Type**: Ambiguity
- **Original**: Is the meaning of "update venue cards" clarified (reset to first vs maintain position)?
- **Options**: a) Reset to first card / b) Maintain current position
- **Decision**: Maintain current card position
- **Rationale**: User selected maintaining position for better UX continuity
- **Task Impact**: NEW: TEST-031, IMPL-015 [US1] → Phase 2

---

### CHK018: ARIA Controls Target

- **Source**: ux-checklist.md
- **Type**: Gap
- **Original**: Is the aria-controls attribute target (panel ID) documented?
- **Options**: a) route-summary section / b) venue-cards section / c) No aria-controls
- **Decision**: aria-controls points to route-summary section ID
- **Rationale**: User selected route-summary as primary controlled content
- **Task Impact**: NEW: TEST-032, IMPL-016 [US2] → Phase 3

---

### CHK021: Pill Spacing Quantification

- **Source**: ux-checklist.md
- **Type**: Gap
- **Original**: Is "adequate spacing" for touch targets quantified with specific pixel values?
- **Options**: a) 8px gap / b) 12px gap / c) 16px gap
- **Decision**: 12px gap between pills
- **Rationale**: User selected 12px as balanced spacing for touch targets
- **Task Impact**: UPDATE: TEST-022 (add: "with 12px gap per CHK021")

---

### CHK022: Elastic Bounce Behavior

- **Source**: ux-checklist.md
- **Type**: Assumption
- **Original**: Is the scroll boundary elastic bounce effect documented as required behavior or browser default?
- **Options**: a) Browser default / b) Explicit CSS / c) Disable bounce
- **Decision**: Rely on browser default elastic bounce
- **Rationale**: User confirmed browser default is sufficient, no custom implementation needed
- **Task Impact**: UPDATE: TEST-014 (add: "browser default behavior per CHK022")

---

### CHK027: Keyboard Navigation at First Pill

- **Source**: ux-checklist.md
- **Type**: Gap
- **Original**: Is keyboard navigation behavior at first pill (Arrow Left) defined?
- **Options**: a) Stop at boundary / b) Wrap to last pill / c) Move focus out
- **Decision**: Wrap to last pill (circular navigation)
- **Rationale**: User selected circular wrap for consistent keyboard navigation
- **Task Impact**: NEW: TEST-033, IMPL-017 [US2] → Phase 3

---

### CHK028: Keyboard Navigation at Last Pill

- **Source**: ux-checklist.md
- **Type**: Gap
- **Original**: Is keyboard navigation behavior at last pill (Arrow Right) defined?
- **Options**: a) Stop at boundary / b) Wrap to first pill / c) Move focus out
- **Decision**: Wrap to first pill (circular navigation)
- **Rationale**: User selected circular wrap, consistent with CHK027
- **Task Impact**: NEW: TEST-034 [US2] → Phase 3

---

## Tasks Cross-Reference

### New Tasks
| CHK | Tasks | Story | Description |
|-----|-------|-------|-------------|
| CHK002 | TEST-030, IMPL-014 | [US1] | Alphabetical pill order |
| CHK005 | TEST-031, IMPL-015 | [US1] | Maintain card position on group switch |
| CHK018 | TEST-032, IMPL-016 | [US2] | aria-controls to route-summary |
| CHK027 | TEST-033, IMPL-017 | [US2] | Arrow Left wraps to last pill |
| CHK028 | TEST-034 | [US2] | Arrow Right wraps to first pill |

### Updated Tasks
| CHK | Task | Change |
|-----|------|--------|
| CHK021 | TEST-022 | Added: "with 12px gap per CHK021" |
| CHK022 | TEST-014 | Added: "browser default behavior per CHK022" |

### Deferred
| CHK | Reason |
|-----|--------|
| (none) | |
