---
description: Generate and maintain project README.md as implementation status tracker
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate and maintain project README.md as external memory bank for AI agents, tracking implementation status and code dependencies.

**Tools Usage:**
- `Read`: For loading tasks.md files and existing README.md
- `Write`: For saving README.md
- `Bash`: For analyzing code imports
- `/mcp__sequential-thinking__sequentialthinking`: For dependency analysis
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:

For Dependency Extraction:
- When finding dependencies: "Read FEATURES.md → Locate target feature → Extract depends on list → Load dependency tasks → Extract module paths"

For Code Dependencies:
- When building graph: "Analyze imports from all modules → Map relationships → Detect circular → Tag shared modules"

For Content Generation:
- When updating README: "Load existing content → Add new feature entry → Update dependency graph → Validate completeness"

**Templates:**
- Readme: @.claude/templates/readme-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/tasks.md` (completed feature tasks file)
- Context: `./ai-docs/FEATURES.md` (for dependencies lookup)
- Output: `./ai-docs/README.md`

# Task

Add completed feature to README.md and update dependency graph using modules from the feature and its dependencies.

# Rules

## Mode Detection
- If `./ai-docs/README.md` does not exist → Initial Creation Mode
- If `./ai-docs/README.md` exists → Update Mode

## Content Rules

### Core Concepts
- **Feature**: Functionality from FEATURES.md  
- **Module**: Code implementation unit (file/component)
- **Shared module**: Used by 3+ other modules
- **Circular dependency**: A→B→C→A (must be avoided)

### Key Requirements
- Use real file paths, not placeholders
- Show actual code dependencies (imports/requires)
- One bullet per feature in Implementation Status
- Tree format for Dependency Graph

## Feature Status Detection from tasks.md

From input tasks.md file:
1. **Extract feature name** from path: `./ai-docs/features/[FEATURE]/tasks.md`
2. **Verify completion**: All tasks must have `[x]` checkboxes
3. **Extract implementation details**:
   - Main file: First IMPL-XXX task that creates primary component
   - Key modules: All file paths from IMPL-XXX tasks

### Dependency Context for Graph Building

From FEATURES.md extract dependencies:
1. **Find feature** using extracted name
2. **Extract "depends on"** list for the feature
3. **For each dependency**: Load their tasks.md files
4. **Extract modules** from dependency features for complete graph context

### Example Parsing
From tasks.md:
```
- [x] IMPL-012 [US1] Create [entity-name] entity in [path/to/entities/[entity]]
- [x] IMPL-013 [US1] Implement [feature] logic in [path/to/[feature]/handler]
```
Extracts:
- Main file: `[path/to/entities/[entity]]`
- Key modules: `[path/to/entities/[entity]]`, `[path/to/[feature]/handler]`

## Dependency Graph Rules

### Extraction Best Practices
- Show only direct dependencies (not transitive)
- Group modules by architectural layers when possible
- Mark modules used by many others (3+) as "shared" or "core"
- Include external package dependencies only if architecturally significant
- Verify no circular dependencies exist (A→B→A)

### Dependency Graph Format
Text format (simple graphs) with file paths:
```
[ModuleA] (`[path/to/moduleA/entry]`) [SHARED]
├── depends on: [ModuleB] (`[path/to/moduleB]`), [ModuleC] (`[path/to/shared/moduleC]`)
└── used by: [ModuleD], [ModuleE], [ModuleF] (`[path/to/moduleF/handler]`)
```
Note: Add [SHARED] tag for modules used by 3+ other modules

# Execution Flow

# Execution Flow

## Phase 1: Initialize & Mode Detection

### 1.1 Check README existence and set mode
- If `./ai-docs/README.md` exists → Update Mode
- If not exists → Initial Mode

### 1.2 Extract feature from input path
- Parse feature name from tasks.md path: `./ai-docs/features/[feature-name]/tasks.md`
- Read input tasks.md → Verify all tasks completed `[x]`
- Read FEATURES.md → Find feature and extract dependencies

### 1.3 Load dependency context
For each dependency from FEATURES.md:
- Read `./ai-docs/features/[dependency]/tasks.md`
- Extract module paths for graph building

## Phase 2: Extract Status

### 2.1 Extract feature implementation details
From target feature's tasks.md:
1. **Verify completion**: All tasks must be `[x]`
2. **Extract main file**: First IMPL-XXX task path
3. **Extract key modules**: All paths from IMPL-XXX tasks

### 2.2 Extract dependency modules for context
For each dependency feature:
1. **Read tasks.md** (already loaded in Phase 1)
2. **Extract module paths** from IMPL-XXX tasks
3. **Build module map**: feature → modules relationship

### 2.3 Analyze code dependencies
Apply sequential thinking: "Scan imports → Build module graph → Detect circular → Mark shared modules"

- Analyze imports for target feature modules and dependencies
- Parse import statements from code files
- Build dependency matrix between all modules
- Identify shared modules (used by 3+)
- Check for circular dependencies

## Phase 3: Build Content

### 3.1 Update or create sections

**For Initial Mode:**
- Create all sections from template
- Add first feature to Implementation Status

**For Update Mode:**
- Keep existing Project Header and Codebase Overview
- **Add new feature** to Implementation Status → Completed
- **Update Dependency Graph** with new modules and relationships

### 3.2 Implementation Status update
Add new feature entry with:
- Feature name and brief description
- Main file path (from first IMPL-XXX task)
- Key module paths (from all IMPL-XXX tasks)

### 3.3 Dependency Graph update
Build comprehensive graph including:
- Modules from new feature
- Modules from its dependencies (for context)
- Show relationships between all modules
- Add [SHARED] tags for modules used by 3+
- Preserve existing graph entries, add new connections

## Phase 4: Validate & Save

### 4.1 Apply validation rules
Before writing README.md, ensure:
- No placeholder text ([TBD], [TODO])  
- All file paths exist in codebase
- Module names match actual implementation
- All completed features have all tasks `[x]`
- Dependency graph has no circular dependencies
- Every sentence adds value

### 4.2 Write README.md
- Load template from @.claude/templates/readme-template.md
- Fill all sections with validated content
- Exclude Review & Acceptance Checklist from output
- Write to `./ai-docs/README.md`

### 4.3 Report completion

**For Initial Mode:**
```
README.md Created Successfully!

Mode: Initial Creation
Feature Added: [feature-name]
Location: ./ai-docs/README.md
```

**For Update Mode:**
```
README.md Updated Successfully!

Mode: Update
Feature Added: [feature-name]
Dependencies Analyzed: [count]
Location: ./ai-docs/README.md
```

# Error Handling

**Input Errors:**
- **Invalid path**: "Error: Input must be tasks.md file in ./ai-docs/features/*/tasks.md format"
- **File not found**: "Error: tasks.md not found at provided path"
- **FEATURES.md not found**: "Error: No FEATURES.md found at ./ai-docs/FEATURES.md. Run feature command first."
- **Feature incomplete**: "Error: Feature has uncompleted tasks `[ ]`. Only completed features can be added."

**Analysis Errors:**
- **Feature not in index**: "Error: Feature [name] not found in FEATURES.md"
- **Dependency not found**: "Warning: Dependency [name] tasks.md not found. Graph context incomplete."
- **Circular dependency**: "Error: Circular dependency found: [A]→[B]→[C]→[A] in code modules."
- **Module not found**: "Warning: Module [path] referenced but not found in codebase."

**Common Errors:**
- **Template not found**: "Error: Template not found at @.claude/templates/readme-template.md"
- **Write permission denied**: "Error: Cannot write to ./ai-docs/README.md. Check permissions."