# Lottie Patterns Reference

Complete API reference and production patterns for Lottie animations.

---

## Installation

```bash
# Recommended: DotLottie (smaller files, better performance)
npm install @lottiefiles/dotlottie-react

# Alternative: lottie-react (legacy JSON format)
npm install lottie-react
```

---

## DotLottieReact API

### Basic Props

```yaml
Props:
  src: string                    # Path to .lottie or .json file
  autoplay: boolean              # Start automatically (default: false)
  loop: boolean                  # Loop animation (default: false)
  speed: number                  # Playback speed (default: 1)
  direction: 1 | -1              # Forward or reverse
  mode: "forward" | "reverse" | "bounce" | "reverse-bounce"
  segment: [number, number]      # Play specific frame range [start, end]
  backgroundColor: string        # Canvas background color
  className: string
  style: CSSProperties
```

### Event Callbacks

```yaml
Events:
  onComplete: () => void         # Animation finished (non-looping)
  onLoop: () => void             # Loop completed
  onPlay: () => void             # Animation started
  onPause: () => void            # Animation paused
  onStop: () => void             # Animation stopped
  onFrame: (frame: number) => void  # Frame changed
  onLoad: () => void             # Animation loaded
  onError: (error: Error) => void   # Load error
```

### Instance Methods (via ref)

```yaml
Methods:
  dotLottie.play()               # Start playback
  dotLottie.pause()              # Pause playback
  dotLottie.stop()               # Stop and reset to frame 0
  dotLottie.setSpeed(speed)      # Change speed
  dotLottie.setDirection(dir)    # Change direction (1 or -1)
  dotLottie.goToAndPlay(frame)   # Jump to frame and play
  dotLottie.goToAndStop(frame)   # Jump to frame and stop
  dotLottie.setSegment(start, end)  # Set frame range
```

---

## Common Patterns

### Loading Spinner

```tsx
'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export function LoadingSpinner({ size = 48 }: { size?: number }) {
  return (
    <DotLottieReact
      src="/animations/loaders/spinner.lottie"
      autoplay
      loop
      style={{ width: size, height: size }}
    />
  )
}

// Usage
function LoadingState() {
  return (
    <div className="flex items-center justify-center h-64">
      <LoadingSpinner size={64} />
    </div>
  )
}
```

---

### Success/Error Feedback

Play once on trigger.

```tsx
'use client'
import { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

type FeedbackType = 'success' | 'error' | null

interface FeedbackAnimationProps {
  type: FeedbackType
  onComplete?: () => void
}

export function FeedbackAnimation({ type, onComplete }: FeedbackAnimationProps) {
  if (!type) return null

  const src = type === 'success'
    ? '/animations/feedback/success.lottie'
    : '/animations/feedback/error.lottie'

  return (
    <DotLottieReact
      src={src}
      autoplay
      loop={false}
      onComplete={onComplete}
      style={{ width: 120, height: 120 }}
    />
  )
}

// Usage in form submission
function SubmitForm() {
  const [feedback, setFeedback] = useState<FeedbackType>(null)

  const handleSubmit = async () => {
    try {
      await submitData()
      setFeedback('success')
    } catch {
      setFeedback('error')
    }
  }

  return (
    <div>
      {feedback ? (
        <FeedbackAnimation
          type={feedback}
          onComplete={() => setFeedback(null)}
        />
      ) : (
        <Button onClick={handleSubmit}>Submit</Button>
      )}
    </div>
  )
}
```

---

### Empty State

```tsx
'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <DotLottieReact
        src="/animations/empty-states/no-data.lottie"
        autoplay
        loop
        style={{ width: 200, height: 200 }}
      />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

// Usage
<EmptyState
  title="No results found"
  description="Try adjusting your search or filters"
  action={<Button variant="outline">Clear filters</Button>}
/>
```

---

### Loading Button

```tsx
'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Button } from '@/components/ui/button'

interface LoadingButtonProps {
  loading: boolean
  children: React.ReactNode
  onClick: () => void
}

export function LoadingButton({ loading, children, onClick }: LoadingButtonProps) {
  return (
    <Button onClick={onClick} disabled={loading}>
      {loading ? (
        <DotLottieReact
          src="/animations/loaders/button-spinner.lottie"
          autoplay
          loop
          style={{ width: 20, height: 20 }}
        />
      ) : (
        children
      )}
    </Button>
  )
}
```

