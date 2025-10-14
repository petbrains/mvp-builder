# UX Specification: [FEATURE_NAME]

**Platform**: [Web/Mobile/Desktop/Browser Extension]

## User Flow

```mermaid
flowchart TD
    Start([Entry Point]) --> Check{Validation}
    Check -->|Valid| Process[Main Process]
    Check -->|Invalid| Error[Error Handling]
    Process --> Decision{Success?}
    Decision -->|Yes| Success[Complete]
    Decision -->|No| Retry[Retry Flow]
    Error --> Recovery[Recovery Path]
    Recovery --> Start
    Retry --> Start
    Success --> End([Exit])
```
*Note: Expand diagram for complex flows with multiple decision points*

## Interaction Model

### Core Actions
- **[PRIMARY_ACTION_NAME]**
  ```json
  {
    "trigger": "[USER_TRIGGER]",
    "feedback": "[IMMEDIATE_FEEDBACK]",
    "success": "[SUCCESS_OUTCOME]",
    "error": "[ERROR_HANDLING]"
  }
  ```

- **[SECONDARY_ACTION_NAME]**
  ```json
  {
    "trigger": "[USER_TRIGGER]",
    "feedback": "[IMMEDIATE_FEEDBACK]",
    "success": "[SUCCESS_OUTCOME]",  
    "error": "[ERROR_HANDLING]"
  }
  ```

### States & Transitions
```json
{
  "[STATE_1]": "[STATE_DESCRIPTION]",
  "[STATE_2]": "[STATE_DESCRIPTION]",
  "[STATE_3]": "[STATE_DESCRIPTION]",
  "[STATE_4]": "[STATE_DESCRIPTION]"
}
```

## Platform-Specific Patterns
** MODEL INSTRUCTION: Only include platforms where requirements differ from "N/A". Remove entire platform section if all items are "N/A".**

### Web
- **Responsive**: [BREAKPOINT_STRATEGY or "N/A"]
- **Keyboard**: [KEYBOARD_NAVIGATION or "N/A"]
- **Browser**: [BROWSER_BEHAVIOR or "N/A"]

### Mobile
- **Gestures**: [GESTURE_SUPPORT or "N/A"]
- **Permissions**: [REQUIRED_PERMISSIONS or "N/A"]
- **Offline**: [OFFLINE_STRATEGY or "N/A"]

### Desktop
- **Window Management**: [WINDOW_BEHAVIOR or "N/A"]
- **System Integration**: [OS_FEATURES or "N/A"]
- **File System**: [FILE_OPERATIONS or "N/A"]

### Browser Extension
- **Permissions**: [EXTENSION_PERMISSIONS or "N/A"]
- **Context**: [INJECTION_CONTEXT or "N/A"]
- **Storage**: [STORAGE_STRATEGY or "N/A"]

## Accessibility Standards

- **Screen Readers**: [ARIA_REQUIREMENTS]
- **Navigation**: [KEYBOARD_SUPPORT]
- **Visual**: [CONTRAST_REQUIREMENTS]
- **Touch Targets**: [SIZE_REQUIREMENTS]

## Error Presentation

```json
{
  "network_failure": {
    "visual_indicator": "[HOW_TO_SHOW]",
    "message_template": "[USER_MESSAGE]",
    "action_options": "[AVAILABLE_ACTIONS]",
    "auto_recovery": "[UI_BEHAVIOR]"
  },
  "validation_error": {
    "visual_indicator": "[HOW_TO_SHOW]",
    "message_template": "[USER_MESSAGE]",
    "action_options": "[AVAILABLE_ACTIONS]",
    "auto_recovery": "[UI_BEHAVIOR]"
  },
  "timeout": {
    "visual_indicator": "[HOW_TO_SHOW]",
    "message_template": "[USER_MESSAGE]",
    "action_options": "[AVAILABLE_ACTIONS]",
    "auto_recovery": "[UI_BEHAVIOR]"
  },
  "permission_denied": {
    "visual_indicator": "[HOW_TO_SHOW]",
    "message_template": "[USER_MESSAGE]",
    "action_options": "[AVAILABLE_ACTIONS]",
    "auto_recovery": "[UI_BEHAVIOR]"
  }
}
```

---

## Review & Acceptance Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final ux.md output.**

### Flow Completeness
- [ ] Entry and exit points clearly defined
- [ ] All user paths documented
- [ ] Error states for each action specified
- [ ] Recovery paths documented

### Interaction Coverage
- [ ] Core actions have all fields (trigger, feedback, success, error)
- [ ] States cover full lifecycle
- [ ] Transitions between states logical

### Platform Consistency
- [ ] Platform-specific requirements identified
- [ ] No contradictions between platforms
- [ ] N/A sections removed from output

### Accessibility Compliance
- [ ] Screen reader requirements specified
- [ ] Keyboard navigation documented
- [ ] Visual standards defined
- [ ] Touch target sizes specified

### Error Presentation
- [ ] Visual indicators for all error types
- [ ] User-friendly message templates
- [ ] Clear action options provided
- [ ] Auto-recovery behavior defined

---