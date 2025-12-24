# Research Notes - Venue Cards

## Key Decisions
- **Carousel Library**: shadcn/ui Carousel (Embla) - consistent with onboarding-carousel
- **Maps Integration**: Pre-built URI opens in new tab via target="_blank" - no API key needed
- **Group Change Reset**: useEffect on selectedGroup resets carousel to first slide
- **Optional Rating**: Conditional render if rating exists - graceful omission per FR-004

## Critical Risks
- **Malformed Maps URI**: Browser handles gracefully - shows Google Maps error page
- **Long Story Text**: Card expands to fit 2-3 sentences - min-height prevents cutoff

## Stack Compatibility
- shadcn/ui Carousel + Card: verified compatible
- Embla API scrollTo(0) for carousel reset: verified pattern
