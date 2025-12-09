# Setup - Category Management

## Install
```bash
# No additional backend dependencies

# Frontend (if not already installed)
cd frontend
npm install @tanstack/react-query
```

## Config
```env
# No additional configuration needed
# Uses existing DATABASE_URL from auth setup
```

## Run
```bash
# Same as previous features
cd backend && npm run dev
cd frontend && npm run dev
```

## Test
```bash
# Backend category tests
cd backend && npm test -- --watch category

# Frontend category tests
cd frontend && npm test -- --watch Category
```
