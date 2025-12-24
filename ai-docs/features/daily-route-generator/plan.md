# Implementation Plan: Daily Route Generator

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
Build-time route generation module using seedrandom for deterministic date-based venue selection. Validates source JSON, selects one venue per slot per group, and exports static routes object for UI components.

## Technical Context

**Language:** TypeScript

**Framework:** Next.js 14 (App Router)

**Storage:** Static JSON file (bantadthong_places.json)

**API Layer:** None - internal module only

**Testing:** Vitest unit tests

**Deployment:** Vercel static build

**Constraints:** Build must fail fast on invalid data; zero runtime API calls

## Implementation Mapping

### Component Architecture
- **Route Generator Module** (`src/lib/route-generator/`): Core generation logic
  - `types.ts`: TypeScript interfaces for SourceData, DailyRoutes, Venue
  - `validator.ts`: JSON schema validation with descriptive errors
  - `generator.ts`: seedrandom-based selection algorithm
  - `index.ts`: Entry point exporting generateDailyRoutes function
- **Data Layer**: Static JSON import at build time
- **Constants Module**: GROUP_NAMES, SLOTS, SLOT_LABELS from data-model.md

### Error Handling Approach
- Build-time validation throws descriptive errors halting build
- Missing JSON: "Error: bantadthong_places.json not found"
- Invalid venue count: "Error: [GroupName].[Slot] has X venues, requires 3-5"
- Missing fields: "Error: [VenueName] missing required fields: [field1, field2]"

## Feature Code Organization

```
src/
├── lib/
│   └── route-generator/
│       ├── types.ts          # SourceData, VenueData, DailyRoutes, Venue
│       ├── constants.ts      # GROUP_NAMES, SLOTS, SLOT_LABELS
│       ├── validator.ts      # validateSourceData()
│       ├── generator.ts      # generateDailyRoutes(date: string)
│       └── index.ts          # Re-exports
├── data/
│   └── bantadthong_places.json

tests/
└── unit/
    └── route-generator/
        ├── validator.test.ts
        └── generator.test.ts
```

**Selected Structure:** A (Standalone Module) - Self-contained utility with no UI components; only exports data for other features to consume

## Testing Approach
- **Unit Tests**:
  - `validator.test.ts`: Valid data passes; missing groups/slots/fields fail with correct errors
  - `generator.test.ts`: Same date produces identical output; different dates produce different output; all 16 venues selected; venue comes from correct slot pool
- **Coverage Strategy**: 100% of validation rules and generator edge cases

## Implementation Notes
- seedrandom initialized with YYYY-MM-DD string for date-based determinism
- Selection algorithm: shuffle venue pool, pick first item
- Build-time execution via static import ensures routes are embedded in bundle
- All dependent features (group-selector, route-summary, venue-cards) import from this module
