# Color Palettes Reference

Complete shadcn/Tailwind theme examples ready to copy-paste.

---

## Complete shadcn Theme Template

Full set of CSS variables for light and dark modes.

```css
@layer base {
  :root {
    /* Base */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;

    /* Card */
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;

    /* Popover */
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;

    /* Primary - Your brand color */
    --primary: 239 84% 67%;
    --primary-foreground: 0 0% 98%;

    /* Secondary */
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    /* Muted */
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;

    /* Accent */
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;

    /* Destructive */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;

    /* Border, Input, Ring */
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 239 84% 67%;

    /* Radius */
    --radius: 0.5rem;

    /* Chart colors (optional) */
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    /* Base - inverted */
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    /* Card */
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;

    /* Popover */
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;

    /* Primary - same hue, adjusted lightness */
    --primary: 239 84% 67%;
    --primary-foreground: 240 10% 3.9%;

    /* Secondary */
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;

    /* Muted */
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;

    /* Accent */
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;

    /* Destructive */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    /* Border, Input, Ring */
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 239 84% 67%;
  }
}
```

---

## Pre-built Theme Palettes

### Indigo (Default shadcn)

```css
:root {
  --primary: 239 84% 67%;           /* #6366F1 */
  --primary-foreground: 0 0% 98%;
}
.dark {
  --primary: 239 84% 67%;
  --primary-foreground: 240 10% 3.9%;
}
```

### Blue (Professional)

```css
:root {
  --primary: 221 83% 53%;           /* #3B82F6 */
  --primary-foreground: 0 0% 98%;
}
.dark {
  --primary: 217 91% 60%;           /* #60A5FA */
  --primary-foreground: 222 47% 11%;
}
```

### Purple (Creative)

```css
:root {
  --primary: 262 83% 58%;           /* #8B5CF6 */
  --primary-foreground: 0 0% 98%;
}
.dark {
  --primary: 263 70% 50%;
  --primary-foreground: 0 0% 98%;
}
```

### Green (Nature/Finance)

```css
:root {
  --primary: 142 76% 36%;           /* #16A34A */
  --primary-foreground: 0 0% 98%;
}
.dark {
  --primary: 142 69% 58%;           /* #4ADE80 */
  --primary-foreground: 144 61% 10%;
}
```

### Orange (Energy/Food)

```css
:root {
  --primary: 24 95% 53%;            /* #F97316 */
  --primary-foreground: 0 0% 98%;
}
.dark {
  --primary: 21 90% 48%;
  --primary-foreground: 0 0% 98%;
}
```

### Rose (Fashion/Beauty)

```css
:root {
  --primary: 347 77% 50%;           /* #E11D48 */
  --primary-foreground: 0 0% 98%;
}
.dark {
  --primary: 347 77% 50%;
  --primary-foreground: 0 0% 98%;
}
```

### Slate (Neutral Modern)

```css
:root {
  --primary: 215 16% 47%;           /* #64748B */
  --primary-foreground: 0 0% 98%;
  --muted: 210 40% 96%;
  --border: 214 32% 91%;
}
.dark {
  --primary: 215 20% 65%;
  --muted: 217 33% 17%;
  --border: 217 33% 17%;
}
```

---

## Gray Scale Palettes

### Slate (Cool Blue-Gray)

```css
/* Best for: Tech, Modern apps */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --border: 214 32% 91%;
}
.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  --border: 217 33% 17%;
}
```

### Zinc (Cool Neutral)

```css
/* Best for: Professional, Enterprise */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 4%;
  --muted: 240 5% 96%;
  --muted-foreground: 240 4% 46%;
  --border: 240 6% 90%;
}
.dark {
  --background: 240 10% 4%;
  --foreground: 0 0% 98%;
  --muted: 240 4% 16%;
  --muted-foreground: 240 5% 65%;
  --border: 240 4% 16%;
}
```

### Neutral (Pure Gray)

```css
/* Best for: Minimal, Content-focused */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  --border: 0 0% 90%;
}
.dark {
  --background: 0 0% 9%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 64%;
  --border: 0 0% 15%;
}
```

### Stone (Warm Brown-Gray)

```css
/* Best for: Organic, Lifestyle, E-commerce */
:root {
  --background: 0 0% 100%;
  --foreground: 20 14% 4%;
  --muted: 60 5% 96%;
  --muted-foreground: 25 5% 45%;
  --border: 20 6% 90%;
}
.dark {
  --background: 20 14% 4%;
  --foreground: 60 9% 98%;
  --muted: 12 6% 15%;
  --muted-foreground: 24 5% 64%;
  --border: 12 6% 15%;
}
```

---

## Tailwind Config Extension

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom semantic colors
        success: {
          DEFAULT: 'hsl(142 76% 36%)',
          foreground: 'hsl(0 0% 98%)',
        },
        warning: {
          DEFAULT: 'hsl(38 92% 50%)',
          foreground: 'hsl(0 0% 9%)',
        },
        info: {
          DEFAULT: 'hsl(199 89% 48%)',
          foreground: 'hsl(0 0% 98%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

## OKLCH Modern Palette

OKLCH provides perceptually uniform colors — better for generating consistent palettes.

```css
:root {
  /* Primary in OKLCH */
  --primary: oklch(0.65 0.24 264);     /* Indigo */
  --primary-light: oklch(0.75 0.20 264);
  --primary-dark: oklch(0.55 0.28 264);

  /* Semantic */
  --success: oklch(0.65 0.19 145);     /* Green */
  --warning: oklch(0.75 0.18 85);      /* Amber */
  --error: oklch(0.55 0.22 27);        /* Red */
  --info: oklch(0.65 0.19 230);        /* Blue */
}

.dark {
  --primary: oklch(0.70 0.22 264);     /* Lighter for dark bg */
  --primary-light: oklch(0.80 0.18 264);
  --primary-dark: oklch(0.60 0.26 264);
}
```

**OKLCH Format:** `oklch(L C H)`
- **L** (Lightness): 0-1 (0 = black, 1 = white)
- **C** (Chroma): 0-0.4 (saturation intensity)
- **H** (Hue): 0-360 (color wheel angle)

**Generate shades by adjusting L:**
```css
--color-50:  oklch(0.97 0.02 264);
--color-100: oklch(0.93 0.04 264);
--color-200: oklch(0.87 0.08 264);
--color-300: oklch(0.77 0.14 264);
--color-400: oklch(0.68 0.19 264);
--color-500: oklch(0.59 0.24 264);  /* Base */
--color-600: oklch(0.50 0.24 264);
--color-700: oklch(0.42 0.22 264);
--color-800: oklch(0.35 0.18 264);
--color-900: oklch(0.27 0.14 264);
--color-950: oklch(0.18 0.10 264);
```

---

## Dark Mode Inversion Rules

```yaml
Light → Dark transformations:

Background:
  light: L=100%  →  dark: L=4-10%

Foreground (text):
  light: L=4-10% →  dark: L=95-98%

Primary:
  Keep same hue (H)
  Increase lightness slightly for visibility
  Reduce chroma slightly to avoid vibration

Muted/Secondary:
  light: L=95%   →  dark: L=15-20%

Border:
  light: L=90%   →  dark: L=15-20%

Destructive:
  Reduce lightness in dark mode (less aggressive)
```

**Formula:**
```
dark_L = 100 - light_L (roughly, with adjustments)
```
