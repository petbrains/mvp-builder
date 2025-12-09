# Tasks: User Registration

## Purpose
TDD-structured task list for implementing user registration feature with email/password authentication, session creation, and default category provisioning.

## Phase 1: Core Infrastructure

- [x] INIT-001 Create project structure with backend/ and frontend/ directories per plan.md
- [x] INIT-002 Initialize backend with npm, install argon2, zod, @prisma/client, prisma, jest, supertest per setup.md
- [x] INIT-003 Initialize frontend with npm, install zod, @tanstack/react-query, react-router-dom, vitest, @testing-library/react per setup.md
- [x] INIT-004 Configure Prisma with PostgreSQL connection in backend/prisma/schema.prisma
- [x] INIT-005 Create User model in backend/prisma/schema.prisma with id, email, password_hash, created_at, updated_at
- [x] INIT-006 Create Session model in backend/prisma/schema.prisma with id, user_id, expires_at, device_id, created_at
- [x] INIT-007 Setup Express app with JSON body parser and cookie-parser in backend/src/app.ts
- [x] INIT-008 Configure Zod validation schemas for registration in backend/src/schemas/auth.schema.ts
- [x] INIT-009 Setup Vitest and React Testing Library configuration in frontend/vitest.config.ts
- [x] INIT-010 Configure environment variables DATABASE_URL, SESSION_SECRET, SESSION_TTL_MS in backend/.env

## Phase 2: User Story 1 - Valid Registration (P1 - MVP)

> [US1] Given a visitor on the sign-up page, When they enter a valid email and password and submit, Then their account is created, default categories are provisioned, and they are redirected to the dashboard.

### TDD Cycle 1: User Entity & Password Hashing
**Coverage**:
- Requirements: FR-002, FR-003
- Data entities: User from data-model.md
- Constants: PASSWORD_MIN_LENGTH=8

#### RED Phase
- [x] TEST-001 [US1] Test password hashing with argon2 produces valid hash in backend/tests/auth.service.test.ts
- [x] TEST-002 [US1] Test password validation rejects < 8 characters in backend/tests/auth.service.test.ts
- [x] TEST-003 [US1] Test password validation accepts exactly 8 characters (boundary) in backend/tests/auth.service.test.ts

#### GREEN Phase
- [x] IMPL-001 [US1] Create AuthService with hashPassword method using argon2 in backend/src/services/auth.service.ts
- [x] IMPL-002 [US1] Implement password validation with PASSWORD_MIN_LENGTH=8 in backend/src/services/auth.service.ts

### TDD Cycle 2: Registration API Endpoint
**Coverage**:
- Requirements: FR-001, FR-004, FR-005, FR-007
- Contracts: POST /auth/register from openapi.yaml
- Constants: EMAIL_MAX_LENGTH=255

#### RED Phase
- [x] TEST-004 [US1] Test POST /auth/register returns 201 with valid user data in backend/tests/auth.test.ts
- [x] TEST-005 [US1] Test registration creates session cookie (HttpOnly) in backend/tests/auth.test.ts
- [x] TEST-006 [US1] Test registration provisions 6 default categories in backend/tests/auth.test.ts
- [x] TEST-007 [US1] Test email is trimmed before validation in backend/tests/auth.test.ts

#### GREEN Phase
- [x] IMPL-003 [US1] Create AuthController with register method in backend/src/api/auth.controller.ts
- [x] IMPL-004 [US1] Implement UserRepository with create method in backend/src/repositories/user.repository.ts
- [x] IMPL-005 [US1] Implement default category provisioning in transaction in backend/src/services/auth.service.ts
- [x] IMPL-006 [US1] Setup auth routes POST /auth/register in backend/src/api/auth.routes.ts

### TDD Cycle 3: Registration State Machine
**Coverage**:
- States: RegistrationState from data-model.md (idle, validating, submitting, error, success)

#### RED Phase
- [ ] TEST-008 [US1] Test state transition idle → submitting on form submit in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-009 [US1] Test state transition submitting → success on API 201 in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-010 [US1] Test state transition submitting → error on API error in frontend/tests/SignUpForm.test.tsx

#### GREEN Phase
- [ ] IMPL-007 [US1] Create useRegister hook with state machine in frontend/src/hooks/useRegister.ts
- [ ] IMPL-008 [US1] Implement React Query mutation for registration in frontend/src/services/auth.api.ts

### TDD Cycle 4: SignUp Form UI
**Coverage**:
- Requirements: UX-001, UX-004, UX-005
- Constants: FORM_FIELD_MIN_HEIGHT=44

#### RED Phase
- [ ] TEST-011 [US1] Test form autofocuses email field on mount in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-012 [US1] Test form submits on Enter key in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-013 [US1] Test successful registration redirects to dashboard in frontend/tests/SignUpForm.test.tsx

#### GREEN Phase
- [ ] IMPL-009 [US1] Create SignUpForm component with email/password fields in frontend/src/components/SignUpForm.tsx
- [ ] IMPL-010 [US1] Create SignUpPage with centered card layout in frontend/src/pages/SignUpPage.tsx
- [ ] IMPL-011 [US1] Implement redirect to dashboard on success in frontend/src/pages/SignUpPage.tsx

## Phase 3: User Story 2 - Duplicate Email Error (P1)

> [US2] Given a visitor submitting the sign-up form, When the email is already registered, Then an inline error message appears indicating the email is taken.

### TDD Cycle 1: Duplicate Email Detection
**Coverage**:
- Requirements: FR-004
- Contracts: 409 response from openapi.yaml
- Error types: permission_denied from ux.md

