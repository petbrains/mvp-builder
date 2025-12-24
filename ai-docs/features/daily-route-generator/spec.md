# Feature Specification: Daily Route Generator

**Feature Branch**: `feature/daily-route-generator`
**Input**: Generated from PRD - Core MVP Feature, Data Structures, Build-Time Generation

## User Scenarios & Testing

### Primary User Story
As a tourist opening the app, I want today's food route to be ready instantly so I can start exploring without waiting for loading or making decisions about which venues to visit.

### Acceptance Scenarios
1. [P1] **Given** a build is triggered, **When** the date is 2024-12-20, **Then** the system generates deterministic routes with 16 venues (4 groups × 4 slots) using that date as seed
2. [P1] **Given** the same date seed, **When** builds run on different machines, **Then** identical route selections are produced
3. [P2] **Given** bantadthong_places.json is loaded, **When** route generation runs, **Then** each group has exactly 1 venue per slot (Morning, Lunch, Afternoon, Evening)
4. [P2] **Given** a venue pool with 3-5 venues per slot, **When** selection occurs, **Then** each venue in the pool has equal probability of selection
5. [P3] **Given** consecutive days, **When** routes are generated, **Then** the probability of exact repeat is less than 0.1%

### Edge Cases
- When bantadthong_places.json is missing or malformed, build MUST fail with descriptive error [FR-001]
- When a slot has fewer than 3 venues, build MUST fail with validation error [FR-002]
- When venue data is missing required fields, build MUST fail listing missing fields [FR-003]
- When group_description is missing or empty, build MUST fail with validation error [FR-009]

## Requirements

### Functional Requirements
- **FR-001**: System MUST load bantadthong_places.json at build time (verified by successful build completion)
- **FR-002**: System MUST validate venue pools have 3-5 venues per slot per group
- **FR-003**: System MUST validate each venue has: primaryType, story, rating, googleMapsUri
- **FR-004**: System MUST use date-based seed (YYYY-MM-DD format) for deterministic selection
- **FR-005**: System MUST use seedrandom library for cross-platform consistency
- **FR-006**: System MUST output routes object with exactly 16 venues (4 groups × 4 slots)
- **FR-007**: System MUST embed generated routes as static data in the page
- **FR-008**: System MUST complete route generation at build time with zero runtime API calls
- **FR-009**: System MUST validate each group has non-empty group_description string

### UX Requirements
- **UX-001**: Generated routes MUST be immediately available on page load (no loading states)
- **UX-002**: Route data MUST include all fields needed for venue card display

### Key Entities
- **SourceData**: JSON structure containing 4 groups, each with group_description and 4 time slots
- **VenueData**: Individual venue with primaryType, story, rating, googleMapsUri
- **DailyRoutes**: Generated output with selected venue per slot per group
- **Venue**: Runtime venue object with name extracted from source key

### Technical Context
- **Tech Stack**: Next.js 14 static export, seedrandom library
- **Constraints**:
  - Total venues in database: 72
  - Build must complete in reasonable time for CI/CD
  - Output must be JSON-serializable for static embedding
