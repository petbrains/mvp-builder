# Research Notes - Route Summary

## Key Decisions
- **Data Source**: Import DailyRoutes from daily-route-generator at build time
- **Group Description Handling**: Graceful omission if missing (FR-003) - render without error
- **Name Truncation**: CSS text-overflow: ellipsis for long venue names (UX-003 edge case)
- **Instant Updates**: React props change triggers immediate re-render - no debounce needed

## Critical Risks
- **Missing Description**: Some groups may lack description → Graceful degradation, show name only
- **Long Venue Names**: Names may overflow container → CSS truncation with ellipsis

## Stack Compatibility
- React props drilling from group-selector: verified pattern
- SLOT_LABELS from daily-route-generator constants: shared import
