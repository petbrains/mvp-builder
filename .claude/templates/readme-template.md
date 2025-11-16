# [Project Name]

[One-sentence project description - what it is and primary purpose]

## Codebase Overview
- Language: [Primary language and version]
- Framework: [Main framework and version]
- Entry point: [Main entry file]
- Structure: [Modular/Monolithic/Service-based]

## Implementation Status

### Completed
- [Feature]: [One-line what it does]
  - Main file: `[path/to/main/file]`
  - Key modules: `[module1]`, `[module2]`, `[module3]`

## Dependency Graph

[Text-based graph showing code module relationships - actual implementation dependencies, not planned feature dependencies]

```
[DataLayer] (`[data/entry]`) [SHARED]
├── depends on: [none]
└── used by: [ModuleA], [ModuleB], [ModuleC], [ModuleD]

[ModuleA] (`[moduleA/entry]`)
├── depends on: [DataLayer], [UtilityModule] (`[utils/helper]`)
└── used by: [InterfaceLayer] (`[interface/router]`)

[ModuleB] (`[moduleB/entry]`)
├── depends on: [DataLayer], [ModuleA]
└── used by: [InterfaceLayer], [AdminModule] (`[admin/entry]`)
```