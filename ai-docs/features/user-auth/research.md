# Research Notes - User Authentication

## Key Decisions
- **Session storage**: Server-side sessions in PostgreSQL - Enables logout-all-sessions, simpler than JWT blacklisting
- **Cookie security**: HttpOnly + Secure + SameSite=Strict - Maximum XSS/CSRF protection
- **Login errors**: Generic message for invalid credentials - Prevents email enumeration
- **Rate limiting**: express-rate-limit at IP level - Protects against brute force

## Critical Risks
- **Session fixation**: Generate new session ID on login → Always create new session, never reuse
- **Brute force**: Rate limiting alone may not suffice → Add exponential backoff after N failures

## Stack Compatibility
- express-session + Prisma: ✔ (custom session store)
- cookie-parser: ✔ (built into express-session)
- Rate limiting + Express: ✔ (express-rate-limit middleware)
