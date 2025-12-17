# Magic UI Components Reference

Complete reference for Magic UI components with props and customization.

## Installation

```bash
# Install specific component
npx magicui-cli@latest add [component-name]

# Required dependencies
npm install framer-motion clsx tailwind-merge
```

---

## Text Animations

### number-ticker

Animated counting number display.

```yaml
Props:
  value: number           # Target value to animate to
  direction: "up" | "down"  # Count direction (default: "up")
  delay: number           # Delay before starting (seconds)
  className: string       # Additional styles
  decimalPlaces: number   # Decimal precision (default: 0)

Install: npx magicui-cli@latest add number-ticker
```

```tsx
'use client'
import NumberTicker from '@/components/magicui/number-ticker'

// Basic usage
<NumberTicker value={10000} />

// With formatting
<div className="flex items-baseline gap-1">
  <span className="text-sm">$</span>
  <NumberTicker value={1234567} className="text-4xl font-bold" />
</div>

// Countdown
<NumberTicker value={0} direction="down" />

// With decimals
<NumberTicker value={99.99} decimalPlaces={2} />
```

**Customization:**
```tsx
// Speed via CSS variable
<NumberTicker
  value={5000}
  className="[--duration:3s]"  // Slower animation
/>
```

---

### typing-animation

Typewriter effect for text.

```yaml
Props:
  text: string            # Text to type
  duration: number        # Time per character (ms, default: 100)
  className: string
  delay: number           # Start delay (ms)

Install: npx magicui-cli@latest add typing-animation
```

```tsx
'use client'
import TypingAnimation from '@/components/magicui/typing-animation'

<TypingAnimation
  text="Welcome to our platform"
  duration={50}
  className="text-4xl font-bold"
/>
```

---

### word-rotate

Rotating words with animation.

```yaml
Props:
  words: string[]         # Array of words to rotate
  duration: number        # Time per word (ms, default: 2500)
  className: string
  framerProps: object     # Custom framer-motion props

Install: npx magicui-cli@latest add word-rotate
```

```tsx
'use client'
import WordRotate from '@/components/magicui/word-rotate'

<h1 className="text-4xl">
  Build{' '}
  <WordRotate
    words={["faster", "better", "smarter", "together"]}
    duration={3000}
    className="text-primary"
  />
  {' '}apps
</h1>
```

---

### flip-text

Text that flips in letter by letter.

```yaml
Props:
  word: string            # Text to display
  duration: number        # Animation duration (default: 0.5)
  delayMultiple: number   # Delay between letters (default: 0.08)
  className: string

Install: npx magicui-cli@latest add flip-text
```

```tsx
'use client'
import FlipText from '@/components/magicui/flip-text'

<FlipText
  word="MAGIC"
  className="text-6xl font-bold"
/>
```

---

### morphing-text

Text that morphs between different strings.

```yaml
Props:
  texts: string[]         # Array of texts to morph between
  className: string

Install: npx magicui-cli@latest add morphing-text
```

```tsx
'use client'
import MorphingText from '@/components/magicui/morphing-text'

<MorphingText
  texts={["Innovation", "Creativity", "Excellence"]}
/>
```

---

## Buttons

### shimmer-button

Button with shimmer effect.

```yaml
Props:
  children: ReactNode
  className: string
  shimmerColor: string    # Shimmer color (default: "#ffffff")
  shimmerSize: string     # Shimmer width (default: "0.1em")
  borderRadius: string    # Corner radius (default: "100px")
  background: string      # Button background

Install: npx magicui-cli@latest add shimmer-button
```

```tsx
'use client'
import ShimmerButton from '@/components/magicui/shimmer-button'

<ShimmerButton>
  Get Started
</ShimmerButton>

// Custom colors
<ShimmerButton
  shimmerColor="#a855f7"
  background="linear-gradient(to right, #6366f1, #8b5cf6)"
  className="px-8 py-3"
>
  Premium Feature
</ShimmerButton>
```

---

### rainbow-button

Button with animated rainbow border.

```yaml
Props:
  children: ReactNode
  className: string

Install: npx magicui-cli@latest add rainbow-button
```

```tsx
'use client'
import RainbowButton from '@/components/magicui/rainbow-button'

<RainbowButton className="px-8 py-3">
  Sign Up Free
</RainbowButton>
```

---

### pulsating-button

Button with pulse animation.

```yaml
Props:
  children: ReactNode
  className: string
  pulseColor: string      # Pulse color (default: "#0096ff")
  duration: string        # Animation duration (default: "1.5s")

Install: npx magicui-cli@latest add pulsating-button
```

