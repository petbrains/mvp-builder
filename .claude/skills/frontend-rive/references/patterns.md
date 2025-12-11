# Rive Patterns Reference

Production-ready patterns for interactive Rive animations.

---

## Setup

### Installation

```bash
npm install @rive-app/react-canvas
```

### Basic Structure

```tsx
'use client'

import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

export function RiveAnimation() {
  const { rive, RiveComponent } = useRive({
    src: '/animations/example.riv',  // Public folder
    stateMachines: 'StateMachineName',
    autoplay: true,
  })

  return <RiveComponent className="w-64 h-64" />
}
```

---

## Interactive Patterns

### Toggle Switch

Animated toggle that syncs with React state.

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

interface RiveToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

export function RiveToggle({ checked = false, onChange, disabled }: RiveToggleProps) {
  const [isOn, setIsOn] = useState(checked)

  const { rive, RiveComponent } = useRive({
    src: '/animations/toggle.riv',
    stateMachines: 'Toggle',
    autoplay: true,
  })

  // Get the boolean input from state machine
  const isOnInput = useStateMachineInput(rive, 'Toggle', 'isOn')

  // Sync Rive input with React state
  useEffect(() => {
    if (isOnInput) {
      isOnInput.value = isOn
    }
  }, [isOn, isOnInput])

  // Sync with external checked prop
  useEffect(() => {
    setIsOn(checked)
  }, [checked])

  const handleClick = () => {
    if (disabled) return
    const newValue = !isOn
    setIsOn(newValue)
    onChange?.(newValue)
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="w-16 h-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      role="switch"
      aria-checked={isOn}
    >
      <RiveComponent />
    </button>
  )
}
```

### Animated Checkbox

```tsx
'use client'

import { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { useController, Control } from 'react-hook-form'

interface RiveCheckboxProps {
  name: string
  control: Control<any>
  label: string
}

export function RiveCheckbox({ name, control, label }: RiveCheckboxProps) {
  const { field } = useController({ name, control, defaultValue: false })

  const { rive, RiveComponent } = useRive({
    src: '/animations/checkbox.riv',
    stateMachines: 'Checkbox',
    autoplay: true,
  })

  const checkedInput = useStateMachineInput(rive, 'Checkbox', 'checked')

  useEffect(() => {
    if (checkedInput) {
      checkedInput.value = field.value
    }
  }, [field.value, checkedInput])

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => field.onChange(!field.value)}
        className="w-6 h-6"
        role="checkbox"
        aria-checked={field.value}
      >
        <RiveComponent />
      </button>
      <span>{label}</span>
    </label>
  )
}

// Usage with React Hook Form
function FormExample() {
  const { control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <RiveCheckbox
        name="acceptTerms"
        control={control}
        label="I accept the terms"
      />
    </form>
  )
}
```

### Progress Indicator

Number input driven by external value.

```tsx
'use client'

import { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

interface RiveProgressProps {
  value: number      // 0-100
  size?: number
  className?: string
}

export function RiveProgress({ value, size = 100, className }: RiveProgressProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/progress.riv',
    stateMachines: 'Progress',
    autoplay: true,
  })

  const progressInput = useStateMachineInput(rive, 'Progress', 'progress')

  useEffect(() => {
    if (progressInput) {
      // Clamp value between 0 and 100
      progressInput.value = Math.max(0, Math.min(100, value))
    }
  }, [value, progressInput])

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <RiveComponent />
    </div>
  )
}

// Usage
function UploadProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 10)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return <RiveProgress value={progress} size={120} />
}
```

### Notification Bell with Count

Combines number input (count) with trigger (ring animation).

```tsx
'use client'

import { useEffect, useCallback } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

interface NotificationBellProps {
  count: number
  onRing?: () => void
}

export function NotificationBell({ count, onRing }: NotificationBellProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/notification-bell.riv',
    stateMachines: 'Bell',
    autoplay: true,
  })

  const countInput = useStateMachineInput(rive, 'Bell', 'count')
  const ringTrigger = useStateMachineInput(rive, 'Bell', 'ring')

  // Update count display
  useEffect(() => {
    if (countInput) {
      countInput.value = count
    }
  }, [count, countInput])

  const handleClick = useCallback(() => {
    if (ringTrigger) {
      ringTrigger.fire()  // Trigger is fired, not set
    }
    onRing?.()
  }, [ringTrigger, onRing])

  return (
    <button
      onClick={handleClick}
      className="w-12 h-12 relative"
      aria-label={`Notifications: ${count}`}
    >
      <RiveComponent />
    </button>
  )
}
```

### Interactive Button (Hover + Press)

```tsx
'use client'

