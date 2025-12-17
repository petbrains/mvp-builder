---
description: Generate actionable, dependency-ordered tasks.md
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate actionable tasks list organized by user story priority, enabling independent implementation and testing of each story.

**Tools Usage:**
- `Read`: For loading spec.md, ux.md, plan.md, and other planning documents
- `Write`: For saving generated tasks.md
- `Bash`: For directory existence verification and prerequisites validation

**Skills:**
- Sequential Thinking Methodology: For complex task dependency analysis and optimization
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

**Templates:**
- Tasks: @.claude/templates/tasks-template.md

**Handling Template Instructions:**
- MODEL INSTRUCTION blocks are for generator guidance only - exclude from output
- Template meta-sections - use for guidance, don't copy to output:
  - Task Format, Task Prefixes, Path Conventions, Test Case Mapping
  - MODEL INSTRUCTION, Task Generation Rules, Review Checklist
- Output only: Title, Purpose, Phase sections with tasks, Execution Order, Notes

**Feature Context:**
- Features list: @ai-docs/FEATURES.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` 
  - plan.md (tech stack, libraries, structure)
  - spec.md (user stories with priorities) 
  - ux.md (flows, patterns)
  - data-model.md (entities)
  - contracts/ (openapi.yaml for REST API, contracts.md for messages — both optional)
  - research.md (decisions)
  - setup.md (quick start)
- Output: `./ai-docs/features/[feature]/tasks.md`

# Task

Transform feature design artifacts into executable, TDD-structured task list.
Generate tasks organized by user story priority with RED-GREEN cycles for test-driven development.
Each user story becomes independently implementable phase with clear test criteria and coverage mapping.

# Rules

## Story Mapping
- Acceptance Scenarios from spec.md with priorities (P1, P2, P3) become User Stories in tasks
- [US1] maps to first P1 scenario, [US2] to second scenario by priority order, etc.
- Story labels follow scenario priority order: all P1 scenarios first, then P2, then P3
- Each scenario with unique priority marker becomes a separate User Story phase

## Task Format Rules

**Task ID Format (REQUIRED)**

Every task MUST use prefix-number format from template "Task Format" section:
```text
- [ ] PREFIX-### [Story?] Description with file path
```

**Prefix System:**
Use prefixes from template "Task Prefixes" section:
- **INIT-**: For Phase 1 infrastructure tasks
- **TEST-**: For RED phase of TDD cycle
- **IMPL-**: For GREEN phase or story implementation

**Format Components:**
1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)
2. **Prefix-ID**: Each prefix has independent numbering (INIT-001..., TEST-001..., IMPL-001...)
3. **[Story] label**: REQUIRED for user story tasks only
   - Format: [US1], [US2], [US3] (maps to acceptance scenarios from spec.md by priority order)
   - Core Infrastructure phase: NO story labels
4. **Description**: Clear action with exact file path

**Valid Examples:**
- ✅ `- [ ] INIT-001 Create project structure per plan.md`
- ✅ `- [ ] TEST-001 [US1] Test user registration validation in tests/user/registration.test.py`
- ✅ `- [ ] IMPL-001 [US1] Create User model in src/models/user.py`

**Invalid Examples:**
- ❌ `- [ ] T001 [US1] Create model` (wrong prefix format)
- ❌ `- [ ] Create User model` (missing ID and Story label)
- ❌ `TEST-001 [US1] Test validation` (missing checkbox)
- ❌ `- [ ] INIT-001 [US1] Create model` (infrastructure IDs can't have story labels)

## Task Organization Rules

**From User Stories (spec.md) - PRIMARY:**
- Each acceptance scenario (P1, P2, P3...) becomes a phase with TDD cycles
- Organize story tasks into TDD Cycles:
  - Group requirements by their target component (same model, same endpoint, same UI component)
  - Each cycle covers specific component/feature
  - RED phase (tests) → GREEN phase (implementation)

**TDD Cycle Structure:**
Each cycle within a user story must have:
1. **Coverage section**: Lists what this cycle implements
   - Requirements: [FR-XXX, UX-XXX] from spec.md
   - Data entities: from data-model.md
   - Contracts: from contracts/ (openapi.yaml and/or contracts.md if present)
   - States: from data-model.md if applicable
   - Accessibility: from ux.md Accessibility Standards (if applicable)
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

**From State Machine (data-model.md States section):**
- Extract all state transitions from data-model.md
- Each state transition MUST have corresponding TEST task
- Map transitions to TDD cycles by trigger type (user action, system event, timeout, error)

**From Setup/Infrastructure:**
- Shared infrastructure → Core Infrastructure phase (Phase 1)
- Story-specific setup → within that story's phase as IMPL- tasks

**Path Resolution Order:**
1. First: Check plan.md "Feature Code Organization" section for selected structure (A/B/C/D)
2. Fallback: Use template "Path Conventions" examples

## Phase Structure Rules

**Phase Organization:**
- **Phase 1: Core Infrastructure** - Project setup and shared components
  - All INIT- tasks, no story labels
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

## Phase 0: Validate Prerequisites

### 0.1 Check Required Inputs
```bash
# Validate core inputs exist
[ ! -f "./ai-docs/features/$FEATURE/spec.md" ] && echo "Error: spec.md not found. Run feature command first." && exit 1
[ ! -f "./ai-docs/features/$FEATURE/ux.md" ] && echo "Error: ux.md not found. Run ux command first." && exit 1
[ ! -f "./ai-docs/features/$FEATURE/plan.md" ] && echo "Error: plan.md not found. Run plan command first." && exit 1
[ ! -f "./ai-docs/features/$FEATURE/data-model.md" ] && echo "Error: data-model.md not found. Run plan command first." && exit 1
```

### 0.2 Check Optional Inputs
```bash
# Note optional files availability
[ -f "./ai-docs/features/$FEATURE/contracts/openapi.yaml" ] && echo "OpenAPI spec found"
[ -f "./ai-docs/features/$FEATURE/contracts/contracts.md" ] && echo "Message contracts found"
[ -f "./ai-docs/features/$FEATURE/research.md" ] && echo "Research notes found"
[ -f "./ai-docs/features/$FEATURE/setup.md" ] && echo "Setup guide found"
```

## Phase 1: Load Design Documents

### 1.1 Load All Feature Documents
- Read `./ai-docs/features/[feature]/plan.md` → Extract tech stack, libraries, structure
- Read `./ai-docs/features/[feature]/spec.md` → Extract acceptance scenarios with priorities
- Read `./ai-docs/features/[feature]/ux.md` → Extract flows, patterns
- Read `./ai-docs/features/[feature]/data-model.md` → Extract entities, map to stories
- Read `./ai-docs/features/[feature]/contracts/` → Map endpoints/messages to stories
  - openapi.yaml: REST API contracts (if present)
  - contracts.md: Message/event contracts (if present)
- Read `./ai-docs/features/[feature]/research.md` → Extract decisions for setup
- Read `./ai-docs/features/[feature]/setup.md` → Extract dependencies

### 1.2 Apply Research Constraints
- Extract technology decisions and constraints from research.md
- Apply to infrastructure task generation (affects HOW, not WHAT)
- Note rejected alternatives to avoid regenerating them

### 1.3 Check Feature Dependencies
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

**Apply Sequential Thinking Methodology** for story analysis:
- Extract acceptance scenarios from spec.md
- Identify priority levels (P1, P2, P3)
- Map scenarios to User Story labels ([US1], [US2], [US3]) by priority order
- Map acceptance criteria to test scenarios
- Detect inter-story dependencies
- Generate implementation order

### 2.2 Map Components to Stories
For each user story:
- Identify required entities from data-model.md
- Check if required entities already exist in dependency features
- Map API endpoints from contracts/
- Identify which API endpoints can be reused vs need new implementation
- Extract all accessibility requirements from ux.md Accessibility Standards section
- Map each error type from ux.md Error Presentation to specific error handling components
- Determine service layer needs
- Note shared components that should be referenced, not duplicated
- Group related requirements for TDD cycles
- **Extract state machine from data-model.md States section**
  - Each state transition MUST have corresponding TEST task
  - Map transitions to TDD cycles by trigger type (user action, system event, timeout, error)

### 2.3 Organize TDD Cycles

**Apply Sequential Thinking Methodology** for cycle organization:
- Group related requirements into logical cycles by target component
- Define Coverage for each cycle (FR-*, UX-*, entities, contracts)
- Generate RED phase tests from requirements
- Generate GREEN phase implementation tasks
- Validate cycle completeness

**TDD Cycle Generation:**
For each user story phase:
1. Identify component boundaries (model, API, UI, validation)
2. Group requirements by component as shown in template examples
3. For each component, generate:
   - Coverage section listing requirements being addressed
   - RED phase: TEST- tasks testing the requirements
     - Generate separate test for each error type defined in ux.md Error Presentation section
     - If component exists in dependency: generate integration tests, not unit tests
     - Generate test for each state transition from data-model.md
   - GREEN phase: IMPL- tasks implementing functionality
     - If entity exists in dependency: skip model creation tasks, generate only integration tests for new relationships

### 2.4 Generate Task Hierarchy
- Core Infrastructure: Start with INIT-001
- User Story phases: TEST- and IMPL- tasks use cross-phase sequential numbering
- Each prefix maintains independent sequential numbering across ALL phases

**Numbering Scope:**
- INIT-: Sequential within Phase 1 only (INIT-001 to INIT-NNN)
- TEST-: Sequential across all user story phases (US1: TEST-001...TEST-007, US2: TEST-008...)
- IMPL-: Sequential across all user story phases (US1: IMPL-001...IMPL-006, US2: IMPL-007...)

This ensures unique task IDs across entire document.

### 2.5 Validate Task Completeness
Check:
- Each user story has TDD cycles covering all requirements
- Each cycle has both RED and GREEN phases
- All requirements from spec.md covered
- Test Case Mapping from template properly applied
- All platform-specific patterns from ux.md have corresponding tests
- All accessibility standards from ux.md have validation tests
- All state transitions from data-model.md have corresponding tests
- All constants from data-model.md are referenced in at least one task

## Phase 3: Generate tasks.md

### 3.0 Core Generation Principle
**Extract and use EXACT values from source documents:**
- Package names from setup.md
- Constant names and values from data-model.md
- Error type names from ux.md
- State names from data-model.md
- Component paths from plan.md
Never use placeholder values or generic descriptions.

**Constants Coverage Rule:**
- Every constant defined in data-model.md MUST appear in at least one TEST or IMPL task
- During validation, flag unused constants: "Warning: Constant [NAME] defined but not referenced"

### 3.1 Fill Template Sections

**Important:** Generate content following template structure but exclude all meta-sections (Task Format, Prefixes, Conventions, Mapping, Checklist).

**Generate Core Infrastructure (Phase 1):**
- Start numbering with INIT-001
- Generate project-specific tasks following Phase 1 structure from template
- Generate infrastructure tasks using exact dependencies from setup.md
- Skip tasks not relevant to project (e.g., auth if not needed)
- No story labels for infrastructure tasks

**Minimum generation requirements:**
- Phase 1 must contain at least 5 INIT- tasks
- Each user story must contain at least 1 TDD cycle covering its requirements
- Each TDD cycle must have at least 1 TEST- task and 1 IMPL- task
- Complex cycles (multiple requirements) typically have 2-4 tasks per phase

**Generate User Story Phases (Phase 2+):**
For each user story (in priority order):
1. Create phase header with story title and priority
2. Generate TDD cycles within story:
   - Each cycle targets specific component/feature
   - Name each cycle by its component
   - Fill Coverage section (requirements, entities, contracts)
   - Include only applicable Coverage fields
   - Generate RED phase (TEST- tasks with sequential numbering)
   - Generate GREEN phase (IMPL- tasks with sequential numbering)

**Template Section Mapping:**
- Feature name → from plan.md
- Path conventions → use template "Path Conventions" section
- Test Case Mapping → apply from template when generating tests
- Core Infrastructure → generate project-specific tasks following Phase 1 structure from template
- User Stories → generate TDD cycles based on requirements

### 3.2 Format Validation
Ensure ALL tasks follow format:
- Checkbox present (- [ ])
- Prefix-ID format (INIT-001, TEST-001, IMPL-001)
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

**Apply Sequential Thinking Methodology** for completeness check:
- Verify all user stories have TDD cycles
- Check RED-GREEN phase completeness
- Validate Coverage sections filled
- Confirm task format compliance
- Verify Review Checklist criteria (without including in output)

**Validation using template's Review Checklist (internal only):**
- All user stories have TDD cycles
- All requirements covered (FR-*, UX-*)
- Data models implemented
- API contracts implemented
- Each cycle has RED and GREEN phases
- Task IDs use correct prefixes
- File paths specified
- Dependencies from FEATURES.md accounted for
- All state transitions have tests
- All constants referenced

### 4.2 Generate Summary Report
```
✅ Tasks Generation Complete!

