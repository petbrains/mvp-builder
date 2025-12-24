# Implementation Plan: Route Summary

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Displays selected group's name, description, and 4-venue route preview with slot emojis. Updates instantly when group selection changes. CTA button scrolls to venue cards section.

## Technical Context

**Language:** TypeScript

**Framework:** Next.js 14 (App Router)

**Storage:** Props from daily-route-generator data

**API Layer:** None

**Testing:** Vitest + Playwright E2E

**Deployment:** Vercel static

**Constraints:** Instant updates, graceful description handling, text truncation

## Implementation Mapping

### Component Architecture
- **RouteSummary**: Main section container, receives selectedGroup prop
- **GroupHeader**: "Vibe of the day:" label + group name + optional description
- **RoutePreviewList**: 4-item list with slot emoji and venue name
- **RoutePreviewItem**: Single slot + venue name line
- **Data Source**: DailyRoutes from daily-route-generator module

### Error Handling Approach
- Missing description: render without description element (graceful degradation)
- Long venue names: CSS text-overflow: ellipsis prevents layout break
- No error states needed - static pre-generated data always available

## Feature Code Organization

```
src/
├── components/
│   ├── route-summary/
│   │   ├── RouteSummary.tsx          # Main section component
│   │   ├── GroupHeader.tsx           # Label, name, description
│   │   ├── RoutePreviewList.tsx      # 4-venue preview
│   │   ├── RoutePreviewItem.tsx      # Single slot line
│   │   └── index.ts                  # Re-exports
│   └── ui/
│       └── button.tsx                # shadcn/ui button (CTA)
└── lib/
    └── route-generator/              # Data source (from daily-route-generator)

tests/
├── unit/
│   └── route-summary/
│       ├── RouteSummary.test.tsx
│       └── RoutePreviewList.test.tsx
└── e2e/
    └── route-summary.spec.ts
```

**Selected Structure:** A (Standalone Module) - Display component consuming data from daily-route-generator; integrates with group-selector state

## Testing Approach
- **Unit Tests**:
  - Renders group name and description
  - Renders 4 route preview items with correct slots
  - Handles missing description gracefully
  - CTA button renders with correct text
- **E2E Tests**:
  - Group selection change updates displayed content
  - CTA tap scrolls to venue-cards section
  - Long venue names truncate correctly
- **Coverage Strategy**: Unit tests for rendering logic; E2E for integration with selector

## Implementation Notes
- Import routes from `@/lib/route-generator`
- Use SLOT_LABELS constant for emoji mapping
- selectedGroup prop from group-selector determines which group route to display
- GroupHeader conditionally renders description: `{groupDescription && <p>...</p>}`
- RoutePreviewItem format: `{slotLabel}: {venueName}`
- Reuse page-layout's useAutoScroll hook for CTA button behavior
- ARIA: aria-live="polite" on content that changes with selection