---

### Controlled Playback

Full control over animation.

```tsx
'use client'
import { useState, useCallback } from 'react'
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'

export function ControlledAnimation() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance)
  }, [])

  const handlePlay = () => {
    dotLottie?.play()
    setIsPlaying(true)
  }

  const handlePause = () => {
    dotLottie?.pause()
    setIsPlaying(false)
  }

  const handleReset = () => {
    dotLottie?.stop()
    setIsPlaying(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <DotLottieReact
        src="/animations/demo.lottie"
        loop
        dotLottieRefCallback={dotLottieRefCallback}
        style={{ width: 200, height: 200 }}
      />
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={isPlaying ? handlePause : handlePlay}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
```

---

### Speed Control

```tsx
'use client'
import { useState, useCallback } from 'react'
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react'
import { Slider } from '@/components/ui/slider'

export function SpeedControlledAnimation() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)
  const [speed, setSpeed] = useState(1)

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance)
  }, [])

  const handleSpeedChange = (value: number[]) => {
    const newSpeed = value[0]
    setSpeed(newSpeed)
    dotLottie?.setSpeed(newSpeed)
  }

  return (
    <div className="flex flex-col items-center gap-4 w-64">
      <DotLottieReact
        src="/animations/demo.lottie"
        autoplay
        loop
        speed={speed}
        dotLottieRefCallback={dotLottieRefCallback}
        style={{ width: 150, height: 150 }}
      />
      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm">
          <span>Speed</span>
          <span>{speed}x</span>
        </div>
        <Slider
          value={[speed]}
          min={0.25}
          max={3}
          step={0.25}
          onValueChange={handleSpeedChange}
        />
      </div>
    </div>
  )
}
```

---

### Segment Play (Play Part of Animation)

```tsx
'use client'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

// Play only frames 0-30 of a longer animation
export function PartialAnimation() {
  return (
    <DotLottieReact
      src="/animations/multi-scene.lottie"
      autoplay
      loop
      segment={[0, 30]}  // Only play frames 0-30
      style={{ width: 150, height: 150 }}
    />
  )
}

// Different segments for different states
type AnimationState = 'intro' | 'loop' | 'outro'

const segments: Record<AnimationState, [number, number]> = {
  intro: [0, 30],
  loop: [30, 60],
  outro: [60, 90],
}

export function StatefulAnimation({ state }: { state: AnimationState }) {
  return (
    <DotLottieReact
      src="/animations/stateful.lottie"
      autoplay
      loop={state === 'loop'}
      segment={segments[state]}
      style={{ width: 150, height: 150 }}
    />
  )
}
```

---

### Pause When Not Visible

Performance optimization with IntersectionObserver.

```tsx
'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react'
import { useInView } from 'react-intersection-observer'

export function OptimizedLottie({ src }: { src: string }) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)
  const { ref, inView } = useInView({ threshold: 0.1 })

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance)
  }, [])

  useEffect(() => {
    if (dotLottie) {
      inView ? dotLottie.play() : dotLottie.pause()
    }
  }, [dotLottie, inView])

  return (
    <div ref={ref}>
      <DotLottieReact
        src={src}
        loop
        dotLottieRefCallback={dotLottieRefCallback}
        style={{ width: 200, height: 200 }}
      />
    </div>
  )
}

// Without react-intersection-observer
export function OptimizedLottieNative({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

  useEffect(() => {
    if (!containerRef.current || !dotLottie) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        entry.isIntersecting ? dotLottie.play() : dotLottie.pause()
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [dotLottie])

  return (
    <div ref={containerRef}>
      <DotLottieReact
        src={src}
        loop
        dotLottieRefCallback={setDotLottie}
        style={{ width: 200, height: 200 }}
      />
    </div>
  )
}
```

---

### Hover to Play