#### RED Phase
- [x] TEST-014 [US2] Test POST /auth/register returns 409 for duplicate email in backend/tests/auth.test.ts
- [x] TEST-015 [US2] Test 409 response includes error type email_taken in backend/tests/auth.test.ts

#### GREEN Phase
- [x] IMPL-012 [US2] Add email uniqueness check in AuthService in backend/src/services/auth.service.ts
- [x] IMPL-013 [US2] Return 409 ConflictError for duplicate emails in backend/src/api/auth.controller.ts

### TDD Cycle 2: Inline Error Display
**Coverage**:
- Requirements: UX-003
- Accessibility: aria-invalid, aria-describedby from ux.md

#### RED Phase
- [ ] TEST-016 [US2] Test inline error displays below email field on 409 in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-017 [US2] Test email field has aria-invalid=true on error in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-018 [US2] Test error message linked via aria-describedby in frontend/tests/SignUpForm.test.tsx

#### GREEN Phase
- [ ] IMPL-014 [US2] Handle 409 response in useRegister hook in frontend/src/hooks/useRegister.ts
- [ ] IMPL-015 [US2] Display inline error message in SignUpForm in frontend/src/components/SignUpForm.tsx
- [ ] IMPL-016 [US2] Add ARIA attributes for error state in frontend/src/components/SignUpForm.tsx

## Phase 4: User Story 3 - Email Validation (P2)

> [US3] Given a visitor on the sign-up form, When they enter an invalid email format, Then inline validation shows the error before submission.

### TDD Cycle 1: Client-side Email Validation
**Coverage**:
- Requirements: FR-001
- States: idle → validating → error transition
- Error types: validation_error from ux.md

#### RED Phase
- [ ] TEST-019 [US3] Test email validation on blur shows inline error in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-020 [US3] Test state transition idle → validating on email blur in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-021 [US3] Test state transition validating → error for invalid email in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-022 [US3] Test error clears when email becomes valid in frontend/tests/SignUpForm.test.tsx

#### GREEN Phase
- [ ] IMPL-017 [US3] Add Zod email validation schema in frontend/src/schemas/auth.schema.ts
- [ ] IMPL-018 [US3] Implement onBlur validation in SignUpForm in frontend/src/components/SignUpForm.tsx
- [ ] IMPL-019 [US3] Display validation_error with red border and message in frontend/src/components/SignUpForm.tsx

## Phase 5: User Story 4 - Password Validation (P2)

> [US4] Given a visitor on the sign-up form, When they enter a password that doesn't meet requirements, Then inline validation shows password criteria.

### TDD Cycle 1: Client-side Password Validation
**Coverage**:
- Requirements: FR-002, UX-003
- Constants: PASSWORD_MIN_LENGTH=8

#### RED Phase
- [ ] TEST-023 [US4] Test password validation on blur shows criteria list in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-024 [US4] Test password < 8 chars shows unmet criteria in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-025 [US4] Test password >= 8 chars shows satisfied criteria in frontend/tests/SignUpForm.test.tsx

#### GREEN Phase
- [ ] IMPL-020 [US4] Add password min length validation in frontend/src/schemas/auth.schema.ts
- [ ] IMPL-021 [US4] Display password criteria checklist in SignUpForm in frontend/src/components/SignUpForm.tsx

## Phase 6: User Story 5 - Network Error Handling (P3)

> [US5] Given a network error during registration, When the user submits the form, Then a toast notification appears with a retry option.

### TDD Cycle 1: Network Error Toast
**Coverage**:
- Requirements: FR-006
- Error types: network_failure, timeout from ux.md
- Constants: TOAST_AUTO_DISMISS=5000

#### RED Phase
- [ ] TEST-026 [US5] Test network error shows toast notification in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-027 [US5] Test toast includes retry button in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-028 [US5] Test toast auto-dismisses after TOAST_AUTO_DISMISS ms in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-029 [US5] Test form data preserved after network error in frontend/tests/SignUpForm.test.tsx

#### GREEN Phase
- [ ] IMPL-022 [US5] Create Toast component for notifications in frontend/src/components/Toast.tsx
- [ ] IMPL-023 [US5] Handle network errors in useRegister hook in frontend/src/hooks/useRegister.ts
- [ ] IMPL-024 [US5] Implement retry functionality in toast in frontend/src/components/Toast.tsx

### TDD Cycle 2: Accessibility Compliance
**Coverage**:
- Accessibility: ARIA role="form", keyboard navigation from ux.md
- Constants: FORM_FIELD_MIN_HEIGHT=44

#### RED Phase
- [ ] TEST-030 [US5] Test form has ARIA role="form" in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-031 [US5] Test Tab navigates Email → Password → Submit in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-032 [US5] Test all interactive elements have min-height 44px in frontend/tests/SignUpForm.test.tsx
- [ ] TEST-033 [US5] Test contrast ratio meets 4.5:1 minimum in frontend/tests/SignUpForm.test.tsx

#### GREEN Phase
- [ ] IMPL-025 [US5] Add ARIA role="form" to SignUpForm in frontend/src/components/SignUpForm.tsx
- [ ] IMPL-026 [US5] Ensure 44px minimum height on all form elements in frontend/src/components/SignUpForm.tsx

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: User Story 1 - Valid Registration (P1)
3. **Phase 3**: User Story 2 - Duplicate Email Error (P1)
4. **Phase 4**: User Story 3 - Email Validation (P2)
5. **Phase 5**: User Story 4 - Password Validation (P2)
6. **Phase 6**: User Story 5 - Network Error Handling (P3)

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable after Phase 1
- Tests precede implementation
- All state transitions from RegistrationState have corresponding tests
- All accessibility standards have corresponding tests
- All constants from data-model.md referenced in tasks