Feature: [feature-name]
Location: ./ai-docs/features/[feature]/tasks.md

Summary:
- Core Infrastructure: [count] INIT tasks
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
- INIT tasks: [total]
- TEST tasks: [total]
- IMPL tasks: [total]

Coverage Validation:
- State transitions: [count] tested
- Constants referenced: [count]/[total]

TDD Coverage: ✅ All requirements have test coverage
Format validation: ✅ All tasks follow PREFIX-### format

Next: /docs:validation <feature-path>
```

# Error Handling

- **Missing files**: "Error: [file] not found. Run [command] first."
- **Invalid format**: "Error: Task [ID] - [specific issue with format/prefix/numbering]"
- **Incomplete TDD**: "Error: TDD Cycle [N] missing [RED/GREEN] phase"
- **Coverage gaps**: "Warning: [Requirement/Entity/Contract] not mapped to any cycle"
- **Dependency issues**: "Warning: Dependency [name] [not found/circular/incomplete]"
- **Invalid numbering**: "Error: Task numbering not sequential within prefix"
- **Template issues**: "Error: Review Checklist must not be in output"
- **Missing state transition test**: "Error: State transition [from → to] has no corresponding TEST task"
- **Unused constant**: "Warning: Constant [NAME] defined in data-model.md but not referenced in any task"
- **Missing accessibility test**: "Warning: Accessibility standard [name] has no corresponding TEST task"

Report first 5 errors, then summary count if more.