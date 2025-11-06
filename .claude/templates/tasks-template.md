# Tasks: [FEATURE_NAME]

## Purpose
Defines implementation tasks using TDD cycles for each user story.

## Task Format
- **ID**: Prefix-Number format (TEST-001, IMPL-002...)
- **[Story]**: User story reference (US1, US2...)
- **Description**: Action with file path

### Task Prefixes
- **SETUP-**: Infrastructure [Dev Agent]
- **TEST-**: Tests [Test Agent]  
- **IMPL-**: Implementation [Dev Agent]
- **REVIEW-**: Code review [Review Agent]
- **REFACTOR-**: Improvements [Dev Agent]

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- **Browser Extension**: `extension/src/`
- Paths derived from plan.md structure and setup.md configuration

## Test Case Mapping
**Derives test cases from feature artifacts:**
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
**Sample tasks below. Replace with actual tasks in generated tasks.md.**

### Task Generation Rules
- Generate tasks from all feature artifacts:
  - spec.md - user stories and requirements
  - plan.md - technical approach and structure
  - ux.md - flows and interaction patterns
  - data-model.md - entities and relationships
  - contracts/, contracts.md, openapi.yaml - API endpoints, message passing, events, storage schemas
  - research.md - technical decisions for infrastructure tasks
  - setup.md - environment and dependencies
- Organize tasks by TDD cycles within each user story
- Each cycle follows: RED → GREEN → REVIEW → REFACTOR phases
- Map test cases according to Test Case Mapping section

## Phase 1: Setup

- [ ] SETUP-001 Create project structure per plan.md
- [ ] SETUP-002 Initialize [language] project per setup.md dependencies
- [ ] SETUP-003 Configure linting and formatting tools

## Phase 2: Core Infrastructure

**Required before user stories begin**

- [ ] SETUP-004 Setup data layer from data-model.md
- [ ] SETUP-005 Implement authentication if required
- [ ] SETUP-006 Setup API layer per contracts/openapi specifications
- [ ] SETUP-007 Create base entities from data-model.md
- [ ] SETUP-008 Configure error handling
- [ ] SETUP-009 Setup environment per setup.md requirements
- [ ] SETUP-010 Implement state management if specified
- [ ] SETUP-011 Setup validation layer if required

## Phase 3: User Story 1 - [Title] (P1 - MVP)

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-001, UX-001]
- Data entities: [from data-model.md]
- Contracts: [from openapi.yaml or contracts.md]
- States: [if applicable from data-model.md]

#### RED Phase
- [ ] TEST-001 [US1] Test [requirement/behavior]
- [ ] TEST-002 [US1] Test [edge case from spec.md]
- [ ] TEST-003 [US1] Verify tests fail

#### GREEN Phase  
- [ ] IMPL-001 [US1] Create [entity] per data-model.md in src/[location]/[file]
- [ ] IMPL-002 [US1] Implement logic to pass tests

#### REVIEW Phase
- [ ] REVIEW-001 [US1] Review implementation

#### REFACTOR Phase (if needed)
- [ ] REFACTOR-001 [US1] Apply improvements

### TDD Cycle 2: [API Endpoint]
**Coverage**: 
- Requirements: [FR-002]
- Contracts: [from openapi.yaml endpoint]

#### RED Phase
- [ ] TEST-004 [US1] Test [requirement]
- [ ] TEST-005 [US1] Verify failure

#### GREEN Phase
- [ ] IMPL-003 [US1] Implement in src/[location]/[file]

#### REVIEW Phase
- [ ] REVIEW-002 [US1] Review code

#### REFACTOR Phase (if needed)
- [ ] REFACTOR-002 [US1] Apply feedback

## Phase 4: User Story 2 - [Title] (P2)

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-004, UX-002]

#### RED Phase
- [ ] TEST-006 [US2] Test [requirement]
- [ ] TEST-007 [US2] Verify failure

#### GREEN Phase
- [ ] IMPL-004 [US2] Implement in src/[location]/[file]

#### REVIEW Phase
- [ ] REVIEW-003 [US2] Review implementation

#### REFACTOR Phase (if needed)
- [ ] REFACTOR-003 [US2] Apply feedback

## Phase 5: User Story 3 - [Title] (P3)

### TDD Cycle 1: [Component Name]
**Coverage**: 
- Requirements: [FR-005]

#### RED Phase
- [ ] TEST-008 [US3] Test [requirement]
- [ ] TEST-009 [US3] Verify failure

#### GREEN Phase
- [ ] IMPL-005 [US3] Implement in src/[location]/[file]

#### REVIEW Phase
- [ ] REVIEW-004 [US3] Review implementation

#### REFACTOR Phase (if needed)
- [ ] REFACTOR-004 [US3] Apply feedback

[Add more user story phases as needed, following same pattern]

## Phase N: Polish

- [ ] IMPL-006 Documentation updates
- [ ] REFACTOR-005 Code cleanup
- [ ] IMPL-007 Performance optimization
- [ ] TEST-010 Regression tests
- [ ] REVIEW-005 Final review

## Execution Order

1. **Phase 1**: Setup
2. **Phase 2**: Core Infrastructure (blocks all stories)  
3. **Phase 3-N**: User Stories in priority order (P1 → P2 → P3)
4. **Final Phase**: Polish

Within each story: RED → GREEN → REVIEW → REFACTOR cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN → REVIEW → REFACTOR
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions must match data-model.md specifications

---

## Review Checklist
*GATE: Structure validation*

### MODEL INSTRUCTION
**Remove this checklist from generated tasks.md**

### Completeness
- [ ] All user stories have TDD cycles
- [ ] All requirements covered (FR-*, UX-*)
- [ ] Data models from data-model.md implemented
- [ ] API contracts from contracts/ implemented
- [ ] Setup requirements from setup.md implemented
- [ ] Research constraints from research.md applied
- [ ] Each cycle has all 4 phases (RED/GREEN/REVIEW/REFACTOR)

### Structure
- [ ] Task IDs use correct prefixes
- [ ] Story labels consistent ([US1], [US2])
- [ ] File paths specified
- [ ] Priority order maintained (P1 → P2 → P3)
- [ ] Coverage sections properly filled

---