```tsx
'use client'
import PulsatingButton from '@/components/magicui/pulsating-button'

<PulsatingButton pulseColor="#22c55e">
  Live Now
</PulsatingButton>
```

---

### shiny-button

Button with shine effect on hover.

```yaml
Props:
  children: ReactNode
  className: string

Install: npx magicui-cli@latest add shiny-button
```

```tsx
'use client'
import ShinyButton from '@/components/magicui/shiny-button'

<ShinyButton>
  Upgrade Plan
</ShinyButton>
```

---

## Layout Components

### marquee

Infinite scrolling content.

```yaml
Props:
  children: ReactNode
  className: string
  reverse: boolean        # Reverse direction
  pauseOnHover: boolean   # Pause on mouse hover (default: false)
  vertical: boolean       # Vertical scroll (default: false)
  repeat: number          # Times to repeat content (default: 4)

Install: npx magicui-cli@latest add marquee
```

```tsx
'use client'
import Marquee from '@/components/magicui/marquee'

// Logo wall
<Marquee pauseOnHover className="[--duration:30s]">
  {logos.map(logo => (
    <img
      key={logo.name}
      src={logo.src}
      className="h-12 mx-8"
      alt={logo.name}
    />
  ))}
</Marquee>

// Double row (opposite directions)
<div className="space-y-4">
  <Marquee className="[--duration:40s]">
    {logosRow1.map(l => <Logo key={l.name} {...l} />)}
  </Marquee>
  <Marquee reverse className="[--duration:40s]">
    {logosRow2.map(l => <Logo key={l.name} {...l} />)}
  </Marquee>
</div>

// Vertical testimonials
<Marquee vertical className="h-[400px] [--duration:20s]">
  {testimonials.map(t => <TestimonialCard key={t.id} {...t} />)}
</Marquee>
```

**Customization:**
```css
/* Control speed via CSS variable */
.marquee {
  --duration: 40s;  /* Slower */
  --gap: 2rem;      /* Gap between items */
}
```

---

### bento-grid

Grid layout for feature showcases.

```yaml
Components:
  BentoGrid       # Container
  BentoCard       # Individual card

BentoCard Props:
  name: string            # Card title
  description: string     # Card description
  className: string
  background: ReactNode   # Background element
  Icon: ComponentType     # Icon component
  href: string            # Link destination
  cta: string             # Call-to-action text

Install: npx magicui-cli@latest add bento-grid
```

```tsx
'use client'
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid'
import { FileIcon, GlobeIcon, InputIcon } from 'lucide-react'

const features = [
  {
    Icon: FileIcon,
    name: "Save files",
    description: "Automatically save and sync your files.",
    className: "col-span-3 lg:col-span-1",
    href: "/features/files",
    cta: "Learn more",
    background: <img src="/grid-bg.png" className="opacity-60" />,
  },
  {
    Icon: GlobeIcon,
    name: "Global CDN",
    description: "Deliver content from 300+ edge locations.",
    className: "col-span-3 lg:col-span-2",
    href: "/features/cdn",
    cta: "Explore",
    background: <GlobeAnimation />,
  },
]

<BentoGrid className="lg:grid-rows-3">
  {features.map(feature => (
    <BentoCard key={feature.name} {...feature} />
  ))}
</BentoGrid>
```

---

### animated-list

List with staggered entrance animation.

```yaml
Props:
  children: ReactNode
  className: string
  delay: number           # Delay between items (ms, default: 1000)

Install: npx magicui-cli@latest add animated-list
```

```tsx
'use client'
import AnimatedList from '@/components/magicui/animated-list'

<AnimatedList delay={500}>
  {notifications.map(notification => (
    <NotificationCard key={notification.id} {...notification} />
  ))}
</AnimatedList>
```

---

### dock

macOS-style dock with magnification.

```yaml
Props:
  children: ReactNode     # DockIcon components
  className: string
  direction: "top" | "middle" | "bottom"
  magnification: number   # Magnification amount (default: 60)
  distance: number        # Mouse distance for effect (default: 140)

Install: npx magicui-cli@latest add dock
```

```tsx
'use client'
import { Dock, DockIcon } from '@/components/magicui/dock'
import { Home, Search, Settings } from 'lucide-react'

<Dock magnification={70} distance={100}>
  <DockIcon>
    <Home className="h-6 w-6" />
  </DockIcon>
  <DockIcon>
    <Search className="h-6 w-6" />
  </DockIcon>
  <DockIcon>
    <Settings className="h-6 w-6" />
  </DockIcon>
</Dock>
```

---

### file-tree

Animated file tree structure.

