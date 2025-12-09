# Data Model - Expense Filtering

## Entities

### Expense
Reference: expense-crud/data-model.md [Dependency]

### Category
Reference: category-management/data-model.md [Dependency]

## Enums

### FilterState
| Value | Description |
|-------|-------------|
| default | Current month, all categories |
| filtering | Filter change in progress |
| filtered | Subset displayed |
| empty | No matching expenses |
| loading_more | Fetching next page |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| PAGE_SIZE | 50 | Items per page (=) | ux.md |
| LOAD_MORE_THRESHOLD | 10 | Items from bottom to trigger load (<=) | ux.md |
| FILTER_DEBOUNCE | 300 | Debounce delay in ms | ux.md |
| MAX_EXPENSES_PER_USER | 100000 | Maximum filterable expenses (<=) | PRD constraint |

## Validation Rules

### Month Filter
- Format: YYYY-MM
- Must be valid month (01-12)
- No future month restriction

### Category Filter
- Must be valid category_id from user's categories
- "All" represented as null/undefined
