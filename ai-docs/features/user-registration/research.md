# Research Notes - User Registration

## Key Decisions
- **Password hashing**: argon2 - More resistant to GPU attacks than bcrypt, recommended by OWASP
- **Email validation**: Zod email() + server-side verification - Shared schema between client/server
- **Session creation**: HTTP-only cookies - Simpler than JWT, XSS-resistant per PRD
- **Default categories**: Provisioned in same transaction as user creation - Ensures atomic operation

## Critical Risks
- **Email enumeration**: Duplicate email check reveals existing accounts → Use generic error message, rate limiting
- **Timing attacks**: Password hashing time varies → Use constant-time comparison for all auth checks

## Stack Compatibility
- Prisma + PostgreSQL: ✔ (native support)
- argon2 + Node.js: ✔ (argon2 package)
- Zod + React: ✔ (shared schemas via @tanstack/react-query)
