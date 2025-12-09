# Data Model - Category Management

## Entities

### Category
| Field | Type | Constraints |
|-------|------|-------------|
| id | string (UUID) | Primary key |
| user_id | string (UUID) | Foreign key → User.id, required |
| name | string | Required, max 50 chars, unique per user |
| created_at | timestamp | Auto-set |
| updated_at | timestamp | Auto-updated |

### User
Reference: user-registration/data-model.md [Dependency]

## Enums

### DefaultCategoryName
| Value | Description |
|-------|-------------|
| Food | Food and dining |
| Transport | Transportation costs |
| Entertainment | Entertainment and leisure |
| Shopping | General shopping |
| Bills | Utilities and bills |
| Other | Uncategorized expenses |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| MAX_CATEGORIES_PER_USER | 50 | Maximum categories allowed (<=) | FR-006 |
| CATEGORY_NAME_MAX_LENGTH | 50 | Maximum name length (<=) | Validation rule |
| DEFAULT_CATEGORIES_COUNT | 6 | Number of default categories | FR-001 |

## Validation Rules

### Category Name
- Required, non-empty after trim
- Maximum 50 characters
- Unique within user's categories (case-insensitive)
- Whitespace-only names rejected (FR-002)
