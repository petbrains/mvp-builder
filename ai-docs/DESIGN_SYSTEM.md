# Design System — Bantadthong Vibes

## Overview

**Product:** Bantadthong Vibes — AI-curated daily food route generator for Bangkok tourists
**Aesthetic Direction:** Night Market Neon
**Key Differentiator:** Cultural rescue mission with rebellious warmth, not corporate food app

**The Memorable Element:** Colorful time slot badges glowing against deep dark background — like neon signs at a Bangkok night market.

---

## Aesthetic Direction

### Tone & Vision

**Visual Metaphor:** Night market atmosphere — dark background with neon glows, street food warmth.

**Tone Keywords:** Rebellious, warm, authentic, emotional, slightly provocative, local insider

**Mission Statement:** "Make Bantadthong Great Again" — Cultural rescue mission disguised as food app.

```yaml
Tone Spectrum:
  Minimal ←●―――――→ Maximal         # Minimal UI, maximum atmosphere
  Corporate ←―――●―→ Playful         # Warm but not childish
  Traditional ←―――→ Futuristic      # Neither - grounded in NOW
  Calm ←―――●―――→ Energetic          # Inviting energy, not aggressive
```

### Spatial Composition

```yaml
Spatial Strategy:
  approach: layered-vertical
  hero-style: full-bleed immersive (100vh onboarding)
  grid-behavior: single-column flow (mobile-first)
  spacing-philosophy: generous vertical, tight horizontal

Layout Flow:
  1. Onboarding Carousel — 100vh immersive entry
  2. Route Summary — breathing room, clear hierarchy
  3. Venue Cards Carousel — horizontal swipe discovery
  4. Footer — minimal, manual scroll only

Memorable Layout Moment:
  Full-viewport onboarding slides that scroll away to reveal route selection
```

### Differentiation

```yaml
What makes this NOT generic:
  1. Dark-first design (night market aesthetic, not corporate white)
  2. Time slot color coding (4 distinct badge colors = visual rhythm)
  3. Cultural narrative (rescue mission tone, not generic food app)
  4. Emoji-as-UI (🌅🌞🍰🌙 as time indicators, not icons)
  5. Intentional restraint (no animations, no loading states = confidence)
```

---

## Design Tokens

### Colors — "Night Market Neon"

```css
:root {
  /* Backgrounds — Deep dark canvas */
  --background: #0a0a0a;           /* Page background */
  --background-secondary: #1a1a1a; /* Card surfaces */
  --background-tertiary: #262626;  /* Subtle borders, dividers */

  /* Foreground — Clear hierarchy */
  --foreground: #ffffff;           /* Primary text, headings */
  --foreground-secondary: #a0a0a0; /* Descriptions, body text */
  --foreground-muted: #666666;     /* Labels, footer, hints */

  /* Accent — Warm amber glow */
  --accent: #ff9500;               /* CTAs, active states, links */
  --accent-foreground: #0a0a0a;    /* Text on accent background */
  --accent-hover: #ffab33;         /* Hover state */
  --accent-subtle: rgba(255, 149, 0, 0.15); /* Active pill background */

  /* Time Slot Neon — The memorable palette */
  --slot-morning: #ffb347;         /* Warm orange — sunrise warmth */
  --slot-lunch: #ff6b6b;           /* Coral red — peak energy */
  --slot-afternoon: #4ecdc4;       /* Teal — refreshing break */
  --slot-evening: #a855f7;         /* Purple — night vibes */

  /* Semantic */
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --success: #22c55e;
  --warning: #eab308;

  /* Utility */
  --border: #262626;               /* Card borders */
  --border-strong: #404040;        /* Emphasized borders */
  --ring: #ff9500;                 /* Focus rings */
}
```

**Palette Rationale:**
```yaml
Chosen Direction: Dark-first with warm accent
Concept Connection:
  - #0a0a0a background = Bangkok night sky
  - #ff9500 accent = street food vendor lights, warm invitation
  - Slot colors = neon signs marking different food stalls
Memorable Element: Four distinct time slot colors create visual rhythm and recall
```

### Typography

```yaml
Typography:
  Font Display: System fonts
  Font Body: System fonts
  Font Mono: Not used

  Stack: >
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif

  Rationale: >
    Performance-first choice. Target users are tourists on mobile data.
    Page load < 2 seconds requirement. Compensated with distinctive treatments.

  Alternative (if custom fonts needed):
    Display: DM Sans or Plus Jakarta Sans (~15KB)
    Body: Same
```

