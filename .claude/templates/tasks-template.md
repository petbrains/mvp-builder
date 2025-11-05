# Tasks: [FEATURE_NAME]

## Purpose
Defines granular implementation tasks organized by user stories following strict TDD methodology for multi-agent development.

## TDD Process for Multi-Agent Development

### Agent Roles
- **Dev Agent**: 
  - Sets up project infrastructure (SETUP)
  - Implements features to pass tests (IMPL)
  - Applies review feedback (REFACTOR)
  
- **Test Agent**:
  - Writes all tests based on requirements (TEST)
  - Verifies tests fail initially (RED state)
  - Confirms tests pass after implementation (GREEN state)
  
- **Review Agent**:
  - Reviews implementation quality (REVIEW)
  - Documents required improvements
  - Checks best practices and patterns

### Strict TDD Workflow with Agent Handoffs
1. **RED** (Test Agent): Write failing tests based on requirements
2. **VERIFY-FAIL** (Test Agent): Confirm tests fail with expected errors
3. **GREEN** (Dev Agent): Implement MINIMUM code to pass tests  
4. **VERIFY-PASS** (Test Agent): Confirm all tests now pass
5. **REVIEW** (Review Agent): Analyze code, document improvements needed
6. **REFACTOR** (Dev Agent): Apply review feedback while keeping tests green

## Task Format
- **ID**: Sequential task identifier with prefix (SETUP-001, TEST-002, IMPL-003...)
- **[Story]**: User story mapping (US1, US2...)
- **Description**: Action with exact file path

