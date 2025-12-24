# Implementation Plan: Onboarding Carousel

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Full-viewport carousel with 4 static slides, dot indicators, swipe navigation, and CTA button on final slide that triggers auto-scroll to route summary section.

## Technical Context

**Language:** TypeScript

**Framework:** Next.js 14 (App Router)

**Storage:** Static slide content

**API Layer:** None

**Testing:** Vitest + Playwright E2E

**Deployment:** Vercel static

**Constraints:** No auto-advance, no wrap-around, mobile-first touch interactions

## Implementation Mapping

### Component Architecture
- **OnboardingCarousel**: Main container with shadcn/ui Carousel
- **OnboardingSlide**: Individual slide with title, description, optional CTA
- **DotIndicators**: Navigation dots with active state styling
- **Slide Content**: Static content array with 4 slides (hook, problem, solution, cta)

### Error Handling Approach
- No runtime errors - static content only
- Boundary navigation handled by carousel (bounce effect at edges)
- CTA scroll failure: N/A - target section always exists

## Feature Code Organization

```
src/
├── components/
│   ├── onboarding/
│   │   ├── OnboardingCarousel.tsx    # Main carousel wrapper
│   │   ├── OnboardingSlide.tsx       # Individual slide component
│   │   ├── DotIndicators.tsx         # Navigation dots
│   │   └── slides.ts                 # Static slide content data
│   └── ui/
│       └── carousel.tsx              # shadcn/ui carousel (generated)
└── lib/
    └── constants.ts                  # Shared constants

tests/
├── unit/
│   └── onboarding/
│       └── OnboardingCarousel.test.tsx
└── e2e/
    └── onboarding-carousel.spec.ts
```

**Selected Structure:** A (Standalone Module) - Self-contained UI feature with static content; integrates with page-layout section container

## Testing Approach
- **Unit Tests**:
  - Carousel renders 4 slides
  - Dot indicators reflect current slide
  - CTA button only visible on slide 4
- **E2E Tests**:
  - Swipe left advances slide
  - Swipe right on slide 1 does nothing
  - Dot tap navigates to correct slide
  - CTA tap scrolls to route-summary section
- **Coverage Strategy**: E2E for user interactions; unit tests for component rendering logic

## Implementation Notes
- shadcn/ui Carousel with `loop={false}` to prevent wrap-around
- Use Carousel API `scrollPrev()` / `scrollNext()` for navigation
- Dot indicators use `selectedScrollSnap` from Embla API
- CTA button reuses page-layout's useAutoScroll hook for scroll behavior
- ARIA: role="region" aria-label="Onboarding", dots as role="tablist"