**Type Scale:**
```css
:root {
  /* Scale */
  --text-xs: 0.75rem;    /* 12px - Footer, fine print */
  --text-sm: 0.875rem;   /* 14px - Labels, badges, meta */
  --text-base: 1rem;     /* 16px - Body text, stories */
  --text-lg: 1.125rem;   /* 18px - Emphasized body */
  --text-xl: 1.25rem;    /* 20px - Venue names */
  --text-2xl: 1.5rem;    /* 24px - Group names */
  --text-3xl: 1.875rem;  /* 30px - Section titles */
  --text-4xl: 2.25rem;   /* 36px - Hero headlines */

  /* Weights */
  --font-normal: 400;    /* Body text */
  --font-medium: 500;    /* Subtle emphasis, labels */
  --font-bold: 700;      /* Headings, venue names, CTAs */

  /* Line Heights */
  --leading-tight: 1.2;  /* Headlines */
  --leading-normal: 1.5; /* Body text */
  --leading-relaxed: 1.6; /* Stories, descriptions */
}
```

**Special Treatments:**
```yaml
Headlines:
  font-weight: 700
  letter-spacing: -0.02em
  line-height: 1.2

Stories:
  font-style: italic
  line-height: 1.6
  color: var(--foreground-secondary)

Cuisine Tags:
  text-transform: uppercase
  letter-spacing: 0.05em
  font-size: var(--text-sm)
  color: var(--foreground-muted)

Section Labels:
  font-size: var(--text-sm)
  color: var(--foreground-muted)
  Example: "Vibe of the day:"
```

### Spacing & Layout

```css
:root {
  /* Base unit: 4px */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */

  /* Component Spacing */
  --section-padding-x: var(--space-6);  /* 24px */
  --section-padding-y: var(--space-12); /* 48px */
  --card-padding: var(--space-5);       /* 20px */
  --card-gap: var(--space-4);           /* 16px */
  --button-padding-x: var(--space-6);   /* 24px */
  --button-padding-y: var(--space-4);   /* 16px */

  /* Layout */
  --container-max: 480px;               /* Card max width */
  --container-wide: 640px;              /* Section max width */
}
```

### Atmosphere & Effects

```css
:root {
  /* Shadows — Subtle elevation, not dramatic */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(255, 149, 0, 0.3);

  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;  /* Pills */
  --radius-default: var(--radius-lg);

  /* Borders */
  --border-width: 1px;
  --border-style: solid;
}
```

**Atmosphere Rationale:**
```yaml
Depth Strategy: Minimal shadows, depth through color contrast
Texture Choice: None — clean dark surfaces like night sky
Light Direction: N/A — ambient glow from accent elements
Philosophy: >
  Dark mode reduces visual noise. Colored elements (badges, CTAs)
  become the light sources, like neon signs against night.
```

---

## Motion

### Strategy

```yaml
Selected: minimal (intentional restraint)

Rationale: >
  This design achieves distinctiveness through restraint, not animation.
  Matches the "offline-first, instant load" philosophy.
  Zero loading states = zero waiting = confidence.
  Users on tourist mobile data appreciate snappy responses.

What this means:
  - Transitions are instant or very fast (<200ms)
  - No scroll-triggered animations
  - No parallax effects
  - No auto-advancing carousels
  - No loading spinners or skeletons
```

### Motion Signature

```yaml
The ONE motion that defines this product:
  "Instant response. Confident stillness. When you tap, it responds NOW."

This creates trust:
  - Carousel snaps immediately
  - Group selection updates instantly
  - CTA scrolls smoothly but quickly
  - No waiting, no uncertainty
```

### Motion Tokens

```css
:root {
  /* Durations — Fast by default */
  --duration-instant: 0ms;       /* Color changes */
  --duration-fast: 100ms;        /* Hover states */
  --duration-normal: 200ms;      /* Button press feedback */
  --duration-slow: 300ms;        /* Carousel transitions */
  --duration-scroll: 500ms;      /* Smooth scroll CTA */

  /* Easings */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

**Motion Patterns:**
```yaml
Hover:
  buttons: background-color transition (--duration-fast)
  pills: border-color + background transition (--duration-fast)
  cards: no hover effect (mobile-first)

Focus:
  all-interactive: 2px solid var(--ring), 2px offset
  transition: none (instant focus ring)

Page Enter:
  content: instant render (no fade-in)
  philosophy: "Already there when you arrive"

Scroll Behavior:
  CTA clicks: scrollIntoView({ behavior: 'smooth' })
  duration: ~500ms (browser native)

Carousel:
  library: Embla (via shadcn)
  physics: native momentum, snap to slides
  no-customization: use defaults

Group Switching:
  route-preview: instant update
  venue-cards: reset to first card, no transition
```

### Prohibited Motion

```yaml
EXPLICITLY BANNED (from PRD):
  - Parallax effects
  - Scroll-triggered animations
  - Auto-play / auto-advance carousels
  - Fade-in on scroll
  - Loading skeleton animations
  - Infinite loop / wrap-around carousels
  - Hover effects on mobile-first elements
