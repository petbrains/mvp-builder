# Tasks: Expense CRUD

## Purpose
TDD-structured task list for implementing core expense logging with optimistic UI updates, achieving < 10 second logging time and < 200ms perceived response.

## Phase 1: Core Infrastructure

> Dependencies: user-auth (authentication), category-management (Category entity)

- [ ] INIT-001 Create Expense model in backend/prisma/schema.prisma with decimal amount, category_id, category_name, date, note
- [ ] INIT-002 Add indexes on (user_id, date) and (user_id, category_id) for performance
- [ ] INIT-003 Install decimal.js in backend for precise decimal handling per setup.md
- [ ] INIT-004 Install react-hook-form in frontend per setup.md
- [ ] INIT-005 Create expense Zod schemas in backend/src/schemas/expense.schema.ts
- [ ] INIT-006 Setup expense routes in backend/src/api/expense.routes.ts

## Phase 2: User Story 1 - Create Expense with Optimistic UI (P1 - MVP)

> [US1] Given an authenticated user on the dashboard, When they tap "Add Expense", enter amount/category/date and submit, Then the expense is saved and appears in the list within 200ms (optimistic UI).

### TDD Cycle 1: Expense Entity & Validation
**Coverage**:
- Requirements: FR-001, FR-002, FR-003, FR-004
- Data entities: Expense from data-model.md
- Constants: AMOUNT_MAX_DECIMALS=2, NOTE_MAX_LENGTH=500

#### RED Phase
- [ ] TEST-001 [US1] Test expense creation with valid amount, category, date in backend/tests/expense.test.ts
- [ ] TEST-002 [US1] Test amount validation rejects <= 0 in backend/tests/expense.test.ts
- [ ] TEST-003 [US1] Test amount rounds to AMOUNT_MAX_DECIMALS decimals in backend/tests/expense.test.ts
- [ ] TEST-004 [US1] Test category validation rejects non-existent category in backend/tests/expense.test.ts
- [ ] TEST-005 [US1] Test future dates are accepted in backend/tests/expense.test.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Create ExpenseService with create method in backend/src/services/expense.service.ts
- [ ] IMPL-002 [US1] Implement amount rounding to 2 decimals in backend/src/services/expense.service.ts
- [ ] IMPL-003 [US1] Implement category existence validation in backend/src/services/expense.service.ts
- [ ] IMPL-004 [US1] Store category_name snapshot on expense creation in backend/src/services/expense.service.ts

### TDD Cycle 2: Create Expense API
**Coverage**:
- Requirements: FR-005, FR-006, FR-010
- Contracts: POST /expenses from openapi.yaml
- Constants: API_P95_TARGET=200

#### RED Phase
- [ ] TEST-006 [US1] Test POST /expenses creates expense with user_id in backend/tests/expense.test.ts
- [ ] TEST-007 [US1] Test POST /expenses returns created expense data in backend/tests/expense.test.ts
- [ ] TEST-008 [US1] Test POST /expenses requires authentication in backend/tests/expense.test.ts

#### GREEN Phase
- [ ] IMPL-005 [US1] Create ExpenseController with create method in backend/src/api/expense.controller.ts
- [ ] IMPL-006 [US1] Add POST /expenses route with auth middleware in backend/src/api/expense.routes.ts

### TDD Cycle 3: Expense State Machine & Optimistic UI
**Coverage**:
- States: ExpenseState from data-model.md (viewing, creating, saving)
- Constants: OPTIMISTIC_TIMEOUT=200

#### RED Phase
- [ ] TEST-009 [US1] Test state transition viewing → creating on add button click in frontend/tests/Dashboard.test.tsx
- [ ] TEST-010 [US1] Test state transition creating → saving on submit in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-011 [US1] Test optimistic update shows expense immediately in frontend/tests/ExpenseList.test.tsx
- [ ] TEST-012 [US1] Test rollback on API error in frontend/tests/ExpenseList.test.tsx

#### GREEN Phase
- [ ] IMPL-007 [US1] Create useExpenses hook with React Query mutation in frontend/src/hooks/useExpenses.ts
- [ ] IMPL-008 [US1] Implement optimistic update with onMutate in frontend/src/hooks/useExpenses.ts
- [ ] IMPL-009 [US1] Implement rollback with onError in frontend/src/hooks/useExpenses.ts

### TDD Cycle 4: Expense Form UI
**Coverage**:
- Requirements: UX-001, UX-002, UX-004, UX-006
- Constants: TARGET_LOGGING_TIME=10000

