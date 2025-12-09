# Feature Specification: User Authentication

**Feature Branch**: `feature/user-auth`
**Input**: Generated from PRD - Supporting Features > Authentication

## User Scenarios & Testing

### Primary User Story
A registered user wants to log into SpendNote to access their expense data. They need a fast, secure login process and the ability to log out when done. The system maintains their session securely across browser sessions.

### Acceptance Scenarios
1. [P1] **Given** a registered user on the login page, **When** they enter valid credentials and submit, **Then** they are authenticated and redirected to the dashboard.
2. [P1] **Given** a user submitting login, **When** the email or password is incorrect, **Then** a generic error message appears (not revealing which field is wrong).
3. [P2] **Given** an authenticated user, **When** they click logout, **Then** their session is invalidated and they are redirected to the login page.
4. [P2] **Given** a user with an expired session, **When** they attempt to access a protected route, **Then** they are redirected to login with session expired message.
5. [P3] **Given** an authenticated user on multiple devices, **When** they use "logout all sessions", **Then** all their sessions are invalidated.

### Edge Cases
- When session cookie is tampered with, system MUST reject and redirect to login [FR-003]
- When user attempts login with rate limit exceeded, system MUST show "too many attempts" message [FR-006]
- When browser has stale session cookie, system MUST gracefully redirect to login [FR-003]

## Requirements

### Functional Requirements
- **FR-001**: System MUST authenticate users with email and password
- **FR-002**: System MUST use HTTP-only cookies for session management (XSS-resistant)
- **FR-003**: System MUST validate session on each protected route request
- **FR-004**: System MUST invalidate session on logout
- **FR-005**: System MUST support logout-all-sessions functionality
- **FR-006**: System MUST enforce rate limiting on login attempts (10 requests/minute/IP)
- **FR-007**: System MUST NOT reveal whether email exists in login error messages
- **FR-008**: Session tokens MUST expire with configurable TTL

### UX Requirements
- **UX-001**: Login form MUST autofocus on email field
- **UX-002**: Form fields MUST have minimum 44px tap target height
- **UX-003**: Error messages MUST appear inline near form
- **UX-004**: Logout action MUST be accessible from Account tab
- **UX-005**: Session expiry MUST show clear message before redirect

### Key Entities
- **User**: Registered account with email and hashed password
- **Session**: Authentication state with user reference, expiration timestamp, device identifier

### Technical Context
- **Auth**: HTTP-only cookie sessions (not JWT)
- **Constraints**: Auth endpoints rate-limited to 10 requests/minute/IP
