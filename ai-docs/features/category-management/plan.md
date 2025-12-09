# Implementation Plan: Category Management

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Implements category CRUD with per-user isolation, enforces 50 category limit, and handles deletion gracefully by preserving expense data integrity. Default categories provisioned during user registration.

## Technical Context

**Language:** TypeScript

**Framework:** React + Vite (frontend), Express (backend)

**Storage:** PostgreSQL via Prisma (Category table with user_id FK)

**API Layer:** REST JSON over HTTPS

**Testing:** Jest + Supertest (backend), Vitest + RTL (frontend)

**Deployment:** Single-node deployment

**Constraints:** Max 50 categories per user, unique names per user

## Implementation Mapping

### Component Architecture
- **Core Components:**
  - Backend: CategoryController, CategoryService, CategoryRepository
  - Frontend: CategoriesPage, CategoryList, CategoryForm, useCategories hook
- **Data Models:** Category entity // from data-model.md
- **API Operations:** GET/POST /categories, PATCH/DELETE /categories/:id
- **State Management:** React Query cache for category list

### Error Handling Approach
- **Error handlers location:** Express validation middleware, React Query error callbacks
- **Recovery mechanisms:** Form preserved on validation error, optimistic rollback on server error
- **User feedback:** Inline validation for name, toast for server errors, dialog for delete confirmation

## Feature Code Organization

```
backend/
├── src/
│   ├── models/
│   │   └── category.prisma
│   ├── services/
│   │   └── category.service.ts
│   └── api/
│       ├── category.controller.ts
│       └── category.routes.ts
└── tests/
    └── category.test.ts

frontend/
├── src/
│   ├── components/
│   │   ├── CategoryList.tsx
│   │   └── CategoryForm.tsx
│   ├── pages/
│   │   └── CategoriesPage.tsx
│   └── hooks/
│       └── useCategories.ts
└── tests/
    └── CategoryManagement.test.tsx
```

**Selected Structure:** B (Split Architecture) - CRUD operations require both React UI and Express API

## Testing Approach
- **Test Structure:** Backend in `backend/tests/`, frontend in `frontend/tests/`
- **Coverage Strategy:**
  - Backend: Limit enforcement, uniqueness constraint, delete with expenses
  - Frontend: Add/rename/delete flows, limit reached state, delete confirmation dialog

## Implementation Notes
- Default categories created in registration transaction (already implemented in user-registration)
- Category deletion: Update expenses to store category_name string, then delete category (FR-005)
- Limit check: Count query before insert, database constraint as backup
- Delete confirmation warns user if expenses exist (UX-004)
