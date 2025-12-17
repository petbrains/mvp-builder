---
description: Generate UX specifications.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate platform-aware UX specifications focused on interactions and behavior patterns.
Output compact, structured documents that complement (not duplicate) feature specifications.

**Tools Usage:**
- `Read`: For loading PRD.md and spec.md files
- `Write`: For saving ux.md output
- `Bash`: For checking file existence

**Skills:**
- Sequential Thinking Methodology: For platform detection, flow analysis, and error categorization
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

**Template:**
- UX: @.claude/templates/ux-template.md

**Project context:**
- PRD: @ai-docs/PRD.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (expects spec.md)
- Output: `./ai-docs/features/[feature]/ux.md`

# Task

Transform feature specifications into compact UX documents.
Focus on user interactions, behavior patterns, and platform UX conventions.

# Core Principles

## Content Rules
- **Complement, don't duplicate** - Add UX insights, not repeat requirements
- **Structured data** - Use JSON for all component definitions, Mermaid for flows
- **Platform-aware** - Include only UX-relevant patterns for detected platform
- **Template compliance** - Exclude Review Checklist from final output

# Execution Flow

## Phase 0: Context & Validation

### 0.1 Initialize UX Generation
```bash
# Validate required inputs exist
[ ! -f "./ai-docs/features/$FEATURE/spec.md" ] && echo "Error: spec.md not found" && exit 1
```

### 0.2 Load Sources
- Read `./ai-docs/features/[feature]/spec.md` → Extract requirements and functionality
- Read `./ai-docs/PRD.md` → Extract platform information and technical context

**Keep in context throughout execution**

### 0.3 Load References
```bash
# Load supplementary materials if available
if [ -d "./ai-docs/references" ] && [ "$(ls -A ./ai-docs/references 2>/dev/null)" ]; then
    echo "Loading references..."
fi
```
- If references directory contains files: Read all files into context
- Keep in context throughout UX generation

## Phase 1: Platform Detection

### 1.1 Analyze Platform Indicators
```
PRD explicit platform → Use PRD platform
Else analyze keywords:
  - Mobile: iOS, Android, app, gesture, notification
  - Web: browser, responsive, URL, cookie, React
  - Desktop: Electron, Windows, macOS, system tray
  - Browser Extension: extension, popup, content script, chrome API, manifest
```

### 1.2 Confirm Platform
If platform unclear:

**Apply Sequential Thinking Methodology** for platform detection:
- Analyze keywords in spec
- Check PRD context
- Calculate platform confidence
- Select best match
```
✅ Feature loaded: [feature-name]
🎯 Platform detected: [platform]
Generating [platform]-specific UX specification...
```

## Phase 2: Content Generation

### 2.1 Extract Core Functionality
From spec.md extract:
- Primary user story → Main flow
- Acceptance scenarios → Interaction points
- Requirements → UX patterns needed
- Edge cases → Critical scenarios

### 2.2 Generate User Flow

**Apply Sequential Thinking Methodology** for flow completeness analysis:
- Extract acceptance scenarios
- Identify decision points
- Map error paths
- Create complete flow with recovery routes

Create comprehensive Mermaid diagram showing complete user journey:
- Include all decision points and their outcomes
- **For each exit path (Cancel, Back, Close, Abort):**
  - Document cleanup behavior (pending request handling, state reset, data persistence)
  - Specify target state after exit

```mermaid
flowchart TD
    Start([Entry]) --> Check{Condition}
    Check -->|Success| Action[Primary Path]
    Check -->|Fail| Error[Error Path]
    Action --> Result[Success State]
    Error --> Recovery[Recovery]
```

### 2.3 Build Interaction Model
Generate JSON for core user actions and system responses.

**Important:** Replace `[PRIMARY_ACTION_NAME]` and `[SECONDARY_ACTION_NAME]` with actual action names (e.g., "submit_form", "upload_file", "refresh_data")
```json
{
  "[actual_action_name]": {
    "trigger": "How user initiates",
    "feedback": "Immediate response",
    "success": "Success state",
    "error": "Error handling"
  }
}
```

