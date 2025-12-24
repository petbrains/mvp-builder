# PRD: Bantadthong Vibes

## Core Proposition

### Target User
- International English-speaking tourists visiting Bangkok for the first time
- Seeking authentic local food experience without hours of research
- Face language barriers that prevent discovering what makes each place special

### Problem
- **Discovery overload**: Tourists default to 3 viral Instagram spots with 2-3 hour queues
- **Invisible local gems**: 100+ authentic vendors sit empty next door, undiscovered
- **No curated guidance**: No existing solution bridges the language and cultural gap
- **Urgency**: Bantadthong Road was Bangkok's hidden food paradise — gentrification is killing it
  - The neighborhood's soul is disappearing as authentic vendors close

### Core Solution Proposition
AI-curated daily food route generator that reveals the cultural soul of Bantadthong's hidden food scene.
- Single-page web app with 4 food "vibes" (curated categories)
- Each vibe offers today's 4-stop journey through the neighborhood
- Pre-written stories reveal the cultural code of each place (not factual claims)
- Routes generated at build time using date-based seed for daily variety
- No runtime API calls — open the page, pick your vibe, see today's route, tap to navigate

## Solution Design

### Core User Flow
Single-page vertical flow with 3 distinct sections:

1. **Onboarding Carousel**
   - 4 horizontal swipeable slides explaining the mission
   - Content progression: Hook → Problem → Solution → CTA
   - Final slide button "Taste Today's Story" auto-scrolls to Section 2

2. **Route Summary**
   - Group selector: horizontal swipeable pills showing 4 food vibes
   - Groups: Pan-Asian Flavors, Urban Hideaways, Sweet Bangkok, Local Thai Experience
   - Display: "Vibe of the day:" label, group name (large), group description
   - Route preview: today's 4 venues with slot emojis (Morning, Lunch, Afternoon, Evening)
   - Button "Meet the Places" auto-scrolls to Section 3
   - Switching group instantly updates route preview and venue cards

3. **Venue Cards Carousel**
   - 4 horizontal swipeable cards, one per time slot for selected group
   - Each card: slot badge, venue name, primary type, rating, story (2-3 sentences), Google Maps button
   - Cards sync with selected group in Section 2

4. **Footer** (manual scroll only)
   - Attribution: "Data © Google Places • Stories by AI • Made for Bantadthong"

### Core MVP Feature: Daily Route Generator

**Data Source:**
- Static `bantadthong_places.json` with 72 venues total
- 4 groups × 4 time slots × 3-5 venues per slot
- Each venue: primaryType, story, rating, googleMapsUri
- Stories pre-written in JSON — no AI generation at runtime or build time

**Route Generation (build-time):**
1. Load bantadthong_places.json
2. Use date-based seed (YYYY-MM-DD) for deterministic selection
3. For each group, for each slot: randomly select 1 venue from pool
4. Output: routes object with 16 venues (4 groups × 4 slots)

**Display (runtime):**
- Load pre-generated routes → render immediately
- User selects group via pills → shows that group's 4 venues
- Zero API calls at runtime

### Supporting Features

| ID | Feature | Purpose |
|----|---------|---------|
| CAP-06 | Onboarding Carousel | 4 slides with mission narrative, swipeable, dot indicators |
| CAP-07 | Group Selector | Horizontal pills, active state highlight, instant switching |
| CAP-08 | Route Summary | Group name, description, 4-venue preview with slot emojis |
| CAP-09 | Venue Cards Carousel | 4 cards per group, swipeable, synced with selector |
| CAP-10 | Google Maps Integration | Pre-built URI per venue, opens in new tab, no API key |
| CAP-11 | Auto-Scroll Navigation | CTA buttons scroll to next section |
| CAP-12 | Footer Attribution | Google Places credit, AI disclaimer |

### Non-Goals (Out of Scope)
- User accounts or saved routes
- Runtime AI generation
- User ratings or reviews
- Real-time venue availability
- Multiple neighborhoods beyond Bantadthong

## Technical Requirements

### Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 14 (App Router) | Static export, TypeScript native, Vercel-optimized |
| Language | TypeScript | Type safety for JSON schema, prevents runtime errors |
| Styling | Tailwind CSS | Dark theme (night market aesthetic), mobile-first |
| Components | shadcn/ui | Carousel, Button, Card — accessible, customizable |
| Deployment | Vercel | Zero-config, global CDN, auto-deploy from GitHub |
| Randomization | seedrandom | Deterministic date-based selection (~2KB) |

### Architecture

**Pre-generated Static Site:**
- All route selection done at build time
- Zero runtime API calls
- Routes object contains 16 venues (4 groups × 4 slots)
- Instant page load — no loading states needed
- Offline-capable after initial load

**Data Layer:**
- Static `bantadthong_places.json` committed to repo
- No external API calls at runtime
- No AI API needed — stories pre-written

**Build-Time Generation:**
- Route selection: deterministic via date-based seed (YYYY-MM-DD)
- Library: seedrandom for cross-platform consistency
- Output: static routes object embedded in page

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    BUILD TIME                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  bantadthong_places.json                                │
│  (4 groups × 4 slots × 3-5 venues)                      │
│       │                                                 │
│       ▼                                                 │
│  Route Selection (seedrandom + date)                    │
│       │                                                 │
│       ▼                                                 │
│  routes object (16 venues)                              │
│  embedded in static page                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    RUNTIME                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  User opens page                                        │
│       │                                                 │
│       ▼                                                 │
│  Render static content (instant)                        │
│       │                                                 │
│       ▼                                                 │
│  User selects group → UI updates (client-side only)     │
│                                                         │
│  Zero API calls                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Data Structures

