# Feature Specification: Category Management

**Feature Branch**: `feature/category-management`
**Input**: Generated from PRD - Supporting Features > Category Management

## User Scenarios & Testing

### Primary User Story
A user wants to organize their expenses into meaningful categories. They start with default categories but need the flexibility to add custom categories for their specific needs and remove ones they don't use.

### Acceptance Scenarios
1. [P1] **Given** a new user after registration, **When** they access category management, **Then** default categories are already provisioned.
2. [P1] **Given** a user on the Categories tab, **When** they add a new category with a valid name, **Then** the category appears in their list and is available for expenses.
3. [P2] **Given** a user viewing categories, **When** they rename a category, **Then** the new name is reflected in expense list and filters.
4. [P2] **Given** a user viewing a category with no expenses, **When** they delete it, **Then** the category is removed from their list.
5. [P3] **Given** a user trying to delete a category with existing expenses, **When** they confirm deletion, **Then** expenses retain the category name but category is no longer selectable for new expenses.

### Edge Cases
- When category name contains only whitespace, system MUST reject with validation error [FR-002]
- When user tries to add duplicate category name, system MUST show error [FR-003]
- When user reaches 50 category limit, system MUST prevent adding more [FR-006]
- When deleting category used by expenses, system MUST preserve expense data integrity [FR-005]

## Requirements

### Functional Requirements
- **FR-001**: System MUST provision default categories on user registration (e.g., Food, Transport, Entertainment, Shopping, Bills, Other)
- **FR-002**: System MUST validate category name is non-empty and trimmed
- **FR-003**: System MUST enforce unique category names per user
- **FR-004**: System MUST allow renaming existing categories
- **FR-005**: System MUST handle category deletion gracefully (expenses retain category name as string, category becomes unselectable)
- **FR-006**: System MUST enforce maximum 50 categories per user
- **FR-007**: System MUST store categories with user_id for data isolation

### UX Requirements
- **UX-001**: Categories tab MUST show list of all user categories
- **UX-002**: Add category action MUST be clearly accessible
- **UX-003**: Edit and delete actions MUST be available for each category
- **UX-004**: Delete confirmation MUST warn if category has associated expenses
- **UX-005**: All interactive elements MUST have minimum 44px tap targets

### Key Entities
- **Category**: User-defined expense classification with name (unique per user), user_id (owner), timestamps
- **Expense**: References category_id; retains category_name string if category deleted
