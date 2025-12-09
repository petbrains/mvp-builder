# Research Notes - Expense Filtering

## Key Decisions
- **Pagination strategy**: Cursor-based pagination - Better performance for large datasets than offset
- **Virtualization**: React-window for list rendering - Handles 1000+ items smoothly
- **Filter state**: URL params + React Query keys - Enables shareable filtered views

## Critical Risks
- **Large dataset scrolling**: 100k expenses could cause memory issues → Virtualization required
- **Filter debounce**: Rapid filter changes cause excessive API calls → 300ms debounce

## Stack Compatibility
- React-window: ✔ (virtualized list rendering)
- React Query with query keys: ✔ (filter-aware caching)
- URL search params: ✔ (React Router useSearchParams)