**Source Data (bantadthong_places.json):**
```typescript
interface SourceData {
  [groupName: string]: {
    group_description: string;
    Morning: { [venueName: string]: VenueData };
    Lunch: { [venueName: string]: VenueData };
    Afternoon: { [venueName: string]: VenueData };
    Evening: { [venueName: string]: VenueData };
  };
}

interface VenueData {
  primaryType: string;
  story: string;
  rating: number;
  googleMapsUri: string;
}
```

**Generated Routes:**
```typescript
interface DailyRoutes {
  [groupName: string]: {
    Morning: Venue;
    Lunch: Venue;
    Afternoon: Venue;
    Evening: Venue;
  };
}

interface Venue {
  name: string;         // From object key
  primaryType: string;
  story: string;
  rating: number;
  googleMapsUri: string;
}
```

**Constants:**
```typescript
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
```

### Technical Constraints

**Content Structure (fixed):**
- Onboarding slides: exactly 4
- Food groups: exactly 4
- Venue cards per group: exactly 4 (one per slot)
- Total daily venues: 16 (4 groups × 4 slots)
- Story length: 2-3 sentences per venue

**Venue Pools:**
- Morning: 3-5 venues per group
- Lunch: 3-5 venues per group
- Afternoon: 3-5 venues per group
- Evening: 4-5 venues per group
- Total venues in database: 72

**Performance Targets:**
- Page load: < 2 seconds (static content + CDN)
- No loading spinners — content pre-generated
- No error states for main content — always available

**Variability:**
- Minimum combinations per group: ~100 (3^4)
- Maximum combinations per group: ~600 (5^4)
- Probability of exact daily repeat: < 0.1%

## UX Details

### Platform Strategy
- Mobile-first responsive design
- Single-page vertical flow
- Touch-optimized interactions
- No desktop-specific features for MVP

### Layout Structure

| Section | Height | Purpose |
|---------|--------|---------|
| Onboarding Carousel | 100vh | Immersive entry, mission narrative |
| Route Summary | auto | Group selection, route preview |
| Venue Cards | auto | Detailed venue information |
| Footer | auto | Attribution, manual scroll only |

### Navigation

**Button-Driven Transitions:**
- No scroll hijacking — manual scroll always available
- Smooth auto-scroll on CTA click (500ms duration)
- CTA 1 "Taste Today's Story" → Section 2
- CTA 2 "Meet the Places" → Section 3

### Interaction Inventory

| # | Element | Gesture | Result |
|---|---------|---------|--------|
| 1 | Onboarding carousel | Swipe / dot tap | Navigate slides |
| 2 | Group selector | Swipe / tap | Select food vibe |
| 3 | CTA Button 1 | Tap | Scroll to Route Summary |
| 4 | CTA Button 2 | Tap | Scroll to Venue Cards |
| 5 | Venue cards carousel | Swipe / dot tap | Navigate cards |
| 6 | Maps button | Tap | Open Google Maps (new tab) |
| 7 | Footer | Manual scroll | View attribution |

### Group Switching Behavior
- Selecting new group instantly updates:
  - Group name display
  - Group description
  - Route preview (4 venue names)
  - Venue cards carousel (resets to first card)
- No transition animations — instant swap

### Prohibited Interactions
- No auto-advance on carousels
- No infinite loop / wrap-around
- No hover effects (mobile-first)
- No pull-to-refresh
- No navigation header/menu
- No back buttons
- No loading spinners
- No error modals

### Design System

**Philosophy:**
Cultural rescue mission, not generic food app. Night market atmosphere with neon street food glow. Rebellious, warm, authentic — not corporate.

**Color Palette:**

| Role | Hex | Usage |
|------|-----|-------|
| Background | #0a0a0a | Page background |
| Card BG | #1a1a1a | Card surfaces |
| Card Border | #262626 | Card outlines |
| Text Primary | #ffffff | Headings, names |
| Text Secondary | #a0a0a0 | Descriptions |
| Text Muted | #666666 | Labels, footer |
| Accent | #ff9500 | CTAs, active states |
| Slot Morning | #ffb347 | Morning badge |
| Slot Lunch | #ff6b6b | Lunch badge |
| Slot Afternoon | #4ecdc4 | Afternoon badge |
| Slot Evening | #a855f7 | Evening badge |

**Typography:**
- Font family: System default (fast load)
- Headings: Bold, large
- Body: Regular weight
- Stories: Italic (emotional distinction)
- Labels: Small, muted

**Spacing:**
- Section padding: 24px horizontal, 48px vertical
- Card padding: 20px
- Element gap: 16px
- Button padding: 16px vertical, 24px horizontal

### Component Specifications

**Onboarding Carousel:**
- Full viewport height (100vh)
- Centered content
- Dot indicators at bottom
- CTA button on last slide only

**Group Selector:**
- Horizontal scrollable pills
- Active: accent bg (15% opacity), accent border, accent text
- Inactive: transparent, muted border, muted text
- Pill shape: rounded-full

**Route Summary:**
- "Vibe of the day:" label (small, muted)
- Group name (large, bold, white)
- Group description (regular, secondary)
- Route preview: emoji + "Slot: Venue Name"
- CTA button at bottom

**Venue Card:**
- Slot badge: emoji + label, colored background
- Venue name: large, bold
- Primary type: small, muted, uppercase
- Rating: "Rating: X.X" format
- Story: 2-3 sentences, italic
- Maps button: full width, accent outline

**Footer:**
- Single line, small, centered, muted
- No interactions
