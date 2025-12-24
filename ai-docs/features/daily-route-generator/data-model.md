# Data Model - Daily Route Generator

## Entities

### SourceData
Structure of bantadthong_places.json input file.
- `[groupName: string]`: GroupData - keyed by group name

### GroupData
Single food group containing description and time slots.
- `group_description`: string, required - describes the group vibe
- `Morning`: SlotPool, required
- `Lunch`: SlotPool, required
- `Afternoon`: SlotPool, required
- `Evening`: SlotPool, required

### SlotPool
Collection of venues available for a time slot.
- `[venueName: string]`: VenueData - keyed by venue name

### VenueData
Individual venue from source JSON.
- `primaryType`: string, required - venue category (e.g., "Chinese Restaurant")
- `story`: string, required - 2-3 sentence cultural narrative
- `rating`: number, required - Google Places rating (1.0-5.0)
- `googleMapsUri`: string, required - pre-built navigation URL

### DailyRoutes
Generated output containing selected venues for all groups.
- `[groupName: string]`: GroupRoute - keyed by group name

### GroupRoute
Selected venues for one group's daily route.
- `groupDescription`: string - copied from source GroupData
- `Morning`: Venue
- `Lunch`: Venue
- `Afternoon`: Venue
- `Evening`: Venue

### Venue
Runtime venue object with name extracted from source key.
- `name`: string - venue name (from source object key)
- `primaryType`: string
- `story`: string
- `rating`: number
- `googleMapsUri`: string

## Enums

### GroupName
```
'Pan-Asian Flavors' | 'Urban Hideaways' | 'Sweet Bangkok' | 'Local Thai Experience'
```

### Slot
```
'Morning' | 'Lunch' | 'Afternoon' | 'Evening'
```

## Constants

| Name | Value | Description | Source |
|------|-------|-------------|--------|
| GROUP_NAMES | ['Pan-Asian Flavors', 'Urban Hideaways', 'Sweet Bangkok', 'Local Thai Experience'] | Fixed order of food groups | PRD.Constants |
| SLOTS | ['Morning', 'Lunch', 'Afternoon', 'Evening'] | Time slot order | PRD.Constants |
| SLOT_LABELS | { Morning: '🌅 Morning', Lunch: '🌞 Lunch', Afternoon: '🍰 Afternoon', Evening: '🌙 Evening' } | Display labels with emojis | PRD.Constants |
| MIN_VENUES_PER_SLOT | 3 | Minimum venues required per slot (>=) | PRD.Venue Pools |
| MAX_VENUES_PER_SLOT | 5 | Maximum venues allowed per slot (<=) | PRD.Venue Pools |
| TOTAL_VENUES | 72 | Expected total venues in database | PRD.Technical Constraints |
| TOTAL_DAILY_VENUES | 16 | Output venues count (4 groups × 4 slots) | FR-006 |
| DATE_SEED_FORMAT | 'YYYY-MM-DD' | Format for deterministic seed | FR-004 |

## Validation Rules

### Source Data Validation
- Each group in GROUP_NAMES must exist in source data
- Each slot in SLOTS must exist within each group
- Slot venue count: >= MIN_VENUES_PER_SLOT and <= MAX_VENUES_PER_SLOT

### Venue Field Validation
- `primaryType`: non-empty string
- `story`: non-empty string
- `rating`: number, 1.0-5.0 range
- `googleMapsUri`: non-empty string starting with "https://"

### Build Failure Triggers
- Missing or malformed JSON file (FR-001)
- Slot with < 3 venues (FR-002)
- Venue missing required fields (FR-003)
