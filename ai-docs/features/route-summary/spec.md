# Feature Specification: Route Summary

**Feature Branch**: `feature/route-summary`
**Input**: Generated from PRD - Core User Flow Section 2, CAP-08, UX Details

## User Scenarios & Testing

### Primary User Story
As a tourist who has selected a food vibe, I want to see today's route at a glance with all 4 stops so I can understand the journey before diving into venue details.

### Acceptance Scenarios
1. [P1] **Given** a group is selected, **When** viewing route summary, **Then** the group name displays large and bold, with group description below
2. [P1] **Given** a group is selected, **When** viewing route preview, **Then** 4 venues display with slot emojis: Morning, Lunch, Afternoon, Evening
3. [P2] **Given** the user views route summary, **When** they tap "Meet the Places" button, **Then** the page smoothly scrolls to Venue Cards section
4. [P2] **Given** the user switches groups, **When** the selection changes, **Then** all route summary content updates instantly
5. [P3] **Given** route data is loaded, **When** displaying route preview, **Then** each line shows format: "[emoji] Slot: Venue Name"

### Edge Cases
- When venue name is very long, display MUST truncate gracefully without breaking layout [UX-003]
- When group description is missing, system MUST show group name only without error [FR-003]

## Requirements

### Functional Requirements
- **FR-001**: System MUST display "Vibe of the day:" label above group name
- **FR-002**: System MUST display selected group name in large, bold, white text
- **FR-003**: System MUST display group description from JSON data (or omit gracefully if missing)
- **FR-004**: System MUST display route preview with 4 venues from selected group's daily route
- **FR-005**: Route preview MUST show slot emoji and venue name for each time slot
- **FR-006**: CTA button "Meet the Places" MUST trigger smooth scroll to Venue Cards (500ms duration)
- **FR-007**: All content MUST update instantly when group selection changes

### UX Requirements
- **UX-001**: Label "Vibe of the day:" MUST be small and muted (#666666)
- **UX-002**: Group name MUST be large and bold (#ffffff)
- **UX-003**: Group description MUST be regular weight, secondary color (#a0a0a0)
- **UX-004**: Route preview MUST use slot emojis from SLOT_LABELS constant
- **UX-005**: CTA button MUST be positioned at bottom of section

### Key Entities
- **RoutePreview**: Display of 4 venues for selected group's daily route
- **SlotLabel**: Emoji + text label for time slot (Morning, Lunch, Afternoon, Evening)
