# Research Notes - Daily Route Generator

## Key Decisions
- **Randomization Library**: seedrandom - PRD mandate for cross-platform deterministic selection
- **Build-Time Execution**: Route generation at Next.js build time via static data module
- **Validation Strategy**: Fail-fast at build with descriptive errors for malformed data
- **Date Seed Format**: YYYY-MM-DD string for deterministic daily variation
- **Output Format**: TypeScript module exporting pre-generated routes object

## Critical Risks
- **JSON Schema Changes**: Breaking changes to bantadthong_places.json structure → Build-time validation catches all issues
- **Venue Pool Depletion**: Slots with < 3 venues break variety guarantee → Validation enforces 3-5 per slot

## Stack Compatibility
- seedrandom + Next.js 14 build: verified compatible
- Static JSON import in App Router: verified compatible
