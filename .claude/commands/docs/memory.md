---
description: Generate and maintain project README.md as implementation status tracker
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate and maintain project README.md as external memory bank for AI agents, tracking implementation status and code dependencies.

**Tools Usage:**
- `Read`: For loading FEATURES.md, tasks.md files, and existing README.md
- `Write`: For saving generated or updated README.md
- `Bash`: For codebase verification and dependency extraction
- `/mcp__sequential-thinking__sequentialthinking`: For dependency analysis and status detection
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:

For Dependency Analysis:
- When building dependency graph: "Extract imports → Identify module boundaries → Map relationships → Detect circular dependencies → Tag shared modules"
- When verifying dependencies: "Check import statements → Validate module exists → Trace dependency chain → Identify circular patterns"

For Feature Status Detection:
- When checking completion: "Load tasks.md → Parse checkboxes → Extract IMPL tasks → Map file paths → Verify implementation exists"
- When extracting modules: "Parse IMPL descriptions → Extract file paths → Identify component names → Map to codebase structure"

For Update Decision:
- When determining changes: "Compare old README → Identify new completions → Check dependency changes → Validate consistency → Generate update"

**Templates:**
- Readme: @.claude/templates/readme-template.md

**File Structure:**
- Input: `./ai-docs/FEATURES.md`, `./ai-docs/features/*/tasks.md`, existing `./ai-docs/README.md` (if update mode)
- Output: `./ai-docs/README.md`

**Input Parameters:**
- `FEATURE`: Optional feature name or path to specific tasks.md
  - If provided: Update only this feature's status in README
  - If not provided: Scan all features (Initial or Full Update)
  - Accepts: feature name (`[feature-name]`) or direct path (`./ai-docs/features/[feature-name]/tasks.md`)

# Task

Create and maintain README.md as central memory bank providing agents with current implementation status, code module dependencies, and project navigation context.
Document only realized functionality from completed tasks, excluding plans or specifications.

# Rules

## Mode Detection
- If `./ai-docs/README.md` does not exist → Initial Creation Mode
- If `./ai-docs/README.md` exists → Update Mode
- If FEATURE parameter provided → Single Feature Update Mode

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

## Feature Status Detection from tasks.md

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

## Anti-Patterns

**Do Not:**
- Write README.md from scratch (always read first if exists)
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

## When Not to Update

Skip README.md updates for:
- Minor bug fixes (no feature status change)
- Refactoring (no external interface change)
- Documentation updates (unless structure change)
- Code formatting
- Test additions (unless testing new feature)

# Execution Flow

## Phase 0: Mode Detection

### 0.1 Check README existence
```bash
if [ -f "./ai-docs/README.md" ]; then
  MODE="update"
else
  MODE="initial"
fi
```

### 0.2 Parse input parameters
- If FEATURE parameter provided → Set `SINGLE_FEATURE_MODE=true`
- Parse feature name or path
- Validate feature exists

### 0.3 Set execution mode
```
Mode: [initial|update|single_feature_update]
Target: [all_features|specific_feature]
```

## Phase 1: Initialize

### 1.1 Load sources
**For Initial Mode:**
- Read `./ai-docs/FEATURES.md` → Extract complete feature list
- Identify all feature folders

**For Update Mode:**
- Read existing `./ai-docs/README.md` → Load current state
- Read `./ai-docs/FEATURES.md` → Get feature list
- If FEATURE provided → Load only specific `./ai-docs/features/[FEATURE]/tasks.md`
- If no FEATURE → Scan all features

### 1.2 Validate inputs
- Verify FEATURES.md exists
- Check feature folders accessible
- If FEATURE provided → Verify tasks.md exists for specified feature

## Phase 2: Analysis

### 2.A Initial Creation Mode

Apply `/mcp__sequential-thinking__sequentialthinking` for initial codebase analysis.

**2.A.1 Quick Codebase Scan**
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

### 2.B Update Mode

Apply `/mcp__sequential-thinking__sequentialthinking` for change detection.

**2.B.1 After Feature Completion (Single Feature Mode)**
1. **Read current README.md**
2. **Read feature's tasks.md** at `./ai-docs/features/[FEATURE]/tasks.md`
3. **Verify all tasks completed** (all checkboxes `[x]`)
4. **Extract implementation details** from IMPL tasks
5. **Identify dependency changes**

