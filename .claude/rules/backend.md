# Backend Standards

## Stack Decisions

### Authentication
| Platform | Library |
|----------|---------|
| Next.js App Router | Auth.js v5 (`next-auth@beta`) |
| Express / Node API | Passport.js + JWT strategy |
| React Native / Expo | Expo Auth Session |
| iOS (Swift) | Sign in with Apple + Keychain |
| Android (Kotlin) | Google Identity Services + EncryptedSharedPreferences |
| Flutter | firebase_auth or flutter_appauth + flutter_secure_storage |
| Browser Extension | `chrome.identity` / `browser.identity` + `chrome.storage.session` |
| Python (FastAPI) | fastapi-users + python-jose + passlib |
| Python (Django) | django-allauth + djangorestframework-simplejwt |

### Database ORM
- **TypeScript/Node** → Prisma. Always singleton pattern for PrismaClient.
- **Python** → SQLAlchemy (FastAPI) / Django ORM (Django)

### Validation
- **All data boundaries** → Zod (TypeScript). No exceptions.
- Validate env variables, API inputs, config files, form data.

### API Layer
- **TypeScript full-stack (both ends controlled)** → tRPC
- **External clients / public API / mixed languages** → REST + OpenAPI via `trpc-to-openapi`

### Logging
- **Production Node.js** → Pino. Never `console.log` in production code.
- **Python** → structlog or logging with JSON formatter.

### Testing
- **TypeScript** → Vitest. Never Jest for new projects.
- **Python** → pytest.

## Non-negotiable Rules

### Security
- Secrets via env only — never hardcode
- Passwords: hash with `argon2` or `bcrypt` — server-side only, never client-side
- Never store sensitive data in JWT payload (it's readable)
- Never use credentials-based auth without password hashing
- Tokens: access token ≤15min, refresh token in httpOnly cookie
- Mobile: platform secure storage only — never plain AsyncStorage or localStorage

### Logging
- Redact sensitive fields in all log output: `password`, `token`, `authorization`, `cookie`
- Include correlation/request IDs for tracing
- Never log PII without explicit redaction

### TypeScript
- Strict mode always enabled
- Use `z.infer<typeof Schema>` to derive types — no manual duplication
- Use `TRPCError` with appropriate codes — never throw raw errors

### Database
- Never `prisma db push` in production — always `prisma migrate deploy`
- Always add indexes for frequently queried fields
- Never create multiple PrismaClient instances

### Testing
- Mock external dependencies (DB, APIs, email)
- Test error paths, not just happy path
- No shared mutable state between tests