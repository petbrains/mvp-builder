# Data Model - User Registration

## Entities

### User
| Field | Type | Constraints |
|-------|------|-------------|
| id | string (UUID) | Primary key, auto-generated |
| email | string | Unique, required, max 255 chars |
| password_hash | string | Required, argon2 hash |
| created_at | timestamp | Auto-set on creation |
| updated_at | timestamp | Auto-updated |

### Session
| Field | Type | Constraints |
|-------|------|-------------|
| id | string (UUID) | Primary key |
| user_id | string (UUID) | Foreign key → User.id, required |
| expires_at | timestamp | Required |
| device_id | string | Optional, for multi-device tracking |
| created_at | timestamp | Auto-set |

## Enums

### RegistrationState
| Value | Description |
|-------|-------------|
| idle | Form ready for input |
| validating | Client-side validation in progress |
| submitting | Server request pending |
| error | Validation or server error |
| success | Registration complete |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| PASSWORD_MIN_LENGTH | 8 | Minimum password characters (>=) | FR-002 |
| EMAIL_MAX_LENGTH | 255 | Maximum email length (<=) | Industry standard |
| AUTH_RATE_LIMIT | 10 | Requests per minute per IP (<=) | PRD constraint |
| FORM_FIELD_MIN_HEIGHT | 44 | Minimum tap target in pixels (>=) | UX-002 |
| TOAST_AUTO_DISMISS | 5000 | Toast duration in ms | ux.md |
| SESSION_TTL | 604800000 | Session duration in ms (7 days) | PRD configurable |

## Validation Rules

### Email
- Format: Valid email pattern (RFC 5322 simplified)
- Trim whitespace before validation (FR-001)
- Case-insensitive uniqueness check

### Password
- Minimum length: 8 characters (FR-002)
- Boundary: Exactly 8 characters MUST be accepted
- No maximum length (allow passphrase)
