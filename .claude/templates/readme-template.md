# [Project Name]

[One-sentence project description - what it is and primary purpose]

## Codebase Overview
- Language: [Primary language and version]
- Framework: [Main framework and version]
- Entry point: [Main file, e.g., src/index.ts]
- Structure: [Modular/Monolithic/Service-based]

## Implementation Status

### Completed
- [Feature]: [One-line what it does]
  - Entry point: `[path/to/main/file.ts]`
  - Dependencies: [Required features]
  - Key modules: [Main implementation files]

### In Progress
- [Feature]: [Current state] | Blocked by: [blocker if any]
  - Entry point: `[path/to/main/file.ts]`

## Dependency Graph

[Text-based graph showing code module relationships - actual implementation dependencies, not planned feature dependencies]

```
[Module A] (`src/moduleA/index.ts`)
├── depends on: [Module B] (`src/moduleB/`), [Module C] (`src/shared/moduleC.ts`)
└── used by: [Module D] (`src/moduleD/service.ts`)

[Module B] (`src/moduleB/index.ts`)
├── depends on: [none]
└── used by: [Module A], [Module E] (`src/api/routes.ts`)
```

## Architecture Decisions

### [Decision Title]
- Context: [Why decision needed]
- Decision: [What was chosen]
- Rationale: [Why this choice]
- Implications: [What this enables/restricts]

## Technical Constraints

- [Constraint]: [Impact on implementation]