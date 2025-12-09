# Data Model - User Authentication

## Entities

### User
Reference: user-registration/data-model.md [Dependency]

### Session
| Field | Type | Constraints |
|-------|------|-------------|
| id | string (UUID) | Primary key |
| user_id | string (UUID) | Foreign key → User.id, required |
| expires_at | timestamp | Required |
| device_id | string | Optional |
| created_at | timestamp | Auto-set |
| invalidated_at | timestamp | Optional, set on logout |

## Enums

### AuthState
| Value | Description |
|-------|-------------|
| unauthenticated | No valid session |
| authenticating | Login request in progress |
| authenticated | Valid session active |
| session_expired | Session invalidated or expired |
| rate_limited | Too many login attempts |

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| AUTH_RATE_LIMIT | 10 | Requests per minute per IP (<=) | FR-006 |
| RATE_LIMIT_WINDOW | 60000 | Rate limit window in ms | PRD constraint |
| SESSION_TTL | 604800000 | Session duration in ms (7 days) | FR-008 |
| MAX_SESSIONS_PER_USER | 10 | Maximum concurrent sessions (<=) | Security limit |

## Validation Rules

### Login Credentials
- Email: Required, valid format
- Password: Required, no length validation on login (only registration)
- Both checked together - never reveal which failed