For States & Transitions, define complete lifecycle states:
```json
{
  "initial": "User enters feature",
  "processing": "System handling request",
  "success": "Operation completed",
  "error": "Error state requiring user action"
}
```

### 2.4 Quantified UX Elements
- Any numeric value displayed to user (percentages, counts, durations, estimates) MUST have calculation formula
- Any duration or estimate MUST define formula (will be formalized as constants in data-model.md by plan command)
- Format: `[Element]: [Formula or source reference]`

### 2.5 Platform-Specific UX Patterns
**Include only non-N/A patterns for the detected platform. Remove entire platform section if all items are N/A.**

Key patterns by platform:
- **Mobile**: Gestures, Permissions, Offline behavior
- **Web**: Responsive breakpoints, Keyboard navigation, Browser handling
- **Desktop**: Window management, System integration, File operations
- **Browser Extension**: Permissions, Context injection, Storage strategy

### 2.6 Define Error Presentation

**Apply Sequential Thinking Methodology** for error categorization:
- Analyze edge cases from spec.md
- Map to four error types
- Define UI responses for each
- Ensure all scenarios covered

Define four error types (as required by template):
```json
{
  "network_failure": {
    "visual_indicator": "How error appears in UI",
    "message_template": "User-friendly message",
    "action_options": "What user can do",
    "auto_recovery": "Automatic UI behavior"
  },
  "validation_error": { ... },
  "timeout": { ... },
  "permission_denied": { ... }
}
```

### 2.7 Accessibility Standards
Define accessibility requirements with testable criteria:

- **Screen Readers**: ARIA roles, live region types, label associations
- **Navigation**: Keyboard bindings (specific keys: Tab, Enter, Escape, Arrow keys)
- **Visual**: Contrast ratio value, color independence method
- **Touch Targets**: Minimum size value per platform

**Rule**: Each standard MUST include specific testable value or reference to external guideline. Avoid vague terms: "adequate", "sufficient", "appropriate".

## Phase 3: Assembly & Output

### 3.1 Structure Document
Follow template sections:
1. Header (platform)
2. User Flow (Mermaid)
3. Interaction Model (Core Actions, States & Transitions)
4. Quantified UX Elements (formulas and constants)
5. Platform-Specific Patterns (only non-N/A items)
6. Accessibility Standards (4 categories with testable values)
7. Error Presentation (4 error types)

**Note:** Do NOT include Review & Acceptance Checklist in final output

### 3.2 Optimize Content
- Keep descriptions concise but complete
- Remove any N/A sections entirely
- Priority: Flows > Interactions > Error Presentation > Accessibility

### 3.3 Write Document
Write to: `./ai-docs/features/[feature]/ux.md`

## Phase 4: Validate & Report

### 4.1 Content Validation
Verify:
- No duplication of spec.md content
- Focus on UX, not technical implementation
- Platform patterns are UX-relevant
- JSON structure valid
- All four error types defined
- All exit paths have cleanup behavior documented
- All numeric UI elements have formulas
- All accessibility standards have testable values

### 4.2 Report Success
```
✅ UX Specification Complete!

Feature: [feature-name]
Platform: [platform]
Location: ./ai-docs/features/[feature]/ux.md

Summary:
- User Flow: Generated
- Core Actions: Defined
- Platform Patterns: [platform]-specific
- Error Types: 4 scenarios covered
- Accessibility: Standards defined with testable values

Next: /docs:plan <feature-path>
```

# Error Handling

- **Missing files**: "Error: [file] not found. Run [command] first."
- **Platform unclear**: "Platform detection ambiguous. Using spec.md context for best match."
- **Template missing**: "Error: UX template not found at specified path"
- **Duplicate content**: "Warning: Content duplicates spec.md requirements. Regenerating..."
- **Invalid JSON**: "Error: Generated JSON structure invalid. Regenerating..."
- **Incomplete sections**: "Error: Missing required section: [section-name]"
- **Missing exit path cleanup**: "Error: Exit path [name] missing cleanup behavior documentation"
- **Missing formula**: "Error: Numeric UI element [name] missing calculation formula"
- **Vague accessibility**: "Error: Accessibility standard [name] missing testable value"