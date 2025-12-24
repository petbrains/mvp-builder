# Feature Specification: Group Selector

**Feature Branch**: `feature/group-selector`
**Input**: Generated from PRD - Core User Flow Section 2, CAP-07, UX Details

## User Scenarios & Testing

### Primary User Story
As a tourist who has seen the onboarding, I want to choose a food vibe that matches my mood so I get a curated route tailored to my preferences.

### Acceptance Scenarios
1. [P1] **Given** the Route Summary section is visible, **When** the user views the group selector, **Then** 4 pills are displayed: Pan-Asian Flavors, Urban Hideaways, Sweet Bangkok, Local Thai Experience
2. [P1] **Given** a group is selected, **When** the user taps a different pill, **Then** that pill becomes active and the route preview updates instantly
3. [P2] **Given** all pills are visible, **When** the user swipes horizontally, **Then** the pill container scrolls to reveal any overflow
4. [P2] **Given** a pill is active, **When** viewing the selector, **Then** the active pill shows accent background (15% opacity), accent border, and accent text
5. [P3] **Given** a pill is inactive, **When** viewing the selector, **Then** the inactive pill shows transparent background, muted border, and muted text

### Edge Cases
- When user taps already-active pill, system MUST ignore the tap (no redundant updates) [FR-003]
- When viewport is narrow, selector MUST remain horizontally scrollable [FR-002]

## Requirements

### Functional Requirements
- **FR-001**: Selector MUST display exactly 4 group pills in fixed order
- **FR-002**: Selector MUST be horizontally scrollable if pills overflow viewport
- **FR-003**: Tapping a pill MUST set it as active and trigger instant UI updates
- **FR-004**: Exactly one pill MUST be active at any time
- **FR-005**: Group switching MUST update: group name display, group description, route preview, venue cards carousel
- **FR-006**: Updates MUST be instant with no transition animations

### UX Requirements
- **UX-001**: Pills MUST have rounded-full shape (pill appearance)
- **UX-002**: Active pill MUST use accent color (#ff9500) at 15% opacity for background
- **UX-003**: Active pill MUST have accent border and accent text
- **UX-004**: Inactive pills MUST have transparent background, muted border (#666666), muted text
- **UX-005**: Pills MUST be touch-friendly (minimum 44px touch target)

### Key Entities
- **Group**: Food vibe category with name and description
- **GroupPill**: Interactive selector element representing a group