import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

interface RiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function RiveButton({ children, onClick, disabled }: RiveButtonProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/button.riv',
    stateMachines: 'Button',
    autoplay: true,
  })

  const hoverInput = useStateMachineInput(rive, 'Button', 'hover')
  const pressInput = useStateMachineInput(rive, 'Button', 'pressed')

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative w-40 h-12 disabled:opacity-50"
      onMouseEnter={() => hoverInput && (hoverInput.value = true)}
      onMouseLeave={() => {
        if (hoverInput) hoverInput.value = false
        if (pressInput) pressInput.value = false
      }}
      onMouseDown={() => pressInput && (pressInput.value = true)}
      onMouseUp={() => pressInput && (pressInput.value = false)}
    >
      <RiveComponent className="absolute inset-0" />
      <span className="relative z-10 text-white font-medium">
        {children}
      </span>
    </button>
  )
}
```

### Like/Heart Button

Boolean toggle with animation feedback.

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

interface LikeButtonProps {
  liked?: boolean
  onLike?: (liked: boolean) => void
  count?: number
}

export function LikeButton({ liked = false, onLike, count }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(liked)

  const { rive, RiveComponent } = useRive({
    src: '/animations/heart.riv',
    stateMachines: 'Heart',
    autoplay: true,
  })

  const likedInput = useStateMachineInput(rive, 'Heart', 'isLiked')

  useEffect(() => {
    if (likedInput) {
      likedInput.value = isLiked
    }
  }, [isLiked, likedInput])

  useEffect(() => {
    setIsLiked(liked)
  }, [liked])

  const handleClick = () => {
    const newValue = !isLiked
    setIsLiked(newValue)
    onLike?.(newValue)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2"
      aria-pressed={isLiked}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <div className="w-8 h-8">
        <RiveComponent />
      </div>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">{count}</span>
      )}
    </button>
  )
}
```

---

## State-Driven Patterns

### Multi-State Character

Character that changes based on app state.

```tsx
'use client'

import { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

type CharacterState = 'idle' | 'happy' | 'sad' | 'thinking' | 'celebrating'

interface CharacterProps {
  state: CharacterState
  size?: number
}

const stateMap: Record<CharacterState, number> = {
  idle: 0,
  happy: 1,
  sad: 2,
  thinking: 3,
  celebrating: 4,
}

export function AnimatedCharacter({ state, size = 200 }: CharacterProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/character.riv',
    stateMachines: 'Character',
    autoplay: true,
  })

  const stateInput = useStateMachineInput(rive, 'Character', 'state')

  useEffect(() => {
    if (stateInput) {
      stateInput.value = stateMap[state]
    }
  }, [state, stateInput])

  return (
    <div style={{ width: size, height: size }}>
      <RiveComponent />
    </div>
  )
}

// Usage based on app state
function GameResult({ won }: { won: boolean }) {
  return <AnimatedCharacter state={won ? 'celebrating' : 'sad'} />
}
```

### Loading States

Different animations based on loading state.

```tsx
'use client'

import { useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

type LoadingState = 'loading' | 'success' | 'error'

interface LoadingIndicatorProps {
  state: LoadingState
}

export function LoadingIndicator({ state }: LoadingIndicatorProps) {
  const { rive, RiveComponent } = useRive({
    src: '/animations/loader.riv',
    stateMachines: 'Loader',
    autoplay: true,
  })

  const successTrigger = useStateMachineInput(rive, 'Loader', 'success')
  const errorTrigger = useStateMachineInput(rive, 'Loader', 'error')
  const resetTrigger = useStateMachineInput(rive, 'Loader', 'reset')

  useEffect(() => {
    if (state === 'success' && successTrigger) {
      successTrigger.fire()
    } else if (state === 'error' && errorTrigger) {
      errorTrigger.fire()
    } else if (state === 'loading' && resetTrigger) {
      resetTrigger.fire()
    }
  }, [state, successTrigger, errorTrigger, resetTrigger])

  return (
    <div className="w-24 h-24">
      <RiveComponent />
    </div>
  )
}

// Usage
function SubmitButton() {
  const [state, setState] = useState<LoadingState>('loading')

  const handleSubmit = async () => {
    setState('loading')
    try {
      await submitForm()
      setState('success')
    } catch {
      setState('error')
    }
  }

  return <LoadingIndicator state={state} />
}
```

---

## Layout & Sizing

### Responsive Container

