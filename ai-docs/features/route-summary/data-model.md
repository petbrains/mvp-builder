# Data Model - Route Summary

## Entities

### RoutePreview
Display of 4 venues for selected group's daily route.
- `groupName`: GroupName, required - from group-selector // from daily-route-generator/data-model.md
- `groupDescription`: string, optional - may be missing
- `venues`: RoutePreviewItem[], required - exactly 4 items

### RoutePreviewItem
Single venue in route preview list.
- `slot`: Slot, required // from daily-route-generator/data-model.md
- `slotLabel`: string, required - emoji + slot name
- `venueName`: string, required

## Enums

### Slot
Referenced from daily-route-generator/data-model.md
```
'Morning' | 'Lunch' | 'Afternoon' | 'Evening'
```

## States & Transitions

| Current State | Trigger | Next State | Side Effect |
|---------------|---------|------------|-------------|
| displaying | Group selection change | updating | Content swaps instantly |
| updating | Render complete | displaying | New group data visible |
| displaying | Tap CTA | scrolling | Auto-scroll to venue-cards |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| VENUE_PREVIEW_COUNT | 4 | One venue per slot | ux.md Quantified |
| LABEL_TEXT | 'Vibe of the day:' | Section label | FR-001 |
| CTA_TEXT | 'Meet the Places' | Button text | PRD.Core User Flow |
| CTA_SCROLL_TARGET | 'venue-cards' | Section ID to scroll to | FR-006 |
| LABEL_COLOR | '#666666' | Muted text color | UX-001 |
| GROUP_NAME_COLOR | '#ffffff' | Primary text color | UX-002 |
| DESCRIPTION_COLOR | '#a0a0a0' | Secondary text color | UX-003 |

## Slot Labels
Referenced from daily-route-generator/data-model.md SLOT_LABELS constant:
- Morning: '🌅 Morning'
- Lunch: '🌞 Lunch'
- Afternoon: '🍰 Afternoon'
- Evening: '🌙 Evening'

## Validation Rules

### Content Display
- Label text always visible (FR-001)
- Group name always visible, large bold (FR-002)
- Description shown if available, omitted gracefully if not (FR-003)
- Route preview shows exactly 4 venues (FR-004)
- Venue names truncated with ellipsis if too long (UX-003 edge case)

### Accessibility
- aria-live="polite" on group name for screen reader updates
- Logical reading order: label → name → description → preview → CTA
