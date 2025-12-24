# Research Notes - Group Selector

## Key Decisions
- **State Management**: React useState for selected group - simple state, no Redux needed
- **Pill Styling**: Tailwind CSS with accent color variables - matches PRD design system
- **Horizontal Scroll**: Native CSS overflow-x with scroll-snap - no library needed
- **Instant Updates**: Direct state change triggers re-render - no transition animations per FR-006

## Critical Risks
- **Overflow on Wide Screens**: Pills may not fill viewport → Centered with max-width container
- **Touch Scroll Momentum**: iOS momentum scrolling needed → CSS -webkit-overflow-scrolling: touch

## Stack Compatibility
- Tailwind CSS scroll-snap: verified compatible
- React state lift to parent for venue-cards sync: standard pattern
