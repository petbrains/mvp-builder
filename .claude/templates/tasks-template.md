# Tasks: [FEATURE_NAME]

## Purpose
Template for generating implementation tasks using TDD cycles for each user story.

## Task Format
- **ID**: Prefix-Number format (INIT-001, TEST-001, IMPL-001...)
- **[Story]**: User story reference (US1, US2...)
- **Description**: Action with file path

### Task Prefixes
- **INIT-**: Project initialization and setup
- **TEST-**: Tests
- **IMPL-**: Implementation

## Story Mapping
** MODEL INSTRUCTION: Acceptance Scenarios from spec.md become User Stories in tasks.md**
- Acceptance Scenarios with priorities (P1, P2, P3) from spec.md map to User Story labels
- [US1] = first scenario by priority order (first P1)
- [US2] = second scenario by priority order (second P1 or first P2)
- [US3] = third scenario by priority order
- Story labels follow scenario priority order: all P1 first, then P2, then P3

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- **Browser Extension**: `extension/src/`
- Use directory structure from plan.md "Feature Code Organization" section
- If not specified, use project's standard conventions

## Test Case Mapping
**Map test cases to feature artifacts:**
- Acceptance scenarios from spec.md → Integration tests
- Functional requirements (FR-*) → Unit/Contract tests  
- UX requirements (UX-*) → UI/E2E tests
- Edge cases from spec.md → Boundary tests
- Error states from ux.md → Error handling tests
- Data models from data-model.md → Model validation tests
- API contracts from contracts/ → Contract tests
- State transitions from data-model.md → State machine tests
- Validation rules from data-model.md → Validation tests
- Message contracts from contracts.md → Integration tests
- Setup requirements → Environment tests
- **Accessibility standards from ux.md → Accessibility tests**
  - Screen reader requirements → ARIA attribute assertions
  - Keyboard navigation → Focus management and key handler tests
  - Visual requirements → Style/attribute validation tests

## MODEL INSTRUCTION
**Task examples below are templates. Generate project-specific tasks based on feature artifacts.**

### Task Generation Rules
- Generate tasks from all feature artifacts
- Core infrastructure tasks (Phase 1) must be generated before user story tasks
- Generate only infrastructure tasks applicable to project architecture
- Organize tasks by TDD cycles within each user story
- Each cycle follows: RED → GREEN phases
- Map test cases according to Test Case Mapping section
- Generate tasks that match project's technology stack and architecture
- Each task must reference specific file paths derived from plan.md
- Maintain consistency with project's naming conventions
- Each user story must have at least RED and GREEN phases
- **TEST-/IMPL- numbering is sequential across ALL user story phases (not reset per phase)**
- **Each state transition from data-model.md must have a TEST task**
- **Each accessibility standard from ux.md must have a TEST task**

## Phase 1: Core Infrastructure

- [ ] INIT-001 Create project structure per plan.md
- [ ] INIT-002 Initialize [language] project per setup.md dependencies
- [ ] INIT-003 Configure linting and formatting tools
- [ ] INIT-004 Setup data layer from data-model.md
- [ ] INIT-005 Implement authentication if required
- [ ] INIT-006 Setup API layer per contracts/ (openapi.yaml if present)
- [ ] INIT-007 Create base entities from data-model.md
- [ ] INIT-008 Configure error handling
- [ ] INIT-009 Setup environment per setup.md requirements
- [ ] INIT-010 Implement state management if specified
- [ ] INIT-011 Setup validation layer if required

## Phase 2: User Story 1 - [Title] (P1 - MVP)

> Note: TEST-/IMPL- numbering is sequential across all user story phases

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-001, UX-001]
- Data entities: [from data-model.md]
- Contracts: [from contracts.md, and openapi.yaml if present]
- States: [if applicable from data-model.md]
- Accessibility: [if applicable from ux.md]

#### RED Phase
- [ ] TEST-001 [US1] Test [requirement/behavior]
- [ ] TEST-002 [US1] Test [edge case from spec.md]

#### GREEN Phase  
- [ ] IMPL-001 [US1] Create [entity] per data-model.md in src/[location]/[file]
- [ ] IMPL-002 [US1] Implement logic to pass tests

### TDD Cycle 2: [API Endpoint]
**Coverage**: 
- Requirements: [FR-002]
- Contracts: [from openapi.yaml endpoint]

#### RED Phase
- [ ] TEST-003 [US1] Test [requirement]

#### GREEN Phase
- [ ] IMPL-003 [US1] Implement in src/[location]/[file]

### TDD Cycle 3: [State Machine]
**Coverage**:
- States: [all transitions from data-model.md]

#### RED Phase
- [ ] TEST-004 [US1] Test state transition [from] → [to] on [trigger]
- [ ] TEST-005 [US1] Test state transition [from] → [to] on [trigger]

#### GREEN Phase
- [ ] IMPL-004 [US1] Implement state machine in src/[location]/[file]

### TDD Cycle 4: [Accessibility]
**Coverage**:
- Accessibility: [standards from ux.md]

#### RED Phase
- [ ] TEST-006 [US1] Test ARIA [role/attribute] on [component]
- [ ] TEST-007 [US1] Test keyboard navigation [key] triggers [action]

#### GREEN Phase
- [ ] IMPL-005 [US1] Add ARIA attributes to [component]
- [ ] IMPL-006 [US1] Implement keyboard handlers

## Phase 3: User Story 2 - [Title] (P2)

> Note: Numbering continues from previous story

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-004, UX-002]

#### RED Phase
- [ ] TEST-008 [US2] Test [requirement]

#### GREEN Phase
- [ ] IMPL-007 [US2] Implement in src/[location]/[file]

## Phase 4: User Story 3 - [Title] (P3)

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-005]

#### RED Phase
- [ ] TEST-009 [US3] Test [requirement]

#### GREEN Phase
- [ ] IMPL-008 [US3] Implement in src/[location]/[file]

## Execution Order

**Order for agents when executing generated tasks:**

1. **Phase 1**: Core Infrastructure (blocks all stories)  
2. **Phase 2-N**: User Stories in priority order (P1 → P2 → P3)
   - Each story is independently testable after Phase 1

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions must match data-model.md specifications
- All state transitions must have corresponding tests
- All accessibility standards must have corresponding tests
- TEST-/IMPL- numbering is sequential across all user stories (not reset per story)

---

## Review Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final tasks.md output.**

### Completeness
- [ ] All user stories have TDD cycles
- [ ] All requirements covered (FR-*, UX-*)
- [ ] Data models from data-model.md implemented
- [ ] API contracts from contracts/ implemented
- [ ] Setup requirements from setup.md implemented
- [ ] Research constraints from research.md applied
- [ ] Each cycle has RED and GREEN phases
- [ ] All state transitions from data-model.md have TEST tasks
- [ ] All accessibility standards from ux.md have TEST tasks
- [ ] All constants from data-model.md referenced in tasks

### Structure
- [ ] Task IDs use correct prefixes (INIT-, TEST-, IMPL-)
- [ ] Story labels consistent ([US1], [US2])
- [ ] File paths specified
- [ ] Priority order maintained (P1 → P2 → P3)
- [ ] Coverage sections properly filled
- [ ] TEST-/IMPL- numbering is sequential across all phases

---