---
description: Generate and maintain README.md
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate README.md as navigation map of implemented code for AI agents.

**Tools Usage:**
- `Read`: Load tasks.md, existing README.md, and source files
- `Write`: Save README.md
- `Bash`: Run code-analyzer script

**Skills:**
- Code Analyzer: For loading codebase structure, dependencies, markers, and git context
- Sequential Thinking Methodology: For building dependency graphs and analyzing module relationships
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

**Template:**
- README structure: Embedded in Template section below

**File Structure:**
- Input: `./ai-docs/features/[feature]/`
  - tasks.md (completed implementation tasks)
- Output: `./ai-docs/README.md`

# Task

Transform completed feature implementation into navigation map for AI agents.
Updates README.md with bidirectional dependency graph showing module relationships.
Maintains single source of truth for project structure and entry points.

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

### 1.1 Validate Feature Folder
```bash
# Validate feature folder structure
[ ! -d "./ai-docs/features/$FEATURE" ] && echo "Error: Feature folder not found" && exit 1
[ ! -f "./ai-docs/features/$FEATURE/tasks.md" ] && echo "Error: tasks.md not found" && exit 1
```

### 1.2 Load Feature Context
1. **Extract feature name** from folder: `./ai-docs/features/[name]/`
2. **Load tasks.md** → Verify all tasks marked `[x]`
3. **Extract feature description** from Phase 2 section title (text after "Phase 2:" excluding priority markers)
4. **Extract feature entry point** from first IMPL task in first GREEN Phase of Phase 2
5. **Detect mode** per Mode Detection rules

## Phase 2: Build Navigation Map

### 2.1 Load Code Context

**Apply Code Analyzer skill** to extract:
- Stack (language, framework from extensions and configs)
- Entry points (main/index/app files)
- Module structure (directories, src_modules)
- Existing markers (AICODE-NOTE for context)

### 2.2 Build Dependency Graph

**Apply Sequential Thinking Methodology** to process code-analyzer output:
- Parse all module imports from key files
- Build bidirectional dependency map (depends on + used by)
- Mark shared modules (3+ incoming connections)
- Detect circular dependencies

**Output validation:**
- Primary language
- Main framework  
- Entry point
- Complete dependency graph with bidirectional relations
- Circular dependencies if found

## Phase 3: Generate & Save

### 3.1 Map to Template
1. **Map data to template:**
   - Stack = `[language] | [framework]` from Phase 2
   - Entry = main entry point from Phase 2
   - Features = existing + new feature with description from Phase 1
   - Graph = complete bidirectional map from Phase 2

### 3.2 Validate Output
2. **Validate:**
   - No placeholders remain
   - No circular dependencies
   - All paths exist

### 3.3 Write and Report
3. **Write README.md** to `./ai-docs/README.md`

4. **Report:**
```
README.md [Created/Updated] Successfully!

Mode: [Initial/Update]
Feature: [feature-name]
Total Modules: [count]
Shared Modules: [count]
Location: ./ai-docs/README.md

✅ Feature complete.
Next: /docs:feature (start new feature)
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