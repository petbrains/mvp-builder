# Requirements Checklist: Group Selector

**Source**: spec.md

## Completeness

- [ ] CHK001 Is the number of group pills explicitly defined with exact count? [Completeness, FR-001]
- [ ] CHK002 Is the pill order documented as alphabetical? [Completeness, FR-001] [Resolution: CHK002]
- [ ] CHK003 Is the horizontal scroll trigger condition documented (when pills overflow viewport)? [Completeness, FR-002]
- [ ] CHK004 Is the active pill initialization behavior documented (which pill is active on load)? [Completeness, FR-004]

## Clarity

- [ ] CHK005 Is "update venue cards" documented as maintaining current card position on group switch? [Clarity, FR-005] [Resolution: CHK005]
- [ ] CHK006 Is "instant" update latency quantified with a specific value (e.g., 0ms)? [Clarity, FR-006]
- [ ] CHK007 Is the behavior when tapping an already-active pill explicitly defined? [Clarity, FR-003]

## Consistency

- [ ] CHK008 Does the pill count (4) match the GROUP_NAMES constant from daily-route-generator? [Consistency, FR-001 → data-model.md]
- [ ] CHK009 Does the active pill styling description align between spec.md and ux.md? [Consistency, UX-002 → ux.md]

## Coverage

- [ ] CHK010 Are all scenario types covered: Primary, Alternate, Exception, Recovery? [Coverage, spec.md: Acceptance Scenarios]
- [ ] CHK011 Are all 5 acceptance scenarios mapped to test tasks? [Coverage, spec.md → tasks.md]
- [ ] CHK012 Is keyboard navigation behavior included in functional requirements? [Coverage, spec.md]

## Edge Case

- [ ] CHK013 Is behavior defined when user rapidly taps multiple pills in succession? [Edge Case, FR-003]
- [ ] CHK014 Is behavior defined for screen widths where all 4 pills fit without scrolling? [Edge Case, FR-002]

## Cross-Artifact

- [ ] CHK015 Are all FR-XXX requirements covered by TEST tasks in tasks.md? [Coverage, spec.md → tasks.md]
- [ ] CHK016 Are all UX-XXX requirements covered by TEST tasks in tasks.md? [Coverage, spec.md → tasks.md]
- [ ] CHK017 Are both edge cases from spec.md covered by TEST tasks? [Coverage, spec.md → tasks.md]
