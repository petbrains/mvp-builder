# Data Model - Expense CRUD

## Entities

### Expense
| Field | Type | Constraints |
|-------|------|-------------|
| id | string (UUID) | Primary key |
| user_id | string (UUID) | Foreign key → User.id, required |
| amount | decimal(10,2) | Required, > 0 |
| category_id | string (UUID) | Foreign key → Category.id, nullable (if category deleted) |
| category_name | string | Required, snapshot of category name at creation |
| date | date | Required |
| note | string | Optional, max 500 chars |
| created_at | timestamp | Auto-set |
| updated_at | timestamp | Auto-updated |

### User
Reference: user-registration/data-model.md [Dependency]

### Category
Reference: category-management/data-model.md [Dependency]

## Enums

### ExpenseState
| Value | Description |
|-------|-------------|
| viewing | Expense list displayed |
| creating | Add modal open |
| editing | Edit modal open |
| saving | Optimistic update applied |
| confirming_delete | Delete confirmation visible |
| error | Operation failed |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| MAX_EXPENSES_PER_USER | 100000 | Maximum expenses allowed (<=) | PRD constraint |
| AMOUNT_MAX_DECIMALS | 2 | Decimal places for amount (<=) | FR-002 |
| NOTE_MAX_LENGTH | 500 | Maximum note length (<=) | Validation rule |
| API_P95_TARGET | 200 | Target response time in ms (<) | FR-010 |
| OPTIMISTIC_TIMEOUT | 200 | Optimistic UI rollback threshold in ms | ux.md |
| TARGET_LOGGING_TIME | 10000 | Goal time to log expense in ms (<) | PRD goal |

## Validation Rules

### Amount
- Required, must be > 0
- Maximum 2 decimal places (round if more)
- No maximum value (reasonable limit ~999999999.99 from decimal(10,2))

### Date
- Required, valid date format
- Past and future dates allowed (FR-003)
- Default: today (client timezone)

### Category
- Required for new expenses
- Must exist in user's category list (FR-004)

### Note
- Optional
- Maximum 500 characters
