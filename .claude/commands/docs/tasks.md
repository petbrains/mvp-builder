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
- Input: `./ai-docs/features/[feature]/` 
  - plan.md (tech stack, libraries, structure)
  - spec.md (user stories with priorities) 
  - ux.md (flows, patterns)
  - data-model.md (entities)
  - contracts/ (API endpoints)
  - research.md (decisions)
  - setup.md (quick start)
- Output: `./ai-docs/features/[feature]/tasks.md`

# Task

Transform feature design artifacts into executable, TDD-structured task list.
Generate tasks organized by user story priority with RED-GREEN cycles for test-driven development.
Each user story becomes independently implementable phase with clear test criteria and coverage mapping.

# Rules

## Task Format Rules

**Task ID Format (REQUIRED)**

Every task MUST use prefix-number format:
```text
- [ ] PREFIX-### [Story?] Description with file path
```

**Prefix System:**
- **TEST-**: Test tasks (RED phase of TDD cycle)
- **IMPL-**: Implementation tasks (GREEN phase or infrastructure)

**Format Components:**
1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2. **Prefix-ID**: TEST-001 or IMPL-001 (sequential within prefix)
3. **[Story] label**: REQUIRED for user story tasks only
   - Format: [US1], [US2], [US3] (maps to user stories from spec.md)
   - Core Infrastructure phase: NO story label
4. **Description**: Clear action with exact file path

**Valid Examples:**
- ✅ `- [ ] IMPL-001 Create project structure per plan.md`
- ✅ `- [ ] TEST-001 [US1] Test user registration validation in tests/user/registration.test.py`
- ✅ `- [ ] IMPL-012 [US1] Create User model in src/models/user.py`

**Invalid Examples:**
- ❌ `- [ ] T001 [US1] Create model` (wrong prefix format)
- ❌ `- [ ] Create User model` (missing ID and Story label)
- ❌ `TEST-001 [US1] Test validation` (missing checkbox)

## Task Organization Rules

**From User Stories (spec.md) - PRIMARY:**
- Each user story (P1, P2, P3...) becomes a phase with TDD cycles
- Organize story tasks into TDD Cycles:
  - Group requirements by their target (same model, same endpoint, same UI component)
  - Each cycle covers specific component/feature
  - RED phase (tests) → GREEN phase (implementation)

**TDD Cycle Structure:**
Each cycle within a user story must have:
1. **Coverage section**: Lists what this cycle implements
   - Requirements: [FR-XXX, UX-XXX] from spec.md
   - Data entities: from data-model.md
   - Contracts: from openapi.yaml or contracts.md
   - States: from data-model.md if applicable
2. **RED Phase**: TEST- prefixed tasks
3. **GREEN Phase**: IMPL- prefixed tasks

**From Contracts:**
- Map each contract/endpoint → to the user story it serves
- Each contract → contract test task in RED phase before implementation

**From Data Model:**
- Map each entity to user story(ies) that need it
- If entity serves multiple stories: Put in earliest story or Core Infrastructure
- Relationships → service layer tasks in appropriate story phase

**From Setup/Infrastructure:**
- Shared infrastructure → Core Infrastructure phase (Phase 1)
- Story-specific setup → within that story's phase as IMPL- tasks

## Phase Structure Rules

**Phase Organization:**
- **Phase 1: Core Infrastructure** - Project setup and shared components
  - All IMPL- tasks, no story labels
  - Blocks all user stories
- **Phase 2+: User Stories** - In priority order (P1 → P2 → P3)
  - Each story organized into TDD cycles
  - Each cycle: Coverage → RED → GREEN
  - Each story independently testable
  
**Test Generation Strategy:**
- **TDD Mode (default)**: Generate TEST- tasks (RED) followed by IMPL- tasks (GREEN)
- **Non-TDD Mode**: Only if explicitly requested - generate only IMPL- tasks
- Template assumes TDD; adapt based on project requirements

**Task Case Mapping (from template):**
- Acceptance scenarios → Integration tests
- Functional requirements (FR-*) → Unit/Contract tests
- UX requirements (UX-*) → UI/E2E tests
- Edge cases → Boundary tests
- Error states → Error handling tests
- Data models → Model validation tests
- API contracts → Contract tests
- State transitions → State machine tests
- Validation rules → Validation tests

# Execution Flow

## Phase 1: Load Design Documents

### 1.1 Load All Feature Documents
- Read `./ai-docs/features/[feature]/plan.md` → Extract tech stack, libraries, structure
- Read `./ai-docs/features/[feature]/spec.md` → Extract user stories with priorities
- Read `./ai-docs/features/[feature]/ux.md` → Extract flows, patterns
- Read `./ai-docs/features/[feature]/data-model.md` → Extract entities, map to stories
- Read `./ai-docs/features/[feature]/contracts/` → Map endpoints to stories
- Read `./ai-docs/features/[feature]/research.md` → Extract decisions for setup
- Read `./ai-docs/features/[feature]/setup.md` → Quick start commands

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
- Group related requirements for TDD cycles

### 2.3 Organize TDD Cycles
Apply `/mcp__sequential-thinking__sequentialthinking` for cycle organization:
```
"For each user story:
- Group requirements by their target component:
  - Same data model → one cycle
  - Same API endpoint → one cycle  
  - Same UI component → one cycle
  - Same validation rule set → one cycle
- Name each cycle by its primary component (e.g., "User Model", "Registration Endpoint", "Login Form")
- Define Coverage for each cycle:
  - Requirements being addressed (FR-*, UX-*)
  - Data entities if used
  - Contracts if tested
  - States only if state machine exists
- Generate RED phase: TEST- tasks from requirements
- Generate GREEN phase: IMPL- tasks to pass tests"
```

