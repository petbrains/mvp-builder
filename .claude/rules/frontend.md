# Frontend Standards

**Stack:** Next.js 14+ (App Router) · React 18+ · Tailwind CSS · TypeScript

## UI Components

| Need | Library |
|------|---------|
| Forms, dialogs, tables, base UI | shadcn/ui |
| SaaS polish — tickers, marquees, mockups | Magic UI |
| Dramatic hero effects — spotlight, 3D cards | Aceternity UI |

## Animations

| Need | Library |
|------|---------|
| Just plays/loops — loaders, feedback, empty states | Lottie |
| Reacts to input, has states — buttons, toggles, progress | Rive |
| Hero backgrounds, entrance effects | Aceternity / Framer Motion |

## Assets — Free First

| Asset | Free Source |
|-------|-------------|
| Icons | Iconify / Lucide (`@iconify/react`) |
| Avatars | DiceBear, Boring Avatars |
| Photos | Unsplash, Picsum |
| Illustrations | unDraw, Storyset |
| Backgrounds | Haikei, Hero Patterns |

AI generation (DALL-E) only when custom branded asset needed and no free alternative exists.

## Typography

| Project Type | Heading | Body |
|--------------|---------|------|
| Modern SaaS | Plus Jakarta Sans | Inter |
| Corporate | Source Sans 3 | Source Serif 4 |
| Editorial | Playfair Display | Lora |
| Dev Tools | Geist | Inter |

Always use `next/font` — never load Google Fonts via `<link>`. Set `display: 'swap'`, subset `latin` only unless multilingual.

## Color System

- Colors via CSS variables mapped to Tailwind — never hardcode HEX in components
- Every color combination must meet WCAG AA contrast (4.5:1 normal text, 3:1 large text)
- Plan dark mode from project start — don't retrofit
- Semantic colors: success `#22C55E`, warning `#F59E0B`, error `#EF4444`, info `#3B82F6`

## Non-negotiable Rules

### Next.js / SSR
- All components using hooks, events, or browser APIs → `'use client'`
- Heavy animated components → `dynamic(() => import(...), { ssr: false })`
- Never access `window`/`document` at module level — always inside `useEffect`

### Accessibility
- All interactive elements reachable by keyboard
- Focus states always visible — never remove without replacement
- Never convey information through color alone
- Always `aria-hidden="true"` on decorative animations

### Performance
- Respect `prefers-reduced-motion` for all animations
- Pause animations when not in viewport (`useInView`)
- Reduce particle/element count on mobile
- `priority` prop on LCP images

### Code Quality
- Use `cn()` (clsx + tailwind-merge) for conditional classes
- Never arbitrary Tailwind values when scale has it (`mt-4` not `mt-[16px]`)
- Mobile-first responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Quality Gate (before every delivery)

```bash
npm run lint       # 0 errors
npm run typecheck  # 0 errors
```

Browser check: console errors → 0, no failed network requests, mobile viewport works.