#### RED Phase
- [ ] TEST-013 [US1] Test add expense button is sticky at bottom on mobile in frontend/tests/Dashboard.test.tsx
- [ ] TEST-014 [US1] Test form autofocuses on amount field in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-015 [US1] Test form opens as modal/slide-up panel in frontend/tests/ExpenseModal.test.tsx
- [ ] TEST-016 [US1] Test submit button always visible in frontend/tests/ExpenseForm.test.tsx

#### GREEN Phase
- [ ] IMPL-010 [US1] Create Dashboard with sticky add button in frontend/src/pages/Dashboard.tsx
- [ ] IMPL-011 [US1] Create ExpenseModal component in frontend/src/components/ExpenseModal.tsx
- [ ] IMPL-012 [US1] Create ExpenseForm with react-hook-form in frontend/src/components/ExpenseForm.tsx

## Phase 3: User Story 2 - Amount Validation (P1)

> [US2] Given a user adding an expense, When amount is empty or zero, Then inline validation prevents submission and shows error.

### TDD Cycle 1: Client-side Amount Validation
**Coverage**:
- Requirements: FR-002, UX-008
- States: creating → error on validation failure

#### RED Phase
- [ ] TEST-017 [US2] Test empty amount shows inline error in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-018 [US2] Test zero amount shows inline error in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-019 [US2] Test negative amount shows inline error in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-020 [US2] Test state transition creating → error on validation failure in frontend/tests/ExpenseForm.test.tsx

#### GREEN Phase
- [ ] IMPL-013 [US2] Add Zod amount validation in frontend/src/schemas/expense.schema.ts
- [ ] IMPL-014 [US2] Display inline validation errors in ExpenseForm in frontend/src/components/ExpenseForm.tsx

## Phase 4: User Story 3 - View Expenses with Month Total (P1)

> [US3] Given a user viewing expenses, When the dashboard loads, Then today's expenses are displayed with current month total.

### TDD Cycle 1: List Expenses API
**Coverage**:
- Requirements: FR-005
- Contracts: GET /expenses from openapi.yaml

#### RED Phase
- [ ] TEST-021 [US3] Test GET /expenses returns user's expenses only in backend/tests/expense.test.ts
- [ ] TEST-022 [US3] Test GET /expenses with date filter returns today's expenses in backend/tests/expense.test.ts
- [ ] TEST-023 [US3] Test GET /expenses includes month total in backend/tests/expense.test.ts

#### GREEN Phase
- [ ] IMPL-015 [US3] Add list method to ExpenseController in backend/src/api/expense.controller.ts
- [ ] IMPL-016 [US3] Implement date filtering in ExpenseService in backend/src/services/expense.service.ts
- [ ] IMPL-017 [US3] Calculate month total in list response in backend/src/services/expense.service.ts

### TDD Cycle 2: Dashboard Display
**Coverage**:
- Requirements: UX-007

#### RED Phase
- [ ] TEST-024 [US3] Test dashboard displays today's expenses on load in frontend/tests/Dashboard.test.tsx
- [ ] TEST-025 [US3] Test dashboard shows current month total in frontend/tests/Dashboard.test.tsx

#### GREEN Phase
- [ ] IMPL-018 [US3] Create ExpenseList component in frontend/src/components/ExpenseList.tsx
- [ ] IMPL-019 [US3] Display month total in Dashboard in frontend/src/pages/Dashboard.tsx

## Phase 5: User Story 4 - Edit Expense (P2)

> [US4] Given a user viewing an expense, When they tap edit, modify fields, and save, Then the expense is updated and list reflects changes immediately.

### TDD Cycle 1: Update Expense API
**Coverage**:
- Requirements: FR-006, FR-007
- Contracts: PATCH /expenses/:id from openapi.yaml

#### RED Phase
- [ ] TEST-026 [US4] Test PATCH /expenses/:id updates expense fields in backend/tests/expense.test.ts
- [ ] TEST-027 [US4] Test PATCH /expenses/:id returns updated expense in backend/tests/expense.test.ts
- [ ] TEST-028 [US4] Test PATCH /expenses/:id returns 404 for non-existent expense in backend/tests/expense.test.ts

#### GREEN Phase
- [ ] IMPL-020 [US4] Add update method to ExpenseController in backend/src/api/expense.controller.ts
- [ ] IMPL-021 [US4] Implement partial update in ExpenseService in backend/src/services/expense.service.ts

### TDD Cycle 2: Edit UI
**Coverage**:
- States: viewing → editing → saving

#### RED Phase
- [ ] TEST-029 [US4] Test state transition viewing → editing on expense tap in frontend/tests/ExpenseList.test.tsx
- [ ] TEST-030 [US4] Test edit form pre-fills current values in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-031 [US4] Test optimistic update on edit save in frontend/tests/ExpenseList.test.tsx

