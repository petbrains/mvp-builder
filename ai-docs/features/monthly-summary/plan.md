# Implementation Plan: Monthly Summary

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Implements monthly spending summary with total and per-category breakdown. Uses server-side SQL aggregation for performance and simple Tailwind-based bar visualization. Caches summary with 5-minute stale time.

## Technical Context

**Language:** TypeScript

**Framework:** React + Vite (frontend), Express (backend)

**Storage:** PostgreSQL via Prisma (aggregation queries)

**API Layer:** REST JSON over HTTPS

**Testing:** Jest + Supertest (backend), Vitest + RTL (frontend)

**Deployment:** Single-node deployment

**Constraints:** Load under 1s, handle deleted categories in historical data

## Implementation Mapping

### Component Architecture
- **Core Components:**
  - Backend: SummaryController, SummaryService (aggregation queries)
  - Frontend: SummaryPage, MonthSelector, TotalDisplay, CategoryBreakdown, SpendingChart
- **Data Models:** MonthlySummary, CategoryTotal // from data-model.md
- **API Operations:** GET /summary/:month
- **State Management:** React Query with extended staleTime for summary data

### Error Handling Approach
- **Error handlers location:** React Query error callbacks
- **Recovery mechanisms:** Error state with retry button, no cached fallback
- **User feedback:** Full-area error state, empty state encourages adding expenses

## Feature Code Organization

```
backend/
├── src/
│   ├── services/
│   │   └── summary.service.ts
│   └── api/
│       ├── summary.controller.ts
│       └── summary.routes.ts
└── tests/
    └── summary.test.ts

frontend/
├── src/
│   ├── components/
│   │   ├── MonthSelector.tsx
│   │   ├── TotalDisplay.tsx
│   │   ├── CategoryBreakdown.tsx
│   │   └── SpendingChart.tsx
│   ├── pages/
│   │   └── SummaryPage.tsx
│   └── hooks/
│       └── useMonthlySummary.ts
└── tests/
    └── MonthlySummary.test.tsx
```

**Selected Structure:** B (Split Architecture) - Summary view requires React visualization components and Express aggregation API

## Testing Approach
- **Test Structure:** Backend in `backend/tests/`, frontend in `frontend/tests/`
- **Coverage Strategy:**
  - Backend: Aggregation accuracy, deleted category handling, empty month
  - Frontend: Chart rendering, month switching, empty state

## Implementation Notes
- Aggregation query: GROUP BY category_name (not category_id) to handle deleted categories (FR-004)
- Percentage calculation: (category_amount / total) * 100, rounded to 1 decimal
- Single category edge case: Chart still renders meaningfully (100% bar) per spec.md edge case
- Month debounce: 300ms delay before fetch on rapid month switching
- Chart: Simple horizontal bars using Tailwind percentage widths, no external library
