---
description: Generate compact UX specifications that complement feature requirements.
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

**File Structure:**
- Input: `./ai-docs/PRD.md` (platform info) + `./ai-docs/features/[feature]/spec.md`
- Output: `./ai-docs/features/[feature]/ux.md`

**Template:** @.claude/templates/ux-template.md

# Task

Transform feature specifications into compact UX documents.
Focus on user interactions, behavior patterns, and platform UX conventions.
Maximum 400 lines per document.

# Rules

## Content Rules
- **Complement, don't duplicate** - Add UX insights, not repeat requirements
- **UX focus** - Interactions, feedback, user flows, not implementation details
- **Structured data** - Use JSON for all component definitions
- **Visual flows** - Mermaid diagrams for user journeys
- **Measurable metrics** - Concrete success criteria

## Size Constraints
- Maximum 400 lines total
- Mermaid diagrams: Flexible (as needed for clarity)
- JSON blocks: 30 lines max per block
- Critical scenarios: 5-6 maximum
- No lengthy prose descriptions

## Platform Detection Priority
1. Explicit platform in PRD.md
2. Platform keywords in spec.md
3. Default to web if unclear

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
```

### 2.2 Confirm Platform
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
Generate JSON for core user actions and system responses:
```json
{
  "primary_action": {
    "trigger": "How user initiates",
    "feedback": "Immediate response",
    "success": "Success state",
    "error": "Error handling"
  }
}
```

### 3.4 Platform-Specific UX Patterns
Include only UX-relevant patterns for the platform:

**Mobile UX:**
- Touch gesture patterns (tap, swipe, pinch)
- Permission request flows
- Offline behavior strategies
- Navigation patterns (tab bar, drawer)

**Web UX:**
- Responsive breakpoints behavior
- Keyboard navigation support
- Browser back/forward handling
- Form validation patterns

**Desktop UX:**
- Window state management
- Keyboard shortcuts
- Drag and drop interactions
- Context menu patterns

### 3.5 Define Critical Scenarios
Select 5-6 most important scenarios:
```json
{
  "scenario_name": {
    "detection": "How system identifies",
    "user_impact": "What user experiences",
    "solution": "UX response",
    "recovery": "How to recover"
  }
}
```

### 3.6 UX Enhancements
Focus on user experience improvements:

**Performance:**
- Response time targets
- Loading feedback strategies
- Timeout handling

**Accessibility:**
- Screen reader support
- Touch target sizes
- Keyboard navigation
- High contrast support

**Error Prevention:**
- Input validation timing
- Confirmation patterns
- Disabled state clarity

### 3.7 Success Metrics
Define measurable UX goals:
- Task completion rate
- Time to complete
- Error rate
- User satisfaction indicators

## Phase 4: Assembly

### 4.1 Structure Document
Follow template sections:
1. Header (platform, dependencies, reference)
2. User Flow (Mermaid)
3. Interaction Model (JSON)
4. Platform-Specific Patterns (UX behaviors only)
5. UX Enhancements (performance, accessibility, prevention)
6. Critical Scenarios (JSON, 5-6 max)
7. Success Metrics (measurable targets)

### 4.2 Apply Size Limits
- If >400 lines: Trim details, keep core UX patterns
- Priority: Flows > Interactions > Scenarios > Enhancements

## Phase 5: Validation

### 5.1 Content Validation
Verify:
- No duplication of spec.md content
- Focus on UX, not technical implementation
- Platform patterns are UX-relevant
- JSON structure valid
- Metrics measurable

### 5.2 Size Check
```bash
line_count=$(wc -l < ux.md)
if [ $line_count -gt 400 ]; then
  echo "Warning: Document exceeds 400 lines ($line_count)"
fi
```

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
- **Platform unclear**: "Platform detection ambiguous. Please specify: 1) Web 2) Mobile 3) Desktop"

## Generation Errors
- **Template missing**: "Error: UX template not found at specified path"
- **Size exceeded**: "Warning: Document exceeds 400 lines, trimming required"

## Validation Errors
- **Duplicate content**: "Warning: Content duplicates spec.md requirements"

# Examples

## Mobile Feature
```
Output includes:
✓ Touch gesture patterns
✓ Permission request UX flow
✓ Offline mode behavior
✗ Technical API details
✗ Database schemas
```

## Web Feature
```
Output includes:
✓ Responsive behavior at breakpoints
✓ Keyboard navigation patterns
✓ Form validation UX
✗ Backend architecture
✗ CSS class names
```

# Quality Checklist

Before finalizing:
- [ ] Under 400 lines total
- [ ] Platform correctly identified
- [ ] No spec.md duplication
- [ ] Focus on UX, not implementation
- [ ] All JSON valid
- [ ] Mermaid renders correctly
- [ ] Metrics measurable
- [ ] Scenarios actionable