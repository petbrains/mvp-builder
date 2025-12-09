# Research Notes - Expense CRUD

## Key Decisions
- **Optimistic UI**: React Query mutations with rollback - Achieves <200ms perceived response
- **Amount storage**: Decimal(10,2) in database - Avoids floating point precision issues
- **Date handling**: Store as DATE type, default to client timezone today - Simple, covers 90% use case
- **Category reference**: Store both category_id and category_name snapshot - Handles category deletion gracefully

## Critical Risks
- **Optimistic rollback**: Failed save with stale cache → Invalidate query on error, restore previous state
- **Concurrent edits**: Same expense edited on multiple devices → Last-write-wins, no conflict resolution for MVP

## Stack Compatibility
- React Query optimistic updates: ✔ (onMutate/onError/onSettled)
- Prisma Decimal type: ✔ (maps to PostgreSQL DECIMAL)
- Zod decimal validation: ✔ (z.number().positive())
