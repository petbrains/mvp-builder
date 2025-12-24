# Requirements Checklist: Route Summary

**Source**: spec.md

## Completeness

- [ ] CHK001 Is the exact label text "Vibe of the day:" documented? [Completeness, FR-001]
- [ ] CHK002 Is the group name display style (large, bold, white) fully specified? [Completeness, FR-002]
- [ ] CHK003 Is the graceful handling for missing description behavior explicit (omit element vs show empty)? [Completeness, FR-003]
- [ ] CHK004 Is the route preview venue count explicitly stated as 4? [Completeness, FR-004]
- [ ] CHK005 Is the slot emoji + venue name format documented with separator character? [Completeness, FR-005]

## Clarity

- [x] CHK006 Is "large" font size quantified with specific value (px/rem)? [Clarity, FR-002] [Resolution: CHK006 → 1.875rem/30px]
- [ ] CHK007 Is the 500ms scroll duration explicitly defined with units? [Clarity, FR-006]
- [x] CHK008 Is "instantly" update behavior defined with a measurable threshold? [Clarity, FR-007] [Resolution: CHK008 → <100ms]

## Consistency

- [ ] CHK009 Does GROUP_NAME_COLOR (#ffffff) in data-model.md match FR-002 "white" specification? [Consistency, FR-002 → data-model.md]
- [ ] CHK010 Do SLOT_LABELS values in data-model.md match PRD.md SLOT_LABELS constant? [Consistency, data-model.md → PRD.md]

## Coverage

- [ ] CHK011 Are all scenario types covered: Primary (display), Alternate (switch group), Exception (missing desc)? [Coverage, spec.md]
- [ ] CHK012 Is recovery scenario addressed or explicitly marked N/A for static content? [Coverage, spec.md]

## Edge Case

- [ ] CHK013 Is behavior for very long group names (exceeding container width) defined? [Edge Case, FR-002]
- [ ] CHK014 Is truncation behavior for long venue names explicit with method (ellipsis vs clip)? [Edge Case, UX-003]

## Cross-Artifact

- [ ] CHK015 Are all FR-XXX requirements (FR-001 to FR-007) covered by TEST tasks in tasks.md? [Coverage, spec.md → tasks.md]
- [ ] CHK016 Are both edge cases (long venue name, missing description) covered by TEST tasks? [Coverage, spec.md → tasks.md]
