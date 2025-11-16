# [PROJECT_NAME]

[ONE_SENTENCE_PROJECT_DESCRIPTION]

## Codebase Overview
- Language: [PRIMARY_LANGUAGE] v[VERSION]
- Framework: [MAIN_FRAMEWORK] v[VERSION]
- Entry point: [MAIN_ENTRY_FILE]
- Structure: [MODULAR/MONOLITHIC/SERVICE_BASED]

## Implementation Status
** MODEL INSTRUCTION: Document only ACTUALLY IMPLEMENTED features with working code. Do not include planned or in-progress features unless explicitly requested.**

### Completed
- [FEATURE_NAME]: [ONE_LINE_DESCRIPTION]
  - Main file: `[PATH_TO_MAIN_FILE]`
  - Key modules: `[MODULE_1]`, `[MODULE_2]`, `[MODULE_3]`

## Dependency Graph
** MODEL INSTRUCTION: Show actual code module dependencies based on imports/requires in the codebase. This is NOT a feature dependency diagram.**

[TEXT_DESCRIPTION_OF_MODULE_RELATIONSHIPS]

```
[MODULE_NAME] (`[MODULE_ENTRY_PATH]`) [OPTIONAL_TAG]
├── depends on: [DEPENDENCY_1], [DEPENDENCY_2]
└── used by: [DEPENDENT_1], [DEPENDENT_2]

[MODULE_A] (`[MODULE_A_PATH]`)
├── depends on: [DATA_LAYER], [UTILITY_MODULE] (`[UTILS_PATH]`)
└── used by: [INTERFACE_LAYER] (`[INTERFACE_PATH]`)

[MODULE_B] (`[MODULE_B_PATH]`)
├── depends on: [DATA_LAYER], [MODULE_A]
└── used by: [INTERFACE_LAYER], [ADMIN_MODULE] (`[ADMIN_PATH]`)
```

---

## Review & Acceptance Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This section is for internal validation only. Do not include in final README.md output.**

### Content Accuracy
- [ ] All listed features are actually implemented
- [ ] File paths exist in codebase
- [ ] Dependencies reflect real imports

### Dependency Graph
- [ ] No circular dependencies
- [ ] All modules shown exist
- [ ] Graph shows code dependencies, not feature dependencies

### Completeness
- [ ] All major modules documented
- [ ] Entry points identified
- [ ] Structure type specified