```

---

## Technology Stack

### Selected Libraries

```yaml
Base UI: shadcn/ui
  Components:
    - Carousel (Embla-based)
    - Button
    - Card
  Rationale: >
    Specified in PRD. Accessible, tested, Tailwind-native.
    Customizable variants for accent styling.

Styling: Tailwind CSS
  Rationale: >
    Dark theme tokens, mobile-first utilities, no CSS files to manage.
    Matches Next.js + Vercel ecosystem.

Framework: Next.js 14 (App Router)
  Rationale: >
    Static export, TypeScript native, Vercel-optimized.
    Build-time route generation with seedrandom.

Randomization: seedrandom
  Rationale: >
    ~2KB. Deterministic date-based selection for daily routes.
    Cross-platform consistency.
```

### NOT Using

```yaml
aceternity:
  Reason: PRD prohibits dramatic scroll effects, auto-advance

magic-ui:
  Reason: No stats, tickers, or logo marquees needed

lottie:
  Reason: "No loading spinners" — no loading states period

rive:
  Reason: No interactive state-driven animations needed

framer-motion:
  Reason: Motion strategy is minimal, CSS transitions sufficient

Custom icons:
  Reason: Using emoji for time slots (🌅🌞🍰🌙) per PRD
```

### Installation Commands

```bash
# Core dependencies (from PRD)
npm install seedrandom
npm install -D @types/seedrandom

# shadcn/ui components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add carousel
```

---

## Component Specifications

### Button

```yaml
source: shadcn/ui Button
variants:
  - default (CTA)
  - outline (Maps button)
  - ghost (not used)

Customizations:
  default:
    background: var(--accent)
    color: var(--accent-foreground)
    hover: var(--accent-hover)
    font-weight: 700
    padding: 16px 24px
    border-radius: 12px
    width: 100% (within container)
    max-width: 320px

  outline:
    background: transparent
    border: 1px solid var(--accent)
    color: var(--accent)
    hover: var(--accent-subtle) background
    font-weight: 500
    padding: 14px 20px
    border-radius: 10px
    width: 100%
```

### Card (Venue Card)

```yaml
source: shadcn/ui Card
variants:
  - default (venue card)

Customizations:
  background: var(--background-secondary)
  border: 1px solid var(--border)
  border-radius: 16px
  padding: 24px
  min-height: 300px
  width: calc(100vw - 48px) or max 360px

Internal Structure:
  1. Slot Badge (top)
  2. Venue Name (--text-xl, bold)
  3. Primary Type (--text-sm, uppercase, muted)
  4. Rating ("Rating: X.X")
  5. Story (italic, secondary color)
  6. Maps Button (full width, outline)
```

### Carousel

```yaml
source: shadcn/ui Carousel (Embla)

Onboarding Carousel:
  opts:
    align: center
    loop: false
  height: 100vh
  width: 100vw
  indicators: dot-style at bottom
  CTA: only on last slide

Group Selector Carousel:
  opts:
    align: start
    loop: true
    dragFree: true
  overflow: visible
  gap: 8px
  items: pill buttons

Venue Cards Carousel:
  opts:
    align: start
    loop: false
  gap: 16px
  indicators: dot-style at bottom
  sync: with group selector selection
```

### Pill (Group Selector)

```yaml
source: shadcn/ui Button (custom variant)

States:
  inactive:
    background: transparent
    border: 1px solid var(--border)
    color: var(--foreground-muted)
    border-radius: 9999px
    padding: 10px 16px
    font-size: 14px
    font-weight: 500
    white-space: nowrap

  active:
    background: var(--accent-subtle)
    border: 1px solid var(--accent)
    color: var(--accent)
    border-radius: 9999px
    padding: 10px 16px
    font-size: 14px
    font-weight: 500
    white-space: nowrap
```

### Slot Badge

```yaml
source: Custom component

Structure:
  display: inline-flex
  align-items: center
  gap: 4px
  padding: 8px 12px
  border-radius: 8px
  font-size: 14px
  font-weight: 500

Variants:
  morning:
    background: rgba(255, 179, 71, 0.2)
    color: var(--slot-morning)

  lunch:
    background: rgba(255, 107, 107, 0.2)
    color: var(--slot-lunch)

  afternoon:
    background: rgba(78, 205, 196, 0.2)
    color: var(--slot-afternoon)

  evening:
    background: rgba(168, 85, 247, 0.2)
    color: var(--slot-evening)
```

### Dot Indicators

```yaml
source: Custom or Carousel built-in

Styles:
  inactive:
    background: var(--foreground-muted)
    width: 8px
    height: 8px
    border-radius: 50%

  active:
    background: var(--accent)
    width: 8px
    height: 8px
    border-radius: 50%

  gap: 8px
  tap-target: 24px × 24px minimum