```tsx
'use client'
import { useState, useCallback } from 'react'
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react'

export function HoverAnimation({ src }: { src: string }) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance)
  }, [])

  return (
    <div
      onMouseEnter={() => dotLottie?.play()}
      onMouseLeave={() => {
        dotLottie?.pause()
        dotLottie?.goToAndStop(0)
      }}
      className="cursor-pointer"
    >
      <DotLottieReact
        src={src}
        loop
        dotLottieRefCallback={dotLottieRefCallback}
        style={{ width: 100, height: 100 }}
      />
    </div>
  )
}
```

---

### Click to Trigger

```tsx
'use client'
import { useState, useCallback } from 'react'
import { DotLottieReact, DotLottie } from '@lottiefiles/dotlottie-react'

export function ClickAnimation({ src }: { src: string }) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null)

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance)
  }, [])

  const handleClick = () => {
    dotLottie?.stop()
    dotLottie?.play()
  }

  return (
    <button onClick={handleClick} className="focus:outline-none">
      <DotLottieReact
        src={src}
        loop={false}
        dotLottieRefCallback={dotLottieRefCallback}
        style={{ width: 80, height: 80 }}
      />
    </button>
  )
}
```

---

## SSR & Hydration

### Dynamic Import

```tsx
'use client'
import dynamic from 'next/dynamic'

// Lazy load Lottie component
const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then(m => m.DotLottieReact),
  {
    ssr: false,
    loading: () => <div className="w-48 h-48 bg-muted animate-pulse rounded" />
  }
)

export function LazyLottie({ src }: { src: string }) {
  return (
    <DotLottieReact
      src={src}
      autoplay
      loop
      style={{ width: 200, height: 200 }}
    />
  )
}
```

### Mounted Check

```tsx
'use client'
import { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export function SafeLottie({ src }: { src: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-48 h-48 bg-muted animate-pulse rounded" />
  }

  return (
    <DotLottieReact
      src={src}
      autoplay
      loop
      style={{ width: 200, height: 200 }}
    />
  )
}
```

---

## Accessibility

```tsx
// Wrap in div with appropriate ARIA
<div
  role="img"
  aria-label="Loading animation"
  aria-busy="true"
>
  <DotLottieReact src="/spinner.lottie" autoplay loop />
</div>

// For decorative animations
<div aria-hidden="true">
  <DotLottieReact src="/decoration.lottie" autoplay loop />
</div>

// Respect reduced motion
'use client'
import { useReducedMotion } from 'framer-motion'

function AccessibleAnimation({ src }: { src: string }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <StaticFallback />
  }

  return <DotLottieReact src={src} autoplay loop />
}

// Or with native API
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

---

## Troubleshooting

```yaml
"Animation not loading":
  → Check file path (must be in public/)
  → Check file extension (.lottie or .json)
  → Check network tab for 404 errors
  → Verify file is valid (test on lottiefiles.com)

"Animation not playing":
  → Add autoplay={true}
  → Check loop={true} for continuous play
  → Verify file isn't corrupted

"Hydration mismatch":
  → Add 'use client' directive
  → Use dynamic(() => ..., { ssr: false })
  → Use mounted check pattern

"Animation too fast/slow":
  → Adjust speed prop: speed={0.5} for half speed
  → speed={2} for double speed

"Animation cuts off":
  → Check container dimensions
  → Use aspect-ratio to maintain proportions
  → Check animation artboard size in editor

"Memory issues with many animations":
  → Use IntersectionObserver to pause off-screen
  → Cleanup on unmount
  → Limit concurrent animations

"Animation doesn't loop smoothly":
  → Check animation file for seamless loop
  → Re-export from After Effects with loop
```

---

## File Formats

```yaml
.lottie:
  - Compressed binary format
  - Smaller file size
  - Recommended for production
  - Supports embedded assets

.json:
  - Legacy format
  - Larger file size
  - Human-readable
  - Compatible with older players
```

---

## Sources for Animations

```yaml
Free:
  LottieFiles:    https://lottiefiles.com/free-animations
  useAnimations:  https://useanimations.com
  Lordicon:       https://lordicon.com (icons)

Premium:
  LottieFiles:    https://lottiefiles.com/featured
  IconScout:      https://iconscout.com/lottie-animations

Create Your Own:
  After Effects + Bodymovin plugin
  Rive (export to Lottie)
  Lottie Creator: https://lottiefiles.com/lottie-creator
```
