---
description: Generate actionable, dependency-ordered tasks.md for the feature based on available design artifacts.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate actionable tasks list organized by user story priority, enabling independent implementation and testing of each story.

**Tools Usage:**
- `Read`: For loading spec.md, ux.md, plan.md, and other planning documents
- `Write`: For saving generated tasks.md
- `Bash`: For directory existence verification
- `/mcp__sequential-thinking__sequentialthinking`: For complex task dependency analysis and optimization
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:

For User Story Analysis:
- When extracting stories: "Parse spec.md priorities → Map to implementation phases → Identify dependencies → Verify independence"
- When organizing tasks: "Group by user story → Analyze parallelization → Optimize execution order → Generate dependency graph"

For Task Generation:
- When mapping components: "Extract entities from data-model → Map to user stories → Identify shared components → Assign to phases"
- When validating completeness: "Check all requirements covered → Verify testability → Ensure no orphaned tasks → Validate dependencies"

**Templates:**
- Tasks: @.claude/templates/tasks-template.md

**Feature Context:**
- Features list: @ai-docs/FEATURES.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (expects plan.md, spec.md, ux.md)
- Prerequisites: plan.md (required), spec.md (required for user stories), ux.md (required for flows)
- Optional: data-model.md, contracts/, research.md, setup.md
- Output: `./ai-docs/features/[feature]/tasks.md`

# Task

Transform feature design artifacts into executable, priority-ordered task list.
Each user story becomes an independently implementable phase with clear test criteria.
Tasks must be specific enough for LLM execution without additional context.

# Rules

## Task Format Rules

**Checklist Format (REQUIRED)**

Every task MUST strictly follow this format:
```text
- [ ] [TaskID] [P?] [Story?] Description with file path
```

**Format Components:**
1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2. **Task ID**: Sequential number (T001, T002, T003...) in execution order
3. **[P] marker**: Include ONLY if task is parallelizable (different files, no dependencies)
4. **[Story] label**: REQUIRED for user story phase tasks only
   - Format: [US1], [US2], [US3], etc. (maps to user stories from spec.md)
   - Setup/Foundational/Polish phases: NO story label
5. **Description**: Clear action with exact file path

**Valid Examples:**
- ✅ `- [ ] T001 Create project structure per implementation plan`
- ✅ `- [ ] T005 [P] Implement authentication middleware in src/middleware/auth.py`
- ✅ `- [ ] T012 [P] [US1] Create User model in src/models/user.py`

**Invalid Examples:**
- ❌ `- [ ] Create User model` (missing ID and Story label)
- ❌ `T001 [US1] Create model` (missing checkbox)
- ❌ `- [ ] [US1] Create User model` (missing Task ID)

## Task Organization Rules

**From User Stories (spec.md) - PRIMARY:**
- Each user story (P1, P2, P3...) gets its own phase
- Map all related components to their story:
  - Models needed for that story
  - Services needed for that story
  - Endpoints/UI needed for that story
  - Tests specific to that story (if requested)
- Mark story dependencies (most should be independent)

**From Contracts:**
- Map each contract/endpoint → to the user story it serves
- If tests requested: Each contract → contract test task [P] before implementation

**From Data Model:**
- Map each entity to user story(ies) that need it
- If entity serves multiple stories: Put in earliest story or Setup phase
- Relationships → service layer tasks in appropriate story phase

**From Setup/Infrastructure:**
- Shared infrastructure → Setup phase (Phase 1)
- Foundational/blocking tasks → Foundational phase (Phase 2)
- Story-specific setup → within that story's phase

## Phase Structure Rules

**Phase Organization:**
- **Phase 1**: Setup (project initialization)
- **Phase 2**: Foundational (blocking prerequisites - MUST complete before user stories)
- **Phase 3+**: User Stories in priority order (P1, P2, P3...)
  - Within each story: Tests (if requested) → Models → Services → Endpoints → Integration
  - Each phase should be complete, independently testable increment
- **Final Phase**: Polish & Cross-Cutting Concerns

**Test Generation:**
- Tests are OPTIONAL - only generate if explicitly requested in specification or user requests TDD

# Execution Flow

## Phase 1: Load Design Documents

### 1.1 Validate Prerequisites
```bash
# Check required files exist
[ ! -f "./ai-docs/features/$FEATURE/plan.md" ] && echo "Error: plan.md not found" && exit 1
[ ! -f "./ai-docs/features/$FEATURE/spec.md" ] && echo "Error: spec.md not found" && exit 1
[ ! -f "./ai-docs/features/$FEATURE/ux.md" ] && echo "Error: ux.md not found" && exit 1
```

