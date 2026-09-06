# Playwright MCP Tools Reference

Complete reference for all Playwright MCP browser automation tools.

## Navigation Tools

### browser_navigate

Opens a URL in the browser.

```yaml
Parameters:
  url: string (required)    # Full URL to navigate to

Example:
  browser_navigate:
    url: "http://localhost:3000"
    url: "http://localhost:3000/dashboard"
    url: "https://example.com/login"

Returns:
  - Page title
  - Current URL
  - Page content summary
```

### browser_resize

Changes browser viewport size. Essential for responsive testing.

```yaml
Parameters:
  width: number (required)   # Viewport width in pixels
  height: number (required)  # Viewport height in pixels

Common Sizes:
  Mobile:      { width: 375, height: 812 }   # iPhone X
  Mobile SM:   { width: 320, height: 568 }   # iPhone SE
  Tablet:      { width: 768, height: 1024 }  # iPad
  Laptop:      { width: 1366, height: 768 }  # Common laptop
  Desktop:     { width: 1440, height: 900 }  # Desktop
  Desktop XL:  { width: 1920, height: 1080 } # Full HD

Example:
  browser_resize:
    width: 375
    height: 812
```

### browser_close

Closes the browser and ends the session.

```yaml
Parameters: none

Use When:
  - Done with all verification
  - Need to free resources
  - Before starting fresh session
```

---

## Inspection Tools

### browser_snapshot

Returns the accessibility tree of the current page. Shows all interactive elements with their refs.

```yaml
Parameters: none

Returns:
  - Accessibility tree with element refs like [ref=e1], [ref=e2]
  - Element roles (button, textbox, link, etc.)
  - Element names and states

Use For:
  - Finding element refs for click/type actions
  - Understanding page structure
  - Accessibility audit

Example Output:
  - button "Submit" [ref=e5]
  - textbox "Email" [ref=e3]
  - link "Sign up" [ref=e7]
```

### browser_take_screenshot

Captures a screenshot of the current page.

```yaml
Parameters:
  filename: string (optional)   # Save to file (default: returns base64)
  fullPage: boolean (optional)  # Capture full scrollable page

Examples:
  # Quick visual check
  browser_take_screenshot: {}

  # Save to file
  browser_take_screenshot:
    filename: "homepage.png"

  # Full page capture
  browser_take_screenshot:
    filename: "full-page.png"
    fullPage: true

Returns:
  - Screenshot image (displayed inline or saved)
```

### browser_console_messages

Returns console messages from the browser.

```yaml
Parameters:
  onlyErrors: boolean (optional)  # Only show errors (default: false)

Examples:
  # All console output
  browser_console_messages: {}

  # Only errors (recommended for QA)
  browser_console_messages:
    onlyErrors: true

Returns:
  - List of console messages with levels (log, warn, error)
  - Empty list = clean console

Critical For:
  - Pre-delivery verification
  - Debugging runtime errors
  - Catching React/Next.js hydration errors
```

### browser_network_requests

Returns network requests made by the page.

```yaml
Parameters: none

Returns:
  - List of all network requests
  - URL, method, status code
  - Failed requests (4xx, 5xx)

Use For:
  - Finding failed API calls
  - Checking asset loading
  - Debugging fetch errors
```

### browser_evaluate

Executes JavaScript in the browser context.

```yaml
Parameters:
  function: string (required)  # JavaScript function as string

Examples:
  # Get computed styles
  browser_evaluate:
    function: "() => getComputedStyle(document.querySelector('.header')).backgroundColor"

  # Check element exists
  browser_evaluate:
    function: "() => !!document.querySelector('[data-testid=\"submit\"]')"

  # Get page data
  browser_evaluate:
    function: "() => JSON.stringify(window.__NEXT_DATA__)"

  # Scroll to element
  browser_evaluate:
    function: "() => document.querySelector('#footer').scrollIntoView()"

  # Get localStorage
  browser_evaluate:
    function: "() => localStorage.getItem('token')"

Returns:
  - Result of JavaScript execution
```

---

## Interaction Tools

### browser_click

Clicks an element on the page.

```yaml
Parameters:
  element: string (required)  # Element description
  ref: string (required)      # Element ref from browser_snapshot

Workflow:
  1. Run browser_snapshot to get refs
  2. Find target element ref (e.g., [ref=e5])
  3. Click with element description and ref

Example:
  # First: browser_snapshot returns:
  #   button "Submit" [ref=e5]

  # Then click:
  browser_click:
    element: "Submit button"
    ref: "e5"

Notes:
  - Always get fresh ref from browser_snapshot
  - Refs change after page updates
```

### browser_type

Types text into an input field.

```yaml
Parameters:
  element: string (required)  # Element description
  ref: string (required)      # Element ref from browser_snapshot
  text: string (required)     # Text to type

Examples:
  # Type email
  browser_type:
    element: "Email input"
    ref: "e3"
    text: "user@example.com"

  # Type password
  browser_type:
    element: "Password input"
    ref: "e4"
    text: "secretpassword123"

  # Type search query
  browser_type:
    element: "Search box"
    ref: "e2"
    text: "search term"
```

### browser_hover

Hovers over an element (triggers hover states).

```yaml
Parameters:
  element: string (required)  # Element description
  ref: string (required)      # Element ref from browser_snapshot

Use For:
  - Testing hover menus
  - Checking tooltip appearance
  - Verifying hover styles

Example:
  browser_hover:
    element: "Navigation menu"
    ref: "e8"
```

### browser_wait_for

Waits for a condition before proceeding.

```yaml
Parameters (one of):
  time: number      # Wait for N seconds
  text: string      # Wait for text to appear
  selector: string  # Wait for CSS selector

Examples:
  # Wait 2 seconds
  browser_wait_for:
    time: 2

  # Wait for success message
  browser_wait_for:
    text: "Successfully saved"

  # Wait for element
  browser_wait_for:
    selector: "[data-testid='modal']"

Use For:
  - Waiting after actions
  - Waiting for async content
  - Waiting for animations
```

---

## Tool Combinations

### Quick Page Audit
```yaml
1. browser_navigate: { url: "http://localhost:3000" }
2. browser_take_screenshot: {}
3. browser_console_messages: { onlyErrors: true }
4. browser_network_requests: {}
```

### Form Interaction
```yaml
1. browser_navigate: { url: "http://localhost:3000/login" }
2. browser_snapshot: {}                              # Get refs
3. browser_type: { element: "Email", ref: "e3", text: "user@example.com" }
4. browser_type: { element: "Password", ref: "e4", text: "password" }
5. browser_click: { element: "Submit", ref: "e5" }
6. browser_wait_for: { text: "Welcome" }
7. browser_console_messages: { onlyErrors: true }
```

### Responsive Test
```yaml
1. browser_navigate: { url: "http://localhost:3000" }
2. browser_resize: { width: 375, height: 812 }
3. browser_take_screenshot: { filename: "mobile.png" }
4. browser_resize: { width: 1440, height: 900 }
5. browser_take_screenshot: { filename: "desktop.png" }
```

### Debug Element Styles
```yaml
1. browser_navigate: { url: "http://localhost:3000" }
2. browser_evaluate:
     function: "() => {
       const el = document.querySelector('.my-element');
       const styles = getComputedStyle(el);
       return {
         display: styles.display,
         color: styles.color,
         fontSize: styles.fontSize
       };
     }"
```
