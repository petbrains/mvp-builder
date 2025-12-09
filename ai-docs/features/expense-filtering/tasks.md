# Tasks: Expense Filtering

## Purpose
TDD-structured task list for implementing expense filtering by month and category with cursor-based pagination and virtualized list rendering.

## Phase 1: Core Infrastructure

> Dependency: Extends expense-crud infrastructure (Expense entity, expense API)

- [ ] INIT-001 Install react-window in frontend for virtualized list per setup.md
- [ ] INIT-002 Add cursor-based pagination to GET /expenses endpoint
- [ ] INIT-003 Create filter query builder in backend/src/services/expense.service.ts
- [ ] INIT-004 Add database indexes for filter performance (user_id, date) and (user_id, category_id)

## Phase 2: User Story 1 - Filter by Month (P1 - MVP)

> [US1] Given a user on the Expenses tab, When they select a specific month from the filter, Then only expenses from that month are displayed.

### TDD Cycle 1: Month Filter API
**Coverage**:
- Requirements: FR-001, FR-006
- Constants: PAGE_SIZE=50

#### RED Phase
- [ ] TEST-001 [US1] Test GET /expenses with month param returns filtered expenses in backend/tests/expense-filter.test.ts
- [ ] TEST-002 [US1] Test month filter uses YYYY-MM format in backend/tests/expense-filter.test.ts
- [ ] TEST-003 [US1] Test month filter returns PAGE_SIZE items with cursor in backend/tests/expense-filter.test.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Add month filter to ExpenseService query builder in backend/src/services/expense.service.ts
- [ ] IMPL-002 [US1] Implement cursor-based pagination in backend/src/services/expense.service.ts

### TDD Cycle 2: Month Filter State Machine
**Coverage**:
- States: FilterState from data-model.md (default, filtering, filtered)

#### RED Phase
- [ ] TEST-004 [US1] Test state transition default → filtering on month select in frontend/tests/FilterBar.test.tsx
- [ ] TEST-005 [US1] Test state transition filtering → filtered when results load in frontend/tests/ExpensesPage.test.tsx

#### GREEN Phase
- [ ] IMPL-003 [US1] Create useFilteredExpenses hook with filter state in frontend/src/hooks/useFilteredExpenses.ts
- [ ] IMPL-004 [US1] Implement React Query with month filter key in frontend/src/hooks/useFilteredExpenses.ts

### TDD Cycle 3: Month Selector UI
**Coverage**:
- Requirements: UX-001, UX-002
- Constants: FILTER_DEBOUNCE=300

#### RED Phase
- [ ] TEST-006 [US1] Test month selector defaults to current month in frontend/tests/FilterBar.test.tsx
- [ ] TEST-007 [US1] Test filters positioned at top of list in frontend/tests/ExpensesPage.test.tsx
- [ ] TEST-008 [US1] Test filter change debounced by FILTER_DEBOUNCE ms in frontend/tests/FilterBar.test.tsx

#### GREEN Phase
- [ ] IMPL-005 [US1] Create FilterBar component with month selector in frontend/src/components/FilterBar.tsx
- [ ] IMPL-006 [US1] Create ExpensesPage with filter bar at top in frontend/src/pages/ExpensesPage.tsx
- [ ] IMPL-007 [US1] Add debounce to filter changes in frontend/src/hooks/useFilteredExpenses.ts

## Phase 3: User Story 2 - Filter by Category (P1)

> [US2] Given a user on the Expenses tab, When they select a category from the dropdown, Then only expenses in that category are displayed.

### TDD Cycle 1: Category Filter API
**Coverage**:
- Requirements: FR-002, FR-003

#### RED Phase
- [ ] TEST-009 [US2] Test GET /expenses with category_id param returns filtered expenses in backend/tests/expense-filter.test.ts
- [ ] TEST-010 [US2] Test combined month and category filter in backend/tests/expense-filter.test.ts

#### GREEN Phase
- [ ] IMPL-008 [US2] Add category filter to ExpenseService query builder in backend/src/services/expense.service.ts
- [ ] IMPL-009 [US2] Combine month and category filters in backend/src/services/expense.service.ts

### TDD Cycle 2: Category Dropdown UI
**Coverage**:
- Requirements: UX-003

#### RED Phase
- [ ] TEST-011 [US2] Test category dropdown includes "All Categories" option in frontend/tests/FilterBar.test.tsx
- [ ] TEST-012 [US2] Test category filter updates query in frontend/tests/FilterBar.test.tsx

#### GREEN Phase
- [ ] IMPL-010 [US2] Add category dropdown to FilterBar in frontend/src/components/FilterBar.tsx
- [ ] IMPL-011 [US2] Add category to filter query key in frontend/src/hooks/useFilteredExpenses.ts

## Phase 4: User Story 3 - Clear Filters (P2)

> [US3] Given filters are applied, When the user clears filters, Then all expenses are shown (default view).

