# Setup - Expense CRUD

## Install
```bash
# Backend dependencies
cd backend
npm install decimal.js  # For precise decimal handling

# Frontend dependencies
cd frontend
npm install react-hook-form  # For form handling
```

## Config
```env
# No additional configuration needed
# Uses existing DATABASE_URL and session config
```

## Run
```bash
# Same as previous features
cd backend && npm run dev
cd frontend && npm run dev
```

## Test
```bash
# Backend expense tests
cd backend && npm test -- --watch expense

# Frontend expense tests
cd frontend && npm test -- --watch Expense
```
