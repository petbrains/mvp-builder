# Data Model - Onboarding Carousel

## Entities

### Slide
Individual carousel panel with onboarding content.
- `id`: number, required - slide index (1-4)
- `type`: SlideType, required
- `title`: string, required - main heading
- `description`: string, required - supporting text
- `showCTA`: boolean - true only for slide 4

### CarouselState
Current carousel navigation state.
- `currentSlide`: number, required - active slide index (1-4)
- `canGoNext`: boolean - false when on slide 4
- `canGoPrev`: boolean - false when on slide 1

## Enums

### SlideType
```
'hook' | 'problem' | 'solution' | 'cta'
```
Content progression matching UX-004.

### NavigationDirection
```
'next' | 'prev' | 'jump'
```

## States & Transitions

| Current State | Trigger | Next State | Side Effect |
|---------------|---------|------------|-------------|
| slide_1_active | Swipe left | slide_2_active | Update dot indicators |
| slide_1_active | Swipe right | slide_1_active | Bounce effect, no navigation |
| slide_2_active | Swipe left | slide_3_active | Update dot indicators |
| slide_2_active | Swipe right | slide_1_active | Update dot indicators |
| slide_3_active | Swipe left | slide_4_active | Update dots, show CTA |
| slide_3_active | Swipe right | slide_2_active | Update dot indicators |
| slide_4_active | Swipe left | slide_4_active | Bounce effect, no navigation |
| slide_4_active | Swipe right | slide_3_active | Update dots, hide CTA |
| any | Tap dot N | slide_N_active | Jump to slide, update indicators |
| slide_4_active | Tap CTA | scrolling | Trigger auto-scroll to route-summary |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| SLIDE_COUNT | 4 | Fixed number of slides | PRD.Technical Constraints |
| CAROUSEL_HEIGHT | '100vh' | Full viewport height | FR-001, ux.md |
| SWIPE_THRESHOLD | 50 | Minimum px for slide change | ux.md Platform Patterns |
| CTA_TEXT | 'Taste Today's Story' | Button text on slide 4 | PRD.Core User Flow |
| CTA_SCROLL_TARGET | 'route-summary' | Section ID to scroll to | FR-009 |
| DOT_SIZE_MIN | 44 | Minimum touch target px | ux.md Accessibility |

## Slide Content

| Slide | Type | Title | Description |
|-------|------|-------|-------------|
| 1 | hook | TBD | Opening hook to capture attention |
| 2 | problem | TBD | Problem statement - discovery overload |
| 3 | solution | TBD | Solution introduction - curated routes |
| 4 | cta | TBD | Call to action with button |

*Content to be finalized during implementation*

## Validation Rules

### Carousel Behavior
- Exactly 4 slides, no more, no less
- No auto-advance between slides (FR-004)
- No wrap-around navigation (FR-005)
- CTA button visible only on slide 4 (FR-008)

### Accessibility
- Dot indicators minimum 44x44px touch target
- Arrow key navigation when focused
- Screen reader announces slide position
