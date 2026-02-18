---
description: Generate UI specifications with component trees and design system mapping.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7__resolve-library-id, mcp__context7__get-library-docs
---

# Instructions

Generate platform-aware UI specifications focused on component composition and visual structure.
Output compact, structured documents that bridge UX behavior (ux.md) and technical implementation (plan.md).

**Tools Usage:**
- `Read`: For loading PRD.md, spec.md, ux.md, and reference files
- `Write`: For saving ui.md output
- `Bash`: For checking file existence and detecting design system

**Skills:**
- Sequential Thinking Methodology: For component extraction, tree building, and state mapping
  - Tool: `/mcp__sequential-thinking__sequentialthinking`
- Context7 Documentation Retrieval: For validating DS component names against library docs
  - Tools: `/mcp__context7__resolve-library-id`, `/mcp__context7__get-library-docs`

**Template:**
- UI: @.claude/templates/ui-template.md

**Project context:**
- PRD: @ai-docs/PRD.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (expects spec.md, ux.md)
- Output: `./ai-docs/features/[feature]/ui.md`

# Task

Transform feature specifications and UX flows into concrete UI component structures.
Focus on what components compose each screen, how they nest, and how they map to the design system.

# Core Principles

## Content Rules
- **Complement, don't duplicate** — Add component structure, not repeat behavior from ux.md
- **Structured data** — Use JSON for component trees and catalog
- **Design-system-aware** — Use concrete DS component names, not abstract types
- **Testable depth** — Every component that becomes a file or has a test case must be listed
- **Template compliance** — Exclude Review Checklist from final output

# Execution Flow

## Phase 0: Context & Validation

### 0.1 Initialize UI Generation
```bash
# Validate required inputs exist
[ ! -f "./ai-docs/features/$FEATURE/spec.md" ] && echo "Error: spec.md not found" && exit 1
[ ! -f "./ai-docs/features/$FEATURE/ux.md" ] && echo "Error: ux.md not found. Run /docs:ux first." && exit 1
```

### 0.2 Load Sources
- Read `./ai-docs/features/[feature]/spec.md` → Extract requirements, entities, acceptance criteria
- Read `./ai-docs/features/[feature]/ux.md` → Extract flows, states, interactions, platform
- Read `./ai-docs/PRD.md` → Extract tech stack, design system, platform constraints

**Keep in context throughout execution**

### 0.3 Check UI Applicability
From spec.md and ux.md, determine if feature has UI components:
- If ux.md User Flow contains only API/background/cron operations with no user-facing screens → Exit early:
  ```
  ⭐ Feature [feature-name] has no UI components.
  Skipping UI specification. Proceed to /docs:plan.
  ```
- If mixed (UI + backend) → Generate ui.md for UI portions only

