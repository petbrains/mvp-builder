# Tasks: Category Management

## Purpose
TDD-structured task list for implementing category CRUD with default category provisioning, 50 category limit, and graceful deletion handling.

## Phase 1: Core Infrastructure

> Dependency: Extends user-registration infrastructure (User entity, default category provisioning on registration)

- [ ] INIT-001 Create Category model in backend/prisma/schema.prisma with id, user_id, name, timestamps
- [ ] INIT-002 Add unique constraint on (user_id, name) in backend/prisma/schema.prisma
- [ ] INIT-003 Create category Zod schemas in backend/src/schemas/category.schema.ts
- [ ] INIT-004 Setup category routes in backend/src/api/category.routes.ts
- [ ] INIT-005 Create CategoryRepository in backend/src/repositories/category.repository.ts

## Phase 2: User Story 1 - Default Categories (P1 - MVP)

> [US1] Given a new user after registration, When they access category management, Then default categories are already provisioned.

### TDD Cycle 1: Default Category Provisioning
**Coverage**:
- Requirements: FR-001
- Data entities: Category, DefaultCategoryName enum from data-model.md
- Constants: DEFAULT_CATEGORIES_COUNT=6

#### RED Phase
- [ ] TEST-001 [US1] Test registration creates 6 default categories in backend/tests/auth.test.ts
- [ ] TEST-002 [US1] Test default categories include Food, Transport, Entertainment, Shopping, Bills, Other in backend/tests/auth.test.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Create DefaultCategoryName enum in backend/src/types/category.types.ts
- [ ] IMPL-002 [US1] Implement default category creation in registration transaction in backend/src/services/auth.service.ts

### TDD Cycle 2: List Categories API
**Coverage**:
- Requirements: FR-007, UX-001
- Contracts: GET /categories from openapi.yaml

#### RED Phase
- [ ] TEST-003 [US1] Test GET /categories returns user's categories only in backend/tests/category.test.ts
- [ ] TEST-004 [US1] Test GET /categories requires authentication in backend/tests/category.test.ts

#### GREEN Phase
- [ ] IMPL-003 [US1] Create CategoryController with list method in backend/src/api/category.controller.ts
- [ ] IMPL-004 [US1] Add CategoryService with findByUser method in backend/src/services/category.service.ts

### TDD Cycle 3: Categories List UI
**Coverage**:
- Requirements: UX-001, UX-003

#### RED Phase
- [ ] TEST-005 [US1] Test CategoriesPage displays all user categories in frontend/tests/CategoriesPage.test.tsx
- [ ] TEST-006 [US1] Test each category shows edit and delete actions in frontend/tests/CategoryList.test.tsx

#### GREEN Phase
- [ ] IMPL-005 [US1] Create useCategories hook in frontend/src/hooks/useCategories.ts
- [ ] IMPL-006 [US1] Create CategoriesPage component in frontend/src/pages/CategoriesPage.tsx
- [ ] IMPL-007 [US1] Create CategoryList component in frontend/src/components/CategoryList.tsx

## Phase 3: User Story 2 - Add Category (P1)

> [US2] Given a user on the Categories tab, When they add a new category with a valid name, Then the category appears in their list and is available for expenses.

### TDD Cycle 1: Create Category API
**Coverage**:
- Requirements: FR-002, FR-003, FR-006
- Contracts: POST /categories from openapi.yaml
- Constants: MAX_CATEGORIES_PER_USER=50, CATEGORY_NAME_MAX_LENGTH=50

#### RED Phase
- [ ] TEST-007 [US2] Test POST /categories creates category with valid name in backend/tests/category.test.ts
- [ ] TEST-008 [US2] Test POST /categories rejects empty name in backend/tests/category.test.ts
- [ ] TEST-009 [US2] Test POST /categories rejects whitespace-only name in backend/tests/category.test.ts
- [ ] TEST-010 [US2] Test POST /categories rejects duplicate name (case-insensitive) in backend/tests/category.test.ts
- [ ] TEST-011 [US2] Test POST /categories rejects when at MAX_CATEGORIES_PER_USER limit in backend/tests/category.test.ts

#### GREEN Phase
- [ ] IMPL-008 [US2] Add create method to CategoryController in backend/src/api/category.controller.ts
- [ ] IMPL-009 [US2] Implement name validation (trim, non-empty, max length) in backend/src/services/category.service.ts
- [ ] IMPL-010 [US2] Implement uniqueness and limit checks in backend/src/services/category.service.ts

### TDD Cycle 2: Add Category UI
**Coverage**:
- Requirements: UX-002, UX-005

#### RED Phase
- [ ] TEST-012 [US2] Test add category button is visible and accessible in frontend/tests/CategoriesPage.test.tsx
- [ ] TEST-013 [US2] Test add category form validates name in frontend/tests/CategoryForm.test.tsx
- [ ] TEST-014 [US2] Test new category appears in list after add in frontend/tests/CategoriesPage.test.tsx

#### GREEN Phase
- [ ] IMPL-011 [US2] Create CategoryForm component in frontend/src/components/CategoryForm.tsx
- [ ] IMPL-012 [US2] Add create mutation to useCategories hook in frontend/src/hooks/useCategories.ts

## Phase 4: User Story 3 - Rename Category (P2)

> [US3] Given a user viewing categories, When they rename a category, Then the new name is reflected in expense list and filters.

### TDD Cycle 1: Update Category API
**Coverage**:
- Requirements: FR-003, FR-004
- Contracts: PATCH /categories/:id from openapi.yaml