### TDD Cycle 1: Clear Filters
**Coverage**:
- States: filtered → default on clear

#### RED Phase
- [ ] TEST-013 [US3] Test state transition filtered → default on clear in frontend/tests/FilterBar.test.tsx
- [ ] TEST-014 [US3] Test clear resets to current month, all categories in frontend/tests/FilterBar.test.tsx

#### GREEN Phase
- [ ] IMPL-012 [US3] Add clear filters button to FilterBar in frontend/src/components/FilterBar.tsx
- [ ] IMPL-013 [US3] Implement filter reset in useFilteredExpenses in frontend/src/hooks/useFilteredExpenses.ts

## Phase 5: User Story 4 - Infinite Scroll (P2)

> [US4] Given a user with many expenses, When they scroll the list, Then expenses load progressively without performance degradation.

### TDD Cycle 1: Pagination API
**Coverage**:
- Requirements: FR-004
- Constants: PAGE_SIZE=50, LOAD_MORE_THRESHOLD=10

#### RED Phase
- [ ] TEST-015 [US4] Test GET /expenses returns next_cursor for more pages in backend/tests/expense-filter.test.ts
- [ ] TEST-016 [US4] Test cursor pagination returns correct next page in backend/tests/expense-filter.test.ts

#### GREEN Phase
- [ ] IMPL-014 [US4] Return next_cursor in paginated response in backend/src/api/expense.controller.ts
- [ ] IMPL-015 [US4] Implement cursor-based pagination logic in backend/src/services/expense.service.ts

### TDD Cycle 2: Virtualized List
**Coverage**:
- Requirements: FR-004, UX-005
- States: filtered → loading_more on scroll

#### RED Phase
- [ ] TEST-017 [US4] Test state transition filtered → loading_more on scroll in frontend/tests/VirtualizedExpenseList.test.tsx
- [ ] TEST-018 [US4] Test load more triggers at LOAD_MORE_THRESHOLD items from bottom in frontend/tests/VirtualizedExpenseList.test.tsx
- [ ] TEST-019 [US4] Test virtualized list renders smoothly with 1000+ items in frontend/tests/VirtualizedExpenseList.test.tsx

#### GREEN Phase
- [ ] IMPL-016 [US4] Create VirtualizedExpenseList with react-window in frontend/src/components/VirtualizedExpenseList.tsx
- [ ] IMPL-017 [US4] Implement infinite scroll with useInfiniteQuery in frontend/src/hooks/useFilteredExpenses.ts

## Phase 6: User Story 5 - Empty State (P3)

> [US5] Given combined month and category filters, When no expenses match, Then an empty state message is shown with suggestion to adjust filters.

### TDD Cycle 1: Empty State
**Coverage**:
- Requirements: FR-005, UX-006
- States: filtering → empty on no results

#### RED Phase
- [ ] TEST-020 [US5] Test state transition filtering → empty when no results in frontend/tests/ExpensesPage.test.tsx
- [ ] TEST-021 [US5] Test empty state displays meaningful message in frontend/tests/ExpensesPage.test.tsx
- [ ] TEST-022 [US5] Test empty state suggests adjusting filters in frontend/tests/ExpensesPage.test.tsx

#### GREEN Phase
- [ ] IMPL-018 [US5] Create EmptyState component with suggestion in frontend/src/components/EmptyState.tsx
- [ ] IMPL-019 [US5] Display EmptyState when results empty in frontend/src/pages/ExpensesPage.tsx

### TDD Cycle 2: Accessibility
**Coverage**:
- Accessibility: 44px tap targets from ux.md
- Requirements: UX-004

#### RED Phase
- [ ] TEST-023 [US5] Test filter controls have 44px min height in frontend/tests/FilterBar.test.tsx
- [ ] TEST-024 [US5] Test keyboard navigation through filters in frontend/tests/FilterBar.test.tsx
- [ ] TEST-025 [US5] Test arrow keys navigate within dropdowns in frontend/tests/FilterBar.test.tsx

#### GREEN Phase
- [ ] IMPL-020 [US5] Ensure 44px minimum height on filter controls in frontend/src/components/FilterBar.tsx
- [ ] IMPL-021 [US5] Add keyboard navigation to dropdowns in frontend/src/components/FilterBar.tsx

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: User Story 1 - Filter by Month (P1)
3. **Phase 3**: User Story 2 - Filter by Category (P1)
4. **Phase 4**: User Story 3 - Clear Filters (P2)
5. **Phase 5**: User Story 4 - Infinite Scroll (P2)
6. **Phase 6**: User Story 5 - Empty State (P3)

Within each story: RED → GREEN cycles

## Notes

- Depends on expense-crud feature (Expense entity, expense API)
- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- All FilterState transitions have corresponding tests
- All constants from data-model.md referenced in tasks
- Virtualization critical for handling 100k expenses smoothly
