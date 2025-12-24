# Feature Specification: Venue Cards

**Feature Branch**: `feature/venue-cards`
**Input**: Generated from PRD - Core User Flow Section 3, CAP-09, CAP-10, UX Details

## User Scenarios & Testing

### Primary User Story
As a tourist ready to explore, I want to see detailed venue information in swipeable cards so I can learn about each stop and navigate there via Google Maps.

### Acceptance Scenarios
1. [P1] **Given** a group is selected, **When** viewing venue cards section, **Then** 4 cards display (one per time slot) for that group's daily route
2. [P1] **Given** a venue card is visible, **When** the user taps "Open in Google Maps", **Then** Google Maps opens in a new tab with the venue location
3. [P2] **Given** venue cards are displayed, **When** the user swipes left/right, **Then** the carousel navigates to adjacent cards
4. [P2] **Given** a card is displayed, **When** viewing card content, **Then** it shows: slot badge, venue name, primary type, rating, story, Maps button
5. [P3] **Given** the user is on the first card, **When** they swipe right, **Then** nothing happens (no wrap-around)
6. [P3] **Given** the user is on the last card, **When** they swipe left, **Then** nothing happens (no wrap-around)
7. [P2] **Given** the user switches groups, **When** cards update, **Then** carousel resets to first card (Morning slot)

### Edge Cases
- When story text is longer than expected, card MUST accommodate without breaking layout [UX-006]
- When Google Maps URI is malformed, tap MUST still attempt navigation (browser handles error) [FR-007]
- When rating is missing, card MUST display without rating field [FR-004]

## Requirements

### Functional Requirements
- **FR-001**: Carousel MUST display exactly 4 cards for selected group's daily route
- **FR-002**: Cards MUST be ordered by time slot: Morning, Lunch, Afternoon, Evening
- **FR-003**: Each card MUST display slot badge with colored background
- **FR-004**: Each card MUST display: venue name, primaryType, rating (if available), story
- **FR-005**: Carousel MUST support horizontal swipe navigation
- **FR-006**: Carousel MUST NOT auto-advance or wrap around
- **FR-007**: Maps button MUST open pre-built googleMapsUri in new browser tab
- **FR-008**: Carousel MUST display dot indicators for navigation
- **FR-009**: When group changes, carousel MUST reset to first card
- **FR-010**: Cards MUST sync with selected group (update when group selector changes)

### UX Requirements
- **UX-001**: Slot badge MUST show emoji + label with slot-specific color (Morning: #ffb347, Lunch: #ff6b6b, Afternoon: #4ecdc4, Evening: #a855f7)
- **UX-002**: Venue name MUST be large and bold (#ffffff)
- **UX-003**: Primary type MUST be small, muted (#666666), uppercase
- **UX-004**: Rating MUST display as "Rating: X.X" format
- **UX-005**: Story MUST be italic for emotional distinction
- **UX-006**: Story MUST accommodate 2-3 sentences without truncation
- **UX-007**: Maps button MUST be full width with accent outline (#ff9500)
- **UX-008**: Card background MUST be #1a1a1a with #262626 border

### Key Entities
- **VenueCard**: Display component showing complete venue information
- **SlotBadge**: Colored label indicating time slot with emoji
- **MapsButton**: Action button linking to Google Maps
