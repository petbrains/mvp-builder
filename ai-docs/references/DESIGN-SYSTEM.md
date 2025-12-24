# 🎨 Design System — Bantadthong Vibes

> Reference document for visual implementation.
> Place in: `ai-docs/references/DESIGN-SYSTEM.md`

---

## Brand Identity

### Mission Statement
"Make Bantadthong Great Again" — Cultural rescue mission disguised as food app.

### Tone
- Rebellious but warm
- Authentic, not corporate
- Emotional, slightly provocative
- Local insider perspective

### Visual Metaphor
Night market atmosphere — dark background with neon glows, street food warmth.

---

## Color Palette

### Base Colors
```css
:root {
  /* Backgrounds */
  --bg-primary: #0a0a0a;      /* Page background */
  --bg-card: #1a1a1a;         /* Card backgrounds */
  --bg-card-border: #262626;  /* Subtle borders */
  
  /* Text */
  --text-primary: #ffffff;    /* Main text */
  --text-secondary: #a0a0a0;  /* Subtitle, meta */
  --text-muted: #666666;      /* Footer, hints */
  
  /* Accent */
  --accent: #ff9500;          /* CTAs, highlights */
  --accent-hover: #ffab33;    /* Button hover state */
}
```

### Time Slot Colors
```css
:root {
  --slot-morning: #ffb347;    /* Warm orange */
  --slot-lunch: #ff6b6b;      /* Coral red */
  --slot-afternoon: #4ecdc4;  /* Teal */
  --slot-evening: #a855f7;    /* Purple */
}
```

### Usage Rules
- Background: Always `--bg-primary`
- Cards: Always `--bg-card` with optional `--bg-card-border`
- CTAs: `--accent` background, `--bg-primary` text
- Time slot badges: Use respective slot color as background
- Active states: `--accent` with 15% opacity background

---

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
```

No custom fonts for MVP — system fonts for fast load.

### Scale
```css
/* Headings */
--text-4xl: 2.25rem;   /* 36px - Hero title */
--text-3xl: 1.875rem;  /* 30px - Section titles */
--text-2xl: 1.5rem;    /* 24px - Group names */
--text-xl: 1.25rem;    /* 20px - Venue names */

/* Body */
--text-base: 1rem;     /* 16px - Body text */
--text-sm: 0.875rem;   /* 14px - Meta, labels */
--text-xs: 0.75rem;    /* 12px - Footer */
```

### Weights
```css
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Subtle emphasis */
--font-bold: 700;      /* Headings, venue names */
```

### Special Treatments
- **Stories**: Italic style, slightly larger line-height
- **Venue names**: Bold, large
- **Cuisine tags**: Small, muted, uppercase tracking
- **Section labels**: Small, muted ("Vibe of the day:")

---

## Spacing System

### Base Unit
4px base, scale in multiples.

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px - Standard gap */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px - Section padding horizontal */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px - Section padding vertical */
```

### Component Spacing
```css
/* Sections */
--section-padding-x: var(--space-6);  /* 24px */
--section-padding-y: var(--space-12); /* 48px */

/* Cards */
--card-padding: var(--space-5);       /* 20px */
--card-gap: var(--space-4);           /* 16px between elements */

/* Buttons */
--button-padding-x: var(--space-6);   /* 24px */
--button-padding-y: var(--space-4);   /* 16px */
```

---

## Component Specifications

### Onboarding Carousel

```
Structure:
┌─────────────────────────────────────────┐
│                                         │
│           [Slide Content]               │
│                                         │
│              Centered                   │
│           Vertically and                │
│           Horizontally                  │
│                                         │
│                                         │
│            ○ ○ ○ ●                      │  ← Dot indicators
│                                         │
│    (CTA button on last slide only)      │
│                                         │
└─────────────────────────────────────────┘

Height: 100vh (full viewport)
Width: 100vw
Padding: 24px horizontal
Content alignment: center
```

### Group Selector (Pills)

```
Structure:
┌─────────────────────────────────────────┐
│                                         │
│  ← [Pan-Asian] [Urban] [Sweet] [Thai] → │
│                                         │
└─────────────────────────────────────────┘

Type: Horizontal swipeable carousel
Items: 4 groups
Overflow: scroll horizontally with snap
```

