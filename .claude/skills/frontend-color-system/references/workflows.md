# Color System Workflows

Step-by-step guides for common color tasks.

---

## Workflow: Brand Color to Full Theme

Complete process from single brand color to production-ready theme.

```yaml
INPUT: Brand HEX color (e.g., #6366F1)
OUTPUT: Complete light/dark CSS variables + Tailwind config
```

### Step 1: Analyze Brand Color

```bash
# Get color info (no jq required)
curl -s "https://www.thecolorapi.com/id?hex=6366F1" | grep -o '"hsl":{"h":[0-9]*,"s":[0-9]*,"l":[0-9]*'

# Or use WebFetch tool
WebFetch: https://www.thecolorapi.com/id?hex=6366F1
→ Extract: HSL values, color name, complementary
```

**Manual HSL conversion:**
```yaml
#6366F1 → hsl(239, 84%, 67%)
Format for CSS: "239 84% 67%"  (no commas, no hsl())
```

### Step 2: Check Accessibility

```bash
# Check white text on brand
curl -s "https://webaim.org/resources/contrastchecker/?fcolor=FFFFFF&bcolor=6366F1&api"

# Check black text on brand
curl -s "https://webaim.org/resources/contrastchecker/?fcolor=000000&bcolor=6366F1&api"
```

**Decision matrix:**
```yaml
Contrast ≥ 4.5:1  → Use for buttons, links, text
Contrast ≥ 3:1    → Use for large text, icons only
Contrast < 3:1    → Decorative only, create darker variant
```

### Step 3: Generate Palette Shades

```bash
# Get monochrome shades
curl -s "https://www.thecolorapi.com/scheme?hex=6366F1&mode=monochrome&count=11"
```

**Or calculate manually (HSL method):**
```yaml
Base: hsl(239, 84%, 67%)

50:  hsl(239, 84%, 97%)  # Nearly white
100: hsl(239, 84%, 93%)
200: hsl(239, 84%, 87%)
300: hsl(239, 84%, 77%)
400: hsl(239, 84%, 72%)
500: hsl(239, 84%, 67%)  # Base
600: hsl(239, 84%, 57%)
700: hsl(239, 84%, 47%)
800: hsl(239, 84%, 37%)
900: hsl(239, 84%, 27%)
950: hsl(239, 84%, 17%)  # Nearly black
```

### Step 4: Create CSS Variables

```css
/* globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 239 10% 4%;

    --primary: 239 84% 67%;           /* Your brand */
    --primary-foreground: 0 0% 98%;   /* White text (if contrast OK) */

    --secondary: 239 10% 96%;
    --secondary-foreground: 239 10% 10%;

    --muted: 239 10% 96%;
    --muted-foreground: 239 5% 46%;

    --accent: 239 10% 96%;
    --accent-foreground: 239 10% 10%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;

    --border: 239 10% 90%;
    --input: 239 10% 90%;
    --ring: 239 84% 67%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 239 10% 4%;
    --foreground: 0 0% 98%;

    --primary: 239 84% 67%;
    --primary-foreground: 239 10% 4%;

    --secondary: 239 10% 16%;
    --secondary-foreground: 0 0% 98%;

    --muted: 239 10% 16%;
    --muted-foreground: 239 5% 65%;

    --accent: 239 10% 16%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 0 0% 98%;

    --border: 239 10% 16%;
    --input: 239 10% 16%;
    --ring: 239 84% 67%;
  }
}
```

### Step 5: Apply to Tailwind

```ts
// tailwind.config.ts - add to theme.extend.colors
colors: {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  // ... rest of colors
}
```

### Step 6: Verify

```yaml
Checklist:
  [ ] Primary on white: contrast ≥ 4.5:1
  [ ] Primary on dark bg: contrast ≥ 4.5:1
  [ ] Destructive visible in both modes
  [ ] Muted text readable (contrast ≥ 4.5:1)
  [ ] Focus ring visible
  [ ] No color-only information
```

---

## Workflow: Quick Contrast Check

Fast accessibility verification for any color pair.

```yaml
GOAL: Verify color combination meets WCAG AA
```

### Using WebAIM API

```bash
# Format: fcolor = foreground (text), bcolor = background
curl -s "https://webaim.org/resources/contrastchecker/?fcolor=FFFFFF&bcolor=6366F1&api"
```

**Response interpretation:**
```yaml
ratio: "4.52:1"
AA: "pass"        # Normal text OK
AALarge: "pass"   # Large text OK
AAA: "fail"       # Stricter standard
AAALarge: "pass"
```

### Quick Reference

```yaml
Text on Background:
  White (#FFF) on Primary → check AA
  Primary on White (#FFF) → check AA
  Muted text on Background → check AA

Interactive:
  Focus ring visible → contrast ≥ 3:1
  Disabled state → no contrast requirement (but indicate differently)
```

---

## Workflow: Dark Mode Generation

Convert light theme to dark theme systematically.

```yaml
RULE: Invert lightness, preserve hue
```

### HSL Inversion