#### RED Phase
- [ ] TEST-015 [US3] Test PATCH /categories/:id updates category name in backend/tests/category.test.ts
- [ ] TEST-016 [US3] Test PATCH /categories/:id rejects duplicate name in backend/tests/category.test.ts
- [ ] TEST-017 [US3] Test PATCH /categories/:id returns 404 for non-existent category in backend/tests/category.test.ts

#### GREEN Phase
- [ ] IMPL-013 [US3] Add update method to CategoryController in backend/src/api/category.controller.ts
- [ ] IMPL-014 [US3] Implement update with uniqueness check in backend/src/services/category.service.ts

### TDD Cycle 2: Rename UI
**Coverage**:
- Requirements: UX-003

#### RED Phase
- [ ] TEST-018 [US3] Test edit action opens form with current name in frontend/tests/CategoryList.test.tsx
- [ ] TEST-019 [US3] Test rename updates list immediately in frontend/tests/CategoryList.test.tsx

#### GREEN Phase
- [ ] IMPL-015 [US3] Add edit mode to CategoryList in frontend/src/components/CategoryList.tsx
- [ ] IMPL-016 [US3] Add update mutation to useCategories in frontend/src/hooks/useCategories.ts

## Phase 5: User Story 4 - Delete Empty Category (P2)

> [US4] Given a user viewing a category with no expenses, When they delete it, Then the category is removed from their list.

### TDD Cycle 1: Delete Category API
**Coverage**:
- Requirements: FR-005
- Contracts: DELETE /categories/:id from openapi.yaml

#### RED Phase
- [ ] TEST-020 [US4] Test DELETE /categories/:id removes category in backend/tests/category.test.ts
- [ ] TEST-021 [US4] Test DELETE /categories/:id returns 404 for non-existent category in backend/tests/category.test.ts
- [ ] TEST-022 [US4] Test DELETE /categories/:id returns affected_expenses count in backend/tests/category.test.ts

#### GREEN Phase
- [ ] IMPL-017 [US4] Add delete method to CategoryController in backend/src/api/category.controller.ts
- [ ] IMPL-018 [US4] Implement delete with expense count in backend/src/services/category.service.ts

### TDD Cycle 2: Delete UI
**Coverage**:
- Requirements: UX-003

#### RED Phase
- [ ] TEST-023 [US4] Test delete action shows confirmation dialog in frontend/tests/CategoryList.test.tsx
- [ ] TEST-024 [US4] Test confirmed delete removes from list in frontend/tests/CategoryList.test.tsx

#### GREEN Phase
- [ ] IMPL-019 [US4] Create ConfirmDialog component in frontend/src/components/ConfirmDialog.tsx
- [ ] IMPL-020 [US4] Add delete mutation to useCategories in frontend/src/hooks/useCategories.ts

## Phase 6: User Story 5 - Delete Category with Expenses (P3)

> [US5] Given a user trying to delete a category with existing expenses, When they confirm deletion, Then expenses retain the category name but category is no longer selectable for new expenses.

### TDD Cycle 1: Graceful Deletion
**Coverage**:
- Requirements: FR-005
- Edge case: Expense data integrity preservation

#### RED Phase
- [ ] TEST-025 [US5] Test delete preserves category_name in associated expenses in backend/tests/category.test.ts
- [ ] TEST-026 [US5] Test deleted category not returned in GET /categories in backend/tests/category.test.ts

#### GREEN Phase
- [ ] IMPL-021 [US5] Update expense category_name before delete in backend/src/services/category.service.ts
- [ ] IMPL-022 [US5] Set category_id to null on associated expenses in backend/src/services/category.service.ts

### TDD Cycle 2: Warning Dialog
**Coverage**:
- Requirements: UX-004

#### RED Phase
- [ ] TEST-027 [US5] Test delete confirmation warns about expense count in frontend/tests/CategoryList.test.tsx
- [ ] TEST-028 [US5] Test dialog shows affected expenses count in frontend/tests/ConfirmDialog.test.tsx

#### GREEN Phase
- [ ] IMPL-023 [US5] Fetch expense count before showing dialog in frontend/src/components/CategoryList.tsx
- [ ] IMPL-024 [US5] Display warning message with count in ConfirmDialog in frontend/src/components/ConfirmDialog.tsx

### TDD Cycle 3: Accessibility
**Coverage**:
- Accessibility: 44px tap targets from ux.md

#### RED Phase
- [ ] TEST-029 [US5] Test all category actions have 44px min height in frontend/tests/CategoryList.test.tsx
- [ ] TEST-030 [US5] Test keyboard navigation works for edit/delete in frontend/tests/CategoryList.test.tsx

#### GREEN Phase
- [ ] IMPL-025 [US5] Ensure 44px minimum height on all interactive elements in frontend/src/components/CategoryList.tsx
- [ ] IMPL-026 [US5] Add keyboard handlers for category actions in frontend/src/components/CategoryList.tsx

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: User Story 1 - Default Categories (P1)
3. **Phase 3**: User Story 2 - Add Category (P1)
4. **Phase 4**: User Story 3 - Rename Category (P2)
5. **Phase 5**: User Story 4 - Delete Empty Category (P2)
6. **Phase 6**: User Story 5 - Delete Category with Expenses (P3)

Within each story: RED → GREEN cycles

## Notes

- Depends on user-registration feature (User entity, registration transaction for default categories)
- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- All constants from data-model.md referenced in tasks
- Graceful deletion ensures expense data integrity (category_name preserved)
