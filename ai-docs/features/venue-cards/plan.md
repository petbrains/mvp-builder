# Implementation Plan: Venue Cards

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Horizontal swipeable carousel of 4 venue cards for selected group. Each card displays slot badge, venue details, story, and Google Maps button. Carousel resets to first card when group selection changes.

## Technical Context

**Language:** TypeScript

**Framework:** Next.js 14 (App Router)

**Storage:** Props from daily-route-generator data

**API Layer:** None - Maps uses pre-built URI

**Testing:** Vitest + Playwright E2E

**Deployment:** Vercel static

**Constraints:** No auto-advance, no wrap-around, reset on group change

## Implementation Mapping

### Component Architecture
- **VenueCardsCarousel**: Main carousel container with shadcn/ui Carousel
- **VenueCard**: Individual card with all venue details
- **SlotBadge**: Colored badge with emoji and slot name
- **VenueDetails**: Name, type, rating (optional), story
- **MapsButton**: Full-width button opening Google Maps
- **DotIndicators**: Shared component (reuse from onboarding or extract to shared)

### Error Handling Approach
- Missing rating: conditional render, card displays without rating field
- Malformed Maps URI: browser handles error - user sees Google Maps error page
- Long story: card expands to fit, no truncation per UX-006

## Feature Code Organization

```
src/
├── components/
│   ├── venue-cards/
│   │   ├── VenueCardsCarousel.tsx    # Main carousel with reset logic
│   │   ├── VenueCard.tsx             # Individual card component
│   │   ├── SlotBadge.tsx             # Colored slot indicator
│   │   ├── VenueDetails.tsx          # Name, type, rating, story
│   │   ├── MapsButton.tsx            # Google Maps link button
│   │   └── index.ts                  # Re-exports
│   ├── shared/
│   │   └── DotIndicators.tsx         # Shared carousel dots
│   └── ui/
│       ├── carousel.tsx              # shadcn/ui carousel
│       └── card.tsx                  # shadcn/ui card
└── lib/
    └── route-generator/              # Data source

tests/
├── unit/
│   └── venue-cards/
│       ├── VenueCard.test.tsx
│       ├── SlotBadge.test.tsx
│       └── MapsButton.test.tsx
└── e2e/
    └── venue-cards.spec.ts
```

**Selected Structure:** A (Standalone Module) - Complex UI component consuming route data; integrates with group-selector for state sync

## Testing Approach
- **Unit Tests**:
  - VenueCard renders all fields correctly
  - SlotBadge uses correct color for each slot
  - MapsButton has correct href and target="_blank"
  - Rating omitted when not provided
- **E2E Tests**:
  - Swipe navigates between cards
  - Boundary swipes blocked (no wrap-around)
  - Group change resets carousel to first card
  - Maps button opens link in new tab
  - Dot indicators sync with visible card
- **Coverage Strategy**: Unit tests for component logic; E2E for carousel behavior and integration

## Implementation Notes
- Use Embla API `scrollTo(0)` in useEffect when selectedGroup changes
- SlotBadge color mapping: SLOT_COLORS constant with slot as key
- MapsButton: `<a href={googleMapsUri} target="_blank" rel="noopener noreferrer">`
- Rating display: `{venue.rating && <p>Rating: {venue.rating.toFixed(1)}</p>}`
- Story uses italic via `font-italic` Tailwind class
- Card styling: `bg-card-bg border-card-border rounded-lg p-5`
- Share DotIndicators component with onboarding-carousel (extract to shared/)
- ARIA: role="region" per card with aria-label including venue name
