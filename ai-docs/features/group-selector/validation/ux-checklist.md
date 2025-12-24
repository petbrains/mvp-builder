# UX Checklist: Group Selector

**Source**: ux.md

## Completeness

- [ ] CHK018 Is aria-controls documented as pointing to route-summary section ID? [Completeness, ux.md: Accessibility Standards] [Resolution: CHK018]
- [ ] CHK019 Is the default selected group on initial page load documented? [Completeness, ux.md: User Flow]
- [ ] CHK020 Is the focus management behavior after pill selection documented? [Completeness, ux.md: Accessibility Standards]

## Clarity

- [ ] CHK021 Is pill spacing documented as 12px gap between pills? [Clarity, ux.md: Accessibility Standards] [Resolution: CHK021]
- [ ] CHK022 Is scroll boundary elastic bounce documented as browser default behavior? [Clarity, ux.md: scroll_pills] [Resolution: CHK022]
- [ ] CHK023 Is the iOS momentum scrolling behavior (-webkit-overflow-scrolling) explicitly required? [Clarity, ux.md: Platform-Specific Patterns]

## Coverage

- [ ] CHK024 Are all 4 state transitions in the flow diagram testable? [Coverage, ux.md: User Flow]
- [ ] CHK025 Are both interaction types (tap_pill, scroll_pills) fully documented with trigger/feedback/success/error? [Coverage, ux.md: Interaction Model]
- [ ] CHK026 Are all scenario types covered: Primary, Alternate, Exception, Recovery? [Coverage, ux.md: User Flow]

## Edge Case

- [ ] CHK027 Is keyboard navigation at first pill documented as wrapping to last pill? [Edge Case, ux.md: Accessibility Standards] [Resolution: CHK027]
- [ ] CHK028 Is keyboard navigation at last pill documented as wrapping to first pill? [Edge Case, ux.md: Accessibility Standards] [Resolution: CHK028]
- [ ] CHK029 Is behavior defined when user scrolls pills while one is focused via keyboard? [Edge Case, ux.md: Accessibility Standards]

## Cross-Artifact

- [ ] CHK030 Are all accessibility requirements (role, aria-*) covered by TEST tasks in tasks.md? [Coverage, ux.md → tasks.md]
- [ ] CHK031 Are exit path behaviors (scroll away, group switch) covered by state tests? [Coverage, ux.md → tasks.md]
- [ ] CHK032 Do quantified UX elements (44px, 15%, 0ms) match constants in data-model.md? [Consistency, ux.md → data-model.md]
