# Research Notes - Monthly Summary

## Key Decisions
- **Aggregation approach**: Server-side SQL aggregation - More efficient than client-side for large datasets
- **Visualization**: Simple bar chart with Tailwind - No heavy charting library needed for MVP
- **Caching**: React Query with 5-minute stale time - Summary data doesn't need real-time updates

## Critical Risks
- **Deleted category display**: Historical data shows category that no longer exists → Use category_name snapshot from expenses
- **Month switch performance**: Rapid switching causes excessive queries → 300ms debounce

## Stack Compatibility
- Prisma groupBy: ✔ (native aggregation support)
- Tailwind CSS bars: ✔ (percentage-width divs)
- React Query staleTime: ✔ (configurable per query)
