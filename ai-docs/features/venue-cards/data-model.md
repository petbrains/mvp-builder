# Data Model - Venue Cards

## Entities

### VenueCard
Display component for complete venue information.
- `slot`: Slot, required // from daily-route-generator/data-model.md
- `venue`: Venue, required // from daily-route-generator/data-model.md

### SlotBadge
Colored label indicating time slot.
- `slot`: Slot, required
- `label`: string, required - emoji + slot name
- `color`: string, required - slot-specific color

### MapsButton
Action button for Google Maps navigation.
- `googleMapsUri`: string, required
- `venueName`: string, required - for aria-label

## Enums

### Slot
Referenced from daily-route-generator/data-model.md
```
'Morning' | 'Lunch' | 'Afternoon' | 'Evening'
```

### CardVisibility
```
'morning_visible' | 'lunch_visible' | 'afternoon_visible' | 'evening_visible'
```

## States & Transitions

| Current State | Trigger | Next State | Side Effect |
|---------------|---------|------------|-------------|
| morning_visible | Swipe left | lunch_visible | Update dot indicators |
| morning_visible | Swipe right | morning_visible | Bounce effect, blocked |
| lunch_visible | Swipe left | afternoon_visible | Update dot indicators |
| lunch_visible | Swipe right | morning_visible | Update dot indicators |
| afternoon_visible | Swipe left | evening_visible | Update dot indicators |
| afternoon_visible | Swipe right | lunch_visible | Update dot indicators |
| evening_visible | Swipe left | evening_visible | Bounce effect, blocked |
| evening_visible | Swipe right | afternoon_visible | Update dot indicators |
| any | Tap dot N | slot_N_visible | Jump to card, update dots |
| any | Group change | morning_visible | Reset to first card, reload data |
| any | Tap Maps | unchanged | Open Google Maps in new tab |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| CARD_COUNT | 4 | One card per slot | FR-001 |
| SWIPE_THRESHOLD | 50 | Minimum px for card change | ux.md Platform Patterns |
| RATING_FORMAT | 'Rating: X.X' | Display format | UX-004 |
| STORY_MAX_SENTENCES | 3 | Max story length | PRD.Technical Constraints |

### Slot Colors
| Slot | Color | Source |
|------|-------|--------|
| Morning | #ffb347 | UX-001, PRD.Design System |
| Lunch | #ff6b6b | UX-001, PRD.Design System |
| Afternoon | #4ecdc4 | UX-001, PRD.Design System |
| Evening | #a855f7 | UX-001, PRD.Design System |

### Card Styling
| Property | Value | Source |
|----------|-------|--------|
| Card Background | #1a1a1a | UX-008, PRD.Design System |
| Card Border | #262626 | UX-008, PRD.Design System |
| Venue Name Color | #ffffff | UX-002 |
| Primary Type Color | #666666 | UX-003 |
| Story Style | italic | UX-005 |
| Maps Button Border | #ff9500 | UX-007 |

## Validation Rules

### Card Content
- Slot badge always visible with slot-specific color (FR-003)
- Venue name always visible (FR-004)
- Primary type always visible, uppercase (UX-003)
- Rating displayed if available, omitted if not (FR-004 edge case)
- Story must accommodate 2-3 sentences without truncation (UX-006)

### Carousel Behavior
- Exactly 4 cards per group (FR-001)
- No auto-advance (FR-006)
- No wrap-around (FR-006)
- Reset to first card on group change (FR-009)

### Maps Button
- Opens googleMapsUri in new tab (FR-007)
- Uses target="_blank" rel="noopener noreferrer" (security)
- Browser handles malformed URI (edge case)

### Accessibility
- Maps button 48px height, full width (ux.md Touch Targets)
- Dot indicators 44x44px (ux.md Touch Targets)
- aria-label on Maps button includes venue name
