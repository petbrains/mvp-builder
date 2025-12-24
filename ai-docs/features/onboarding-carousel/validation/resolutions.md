# Resolutions: Onboarding Carousel

## Summary

| Metric | Count |
|--------|-------|
| Total resolved | 8 |
| Gaps filled | 4 |
| Conflicts resolved | 0 |
| Ambiguities clarified | 2 |
| Assumptions confirmed | 2 |
| New tasks created | 2 |
| Existing tasks updated | 6 |
| Deferred to future | 0 |

## Decisions

### CHK004: Auto-Scroll Duration Constant

- **Source**: requirements-checklist.md
- **Type**: Gap
- **Original**: Is the auto-scroll duration documented with value and units?
- **Options**: a) Add AUTO_SCROLL_DURATION = 500 / b) Different value
- **Decision**: Add AUTO_SCROLL_DURATION = 500 to constants (matching ux.md 500ms)
- **Rationale**: Aligns with documented 500ms scroll duration in ux.md
- **Task Impact**: UPDATE: INIT-003 (add: "AUTO_SCROLL_DURATION per CHK004")

---

### CHK008: Wrap-Around Bounce Behavior

- **Source**: requirements-checklist.md
- **Type**: Ambiguity
- **Original**: Is "no wrap around" behavior unambiguous (bounce effect vs hard stop)?
- **Options**: a) Embla default bounce / b) Hard stop / c) Custom animation
- **Decision**: Bounce effect using Embla carousel default behavior
- **Rationale**: Embla provides built-in bounce effect, no custom implementation needed
- **Task Impact**: UPDATE: TEST-025, TEST-026 (add: "with Embla bounce effect per CHK008")

---

### CHK018: Dot Indicator Active Size

- **Source**: ux-checklist.md
- **Type**: Gap
- **Original**: Is the dot indicator active state size difference documented?
- **Options**: a) 1.5x size / b) Same size, styling only
- **Decision**: Active dot same size with styling difference only (color/opacity)
- **Rationale**: User selected simpler visual distinction without size change
- **Task Impact**: UPDATE: TEST-007 (add: "same size, styling difference only per CHK018")

---

### CHK022: Velocity-Based Snap Threshold

- **Source**: ux-checklist.md
- **Type**: Ambiguity
- **Original**: Is "velocity-based snap" quantified with threshold values?
- **Options**: a) Embla default / b) Custom threshold
- **Decision**: Use Embla carousel default velocity threshold
- **Rationale**: Default Embla behavior provides good UX, no custom config needed
- **Task Impact**: UPDATE: IMPL-008 (add: "Embla default velocity per CHK022")

---

### CHK023: Bounce Effect Implementation

- **Source**: ux-checklist.md
- **Type**: Assumption
- **Original**: Is the bounce effect at boundaries documented (Embla default or custom)?
- **Options**: a) Embla default / b) Custom animation
- **Decision**: Confirm Embla default bounce behavior
- **Rationale**: Embla provides smooth bounce effect out of the box
- **Task Impact**: UPDATE: IMPL-011 (add: "Embla default bounce confirmed per CHK023")

---

### CHK028: Keyboard Navigation at First Dot

- **Source**: ux-checklist.md
- **Type**: Gap
- **Original**: Is keyboard navigation behavior at first dot (Arrow Left) defined?
- **Options**: a) Stop / b) Wrap to last / c) Move focus out
- **Decision**: Stop at first dot (no wrap, no action on Arrow Left)
- **Rationale**: Consistent with carousel swipe boundary behavior (no wrap-around)
- **Task Impact**: NEW: TEST-033, IMPL-015 [US3] → Phase 4

---

### CHK029: Keyboard Navigation at Last Dot

- **Source**: ux-checklist.md
- **Type**: Gap
- **Original**: Is keyboard navigation behavior at last dot (Arrow Right) defined?
- **Options**: a) Stop / b) Wrap to first / c) Move focus out
- **Decision**: Stop at last dot (no wrap, consistent with CHK028)
- **Rationale**: Consistent with CHK028 and carousel no-wrap behavior
- **Task Impact**: UPDATE: TEST-033 (add: "and no wrap at last dot per CHK029")

---

### CHK034: AUTO_SCROLL_DURATION in Data Model

- **Source**: data-checklist.md
- **Type**: Gap
- **Original**: Is AUTO_SCROLL_DURATION constant documented with value (500ms)?
- **Options**: a) Confirm alignment with CHK004 / b) Different value
- **Decision**: Confirm AUTO_SCROLL_DURATION = 500 (aligns with CHK004)
- **Rationale**: Ensures consistency between requirements and data model
- **Task Impact**: UPDATE: INIT-003 (confirmed alignment with CHK004)

---

## Tasks Cross-Reference

### New Tasks
| CHK | Tasks | Story | Description |
|-----|-------|-------|-------------|
| CHK028+CHK029 | TEST-033, IMPL-015 | [US3] | Keyboard boundary stop behavior (no wrap) |

### Updated Tasks
| CHK | Task | Change |
|-----|------|--------|
| CHK004, CHK034 | INIT-003 | Added: "AUTO_SCROLL_DURATION per CHK004/CHK034" |
| CHK018 | TEST-007 | Added: "same size, styling difference only per CHK018" |
| CHK008 | TEST-025, TEST-026 | Added: "with Embla bounce effect per CHK008" |
| CHK022 | IMPL-008 | Added: "Embla default velocity per CHK022" |
| CHK023 | IMPL-011 | Added: "Embla default bounce confirmed per CHK023" |

### Deferred
| CHK | Reason |
|-----|--------|
| (none) | |
