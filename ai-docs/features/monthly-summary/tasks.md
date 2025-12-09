# Tasks: Monthly Summary

## Purpose
TDD-structured task list for implementing monthly spending summary with total, per-category breakdown, and simple bar visualization.

## Phase 1: Core Infrastructure

> Dependency: Extends expense-crud infrastructure (Expense entity with category_name)

- [ ] INIT-001 Create summary routes in backend/src/api/summary.routes.ts
- [ ] INIT-002 Create SummaryService in backend/src/services/summary.service.ts
- [ ] INIT-003 Create SummaryController in backend/src/api/summary.controller.ts
- [ ] INIT-004 Setup summary query with Prisma aggregation in backend

## Phase 2: User Story 1 - View Month Total (P1 - MVP)

> [US1] Given a user on the Summary tab, When the view loads, Then they see total spent for the current month prominently displayed.

### TDD Cycle 1: Summary API
**Coverage**:
- Requirements: FR-001, FR-006
- Data entities: MonthlySummary from data-model.md
- Constants: SUMMARY_LOAD_TARGET=1000

#### RED Phase
- [ ] TEST-001 [US1] Test GET /summary/:month returns total for month in backend/tests/summary.test.ts
- [ ] TEST-002 [US1] Test GET /summary/:month requires authentication in backend/tests/summary.test.ts
- [ ] TEST-003 [US1] Test GET /summary with current month returns correct total in backend/tests/summary.test.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Implement getMonthlySummary in SummaryService in backend/src/services/summary.service.ts
- [ ] IMPL-002 [US1] Add GET /summary/:month route in backend/src/api/summary.routes.ts

### TDD Cycle 2: Summary State Machine
**Coverage**:
- States: SummaryState from data-model.md (loading, displaying)

#### RED Phase
- [ ] TEST-004 [US1] Test state transition loading → displaying on data load in frontend/tests/SummaryPage.test.tsx
- [ ] TEST-005 [US1] Test summary defaults to current month in frontend/tests/SummaryPage.test.tsx

#### GREEN Phase
- [ ] IMPL-003 [US1] Create useMonthlySummary hook in frontend/src/hooks/useMonthlySummary.ts
- [ ] IMPL-004 [US1] Implement React Query with month key in frontend/src/hooks/useMonthlySummary.ts

### TDD Cycle 3: Total Display UI
**Coverage**:
- Requirements: UX-001

#### RED Phase
- [ ] TEST-006 [US1] Test total displayed prominently at top in frontend/tests/SummaryPage.test.tsx
- [ ] TEST-007 [US1] Test total formatted as currency in frontend/tests/TotalDisplay.test.tsx

#### GREEN Phase
- [ ] IMPL-005 [US1] Create TotalDisplay component in frontend/src/components/TotalDisplay.tsx
- [ ] IMPL-006 [US1] Create SummaryPage with TotalDisplay in frontend/src/pages/SummaryPage.tsx

## Phase 3: User Story 2 - Category Breakdown (P1)

> [US2] Given a user viewing the summary, When they have expenses in multiple categories, Then a per-category breakdown shows amount and percentage for each.

### TDD Cycle 1: Breakdown API
**Coverage**:
- Requirements: FR-002, FR-004
- Data entities: CategoryTotal from data-model.md
- Constants: PERCENTAGE_DECIMALS=1

#### RED Phase
- [ ] TEST-008 [US2] Test GET /summary/:month returns category_breakdown array in backend/tests/summary.test.ts
- [ ] TEST-009 [US2] Test breakdown includes category_name, amount, percentage in backend/tests/summary.test.ts
- [ ] TEST-010 [US2] Test percentage calculated to PERCENTAGE_DECIMALS places in backend/tests/summary.test.ts
- [ ] TEST-011 [US2] Test breakdown includes deleted category expenses by category_name in backend/tests/summary.test.ts

#### GREEN Phase
- [ ] IMPL-007 [US2] Add category aggregation to SummaryService in backend/src/services/summary.service.ts
- [ ] IMPL-008 [US2] Calculate percentages in breakdown in backend/src/services/summary.service.ts

### TDD Cycle 2: Breakdown UI
**Coverage**:
- Requirements: UX-002

#### RED Phase
- [ ] TEST-012 [US2] Test breakdown shows both amount and percentage in frontend/tests/CategoryBreakdown.test.tsx
- [ ] TEST-013 [US2] Test breakdown lists all categories with expenses in frontend/tests/CategoryBreakdown.test.tsx

#### GREEN Phase
- [ ] IMPL-009 [US2] Create CategoryBreakdown component in frontend/src/components/CategoryBreakdown.tsx
- [ ] IMPL-010 [US2] Add CategoryBreakdown to SummaryPage in frontend/src/pages/SummaryPage.tsx

## Phase 4: User Story 3 - Change Month (P2)

> [US3] Given a user on the summary, When they select a different month, Then totals and breakdown update for the selected month.

