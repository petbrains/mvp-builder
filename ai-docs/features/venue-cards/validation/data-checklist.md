# Data Checklist: Venue Cards

**Source**: data-model.md

## Completeness

- [ ] CHK062 Are all 3 entities (VenueCard, SlotBadge, MapsButton) fully defined with fields? [Completeness, data-model.md: Entities]
- [ ] CHK063 Are all entity field types and required/optional status documented? [Completeness, data-model.md: Entities]
- [ ] CHK064 Is the Slot enum fully documented (4 values)? [Completeness, data-model.md: Enums]
- [ ] CHK065 Is the CardVisibility enum fully documented (4 states)? [Completeness, data-model.md: Enums]
- [ ] CHK066 Are all 12 state transitions documented with triggers and side effects? [Completeness, data-model.md: States & Transitions]

## Clarity

- [ ] CHK067 Are constant values unambiguous with units where applicable? [Clarity, data-model.md: Constants]
- [ ] CHK068 Is SWIPE_THRESHOLD (50) specified with unit (px)? [Clarity, data-model.md: Constants]
- [ ] CHK069 Is RATING_FORMAT pattern unambiguous for implementation? [Clarity, data-model.md: Constants]
- [ ] CHK070 Are validation rules actionable (not vague)? [Clarity, data-model.md: Validation Rules]

## Consistency

- [ ] CHK071 Do SLOT_COLORS values match UX-001 colors exactly? [Consistency, data-model.md → spec.md]
- [ ] CHK072 Does CARD_COUNT match FR-001 specification? [Consistency, data-model.md → spec.md]
- [ ] CHK073 Do Card Styling values match UX-008 specification? [Consistency, data-model.md → spec.md]
- [ ] CHK074 Does Maps Button Border color match UX-007 specification? [Consistency, data-model.md → spec.md]
- [ ] CHK075 Do state transition triggers match ux.md interaction model? [Consistency, data-model.md → ux.md]

## Edge Case

- [ ] CHK076 Is behavior for optional rating field (null/undefined) defined? [Edge Case, data-model.md: Card Content]
- [ ] CHK077 Is behavior for story exceeding STORY_MAX_SENTENCES defined? [Edge Case, data-model.md: Card Content]
- [ ] CHK078 Are boundary state transitions (blocked) documented with visual feedback? [Edge Case, data-model.md: States & Transitions]

## Cross-Artifact

- [ ] CHK079 Are all state transitions covered by TEST tasks in tasks.md? [Coverage, data-model.md → tasks.md]
- [ ] CHK080 Are all constants referenced in tasks.md TEST coverage? [Coverage, data-model.md → tasks.md]
- [ ] CHK081 Do entity field definitions match TypeScript types in plan.md? [Consistency, data-model.md → plan.md]