**TDD Cycle Generation:**
For each user story phase:
1. Identify component boundaries (model, API, UI, validation)
2. For each component, generate:
   - Coverage section listing requirements being addressed
   - RED phase: TEST- tasks testing the requirements
   - GREEN phase: IMPL- tasks implementing functionality

### 2.4 Generate Task Hierarchy
- Core Infrastructure: IMPL-001 to IMPL-011 (no story labels)
- User Story phases: TDD cycles with TEST- and IMPL- tasks
- Maintain sequential numbering within each prefix across all phases

### 2.5 Validate Task Completeness
Check:
- Each user story has TDD cycles covering all requirements
- Each cycle has both RED and GREEN phases
- All requirements from spec.md covered
- Test Case Mapping properly applied

## Phase 3: Generate tasks.md

### 3.1 Fill Template Sections

**Generate Core Infrastructure (Phase 1):**
- IMPL-001 to IMPL-011 based on project needs
- No story labels for infrastructure tasks
- Adapt to project architecture from plan.md

**Generate User Story Phases (Phase 2+):**
For each user story (in priority order):
1. Create phase header with story title and priority
2. Generate TDD cycles within story:
   - Each cycle targets specific component/feature
   - Name each cycle by its component
   - Fill Coverage section (requirements, entities, contracts)
   - Generate RED phase (TEST- tasks)
   - Generate GREEN phase (IMPL- tasks)
3. Maintain sequential numbering across all tasks

**Template Section Mapping:**
- Feature name → from plan.md
- Path conventions → from plan.md "Feature Code Organization"
- Test Case Mapping → apply to generate appropriate test types
- Core Infrastructure → adapt IMPL-001 to IMPL-011 to project
- User Stories → generate TDD cycles based on requirements

### 3.2 Format Validation
Ensure ALL tasks follow format:
- Checkbox present (- [ ])
- Prefix-ID format (TEST-001, IMPL-012)
- [Story] label for story tasks only
- File paths included
- Coverage sections complete

### 3.3 Write Output
```bash
# Save generated tasks.md WITHOUT Review Checklist
echo "Writing tasks.md to ./ai-docs/features/$FEATURE/tasks.md"
```

**Important:** Review Checklist is for internal validation only - ends at "Notes" section

Write to: `./ai-docs/features/[feature]/tasks.md`

## Phase 4: Validate & Report

### 4.1 Final Validation
Apply `/mcp__sequential-thinking__sequentialthinking` for completeness check:
```
"Verify all user stories have TDD cycles →
Check RED-GREEN phase completeness →
Validate Coverage sections filled →
Confirm task format compliance →
Verify Review Checklist criteria (without including in output)"
```

**Validation using template's Review Checklist (internal only):**
- All user stories have TDD cycles
- All requirements covered (FR-*, UX-*)
- Data models implemented
- API contracts implemented
- Each cycle has RED and GREEN phases
- Task IDs use correct prefixes
- File paths specified

### 4.2 Generate Summary Report
```
✅ Tasks Generation Complete!

Feature: [feature-name]
Location: ./ai-docs/features/[feature]/tasks.md

Summary:
- Core Infrastructure: [count] IMPL tasks
- User Stories: [count] stories
  
Per Story Breakdown:
- [US1 - Title]: 
  - TDD Cycles: [count]
  - TEST tasks: [count]
  - IMPL tasks: [count]
- [US2 - Title]:
  - TDD Cycles: [count]
  - TEST tasks: [count]
  - IMPL tasks: [count]

Total Tasks: [total count]
- TEST tasks: [total]
- IMPL tasks: [total]

TDD Coverage: ✅ All requirements have test coverage
Format validation: ✅ All tasks follow PREFIX-### format
```

# Error Handling

## Input Errors
- **Missing required files**: "Error: [file] not found. Run [command] first."
- **No user stories**: "Error: No user stories found in spec.md"
- **Invalid priority**: "Warning: User story without priority designation"
- **Template not found**: "Error: tasks-template.md not found at specified path"

## TDD Generation Errors
- **Missing coverage**: "Error: TDD Cycle [N] in [US1] missing Coverage section"
- **No RED phase**: "Error: TDD Cycle [N] missing RED phase (TEST- tasks)"
- **No GREEN phase**: "Error: TDD Cycle [N] missing GREEN phase (IMPL- tasks)"
- **Orphaned tests**: "Error: TEST-[ID] not part of any TDD cycle"

## Task Format Errors
- **Wrong prefix**: "Error: Task [ID] using invalid prefix. Use TEST- or IMPL-"
- **Missing story label**: "Error: Task [ID] in user story phase missing [US#] label"
- **Invalid numbering**: "Error: Task numbering not sequential within prefix"
- **Missing file paths**: "Error: [count] tasks missing file paths"

## Coverage Errors
- **Incomplete requirements**: "Warning: Requirement [FR-XXX] not mapped to any TDD cycle"
- **Unmapped entities**: "Warning: Entity [name] from data-model.md not covered"
- **Missing contracts**: "Warning: API endpoint [path] not tested"
- **Story mismatch**: "Error: Story label [US] not found in spec.md"

## Validation Errors
- **Review Checklist included**: "Error: Review Checklist must not be in final output"
- **Cycle incomplete**: "Warning: TDD Cycle has tests but no implementation"
- **Test mapping invalid**: "Error: Test type doesn't match Test Case Mapping rules"