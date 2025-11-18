---
description: Generate and maintain project README.md as navigation map for AI agents
allowed-tools: Read, Write, mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate and maintain README.md as external memory bank for AI agents - a navigation map of implemented code.

**Tools Usage:**
- `Read`: Load tasks.md, existing README.md, and source files
- `Write`: Save README.md
- `/mcp__sequential-thinking__sequentialthinking`: Build dependency graph

**Templates:**
- Readme: @.claude/templates/readme-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/tasks.md`
- Output: `./ai-docs/README.md`

# Task

Add completed feature to README.md and build/update complete code dependency graph.

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

## Implementation Status Format
Minimal entry per feature:
```markdown
- [FEATURE_NAME]: [ONE_LINE_DESCRIPTION]
  Main: `[ENTRY_FILE_PATH]`
```

## Dependency Graph Format
Complete bidirectional map:
```
[MODULE_NAME] (`[PATH]`) [SHARED_IF_APPLICABLE]
├── depends on: [MODULE_1], [MODULE_2]
└── used by: [MODULE_A], [MODULE_B]
```

# Execution Flow

## Phase 1: Load & Extract

1. **Extract feature name** from path: `./ai-docs/features/[name]/tasks.md`
2. **Read tasks.md** → Verify all marked `[x]`
3. **Extract module paths** from IMPL tasks creating new files:
   - Look for: "Create", "Implement", "Add"
   - Skip: "Update", "Modify", "Refactor"
   - First create task = Main entry file
4. **Set mode** based on README.md existence
5. **Load template** from @.claude/templates/readme-template.md

## Phase 2: Build Navigation Map

Call `/mcp__sequential-thinking__sequentialthinking` once:

**Input:** 
- Initial Mode: "Scan entire project for all module files"
- Update Mode: "Scan entire project including new modules from [feature]"

**Task:**
```
"Read each module file → Parse all import statements → 
Build complete bidirectional dependency map → 
Mark modules with 3+ incoming connections as SHARED → 
Detect any circular dependency chains → 
Output structured graph in tree format"
```

**Expected Output:**
- Complete module list with paths
- Bidirectional relationships
- Circular dependencies if found
- Shared modules identified

## Phase 3: Save

1. **Generate content:**
   - Initial Mode: Fill all template sections
   - Update Mode: 
     - Keep Project Header and Codebase Overview
     - Add new feature to Implementation Status
     - Replace entire Dependency Graph with updated version

2. **Validate before writing:**
   - No placeholders ([TBD], [TODO])
   - Circular dependency check (ERROR = stop)
   - All paths are real

3. **Write README.md:**
   - Exclude "Review & Acceptance Checklist" section
   - Save to `./ai-docs/README.md`

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
- **Invalid input**: "Error: Input must be ./ai-docs/features/*/tasks.md"
- **Incomplete tasks**: "Error: Feature has uncompleted tasks [ ]"

## Warnings (Continue)
- **Module not found**: "Warning: Cannot resolve import [module] in [file]"
- **Parse error**: "Warning: Cannot parse [file]. Skipping"

## System Errors
- **Template missing**: "Error: Template not found at @.claude/templates/readme-template.md"
- **Write denied**: "Error: Cannot write ./ai-docs/README.md"