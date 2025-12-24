# Implementation Plan: Group Selector

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Horizontal scrollable pills for selecting food vibe groups. Selection triggers instant updates to route summary and venue cards via lifted React state.

## Technical Context

**Language:** TypeScript

**Framework:** Next.js 14 (App Router)

**Storage:** React useState (client-side)

**API Layer:** None

**Testing:** Vitest + Playwright E2E

**Deployment:** Vercel static

**Constraints:** Exactly one active pill, instant updates, no animations

## Implementation Mapping

### Component Architecture
- **GroupSelector**: Container with horizontal scroll and pill mapping
- **GroupPill**: Individual pill button with active/inactive styling
- **State Lift**: Selected group state lifted to parent (RouteSummary section)
- **Consumers**: route-summary and venue-cards receive selectedGroup prop

### Error Handling Approach
- No error states - all selections valid
- Tap on active pill silently ignored (no visual feedback needed)
- Scroll boundary uses elastic bounce (native browser behavior)

## Feature Code Organization

```
src/
├── components/
│   ├── group-selector/
│   │   ├── GroupSelector.tsx         # Main container with scroll
│   │   ├── GroupPill.tsx             # Individual pill button
│   │   └── index.ts                  # Re-exports
│   └── ui/
│       └── button.tsx                # shadcn/ui button (base)
└── lib/
    └── constants.ts                  # GROUP_NAMES, colors

tests/
├── unit/
│   └── group-selector/
│       ├── GroupSelector.test.tsx
│       └── GroupPill.test.tsx
└── e2e/
    └── group-selector.spec.ts
```

**Selected Structure:** A (Standalone Module) - Stateful UI component that lifts selection to parent; no backend logic

## Testing Approach
- **Unit Tests**:
  - Renders 4 pills with correct names
  - Click changes active state
  - Active pill shows correct styling classes
  - Click on active pill triggers no state change
- **E2E Tests**:
  - Selecting different group updates route summary content
  - Selecting different group resets venue cards to first card
  - Horizontal scroll reveals all pills on narrow viewport
- **Coverage Strategy**: Unit tests for component logic; E2E for integration with dependent features

## Implementation Notes
- Use `overflow-x-auto` with `scroll-snap-x mandatory` for smooth pill scrolling
- Active pill: `bg-accent/15 border-accent text-accent`
- Inactive pill: `bg-transparent border-text-muted text-text-muted`
- State lifted to RouteSection component, passed down as props
- selectedGroup changes trigger re-renders in route-summary and venue-cards
- ARIA: role="tablist" on container, role="tab" on pills, aria-selected on active
