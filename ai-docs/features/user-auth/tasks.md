# Tasks: User Authentication

## Purpose
TDD-structured task list for implementing login/logout functionality with HTTP-only cookie sessions, rate limiting, and logout-all-sessions capability.

## Phase 1: Core Infrastructure

> Dependency: Extends user-registration infrastructure (User entity, Session model, Express app)

- [ ] INIT-001 Install express-rate-limit in backend per setup.md
- [ ] INIT-002 Add invalidated_at field to Session model in backend/prisma/schema.prisma
- [ ] INIT-003 Create rate limiting middleware in backend/src/middleware/rate-limit.middleware.ts
- [ ] INIT-004 Create auth middleware for session validation in backend/src/middleware/auth.middleware.ts
- [ ] INIT-005 Setup login Zod schema in backend/src/schemas/auth.schema.ts
- [ ] INIT-006 Create AuthProvider context in frontend/src/context/AuthProvider.tsx

## Phase 2: User Story 1 - Valid Login (P1 - MVP)

> [US1] Given a registered user on the login page, When they enter valid credentials and submit, Then they are authenticated and redirected to the dashboard.

### TDD Cycle 1: Password Verification
**Coverage**:
- Requirements: FR-001
- Data entities: User from user-registration/data-model.md

#### RED Phase
- [ ] TEST-001 [US1] Test verifyPassword returns true for correct password in backend/tests/auth.service.test.ts
- [ ] TEST-002 [US1] Test verifyPassword returns false for wrong password in backend/tests/auth.service.test.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Add verifyPassword method using argon2 in backend/src/services/auth.service.ts

### TDD Cycle 2: Login API Endpoint
**Coverage**:
- Requirements: FR-001, FR-002, FR-008
- Contracts: POST /auth/login from openapi.yaml
- Constants: SESSION_TTL=604800000

#### RED Phase
- [ ] TEST-003 [US1] Test POST /auth/login returns 200 with valid credentials in backend/tests/auth.test.ts
- [ ] TEST-004 [US1] Test login creates session with expires_at in backend/tests/auth.test.ts
- [ ] TEST-005 [US1] Test login sets HttpOnly session cookie in backend/tests/auth.test.ts

#### GREEN Phase
- [ ] IMPL-002 [US1] Add login method to AuthController in backend/src/api/auth.controller.ts
- [ ] IMPL-003 [US1] Create session with SESSION_TTL in backend/src/services/auth.service.ts
- [ ] IMPL-004 [US1] Setup login route POST /auth/login in backend/src/api/auth.routes.ts

### TDD Cycle 3: Auth State Machine
**Coverage**:
- States: AuthState from data-model.md (unauthenticated, authenticating, authenticated)

#### RED Phase
- [ ] TEST-006 [US1] Test state transition unauthenticated → authenticating on submit in frontend/tests/LoginForm.test.tsx
- [ ] TEST-007 [US1] Test state transition authenticating → authenticated on 200 in frontend/tests/LoginForm.test.tsx

#### GREEN Phase
- [ ] IMPL-005 [US1] Create useAuth hook with AuthState in frontend/src/hooks/useAuth.ts
- [ ] IMPL-006 [US1] Implement login mutation in frontend/src/services/auth.api.ts

### TDD Cycle 4: Login Form UI
**Coverage**:
- Requirements: UX-001, UX-002

#### RED Phase
- [ ] TEST-008 [US1] Test form autofocuses email field on mount in frontend/tests/LoginForm.test.tsx
- [ ] TEST-009 [US1] Test successful login redirects to dashboard in frontend/tests/LoginForm.test.tsx

#### GREEN Phase
- [ ] IMPL-007 [US1] Create LoginForm component in frontend/src/components/LoginForm.tsx
- [ ] IMPL-008 [US1] Create LoginPage with redirect logic in frontend/src/pages/LoginPage.tsx

## Phase 3: User Story 2 - Invalid Credentials Error (P1)

