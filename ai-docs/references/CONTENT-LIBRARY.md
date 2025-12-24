# 🍜 Content Library — Bantadthong Vibes

> All text content, UI structure, and selection logic.
> Place in: `ai-docs/references/CONTENT-LIBRARY.md`

---

## Data Structure

### JSON Schema
```
bantadthong_places.json
├── [Group Name]: {
│   ├── group_description: string
│   ├── Morning: { [VenueName]: Venue, ... }
│   ├── Lunch: { [VenueName]: Venue, ... }
│   ├── Afternoon: { [VenueName]: Venue, ... }
│   └── Evening: { [VenueName]: Venue, ... }
│   }
└── ...4 groups total
```

### Groups (fixed display order)
1. **Pan-Asian Flavors** — Chinese, Japanese, Korean cuisine
2. **Urban Hideaways** — Cafes, bars, speakeasies
3. **Sweet Bangkok** — Bakeries, desserts, ice cream
4. **Local Thai Experience** — Authentic Thai food

### Venue Object
```typescript
interface Venue {
  primaryType: string;    // "Chinese Restaurant", "Cafe"
  story: string;          // Venue description
  rating: number;         // Google rating (3.8-5.0)
  googleMapsUri: string;  // Direct Google Maps link
}
```

### Accessing Data
```typescript
// Group description
data["Pan-Asian Flavors"].group_description

// All morning venues in a group
data["Pan-Asian Flavors"].Morning  // { "TEA PEARL": {...}, "Nai Wen": {...} }

// Specific venue
data["Pan-Asian Flavors"].Morning["TEA PEARL"].story
```

---

## Constants

```typescript
// Fixed display order — DO NOT use Object.keys()
const GROUP_NAMES = [
  'Pan-Asian Flavors',
  'Urban Hideaways',
  'Sweet Bangkok',
  'Local Thai Experience'
] as const;

const SLOTS = ['Morning', 'Lunch', 'Afternoon', 'Evening'] as const;

const SLOT_LABELS = {
  Morning: '🌅 Morning',
  Lunch: '🌞 Lunch',
  Afternoon: '🍰 Afternoon',
  Evening: '🌙 Evening'
} as const;

type GroupName = typeof GROUP_NAMES[number];
type Slot = typeof SLOTS[number];
```

---

## Onboarding Slides

### Slide 1: Hook
```
🍜 BANTADTHONG VIBES

Make Bantadthong Great Again

Where locals eat. Where tourists should.
```

### Slide 2: Problem
```
THE PROBLEM

Tourists killed this neighborhood.

3 viral spots with 2-hour queues.
100 hidden gems sitting empty.
The soul of Bantadthong is fading.
```

### Slide 3: Solution
```
AI-CURATED DAILY ROUTES

Every day, a fresh journey.
4 stops. Real stories. Local soul.

We don't guess. We discover.
```

### Slide 4: CTA
```
TODAY'S ROUTE IS READY

🌅 → 🌞 → 🍰 → 🌙

Four places waiting for you.

[ Taste Today's Story → ]
```

---

## Route Summary Section

### Group Selector (Swipeable Carousel)
User swipes to select group. Use GROUP_NAMES constant for order.

**Display:** Group names as swipeable cards or tabs.

**Active group indicator:** Dots or highlight on selected group.

### Section Label
```
Vibe of the day:
```

### Group Header
```
{GROUP_NAMES[selectedGroupIndex]}
```

### Group Description
```
{data[selectedGroup].group_description}
```

Example outputs:
- Pan-Asian Flavors: "Hop between China, Japan and Korea without leaving the neighborhood. Dim sum for lunch, izakaya vibes by night."
- Urban Hideaways: "Escape the chaos into cozy corners and secret spots. Specialty coffee, cat cafes, speakeasy bars — for those who seek vibe over hype."

### Daily Route Preview
Shows 4 venues selected for today from current group:
```
🌅 Morning: {route[selectedGroup].Morning.name}
🌞 Lunch: {route[selectedGroup].Lunch.name}
🍰 Afternoon: {route[selectedGroup].Afternoon.name}
🌙 Evening: {route[selectedGroup].Evening.name}
```

### CTA Button
```
Meet the Places →
```

---

## State Management