### TDD Cycle 1: Month Selector
**Coverage**:
- Requirements: FR-005, UX-004
- States: displaying → switching_month → displaying
- Constants: MONTH_SWITCH_DEBOUNCE=300

#### RED Phase
- [ ] TEST-014 [US3] Test state transition displaying → switching_month on month change in frontend/tests/SummaryPage.test.tsx
- [ ] TEST-015 [US3] Test state transition switching_month → displaying when data loads in frontend/tests/SummaryPage.test.tsx
- [ ] TEST-016 [US3] Test month switch debounced by MONTH_SWITCH_DEBOUNCE ms in frontend/tests/MonthSelector.test.tsx

#### GREEN Phase
- [ ] IMPL-011 [US3] Create MonthSelector component in frontend/src/components/MonthSelector.tsx
- [ ] IMPL-012 [US3] Add debounce to month changes in frontend/src/hooks/useMonthlySummary.ts

## Phase 5: User Story 4 - Visual Chart (P2)

> [US4] Given expense data exists, When summary loads, Then a visual representation (chart or bars) shows spending distribution.

### TDD Cycle 1: Spending Chart
**Coverage**:
- Requirements: FR-003, UX-003

#### RED Phase
- [ ] TEST-017 [US4] Test spending chart renders with data in frontend/tests/SpendingChart.test.tsx
- [ ] TEST-018 [US4] Test chart shows percentage bars for each category in frontend/tests/SpendingChart.test.tsx
- [ ] TEST-019 [US4] Test single category renders meaningful chart (100% bar) in frontend/tests/SpendingChart.test.tsx

#### GREEN Phase
- [ ] IMPL-013 [US4] Create SpendingChart with Tailwind bars in frontend/src/components/SpendingChart.tsx
- [ ] IMPL-014 [US4] Add SpendingChart to SummaryPage in frontend/src/pages/SummaryPage.tsx

## Phase 6: User Story 5 - Empty State (P3)

> [US5] Given a user with no expenses for selected month, When summary loads, Then an empty state encourages adding expenses.

### TDD Cycle 1: Empty State
**Coverage**:
- States: loading → empty on no data

#### RED Phase
- [ ] TEST-020 [US5] Test state transition loading → empty when no expenses in frontend/tests/SummaryPage.test.tsx
- [ ] TEST-021 [US5] Test empty state displays encouraging message in frontend/tests/SummaryPage.test.tsx
- [ ] TEST-022 [US5] Test empty state suggests adding expenses in frontend/tests/SummaryPage.test.tsx

#### GREEN Phase
- [ ] IMPL-015 [US5] Create SummaryEmptyState component in frontend/src/components/SummaryEmptyState.tsx
- [ ] IMPL-016 [US5] Display SummaryEmptyState when no expenses in frontend/src/pages/SummaryPage.tsx

### TDD Cycle 2: Error State
**Coverage**:
- States: loading → error on failure

#### RED Phase
- [ ] TEST-023 [US5] Test state transition loading → error on API failure in frontend/tests/SummaryPage.test.tsx
- [ ] TEST-024 [US5] Test error state shows retry button in frontend/tests/SummaryPage.test.tsx

#### GREEN Phase
- [ ] IMPL-017 [US5] Handle error state in useMonthlySummary in frontend/src/hooks/useMonthlySummary.ts
- [ ] IMPL-018 [US5] Display error with retry in SummaryPage in frontend/src/pages/SummaryPage.tsx

### TDD Cycle 3: Accessibility & Caching
**Coverage**:
- Accessibility: Chart accessibility from ux.md
- Constants: SUMMARY_STALE_TIME=300000

#### RED Phase
- [ ] TEST-025 [US5] Test chart has accessible labels for screen readers in frontend/tests/SpendingChart.test.tsx
- [ ] TEST-026 [US5] Test summary caches with SUMMARY_STALE_TIME in frontend/tests/useMonthlySummary.test.ts
- [ ] TEST-027 [US5] Test 44px minimum touch targets on month selector in frontend/tests/MonthSelector.test.tsx

#### GREEN Phase
- [ ] IMPL-019 [US5] Add ARIA labels to SpendingChart in frontend/src/components/SpendingChart.tsx
- [ ] IMPL-020 [US5] Configure staleTime in React Query in frontend/src/hooks/useMonthlySummary.ts
- [ ] IMPL-021 [US5] Ensure 44px minimum height on MonthSelector in frontend/src/components/MonthSelector.tsx

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: User Story 1 - View Month Total (P1)
3. **Phase 3**: User Story 2 - Category Breakdown (P1)
4. **Phase 4**: User Story 3 - Change Month (P2)
5. **Phase 5**: User Story 4 - Visual Chart (P2)
6. **Phase 6**: User Story 5 - Empty State (P3)

Within each story: RED → GREEN cycles

## Notes

- Depends on expense-crud feature (Expense entity with category_name)
- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- All SummaryState transitions have corresponding tests
- All constants from data-model.md referenced in tasks
- Aggregation uses category_name (not category_id) to include deleted categories (FR-004)
- Simple Tailwind bars used instead of charting library (UX-003)
