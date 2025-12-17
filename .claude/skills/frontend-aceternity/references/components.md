# Aceternity Components Reference

Complete reference for all Aceternity UI components with props and usage patterns.

## Installation

```bash
# Install specific component
npx aceternity-ui@latest add [component-name]

# Required dependencies
npm install framer-motion clsx tailwind-merge
```

---

## Backgrounds

### spotlight

Dramatic spotlight effect following cursor or fixed position.

```yaml
Props:
  className: string     # Container positioning
  fill: string          # Light color (default: "white")

Install: npx aceternity-ui@latest add spotlight
```

```tsx
'use client'
import { Spotlight } from '@/components/ui/spotlight'

<div className="relative h-screen bg-black overflow-hidden">
  <Spotlight className="-top-40 left-0 md:left-60" fill="white" />
  <Spotlight className="top-10 left-full" fill="purple" />
  <div className="relative z-10">{/* content */}</div>
</div>
```

**Customization:**
```tsx
// Multiple spotlights with different colors
<Spotlight fill="white" />
<Spotlight fill="blue" className="left-80" />
<Spotlight fill="purple" className="left-1/2" />
```

---

### aurora-background

Animated gradient aurora effect.

```yaml
Props:
  children: ReactNode   # Content to display over aurora
  showRadialGradient: boolean  # Add radial gradient overlay (default: true)

Install: npx aceternity-ui@latest add aurora-background
```

```tsx
'use client'
import { AuroraBackground } from '@/components/ui/aurora-background'

<AuroraBackground>
  <div className="relative z-10">
    <h1>Your content here</h1>
  </div>
</AuroraBackground>
```

**Customization (in component file):**
```tsx
// Edit aurora colors in the component's CSS variables
--aurora-1: linear-gradient(#18CCFC, #6344F5);
--aurora-2: linear-gradient(#AE48FF, #6344F5);
```

---

### background-beams

Animated beam lines radiating from center.

```yaml
Props:
  className: string     # Additional classes

Install: npx aceternity-ui@latest add background-beams
```

```tsx
'use client'
import { BackgroundBeams } from '@/components/ui/background-beams'

<div className="relative h-screen bg-neutral-950">
  <div className="relative z-10">{/* content */}</div>
  <BackgroundBeams />
</div>
```

---

### wavy-background

Animated wavy lines background.

```yaml
Props:
  children: ReactNode
  className: string
  containerClassName: string
  colors: string[]      # Wave colors
  waveWidth: number     # Wave thickness
  blur: number          # Blur amount (default: 10)
  speed: "slow" | "fast"
  waveOpacity: number   # 0-1

Install: npx aceternity-ui@latest add wavy-background
```

```tsx
'use client'
import { WavyBackground } from '@/components/ui/wavy-background'

<WavyBackground
  colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9"]}
  blur={10}
  speed="fast"
  waveOpacity={0.5}
>
  <h1>Content</h1>
</WavyBackground>
```

---

### meteors

Falling meteor animation effect.

```yaml
Props:
  number: number        # Count of meteors (default: 20)

Install: npx aceternity-ui@latest add meteors
```

```tsx
'use client'
import { Meteors } from '@/components/ui/meteors'

<div className="relative">
  <Meteors number={30} />
  <div className="relative z-10">{/* content */}</div>
</div>
```

**Performance:** Reduce count on mobile
```tsx
const meteorCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 30
```

---

### sparkles

Twinkling sparkle particles.

```yaml
Props:
  id: string
  className: string
  background: string    # Container background
  minSize: number       # Min particle size (default: 0.4)
  maxSize: number       # Max particle size (default: 1)
  particleDensity: number  # Particles count (default: 100)
  particleColor: string    # Color (default: "#FFF")
  speed: number         # Animation speed

Install: npx aceternity-ui@latest add sparkles
```

```tsx
'use client'
import { SparklesCore } from '@/components/ui/sparkles'

<div className="relative h-40">
  <SparklesCore
    background="transparent"
    minSize={0.6}
    maxSize={1.4}
    particleDensity={100}
    particleColor="#FFFFFF"
  />
</div>
```

---

## Cards

### 3d-card

Card with 3D tilt effect on hover.

