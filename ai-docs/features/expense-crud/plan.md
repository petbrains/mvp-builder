# Implementation Plan: Expense CRUD

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Implements core expense logging with optimistic UI updates for sub-200ms perceived response. Uses React Query for cache management and Prisma for database operations. Stores category_name snapshot to handle category deletion gracefully.

## Technical Context

**Language:** TypeScript

**Framework:** React + Vite (frontend), Express (backend)

**Storage:** PostgreSQL via Prisma (Expense table with decimal amount)

**API Layer:** REST JSON over HTTPS

**Testing:** Jest + Supertest (backend), Vitest + RTL (frontend)

**Deployment:** Single-node deployment

**Constraints:** API p95 < 200ms, max 100k expenses per user

## Implementation Mapping

### Component Architecture
- **Core Components:**
  - Backend: ExpenseController, ExpenseService, ExpenseRepository
  - Frontend: Dashboard, ExpenseList, ExpenseForm, ExpenseModal, useExpenses hook
- **Data Models:** Expense entity // from data-model.md
- **API Operations:** GET/POST /expenses, GET/PATCH/DELETE /expenses/:id, GET /expenses/summary
- **State Management:** React Query with optimistic updates // ExpenseState from data-model.md

### Error Handling Approach
- **Error handlers location:** React Query onError for rollback, Express validation middleware
- **Recovery mechanisms:** Optimistic update rollback, form data preserved, retry via toast
- **User feedback:** Inline validation, toast for network errors, confirmation for delete

## Feature Code Organization

```
backend/
├── src/
│   ├── models/
│   │   └── expense.prisma
│   ├── services/
│   │   └── expense.service.ts
│   └── api/
│       ├── expense.controller.ts
│       └── expense.routes.ts
└── tests/
    ├── expense-crud.test.ts
    └── expense-validation.test.ts

frontend/
├── src/
│   ├── components/
│   │   ├── ExpenseList.tsx
│   │   ├── ExpenseForm.tsx
│   │   └── ExpenseModal.tsx
│   ├── pages/
│   │   └── Dashboard.tsx
│   └── hooks/
│       └── useExpenses.ts
└── tests/
    ├── ExpenseForm.test.tsx
    └── ExpenseList.test.tsx
```

**Selected Structure:** B (Split Architecture) - Core feature requires React UI with modal/form and Express API with Prisma

## Testing Approach
- **Test Structure:** Backend in `backend/tests/`, frontend in `frontend/tests/`
- **Coverage Strategy:**
  - Backend: CRUD operations, validation rules, amount rounding, category validation
  - Frontend: Form submission, optimistic updates, rollback behavior, delete confirmation

## Implementation Notes
- Amount rounding: Client rounds to 2 decimals before submit, server enforces (FR-002)
- Date default: Set in frontend form, not API (allows explicit date on edit)
- Category snapshot: Copy category.name to expense.category_name on create/update
- Optimistic UI: Use React Query's onMutate to update cache, onError to rollback
- Future dates allowed for planning use case (edge case from spec.md)
