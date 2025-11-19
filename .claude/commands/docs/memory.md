---
description: Generate and maintain README.md as navigation map for AI agents
allowed-tools: Read, Write, mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate and maintain README.md as external memory bank for AI agents - a navigation map of implemented code.

**Tools Usage:**
- `Read`: Load tasks.md, existing README.md, and source files
- `Write`: Save README.md
- `/mcp__sequential-thinking__sequentialthinking`: Build dependency graph

**File Structure:**
- Input: `./ai-docs/features/[feature]/`
  - tasks.md (completed implementation tasks)
- Output: `./ai-docs/README.md`

# Task

Process feature folder to add completed implementation to README.md and build/update complete code dependency graph.

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
- No `./ai-docs/README.md` → Initial Mode (scan entire project)
- Exists `./ai-docs/README.md` → Update Mode (full rescan with new feature)

## Content Rules
- Real file paths only
- Actual code dependencies from imports
- Bidirectional graph (depends on + used by)
- Mark modules with 3+ incoming as [SHARED]
- Circular dependency = ERROR (blocks update)
- No placeholders, no water, every word matters

## Import Filtering
Include only project modules:
- Paths starting with `./` or `../`
- Exclude: node_modules, system libraries, external packages

## Dependency Graph Format
Complete bidirectional map as shown in Template - mark modules with [SHARED] if 3+ incoming connections.

# Execution Flow

## Phase 1: Load & Extract

1. **Extract feature name** from folder path: `./ai-docs/features/[name]/`
2. **Read tasks.md** from `[name]/tasks.md` → Verify all marked `[x]`
3. **Extract entry file** from first IMPL task with "Create" or "Implement" in first TDD cycle of the feature (Phase 2+)
4. **Set mode** based on README.md existence

## Phase 2: Build Navigation Map

Call `/mcp__sequential-thinking__sequentialthinking` once:

**For Initial Mode - Project analysis:**
```
Steps:
1. Scan all project files
2. Determine primary language by file extensions
3. Identify main framework from dependencies/config files
4. Locate primary entry point (main/index/app)
5. Parse all module imports
6. Build bidirectional dependency map
7. Mark modules with 3+ incoming connections as SHARED
8. Detect circular dependency chains
```

**For Update Mode - Graph update:**
```
Steps:
1. Scan entire project including new feature modules
2. Parse all imports across codebase
3. Build complete bidirectional dependency map
4. Mark shared modules (3+ incoming)
5. Detect circular dependencies
```

**Expected Output:**
- Project metadata:
  - Primary language
  - Main framework
  - Entry point
- Dependency graph:
  - Complete module list with paths
  - Bidirectional relationships (depends on / used by)
  - Circular dependencies if found
  - Shared modules identified

**If metadata cannot be determined, use placeholders:**
```
Language: [LANGUAGE]
Framework: [FRAMEWORK]
Entry point: [ENTRY]
```

## Phase 3: Save

1. **Generate content using template:**
   - Initial Mode: Entry, Stack, empty Features section, complete Graph
   - Update Mode: Add new feature to Features, replace entire Graph with updated version

2. **Validate before writing:**
   - No placeholders ([TBD], [TODO])
   - Circular dependency check (ERROR = stop)
   - All paths are real

3. **Write README.md:**
   - Save to `./ai-docs/README.md`
   - Use template structure from Template section

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

## Critical Errors (Stop Execution)
- **Circular dependency**: "Error: Circular [A→B→C→A]. Fix code before updating README"
- **Invalid input**: "Error: Input must be ./ai-docs/features/[feature]/ folder"
- **Incomplete tasks**: "Error: Feature has uncompleted tasks [ ]"
- **Missing tasks.md**: "Error: tasks.md not found in feature folder"

## Warnings (Continue)
- **Module not found**: "Warning: Cannot resolve import [module] in [file]"
- **Parse error**: "Warning: Cannot parse [file]. Skipping"

## System Errors
- **Write denied**: "Error: Cannot write ./ai-docs/README.md"