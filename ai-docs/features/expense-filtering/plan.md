# Implementation Plan: Expense Filtering

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Implements expense list filtering by month and category with cursor-based pagination. Uses react-window for virtualized rendering to handle large datasets. Filter state synced with URL params for shareability.

## Technical Context

**Language:** TypeScript

**Framework:** React + Vite (frontend), Express (backend)

**Storage:** PostgreSQL via Prisma (indexed queries on date, category_id)

**API Layer:** REST JSON with cursor pagination

**Testing:** Jest + Supertest (backend), Vitest + RTL (frontend)

**Deployment:** Single-node deployment

**Constraints:** Must handle 100k expenses per user smoothly

## Implementation Mapping

### Component Architecture
- **Core Components:**
  - Backend: ExpenseController (extended), filter query builder
  - Frontend: ExpensesPage, FilterBar, VirtualizedExpenseList, useFilteredExpenses hook
- **Data Models:** Uses Expense from expense-crud // from expense-crud/data-model.md
- **API Operations:** GET /expenses with query params (month, category_id, cursor, limit)
- **State Management:** URL params + React Query with filter-aware cache keys

### Error Handling Approach
- **Error handlers location:** React Query error callbacks
- **Recovery mechanisms:** Previous results retained on error, retry via toast
- **User feedback:** Empty state with filter adjustment suggestion

## Feature Code Organization

```
backend/
├── src/
│   ├── services/
│   │   └── expense.service.ts (extends with filter logic)
│   └── api/
│       └── expense.controller.ts (extends)
└── tests/
    └── expense-filter.test.ts

frontend/
├── src/
│   ├── components/
│   │   ├── FilterBar.tsx
│   │   └── VirtualizedExpenseList.tsx
│   ├── pages/
│   │   └── ExpensesPage.tsx
│   └── hooks/
│       └── useFilteredExpenses.ts
└── tests/
    └── ExpenseFiltering.test.tsx
```

**Selected Structure:** B (Split Architecture) - Extends expense-crud with filtering UI and query logic

## Testing Approach
- **Test Structure:** Backend in `backend/tests/`, frontend in `frontend/tests/`
- **Coverage Strategy:**
  - Backend: Filter combinations, pagination cursor, empty results
  - Frontend: Filter controls, infinite scroll, empty state display

## Implementation Notes
- Database indexes: Create composite index on (user_id, date) and (user_id, category_id)
- Cursor pagination: Use expense.id as cursor, ordered by date DESC, id DESC
- Virtualization: react-window FixedSizeList with 50px row height
- Filter debounce: 300ms delay before API call on filter change (FR-005 equivalent behavior)
