# Data Model - Page Layout

## Entities

### Section
Major page division in the vertical flow.
- `id`: string, required - DOM element id for scroll targeting
- `type`: SectionType, required
- `height`: 'viewport' | 'auto'

### AutoScrollConfig
Configuration for programmatic scroll behavior.
- `targetId`: string, required - section id to scroll to
- `duration`: number, required - animation duration in ms
- `easing`: 'ease-out' | 'ease-in-out'

## Enums

### SectionType
```
'onboarding' | 'route-summary' | 'venue-cards' | 'footer'
```

### ScrollState
```
'idle' | 'scrolling' | 'interrupted'
```

## States & Transitions

| Current State | Trigger | Next State | Side Effect |
|---------------|---------|------------|-------------|
| idle | CTA tap | scrolling | Start smooth scroll animation |
| idle | Manual scroll | idle | Natural scroll behavior |
| scrolling | Animation complete | idle | Target section in view |
| scrolling | User scroll | interrupted | Cancel animation, user takes over |
| interrupted | Scroll stops | idle | Ready for next action |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| SECTION_ORDER | ['onboarding', 'route-summary', 'venue-cards', 'footer'] | Fixed vertical order | FR-002 |
| AUTO_SCROLL_DURATION | 500 | Scroll animation duration in ms | PRD.Navigation, FR-003 |
| SECTION_PADDING_X | 24 | Horizontal padding in px | UX-001, ux.md |
| SECTION_PADDING_Y | 48 | Vertical padding in px | UX-001, ux.md |
| PAGE_BACKGROUND | '#0a0a0a' | Dark theme background color | UX-002, ux.md |
| FOOTER_TEXT_COLOR | '#666666' | Muted footer text color | UX-003 |
| FOOTER_TEXT | 'Data © Google Places • Stories by AI • Made for Bantadthong' | Attribution text | FR-006 |
| ONBOARDING_HEIGHT | '100vh' | Full viewport height | spec.md, ux.md |
| TOUCH_TARGET_MIN | 44 | Minimum touch target size in px | ux.md Accessibility |

## Validation Rules

### Section Structure
- Exactly 4 sections in SECTION_ORDER
- Onboarding section height: 100vh (or 100dvh with fallback)
- Other sections height: auto (content-driven)

### Auto-Scroll
- Duration: exactly 500ms
- Easing: smooth (ease-out preferred)
- Interruptible by user scroll
