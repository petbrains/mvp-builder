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
- `/mcp__sequential-thinking__sequentialthinking`: For complex analysis when needed
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:

For Platform Detection:
- When platform ambiguous: "Analyze keywords in spec → Check PRD context → Calculate platform confidence → Select best match"
- When multiple platforms possible: "Extract platform indicators → Weight by context → Compare scores → Determine primary platform"

For User Flow Generation:
- When mapping scenarios: "Extract acceptance scenarios → Identify decision points → Map error paths → Create complete flow"
- When validating flow completeness: "Check all paths → Verify error handling → Ensure recovery routes → Validate start/end points"

For Interaction Model:
- When selecting core actions: "List all user actions → Analyze frequency → Determine criticality → Select primary set"
- When defining states: "Map user journey → Identify state changes → Define transitions → Verify completeness"

For Error Presentation:
- When categorizing errors: "Analyze edge cases → Map to four types → Define UI responses → Ensure all scenarios covered"

**File Structure:**
- Input: `./ai-docs/PRD.md` (platform info) + `./ai-docs/features/[feature]/spec.md`
- Output: `./ai-docs/features/[feature]/ux.md`

**Template:** @.claude/templates/ux-template.md

# Task

Transform feature specifications into compact UX documents.
Focus on user interactions, behavior patterns, and platform UX conventions.
Document should be comprehensive yet concise, focusing on UX patterns essential for implementation.

# Rules

## Content Rules
- **Complement, don't duplicate** - Add UX insights, not repeat requirements
- **Structured data** - Use JSON for all component definitions, Mermaid for flows
- **Platform-aware** - Include only UX-relevant patterns for detected platform
- **Template compliance** - Exclude Review Checklist from final output

# Execution Flow

## Phase 1: Initialize

### 1.1 Validate Input
```bash
if [ ! -f "./ai-docs/features/$FEATURE/spec.md" ]; then
  echo "Error: spec.md not found for feature: $FEATURE"
  exit 1
fi
```

### 1.2 Load Sources
- Read `./ai-docs/features/[feature]/spec.md` - Extract requirements and functionality
- Read `./ai-docs/PRD.md` if exists - Extract platform information

## Phase 2: Platform Detection

### 2.1 Analyze Platform Indicators
```
PRD explicit platform → Use PRD platform
Else analyze keywords:
  - Mobile: iOS, Android, app, gesture, notification
  - Web: browser, responsive, URL, cookie, React
  - Desktop: Electron, Windows, macOS, system tray
  - Browser Extension: extension, popup, content script, chrome API, manifest
```

### 2.2 Confirm Platform
If platform unclear, apply `/mcp__sequential-thinking__sequentialthinking` for platform detection.

```
✅ Feature loaded: [feature-name]
🎯 Platform detected: [platform]
Generating [platform]-specific UX specification...
```

## Phase 3: Content Generation

### 3.1 Extract Core Functionality
From spec.md extract:
- Primary user story → Main flow
- Acceptance scenarios → Interaction points
- Requirements → UX patterns needed
- Edge cases → Critical scenarios

### 3.2 Generate User Flow
Apply `/mcp__sequential-thinking__sequentialthinking` for flow completeness analysis.

Create comprehensive Mermaid diagram showing complete user journey:
```mermaid
flowchart TD
    Start([Entry]) --> Check{Condition}
    Check -->|Success| Action[Primary Path]
    Check -->|Fail| Error[Error Path]
    Action --> Result[Success State]
    Error --> Recovery[Recovery]
```

### 3.3 Build Interaction Model
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

### 3.4 Platform-Specific UX Patterns
**Include only non-N/A patterns for the detected platform. Remove entire platform section if all items are N/A.**

Key patterns by platform:
- **Mobile**: Gestures, Permissions, Offline behavior
- **Web**: Responsive breakpoints, Keyboard navigation, Browser handling
- **Desktop**: Window management, System integration, File operations
- **Browser Extension**: Permissions, Context injection, Storage strategy

### 3.5 Define Error Presentation
Apply `/mcp__sequential-thinking__sequentialthinking` for error categorization.

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

### 3.6 Accessibility Standards
Define accessibility requirements:

- **Screen Readers**: ARIA requirements, label structure
- **Navigation**: Keyboard support, focus management
- **Visual**: Contrast requirements, color independence
- **Touch Targets**: Minimum sizes for mobile/desktop

## Phase 4: Assembly

### 4.1 Structure Document
Follow template sections:
1. Header (platform)
2. User Flow (Mermaid)
3. Interaction Model (Core Actions, States & Transitions)
4. Platform-Specific Patterns (only non-N/A items)
5. Accessibility Standards (4 categories)
6. Error Presentation (4 error types)

**Note:** Do NOT include Review & Acceptance Checklist in final output

### 4.2 Optimize Content
- Keep descriptions concise but complete
- Remove any N/A sections entirely
- Priority: Flows > Interactions > Error Presentation > Accessibility

## Phase 5: Validation

### 5.1 Content Validation
Verify:
- No duplication of spec.md content
- Focus on UX, not technical implementation
- Platform patterns are UX-relevant
- JSON structure valid
- All four error types defined

## Phase 6: Save

### 6.1 Write Document
Write to: `./ai-docs/features/[feature]/ux.md`

### 6.2 Report Success
```
✅ UX Specification Complete!

Platform: [platform]
Feature: [feature-name]
Location: ./ai-docs/features/[feature]/ux.md
```

# Error Handling

## Input Errors
- **Spec not found**: "Error: No spec.md found at ./ai-docs/features/[feature]/spec.md"
- **PRD missing**: "Warning: PRD.md not found, using spec.md for platform detection"

## Detection Errors
- **Platform unclear**: "Platform detection ambiguous. Please specify: 1) Web 2) Mobile 3) Desktop 4) Browser Extension"

## Generation Errors
- **Template missing**: "Error: UX template not found at specified path"

## Validation Errors
- **Duplicate content**: "Warning: Content duplicates spec.md requirements"
- **Invalid JSON**: "Error: Generated JSON structure invalid. Regenerating..."