```yaml
Components:
  CardContainer   # Wrapper with perspective
  CardBody        # Card content container
  CardItem        # Individual 3D layer

CardItem Props:
  translateX: number | string
  translateY: number | string
  translateZ: number | string   # Depth (higher = closer)
  rotateX: number
  rotateY: number
  rotateZ: number
  as: ElementType               # HTML element type

Install: npx aceternity-ui@latest add 3d-card
```

```tsx
'use client'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'

<CardContainer className="inter-var">
  <CardBody className="bg-gray-50 dark:bg-black rounded-xl p-6 border">
    <CardItem translateZ="50" className="text-xl font-bold">
      Title
    </CardItem>
    <CardItem translateZ="60" className="text-sm mt-2">
      Description text here
    </CardItem>
    <CardItem translateZ="100" className="w-full mt-4">
      <img src="/image.png" className="rounded-xl" />
    </CardItem>
    <CardItem translateZ={20} as="button" className="mt-4 px-4 py-2">
      Click me
    </CardItem>
  </CardBody>
</CardContainer>
```

---

### infinite-moving-cards

Auto-scrolling testimonial/logo carousel.

```yaml
Props:
  items: { quote: string, name: string, title: string }[]
  direction: "left" | "right"   # Scroll direction
  speed: "fast" | "normal" | "slow"
  pauseOnHover: boolean         # Pause on mouse over

Install: npx aceternity-ui@latest add infinite-moving-cards
```

```tsx
'use client'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'

const testimonials = [
  { quote: "Amazing product!", name: "John", title: "CEO" },
  { quote: "Changed my workflow", name: "Jane", title: "Designer" },
]

<InfiniteMovingCards
  items={testimonials}
  direction="right"
  speed="slow"
  pauseOnHover={true}
/>
```

---

### focus-cards

Cards that expand/focus on hover.

```yaml
Props:
  cards: { title: string, src: string }[]

Install: npx aceternity-ui@latest add focus-cards
```

```tsx
'use client'
import { FocusCards } from '@/components/ui/focus-cards'

const cards = [
  { title: "Card 1", src: "/img1.jpg" },
  { title: "Card 2", src: "/img2.jpg" },
]

<FocusCards cards={cards} />
```

---

### wobble-card

Card with wobble/jiggle effect on hover.

```yaml
Props:
  children: ReactNode
  containerClassName: string

Install: npx aceternity-ui@latest add wobble-card
```

```tsx
'use client'
import { WobbleCard } from '@/components/ui/wobble-card'

<WobbleCard containerClassName="bg-pink-800 min-h-[300px]">
  <h2>Wobble content</h2>
</WobbleCard>
```

---

## Text Effects

### text-generate-effect

Text that types/generates character by character.

```yaml
Props:
  words: string         # Text to animate
  className: string
  filter: boolean       # Apply blur filter (default: true)
  duration: number      # Animation duration (default: 0.5)

Install: npx aceternity-ui@latest add text-generate-effect
```

```tsx
'use client'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'

<TextGenerateEffect
  words="Your amazing headline here"
  duration={0.8}
/>
```

---

### flip-words

Words that flip/rotate through a list.

```yaml
Props:
  words: string[]       # Array of words to cycle
  duration: number      # Time per word in ms (default: 3000)
  className: string

Install: npx aceternity-ui@latest add flip-words
```

```tsx
'use client'
import { FlipWords } from '@/components/ui/flip-words'

<h1>
  Build <FlipWords words={["faster", "better", "smarter"]} /> apps
</h1>
```

---

### typewriter-effect

Classic typewriter animation.

```yaml
Props:
  words: { text: string, className?: string }[]
  className: string
  cursorClassName: string

Install: npx aceternity-ui@latest add typewriter-effect
```

```tsx
'use client'
import { TypewriterEffect } from '@/components/ui/typewriter-effect'

const words = [
  { text: "Build" },
  { text: "awesome" },
  { text: "apps", className: "text-blue-500" },
]

<TypewriterEffect words={words} />
```

---

### hero-highlight

Text with animated highlight/underline.

```yaml
Props:
  children: ReactNode
  className: string
  containerClassName: string

Install: npx aceternity-ui@latest add hero-highlight
```

```tsx
'use client'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'

<HeroHighlight>
  <h1>
    Make your <Highlight>ideas come alive</Highlight>
  </h1>
</HeroHighlight>
```

---

## Navigation

### floating-navbar

Navbar that floats and hides on scroll.

