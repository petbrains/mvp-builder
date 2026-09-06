# Playwright Verification Workflows

Ready-to-use workflows for common frontend verification scenarios.

## Pre-Delivery Verification

### Complete Page Audit

Run this before delivering any frontend work.

```yaml
GOAL: Verify page works correctly before delivery

STEPS:
  1. browser_navigate:
       url: "http://localhost:3000"

  2. browser_take_screenshot:
       filename: "page-check.png"
     → VERIFY: Page renders correctly visually

  3. browser_console_messages:
       onlyErrors: true
     → MUST BE EMPTY (0 errors)
     → If errors: FIX before continuing

  4. browser_network_requests: {}
     → CHECK: No failed requests (4xx, 5xx)

PASS CRITERIA:
  ✓ Screenshot looks correct
  ✓ Console: 0 errors
  ✓ Network: 0 failed requests
```

### Multi-Page Audit

For verifying multiple routes.

```yaml
ROUTES:
  - /
  - /dashboard
  - /settings
  - /profile

FOR EACH ROUTE:
  1. browser_navigate: { url: "http://localhost:3000{route}" }
  2. browser_take_screenshot: { filename: "{route}.png" }
  3. browser_console_messages: { onlyErrors: true }

REPORT:
  - List any routes with errors
  - Screenshot comparison for visual check
```

---

## Responsive Testing

### Full Responsive Check

```yaml
VIEWPORTS:
  mobile:  { width: 375, height: 812 }
  tablet:  { width: 768, height: 1024 }
  desktop: { width: 1440, height: 900 }

WORKFLOW:
  1. browser_navigate:
       url: "http://localhost:3000"

  2. FOR EACH viewport:
     a. browser_resize: { width: X, height: Y }
     b. browser_wait_for: { time: 1 }
     c. browser_take_screenshot: { filename: "{viewport}.png" }
     d. browser_console_messages: { onlyErrors: true }

CHECK:
  ✓ Layout adapts correctly
  ✓ No horizontal scroll on mobile
  ✓ Text readable at all sizes
  ✓ Interactive elements accessible
  ✓ No console errors at any size
```

### Mobile-First Check

```yaml
MOBILE_ISSUES_TO_CHECK:
  - Touch targets (min 44x44px)
  - Font size (min 16px for inputs)
  - Horizontal overflow
  - Fixed elements covering content
  - Keyboard behavior

WORKFLOW:
  1. browser_navigate: { url: "..." }
  2. browser_resize: { width: 375, height: 812 }
  3. browser_snapshot: {}
     → Check all interactive elements have reasonable size
  4. browser_evaluate:
       function: "() => document.documentElement.scrollWidth > 375"
     → Should return false (no horizontal scroll)
```

---

## Form Testing

### Login Form

```yaml
WORKFLOW:
  1. browser_navigate:
       url: "http://localhost:3000/login"

  2. browser_snapshot: {}
     → Note refs for: email input, password input, submit button

  3. browser_type:
       element: "Email input"
       ref: "e3"
       text: "test@example.com"

  4. browser_type:
       element: "Password input"
       ref: "e4"
       text: "password123"

  5. browser_take_screenshot:
       filename: "form-filled.png"
     → Verify form is filled correctly

  6. browser_click:
       element: "Submit button"
       ref: "e5"

  7. browser_wait_for:
       text: "Welcome"
     OR
     browser_wait_for:
       time: 3

  8. browser_console_messages:
       onlyErrors: true
     → Check for errors after submit

  9. browser_take_screenshot:
       filename: "after-submit.png"

VALIDATE:
  ✓ Form accepts input
  ✓ Submit triggers action
  ✓ Success/error state shown
  ✓ No console errors
```

### Form Validation

```yaml
WORKFLOW:
  1. browser_navigate: { url: "..." }
  2. browser_snapshot: {}

  # Test empty submit
  3. browser_click: { element: "Submit", ref: "e5" }
  4. browser_take_screenshot: { filename: "validation-errors.png" }
     → Verify error messages appear

  # Test invalid email
  5. browser_type: { element: "Email", ref: "e3", text: "invalid" }
  6. browser_click: { element: "Submit", ref: "e5" }
  7. browser_take_screenshot: { filename: "invalid-email.png" }

VALIDATE:
  ✓ Empty fields show required error
  ✓ Invalid email shows format error
  ✓ Error messages are visible and clear
```

---

## Component Testing

### Modal/Dialog