**Pill Styles:**
```css
/* Inactive pill */
.pill-inactive {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--bg-card-border);
  padding: 10px 16px;
  border-radius: 20px;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  white-space: nowrap;
}

/* Active pill */
.pill-active {
  background: rgba(255, 149, 0, 0.15);  /* --accent with 15% opacity */
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 10px 16px;
  border-radius: 20px;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  white-space: nowrap;
}
```

**Layout:**
```css
.group-selector {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 4px 0;
}

.group-selector::-webkit-scrollbar {
  display: none;  /* Hide scrollbar */
}

.pill {
  scroll-snap-align: start;
  flex-shrink: 0;
}
```

### Route Section

```
Structure:
┌─────────────────────────────────────────┐
│                                         │
│  ← [Pan-Asian] [Urban] [Sweet] [Thai] → │  ← Group Selector
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Vibe of the day:                       │  ← Section label (muted)
│                                         │
│  Pan-Asian Flavors                      │  ← Group name (bold, large)
│                                         │
│  "Hop between China, Japan and Korea    │
│  without leaving the neighborhood.      │  ← group_description
│  Dim sum for lunch, izakaya vibes       │
│  by night."                             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  🌅 Morning: TEA PEARL                  │
│  🌞 Lunch: Xi An Yiam                   │  ← Daily route preview
│  🍰 Afternoon: Mixue                    │
│  🌙 Evening: Yakin Yakiniku             │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [      Meet the Places →      ]        │  ← CTA
│                                         │
└─────────────────────────────────────────┘

Background: --bg-primary (full width section)
Padding: 24px horizontal, 48px vertical
```

**Section Label:**
```css
.section-label {
  font-size: var(--text-sm);
  color: var(--text-muted);
  font-weight: var(--font-normal);
  margin-bottom: var(--space-2);
}
```

**Group Name:**
```css
.group-name {
  font-size: var(--text-2xl);
  color: var(--text-primary);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-4);
}
```

**Group Description:**
```css
.group-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  font-weight: var(--font-normal);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}
```

**Route Preview:**
```css
.route-preview {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);  /* 12px between lines */
}

.route-item {
  font-size: var(--text-base);
  color: var(--text-primary);
}

.route-item .slot-label {
  color: var(--text-secondary);
}

.route-item .venue-name {
  font-weight: var(--font-medium);
}
```

### Venue Card

```
Structure:
┌─────────────────────────────────────────┐
│                                         │
│  🌅 Morning                             │  ← Slot badge
│                                         │
│  TEA PEARL                              │  ← Venue name (bold, large)
│  Bakery                                 │  ← Primary type (muted)
│                                         │
│  Rating: 4.6                            │  ← Rating only (no review count)
│                                         │
│  "XXL boba teas and legendary banana    │
│  roti in air-conditioned comfort —      │  ← Story (italic)
│  affordable sweetness with endless      │
│  dessert options."                      │
│                                         │
│  [     📍 Open in Google Maps     ]     │  ← Maps button
│                                         │
└─────────────────────────────────────────┘

Background: --bg-card
Border: 1px solid --bg-card-border
Border-radius: 16px
Padding: 24px
Min-height: 300px
Width: calc(100vw - 48px) or max 360px
```

**Venue Name:**
```css
.venue-name {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}
```

**Primary Type:**
```css
.primary-type {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--space-3);
}
```

**Rating:**
```css
.rating {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}
```

**Story:**
```css
.story {
  font-size: var(--text-base);
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}
```

### Slot Badge

```
┌───────────────────┐
│  🌅 Morning       │
└───────────────────┘

Background: --slot-morning (with 20% opacity)
Text color: --slot-morning
Padding: 8px 12px
Border-radius: 8px
Font-size: --text-sm
Font-weight: --font-medium
```

**All slot variants:**
```css
.slot-badge-morning {
  background: rgba(255, 179, 71, 0.2);
  color: var(--slot-morning);
}

.slot-badge-lunch {
  background: rgba(255, 107, 107, 0.2);
  color: var(--slot-lunch);
}

.slot-badge-afternoon {
  background: rgba(78, 205, 196, 0.2);
  color: var(--slot-afternoon);
}

.slot-badge-evening {
  background: rgba(168, 85, 247, 0.2);
  color: var(--slot-evening);
}
```

### CTA Button

