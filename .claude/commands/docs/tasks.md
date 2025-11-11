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

**Handling Template Instructions:**
- MODEL INSTRUCTION blocks are for generator guidance only - exclude from output
- Template meta-sections (Task Format, Task Prefixes, Path Conventions, Test Case Mapping, Review Checklist) - use for guidance, don't copy to output
- Output only: Title, Purpose, Phase sections with tasks, Execution Order, Notes

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

Every task MUST use prefix-number format from template "Task Format" section:
```text
- [ ] PREFIX-### [Story?] Description with file path
```

**Prefix System:**
Use prefixes from template "Task Prefixes" section:
- **TEST-**: For RED phase of TDD cycle
- **IMPL-**: For GREEN phase or infrastructure tasks

**Format Components:**
1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2. **Prefix-ID**: Continuous numbering across all phases (e.g., TEST-001...005, then IMPL-001 for infrastructure, IMPL-012... for stories)
3. **[Story] label**: REQUIRED for user story tasks only
   - Format: [US1], [US2], [US3] (maps to user stories from spec.md)
   - Core Infrastructure phase: NO story labels
4. **Description**: Clear action with exact file path

**Valid Examples:**
- ✅ `- [ ] IMPL-001 Create project structure per plan.md`
- ✅ `- [ ] TEST-001 [US1] Test user registration validation in tests/user/registration.test.py`
- ✅ `- [ ] IMPL-012 [US1] Create User model in src/models/user.py`

