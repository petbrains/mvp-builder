---
name: figma-design-extraction
description: Extract design tokens, screen structure, and visual references from Figma files using Figma MCP tools. Process PARSE → DISCOVER → EXTRACT → ORGANIZE. Use whenever a Figma URL appears in the conversation, when design-setup needs Figma enrichment, when extracting design system data (tokens, variables, colors, typography, spacing), when capturing screen screenshots, or when analyzing component structure. Also use when someone says "get from Figma", "Figma tokens", "extract design", "Figma variables", or provides any figma.com link. Covers URL parsing, page/frame discovery, variable extraction, design context fallback, screenshot capture, and token source tracking for downstream conflict resolution.
allowed-tools: Read, Write, Bash (*), mcp__figma__get_metadata, mcp__figma__get_screenshot, mcp__figma__get_variable_defs, mcp__figma__get_design_context
---

# Figma Design Extraction

Extract design tokens, screen structure, and visual references from Figma files.

Process: **PARSE → DISCOVER → EXTRACT → ORGANIZE**

The goal is to pull structured, source-tracked design data from Figma for use in design-setup pipelines, conflict resolution, and downstream code generation. Every extracted value carries its source tag so consumers know where it came from.

## Step 1: PARSE — Get IDs from URL

### URL Formats
```
https://figma.com/design/:fileKey/:fileName?node-id=X-Y
https://figma.com/file/:fileKey/:fileName?node-id=X-Y
https://figma.com/proto/:fileKey/:fileName?node-id=X-Y
```

### What to Extract
- **fileKey**: segment after `/design/`, `/file/`, or `/proto/`
- **nodeId**: `node-id` query param, convert dash → colon (`1-2` → `1:2`)

```
URL: https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/MyApp?node-id=42-15
  → fileKey: kL9xQn2VwM8pYrTb4ZcHjF
  → nodeId: 42:15
```

### Decision Rules

| Condition | Action |
|---|---|
| URL has `/design/`, `/file/`, `/proto/` | Parse and proceed |
| URL has `/board/` (FigJam) | Warn: "FigJam not supported" → skip |
| URL has `/slides/` | Warn: "Slides not supported" → skip |
| No URL, desktop MCP connected | Tools auto-use selected node — proceed without IDs |
| No URL, no desktop MCP | Warn: "No Figma source available" → skip |
| nodeId missing in URL | Fetch root pages first, then navigate |

### Desktop MCP (No URL)

When using `figma` MCP (remote) or `figma-desktop` MCP (local) without a URL, tools automatically target the currently selected node in the Figma desktop app. No fileKey/nodeId needed — just call tools directly.

## Step 2: DISCOVER — Map File Structure

### 2.1 Fetch Page Overview

Call `get_metadata` to get XML structure with node IDs, layer types, names, positions, sizes.

**Depth strategy matters** because large files overwhelm in a single call:
1. Start at the provided nodeId (or page level like `0:1`) to get top-level frames
2. If response is too large or truncated → narrow to individual pages
3. For each page, identify top-level frames — these are your screens

### 2.2 Build Screen Inventory

Extract from metadata:
```
SCREENS[] = [{
  nodeId: "X:Y",
  name: "Login Screen",
  page: "Authentication",
  width: N,
  height: N,
  slug: "login-screen"    ← kebab-case for pipeline references
}]
```

**Slug normalization:**
- "Login Screen" → `login-screen`
- "Dashboard / Overview" → `dashboard-overview`
- "01 - Onboarding Flow" → `onboarding-flow`
- Strip leading numbers and separators, convert spaces/slashes to hyphens

### 2.3 Large File Strategy

If the file has many pages:
1. Fetch page-level metadata first
2. For each page, fetch frame-level children separately
3. Focus on top-level frames — skip deeply nested component internals
4. Log skipped content: "Skipped N nested components in page X"

## Step 3: EXTRACT — Pull Design Data

Three independent extraction types. Run what the consumer needs.

### 3.1 Variables (Primary Token Source)

`get_variable_defs` returns variable definitions like `{'color/primary/500': '#3B82F6'}`.

**What maps to what:**

| Figma Variable Path | Token Category | Example |
|---|---|---|
| `color/*` | colors | `color/primary/500` → `primary-500: #3B82F6` |
| `font/*`, `text/*` | typography | `font/body/size` → `body-size: 16` |
| `spacing/*`, `space/*` | spacing | `spacing/lg` → `lg: 24` |
| `size/*`, `radius/*` | sizing/radius | `radius/md` → `md: 8` |
| `shadow/*`, `effect/*` | effects | `shadow/lg` → shadow definition |
| `breakpoint/*` | breakpoints | `breakpoint/md` → `768` |

Mark all values with `source: "figma-variables"`.

**When variables come back empty** — this is common. Many Figma files use local styles instead of Variables. Don't treat this as an error. Fall back to design context (3.2).

### 3.2 Design Context (Fallback Token Source)

`get_design_context` returns rich structured data: layout, typography, colors, component structure, spacing, padding.