```yaml
WORKFLOW:
  1. browser_navigate: { url: "..." }
  2. browser_snapshot: {}

  # Open modal
  3. browser_click:
       element: "Open modal button"
       ref: "e5"

  4. browser_wait_for:
       selector: "[role='dialog']"

  5. browser_take_screenshot:
       filename: "modal-open.png"

  6. browser_snapshot: {}
     → Get refs for modal content

  # Close modal
  7. browser_click:
       element: "Close button"
       ref: "e10"

  8. browser_wait_for: { time: 0.5 }

  9. browser_take_screenshot:
       filename: "modal-closed.png"

VALIDATE:
  ✓ Modal opens with animation
  ✓ Content is correct
  ✓ Close button works
  ✓ Focus management (if applicable)
```

### Dropdown Menu

```yaml
WORKFLOW:
  1. browser_navigate: { url: "..." }
  2. browser_snapshot: {}

  3. browser_click:
       element: "Dropdown trigger"
       ref: "e3"

  4. browser_wait_for: { time: 0.3 }

  5. browser_take_screenshot:
       filename: "dropdown-open.png"

  6. browser_snapshot: {}
     → Verify menu items visible

VALIDATE:
  ✓ Menu opens on click
  ✓ All items visible
  ✓ Hover states work
```

### Hover States

```yaml
WORKFLOW:
  1. browser_navigate: { url: "..." }
  2. browser_snapshot: {}

  3. browser_hover:
       element: "Button"
       ref: "e4"

  4. browser_take_screenshot:
       filename: "button-hover.png"

  5. browser_hover:
       element: "Card"
       ref: "e7"

  6. browser_take_screenshot:
       filename: "card-hover.png"

VALIDATE:
  ✓ Hover styles apply
  ✓ Transitions smooth
```

---

## Error Debugging

### Console Error Investigation

```yaml
WHEN: browser_console_messages shows errors

WORKFLOW:
  1. browser_console_messages: {}
     → Get FULL error message (not just onlyErrors)

  2. browser_evaluate:
       function: "() => window.__error_details || 'no details'"
     → Check for additional error context

  3. browser_take_screenshot:
       filename: "error-state.png"
     → Capture visual state

  4. browser_snapshot: {}
     → Check DOM state

COMMON ERRORS:
  "Hydration mismatch":
    → Server/client render different content
    → Fix: Add 'use client', useEffect for browser-only code

  "Cannot read property of undefined":
    → Data not loaded yet
    → Fix: Add loading states, optional chaining

  "Failed to fetch":
    → API error
    → Check: browser_network_requests
```

### Network Error Investigation

```yaml
WHEN: browser_network_requests shows failures

WORKFLOW:
  1. browser_network_requests: {}
     → Note failed URLs and status codes

  2. browser_evaluate:
       function: "() => fetch('/api/...').then(r => r.text())"
     → Get actual error response

COMMON ISSUES:
  404: Resource not found
    → Check file paths, API routes exist

  500: Server error
    → Check server logs, API implementation

  CORS: Cross-origin blocked
    → Check API headers, proxy config
```

---

## Visual Regression

### Before/After Comparison

```yaml
WORKFLOW:
  # Before changes
  1. browser_navigate: { url: "..." }
  2. browser_take_screenshot: { filename: "before.png" }

  # Make code changes...

  # After changes
  3. browser_navigate: { url: "..." }  # Refresh
  4. browser_take_screenshot: { filename: "after.png" }

  # Compare visually
  → Check for unintended changes
  → Verify intended changes applied
```

---

## Performance Check

### Page Load

```yaml
WORKFLOW:
  1. browser_evaluate:
       function: "() => {
         const nav = performance.getEntriesByType('navigation')[0];
         return {
           loadTime: Math.round(nav.loadEventEnd - nav.startTime),
           domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
           firstByte: Math.round(nav.responseStart - nav.requestStart)
         };
       }"
     → Get page load metrics in ms

  2. browser_evaluate:
       function: "() => {
         const paint = performance.getEntriesByType('paint');
         return {
           firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
           firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
           resourceCount: performance.getEntriesByType('resource').length
         };
       }"
     → Get paint metrics and resource count

  3. browser_network_requests: {}
     → Check for slow/large requests

TARGETS:
  Load time: < 3000ms
  First Contentful Paint: < 1800ms
  Time to First Byte: < 800ms
  Resources: minimize count
```

---

## Quick Reference

### Minimal Verification (Fast)
```yaml
1. browser_navigate → 2. browser_take_screenshot → 3. browser_console_messages { onlyErrors: true }
```

### Standard Verification
```yaml
1. Navigate → 2. Screenshot → 3. Console errors → 4. Network requests → 5. Mobile resize → 6. Mobile screenshot
```

### Full Verification (Thorough)
```yaml
1. Navigate → 2. Full page screenshot → 3. Console (all) → 4. Network → 5. Snapshot (a11y) → 6. Mobile test → 7. Tablet test → 8. Form test if applicable
```