**2.B.2 Full Update Mode**
1. **Read current README.md**
2. **Read FEATURES.md** to get complete feature list
3. **For each feature**: Check tasks.md for completion status
4. **Compare** with current README to identify changes
5. **Extract** new implementations and dependency updates

## Phase 3: Build Content

### 3.1 Generate sections

Apply `/mcp__sequential-thinking__sequentialthinking` for content generation.

**3.1.1 Project Header**
- Extract project name from codebase or FEATURES.md
- Generate one-sentence description

**3.1.2 Codebase Overview**
- Detect primary language and version
- Identify main framework
- Locate entry point file
- Determine structure type

**3.1.3 Implementation Status**
- List only completed features (all tasks `[x]`)
- Extract main file from first IMPL task
- List key modules from all IMPL tasks

### 3.2 Build dependency graph

Apply `/mcp__sequential-thinking__sequentialthinking` for dependency analysis.

**3.2.1 Extract Dependencies**
```bash
# Analyze imports in codebase
grep -r "import\|require" --include="*.js" --include="*.ts" --include="*.py" ./src
```

**3.2.2 Map Module Relationships**
- Parse import statements
- Build dependency matrix
- Identify shared modules (used by 3+)
- Detect circular dependencies

**3.2.3 Format Graph**
- Use tree structure with file paths
- Add [SHARED] tags where applicable
- Group by architectural layers if clear

## Phase 4: Validate

### 4.1 Content validation

Before writing updated README.md:
- [ ] No placeholder text ([TBD], [TODO])
- [ ] All file paths verified to exist in codebase
- [ ] Module names match actual implementation
- [ ] Main files extracted from tasks.md
- [ ] All completed features have `[x]` for all tasks
- [ ] Dependency graph has no orphans or circular dependencies
- [ ] No duplicate information
- [ ] Every sentence adds value

### 4.2 Example validation

**Good Update:**
```markdown
### Completed
- [Feature Name]: [Brief feature description]
  - Main file: `[main/entry/file]`
  - Key modules: `[module/handler]`, `[module/validator]`, `[module/manager]`
```

**Bad Update:**
```markdown
### Completed
- [Feature Name]: This feature allows users to perform specific actions
  within the system. It provides a robust and scalable
  solution that will help improve overall functionality.
```

## Phase 5: Save

### 5.1 Write README.md
- Load template from @.claude/templates/readme-template.md
- Fill all sections with validated content
- Exclude Review & Acceptance Checklist from output
- Write to `./ai-docs/README.md`

### 5.2 Report completion

**For Initial Mode:**
```
README.md Created Successfully!

Mode: Initial Creation
Features Documented: [count]
Modules Mapped: [count]
Location: ./ai-docs/README.md

Project memory bank initialized with current implementation status.
```

**For Update Mode:**
```
README.md Updated Successfully!

Mode: [Update|Single Feature Update]
Feature Updated: [feature-name] (if single feature mode)
Changes: [brief summary]
Location: ./ai-docs/README.md

Implementation status synchronized with completed tasks.
```

# Error Handling

**Input Errors:**
- **FEATURES.md not found**: "Error: No FEATURES.md found at ./ai-docs/FEATURES.md. Run feature command first."
- **Invalid feature path**: "Error: Feature [name] not found at [path]"
- **tasks.md missing**: "Warning: No tasks.md for feature [feature-name]. Skipping."
- **README exists (initial mode)**: "README.md already exists. Using update mode instead."

**Analysis Errors:**
- **Circular dependency detected**: "Error: Circular dependency found: [A]→[B]→[C]→[A]. Review module structure."
- **No completed features**: "Warning: No features fully implemented yet. Creating skeleton README with codebase overview only."
- **Module not found**: "Warning: Module [name] referenced but not found in codebase at [path]"

**Validation Errors:**
- **Placeholder detected**: "Error: Placeholder [TBD] found in [section]. Use real data only."
- **Invalid path**: "Error: Path [path] does not exist in codebase."
- **Incomplete tasks**: "Info: Feature [name] has incomplete tasks. Excluded from README."

**Common Errors:**
- **Template not found**: "Error: Template not found at @.claude/templates/readme-template.md"
- **Write permission denied**: "Error: Cannot write to ./ai-docs/README.md. Check permissions."