```yaml
Props:
  navItems: { name: string, link: string, icon?: ReactNode }[]
  className: string

Install: npx aceternity-ui@latest add floating-navbar
```

```tsx
'use client'
import { FloatingNav } from '@/components/ui/floating-navbar'

const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
]

<FloatingNav navItems={navItems} />
```

---

### floating-dock

macOS-style dock with magnification.

```yaml
Props:
  items: { title: string, icon: ReactNode, href: string }[]
  desktopClassName: string
  mobileClassName: string

Install: npx aceternity-ui@latest add floating-dock
```

```tsx
'use client'
import { FloatingDock } from '@/components/ui/floating-dock'

const items = [
  { title: "Home", icon: <HomeIcon />, href: "/" },
  { title: "Settings", icon: <SettingsIcon />, href: "/settings" },
]

<FloatingDock items={items} />
```

---

## Special Effects

### lamp

Dramatic lamp/spotlight reveal effect.

```yaml
Components:
  LampContainer   # Wrapper
  LampDemo        # Example implementation

Install: npx aceternity-ui@latest add lamp
```

```tsx
'use client'
import { LampContainer } from '@/components/ui/lamp'

<LampContainer>
  <h1 className="text-4xl font-bold text-white">
    Your headline
  </h1>
</LampContainer>
```

---

### tracing-beam

Scroll-tracking beam along content.

```yaml
Props:
  children: ReactNode
  className: string

Install: npx aceternity-ui@latest add tracing-beam
```

```tsx
'use client'
import { TracingBeam } from '@/components/ui/tracing-beam'

<TracingBeam>
  <div className="max-w-2xl mx-auto">
    {/* Long scrollable content */}
  </div>
</TracingBeam>
```

---

### globe

Interactive 3D globe with arcs.

```yaml
Props:
  config: GlobeConfig   # Globe configuration object

Install: npx aceternity-ui@latest add globe

Note: Heavy component, always lazy load!
```

```tsx
'use client'
import dynamic from 'next/dynamic'

const Globe = dynamic(() => import('@/components/ui/globe'), { ssr: false })

<Globe config={{
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  polygonColor: "rgba(255,255,255,0.7)",
  arcTime: 1000,
  arcLength: 0.9,
}} />
```

---

### timeline

Vertical timeline with scroll animations.

```yaml
Props:
  data: { title: string, content: ReactNode }[]

Install: npx aceternity-ui@latest add timeline
```

```tsx
'use client'
import { Timeline } from '@/components/ui/timeline'

const data = [
  { title: "2024", content: <p>Something happened</p> },
  { title: "2023", content: <p>Earlier event</p> },
]

<Timeline data={data} />
```

---

## Buttons

### moving-border

Button with animated moving gradient border.

```yaml
Props:
  children: ReactNode
  duration: number        # Animation duration in ms
  borderRadius: string
  containerClassName: string
  borderClassName: string
  className: string
  as: ElementType         # "button" | "a" | etc.

Install: npx aceternity-ui@latest add moving-border
```

```tsx
'use client'
import { Button } from '@/components/ui/moving-border'

<Button
  duration={3000}
  borderRadius="1.75rem"
  className="bg-black text-white"
>
  Click me
</Button>
```

---

### hover-border-gradient

Button with gradient border on hover.

```yaml
Props:
  children: ReactNode
  containerClassName: string
  className: string
  as: ElementType
  duration: number

Install: npx aceternity-ui@latest add hover-border-gradient
```

```tsx
'use client'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

<HoverBorderGradient
  containerClassName="rounded-full"
  className="bg-black text-white px-4 py-2"
>
  Get Started
</HoverBorderGradient>
```

---

## SSR & Hydration Notes

All Aceternity components require `'use client'` directive.

```tsx
// Always add at top of file
'use client'

// For heavy components, use dynamic import
import dynamic from 'next/dynamic'

const Globe = dynamic(() => import('@/components/ui/globe'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-black" />
})
```

**Common hydration fixes:**
```tsx
// Wrap browser-only code
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
```

---

## Accessibility

```tsx
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Disable animations if preferred
<motion.div
  animate={prefersReducedMotion ? {} : { opacity: 1 }}
/>
```

For decorative backgrounds, add `aria-hidden="true"`:
```tsx
<div aria-hidden="true">
  <Spotlight />
</div>
```