### Task Prefixes with Agent Roles
- **SETUP-**: Project setup and core infrastructure [Dev Agent]
- **TEST-**: Test writing and verification [Test Agent]  
- **IMPL-**: Implementation including integration [Dev Agent]
- **REVIEW-**: Code review and feedback [Review Agent]
- **REFACTOR-**: Improvements based on review [Dev Agent]

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- **Browser Extension**: `extension/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Test Case Mapping
**Derives test cases from feature artifacts:**
- Acceptance scenarios from spec.md → Integration tests
- Functional requirements (FR-*) → Unit/Contract tests  
- UX requirements (UX-*) → UI/E2E tests
- Edge cases from spec.md → Boundary tests
- Error states from ux.md → Error handling tests

## MODEL INSTRUCTION
**This section contains sample tasks for illustration only. Do not include in final tasks.md output.**

### Task Generation Rules
- Replace sample tasks with actual tasks based on:
  - User stories from spec.md (with priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Flows and patterns from ux.md
  - Test cases derived from Test Case Mapping
- Tasks MUST be organized by TDD cycles within user stories
- Each cycle must follow RED → GREEN → REVIEW → REFACTOR phases
- DO NOT keep these sample tasks in generated file

### TDD Enforcement for AI
- NEVER write implementation before tests
- Each test task MUST include assertion of initial failure
- Tests MUST have real assertions, not stubs or always-passing mocks
- Implementation tasks MUST reference specific failing tests
- Refactoring ONLY allowed when all tests are green
- Review phase is mandatory before refactoring

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure
**Agent**: Dev Agent

- [ ] SETUP-001 Create project structure per implementation plan
- [ ] SETUP-002 Initialize [language] project with [framework] dependencies
- [ ] SETUP-003 Configure linting and formatting tools

## Phase 2: Core Infrastructure (Blocking Prerequisites)

**Purpose**: Foundation that MUST be complete before ANY user story can be implemented
**Agent**: Dev Agent

**CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] SETUP-004 Setup database schema and migrations framework
- [ ] SETUP-005 Implement authentication/authorization framework
- [ ] SETUP-006 Setup API routing and middleware structure
- [ ] SETUP-007 Create base models/entities that all stories depend on
- [ ] SETUP-008 Configure error handling and logging infrastructure
- [ ] SETUP-009 Setup environment configuration management

**Checkpoint**: Foundation ready - TDD cycles for user stories can now begin

## Phase 3: User Story 1 - [Title] (Priority: P1) (MVP)

**Goal**: [Brief description of what this story delivers]
**Independent Validation**: [How to verify this story works standalone]

### TDD Cycle 1: [Component Name]
**Component**: [What is being built - e.g., Data model, Service layer]
**Requirements Coverage**: [Which FR-* and UX-* requirements this covers]

#### RED Phase (Test Agent)
- [ ] TEST-001 [US1] Write test for [specific requirement/behavior]
- [ ] TEST-002 [US1] Write test for [edge case/validation]
- [ ] TEST-003 [US1] Verify all tests fail with expected errors

#### GREEN Phase (Dev Agent)  
- [ ] IMPL-001 [US1] Create [component] in src/[location]/[file].py
- [ ] IMPL-002 [US1] Implement minimal logic to pass TEST-001, TEST-002

#### REVIEW Phase (Review Agent)
- [ ] REVIEW-001 [US1] Review implementation for patterns and best practices
- [ ] REVIEW-002 [US1] Document required improvements

#### REFACTOR Phase (Dev Agent) - If review requires changes
- [ ] REFACTOR-001 [US1] Apply review feedback from REVIEW-001, REVIEW-002

### TDD Cycle 2: [Component Name]
**Component**: [What is being built]
**Requirements Coverage**: [Which FR-* and UX-* requirements this covers]

#### RED Phase (Test Agent)
- [ ] TEST-004 [US1] Write test for [specific requirement/behavior]
- [ ] TEST-005 [US1] Verify test fails initially

#### GREEN Phase (Dev Agent)
- [ ] IMPL-003 [US1] Implement [component] in src/[location]/[file].py

#### REVIEW Phase (Review Agent)
- [ ] REVIEW-003 [US1] Review and provide feedback

#### REFACTOR Phase (Dev Agent) - If needed
- [ ] REFACTOR-002 [US1] Apply improvements

**Checkpoint**: User Story 1 complete - all tests passing, reviewed and refactored

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]
**Independent Validation**: [How to verify this story works standalone]

### TDD Cycle 1: [Component Name]
**Component**: [What is being built]
**Requirements Coverage**: [Which FR-* and UX-* requirements this covers]

#### RED Phase (Test Agent)
- [ ] TEST-006 [US2] Write test for [specific requirement/behavior]
- [ ] TEST-007 [US2] Verify test fails initially

#### GREEN Phase (Dev Agent)
- [ ] IMPL-004 [US2] Implement [component] in src/[location]/[file].py

#### REVIEW Phase (Review Agent)
- [ ] REVIEW-004 [US2] Review implementation

#### REFACTOR Phase (Dev Agent) - If needed
- [ ] REFACTOR-003 [US2] Apply review feedback

**Checkpoint**: User Story 2 complete - integrates with Story 1 if needed

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]
**Independent Validation**: [How to verify this story works standalone]

### TDD Cycle 1: [Component Name]
**Component**: [What is being built]
**Requirements Coverage**: [Which FR-* and UX-* requirements this covers]

#### RED Phase (Test Agent)
- [ ] TEST-008 [US3] Write test for [specific requirement/behavior]
- [ ] TEST-009 [US3] Verify test fails initially

#### GREEN Phase (Dev Agent)
- [ ] IMPL-005 [US3] Implement [component] in src/[location]/[file].py

#### REVIEW Phase (Review Agent)
- [ ] REVIEW-005 [US3] Review implementation

#### REFACTOR Phase (Dev Agent) - If needed
- [ ] REFACTOR-004 [US3] Apply review feedback

**Checkpoint**: All user stories complete and independently functional

[Add more user story phases as needed, following the same TDD cycle pattern]

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and optimizations after all stories complete
**Agents**: All agents as needed

- [ ] IMPL-006 Documentation updates in docs/
- [ ] REFACTOR-005 Code cleanup and refactoring
- [ ] IMPL-007 Performance optimization across all stories
- [ ] TEST-010 Additional regression tests in tests/
- [ ] REVIEW-006 Final security review
- [ ] TEST-011 Run setup.md validation

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - Dev Agent starts immediately
- **Core Infrastructure (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Core Infrastructure completion
  - Stories execute in priority order (P1 → P2 → P3)
  - Each story must complete before next begins
- **Polish (Final Phase)**: Depends on all user stories being complete

### TDD Cycle Dependencies

Within each User Story:
1. **RED Phase** (Test Agent) - No dependencies, starts immediately
2. **GREEN Phase** (Dev Agent) - MUST wait for RED phase completion and test failure verification
3. **REVIEW Phase** (Review Agent) - MUST wait for GREEN phase and passing tests
4. **REFACTOR Phase** (Dev Agent) - ONLY if review identifies improvements

### Agent Handoff Rules

- Test Agent MUST verify test failure before handing off to Dev Agent
- Dev Agent CANNOT start without failing tests from Test Agent
- Review Agent receives code only after tests pass
- Dev Agent applies review feedback while maintaining green tests
- No skipping phases - strict RED → GREEN → REVIEW → REFACTOR sequence

### Pipeline Opportunities

While maintaining strict TDD within cycles, agents can pipeline across cycles:
- While Dev Agent implements Cycle 1, Test Agent can write tests for Cycle 2
- While Review Agent reviews Cycle 1, Test Agent can work on Cycle 3 tests
- **Note**: Dev Agent must wait for tests - never implements ahead of Test Agent

## Implementation Strategy

### TDD MVP Delivery (Starting with Story 1)

1. Complete Phase 1: Setup (Dev Agent)
2. Complete Phase 2: Core Infrastructure (Dev Agent)
3. Execute User Story 1 TDD Cycles (P1 - MVP):
   - Test Agent writes failing tests
   - Dev Agent implements minimal code
   - Review Agent provides feedback
   - Dev Agent refactors if needed
4. **VALIDATE MVP**: All Story 1 tests green, reviewed
5. Deploy/demo MVP
6. Continue with remaining stories using same TDD approach

### Incremental TDD Delivery

1. Setup + Core Infrastructure → Foundation ready
2. User Story 1 (TDD cycles) → Test, Implement, Review → Deploy (MVP!)
3. User Story 2 (TDD cycles) → Test, Implement, Review → Deploy
4. User Story 3 (TDD cycles) → Test, Implement, Review → Deploy
5. Each story adds value with full test coverage

### Agent Pipeline Efficiency

**Note**: In multi-agent TDD, agents work sequentially within each cycle (Test→Dev→Review), but can pipeline across different cycles for efficiency. Test Agent should stay 1-2 cycles ahead of Dev Agent when possible.

## Notes

- RED tasks must complete and fail before GREEN tasks start
- GREEN tasks implement ONLY enough to pass RED tests  
- REFACTOR tasks are optional but recommended for code quality
- [Story] label maps task to specific user story for traceability
- Each user story should be independently testable
- Tests drive implementation - no code without failing test first
- Commit after each TDD phase completion
- Stop at any checkpoint to validate story independently
- Regression: verify all previous tests still pass after changes
- Avoid: implementing without tests, skipping review phase, breaking existing tests, creating test stubs/mocks that always pass

---

## Review & Acceptance Checklist
*GATE: Automated checks*

### MODEL INSTRUCTION
**This checklist is for internal validation only. Do not include in final tasks.md output.**

### Task Completeness
- [ ] All user stories from spec.md have corresponding tasks
- [ ] Tasks cover all functional requirements (FR-*)
- [ ] Tasks cover all UX requirements (UX-*)
- [ ] Setup and core infrastructure phases defined

### TDD Compliance
- [ ] Each user story starts with RED phase tests
- [ ] Tests map to specific requirements (FR-*/UX-*)
- [ ] GREEN phases reference specific RED tests
- [ ] No implementation without failing test first
- [ ] REVIEW phase included for each cycle
- [ ] REFACTOR phases marked as conditional

### Organization Quality
- [ ] Tasks grouped by TDD cycles within stories
- [ ] Each story independently testable
- [ ] Agent responsibilities clearly assigned
- [ ] Dependencies between phases clearly marked

### Implementation Path
- [ ] Clear phase progression (Setup → Core → Stories → Polish)
- [ ] No circular dependencies
- [ ] File paths specified for each task
- [ ] TDD cycle sequence enforced (RED → GREEN → REVIEW → REFACTOR)

### Traceability
- [ ] Story labels ([US1], [US2]) consistently used
- [ ] Task IDs sequential with proper prefixes (TEST-, IMPL-, REVIEW-, REFACTOR-)
- [ ] Checkpoints after each phase and cycle
- [ ] MVP clearly identified (P1 story)

---