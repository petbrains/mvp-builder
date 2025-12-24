# UX Checklist: Onboarding Carousel

**Source**: ux.md

## Completeness

- [ ] CHK018 Is active dot documented as same size with styling difference only? [Completeness, ux.md: Accessibility Standards] [Resolution: CHK018]
- [ ] CHK019 Is the CTA button pressed state styling documented? [Completeness, ux.md: tap_cta]
- [ ] CHK020 Is the default slide on page load documented (slide 1)? [Completeness, ux.md: User Flow]
- [ ] CHK021 Is focus management after CTA scroll documented? [Completeness, ux.md: tap_cta]

## Clarity

- [ ] CHK022 Is velocity-based snap documented as Embla default threshold? [Clarity, ux.md: Platform-Specific Patterns] [Resolution: CHK022]
- [ ] CHK023 Is bounce effect documented as Embla default behavior? [Clarity, ux.md: swipe_slide] [Resolution: CHK023]
- [ ] CHK024 Is the text contrast ratio (4.5:1) testable with specific color values? [Clarity, ux.md: Accessibility Standards]

## Coverage

- [ ] CHK025 Are all 3 core actions (swipe_slide, tap_dot, tap_cta) fully documented? [Coverage, ux.md: Interaction Model]
- [ ] CHK026 Are all 4 carousel states documented with behaviors? [Coverage, ux.md: States & Transitions]
- [ ] CHK027 Are all scenario types covered: Primary, Alternate, Exception, Recovery? [Coverage, ux.md: User Flow]

## Edge Case

- [ ] CHK028 Is keyboard navigation at first dot documented as stopping (no wrap)? [Edge Case, ux.md: Accessibility Standards] [Resolution: CHK028]
- [ ] CHK029 Is keyboard navigation at last dot documented as stopping (no wrap)? [Edge Case, ux.md: Accessibility Standards] [Resolution: CHK029]
- [ ] CHK030 Is behavior defined when user scrolls manually during carousel interaction? [Edge Case, ux.md: Exit Path Behaviors]

## Cross-Artifact

- [ ] CHK031 Are all accessibility requirements (role, aria-*) covered by TEST tasks? [Coverage, ux.md → tasks.md]
- [ ] CHK032 Are exit path behaviors covered by state tests in tasks.md? [Coverage, ux.md → tasks.md]
- [ ] CHK033 Do quantified UX elements (100vh, 500ms, 50px, 44px) match constants in data-model.md? [Consistency, ux.md → data-model.md]
