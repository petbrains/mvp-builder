# Feature Specification: Expense CRUD

**Feature Branch**: `feature/expense-crud`
**Input**: Generated from PRD - Core MVP Feature: Expense Logging

## User Scenarios & Testing

### Primary User Story
A user wants to quickly log their daily expenses with minimal friction. They need to add expenses in under 10 seconds, view their recent entries, edit mistakes, and delete entries they no longer need. The experience must be fast and responsive.

### Acceptance Scenarios
1. [P1] **Given** an authenticated user on the dashboard, **When** they tap "Add Expense", enter amount/category/date and submit, **Then** the expense is saved and appears in the list within 200ms (optimistic UI).
2. [P1] **Given** a user adding an expense, **When** amount is empty or zero, **Then** inline validation prevents submission and shows error.
3. [P1] **Given** a user viewing expenses, **When** the dashboard loads, **Then** today's expenses are displayed with current month total.
4. [P2] **Given** a user viewing an expense, **When** they tap edit, modify fields, and save, **Then** the expense is updated and list reflects changes immediately.
5. [P2] **Given** a user viewing an expense, **When** they tap delete and confirm, **Then** the expense is removed and totals recalculate.
6. [P2] **Given** a user on the expense form, **When** no date is selected, **Then** today's date is pre-filled as default.
7. [P3] **Given** a server error during save, **When** the user submits, **Then** a toast shows error and form data is preserved for retry.

### Edge Cases
- When amount has more than 2 decimal places, system MUST round to 2 decimals [FR-002]
- When user's category is deleted, existing expenses MUST retain category name [FR-005]
- When expense date is in the future, system MUST accept it (planning use case) [FR-003]
- When network fails mid-save, system MUST preserve form state and show retry option [FR-009]

## Requirements

### Functional Requirements
- **FR-001**: System MUST allow creating expenses with amount, category, date, and optional note
- **FR-002**: System MUST validate amount > 0 with maximum 2 decimal places
- **FR-003**: System MUST validate date is a valid date (past or future allowed)
- **FR-004**: System MUST validate category exists in user's category list
- **FR-005**: System MUST store expense with user_id for data isolation
- **FR-006**: System MUST return created/updated expense data on success
- **FR-007**: System MUST allow updating any expense field
- **FR-008**: System MUST allow deleting expenses with confirmation
- **FR-009**: System MUST handle errors gracefully with toast notifications
- **FR-010**: System MUST achieve API response time < 200ms (p95) for create/update operations

### UX Requirements
- **UX-001**: Add Expense button MUST be sticky at bottom on mobile
- **UX-002**: Expense form MUST autofocus on amount field
- **UX-003**: Date field MUST default to today
- **UX-004**: Form MUST use one-screen modal or slide-up panel
- **UX-005**: All form fields MUST have minimum 44px tap target
- **UX-006**: Submit button MUST always be visible without scrolling
- **UX-007**: Expense list MUST show instant feedback on mutations (optimistic UI)
- **UX-008**: Inline validation MUST appear adjacent to invalid fields

### Key Entities
- **Expense**: User spending record with amount (decimal), category_id (reference), date, optional note, user_id (owner), timestamps
- **Category**: Classification for expenses, referenced by expense records

### Technical Context
- **Performance**: API p95 < 200ms, optimistic UI updates via React Query
- **Constraints**: Per user limit of 100,000 expenses
