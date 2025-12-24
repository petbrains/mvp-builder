# Feature Specification: Page Layout

**Feature Branch**: `feature/page-layout`
**Input**: Generated from PRD - Core User Flow, CAP-11, CAP-12, UX Details Layout Structure

## User Scenarios & Testing

### Primary User Story
As a tourist using the app, I want a clear vertical flow through sections with smooth navigation so I can move through the experience naturally without getting lost.

### Acceptance Scenarios
1. [P1] **Given** the page loads, **When** viewing the structure, **Then** sections appear in order: Onboarding (100vh), Route Summary (auto), Venue Cards (auto), Footer (auto)
2. [P1] **Given** a CTA button is tapped, **When** auto-scroll triggers, **Then** the page smoothly scrolls to target section over 500ms
3. [P2] **Given** any point in the page, **When** the user manually scrolls, **Then** scrolling works normally without hijacking
4. [P2] **Given** the footer section, **When** viewing content, **Then** attribution text displays: "Data © Google Places • Stories by AI • Made for Bantadthong"
5. [P3] **Given** any viewport size, **When** the page renders, **Then** all sections maintain proper spacing and layout

### Edge Cases
- When user is mid-scroll and taps CTA, auto-scroll MUST take over smoothly [FR-003]
- When footer is very short, it MUST still be accessible via manual scroll only [FR-005]

## Requirements

### Functional Requirements
- **FR-001**: Page MUST be a single-page vertical flow with no routing
- **FR-002**: Section order MUST be: Onboarding Carousel, Route Summary, Venue Cards, Footer
- **FR-003**: CTA buttons MUST trigger smooth auto-scroll with 500ms duration
- **FR-004**: Manual scroll MUST always be available (no scroll hijacking)
- **FR-005**: Footer MUST only be accessible via manual scroll (no CTA points to it)
- **FR-006**: Footer MUST display: "Data © Google Places • Stories by AI • Made for Bantadthong"

### UX Requirements
- **UX-001**: Section padding MUST be 24px horizontal, 48px vertical
- **UX-002**: Page background MUST be #0a0a0a
- **UX-003**: Footer text MUST be small, centered, muted (#666666)
- **UX-004**: Footer MUST have no interactive elements
- **UX-005**: Auto-scroll animation MUST be smooth (easing function applied)

### Key Entities
- **Section**: Major page division (Onboarding, Route Summary, Venue Cards, Footer)
- **AutoScroll**: Programmatic scroll behavior triggered by CTA buttons
- **Footer**: Attribution section with credits and disclaimer

### Technical Context
- **Tech Stack**: Next.js 14 App Router, single page export
- **Constraints**:
  - Mobile-first responsive design
  - No navigation header/menu
  - No back buttons
  - No loading spinners
  - No error modals