**Use this when:**
- Variables (3.1) returned empty or sparse
- You need applied-style values (what's actually on frames, not just defined)
- Understanding component patterns (Auto Layout, constraints, variants)

**Extract token-like values from:**
- Color fills → color tokens
- Text styles (font family, size, weight, line-height) → typography tokens
- Auto Layout spacing/padding → spacing tokens
- Corner radius → radius tokens
- Effects (shadows, blurs) → effect tokens

Mark all values with `source: "figma-context"`.

**Truncation handling** (critical for complex designs):
1. If response is too large → call `get_metadata` first to get the node map
2. Identify specific child nodes from metadata
3. Fetch children individually with `get_design_context`
4. Merge results

### 3.3 Screenshots (Visual References)

`get_screenshot` renders the node as an image.

For each screen in `SCREENS[]`, capture a screenshot. These serve as visual truth during implementation and validation.

**Practical notes:**
- Capture all top-level screens identified in DISCOVER
- If a screen screenshot fails → log warning, continue with remaining screens
- Very large frames may timeout → try child frames as fallback
- Screenshots are supplementary — extraction continues even if screenshots fail

## Step 4: ORGANIZE — Structure Results

### 4.1 Unified Token Map

Merge tokens from all sources into a single map. Source tracking enables downstream conflict resolution when file-based tokens disagree with Figma tokens.

```
FIGMA_TOKENS = {
  colors: {
    "primary-500": { value: "#3B82F6", source: "figma-variables" },
    "surface":     { value: "#FFFFFF", source: "figma-context" }
  },
  typography: {
    "body-size":   { value: "16px", source: "figma-variables" },
    "heading-weight": { value: "700", source: "figma-context" }
  },
  spacing: { ... },
  radius: { ... },
  effects: { ... }
}
```

**Merge priority:** `figma-variables` wins over `figma-context` when both provide the same token. Variables are explicit declarations; context values are inferred from usage.

### 4.2 Screen Index

```
FIGMA_SCREENS = [{
  slug: "login-screen",
  nodeId: "42:15",
  name: "Login Screen",
  page: "Authentication",
  dimensions: "375×812",
  hasScreenshot: true,
  hasDesignContext: true
}]
```

### 4.3 Extraction Summary

Always output this summary so the consumer knows what was extracted:

```
Figma Extraction Summary
━━━━━━━━━━━━━━━━━━━━━━━
Source: [URL or "desktop selection"]
Screens: [N] captured
Tokens:
  From Variables: [N] (colors: X, typography: Y, spacing: Z)
  From Context:   [N] (colors: X, typography: Y, spacing: Z)
  Total unique:   [N]
Screenshots: [N] captured, [N] failed
Warnings: [list if any]
━━━━━━━━━━━━━━━━━━━━━━━
```

## Workflows

### Full Extraction (design-setup)

The default workflow when design-setup provides a Figma URL:

```
PARSE:    URL → fileKey + nodeId
DISCOVER: get_metadata → SCREENS[]
EXTRACT:  get_variable_defs → tokens (primary)
          get_design_context on 2-3 sample screens → tokens (fallback)
          get_screenshot for each screen → visual references
ORGANIZE: Merge token map, build screen index, output summary
```

### Token-Only (validation/comparison)

When you just need to compare Figma tokens against file-based tokens:

```
PARSE:    URL → fileKey + nodeId
EXTRACT:  get_variable_defs → tokens
          If sparse: get_design_context on key screens → more tokens
ORGANIZE: Token map with sources for conflict resolution
```

### Screen Catalog (ux/ui commands)

When you need screen structure and visuals, not tokens:

```
PARSE:    URL → fileKey + nodeId
DISCOVER: get_metadata → SCREENS[]
EXTRACT:  get_screenshot for each screen
ORGANIZE: Screen index with screenshots
```

## Error Handling

Figma extraction is **enrichment, not requirement**. The pipeline continues without Figma data — it just has less information for conflict resolution.

| Error | Response |
|---|---|
| MCP not connected | Warn → skip all Figma steps |
| Invalid URL format | Warn with supported formats → skip |
| FigJam/Slides URL | Warn "not supported" → skip |
| Empty variables | Info "using context fallback" → extract from design context |
| Truncated response | Narrow scope → fetch children individually |
| Screenshot timeout | Log warning → try smaller child frames → continue |
| Permission denied | Warn "check Figma sharing" → skip |
| All extractions fail | Warn → continue pipeline without Figma data |

## Quick Reference

| Step | Tool | Purpose |
|---|---|---|
| DISCOVER | `get_metadata` | File structure, pages, frames, node IDs |
| EXTRACT tokens | `get_variable_defs` | Design Variables (primary token source) |
| EXTRACT context | `get_design_context` | Applied styles, layout, components (fallback) |
| EXTRACT visuals | `get_screenshot` | Visual reference for each screen |

| Source Tag | Meaning | Priority |
|---|---|---|
| `figma-variables` | Explicitly defined Figma Variable | Higher |
| `figma-context` | Inferred from applied styles on frames | Lower |