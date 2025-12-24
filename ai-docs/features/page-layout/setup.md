# Setup - Page Layout

## Install
```bash
# No additional dependencies - uses native browser APIs
# Tailwind CSS configured in project
```

## Config
Tailwind theme extension in `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      background: '#0a0a0a',
      'card-bg': '#1a1a1a',
      'card-border': '#262626',
      'text-primary': '#ffffff',
      'text-secondary': '#a0a0a0',
      'text-muted': '#666666',
      accent: '#ff9500',
    }
  }
}
```

## Run
```bash
npm run dev
```

## Test
```bash
# Run component tests
npm run test -- --testPathPattern=page-layout

# Run E2E scroll tests
npm run test:e2e -- --spec=page-layout
```
