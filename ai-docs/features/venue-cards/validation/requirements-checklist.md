# Requirements Checklist: Venue Cards

**Source**: spec.md

## Completeness

- [ ] CHK001 Is the exact card count (4) documented with source reference? [Completeness, FR-001]
- [ ] CHK002 Is the slot ordering (Morning, Lunch, Afternoon, Evening) explicitly specified? [Completeness, FR-002]
- [ ] CHK003 Are all slot badge display requirements documented (emoji, label, color)? [Completeness, FR-003]
- [ ] CHK004 Is behavior when rating is missing explicitly documented? [Completeness, FR-004]
- [ ] CHK005 Are swipe navigation requirements documented with direction mapping? [Completeness, FR-005]
- [ ] CHK006 Is dot indicator count explicitly specified (not inferred)? [Completeness, FR-008]
- [ ] CHK007 Is carousel reset behavior on group change documented with target state? [Completeness, FR-009]

## Clarity

- [ ] CHK008 Are all slot colors specified with hex values? [Clarity, UX-001]
- [ ] CHK009 Is the rating display format unambiguous ("Rating: X.X")? [Clarity, UX-004]
- [ ] CHK010 Is the Maps button styling quantified (width, border color, height)? [Clarity, UX-007]
- [ ] CHK011 Are card styling values (background, border colors) explicitly specified? [Clarity, UX-008]
- [ ] CHK012 Is "no auto-advance" behavior defined with timing constraints? [Clarity, FR-006]
- [ ] CHK013 Is "no wrap-around" behavior defined for both boundaries? [Clarity, FR-006]

## Consistency

- [ ] CHK014 Does FR-001 card count match CARD_COUNT constant in data-model.md? [Consistency, spec.md → data-model.md]
- [ ] CHK015 Do slot colors in UX-001 match SLOT_COLORS in data-model.md? [Consistency, spec.md → data-model.md]
- [ ] CHK016 Does FR-009 reset behavior match state transition table? [Consistency, spec.md → data-model.md]

## Coverage

- [ ] CHK017 Are all scenario types covered: Primary, Alternate, Exception, Recovery? [Coverage, spec.md: Acceptance Scenarios]
- [ ] CHK018 Is P1 (MVP) scenario for card display with all fields documented? [Coverage, spec.md: Scenario 1, 4]
- [ ] CHK019 Is P1 (MVP) scenario for Maps button opening documented? [Coverage, spec.md: Scenario 2]
- [ ] CHK020 Are P2 scenarios for swipe navigation documented? [Coverage, spec.md: Scenario 3, 7]
- [ ] CHK021 Are P3 scenarios for boundary blocking documented? [Coverage, spec.md: Scenario 5, 6]
- [ ] CHK022 Are all 3 edge cases documented with handling behavior? [Coverage, spec.md: Edge Cases]

## Cross-Artifact

- [ ] CHK023 Are all FR-XXX (FR-001 to FR-010) covered by TEST tasks in tasks.md? [Coverage, spec.md → tasks.md]
- [ ] CHK024 Are all UX-XXX (UX-001 to UX-008) covered by TEST tasks in tasks.md? [Coverage, spec.md → tasks.md]
- [ ] CHK025 Are all edge cases (long story, malformed URI, missing rating) covered by TEST tasks? [Coverage, spec.md → tasks.md]
- [ ] CHK026 Do acceptance scenario priorities (P1, P2, P3) map to Phase order in tasks.md? [Consistency, spec.md → tasks.md]
