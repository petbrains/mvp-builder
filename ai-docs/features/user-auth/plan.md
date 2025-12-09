# Implementation Plan: User Authentication

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Implements login/logout flow with HTTP-only cookie sessions, rate limiting for brute force protection, and logout-all-sessions functionality. Extends AuthService from user-registration with session validation middleware.

## Technical Context

**Language:** TypeScript

**Framework:** React + Vite (frontend), Express (backend)

**Storage:** PostgreSQL (sessions table via Prisma)

**API Layer:** REST JSON over HTTPS with cookie-based auth

**Testing:** Jest + Supertest (backend), Vitest + RTL (frontend)

**Deployment:** Single-node deployment

**Constraints:** Rate limit 10 req/min/IP, session TTL configurable, max 10 sessions per user

## Implementation Mapping

### Component Architecture
- **Core Components:**
  - Backend: AuthController (login/logout), AuthMiddleware (session validation), SessionRepository
  - Frontend: LoginPage, LoginForm, useAuth hook, AuthProvider context
- **Data Models:** Session entity extends user-registration // from data-model.md
- **API Operations:** POST /auth/login, POST /auth/logout, POST /auth/logout-all, GET /auth/me
- **State Management:** AuthState enum in AuthProvider context // from data-model.md

### Error Handling Approach
- **Error handlers location:** Express middleware for 401/429, React Query for network errors
- **Recovery mechanisms:** Rate limit shows countdown, session expiry redirects to login
- **User feedback:** Generic error for invalid credentials (FR-007), toast for network errors

## Feature Code Organization

```
backend/
├── src/
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── rate-limit.middleware.ts
│   ├── services/
│   │   └── session.service.ts
│   └── api/
│       └── auth.controller.ts (extends)
└── tests/
    └── auth-login.test.ts

frontend/
├── src/
│   ├── components/
│   │   └── LoginForm.tsx
│   ├── pages/
│   │   └── LoginPage.tsx
│   ├── context/
│   │   └── AuthProvider.tsx
│   └── hooks/
│       └── useAuth.ts
└── tests/
    └── LoginForm.test.tsx
```

**Selected Structure:** B (Split Architecture) - Extends user-registration structure with auth middleware and context provider

## Testing Approach
- **Test Structure:** Backend in `backend/tests/`, frontend in `frontend/tests/`
- **Coverage Strategy:**
  - Backend: Rate limiting behavior, session validation, logout-all invalidation
  - Frontend: Login form states, auth context, protected route redirect

## Implementation Notes
- Session validation middleware applied to all protected routes (FR-003)
- Generic "Invalid email or password" message for all login failures (FR-007)
- Logout-all queries sessions by user_id and sets invalidated_at (FR-005)
- Rate limit countdown displayed in UI when 429 received (edge case)
