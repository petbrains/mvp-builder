# Research Notes - Onboarding Carousel

## Key Decisions
- **Carousel Library**: shadcn/ui Carousel (Embla) - PRD mandates shadcn/ui, accessible, customizable
- **No Auto-Advance**: Static slides, user-controlled navigation only per FR-004
- **No Wrap-Around**: Finite carousel with boundary blocking per FR-005
- **Swipe Threshold**: 50px minimum for slide change per ux.md

## Critical Risks
- **Rapid Swipe Handling**: Multiple fast swipes may cause visual glitches → Embla handles debouncing natively
- **Viewport Resize**: 100vh must maintain during orientation change → CSS handles with resize event

## Stack Compatibility
- shadcn/ui Carousel + Next.js 14: verified compatible
- Embla Carousel accessibility: WCAG AA compliant with proper ARIA
