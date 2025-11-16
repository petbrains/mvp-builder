---
description: 
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Memory management rules for maintaining project README.md as implementation status tracker.

**Tools Usage:**
- `Read`: For loading spec.md, ux.md, plan.md, and other planning documents
- `Write`: For saving generated tasks.md
- `Bash`: For directory existence verification
- `/mcp__sequential-thinking__sequentialthinking`: For complex task dependency analysis and optimization
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:


**Templates:**
- Readme: @.claude/templates/readme-template.md

## Purpose

README.md serves as central memory bank providing agents with:
- Current implementation status of features
- Code module dependency graph
- Project context for navigation

**Required sections:**
1. Project Name & Description (one sentence)
2. Codebase Overview (language, framework, entry point, structure)
3. Implementation Status (Completed features only)
4. Dependency Graph (code module relationships with file paths)

**Dependency Graph Extraction:**
- Analyze implemented code structure
- Identify actual module/component dependencies in codebase
- Build graph showing "depends on" and "used by" relationships between code modules
- Include file paths for each module
- Note: This is NOT the same as feature dependencies in FEATURES.md - this shows real code dependencies

### Dependency Graph Best Practices
- Show only direct dependencies (not transitive)
- Group modules by architectural layers when possible
- Mark modules used by many others (3+) as "shared" or "core"
- Include external package dependencies only if architecturally significant
- Verify no circular dependencies exist (A→B→A)

## Content Rules

### Terminology Distinction
- **Feature**: Business functionality from FEATURES.md
- **Module**: Code implementation unit
- Implementation Status tracks **Features**
- Dependency Graph shows **Module** relationships

### Dependency Graph Terminology
- **Module**: Self-contained code unit with clear interface
- **Depends on**: Module A imports/requires Module B to function
- **Used by**: Inverse relationship - Module B is imported by Module A
- **Shared/Core module**: Used by 3+ other modules
- **Circular dependency**: A→B→C→A (must be avoided)

### Must Have
- Every section filled with real data
- Concrete file paths, not placeholders
- Actual dependency relationships

### Must Not Have
- Introduction paragraphs
- Marketing language
- Future aspirations
- Vague descriptions ("helps with", "improves")
- Duplicate information
- Explanatory prose
- Technology-specific assumptions

### Writing Style
- Bullet points, not paragraphs
- Action verbs (enables, blocks, requires)
- Technical precision
- Maximum 2 sentences per bullet
- Sub-bullets for details only

## Feature Status Detection

### Reading tasks.md for Implementation Status

For each feature in FEATURES.md:
1. **Read** `./ai-docs/features/[feature-name]/tasks.md`
2. **Check completion markers**:
   - All tasks with `[x]` checkboxes → Feature is completed
   - Any task with `[ ]` checkbox → Feature is incomplete (skip from README)
3. **Extract implementation details**:
   - Main file: First IMPL task that creates primary component
   - Key modules: All file paths from IMPL tasks in GREEN phases
   - Module names: Extract from "Create [module]" or "Implement [component]" descriptions

### Example Parsing
From tasks.md:
```
- [x] IMPL-012 [US1] Create user entity in [path/to/entities/user]
- [x] IMPL-013 [US1] Implement authentication logic in [path/to/auth/handler]
```
Extracts:
- Main file: `[path/to/entities/user]`
- Key modules: `[path/to/entities/user]`, `[path/to/auth/handler]`

## Initial Analysis (First README Creation)

### Quick Codebase Scan
Before creating the first README.md:

1. **Read FEATURES.md** 
   - Get complete list of features
   - Note feature folders

2. **Check each feature's tasks.md**
   - Read `./ai-docs/features/[feature-name]/tasks.md`
   - Determine completion status (all checkboxes marked?)
   - Extract file paths from IMPL tasks

3. **Map to actual code**
   - Verify extracted paths exist in codebase
   - Identify actual module boundaries
   - Check for additional modules not in tasks

4. **Extract real dependencies**
   - Analyze import statements
   - Identify module relationships
   - Check for circular dependencies (A→B→A)
   - Find integration points between modules

5. **Verify codebase structure**
   - Identify primary language and framework
   - Locate main entry point
   - Determine architecture pattern (Modular/Monolithic/Service-based)

## Update Procedure

### After Feature Completion

1. **Read current README.md**
2. **Read FEATURES.md** to get feature list
3. **Read feature's tasks.md** at `./ai-docs/features/[feature-name]/tasks.md`
4. **Verify all tasks completed** (all checkboxes `[x]`)
5. **Extract implementation details** from IMPL tasks
6. **Add to Completed section** with main file and key modules
7. **Update Dependency Graph** if new code dependencies introduced
8. **Write updated README.md**

### After Adding Module

1. **Read current README.md**
2. **Add to Dependency Graph** with actual code dependencies
3. **Write updated README.md**

### Validation Checklist

Before writing updated README.md:
- [ ] No placeholder text ([TBD], [TODO])
- [ ] All file paths verified to exist in codebase
- [ ] Module names match actual implementation
- [ ] Main files extracted from tasks.md
- [ ] All completed features have `[x]` for all tasks
- [ ] Dependency graph has no orphans or circular dependencies
- [ ] No duplicate information
- [ ] Every sentence adds value

## Dependency Graph Format

Text format (simple graphs) with file paths:
```
[ModuleA] (`[path/to/moduleA/entry]`) [SHARED]
├── depends on: [ModuleB] (`[path/to/moduleB]`), [ModuleC] (`[path/to/shared/moduleC]`)
└── used by: [ModuleD], [ModuleE], [ModuleF] (`[path/to/moduleF/handler]`)
```
Note: Add [SHARED] tag for modules used by 3+ other modules

## Anti-Patterns

**Do Not:**
- Write README.md from scratch (always read first)
- Copy descriptions verbatim
- Include motivation sections
- Add project background prose
- List features as marketing points
- Add contribution guidelines
- Include changelog
- Add future improvements
- Write installation tutorials
- Add screenshots or demos
- Track unfinished features
- Assume technology stack

**Do:**
- Update incrementally after each change
- Keep technical and factual
- Track actual implementation state
- Document what exists now
- Show real dependencies between code modules
- Provide quick agent context
- Extract data from tasks.md

## Example Updates

### Good Update
```markdown
### Completed
- User Authentication: Secure authentication with token refresh
  - Main file: `[auth/entry]`
  - Key modules: `[auth/handler]`, `[auth/validator]`, `[auth/token-manager]`
```

### Bad Update
```markdown
### Completed
- User Authentication: This feature allows users to securely log into 
  the system using their credentials. It provides a robust and scalable
  authentication solution that will help improve security.
```

## When Not to Update

Skip README.md updates for:
- Minor bug fixes (no feature status change)
- Refactoring (no external interface change)
- Documentation updates (unless structure change)
- Code formatting
- Test additions (unless testing new feature)

README.md only:
- Summarizes current state from tasks.md
- Maps implemented code modules
- Shows dependency relationships between code

## File Location

- Always: `./ai-docs/README.md`