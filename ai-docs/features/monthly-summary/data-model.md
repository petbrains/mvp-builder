# Data Model - Monthly Summary

## Entities

### Expense
Reference: expense-crud/data-model.md [Dependency]

### MonthlySummary (Computed View)
| Field | Type | Description |
|-------|------|-------------|
| month | string | YYYY-MM format |
| total | decimal | Sum of all expenses in month |
| category_breakdown | CategoryTotal[] | Per-category totals |

### CategoryTotal
| Field | Type | Description |
|-------|------|-------------|
| category_name | string | Category label (from expense snapshot) |
| amount | decimal | Sum of expenses in category |
| percentage | decimal | (amount / total) * 100 |

## Enums

### SummaryState
| Value | Description |
|-------|-------------|
| loading | Fetching summary data |
| displaying | Summary visible with data |
| empty | No expenses for month |
| error | Failed to load |
| switching_month | Month change in progress |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| SUMMARY_STALE_TIME | 300000 | Cache stale time in ms (5 min) | Performance optimization |
| MONTH_SWITCH_DEBOUNCE | 300 | Debounce delay in ms | FR-005 |
| PERCENTAGE_DECIMALS | 1 | Decimal places for percentage (=) | UX-002 |
| SUMMARY_LOAD_TARGET | 1000 | Target load time in ms (<) | UX-005 |

## Validation Rules

### Month Parameter
- Format: YYYY-MM
- Valid month range: 01-12
- No restrictions on past/future months
