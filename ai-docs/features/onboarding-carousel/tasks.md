# Tasks: Onboarding Carousel

## Purpose
TDD-structured tasks for implementing the full-viewport onboarding carousel with 4 slides, dot indicators, swipe navigation, and CTA button.

## Phase 1: Core Infrastructure

- [ ] INIT-001 Add shadcn/ui carousel component per setup.md: `npx shadcn@latest add carousel`
- [ ] INIT-002 Create onboarding components directory structure per plan.md in src/components/onboarding/
- [ ] INIT-003 Create carousel constants (SLIDE_COUNT, CAROUSEL_HEIGHT, SWIPE_THRESHOLD, CTA_TEXT, CTA_SCROLL_TARGET, DOT_SIZE_MIN, AUTO_SCROLL_DURATION per CHK004/CHK034) in src/components/onboarding/constants.ts
- [ ] INIT-004 Create slide content data array (hook, problem, solution, cta) in src/components/onboarding/slides.ts
- [ ] INIT-005 Create TypeScript types (Slide, SlideType, CarouselState, NavigationDirection) in src/components/onboarding/types.ts
- [ ] INIT-006 Setup unit test file in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] INIT-007 Setup E2E test file in tests/e2e/onboarding-carousel.spec.ts

## Phase 2: User Story 1 - Carousel Display and CTA (P1 - MVP)

### TDD Cycle 1: Carousel Container
**Coverage:**
- Requirements: FR-001, FR-002, FR-004, FR-005
- Data entities: Slide, SlideType
- Constants: SLIDE_COUNT, CAROUSEL_HEIGHT

#### RED Phase
- [ ] TEST-001 [US1] Test carousel renders at CAROUSEL_HEIGHT (100vh) in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-002 [US1] Test carousel contains exactly SLIDE_COUNT (4) slides in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-003 [US1] Test slides are ordered: hook, problem, solution, cta in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-004 [US1] Test carousel does not auto-advance between slides (FR-004) in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-005 [US1] Test carousel does not wrap around (FR-005) in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Create OnboardingCarousel component with shadcn/ui Carousel (loop={false}) in src/components/onboarding/OnboardingCarousel.tsx
- [ ] IMPL-002 [US1] Create OnboardingSlide component with title, description, optional CTA in src/components/onboarding/OnboardingSlide.tsx
- [ ] IMPL-003 [US1] Map slides.ts content to OnboardingSlide components

### TDD Cycle 2: Dot Indicators
**Coverage:**
- Requirements: FR-006, FR-007
- Data entities: CarouselState
- Accessibility: role="tablist", role="tab", 44x44px touch targets

#### RED Phase
- [ ] TEST-006 [US1] Test dot indicators display at bottom of carousel in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-007 [US1] Test dot indicators show current slide position (same size, styling difference only per CHK018) in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-008 [US1] Test dot indicators have role="tablist" and role="tab" in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-009 [US1] Test dot indicators meet DOT_SIZE_MIN (44px) touch target in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-004 [US1] Create DotIndicators component with active state styling in src/components/onboarding/DotIndicators.tsx
- [ ] IMPL-005 [US1] Integrate DotIndicators with Embla API selectedScrollSnap

### TDD Cycle 3: CTA Button
**Coverage:**
- Requirements: FR-008, FR-009
- Constants: CTA_TEXT, CTA_SCROLL_TARGET

#### RED Phase
- [ ] TEST-010 [US1] Test CTA button CTA_TEXT appears only on slide 4 in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-011 [US1] Test CTA button hidden on slides 1-3 in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-012 [US1] Test CTA button triggers smooth scroll to CTA_SCROLL_TARGET section in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-006 [US1] Add conditional CTA button to slide 4 using showCTA prop
- [ ] IMPL-007 [US1] Integrate CTA with page-layout useAutoScroll hook for scroll behavior

## Phase 3: User Story 2 - Swipe and Dot Navigation (P2)

### TDD Cycle 1: Swipe Navigation
**Coverage:**
- Requirements: FR-003, UX-003
- Constants: SWIPE_THRESHOLD

#### RED Phase
- [ ] TEST-013 [US2] Test swipe left advances to next slide in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-014 [US2] Test swipe right navigates to previous slide in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-015 [US2] Test swipe requires minimum SWIPE_THRESHOLD (50px) to trigger in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-016 [US2] Test rapid swipes handled gracefully without visual glitches (edge case) in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-008 [US2] Configure Embla carousel for swipe navigation with threshold (Embla default velocity per CHK022)

