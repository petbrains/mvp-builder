# Feature Specification: Onboarding Carousel

**Feature Branch**: `feature/onboarding-carousel`
**Input**: Generated from PRD - Core User Flow Section 1, CAP-06, UX Details

## User Scenarios & Testing

### Primary User Story
As a first-time visitor to the app, I want to understand the mission and value proposition through an engaging carousel so I feel emotionally connected before exploring food routes.

### Acceptance Scenarios
1. [P1] **Given** the user lands on the page, **When** the page loads, **Then** the onboarding carousel displays at 100vh with the first slide visible
2. [P1] **Given** the user is viewing slide 4, **When** they tap "Taste Today's Story" button, **Then** the page smoothly scrolls to the Route Summary section
3. [P2] **Given** the user is on any slide, **When** they swipe left/right, **Then** the carousel navigates to the adjacent slide
4. [P2] **Given** the user is on any slide, **When** they tap a dot indicator, **Then** the carousel navigates to that slide
5. [P3] **Given** the user is on slide 1, **When** they swipe right (toward previous), **Then** nothing happens (no wrap-around)
6. [P3] **Given** the user is on slide 4, **When** they swipe left (toward next), **Then** nothing happens (no wrap-around)

### Edge Cases
- When user rapidly swipes multiple times, carousel MUST handle gracefully without visual glitches [FR-003]
- When viewport resizes, carousel MUST maintain 100vh height [FR-001]

## Requirements

### Functional Requirements
- **FR-001**: Carousel MUST display at exactly 100vh (full viewport height)
- **FR-002**: Carousel MUST contain exactly 4 slides in order: Hook, Problem, Solution, CTA
- **FR-003**: Carousel MUST support horizontal swipe navigation between slides
- **FR-004**: Carousel MUST NOT auto-advance between slides
- **FR-005**: Carousel MUST NOT wrap around (no infinite loop)
- **FR-006**: Carousel MUST display dot indicators showing current slide position
- **FR-007**: Dot indicators MUST be tappable for direct slide navigation
- **FR-008**: CTA button "Taste Today's Story" MUST appear only on slide 4
- **FR-009**: CTA button MUST trigger smooth scroll to Route Summary section (500ms duration)

### UX Requirements
- **UX-001**: Slides MUST have centered content layout
- **UX-002**: Dot indicators MUST be positioned at bottom of carousel
- **UX-003**: Swipe gestures MUST feel responsive with no perceptible lag
- **UX-004**: Content progression MUST follow: Hook → Problem → Solution → CTA

### Key Entities
- **Slide**: Individual carousel panel with content (title, description, optional CTA)
- **DotIndicator**: Navigation element showing slide position and allowing direct access
