# Research Notes - Page Layout

## Key Decisions
- **Auto-Scroll Implementation**: Native scrollIntoView with behavior: 'smooth' - widely supported, no library needed
- **Section Height**: CSS 100vh for onboarding, auto for others - matches PRD layout structure
- **Scroll Interruption**: User scroll immediately cancels programmatic scroll - natural UX behavior
- **No Scroll Hijacking**: Manual scroll always available per PRD.Navigation

## Critical Risks
- **Safari < 15.4**: scrollIntoView smooth not fully supported → Fallback using requestAnimationFrame
- **100vh Mobile**: iOS Safari address bar affects 100vh → Use CSS dvh with vh fallback

## Stack Compatibility
- Next.js 14 App Router single page: verified compatible
- Tailwind CSS dark theme (#0a0a0a): verified compatible
