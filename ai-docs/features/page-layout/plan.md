# Implementation Plan: Page Layout

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Single-page vertical layout with 4 sections, auto-scroll navigation triggered by CTA buttons, and static footer. No scroll hijacking - manual scroll always available.

## Technical Context

**Language:** TypeScript

**Framework:** Next.js 14 (App Router)

**Storage:** None - static layout

**API Layer:** None

**Testing:** Vitest + Playwright E2E

**Deployment:** Vercel static

**Constraints:** Mobile-first, no navigation header, no loading states

## Implementation Mapping

### Component Architecture
- **Page Component** (`app/page.tsx`): Root layout with 4 section slots
- **Section Components**: Onboarding, RouteSummary, VenueCards, Footer
- **useAutoScroll Hook**: Encapsulates scrollIntoView with duration and interruption handling
- **Layout Constants**: Section IDs, padding values, colors from data-model.md

### Error Handling Approach
- No runtime errors possible - static content
- CSS fallbacks for 100vh/100dvh browser variations
- scrollIntoView fallback for older Safari

## Feature Code Organization

```
src/
├── app/
│   ├── page.tsx              # Main page with section layout
│   └── globals.css           # Dark theme, section spacing
├── components/
│   ├── layout/
│   │   ├── Section.tsx       # Wrapper with id and height props
│   │   └── Footer.tsx        # Attribution text
│   └── ui/
│       └── CTAButton.tsx     # Button with auto-scroll trigger
├── hooks/
│   └── useAutoScroll.ts      # scrollIntoView wrapper
└── lib/
    └── constants.ts          # Section IDs, colors, durations

tests/
├── unit/
│   └── hooks/
│       └── useAutoScroll.test.ts
└── e2e/
    └── page-layout.spec.ts   # Scroll behavior verification
```

**Selected Structure:** A (Standalone Module) - Layout foundation providing section containers for other features; no backend logic

## Testing Approach
- **Unit Tests**:
  - `useAutoScroll.test.ts`: Hook triggers scrollIntoView with correct options
- **E2E Tests**:
  - `page-layout.spec.ts`: Sections render in order; CTA buttons scroll to target; footer accessible via manual scroll
- **Coverage Strategy**: E2E covers critical scroll interactions; unit tests cover hook logic

## Implementation Notes
- Section IDs: 'onboarding', 'route-summary', 'venue-cards', 'footer'
- Auto-scroll uses `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- 100dvh with 100vh fallback for iOS Safari compatibility
- Footer has no CTA pointing to it - manual scroll only per FR-005
