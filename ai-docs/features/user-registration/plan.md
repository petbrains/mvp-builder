# Implementation Plan: User Registration

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Implements secure user registration with email/password, provisions default categories atomically, and creates authenticated session via HTTP-only cookies. Uses Zod for shared validation schemas between client and server.

## Technical Context

**Language:** TypeScript (frontend and backend)

**Framework:** React + Vite (frontend), Express (backend)

**Storage:** PostgreSQL via Prisma ORM

**API Layer:** REST JSON over HTTPS

**Testing:** Jest + Supertest (backend), Vitest + RTL (frontend)

**Deployment:** Single-node deployment

**Constraints:** Auth rate limit 10 req/min/IP, session TTL configurable

## Implementation Mapping

### Component Architecture
- **Core Components:**
  - Backend: AuthController, AuthService, UserRepository
  - Frontend: SignUpPage, SignUpForm, useRegister hook
- **Data Models:** User, Session entities via Prisma schema // from data-model.md
- **API Operations:** POST /auth/register → AuthController.register()
- **State Management:** RegistrationState enum drives UI // from data-model.md

### Error Handling Approach
- **Error handlers location:** Express error middleware (backend), React Query error callbacks (frontend)
- **Recovery mechanisms:** Form data preserved on error, retry via toast action
- **User feedback:** Inline validation errors, toast for network/server errors

## Feature Code Organization

```
backend/
├── src/
│   ├── models/
│   │   └── user.prisma
│   ├── services/
│   │   └── auth.service.ts
│   └── api/
│       ├── auth.controller.ts
│       └── auth.routes.ts
└── tests/
    └── auth.test.ts

frontend/
├── src/
│   ├── components/
│   │   └── SignUpForm.tsx
│   ├── pages/
│   │   └── SignUpPage.tsx
│   └── services/
│       └── auth.api.ts
└── tests/
    └── SignUpForm.test.tsx
```

**Selected Structure:** B (Split Architecture) - Feature requires both React UI components and Express API with Prisma models

## Testing Approach
- **Test Structure:** Backend tests in `backend/tests/`, frontend in `frontend/tests/`
- **Coverage Strategy:**
  - Backend: API contract tests for all response codes (201, 400, 409, 429)
  - Frontend: Form validation behavior, submission states, error display

## Implementation Notes
- Default categories provisioned in same database transaction as user creation (FR-005)
- Email trimming happens client-side before validation, server-side before storage (FR-001)
- Password boundary test: exactly 8 characters must pass (edge case from spec.md)
- Rate limiting applied at IP level via Express middleware before route handler
