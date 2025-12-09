# Research Notes - Category Management

## Key Decisions
- **Default categories**: Provisioned during registration transaction - Ensures new users start with usable categories
- **Soft delete handling**: Store category_name snapshot in expense - Preserves historical data when category deleted
- **Uniqueness scope**: Per-user unique names - Different users can have same category names

## Critical Risks
- **Orphaned expenses**: Category deletion could break expense references → Store category_name as string backup in expense
- **Race condition**: Concurrent add near limit → Use database constraint for count limit

## Stack Compatibility
- Prisma unique constraint (compound): ✔ (user_id + name)
- Prisma count queries: ✔ (for limit enforcement)
