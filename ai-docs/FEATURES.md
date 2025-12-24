# Feature Index

Total Features: 6

## Features List

### Core Data (1 feature)

- **Daily Route Generator**
  - Folder: `daily-route-generator`

### User Journey (5 features)

- **Onboarding Carousel**
  - Folder: `onboarding-carousel`

- **Group Selector**
  - Folder: `group-selector`

- **Route Summary**
  - Folder: `route-summary`

- **Venue Cards**
  - Folder: `venue-cards`

- **Page Layout**
  - Folder: `page-layout`

## Implementation Sequence

**Recommended Order:** Foundation first, then user journey top-to-bottom

### Phase 1: Foundation (Data & Structure)
1. **Daily Route Generator** - No dependencies, provides route data for all UI features
2. **Page Layout** - Base structure, sections, auto-scroll behavior

### Phase 2: User Journey (Entry → Exploration)
3. **Onboarding Carousel** - Depends on: `page-layout`
4. **Group Selector** - Depends on: `daily-route-generator`
5. **Route Summary** - Depends on: `daily-route-generator`, `group-selector`
6. **Venue Cards** - Depends on: `daily-route-generator`, `group-selector`, `route-summary`

## Dependency Graph

```
daily-route-generator ──┬──> group-selector ──> route-summary ──> venue-cards
                        │
page-layout ────────────┴──> onboarding-carousel
```

## PRD Coverage

| PRD Element | Feature | Status |
|-------------|---------|--------|
| Core MVP Feature | daily-route-generator | Mapped |
| CAP-06 Onboarding | onboarding-carousel | Mapped |
| CAP-07 Group Selector | group-selector | Mapped |
| CAP-08 Route Summary | route-summary | Mapped |
| CAP-09 Venue Cards | venue-cards | Mapped |
| CAP-10 Google Maps | venue-cards | Mapped |
| CAP-11 Auto-Scroll | page-layout | Mapped |
| CAP-12 Footer | page-layout | Mapped |
| Data Structures | daily-route-generator | Mapped |
| Technical Constraints | Distributed | Mapped |
| UX Details | Distributed | Mapped |