### App State
```typescript
interface AppState {
  currentView: 'onboarding' | 'route';
  selectedGroupIndex: number;  // 0-3
  dailyRoutes: DailyRoutes;    // Generated once on load
}
```

### Group Selection
```typescript
// Use constant, NOT Object.keys()
const selectedGroup: GroupName = GROUP_NAMES[selectedGroupIndex];
const currentRoute = dailyRoutes[selectedGroup];
const currentDescription = data[selectedGroup].group_description;
```

### Carousel Sync
When user swipes group selector:
1. Update `selectedGroupIndex`
2. Route preview updates automatically (same `dailyRoutes`, different group key)
3. Place cards carousel resets to first card of new group

---

## Place Card Structure

### Card Layout
Cards displayed in swipeable carousel, 4 cards per group (one per slot).

### Card Data Mapping
Data source: `route[selectedGroup][slot]`

| UI Element | Data Path | Example |
|------------|-----------|---------|
| Slot label | `SLOT_LABELS[slot]` | "🌅 Morning" |
| Venue name | `.name` | "TEA PEARL" |
| Type | `.primaryType` | "Bakery" |
| Story | `.story` | "XXL boba teas and legendary banana roti..." |
| Rating | `.rating` | 4.6 |
| Maps link | `.googleMapsUri` | Full Google Maps URL |

### Card Template
```
┌─────────────────────────────┐
│ 🌅 Morning                  │
│                             │
│ TEA PEARL                   │
│ Bakery                      │
│                             │
│ "XXL boba teas and          │
│ legendary banana roti..."   │
│                             │
│ Rating: 4.6                 │
│                             │
│ [ 📍 Open in Google Maps ]  │
└─────────────────────────────┘
```

### Rating Display
```
Rating: {rating}
```

### Maps Button
```
📍 Open in Google Maps
```
Action: `window.open(venue.googleMapsUri, '_blank')`

---

## Selection Algorithm

### Daily Route Generation
Generates 16 venues total: 4 groups × 4 slots.
Each day produces unique combination based on date seed.

```typescript
import seedrandom from 'seedrandom';

interface VenueWithName extends Venue {
  name: string;
}

type DailyRoutes = Record<GroupName, Record<Slot, VenueWithName>>;

function generateDailyRoutes(data: Data, dateSeed: string): DailyRoutes {
  const rng = seedrandom(dateSeed);
  const routes = {} as DailyRoutes;
  
  for (const groupName of GROUP_NAMES) {
    const group = data[groupName];
    routes[groupName] = {} as Record<Slot, VenueWithName>;
    
    for (const slot of SLOTS) {
      const venuesObj = group[slot];
      const venueNames = Object.keys(venuesObj);
      const randomIndex = Math.floor(rng() * venueNames.length);
      const selectedName = venueNames[randomIndex];
      
      routes[groupName][slot] = {
        name: selectedName,
        ...venuesObj[selectedName]
      };
    }
  }
  
  return routes;
}
```

### Date Seed Format
```typescript
const dateSeed = new Date().toISOString().split('T')[0]; // "2024-12-20"
```

### Usage
```typescript
// On app load (once per day)
const routes = generateDailyRoutes(data, dateSeed);

// Access selected group's route
const currentRoute = routes[GROUP_NAMES[selectedGroupIndex]];
const morningVenue = currentRoute.Morning; // { name, primaryType, story, rating, googleMapsUri }
```

### Variability Statistics
| Group | Morning | Lunch | Afternoon | Evening | Combinations |
|-------|---------|-------|-----------|---------|--------------|
| Pan-Asian Flavors | 3 | 5 | 3 | 5 | 225 |
| Urban Hideaways | 5 | 3 | 5 | 5 | 375 |
| Sweet Bangkok | 5 | 5 | 5 | 4 | 500 |
| Local Thai Experience | 5 | 5 | 5 | 4 | 500 |

**Total unique daily combinations:** 1,600+
**Probability of exact repeat:** < 0.1%

---

## Date Formatting

```typescript
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}
// Output: "December 20, 2024"
```

---

## Footer Text

```
Data © Google Places • Stories by AI • Made for Bantadthong
```

---

## Error States

### Note: Primary content should NEVER show errors
Route data is generated from static JSON at load time. If app loads, content is always available.

### Maps Button Error (only possible error)
If Google Maps fails to open (rare), browser handles externally — no error UI needed.