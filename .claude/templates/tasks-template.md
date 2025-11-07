# Tasks: [FEATURE_NAME]

## Purpose
Template for generating implementation tasks using TDD cycles for each user story.

## Task Format
- **ID**: Prefix-Number format (TEST-001, IMPL-002...)
- **[Story]**: User story reference (US1, US2...)
- **Description**: Action with file path

### Task Prefixes
- **TEST-**: Tests
- **IMPL-**: Implementation

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

## MODEL INSTRUCTION
**Task examples below are templates. Generate project-specific tasks based on feature artifacts.**

### Task Generation Rules
- Generate tasks from all feature artifacts:
  - spec.md - user stories and requirements
  - plan.md - technical approach and structure
  - ux.md - flows and interaction patterns
  - data-model.md - entities and relationships
  - contracts/, contracts.md, openapi.yaml - API endpoints, message passing, events, storage schemas
  - research.md - technical decisions for infrastructure tasks
  - setup.md - environment and dependencies
- Core infrastructure tasks (Phase 1) must be generated before user story tasks
- Generate only infrastructure tasks applicable to project architecture
- Organize tasks by TDD cycles within each user story
- Each cycle follows: RED → GREEN phases
- Map test cases according to Test Case Mapping section
- Generate tasks that match project's technology stack and architecture
- Each task must reference specific file paths derived from plan.md
- Maintain consistency with project's naming conventions
- Each user story must have at least RED and GREEN phases

## Phase 1: Core Infrastructure

- [ ] IMPL-001 Create project structure per plan.md
- [ ] IMPL-002 Initialize [language] project per setup.md dependencies
- [ ] IMPL-003 Configure linting and formatting tools
- [ ] IMPL-004 Setup data layer from data-model.md
- [ ] IMPL-005 Implement authentication if required
- [ ] IMPL-006 Setup API layer per contracts/openapi specifications
- [ ] IMPL-007 Create base entities from data-model.md
- [ ] IMPL-008 Configure error handling
- [ ] IMPL-009 Setup environment per setup.md requirements
- [ ] IMPL-010 Implement state management if specified
- [ ] IMPL-011 Setup validation layer if required

## Phase 2: User Story 1 - [Title] (P1 - MVP)

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-001, UX-001]
- Data entities: [from data-model.md]
- Contracts: [from openapi.yaml or contracts.md]
- States: [if applicable from data-model.md]

#### RED Phase
- [ ] TEST-001 [US1] Test [requirement/behavior]
- [ ] TEST-002 [US1] Test [edge case from spec.md]

#### GREEN Phase  
- [ ] IMPL-012 [US1] Create [entity] per data-model.md in src/[location]/[file]
- [ ] IMPL-013 [US1] Implement logic to pass tests

### TDD Cycle 2: [API Endpoint]
**Coverage**: 
- Requirements: [FR-002]
- Contracts: [from openapi.yaml endpoint]

#### RED Phase
- [ ] TEST-003 [US1] Test [requirement]

#### GREEN Phase
- [ ] IMPL-014 [US1] Implement in src/[location]/[file]

## Phase 3: User Story 2 - [Title] (P2)

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-004, UX-002]

#### RED Phase
- [ ] TEST-004 [US2] Test [requirement]

#### GREEN Phase
- [ ] IMPL-015 [US2] Implement in src/[location]/[file]

## Phase 4: User Story 3 - [Title] (P3)

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-005]

#### RED Phase
- [ ] TEST-005 [US3] Test [requirement]

#### GREEN Phase
- [ ] IMPL-016 [US3] Implement in src/[location]/[file]

## Execution Order

**Order for agents when executing generated tasks:**

1. **Phase 1**: Core Infrastructure (blocks all stories)  
2. **Phase 2-N**: User Stories in priority order (P1 → P2 → P3)

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions must match data-model.md specifications

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

### Structure
- [ ] Task IDs use correct prefixes (TEST-, IMPL-)
- [ ] Story labels consistent ([US1], [US2])
- [ ] File paths specified
- [ ] Priority order maintained (P1 → P2 → P3)
- [ ] Coverage sections properly filled

---