### 1.2 Load Required Documents
- Read `./ai-docs/features/[feature]/plan.md` → Extract tech stack, libraries, structure, test scenarios
- Read `./ai-docs/features/[feature]/spec.md` → Extract user stories with priorities (P1, P2, P3)
- Read `./ai-docs/features/[feature]/ux.md` → Extract flows, patterns

### 1.3 Load Optional Documents
```bash
# Check and load optional documents if they exist
[ -f "./ai-docs/features/$FEATURE/data-model.md" ] && echo "Loading data model..."
[ -f "./ai-docs/features/$FEATURE/research.md" ] && echo "Loading research decisions..."
[ -d "./ai-docs/features/$FEATURE/contracts" ] && echo "Loading API contracts..."
[ -f "./ai-docs/features/$FEATURE/setup.md" ] && echo "Loading setup guide..."
```

If exists:
- `data-model.md` → Extract entities, map to user stories
- `contracts/` → Map endpoints to user stories
- `research.md` → Extract decisions for setup tasks
- `setup.md` → Quick start commands

## Phase 2: Execute Task Generation

### 2.1 Analyze User Stories
Apply `/mcp__sequential-thinking__sequentialthinking` for story analysis:
```
"Extract user stories from spec.md →
Identify priority levels (P1, P2, P3) →
Map acceptance criteria to test scenarios →
Detect inter-story dependencies →
Generate implementation order"
```

### 2.2 Map Components to Stories
For each user story:
- Identify required entities from data-model.md
- Map API endpoints from contracts/
- Extract UI components from ux.md patterns
- Determine service layer needs

### 2.3 Generate Task Hierarchy
Apply `/mcp__sequential-thinking__sequentialthinking` for task organization:
```
"Create setup tasks from infrastructure needs →
Identify foundational blocking tasks →
Group tasks by user story →
Optimize for parallelization →
Generate dependency graph"
```

### 2.4 Validate Task Completeness
Check:
- Each user story has all needed tasks
- Each story is independently testable
- No orphaned tasks without story assignment
- All requirements from spec.md covered

## Phase 3: Generate tasks.md

### 3.1 Load Template
- Read `@.claude/templates/tasks-template.md`
- Extract required sections and structure

### 3.2 Fill Template Sections
Generate content for each section:
- Feature name from plan.md
- Phase 1: Setup tasks
- Phase 2: Foundational tasks
- Phase 3+: User story phases (priority order)
- Final Phase: Polish tasks
- Dependencies section
- Parallel execution examples
- Implementation strategy

### 3.3 Format Validation
Ensure ALL tasks follow format:
- Checkbox present
- Task ID sequential
- [P] marker where applicable
- [Story] label for story tasks
- File paths included

### 3.4 Write Output
```bash
# Save generated tasks.md
echo "Writing tasks.md to ./ai-docs/features/$FEATURE/tasks.md"
```

Write to: `./ai-docs/features/[feature]/tasks.md`

## Phase 4: Validate & Report

### 4.1 Final Validation
Apply `/mcp__sequential-thinking__sequentialthinking` for completeness check:
```
"Verify all user stories covered →
Check task format compliance →
Validate dependency ordering →
Confirm parallel opportunities →
Assess MVP scope"
```

### 4.2 Generate Summary Report
```
✅ Tasks Generation Complete!

Feature: [feature-name]
Location: ./ai-docs/features/[feature]/tasks.md

Summary:
- Total tasks: [count]
- User stories: [count]
- Tasks per story:
  - [US1]: [count] tasks
  - [US2]: [count] tasks
- Parallel opportunities: [count]
- MVP scope: [US1, US2...]

Format validation: ✅ All tasks follow checklist format
Story coverage: ✅ All user stories have complete task sets
```

# Error Handling

## Input Errors
- **Missing required files**: "Error: [file] not found. Run [command] first."
- **No user stories**: "Error: No user stories found in spec.md"
- **Invalid priority**: "Warning: User story without priority designation"

## Generation Errors
- **Incomplete coverage**: "Warning: Requirement [FR-XXX] not mapped to any task"
- **Orphaned tasks**: "Error: Task [ID] not assigned to any phase"
- **Format violations**: "Error: Task [ID] does not follow required format"

## Dependency Errors
- **Circular dependency**: "Error: Circular dependency detected between [US1] and [US2]"
- **Missing prerequisite**: "Error: Story [US2] requires [component] from incomplete story"
- **Invalid parallelization**: "Warning: Task [ID] marked [P] but has dependencies"

## Validation Errors
- **Untestable story**: "Warning: User story [US] has no test criteria"
- **Missing file paths**: "Error: [count] tasks missing file paths"
- **Story mismatch**: "Error: Story label [US] not found in spec.md"