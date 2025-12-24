# Data Model - Group Selector

## Entities

### Group
Food vibe category for route selection.
- `name`: GroupName, required - display name
- `description`: string, required - from daily-route-generator data
- `isActive`: boolean - current selection state

### GroupPill
Interactive selector element.
- `groupName`: GroupName, required
- `state`: PillState, required

## Enums

### GroupName
```
'Pan-Asian Flavors' | 'Urban Hideaways' | 'Sweet Bangkok' | 'Local Thai Experience'
```
Referenced from daily-route-generator/data-model.md

### PillState
```
'active' | 'inactive'
```

## States & Transitions

| Current State | Trigger | Next State | Side Effect |
|---------------|---------|------------|-------------|
| inactive | Tap pill | active | Update all dependent UI instantly |
| active | Tap same pill | active | No action (FR-003 edge case) |
| active | Tap different pill | inactive | Previous pill becomes inactive |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| PILL_COUNT | 4 | Fixed number of pills | PRD.Technical Constraints |
| DEFAULT_GROUP | 'Pan-Asian Flavors' | First group selected by default | Implied by GROUP_NAMES order |
| ACCENT_COLOR | '#ff9500' | Active state color | UX-002, PRD.Design System |
| ACCENT_BG_OPACITY | 0.15 | Active background opacity (15%) | UX-002 |
| MUTED_BORDER_COLOR | '#666666' | Inactive border color | UX-004 |
| TOUCH_TARGET_MIN | 44 | Minimum touch target height px | UX-005 |
| UPDATE_LATENCY | 0 | Instant updates, no animation delay | ux.md Quantified |

## Validation Rules

### Selection Behavior
- Exactly one pill active at any time (FR-004)
- Tap on active pill is ignored (FR-003 edge case)
- Updates are instant with no transitions (FR-006)

### Accessibility
- Pills minimum 44px touch target (UX-005)
- Active state uses color + border + text, not color alone (ux.md)
- Arrow key navigation between pills