```
┌─────────────────────────────────────────┐
│         Taste Today's Story →           │
└─────────────────────────────────────────┘

Background: --accent
Text color: --bg-primary
Padding: 16px 24px
Border-radius: 12px
Font-size: --text-base
Font-weight: --font-bold
Width: 100% (within container)
Max-width: 320px

Hover: --accent-hover background
Active: scale(0.98) transform
```

### Maps Button

```
┌─────────────────────────────────────────┐
│       📍 Open in Google Maps            │
└─────────────────────────────────────────┘

Background: transparent
Border: 1px solid --accent
Text color: --accent
Padding: 14px 20px
Border-radius: 10px
Font-size: --text-sm
Font-weight: --font-medium
Width: 100%
```

### Dot Indicators

```
○ ○ ● ○

Inactive: --text-muted, 8px diameter
Active: --accent, 8px diameter
Gap: 8px between dots
Tap target: 24px × 24px minimum
```

---

## shadcn/ui Components

### Required Components
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add carousel
```

### Carousel Configuration

```tsx
// Onboarding carousel (4 slides)
<Carousel
  opts={{
    align: "center",
    loop: false,
  }}
  className="w-full"
>
  {/* 4 onboarding slides */}
</Carousel>

// Group selector carousel (4 groups)
<Carousel
  opts={{
    align: "start",
    loop: true,
    dragFree: true,
  }}
  className="w-full"
>
  {/* 4 group pills */}
</Carousel>

// Venue cards carousel (4 cards)
<Carousel
  opts={{
    align: "start",
    loop: false,
  }}
  className="w-full"
>
  {/* 4 venue cards for selected group */}
</Carousel>
```

### Button Variants
```tsx
// CTA Button (primary)
<Button 
  size="lg"
  className="bg-[#ff9500] text-[#0a0a0a] hover:bg-[#ffab33]"
>
  Taste Today's Story →
</Button>

// Maps Button (outline)
<Button 
  variant="outline"
  className="border-[#ff9500] text-[#ff9500] hover:bg-[#ff9500]/10"
>
  📍 Open in Google Maps
</Button>
```

### Group Pill Variant
```tsx
// Inactive group pill
<Button 
  variant="outline"
  size="sm"
  className="border-[#262626] text-[#666666] rounded-full"
>
  Pan-Asian Flavors
</Button>

// Active group pill
<Button 
  variant="outline"
  size="sm"
  className="border-[#ff9500] text-[#ff9500] bg-[#ff9500]/15 rounded-full"
>
  Pan-Asian Flavors
</Button>
```

---

## Animation Specs

### Smooth Scroll (CTA buttons)
```typescript
const scrollToSection = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
```
Duration: ~500ms (browser default smooth scroll)

### Carousel Transitions
Use Embla defaults (shadcn Carousel uses Embla):
- Swipe physics: natural momentum
- Snap: align to slide edges
- No custom animations needed

### Group Switch Transition
When user switches group:
- Route preview: Instant update (no animation)
- Venue cards: Reset to first card, no transition

### Prohibited Animations
- ❌ Parallax effects
- ❌ Scroll-triggered animations
- ❌ Auto-play / auto-advance
- ❌ Fade-in on scroll
- ❌ Loading skeleton animations (no loading states)

---

## Responsive Breakpoints

### Mobile First
```css
/* Base: Mobile (< 640px) */
/* Everything designed for mobile by default */

/* Tablet (≥ 640px) */
@media (min-width: 640px) {
  /* Increase padding, card sizes */
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  /* Center content, max-width containers */
}
```

### Container Max-Widths
```css
--max-width-content: 480px;  /* Cards, forms */
--max-width-wide: 640px;     /* Route section */
```

---

## Accessibility Requirements

### Touch Targets
- Minimum: 44px × 44px
- Buttons: Full width on mobile
- Dot indicators: 24px tap area minimum
- Group pills: 44px height minimum

### Color Contrast
- Text on dark bg: Meets WCAG AA (white on #0a0a0a)
- Accent on dark bg: #ff9500 passes for large text

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Screen Reader
- Carousels: Include aria-labels
- Group selector: `aria-label="Select food group"`
- Venue cards: `aria-label="Venue details"`
- Buttons: Descriptive text (not just icons)
- Active group: `aria-selected="true"`