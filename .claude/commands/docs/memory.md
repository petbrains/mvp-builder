---
description: Generate and maintain README.md as navigation map for AI agents
allowed-tools: Read, Write, mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate README.md as navigation map of implemented code for AI agents.

**Tools Usage:**
- `Read`: Load tasks.md, existing README.md, and source files
- `Write`: Save README.md
- `/mcp__sequential-thinking__sequentialthinking`: Build dependency graph

**File Structure:**
- Input: `./ai-docs/features/[feature]/`
  - tasks.md (completed implementation tasks)
- Output: `./ai-docs/README.md`

# Task

Process feature folder to add completed implementation to README.md with dependency graph.

# Template

```markdown
# Code Map

Entry: `[MAIN_ENTRY_FILE]`
Stack: [LANGUAGE] | [FRAMEWORK]

## Implemented Features

- [FEATURE_NAME]: [ONE_LINE_DESCRIPTION]
  Entry: `[FEATURE_ENTRY_FILE]`

## Dependency Graph

[MODULE_NAME] (`[PATH]`) [SHARED]
├── depends on: [MODULE_1], [MODULE_2]
└── used by: [MODULE_A], [MODULE_B]
```

# Rules

## Mode Detection
- No README.md or empty → Initial Mode
- Valid README.md exists → Update Mode

## Content Rules
- Real file paths only
- Actual code dependencies from imports
- Bidirectional graph (depends on + used by)
- Mark modules with 3+ incoming as [SHARED]
- Circular dependency = ERROR (blocks update)
- No placeholders in final output

## Import Filtering
Project modules only:
- Relative: `./`, `../`
- Aliases: `@/`, `~/`, `#/`
- Absolute: `/src/`
- Exclude: node_modules, system libraries

## Dependency Graph Format
Bidirectional map per Template. Mark [SHARED] if 3+ incoming connections.

# Execution Flow

## Phase 1: Load & Extract

1. **Extract feature name** from folder: `./ai-docs/features/[name]/`
2. **Load tasks.md** → Verify all tasks marked `[x]`
3. **Extract feature description** from first User Story title in tasks.md Phase 2
4. **Extract feature entry** from first IMPL creating main component in Phase 2
5. **Detect mode** per Mode Detection rules

## Phase 2: Build Navigation Map

Use `/mcp__sequential-thinking__sequentialthinking`:

**Initial Mode - Full scan:**
```
1. Scan all project files
2. Determine primary language by extensions
3. Identify main framework from config/dependencies
4. Locate primary entry point (main/index/app)
5. Parse all module imports
6. Build bidirectional dependency map
7. Mark shared modules (3+ incoming)
8. Detect circular dependencies
```

**Update Mode - Incremental:**
```
1. Scan project including new feature
2. Parse all imports
3. Build complete bidirectional map
4. Mark shared modules
5. Detect circular dependencies
```

**Output:**
- Primary language
- Main framework  
- Entry point
- Complete dependency graph with bidirectional relations
- Circular dependencies if found

## Phase 3: Generate & Save

1. **Map data to template:**
   - Stack = `[language] | [framework]` from Phase 2
   - Entry = main entry point from Phase 2
   - Features = existing + new feature with description from Phase 1
   - Graph = complete bidirectional map from Phase 2

2. **Validate:**
   - No placeholders remain
   - No circular dependencies
   - All paths exist

3. **Write README.md** to `./ai-docs/README.md`

4. **Report:**
   ```
   README.md [Created/Updated] Successfully!
   
   Mode: [Initial/Update]
   Feature: [feature-name]
   Total Modules: [count]
   Shared Modules: [count]
   Location: ./ai-docs/README.md
   ```

# Error Handling

## Critical Errors (Stop)
- **Circular dependency**: "Error: Circular [A→B→C→A]. Fix before updating"
- **Invalid input**: "Error: Input must be ./ai-docs/features/[feature]/ folder"
- **Incomplete tasks**: "Error: Feature has uncompleted tasks"
- **Missing tasks.md**: "Error: tasks.md not found in feature folder"

## Warnings (Continue)
- **Module not found**: "Warning: Cannot resolve [module] in [file]"
- **Parse error**: "Warning: Cannot parse [file]"

## System Errors
- **Write denied**: "Error: Cannot write README.md"