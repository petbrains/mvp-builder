# Feature Specification: Monthly Summary

**Feature Branch**: `feature/monthly-summary`
**Input**: Generated from PRD - Supporting Features > Monthly Summary

## User Scenarios & Testing

### Primary User Story
A user wants to understand their monthly spending patterns. They need a clear view of total expenses for the month and how spending is distributed across categories, helping them make informed decisions about their finances.

### Acceptance Scenarios
1. [P1] **Given** a user on the Summary tab, **When** the view loads, **Then** they see total spent for the current month prominently displayed.
2. [P1] **Given** a user viewing the summary, **When** they have expenses in multiple categories, **Then** a per-category breakdown shows amount and percentage for each.
3. [P2] **Given** a user on the summary, **When** they select a different month, **Then** totals and breakdown update for the selected month.
4. [P2] **Given** expense data exists, **When** summary loads, **Then** a visual representation (chart or bars) shows spending distribution.
5. [P3] **Given** a user with no expenses for selected month, **When** summary loads, **Then** an empty state encourages adding expenses.

### Edge Cases
- When category is deleted mid-month, summary MUST still show historical spending under that category [FR-004]
- When user has expenses in only one category, visual representation MUST still render meaningfully [FR-003]
- When switching months rapidly, system MUST debounce requests to prevent flickering [FR-005]

## Requirements

### Functional Requirements
- **FR-001**: System MUST calculate total spending for selected month
- **FR-002**: System MUST calculate per-category spending totals and percentages
- **FR-003**: System MUST provide visual representation of spending distribution (verified by chart/bar rendering)
- **FR-004**: System MUST include expenses from deleted categories in historical summaries
- **FR-005**: System MUST handle rapid month switching gracefully (debounce/loading states)
- **FR-006**: System MUST display current month by default

### UX Requirements
- **UX-001**: Month total MUST be prominently displayed at top of summary
- **UX-002**: Category breakdown MUST show both amount and percentage
- **UX-003**: Visual representation MUST be simple and readable (no complex charts)
- **UX-004**: Month selector MUST be easily accessible
- **UX-005**: Summary view MUST load within 1s on decent connection

### Key Entities
- **Expense**: Source data for calculations, aggregated by month and category
- **Category**: Labels for breakdown display, including historical category names
- **MonthlySummary**: Calculated view (not stored) with total, category breakdowns, percentages