> [US2] Given a user submitting login, When the email or password is incorrect, Then a generic error message appears (not revealing which field is wrong).

### TDD Cycle 1: Generic Error Response
**Coverage**:
- Requirements: FR-001, FR-007
- Contracts: 401 response from openapi.yaml

#### RED Phase
- [ ] TEST-010 [US2] Test POST /auth/login returns 401 for wrong password in backend/tests/auth.test.ts
- [ ] TEST-011 [US2] Test POST /auth/login returns 401 for non-existent email in backend/tests/auth.test.ts
- [ ] TEST-012 [US2] Test 401 response has generic error message in backend/tests/auth.test.ts

#### GREEN Phase
- [ ] IMPL-009 [US2] Return generic 401 AuthError for all credential failures in backend/src/api/auth.controller.ts

### TDD Cycle 2: Error Display
**Coverage**:
- Requirements: UX-003
- States: authenticating → unauthenticated on error

#### RED Phase
- [ ] TEST-013 [US2] Test state transition authenticating → unauthenticated on 401 in frontend/tests/LoginForm.test.tsx
- [ ] TEST-014 [US2] Test generic error displays inline below form in frontend/tests/LoginForm.test.tsx

#### GREEN Phase
- [ ] IMPL-010 [US2] Handle 401 in useAuth hook in frontend/src/hooks/useAuth.ts
- [ ] IMPL-011 [US2] Display inline error message in LoginForm in frontend/src/components/LoginForm.tsx

## Phase 4: User Story 3 - Logout (P2)

> [US3] Given an authenticated user, When they click logout, Then their session is invalidated and they are redirected to the login page.

### TDD Cycle 1: Logout API
**Coverage**:
- Requirements: FR-004
- Contracts: POST /auth/logout from openapi.yaml

#### RED Phase
- [ ] TEST-015 [US3] Test POST /auth/logout invalidates session in backend/tests/auth.test.ts
- [ ] TEST-016 [US3] Test logout clears session cookie in backend/tests/auth.test.ts

#### GREEN Phase
- [ ] IMPL-012 [US3] Add logout method to AuthController in backend/src/api/auth.controller.ts
- [ ] IMPL-013 [US3] Set invalidated_at on session in backend/src/services/auth.service.ts

### TDD Cycle 2: Logout UI
**Coverage**:
- Requirements: UX-004
- States: authenticated → unauthenticated

#### RED Phase
- [ ] TEST-017 [US3] Test state transition authenticated → unauthenticated on logout in frontend/tests/useAuth.test.ts
- [ ] TEST-018 [US3] Test logout redirects to login page in frontend/tests/AccountPage.test.tsx

#### GREEN Phase
- [ ] IMPL-014 [US3] Add logout mutation to useAuth hook in frontend/src/hooks/useAuth.ts
- [ ] IMPL-015 [US3] Create logout button in Account tab in frontend/src/pages/AccountPage.tsx

## Phase 5: User Story 4 - Session Expiry (P2)

> [US4] Given a user with an expired session, When they attempt to access a protected route, Then they are redirected to login with session expired message.

### TDD Cycle 1: Session Validation Middleware
**Coverage**:
- Requirements: FR-003
- States: authenticated → session_expired

#### RED Phase
- [ ] TEST-019 [US4] Test auth middleware rejects expired sessions in backend/tests/auth.middleware.test.ts
- [ ] TEST-020 [US4] Test auth middleware rejects invalidated sessions in backend/tests/auth.middleware.test.ts
- [ ] TEST-021 [US4] Test auth middleware rejects tampered cookies in backend/tests/auth.middleware.test.ts

#### GREEN Phase
- [ ] IMPL-016 [US4] Implement session validation in auth.middleware.ts in backend/src/middleware/auth.middleware.ts
- [ ] IMPL-017 [US4] Apply auth middleware to protected routes in backend/src/api/routes.ts

### TDD Cycle 2: Session Expired UI
**Coverage**:
- Requirements: UX-005

