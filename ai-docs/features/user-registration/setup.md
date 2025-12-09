# Setup - User Registration

## Install
```bash
# Backend dependencies
cd backend
npm install argon2 zod @prisma/client
npm install -D prisma jest supertest @types/jest

# Frontend dependencies
cd frontend
npm install zod @tanstack/react-query react-router-dom
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## Config
```env
# backend/.env
DATABASE_URL="postgresql://user:pass@localhost:5432/spendnote"
SESSION_SECRET="your-secret-key"
SESSION_TTL_MS=604800000
```

## Run
```bash
# Database setup
cd backend && npx prisma migrate dev

# Start backend
npm run dev

# Start frontend
cd frontend && npm run dev
```

## Test
```bash
# Backend tests (TDD workflow)
cd backend && npm test -- --watch

# Frontend tests
cd frontend && npm test -- --watch
```
