# Data Checklist: Page Layout

**Source**: data-model.md

## Completeness

- [ ] CHK036 Is the Section entity complete with all required fields (id, type, height)? [Completeness, data-model.md: Entities]
- [ ] CHK037 Is the AutoScrollConfig entity complete with all fields (targetId, duration, easing)? [Completeness, data-model.md: Entities]
- [ ] CHK038 Are all constants documented with values, descriptions, and source references? [Completeness, data-model.md: Constants]

## Clarity

- [ ] CHK039 Is the default easing function specified (ease-out vs ease-in-out)? [Clarity, Resolution: CHK039]
- [ ] CHK040 Is the 100dvh fallback behavior for ONBOARDING_HEIGHT explicitly defined? [Clarity, data-model.md: Constants]
- [ ] CHK041 Is the tolerance for AUTO_SCROLL_DURATION (500ms) defined for browser variations? [Clarity, Resolution: CHK041]

## Consistency

- [ ] CHK042 Does SECTION_ORDER in data-model.md match section order in spec.md FR-002? [Consistency, data-model.md → spec.md]
- [ ] CHK043 Does FOOTER_TEXT in data-model.md match footer text in spec.md FR-006? [Consistency, data-model.md → spec.md]
- [ ] CHK044 Do SECTION_PADDING values match quantified values in ux.md? [Consistency, data-model.md → ux.md]

## Edge Case

- [ ] CHK045 Is behavior defined when Section.height = 'auto' results in 0 height? [Edge Case, data-model.md: Section]
- [ ] CHK046 Is behavior defined when AutoScrollConfig.targetId references non-existent section? [Edge Case, data-model.md: AutoScrollConfig]

## Cross-Artifact

- [ ] CHK047 Do constants in data-model.md match quantified values in ux.md (padding, colors, durations)? [Consistency, data-model.md → ux.md]
- [ ] CHK048 Are all state transitions in data-model.md covered by TEST tasks in tasks.md? [Coverage, data-model.md → tasks.md]
- [ ] CHK049 Do entity fields in data-model.md align with implementation in plan.md? [Consistency, data-model.md → plan.md]

---