```yaml
Props:
  elements: TreeElement[] # Tree structure

TreeElement:
  id: string
  name: string
  isSelectable?: boolean
  children?: TreeElement[]

Install: npx magicui-cli@latest add file-tree
```

```tsx
'use client'
import { FileTree } from '@/components/magicui/file-tree'

const files = [
  {
    id: "1",
    name: "src",
    children: [
      { id: "2", name: "components", children: [
        { id: "3", name: "Button.tsx", isSelectable: true },
        { id: "4", name: "Card.tsx", isSelectable: true },
      ]},
      { id: "5", name: "lib", children: [
        { id: "6", name: "utils.ts", isSelectable: true },
      ]},
    ],
  },
]

<FileTree elements={files} />
```

---

## Device Mockups

### safari

Safari browser mockup.

```yaml
Props:
  url: string             # URL bar text
  src: string             # Screenshot image
  width: number           # Width (default: 1203)
  height: number          # Height (default: 753)
  className: string

Install: npx magicui-cli@latest add safari
```

```tsx
'use client'
import Safari from '@/components/magicui/safari'

<Safari
  url="yourapp.com/dashboard"
  src="/screenshots/dashboard.png"
  className="w-full max-w-4xl mx-auto"
/>
```

---

### iphone-15-pro

iPhone 15 Pro mockup.

```yaml
Props:
  src: string             # Screenshot image or video
  className: string
  width: number           # Default: 433
  height: number          # Default: 882

Install: npx magicui-cli@latest add iphone-15-pro
```

```tsx
'use client'
import Iphone15Pro from '@/components/magicui/iphone-15-pro'

<Iphone15Pro
  src="/screenshots/mobile-app.png"
  className="mx-auto"
/>

// With video
<Iphone15Pro
  src="/videos/app-demo.mp4"
/>
```

---

### android

Android device mockup.

```yaml
Props:
  src: string             # Screenshot image
  className: string

Install: npx magicui-cli@latest add android
```

```tsx
'use client'
import Android from '@/components/magicui/android'

<Android src="/screenshots/android-app.png" />
```

---

## Background Patterns

### dot-pattern

Dot grid background.

```yaml
Props:
  width: number           # Dot spacing width
  height: number          # Dot spacing height
  cx: number              # Dot x offset
  cy: number              # Dot y offset
  cr: number              # Dot radius
  className: string

Install: npx magicui-cli@latest add dot-pattern
```

```tsx
'use client'
import DotPattern from '@/components/magicui/dot-pattern'

<div className="relative h-screen">
  <DotPattern
    className="absolute inset-0 opacity-50"
    width={20}
    height={20}
    cr={1}
  />
  <div className="relative z-10">Content</div>
</div>
```

---

### grid-pattern

Grid lines background.

```yaml
Props:
  width: number           # Cell width
  height: number          # Cell height
  x: number               # X offset
  y: number               # Y offset
  strokeDasharray: string # Line style
  className: string

Install: npx magicui-cli@latest add grid-pattern
```

```tsx
'use client'
import GridPattern from '@/components/magicui/grid-pattern'

<div className="relative">
  <GridPattern
    width={40}
    height={40}
    className="opacity-30"
  />
</div>
```

---

### retro-grid

Retro perspective grid.

```yaml
Props:
  className: string
  angle: number           # Grid angle (default: 65)

Install: npx magicui-cli@latest add retro-grid
```

```tsx
'use client'
import RetroGrid from '@/components/magicui/retro-grid'

<div className="relative h-[500px] overflow-hidden">
  <RetroGrid angle={75} />
  <div className="relative z-10">Hero content</div>
</div>
```

---

## Effects

### orbiting-circles

Animated orbiting elements.

```yaml
Props:
  children: ReactNode     # Element to orbit
  radius: number          # Orbit radius
  duration: number        # Rotation duration (seconds)
  delay: number           # Start delay
  reverse: boolean        # Reverse direction
  className: string

Install: npx magicui-cli@latest add orbiting-circles
```

```tsx
'use client'
import OrbitingCircles from '@/components/magicui/orbiting-circles'
import { FaGithub, FaDiscord, FaSlack } from 'react-icons/fa'

<div className="relative h-[400px] w-[400px]">
  {/* Center element */}
  <div className="absolute inset-0 flex items-center justify-center">
    <Logo />
  </div>

  {/* Orbiting icons */}
  <OrbitingCircles radius={100} duration={20}>
    <FaGithub className="h-8 w-8" />
  </OrbitingCircles>
  <OrbitingCircles radius={100} duration={20} delay={10}>
    <FaDiscord className="h-8 w-8" />
  </OrbitingCircles>
  <OrbitingCircles radius={160} duration={30} reverse>
    <FaSlack className="h-8 w-8" />
  </OrbitingCircles>
</div>
```

