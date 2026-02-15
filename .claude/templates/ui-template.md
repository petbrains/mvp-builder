# UI Specification: [FEATURE_NAME]

**Platform**: [Web/Mobile/Desktop/Browser Extension]
**Design System**: [Shadcn/MUI/Ant Design/Vuetify/Flutter Material/Native/Custom]

## Screen Inventory

```json
[
  {
    "id": "[SCREEN_ID]",
    "name": "[SCREEN_NAME]",
    "entry": "[HOW_USER_ARRIVES]",
    "purpose": "[WHAT_USER_ACCOMPLISHES]"
  }
]
```

## Component Trees

### [SCREEN_NAME]

```json
{
  "[SCREEN_ID]": {
    "component": "[DS_ROOT_COMPONENT]",
    "children": [
      {
        "component": "[DS_COMPONENT]",
        "props": { "[PROP]": "[VALUE]" },
        "children": [
          {
            "component": "[DS_COMPONENT]",
            "props": {},
            "children": [],
            "notes": "[IMPLEMENTATION_CONTEXT]"
          }
        ]
      }
    ]
  }
}
```
*Note: Expand tree for each screen. Include every component that becomes a file or has a test case.*

## Component Catalog

```json
{
  "[COMPONENT_NAME]": {
    "ds_component": "[EXACT_DS_COMPONENT_NAME]",
    "variants": ["[VARIANT_1]", "[VARIANT_2]"],
    "visual_states": {
      "[STATE_1]": "[DESCRIPTION]",
      "[STATE_2]": "[DESCRIPTION]"
    },
    "used_in": ["[SCREEN_ID_1]", "[SCREEN_ID_2]"]
  }
}
```

## Layout Structure

### [SCREEN_NAME]

```json
{
  "[SCREEN_ID]": {
    "layout": "[vertical-stack | horizontal-split | grid-NxM]",
    "areas": [
      {
        "name": "[AREA_NAME]",
        "position": "[top | left | center | bottom]",
        "sticky": false,
        "scroll": false
      }
    ]
  }
}
```

## Visual State Mapping

```json
{
  "[STATE_FROM_UX_MD]": {
    "visible": ["[COMPONENT_A]", "[COMPONENT_B]"],
    "hidden": ["[COMPONENT_C]"],
    "modified": {
      "[COMPONENT_D]": { "[PROP]": "[NEW_VALUE]" }
    }
  }
}
```

## Responsive Adaptations
**MODEL INSTRUCTION: Only include if ux.md Platform-Specific Patterns define responsive behavior. Remove entire section otherwise.**

```json
{
  "mobile": {
    "[COMPONENT_NAME]": "[CHANGE_DESCRIPTION]"
  },
  "tablet": {
    "[COMPONENT_NAME]": "[CHANGE_DESCRIPTION]"
  },
  "desktop": {
    "[COMPONENT_NAME]": "[CHANGE_DESCRIPTION]"
  }
}
```

---

## Review & Acceptance Checklist
*GATE: Automated checks*
**MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final ui.md output.**

### Screen Coverage
- [ ] All screens from ux.md User Flow have component trees
- [ ] All ux.md Core Actions have corresponding interactive components
- [ ] All ux.md states mapped in Visual State Mapping

### Component Depth
- [ ] Every testable element has a component entry
- [ ] No atomic-level noise (individual icons, spacing tokens)
- [ ] DS component names valid for detected design system

### Layout Completeness
- [ ] Every screen has layout definition
- [ ] Semantic layout only — no CSS, pixels, or framework classes
- [ ] Nested layouts where areas contain sub-layouts

### State Consistency
- [ ] Visual states match ux.md States & Transitions
- [ ] Each state defines visible/hidden/modified components
- [ ] No orphan components (present in tree but never visible in any state)

### Separation of Concerns
- [ ] No behavior descriptions (belongs in ux.md)
- [ ] No requirements duplication (belongs in spec.md)
- [ ] No implementation code (belongs in plan.md)
- [ ] No CSS/pixels/framework-specific syntax

---