```

---

## Feature Mapping

### daily-route-generator

```yaml
components: None (data layer)
patterns:
  - Build-time route generation with seedrandom
  - Static JSON data source
output: DailyRoutes object with 16 venues
```

### page-layout

```yaml
components:
  - Section containers with --section-padding
  - Footer (muted text, centered)
patterns:
  - Single-page vertical flow
  - Auto-scroll with scrollIntoView
  - 100vh onboarding section
```

### onboarding-carousel

```yaml
components:
  - Carousel (shadcn): 4 slides, centered
  - Button (default): CTA on last slide
  - Dot indicators: 4 dots
patterns:
  - Full viewport height
  - Centered content
  - "Taste Today's Story" → scroll to route summary
```

### group-selector

```yaml
components:
  - Carousel (shadcn): horizontal scroll, drag-free
  - Button (pill variant): 4 pills
patterns:
  - Active state: accent border + subtle background
  - Instant switch on tap
  - Syncs with route-summary and venue-cards
```

### route-summary

```yaml
components:
  - Section label ("Vibe of the day:")
  - Group name (large, bold)
  - Group description (secondary color)
  - Route preview list (emoji + venue names)
  - Button (default): "Meet the Places"
patterns:
  - Updates instantly on group selection
  - Route preview shows 4 daily venues
```

### venue-cards

```yaml
components:
  - Carousel (shadcn): 4 cards per group
  - Card (shadcn): venue display
  - Slot Badge (custom): time indicator
  - Button (outline): Google Maps link
patterns:
  - Resets to first card on group change
  - Maps button opens new tab
  - Dot indicators for navigation
```

---

## Accessibility Requirements

### Touch Targets

```yaml
Minimum: 44px × 44px
Buttons: Full width on mobile
Dot indicators: 24px tap area
Group pills: 44px height minimum
```

### Color Contrast

```yaml
Text on background:
  #ffffff on #0a0a0a = 21:1 (AAA)
  #a0a0a0 on #0a0a0a = 7.4:1 (AAA)
  #666666 on #0a0a0a = 4.5:1 (AA)

Accent:
  #ff9500 on #0a0a0a = 4.5:1 (AA for large text)
  #0a0a0a on #ff9500 = 4.5:1 (AA for large text)
```

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Screen Reader Support

```yaml
Carousels:
  role: region
  aria-label: descriptive label

Group Selector:
  role: tablist
  aria-label: "Select food group"

Active Group:
  aria-selected: true

Buttons:
  Descriptive text (not just icons)

External Links:
  aria-label includes "opens in new tab"
```

---

## Implementation Notes

### Tailwind Configuration

```javascript
// tailwind.config.js additions
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        'background-secondary': '#1a1a1a',
        foreground: '#ffffff',
        'foreground-secondary': '#a0a0a0',
        'foreground-muted': '#666666',
        accent: '#ff9500',
        'accent-hover': '#ffab33',
        border: '#262626',
        'slot-morning': '#ffb347',
        'slot-lunch': '#ff6b6b',
        'slot-afternoon': '#4ecdc4',
        'slot-evening': '#a855f7',
      },
      borderRadius: {
        DEFAULT: '0.75rem',
      },
    },
  },
}
```

### Dark Mode

```yaml
Strategy: Dark-only design
  - No light mode toggle
  - No system preference detection
  - Hard-coded dark theme

Rationale: Night market aesthetic requires dark background
```

### Performance Targets

```yaml
Page load: < 2 seconds
Bundle size: Minimal (static content)
No loading states: Content always available
Offline-capable: After initial load
```

---

## Anti-Slop Checklist

```yaml
Typography:
  ✓ Font choice is INTENTIONAL (performance over custom)
  ✓ Distinctive treatments (italic stories, uppercase tags)
  ✓ Clear rationale documented

Colors:
  ✓ Palette has NAME: "Night Market Neon"
  ✓ Accent #ff9500 is memorable (warm amber)
  ✓ Not default Tailwind colors (custom palette)
  ✓ Concept connection: Night market street food

Layout:
  ✓ 100vh onboarding = immersive entry
  ✓ Single-column vertical flow = focused journey
  ✓ Not "centered hero + 3 columns"

Motion:
  ✓ "Minimal" IS the motion signature
  ✓ Intentional restraint, not laziness
  ✓ Instant response = confident design

Overall:
  ✓ Memorable: Colorful slot badges like neon signs
  ✓ Aesthetic keywords: Night market, neon, rebellious, warm
  ✓ Would a human designer be proud? Yes — it has PURPOSE
```

---

## Next Steps

1. Run `/docs:spec` for each feature in implementation order
2. Run `/docs:ux` for interaction specifications
3. Implement features using this design system as reference
4. Apply Tailwind config and shadcn customizations