```tsx
'use client'

import { useRive } from '@rive-app/react-canvas'

export function ResponsiveRive() {
  const { RiveComponent } = useRive({
    src: '/animations/hero.riv',
    stateMachines: 'Hero',
    autoplay: true,
  })

  return (
    // Container controls size, Rive fills it
    <div className="w-full aspect-video max-w-2xl mx-auto">
      <RiveComponent />
    </div>
  )
}
```

### Fixed Aspect Ratio

```tsx
// Use aspect-ratio utility
<div className="w-32 aspect-square">
  <RiveComponent />
</div>

// Or explicit dimensions
<div className="w-[200px] h-[150px]">
  <RiveComponent />
</div>
```

### Fit Modes

```tsx
const { RiveComponent } = useRive({
  src: '/animation.riv',
  stateMachines: 'Main',
  autoplay: true,
  // Fit options
  layout: new Layout({
    fit: Fit.Contain,    // Contain within bounds (default)
    // fit: Fit.Cover,   // Fill and crop
    // fit: Fit.Fill,    // Stretch to fill
    // fit: Fit.None,    // No scaling
    alignment: Alignment.Center,
  }),
})
```

---

## SSR & Hydration

### Always Use Client Component

```tsx
// components/rive-animation.tsx
'use client'  // Required!

import { useRive } from '@rive-app/react-canvas'

export function RiveAnimation() {
  const { RiveComponent } = useRive({
    src: '/animation.riv',
    autoplay: true,
  })

  return <RiveComponent />
}
```

### Dynamic Import for Heavy Animations

```tsx
// page.tsx
import dynamic from 'next/dynamic'

const HeavyAnimation = dynamic(
  () => import('@/components/heavy-rive'),
  {
    ssr: false,
    loading: () => <div className="w-64 h-64 bg-muted animate-pulse" />,
  }
)

export default function Page() {
  return <HeavyAnimation />
}
```

### Mounted Check Pattern

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useRive } from '@rive-app/react-canvas'

export function SafeRive() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { RiveComponent } = useRive({
    src: '/animation.riv',
    autoplay: true,
  })

  if (!mounted) {
    return <div className="w-64 h-64 bg-muted" />
  }

  return <RiveComponent />
}
```

---

## Performance

### Pause When Not Visible

```tsx
'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRive } from '@rive-app/react-canvas'

export function OptimizedRive() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  const { rive, RiveComponent } = useRive({
    src: '/animation.riv',
    autoplay: false,  // Don't autoplay
  })

  useEffect(() => {
    if (rive) {
      inView ? rive.play() : rive.pause()
    }
  }, [rive, inView])

  return (
    <div ref={ref} className="w-64 h-64">
      <RiveComponent />
    </div>
  )
}
```

### Cleanup on Unmount

```tsx
useEffect(() => {
  return () => {
    rive?.cleanup()
  }
}, [rive])
```

---

## Troubleshooting

```yaml
"Animation not playing":
  → Check: autoplay: true in useRive
  → Check: stateMachines name matches exactly (case-sensitive)
  → Check: .riv file path is correct (public folder)
  → Debug: console.log(rive) to verify instance

"Inputs not found / undefined":
  → Check: useStateMachineInput after rive is ready
  → Check: Input name matches exactly (case-sensitive)
  → Check: Correct state machine name
  → Pattern:
    const input = useStateMachineInput(rive, 'StateMachine', 'inputName')
    useEffect(() => {
      if (input) input.value = newValue  // Always check if input exists
    }, [input, newValue])

"Hydration mismatch":
  → Add 'use client' directive
  → Use dynamic import with ssr: false
  → Use mounted check pattern

"Animation wrong size":
  → Container must have explicit width/height
  → Use aspect-ratio utilities
  → Check Layout fit mode

"Animation not responding to inputs":
  → Check input type: Boolean (value), Number (value), Trigger (fire())
  → Verify input names in Rive editor
  → Add console.log to verify input changes

"Multiple animations conflict":
  → Each useRive creates separate instance
  → Use unique keys if rendering list
  → Consider single .riv with multiple artboards
```

---

## Getting .riv Files

```yaml
Create Your Own:
  → Rive Editor: https://rive.app/editor
  → Export as .riv file
  → Place in public/animations/

Community Files:
  → Rive Community: https://rive.app/community
  → Filter by "Free" license
  → Download and customize

Required State Machine Setup:
  1. Create State Machine in Rive editor
  2. Add Inputs (Boolean, Number, Trigger)
  3. Connect inputs to state transitions
  4. Export .riv file
```
