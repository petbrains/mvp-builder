# Data Checklist: Onboarding Carousel

**Source**: data-model.md

## Completeness

- [ ] CHK034 Is AUTO_SCROLL_DURATION = 500 documented in constants? [Completeness, data-model.md: Constants] [Resolution: CHK034]
- [ ] CHK035 Are all 6 constants documented with value, description, and source reference? [Completeness, data-model.md: Constants]
- [ ] CHK036 Is the relationship between Slide and CarouselState entities defined? [Completeness, data-model.md: Entities]
- [ ] CHK037 Are all 4 slide titles and descriptions documented? [Completeness, data-model.md: Slide Content]

## Clarity

- [ ] CHK038 Is SWIPE_THRESHOLD unit explicitly stated (px)? [Clarity, data-model.md: Constants]
- [ ] CHK039 Is currentSlide index documented as 1-based or 0-based? [Clarity, data-model.md: CarouselState]
- [ ] CHK040 Is CTA_SCROLL_TARGET value validated against actual section ID? [Clarity, data-model.md: Constants]

## Consistency

- [ ] CHK041 Does SLIDE_COUNT = 4 match the SlideType enum count (4 values)? [Consistency, data-model.md]
- [ ] CHK042 Does DOT_SIZE_MIN = 44 match the "44px" value in ux.md accessibility? [Consistency, data-model.md → ux.md]
- [ ] CHK043 Does CAROUSEL_HEIGHT = '100vh' match FR-001 specification? [Consistency, data-model.md → spec.md]

## Edge Case

- [ ] CHK044 Is behavior defined for invalid Slide id values (outside 1-4)? [Edge Case, data-model.md: Slide entity]
- [ ] CHK045 Is behavior defined when canGoNext and canGoPrev are both false? [Edge Case, data-model.md: CarouselState]

## Cross-Artifact

- [ ] CHK046 Do constants in data-model.md match quantified values in ux.md? [Consistency, data-model.md → ux.md]
- [ ] CHK047 Are all 10 state transitions in data-model.md covered by TEST tasks? [Coverage, data-model.md → tasks.md]
- [ ] CHK048 Does the SlideType enum match slide order in spec.md FR-002? [Consistency, data-model.md → spec.md]
