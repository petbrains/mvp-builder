# Setup - Daily Route Generator

## Install
```bash
npm install seedrandom
npm install -D @types/seedrandom
```

## Config
Place `bantadthong_places.json` in project root or `src/data/` directory.

## Run
```bash
# Route generation happens at build time
npm run build
```

## Test
```bash
# Run unit tests for generator
npm run test -- --testPathPattern=daily-route-generator

# Run specific test file
npm run test -- src/lib/route-generator/__tests__/generator.test.ts
```
