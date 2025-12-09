# Setup - Expense Filtering

## Install
```bash
# Backend - no additional dependencies

# Frontend dependencies
cd frontend
npm install react-window  # For virtualized list
```

## Config
```env
# No additional configuration needed
```

## Run
```bash
# Same as previous features
cd backend && npm run dev
cd frontend && npm run dev
```

## Test
```bash
# Backend filtering tests
cd backend && npm test -- --watch filter

# Frontend filtering tests
cd frontend && npm test -- --watch Filter
```