```yaml
Light values → Dark values:

Background:
  "0 0% 100%"    →  "240 10% 4%"
  (white)            (near black with slight hue)

Foreground:
  "240 10% 4%"   →  "0 0% 98%"
  (near black)       (near white)

Primary:
  Keep same or slightly increase L for visibility
  "239 84% 67%"  →  "239 84% 67%" (or 70%)

Muted/Secondary:
  "240 5% 96%"   →  "240 4% 16%"
  (L: 96 → 16, roughly 100 - L)

Border:
  "240 6% 90%"   →  "240 4% 16%"
  (match muted for cohesion)
```

### Pattern

```
dark_L ≈ 100 - light_L

Exceptions:
- Primary: keep or slightly increase
- Destructive: reduce L to avoid harshness
- Foreground text: max 98% (pure white harsh)
```

---

## Workflow: Semantic Colors Setup

Add success/warning/error/info colors.

```css
:root {
  /* Success - Green */
  --success: 142 76% 36%;
  --success-foreground: 0 0% 98%;

  /* Warning - Amber (dark text for contrast) */
  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 9%;

  /* Error - Red */
  --error: 0 84% 60%;
  --error-foreground: 0 0% 98%;

  /* Info - Blue */
  --info: 199 89% 48%;
  --info-foreground: 0 0% 98%;
}

.dark {
  --success: 142 69% 58%;
  --success-foreground: 144 61% 10%;

  --warning: 38 92% 50%;
  --warning-foreground: 0 0% 9%;

  --error: 0 63% 31%;
  --error-foreground: 0 0% 98%;

  --info: 199 89% 48%;
  --info-foreground: 199 89% 10%;
}
```

**Tailwind extension:**
```ts
colors: {
  success: {
    DEFAULT: 'hsl(var(--success))',
    foreground: 'hsl(var(--success-foreground))',
  },
  warning: {
    DEFAULT: 'hsl(var(--warning))',
    foreground: 'hsl(var(--warning-foreground))',
  },
  // ...
}
```

---

## Workflow: Color from Design Tool

Extract colors from Figma/design files.

### Figma Export

```yaml
1. Select element in Figma
2. Copy color as HEX from right panel
3. Convert to HSL for CSS variables

HEX to HSL (approximate):
  #6366F1 → 239, 84%, 67%

Use online tool: https://htmlcolors.com/hex-to-hsl
```

### Format Conversion

```yaml
Figma gives:    #6366F1 or rgb(99, 102, 241)
CSS var needs:  239 84% 67%  (HSL without commas/hsl())

Tailwind class: text-[#6366F1]  (direct HEX)
                text-primary    (using CSS var)
```

---

## Workflow: Validate Full Theme

Comprehensive theme accessibility check.

```yaml
COMBINATIONS TO CHECK:

1. Primary button:
   - Primary bg + Primary-foreground text
   - → Must pass AA (4.5:1)

2. Secondary button:
   - Secondary bg + Secondary-foreground text
   - → Must pass AA

3. Destructive:
   - Destructive bg + Destructive-foreground text
   - → Must pass AA

4. Muted text:
   - Background + Muted-foreground
   - → Must pass AA

5. Card:
   - Card bg + Card-foreground
   - → Must pass AA

6. Links on background:
   - Background + Primary (as link color)
   - → Must pass AA

7. Focus states:
   - Ring color visible on both light/dark
   - → Contrast ≥ 3:1 against adjacent colors
```

### Automated Check Script

```bash
#!/bin/bash
# check-contrast.sh

check() {
  result=$(curl -s "https://webaim.org/resources/contrastchecker/?fcolor=$1&bcolor=$2&api")
  ratio=$(echo $result | grep -o '"ratio":"[^"]*"' | cut -d'"' -f4)
  aa=$(echo $result | grep -o '"AA":"[^"]*"' | cut -d'"' -f4)
  echo "$3: $ratio ($aa)"
}

# Light mode checks
check "FFFFFF" "6366F1" "White on Primary"
check "6366F1" "FFFFFF" "Primary on White"
check "737380" "FFFFFF" "Muted on White"

# Dark mode checks
check "FAFAFA" "0A0A0F" "Light text on Dark bg"
check "6366F1" "0A0A0F" "Primary on Dark bg"
```

---

## Quick Reference: HEX to HSL

Common brand colors pre-converted:

```yaml
Blue:
  #3B82F6 → 217 91% 60%
  #2563EB → 221 83% 53%
  #1D4ED8 → 224 76% 48%

Indigo:
  #6366F1 → 239 84% 67%
  #4F46E5 → 245 75% 59%

Purple:
  #8B5CF6 → 258 90% 66%
  #7C3AED → 262 83% 58%

Green:
  #22C55E → 142 71% 45%
  #16A34A → 142 76% 36%

Red:
  #EF4444 → 0 84% 60%
  #DC2626 → 0 72% 51%

Orange:
  #F97316 → 25 95% 53%
  #EA580C → 21 90% 48%

Gray (Slate):
  #F8FAFC → 210 40% 98%
  #64748B → 215 16% 47%
  #0F172A → 222 47% 11%
```
