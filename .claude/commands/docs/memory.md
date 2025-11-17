---
description: Generate and maintain project README.md as implementation status tracker
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate and maintain project README.md as external memory bank for AI agents, tracking implementation status and code dependencies.

**Tools Usage:**
- `Read`: For loading FEATURES.md (feature list), tasks.md files (completion status), existing README.md
- `Write`: For saving README.md
- `Bash`: For analyzing code imports and module structure
- `/mcp__sequential-thinking__sequentialthinking`: For dependency analysis and content generation
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:

For Status Extraction:
- When checking completion: "Read tasks.md → Find [x] checkboxes → Extract IMPL-XXX paths → Map to modules"

For Code Dependencies:
- When building dependency graph: "Scan imports → Build module graph → Detect circular → Mark shared modules"

For Content Generation:
- When filling template: "Fill template sections → Validate completeness → Format output"

**Templates:**
- Readme: @.claude/templates/readme-template.md

**File Structure:**
- Input: `./ai-docs/FEATURES.md`, `./ai-docs/features/*/tasks.md`
- Output: `./ai-docs/README.md`

# Task

Create and maintain README.md as central memory bank providing agents with current implementation status, code module dependencies, and project navigation context.
Document only realized functionality from completed tasks, excluding plans or specifications.

# Rules

## Mode Detection
- If `./ai-docs/README.md` does not exist → Initial Creation Mode
- If `./ai-docs/README.md` exists → Update Mode

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
- Introduction paragraphs or marketing language
- Future aspirations or planned features
- Vague descriptions ("helps with", "improves")
- Duplicate information from other docs
- Explanatory prose or tutorials
- Technology-specific assumptions
- Installation guides or contribution guidelines
- Screenshots, demos, or changelog
- Copy descriptions verbatim from sources
- Track unfinished features

### Writing Style
- Bullet points, not paragraphs
- Action verbs (enables, blocks, requires)
- Technical precision
- Maximum 2 sentences per bullet
- Sub-bullets for details only

## Feature Status Detection from tasks.md

For each feature in FEATURES.md:
1. **Read** `./ai-docs/features/[feature-name]/tasks.md`
2. **Check completion markers**:
   - All tasks with `[x]` checkboxes → Feature is completed
   - Any task with `[ ]` checkbox → Feature is incomplete (skip from README)
3. **Extract implementation details**:
   - Main file: First IMPL-XXX task that creates primary component
   - Key modules: All file paths from IMPL-XXX tasks
   - Module names: Extract from task descriptions

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
```bash
if [ -f "./ai-docs/README.md" ]; then
  MODE="update"
else
  MODE="initial"
fi
```

### 1.2 Load sources
**For Initial Mode:**
- Read `./ai-docs/FEATURES.md` → Extract feature list
- Identify all feature folders

**For Update Mode:**
- Read existing `./ai-docs/README.md` → Load current state
- Read `./ai-docs/FEATURES.md` → Get feature list

### 1.3 Validate inputs
- Verify FEATURES.md exists
- Check feature folders accessible

## Phase 2: Extract Status

### 2.1 Check each feature's completion
For each feature folder from FEATURES.md:
1. **Read** `./ai-docs/features/[feature-name]/tasks.md`
2. **Check all checkboxes**: All `[x]` → completed, any `[ ]` → incomplete
3. **Extract from completed features only**:
   - Main file: First IMPL-XXX task path
   - Key modules: All paths from IMPL-XXX tasks

### 2.2 Map to actual codebase
- Verify extracted paths exist
- Identify actual module boundaries
- Check for additional modules not in tasks

### 2.3 Extract code dependencies
Apply sequential thinking: "Scan imports → Build module graph → Detect circular → Mark shared modules"

```bash
# Analyze imports in codebase
grep -r "import\|require" --include="*.js" --include="*.ts" --include="*.py" ./src
```
- Parse import statements
- Build dependency matrix
- Identify shared modules (used by 3+)
- Check for circular dependencies

## Phase 3: Build Content

### 3.1 Fill template sections

**3.1.1 Project Header**
- Extract project name from FEATURES.md or codebase
- Generate one-sentence description

**3.1.2 Codebase Overview**
- Detect primary language and version
- Identify main framework
- Locate entry point file
- Determine structure type (Modular/Monolithic/Service-based)

**3.1.3 Implementation Status**
- List only completed features (all tasks `[x]`)
- Extract main file from first IMPL-XXX task
- List key modules from all IMPL-XXX tasks

**3.1.4 Dependency Graph**
- Use tree structure with file paths
- Add [SHARED] tags for modules used by 3+
- Group by architectural layers if clear

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
Features Documented: [count]
Modules Mapped: [count]
Location: ./ai-docs/README.md
```

**For Update Mode:**
```
README.md Updated Successfully!

Mode: Update
Changes: [brief summary]
Location: ./ai-docs/README.md
```

# Error Handling

**Input Errors:**
- **FEATURES.md not found**: "Error: No FEATURES.md found at ./ai-docs/FEATURES.md. Run feature command first."
- **tasks.md missing**: "Warning: No tasks.md for feature [feature-name]. Skipping."
- **README exists (initial mode)**: "README.md already exists. Using update mode instead."

**Analysis Errors:**
- **Circular dependency detected**: "Error: Circular dependency found: [A]→[B]→[C]→[A] in code modules."
- **No completed features**: "Warning: No features fully implemented yet. Creating skeleton README with codebase overview only."
- **Module not found**: "Warning: Module [name] referenced but not found in codebase at [path]"

**Validation Errors:**
- **Placeholder detected**: "Error: Placeholder [TBD] found in [section]. Use real data only."
- **Invalid path**: "Error: Path [path] does not exist in codebase."
- **Incomplete tasks**: "Info: Feature [name] has incomplete tasks. Excluded from README."

**Common Errors:**
- **Template not found**: "Error: Template not found at @.claude/templates/readme-template.md"
- **Write permission denied**: "Error: Cannot write to ./ai-docs/README.md. Check permissions."