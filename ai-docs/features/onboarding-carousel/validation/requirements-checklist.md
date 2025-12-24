# Requirements Checklist: Onboarding Carousel

**Source**: spec.md

## Completeness

- [ ] CHK001 Is the carousel height explicitly defined with units (100vh)? [Completeness, FR-001]
- [ ] CHK002 Is the exact slide count documented (4 slides)? [Completeness, FR-002]
- [ ] CHK003 Is the slide order explicitly defined (Hook, Problem, Solution, CTA)? [Completeness, FR-002]
- [ ] CHK004 Is AUTO_SCROLL_DURATION = 500ms documented in constants? [Completeness, FR-009] [Resolution: CHK004]
- [ ] CHK005 Is the CTA button text explicitly specified? [Completeness, FR-008]

## Clarity

- [ ] CHK006 Is "smooth scroll" behavior quantified with duration (500ms)? [Clarity, FR-009]
- [ ] CHK007 Is the swipe gesture threshold documented with units? [Clarity, FR-003]
- [ ] CHK008 Is "no wrap around" documented as Embla default bounce effect? [Clarity, FR-005] [Resolution: CHK008]

## Consistency

- [ ] CHK009 Does the slide count (4) match across spec.md, ux.md, and data-model.md? [Consistency, FR-002 → data-model.md]
- [ ] CHK010 Does the CTA button visibility rule align between spec.md and data-model.md? [Consistency, FR-008 → data-model.md]

## Coverage

- [ ] CHK011 Are all scenario types covered: Primary, Alternate, Exception, Recovery? [Coverage, spec.md: Acceptance Scenarios]
- [ ] CHK012 Are all 6 acceptance scenarios mapped to TEST tasks? [Coverage, spec.md → tasks.md]

## Edge Case

- [ ] CHK013 Is behavior defined for rapid consecutive swipe gestures? [Edge Case, spec.md: Edge Cases]
- [ ] CHK014 Is behavior defined for viewport resize during carousel view? [Edge Case, spec.md: Edge Cases]

## Cross-Artifact

- [ ] CHK015 Are all FR-XXX requirements covered by TEST tasks in tasks.md? [Coverage, spec.md → tasks.md]
- [ ] CHK016 Are all UX-XXX requirements covered by TEST tasks in tasks.md? [Coverage, spec.md → tasks.md]
- [ ] CHK017 Are both edge cases from spec.md covered by TEST tasks? [Coverage, spec.md → tasks.md]
