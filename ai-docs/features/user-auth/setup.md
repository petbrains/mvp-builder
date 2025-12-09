# Setup - User Authentication

## Install
```bash
# Backend dependencies
cd backend
npm install express-rate-limit

# Frontend dependencies (shared with registration)
cd frontend
# No additional dependencies
```

## Config
```env
# backend/.env (additions to registration config)
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=10
MAX_SESSIONS_PER_USER=10
```

## Run
```bash
# Same as user-registration
cd backend && npm run dev
cd frontend && npm run dev
```

## Test
```bash
# Backend auth tests
cd backend && npm test -- --watch auth

# Frontend login tests
cd frontend && npm test -- --watch Login
```
