# Feature Specification: User Registration

**Feature Branch**: `feature/user-registration`
**Input**: Generated from PRD - Supporting Features > Authentication

## User Scenarios & Testing

### Primary User Story
A new user visits SpendNote and wants to create an account to start tracking their expenses. They need a simple, fast sign-up process that gets them into the app quickly without unnecessary friction.

### Acceptance Scenarios
1. [P1] **Given** a visitor on the sign-up page, **When** they enter a valid email and password and submit, **Then** their account is created, default categories are provisioned, and they are redirected to the dashboard.
2. [P1] **Given** a visitor submitting the sign-up form, **When** the email is already registered, **Then** an inline error message appears indicating the email is taken.
3. [P2] **Given** a visitor on the sign-up form, **When** they enter an invalid email format, **Then** inline validation shows the error before submission.
4. [P2] **Given** a visitor on the sign-up form, **When** they enter a password that doesn't meet requirements, **Then** inline validation shows password criteria.
5. [P3] **Given** a network error during registration, **When** the user submits the form, **Then** a toast notification appears with a retry option.

### Edge Cases
- When email contains leading/trailing whitespace, system MUST trim and validate [FR-001]
- When password is exactly at minimum length boundary, system MUST accept it [FR-002]
- When registration request times out, system MUST show network error toast [FR-006]

## Requirements

### Functional Requirements
- **FR-001**: System MUST validate email format before submission (client-side) and on server
- **FR-002**: System MUST enforce password minimum length of 8 characters
- **FR-003**: System MUST hash passwords using bcrypt or argon2 before storage
- **FR-004**: System MUST check email uniqueness and reject duplicates with clear error message
- **FR-005**: System MUST provision default expense categories upon successful registration
- **FR-006**: System MUST display network/server errors via toast notifications
- **FR-007**: System MUST create authenticated session upon successful registration

### UX Requirements
- **UX-001**: Sign-up form MUST autofocus on email field on page load
- **UX-002**: Form fields MUST have minimum 44px tap target height
- **UX-003**: Inline validation messages MUST appear adjacent to invalid fields
- **UX-004**: Submit button MUST be always visible without scrolling on mobile
- **UX-005**: Form MUST use single-column layout on mobile devices

### Key Entities
- **User**: Represents a registered account with email (unique), hashed password, created timestamp
- **Session**: Authentication state tied to user, with expiration and invalidation support

### Technical Context
- **Auth**: HTTP-only cookie sessions
- **Constraints**: Auth endpoints rate-limited to 10 requests/minute/IP
