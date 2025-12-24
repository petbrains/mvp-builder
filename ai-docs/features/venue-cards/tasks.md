# Tasks: Venue Cards

## Purpose
TDD-structured tasks for implementing the swipeable venue cards carousel with slot badges, venue details, stories, and Google Maps integration.

## Phase 1: Core Infrastructure

- [ ] INIT-001 Add shadcn/ui card component per setup.md: `npx shadcn@latest add card`
- [ ] INIT-002 Create venue-cards components directory structure per plan.md in src/components/venue-cards/
- [ ] INIT-003 Create constants (CARD_COUNT, SWIPE_THRESHOLD, RATING_FORMAT, STORY_MAX_SENTENCES, SLOT_COLORS, CARD_STYLING) in src/components/venue-cards/constants.ts
- [ ] INIT-004 Create TypeScript types (VenueCard, SlotBadge, MapsButton, CardVisibility) in src/components/venue-cards/types.ts
- [ ] INIT-005 Extract shared DotIndicators to src/components/shared/DotIndicators.tsx (from onboarding-carousel)
- [ ] INIT-006 Import Venue and Slot types from daily-route-generator module
- [ ] INIT-007 Setup unit test files in tests/unit/venue-cards/
- [ ] INIT-008 Setup E2E test file in tests/e2e/venue-cards.spec.ts

## Phase 2: User Story 1 - Cards Display and Maps Button (P1 - MVP)

### TDD Cycle 1: Venue Card Component
**Coverage:**
- Requirements: FR-001, FR-002, FR-003, FR-004, UX-001, UX-002, UX-003, UX-004, UX-005, UX-008
- Data entities: VenueCard, SlotBadge
- Constants: CARD_COUNT, SLOT_COLORS, CARD_STYLING, RATING_FORMAT

