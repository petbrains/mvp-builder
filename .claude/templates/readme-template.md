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
  - Main file: `[path/to/main/file.ts]`
  - Key modules: `[module1.ts]`, `[module2.ts]`, `[module3.ts]`

## Dependency Graph

[Text-based graph showing code module relationships - actual implementation dependencies, not planned feature dependencies]

```
[Database] (`src/db/index.ts`) [SHARED]
├── depends on: [none]
└── used by: [AuthModule], [UserModule], [OrderModule], [ReportModule]

[AuthModule] (`src/auth/index.ts`)
├── depends on: [Database], [TokenManager] (`src/auth/tokens.ts`)
└── used by: [APIRouter] (`src/api/routes.ts`)

[UserModule] (`src/users/index.ts`)
├── depends on: [Database], [AuthModule]
└── used by: [APIRouter], [AdminPanel] (`src/admin/index.ts`)
```