### TDD Cycle 2: Dot Tap Navigation
**Coverage:**
- Requirements: FR-007
- Accessibility: Enter/Space on dots navigates

#### RED Phase
- [ ] TEST-017 [US2] Test tap on dot indicator navigates to that slide in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-018 [US2] Test keyboard Enter/Space on dot navigates to slide in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-009 [US2] Add onClick handler to DotIndicators using Embla scrollTo API

### TDD Cycle 3: State Machine Navigation
**Coverage:**
- States: slide_1_active → slide_2_active, slide_2_active → slide_1_active, etc.

#### RED Phase
- [ ] TEST-019 [US2] Test state transition slide_1_active → slide_2_active on swipe left in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-020 [US2] Test state transition slide_2_active → slide_1_active on swipe right in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-021 [US2] Test state transition slide_2_active → slide_3_active on swipe left in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-022 [US2] Test state transition slide_3_active → slide_4_active on swipe left in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-023 [US2] Test state transition any → slide_N_active on tap dot N in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-024 [US2] Test state transition slide_4_active → scrolling on tap CTA in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-010 [US2] Implement CarouselState management with Embla API

## Phase 4: User Story 3 - Boundary Blocking (P3)

### TDD Cycle 1: Edge Navigation
**Coverage:**
- Requirements: FR-005
- States: slide_1_active → slide_1_active (blocked), slide_4_active → slide_4_active (blocked)

#### RED Phase
- [ ] TEST-025 [US3] Test state transition slide_1_active → slide_1_active on swipe right (blocked with Embla bounce effect per CHK008) in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-026 [US3] Test state transition slide_4_active → slide_4_active on swipe left (blocked with Embla bounce effect per CHK008) in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-027 [US3] Test carousel maintains 100vh on viewport resize (edge case) in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-011 [US3] Verify loop={false} configuration prevents wrap-around (Embla default bounce confirmed per CHK023)
- [ ] IMPL-012 [US3] Add CSS to handle viewport resize maintaining CAROUSEL_HEIGHT

### TDD Cycle 2: Accessibility Standards
**Coverage:**
- Accessibility: role="region" aria-label, aria-live="polite", Tab/Arrow key navigation

#### RED Phase
- [ ] TEST-028 [US3] Test carousel has role="region" with aria-label="Onboarding" in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-029 [US3] Test slide content has aria-live="polite" for updates in tests/unit/onboarding/OnboardingCarousel.test.tsx
- [ ] TEST-030 [US3] Test Tab cycles through dot indicators in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-031 [US3] Test Arrow Left/Right on dots navigates slides in tests/e2e/onboarding-carousel.spec.ts
- [ ] TEST-032 [US3] Test text contrast minimum 4.5:1 against #0a0a0a background in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-013 [US3] Add ARIA attributes to OnboardingCarousel and DotIndicators
- [ ] IMPL-014 [US3] Add keyboard event handlers for Arrow key navigation on dots

### From CHK028+CHK029: Keyboard Boundary Behavior
**Coverage:**
- Resolution: CHK028, CHK029 - Keyboard navigation stops at first/last dot (no wrap)

#### RED Phase
- [ ] TEST-033 [US3] Test Arrow Left at first dot stops (no wrap per CHK028) and Arrow Right at last dot stops (no wrap per CHK029) in tests/e2e/onboarding-carousel.spec.ts

#### GREEN Phase
- [ ] IMPL-015 [US3] Implement keyboard boundary stop logic in Arrow key handlers (no circular wrap)

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: US1 - Carousel Display and CTA (P1)
3. **Phase 3**: US2 - Swipe and Dot Navigation (P2)
4. **Phase 4**: US3 - Boundary Blocking (P3)

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions from data-model.md have corresponding tests (TEST-019 to TEST-026)
- All constants (SLIDE_COUNT, CAROUSEL_HEIGHT, SWIPE_THRESHOLD, CTA_TEXT, CTA_SCROLL_TARGET, DOT_SIZE_MIN) are referenced
- Depends on page-layout for useAutoScroll hook integration
- TEST-/IMPL- numbering is sequential across all user stories