#### RED Phase
- [ ] TEST-022 [US4] Test 401 with session_expired shows message in frontend/tests/AuthProvider.test.tsx
- [ ] TEST-023 [US4] Test redirect to login on session expiry in frontend/tests/AuthProvider.test.tsx

#### GREEN Phase
- [ ] IMPL-018 [US4] Handle session_expired in AuthProvider in frontend/src/context/AuthProvider.tsx
- [ ] IMPL-019 [US4] Display session expired message before redirect in frontend/src/context/AuthProvider.tsx

## Phase 6: User Story 5 - Logout All Sessions (P3)

> [US5] Given an authenticated user on multiple devices, When they use "logout all sessions", Then all their sessions are invalidated.

### TDD Cycle 1: Logout All API
**Coverage**:
- Requirements: FR-005
- Contracts: POST /auth/logout-all from openapi.yaml
- Constants: MAX_SESSIONS_PER_USER=10

#### RED Phase
- [ ] TEST-024 [US5] Test POST /auth/logout-all invalidates all user sessions in backend/tests/auth.test.ts
- [ ] TEST-025 [US5] Test logout-all sets invalidated_at on all sessions in backend/tests/auth.test.ts

#### GREEN Phase
- [ ] IMPL-020 [US5] Add logoutAll method to AuthController in backend/src/api/auth.controller.ts
- [ ] IMPL-021 [US5] Implement bulk session invalidation in backend/src/services/auth.service.ts

### TDD Cycle 2: Rate Limiting
**Coverage**:
- Requirements: FR-006
- States: unauthenticated → rate_limited
- Constants: AUTH_RATE_LIMIT=10, RATE_LIMIT_WINDOW=60000

#### RED Phase
- [ ] TEST-026 [US5] Test rate limit returns 429 after AUTH_RATE_LIMIT attempts in backend/tests/auth.test.ts
- [ ] TEST-027 [US5] Test state transition unauthenticated → rate_limited on 429 in frontend/tests/LoginForm.test.tsx
- [ ] TEST-028 [US5] Test rate limit error shows countdown in frontend/tests/LoginForm.test.tsx

#### GREEN Phase
- [ ] IMPL-022 [US5] Configure rate limiting with AUTH_RATE_LIMIT in backend/src/middleware/rate-limit.middleware.ts
- [ ] IMPL-023 [US5] Apply rate limit to /auth/login route in backend/src/api/auth.routes.ts
- [ ] IMPL-024 [US5] Display rate limit countdown in LoginForm in frontend/src/components/LoginForm.tsx

### TDD Cycle 3: Accessibility
**Coverage**:
- Accessibility: ARIA attributes, keyboard navigation from ux.md

#### RED Phase
- [ ] TEST-029 [US5] Test form has ARIA role="form" in frontend/tests/LoginForm.test.tsx
- [ ] TEST-030 [US5] Test Tab navigates Email → Password → Login in frontend/tests/LoginForm.test.tsx
- [ ] TEST-031 [US5] Test Enter key submits form in frontend/tests/LoginForm.test.tsx

#### GREEN Phase
- [ ] IMPL-025 [US5] Add ARIA attributes to LoginForm in frontend/src/components/LoginForm.tsx
- [ ] IMPL-026 [US5] Ensure keyboard navigation works correctly in frontend/src/components/LoginForm.tsx

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: User Story 1 - Valid Login (P1)
3. **Phase 3**: User Story 2 - Invalid Credentials Error (P1)
4. **Phase 4**: User Story 3 - Logout (P2)
5. **Phase 5**: User Story 4 - Session Expiry (P2)
6. **Phase 6**: User Story 5 - Logout All Sessions (P3)

Within each story: RED → GREEN cycles

## Notes

- Depends on user-registration feature (User entity, basic Express setup)
- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- All AuthState transitions have corresponding tests
- All constants from data-model.md referenced in tasks
- Generic error messages used to prevent email enumeration (FR-007)
