# [Project Name]

[One-sentence project description - what it is and primary purpose]

## Status: [Phase]
- Phase values: `Development` | `Testing` | `Production`
- Current sprint/milestone if applicable

## Implementation Status

### Completed
- [Component/Feature]: [One-line what it does]
  - Dependencies: [Required components]
  - Location: [File path or folder]
  - Status: ✓ Complete | ⚠ Partial | ✗ Blocked

### In Progress
- [Component/Feature]: [Current state, blocker if any]

## Component Map

### Core Components
**[Component Name]** (`path/to/component`)
Purpose: [Single-line function]
Depends on: [List component names]
Used by: [List component names]

[Repeat for each core component]

### Supporting Components
[Same structure as core]

### External Dependencies
- [Library/Service]: [Why needed, what uses it]

## Dependency Graph

[Text-based graph showing component relationships]

```
[Component A]
├── depends on: [Component B, Component C]
└── used by: [Component D]

[Component B]
├── depends on: [none]
└── used by: [Component A, Component E]
```

## Architecture Decisions

### [Decision Title]
- Context: [Why decision needed]
- Decision: [What was chosen]
- Rationale: [Why this choice]
- Implications: [What this enables/restricts]

## Technical Constraints

- [Constraint]: [Impact on implementation]

## Documentation Index

[Links to detailed documentation]
- API Documentation: `docs/api/`
- Architecture Diagrams: `docs/architecture/`
- Component Details: `docs/components/`