#### RED Phase
- [ ] TEST-001 [US1] Test carousel renders exactly CARD_COUNT (4) cards in tests/unit/venue-cards/VenueCardsCarousel.test.tsx
- [ ] TEST-002 [US1] Test cards ordered by slot: Morning, Lunch, Afternoon, Evening in tests/unit/venue-cards/VenueCardsCarousel.test.tsx
- [ ] TEST-003 [US1] Test each card displays slot badge with emoji + label in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-004 [US1] Test SlotBadge uses correct SLOT_COLORS for each slot (Morning: #ffb347, Lunch: #ff6b6b, Afternoon: #4ecdc4, Evening: #a855f7) in tests/unit/venue-cards/SlotBadge.test.tsx
- [ ] TEST-005 [US1] Test card displays venue name large and bold (GROUP_NAME_COLOR #ffffff) in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-006 [US1] Test card displays primaryType small, muted, uppercase in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-007 [US1] Test card displays rating in RATING_FORMAT "Rating: X.X" in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-008 [US1] Test card omits rating field when rating not provided (edge case) in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-009 [US1] Test card displays story in italic style in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-010 [US1] Test card has CARD_STYLING (bg #1a1a1a, border #262626) in tests/unit/venue-cards/VenueCard.test.tsx

#### GREEN Phase
- [ ] IMPL-001 [US1] Create SlotBadge component with slot-specific colors in src/components/venue-cards/SlotBadge.tsx
- [ ] IMPL-002 [US1] Create VenueDetails component with name, type, optional rating, story in src/components/venue-cards/VenueDetails.tsx
- [ ] IMPL-003 [US1] Create VenueCard component composing SlotBadge and VenueDetails in src/components/venue-cards/VenueCard.tsx
- [ ] IMPL-004 [US1] Apply conditional rating rendering: `{venue.rating && <p>Rating: {venue.rating.toFixed(1)}</p>}`

### TDD Cycle 2: Google Maps Button
**Coverage:**
- Requirements: FR-007, UX-007
- Data entities: MapsButton
- Constants: Maps Button Border #ff9500

#### RED Phase
- [ ] TEST-011 [US1] Test MapsButton displays "Open in Google Maps" text in tests/unit/venue-cards/MapsButton.test.tsx
- [ ] TEST-012 [US1] Test MapsButton has correct href from venue.googleMapsUri in tests/unit/venue-cards/MapsButton.test.tsx
- [ ] TEST-013 [US1] Test MapsButton opens in new tab (target="_blank") in tests/unit/venue-cards/MapsButton.test.tsx
- [ ] TEST-014 [US1] Test MapsButton has rel="noopener noreferrer" for security in tests/unit/venue-cards/MapsButton.test.tsx
- [ ] TEST-015 [US1] Test MapsButton has full width and accent outline border in tests/unit/venue-cards/MapsButton.test.tsx
- [ ] TEST-016 [US1] Test MapsButton click opens Google Maps in new browser tab in tests/e2e/venue-cards.spec.ts
- [ ] TEST-017 [US1] Test malformed Maps URI still attempts navigation (browser handles error) in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-005 [US1] Create MapsButton as anchor with target="_blank" rel="noopener noreferrer" in src/components/venue-cards/MapsButton.tsx
- [ ] IMPL-006 [US1] Style MapsButton with full width, accent outline, proper height

### TDD Cycle 3: Carousel Container
**Coverage:**
- Requirements: FR-008, FR-010
- Data entities: VenueCardsCarousel with DotIndicators

#### RED Phase
- [ ] TEST-018 [US1] Test carousel displays dot indicators for navigation in tests/unit/venue-cards/VenueCardsCarousel.test.tsx
- [ ] TEST-019 [US1] Test carousel uses selectedGroup to load correct venue data in tests/unit/venue-cards/VenueCardsCarousel.test.tsx
- [ ] TEST-020 [US1] Test cards sync with group-selector selection in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-007 [US1] Create VenueCardsCarousel with shadcn/ui Carousel in src/components/venue-cards/VenueCardsCarousel.tsx
- [ ] IMPL-008 [US1] Integrate shared DotIndicators component
- [ ] IMPL-009 [US1] Connect to routes data via selectedGroup prop

## Phase 3: User Story 2 - Swipe Navigation and Card Content (P2)

### TDD Cycle 1: Swipe Navigation
**Coverage:**
- Requirements: FR-005, FR-006
- Constants: SWIPE_THRESHOLD

#### RED Phase
- [ ] TEST-021 [US2] Test swipe left navigates to next card in tests/e2e/venue-cards.spec.ts (default ~300ms animation per CHK035, Embla handles rapid swipes per CHK046)
- [ ] TEST-022 [US2] Test swipe right navigates to previous card in tests/e2e/venue-cards.spec.ts
- [ ] TEST-023 [US2] Test swipe requires minimum SWIPE_THRESHOLD (50px) in tests/e2e/venue-cards.spec.ts (absolute 50px per CHK033, Embla handles diagonal disambiguation per CHK043)
- [ ] TEST-024 [US2] Test carousel does not auto-advance (FR-006) in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-010 [US2] Configure Embla carousel with loop={false} and swipe threshold

### TDD Cycle 2: Dot Tap Navigation
**Coverage:**
- Requirements: FR-008

#### RED Phase
- [ ] TEST-025 [US2] Test tap on dot navigates to corresponding card in tests/e2e/venue-cards.spec.ts
- [ ] TEST-026 [US2] Test dot indicators sync with visible card in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-011 [US2] Connect DotIndicators to Embla API scrollTo

### TDD Cycle 3: Group Change Reset
**Coverage:**
- Requirements: FR-009
- States: any → morning_visible (Group change)

#### RED Phase
- [ ] TEST-027 [US2] Test group change resets carousel to first card (Morning) in tests/e2e/venue-cards.spec.ts
- [ ] TEST-028 [US2] Test group change loads new group's venue data in tests/e2e/venue-cards.spec.ts
- [ ] TEST-029 [US2] Test state transition any → morning_visible on group change in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-012 [US2] Add useEffect with selectedGroup dependency to call scrollTo(0)

### TDD Cycle 4: Story Display
**Coverage:**
- Requirements: UX-005, UX-006
- Constants: STORY_MAX_SENTENCES

#### RED Phase
- [ ] TEST-030 [US2] Test story text uses italic styling in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-031 [US2] Test story accommodates 2-3 sentences without truncation (UX-006) in tests/e2e/venue-cards.spec.ts
- [ ] TEST-032 [US2] Test long story text expands card height instead of truncating in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-013 [US2] Apply font-italic class and min-height to story container

### TDD Cycle 5: State Machine Transitions
**Coverage:**
- States: morning_visible ↔ lunch_visible ↔ afternoon_visible ↔ evening_visible, any → slot_N_visible (Tap dot)

#### RED Phase
- [ ] TEST-033 [US2] Test state transition morning_visible → lunch_visible on swipe left in tests/e2e/venue-cards.spec.ts
- [ ] TEST-034 [US2] Test state transition lunch_visible → morning_visible on swipe right in tests/e2e/venue-cards.spec.ts
- [ ] TEST-035 [US2] Test state transition lunch_visible → afternoon_visible on swipe left in tests/e2e/venue-cards.spec.ts
- [ ] TEST-036 [US2] Test state transition afternoon_visible → evening_visible on swipe left in tests/e2e/venue-cards.spec.ts
- [ ] TEST-037 [US2] Test state transition any → slot_N_visible on tap dot N in tests/e2e/venue-cards.spec.ts
- [ ] TEST-038 [US2] Test state transition any → unchanged on tap Maps in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-014 [US2] Verify carousel state managed by Embla API

## Phase 4: User Story 3 - Boundary Blocking (P3)

### TDD Cycle 1: Edge Navigation
**Coverage:**
- Requirements: FR-006
- States: morning_visible → morning_visible (blocked), evening_visible → evening_visible (blocked)

#### RED Phase
- [ ] TEST-039 [US3] Test state transition morning_visible → morning_visible on swipe right (blocked with bounce) in tests/e2e/venue-cards.spec.ts
- [ ] TEST-040 [US3] Test state transition evening_visible → evening_visible on swipe left (blocked with bounce) in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-015 [US3] Verify loop={false} configuration prevents wrap-around

### TDD Cycle 2: Accessibility
**Coverage:**
- Accessibility: role="region" per card, aria-label, Maps button aria-label, touch targets

#### RED Phase
- [ ] TEST-041 [US3] Test each card has role="region" in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-042 [US3] Test each card has aria-label including venue name in tests/unit/venue-cards/VenueCard.test.tsx
- [ ] TEST-043 [US3] Test MapsButton has aria-label including venue name in tests/unit/venue-cards/MapsButton.test.tsx
- [ ] TEST-044 [US3] Test MapsButton has minimum 48px height in tests/e2e/venue-cards.spec.ts
- [ ] TEST-045 [US3] Test dot indicators have 44x44px touch targets in tests/e2e/venue-cards.spec.ts
- [ ] TEST-046 [US3] Test Tab navigates through card content in tests/e2e/venue-cards.spec.ts
- [ ] TEST-047 [US3] Test Arrow keys navigate cards when focused in tests/e2e/venue-cards.spec.ts
- [ ] TEST-048 [US3] Test Enter on MapsButton opens link in tests/e2e/venue-cards.spec.ts

#### GREEN Phase
- [ ] IMPL-016 [US3] Add ARIA attributes to VenueCard and MapsButton
- [ ] IMPL-017 [US3] Ensure proper touch target sizes

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: US1 - Cards Display and Maps Button (P1)
3. **Phase 3**: US2 - Swipe Navigation and Card Content (P2)
4. **Phase 4**: US3 - Boundary Blocking (P3)

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions (morning_visible, lunch_visible, afternoon_visible, evening_visible, group change, tap Maps) have corresponding tests (TEST-029, TEST-033 to TEST-040)
- All constants (CARD_COUNT, SWIPE_THRESHOLD, RATING_FORMAT, STORY_MAX_SENTENCES, SLOT_COLORS, CARD_STYLING) are referenced
- Depends on daily-route-generator for routes data and Venue type
- Depends on group-selector for selectedGroup prop
- Shares DotIndicators component with onboarding-carousel (extract to shared/)
- TEST-/IMPL- numbering is sequential across all user stories