**Invalid Examples:**
- ❌ `- [ ] T001 [US1] Create model` (wrong prefix format)
- ❌ `- [ ] Create User model` (missing ID and Story label)
- ❌ `TEST-001 [US1] Test validation` (missing checkbox)
- ❌ `- [ ] IMPL-001 [US1] Create model` (infrastructure IDs can't have story labels)

## Task Organization Rules

**From User Stories (spec.md) - PRIMARY:**
- Each user story (P1, P2, P3...) becomes a phase with TDD cycles
- Organize story tasks into TDD Cycles:
  - Group requirements by their target component (same model, same endpoint, same UI component)
  - Each cycle covers specific component/feature
  - RED phase (tests) → GREEN phase (implementation)

**TDD Cycle Structure:**
Each cycle within a user story must have:
1. **Coverage section**: Lists what this cycle implements
   - Requirements: [FR-XXX, UX-XXX] from spec.md
   - Data entities: from data-model.md
   - Contracts: from openapi.yaml or contracts.md
   - States: from data-model.md if applicable
   - Include only applicable fields (skip if no relevant content exists)
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

**Path Resolution Order:**
1. First: Check plan.md "Feature Code Organization" section for selected structure (A/B/C/D)
2. Fallback: Use template "Path Conventions" examples

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
Generate TEST- tasks (RED phase) followed by IMPL- tasks (GREEN phase) following TDD methodology from template.

**Test Case Mapping:**
Apply the Test Case Mapping from template when generating TEST- tasks for each TDD cycle.
The template defines how different requirement types map to test types.

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

### 1.2 Check Feature Dependencies
- Read `./ai-docs/FEATURES.md` → Extract current feature's dependencies
- If "Depends on:" folders listed for current feature:
  - For each dependency folder that exists in `./ai-docs/features/`:
    - Read dependency's plan.md → Extract component names, API endpoints
    - Read dependency's data-model.md → Note shared entities
    - Generate brief context summary:
      ```
      Dependency Context from [dependency-name]:
      - Existing components: [list key components]
      - Shared entities: [list if any]
      - API endpoints: [list if relevant]
      ```
  - Keep this context in memory for task generation

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
- Check if required entities already exist in dependency features
- Map API endpoints from contracts/
- Identify which API endpoints can be reused vs need new implementation
- Extract UI components from ux.md patterns
- Determine service layer needs
- Note shared components that should be referenced, not duplicated
- Group related requirements for TDD cycles

### 2.3 Organize TDD Cycles
Apply `/mcp__sequential-thinking__sequentialthinking` for cycle organization:
```
"For each user story:
Group related requirements into logical cycles by target component →
Define Coverage for each cycle (FR-*, UX-*, entities, contracts) →
Generate RED phase tests from requirements →
Generate GREEN phase implementation tasks →
Validate cycle completeness"
```

**TDD Cycle Generation:**
For each user story phase:
1. Identify component boundaries (model, API, UI, validation)
2. Group requirements by component as shown in template examples
3. For each component, generate:
   - Coverage section listing requirements being addressed
   - RED phase: TEST- tasks testing the requirements
     - If component exists in dependency: generate integration tests, not unit tests
   - GREEN phase: IMPL- tasks implementing functionality
     - If entity exists in dependency: skip model creation tasks, generate only integration tests for new relationships

### 2.4 Generate Task Hierarchy
- Core Infrastructure: Start with IMPL-001, generate project-specific tasks following Phase 1 structure from template
- User Story phases: TEST- tasks continue from TEST-001, IMPL- tasks continue from last IMPL- number of previous phase
- Maintain continuous numbering as shown in template examples

### 2.5 Validate Task Completeness
Check:
- Each user story has TDD cycles covering all requirements
- Each cycle has both RED and GREEN phases
- All requirements from spec.md covered
- Test Case Mapping from template properly applied

## Phase 3: Generate tasks.md

### 3.1 Fill Template Sections

**Important:** Generate content following template structure but exclude all meta-sections (Task Format, Prefixes, Conventions, Mapping, Checklist).

**Generate Core Infrastructure (Phase 1):**
- Start numbering with IMPL-001
- Generate project-specific tasks following Phase 1 structure from template
- Include only tasks applicable to project tech stack and architecture
- Skip tasks not relevant to project (e.g., auth if not needed)
- No story labels for infrastructure tasks

**Minimum generation requirements:**
- Phase 1 must contain at least 5 IMPL- tasks
- Each user story must contain at least 1 TDD cycle
- Each TDD cycle must have at least 2 TEST- tasks and 2 IMPL- tasks

**Generate User Story Phases (Phase 2+):**
For each user story (in priority order):
1. Create phase header with story title and priority
2. Generate TDD cycles within story:
   - Each cycle targets specific component/feature
   - Name each cycle by its component
   - Fill Coverage section (requirements, entities, contracts)
   - Include only applicable Coverage fields
   - Generate RED phase (TEST- tasks with continuous numbering)
   - Generate GREEN phase (IMPL- tasks continuing from last IMPL number)

**Template Section Mapping:**
- Feature name → from plan.md
- Path conventions → use template "Path Conventions" section
- Test Case Mapping → apply from template when generating tests
- Core Infrastructure → generate project-specific tasks following Phase 1 structure from template
- User Stories → generate TDD cycles based on requirements

### 3.2 Format Validation
Ensure ALL tasks follow format:
- Checkbox present (- [ ])
- Prefix-ID format (TEST-001, IMPL-012)
- [Story] label for story tasks only
- File paths included
- Coverage sections complete with only applicable fields

### 3.3 Write Output
```bash
# Save generated tasks.md WITHOUT Review Checklist
echo "Writing tasks.md to ./ai-docs/features/$FEATURE/tasks.md"
```

**Important:** Review Checklist from template is for internal validation only - output ends at "Notes" section

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
- Dependencies from FEATURES.md accounted for

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

Dependencies Context:
- [List any dependency features loaded]

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

## Dependency Errors
- **Circular dependency**: "Error: Circular dependency detected between [feature1] and [feature2]"
- **Missing dependency**: "Warning: Dependency [feature-name] not found, proceeding without context"
- **Incomplete dependency**: "Warning: Dependency [feature-name] missing [artifact], partial context loaded"

## TDD Generation Errors
- **Missing coverage**: "Error: TDD Cycle [N] in [US1] missing Coverage section"
- **No RED phase**: "Error: TDD Cycle [N] missing RED phase (TEST- tasks)"
- **No GREEN phase**: "Error: TDD Cycle [N] missing GREEN phase (IMPL- tasks)"
- **Orphaned tests**: "Error: TEST-[ID] not part of any TDD cycle"

## Task Format Errors
- **Wrong prefix**: "Error: Task [ID] using invalid prefix. Use TEST- or IMPL-"
- **Missing story label**: "Error: Task [ID] in user story phase missing [US#] label"
- **Invalid numbering**: "Error: Task numbering not continuous"
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