### 0.4 Load References
```bash
# Load global references (design system docs, tokens, style guides, screens)
if [ -d "./ai-docs/references" ]; then
    echo "Loading global references..."
    find ./ai-docs/references -type f 2>/dev/null
fi
```
- If references directory contains files: Read all files into context
- Relevant reference types for UI generation:
  - **design-system.md** → ready DS component names, variant lists (can shortcut Phase 1 DS Detection)
  - **style-guide.md** → layout constraints, spacing system, color usage rules
  - **Design tokens** (.json, .css) → concrete variant names, prop values for Component Catalog
  - **screens/** (screenshots, mockups) → visual reference for component tree structure
  - **screens/index.md** → screen-to-screenshot mapping (use to match Screen Inventory with visual references)
  - **Wireframes** → screen layout and component placement guidance
- Keep in context throughout UI generation
- If directory empty or doesn't exist: skip silently, proceed without references

## Phase 1: Design System Detection

### 1.1 Check References for DS
If design-system.md loaded from references:
- Extract DS name, component list, and variant names
- Use as authoritative source → skip keyword analysis in 1.2
- Proceed directly to 1.3 validation (or skip if already validated by design-setup)

If no design-system.md in references → proceed with standard detection:

### 1.2 Analyze Tech Stack
```
PRD explicit DS → Use PRD design system
Else analyze keywords:
  - Shadcn: shadcn, radix, tailwind + components
  - MUI: material-ui, @mui, material design
  - Ant Design: antd, ant-design
  - Vuetify: vuetify, vue + material
  - Flutter Material: flutter, material.dart
  - Native: SwiftUI, Jetpack Compose
  - Custom: custom components, no library specified
```

### 1.3 Confirm Design System
If DS unclear:

**Apply Sequential Thinking Methodology** for DS detection:
- Analyze dependencies in PRD
- Check tech stack keywords
- Calculate DS confidence
- Select best match or "Custom"

### 1.4 Validate DS Component Library (Optional)
If DS detected and Context7 available:

**Apply Context7 Documentation Retrieval** for DS validation:
1. RESOLVE: `/mcp__context7__resolve-library-id libraryName="[DS package name]"`
2. SELECT: Trust score ≥7, highest snippet count
3. FETCH: `/mcp__context7__get-library-docs` with topic "components list"
4. Use fetched component list to verify names in Phase 2

Skip this step if DS is "Custom" or if design-system.md from references already provides validated component list.

```
✅ Feature loaded: [feature-name]
🎨 Design System detected: [DS name]
📱 Platform: [from ux.md]
Generating UI specification...
```

## Phase 2: Content Generation

### 2.1 Extract Screens & Entry Points
From ux.md extract:
- User Flow diagram → Screen/view inventory
- States & Transitions → Visual states per screen
- Core Actions → Interactive elements needed
- Exit Path Behaviors → Navigation targets

From spec.md extract:
- Acceptance criteria → What must be visible/testable
- Entities → Data to display
- Requirements → Functional constraints on UI

### 2.2 Build Screen Inventory
List all distinct screens/views from ux.md flows:
```json
[
  {
    "id": "screen_id",
    "name": "Human-readable name",
    "entry": "How user arrives (from ux.md flow)",
    "purpose": "What user accomplishes here"
  }
]
```

**Single-screen simplification:** If feature has only one screen/view, merge Screen Inventory into Component Tree header. Skip separate Screen Inventory section in output.

### 2.3 Build Component Trees

**Apply Sequential Thinking Methodology** for component extraction:
- For each screen, identify top-level regions
- Break regions into interactive/display components
- Map each component to DS equivalent
- Verify depth: every testable element present

**Enrich from References (if loaded):**
- design-system.md → use exact DS component names instead of guessing equivalents
- screens/mockups → verify component tree matches visual layout from screenshots
- Design tokens → use concrete prop values (variant names, size tokens)

For each screen, generate nested component tree:
```json
{
  "screen_id": {
    "component": "DSComponentName",
    "children": [
      {
        "component": "DSComponentName",
        "props": { "variant": "value" },
        "slot": false,
        "children": [],
        "notes": "Contextual info for implementation"
      }
    ]
  }
}
```

**Slot rule:**
- `"slot": true` — position accepts arbitrary child content at runtime (e.g., CardBody, DialogContent, DropdownMenu items)
- `"slot": false` (default) — fixed child structure, always renders the same components
- Slots signal to feature-tdd agent: generate tests for rendering with different content
- Slots signal to plan.md: component API needs `children` prop or render-prop pattern

**Depth rule — Include every component that:**
- Becomes its own file/module
- Has a test case (renders, responds to interaction, changes state)
- Has visual variants or conditional visibility

**Depth rule — Do NOT include:**
- Individual icons (implementation detail)
- Typography tokens (implementation detail)
- Spacing values (implementation detail)
- Wrapper divs with no semantic meaning

**Depth example:**
```
✅ Correct depth:
LoginForm
├── EmailField (has validation state, test case)
├── PasswordField (has visibility toggle, test case)
├── RememberMeCheckbox (has checked/unchecked, test case)
└── SubmitButton (has disabled/loading/enabled, test case)

❌ Too shallow:
LoginForm (plan.md will have to guess internal structure)

❌ Too deep:
LoginForm
├── EmailField
│   ├── Label (just text)
│   ├── InputWrapper (styling div)
│   │   └── Input (redundant with EmailField)
│   └── ErrorIcon (icon detail)
```

### 2.4 Build Component Catalog
Extract unique components across all screens:
```json
{
  "ComponentName": {
    "ds_component": "Exact DS component name from detected DS",
    "variants": ["variant1", "variant2"],
    "visual_states": {
      "default": "Description",
      "loading": "Description",
      "disabled": "Description"
    },
    "used_in": ["screen_id_1", "screen_id_2"]
  }
}
```

**Rules:**
- `ds_component` must be a real component from the detected design system
- If DS is "Custom" — use descriptive names: `CustomTextField`, `CustomButton`
- If Context7 DS docs loaded in Phase 1.4 — cross-check component names
- If design-system.md loaded from references — use its component names as authoritative source
- If design tokens loaded — populate `variants` with concrete token-based variant names
- `visual_states` complement ux.md states — show HOW state looks, not WHAT triggers it
- Components used in only one screen still appear in catalog (plan.md needs the full list)

### 2.5 Define Layout Structure
For each screen, define spatial arrangement semantically:
```json
{
  "screen_id": {
    "layout": "vertical-stack | horizontal-split | grid-NxM",
    "areas": [
      {
        "name": "area_name",
        "position": "top | left | center | bottom",
        "sticky": false,
        "scroll": false,
        "layout": "nested layout if needed"
      }
    ]
  }
}
```

**Enrich from References (if loaded):**
- style-guide.md → use layout constraints (max-width rules, spacing system, grid conventions)
- screens/mockups → verify layout matches visual reference

**Rule:** Semantic layout only. No pixels, no Tailwind classes, no CSS.
- `vertical-stack` → agent knows flex-col
- `horizontal-split` → agent knows flex-row with defined ratio
- `grid-2col` → agent knows grid grid-cols-2
- `grid-3col` → agent knows grid grid-cols-3

### 2.6 Map Visual States
Connect ux.md states to visual representation:
```json
{
  "state_name (from ux.md)": {
    "visible": ["ComponentA", "ComponentB"],
    "hidden": ["ComponentC"],
    "modified": {
      "ComponentD": { "prop": "new_value" }
    }
  }
}
```

**Rule:** State names MUST match ux.md States & Transitions exactly. This is the bridge between behavior (ux.md) and visual (ui.md).

### 2.7 Responsive Adaptations
If ux.md defines breakpoint strategy, map component changes:
```json
{
  "mobile": {
    "ComponentName": "Change description (e.g., stack vertical, hide sidebar)"
  },
  "tablet": { ... },
  "desktop": { ... }
}
```
**Rule:** Only include if ux.md Platform-Specific Patterns define responsive behavior. Skip section entirely otherwise.

## Phase 3: Assembly & Output

### 3.1 Structure Document
Follow template sections:
1. Header (platform, design system)
2. Screen Inventory (skip if single-screen)
3. Component Trees (per screen)
4. Component Catalog (unique components)
5. Layout Structure (per screen)
6. Visual State Mapping
7. Responsive Adaptations (if applicable)

**Note:** Do NOT include Review & Acceptance Checklist in final output

### 3.2 Optimize Content
- Keep descriptions concise but implementation-ready
- Remove empty sections entirely
- Merge single-screen features into simplified structure
- Priority: Component Trees > Catalog > States > Layout

### 3.3 Write Document
Write to: `./ai-docs/features/[feature]/ui.md`

## Phase 4: Validate & Report

### 4.1 Content Validation
Verify:
- No duplication of ux.md behavior descriptions
- No duplication of spec.md requirements
- Focus on WHAT components, not HOW to code them
- All ux.md screens have corresponding component trees
- All interactive elements from ux.md Core Actions have components
- All ux.md states mapped to visual representation
- DS component names are valid for detected design system
- Slot positions marked where components accept arbitrary children
- JSON structures valid
- No CSS, no pixels, no framework-specific code

### 4.2 Report Success
```
✅ UI Specification Complete!

Feature: [feature-name]
Platform: [platform]
Design System: [DS name]
Location: ./ai-docs/features/[feature]/ui.md

Summary:
- Screens: [count]
- Unique Components: [count]
- Visual States: [count]
- Layout Definitions: [count]

Next: /docs:plan <feature-path>
```

# Error Handling

- **Missing spec.md**: "Error: spec.md not found. Run /docs:feature first."
- **Missing ux.md**: "Error: ux.md not found. Run /docs:ux first."
- **No UI in feature**: "Feature has no UI components. Skipping ui.md. Proceed to /docs:plan."
- **DS unclear**: "Design system not detected. Using generic component names. Specify DS in PRD.md for concrete mapping."
- **Template missing**: "Error: UI template not found at specified path"
- **No screens found**: "Error: No screens/views extracted from ux.md flow. Verify ux.md has User Flow diagram."
- **Invalid JSON**: "Error: Generated JSON structure invalid. Regenerating..."
- **Incomplete coverage**: "Warning: ux.md state [state_name] has no visual mapping in ui.md"
- **Unknown DS component**: "Warning: Component [name] not found in [DS]. Using closest equivalent."