---

### animated-beam

Animated connection lines.

```yaml
Props:
  containerRef: RefObject # Container element ref
  fromRef: RefObject      # Start element ref
  toRef: RefObject        # End element ref
  curvature: number       # Line curve amount
  duration: number        # Animation duration
  className: string

Install: npx magicui-cli@latest add animated-beam
```

```tsx
'use client'
import { useRef } from 'react'
import AnimatedBeam from '@/components/magicui/animated-beam'

function IntegrationDiagram() {
  const containerRef = useRef(null)
  const sourceRef = useRef(null)
  const targetRef = useRef(null)

  return (
    <div ref={containerRef} className="relative h-[300px]">
      <div ref={sourceRef} className="absolute left-10 top-1/2">
        <UserIcon />
      </div>
      <div ref={targetRef} className="absolute right-10 top-1/2">
        <ServerIcon />
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={sourceRef}
        toRef={targetRef}
      />
    </div>
  )
}
```

---

### border-beam

Animated border effect.

```yaml
Props:
  size: number            # Beam size (default: 200)
  duration: number        # Animation duration (seconds)
  delay: number           # Start delay
  borderWidth: number     # Border thickness
  colorFrom: string       # Start color
  colorTo: string         # End color

Install: npx magicui-cli@latest add border-beam
```

```tsx
'use client'
import BorderBeam from '@/components/magicui/border-beam'

<div className="relative rounded-xl border p-8">
  <BorderBeam
    size={250}
    duration={12}
    colorFrom="#6366f1"
    colorTo="#a855f7"
  />
  <h3>Premium Feature</h3>
</div>
```

---

### confetti

Confetti celebration effect.

```yaml
Props:
  options: ConfettiOptions  # canvas-confetti options

Install: npx magicui-cli@latest add confetti
```

```tsx
'use client'
import Confetti from '@/components/magicui/confetti'

// Trigger on button click
function CelebrationButton() {
  const confettiRef = useRef(null)

  return (
    <>
      <Button onClick={() => confettiRef.current?.fire()}>
        Celebrate!
      </Button>
      <Confetti ref={confettiRef} />
    </>
  )
}
```

---

### globe

3D globe visualization.

```yaml
Props:
  config: GlobeConfig     # Globe configuration

Install: npx magicui-cli@latest add globe

Note: Heavy component, always use dynamic import!
```

```tsx
'use client'
import dynamic from 'next/dynamic'

const Globe = dynamic(
  () => import('@/components/magicui/globe'),
  { ssr: false, loading: () => <div className="h-[400px]" /> }
)

<Globe config={{
  width: 800,
  height: 800,
  markers: [
    { location: [40.7128, -74.006], size: 0.1 }, // NYC
    { location: [51.5074, -0.1278], size: 0.1 }, // London
  ],
}} />
```

---

## SSR & Hydration

All Magic UI components require `'use client'` directive.

```tsx
// Always add at top of file
'use client'

// For heavy components
import dynamic from 'next/dynamic'

const Globe = dynamic(
  () => import('@/components/magicui/globe'),
  { ssr: false }
)

const OrbitingCircles = dynamic(
  () => import('@/components/magicui/orbiting-circles'),
  { ssr: false }
)
```

**Mounted check pattern:**
```tsx
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return <Skeleton />
```

---

## Accessibility

```tsx
// Respect reduced motion
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Disable animations for a11y
<NumberTicker
  value={1000}
  className={prefersReducedMotion ? '[--duration:0s]' : ''}
/>

// Marquee pause
<Marquee pauseOnHover aria-label="Partner logos">
  {logos.map(l => <img key={l.name} src={l.src} alt={l.name} />)}
</Marquee>
```

---

## Troubleshooting

```yaml
"Component not found":
  → npx magicui-cli@latest add [name]
  → Check: components/magicui/[name].tsx exists

"Animation not playing":
  → Add 'use client' directive
  → Check framer-motion is installed

"Hydration mismatch":
  → Use dynamic(() => ..., { ssr: false })
  → Add mounted check pattern

"Marquee stuttering":
  → Reduce items in marquee
  → Use pauseOnHover
  → Check: [--duration:Xs] is reasonable

"NumberTicker wrong value":
  → Ensure value is number, not string
  → Check decimalPlaces for floats

"Safari/iPhone mockup distorted":
  → Match aspect ratio of src image
  → Use explicit width/height props
```