#### GREEN Phase
- [ ] IMPL-022 [US4] Add edit mode to ExpenseModal in frontend/src/components/ExpenseModal.tsx
- [ ] IMPL-023 [US4] Add update mutation to useExpenses in frontend/src/hooks/useExpenses.ts

## Phase 6: User Story 5 - Delete Expense (P2)

> [US5] Given a user viewing an expense, When they tap delete and confirm, Then the expense is removed and totals recalculate.

### TDD Cycle 1: Delete Expense API
**Coverage**:
- Requirements: FR-008
- Contracts: DELETE /expenses/:id from openapi.yaml

#### RED Phase
- [ ] TEST-032 [US5] Test DELETE /expenses/:id removes expense in backend/tests/expense.test.ts
- [ ] TEST-033 [US5] Test DELETE /expenses/:id returns 404 for non-existent expense in backend/tests/expense.test.ts

#### GREEN Phase
- [ ] IMPL-024 [US5] Add delete method to ExpenseController in backend/src/api/expense.controller.ts

### TDD Cycle 2: Delete UI
**Coverage**:
- States: viewing → confirming_delete → viewing

#### RED Phase
- [ ] TEST-034 [US5] Test state transition viewing → confirming_delete on delete tap in frontend/tests/ExpenseList.test.tsx
- [ ] TEST-035 [US5] Test delete confirmation dialog appears in frontend/tests/ExpenseList.test.tsx
- [ ] TEST-036 [US5] Test optimistic delete and total recalculation in frontend/tests/ExpenseList.test.tsx

#### GREEN Phase
- [ ] IMPL-025 [US5] Add delete mutation with optimistic update in frontend/src/hooks/useExpenses.ts
- [ ] IMPL-026 [US5] Integrate ConfirmDialog for delete in frontend/src/components/ExpenseList.tsx

## Phase 7: User Story 6 - Default Date (P2)

> [US6] Given a user on the expense form, When no date is selected, Then today's date is pre-filled as default.

### TDD Cycle 1: Date Default
**Coverage**:
- Requirements: UX-003

#### RED Phase
- [ ] TEST-037 [US6] Test date field defaults to today in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-038 [US6] Test user can change default date in frontend/tests/ExpenseForm.test.tsx

#### GREEN Phase
- [ ] IMPL-027 [US6] Set today as default date value in ExpenseForm in frontend/src/components/ExpenseForm.tsx

## Phase 8: User Story 7 - Error Handling with Retry (P3)

> [US7] Given a server error during save, When the user submits, Then a toast shows error and form data is preserved for retry.

### TDD Cycle 1: Error Toast
**Coverage**:
- Requirements: FR-009
- States: saving → error on API failure

#### RED Phase
- [ ] TEST-039 [US7] Test state transition saving → error on server error in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-040 [US7] Test toast displays error message in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-041 [US7] Test form data preserved after error in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-042 [US7] Test retry button in toast in frontend/tests/Toast.test.tsx

#### GREEN Phase
- [ ] IMPL-028 [US7] Handle mutation error in useExpenses in frontend/src/hooks/useExpenses.ts
- [ ] IMPL-029 [US7] Display toast with retry on error in frontend/src/components/ExpenseForm.tsx

### TDD Cycle 2: Accessibility
**Coverage**:
- Accessibility: 44px tap targets from ux.md
- Requirements: UX-005

#### RED Phase
- [ ] TEST-043 [US7] Test all form fields have 44px min height in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-044 [US7] Test keyboard navigation in expense form in frontend/tests/ExpenseForm.test.tsx
- [ ] TEST-045 [US7] Test swipe gesture for delete on mobile in frontend/tests/ExpenseList.test.tsx

#### GREEN Phase
- [ ] IMPL-030 [US7] Ensure 44px minimum height on all form elements in frontend/src/components/ExpenseForm.tsx
- [ ] IMPL-031 [US7] Add swipe-to-delete gesture in frontend/src/components/ExpenseList.tsx

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: User Story 1 - Create Expense with Optimistic UI (P1)
3. **Phase 3**: User Story 2 - Amount Validation (P1)
4. **Phase 4**: User Story 3 - View Expenses with Month Total (P1)
5. **Phase 5**: User Story 4 - Edit Expense (P2)
6. **Phase 6**: User Story 5 - Delete Expense (P2)
7. **Phase 7**: User Story 6 - Default Date (P2)
8. **Phase 8**: User Story 7 - Error Handling with Retry (P3)

Within each story: RED → GREEN cycles

## Notes

- Depends on user-auth (authentication) and category-management (Category entity)
- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- All ExpenseState transitions have corresponding tests
- All constants from data-model.md referenced in tasks
- Optimistic UI is critical for achieving < 200ms perceived response
- Amount rounding to 2 decimals handled on server (FR-002)
