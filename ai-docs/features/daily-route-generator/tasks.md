# Tasks: Daily Route Generator

## Purpose
TDD-structured tasks for implementing the build-time route generation module that produces deterministic daily routes using date-based seeding.

## Phase 1: Core Infrastructure

- [x] INIT-001 Create route-generator module structure per plan.md in src/lib/route-generator/
- [x] INIT-002 Install seedrandom and @types/seedrandom per setup.md
- [x] INIT-003 Create TypeScript types (SourceData, GroupData, SlotPool, VenueData, DailyRoutes, GroupRoute, Venue) in src/lib/route-generator/types.ts
- [x] INIT-004 Create constants (GROUP_NAMES, SLOTS, SLOT_LABELS, MIN_VENUES_PER_SLOT, MAX_VENUES_PER_SLOT, TOTAL_VENUES, TOTAL_DAILY_VENUES, DATE_SEED_FORMAT) in src/lib/route-generator/constants.ts
- [x] INIT-005 Create module entry point with re-exports in src/lib/route-generator/index.ts
- [x] INIT-006 Place bantadthong_places.json in src/data/ directory
- [x] INIT-007 Setup Vitest unit test configuration for route-generator module
- [x] INIT-008 Create test file structure in tests/unit/route-generator/

## Phase 2: User Story 1 - Deterministic Route Generation (P1 - MVP)

### TDD Cycle 1: Source Data Validation
**Coverage:**
- Requirements: FR-001, FR-002, FR-003
- Data entities: SourceData, GroupData, SlotPool, VenueData
- States: loading → validating, validating → failed

#### RED Phase
- [ ] TEST-001 [US1] Test validator throws error when bantadthong_places.json is missing in tests/unit/route-generator/validator.test.ts
- [ ] TEST-002 [US1] Test validator throws error when JSON is malformed in tests/unit/route-generator/validator.test.ts
- [ ] TEST-003 [US1] Test validator throws error when any of GROUP_NAMES is missing (extra groups ignored per CHK013) in tests/unit/route-generator/validator.test.ts
- [ ] TEST-004 [US1] Test validator throws error when any of SLOTS is missing within a group in tests/unit/route-generator/validator.test.ts
- [ ] TEST-005 [US1] Test validator throws error when slot has fewer than MIN_VENUES_PER_SLOT (3) venues in tests/unit/route-generator/validator.test.ts
- [ ] TEST-006 [US1] Test validator throws error when slot has more than MAX_VENUES_PER_SLOT (5) venues in tests/unit/route-generator/validator.test.ts
- [ ] TEST-007 [US1] Test validator throws error when venue is missing primaryType in tests/unit/route-generator/validator.test.ts
- [ ] TEST-008 [US1] Test validator throws error when venue is missing story in tests/unit/route-generator/validator.test.ts
- [ ] TEST-009 [US1] Test validator throws error when venue is missing rating in tests/unit/route-generator/validator.test.ts
- [ ] TEST-010 [US1] Test validator throws error when venue is missing googleMapsUri in tests/unit/route-generator/validator.test.ts
- [ ] TEST-011 [US1] Test validator throws error when googleMapsUri does not start with "https://" in tests/unit/route-generator/validator.test.ts
- [ ] TEST-012 [US1] Test validator throws error when rating is outside 1.0-5.0 range (per data-model.md CHK005) in tests/unit/route-generator/validator.test.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Create validateSourceData() function in src/lib/route-generator/validator.ts
- [ ] IMPL-002 [US1] Implement group existence validation using GROUP_NAMES constant
- [ ] IMPL-003 [US1] Implement slot existence validation using SLOTS constant
- [ ] IMPL-004 [US1] Implement venue count validation using MIN_VENUES_PER_SLOT and MAX_VENUES_PER_SLOT
- [ ] IMPL-005 [US1] Implement venue field validation (primaryType, story, rating, googleMapsUri)

### TDD Cycle 2: Date-Based Seed Generation
**Coverage:**
- Requirements: FR-004, FR-005
- Constants: DATE_SEED_FORMAT
- States: validating → generating

#### RED Phase
- [ ] TEST-013 [US1] Test generator uses DATE_SEED_FORMAT (YYYY-MM-DD) for seed in tests/unit/route-generator/generator.test.ts
- [ ] TEST-014 [US1] Test same date produces identical routes on repeated runs in tests/unit/route-generator/generator.test.ts
- [ ] TEST-015 [US1] Test different dates produce different routes in tests/unit/route-generator/generator.test.ts

#### GREEN Phase
- [ ] IMPL-006 [US1] Create generateDailyRoutes(date: string) function in src/lib/route-generator/generator.ts
- [ ] IMPL-007 [US1] Implement seedrandom initialization with date string

### TDD Cycle 3: Route Selection Algorithm
**Coverage:**
- Requirements: FR-006
- Data entities: DailyRoutes, GroupRoute, Venue
- Constants: TOTAL_DAILY_VENUES

#### RED Phase
- [ ] TEST-016 [US1] Test generator outputs exactly TOTAL_DAILY_VENUES (16) venues in tests/unit/route-generator/generator.test.ts
- [ ] TEST-017 [US1] Test each group has exactly 4 venues (one per slot) in tests/unit/route-generator/generator.test.ts
- [ ] TEST-018 [US1] Test selected venue contains name extracted from source key in tests/unit/route-generator/generator.test.ts
- [ ] TEST-019 [US1] Test selected venue contains all required fields (name, primaryType, story, rating, googleMapsUri) in tests/unit/route-generator/generator.test.ts

#### GREEN Phase
- [ ] IMPL-008 [US1] Implement venue selection using seeded random shuffle
- [ ] IMPL-009 [US1] Implement Venue object creation with name from key
- [ ] IMPL-010 [US1] Implement DailyRoutes object assembly

### From CHK001: Group Description Validation
**Coverage:**
- Resolution: CHK001 - Add FR-009 group_description must be non-empty string

#### RED Phase
- [ ] TEST-040 [US1] Test validator throws error when group_description is missing or empty in tests/unit/route-generator/validator.test.ts

#### GREEN Phase
- [ ] IMPL-018 [US1] Implement group_description validation in validateSourceData()

### From CHK017: Rating Type Validation
**Coverage:**
- Resolution: CHK017 - Build fails when rating field is not a number type

#### RED Phase
- [ ] TEST-041 [US1] Test validator throws error when rating field is string instead of number in tests/unit/route-generator/validator.test.ts

#### GREEN Phase
- [ ] IMPL-019 [US1] Implement rating type check (typeof rating === 'number') in venue validation

## Phase 3: User Story 2 - Cross-Platform Consistency (P1 - MVP)

### TDD Cycle 1: Seedrandom Determinism
**Coverage:**
- Requirements: FR-005
- States: generating → embedding

#### RED Phase
- [ ] TEST-020 [US2] Test seedrandom produces identical sequence for same seed string in tests/unit/route-generator/generator.test.ts
- [ ] TEST-021 [US2] Test route selection is deterministic across multiple invocations in tests/unit/route-generator/generator.test.ts

#### GREEN Phase
- [ ] IMPL-011 [US2] Verify seedrandom import and initialization is consistent

### TDD Cycle 2: State Transitions
**Coverage:**
- States: idle → loading → validating → generating → embedding → complete, *→ failed

#### RED Phase
- [ ] TEST-022 [US2] Test state transition idle → loading on build trigger in tests/unit/route-generator/generator.test.ts
- [ ] TEST-023 [US2] Test state transition loading → validating on JSON load success in tests/unit/route-generator/generator.test.ts
- [ ] TEST-024 [US2] Test state transition loading → failed on JSON not found in tests/unit/route-generator/generator.test.ts
- [ ] TEST-025 [US2] Test state transition validating → generating on validation pass in tests/unit/route-generator/generator.test.ts
- [ ] TEST-026 [US2] Test state transition validating → failed on validation error in tests/unit/route-generator/generator.test.ts
- [ ] TEST-027 [US2] Test state transition generating → embedding on routes generated in tests/unit/route-generator/generator.test.ts
- [ ] TEST-028 [US2] Test state transition embedding → complete on success in tests/unit/route-generator/generator.test.ts

#### GREEN Phase
- [ ] IMPL-012 [US2] Implement build-time execution flow with state logging

## Phase 4: User Story 3 - Venue Selection Fairness (P2)

### TDD Cycle 1: Equal Probability Selection
**Coverage:**
- Requirements: spec.md Acceptance Scenario 4
- Data entities: SlotPool

#### RED Phase
- [ ] TEST-029 [US3] Test each venue in pool has equal probability of selection (statistical test with 1000+ runs) in tests/unit/route-generator/generator.test.ts
- [ ] TEST-030 [US3] Test selection works correctly for pools with MIN_VENUES_PER_SLOT (3) venues in tests/unit/route-generator/generator.test.ts
- [ ] TEST-031 [US3] Test selection works correctly for pools with MAX_VENUES_PER_SLOT (5) venues in tests/unit/route-generator/generator.test.ts

#### GREEN Phase
- [ ] IMPL-013 [US3] Implement Fisher-Yates shuffle for fair venue selection

### TDD Cycle 2: Validation Error Messages
**Coverage:**
- Error handling from ux.md Error Presentation

#### RED Phase
- [ ] TEST-032 [US3] Test validation error message includes group name in tests/unit/route-generator/validator.test.ts
- [ ] TEST-033 [US3] Test validation error message includes slot name in tests/unit/route-generator/validator.test.ts
- [ ] TEST-034 [US3] Test validation error message includes actual venue count in tests/unit/route-generator/validator.test.ts
- [ ] TEST-035 [US3] Test validation error message includes missing field names in tests/unit/route-generator/validator.test.ts

#### GREEN Phase
- [ ] IMPL-014 [US3] Implement descriptive error messages per ux.md templates

## Phase 5: User Story 4 - Daily Variability (P3)

### TDD Cycle 1: Route Variability
**Coverage:**
- Requirements: spec.md Acceptance Scenario 5
- Constants: Total combinations calculation

#### RED Phase
- [ ] TEST-036 [US4] Test 30 consecutive days produce at least 25 unique route combinations per group in tests/unit/route-generator/generator.test.ts
- [ ] TEST-037 [US4] Test probability of exact daily repeat is less than 0.1% in tests/unit/route-generator/generator.test.ts

#### GREEN Phase
- [ ] IMPL-015 [US4] Verify selection algorithm leverages full combination space

### TDD Cycle 2: Static Embedding
**Coverage:**
- Requirements: FR-007, FR-008
- States: embedding → complete

#### RED Phase
- [ ] TEST-038 [US4] Test routes object is JSON-serializable in tests/unit/route-generator/generator.test.ts
- [ ] TEST-039 [US4] Test routes can be imported as ES module in tests/unit/route-generator/generator.test.ts

#### GREEN Phase
- [ ] IMPL-016 [US4] Export generateDailyRoutes and constants from module index
- [ ] IMPL-017 [US4] Configure static import for build-time execution

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: US1 - Deterministic Route Generation (P1)
3. **Phase 3**: US2 - Cross-Platform Consistency (P1)
4. **Phase 4**: US3 - Venue Selection Fairness (P2)
5. **Phase 5**: US4 - Daily Variability (P3)

Within each story: RED → GREEN cycles

## Notes

### Deferred (Post-MVP)
- CHK006: Story length (2-3 sentences) is editorial guideline, not code validation
- CHK022: Embedding failure handled by Next.js framework, not custom code
- CHK026: Build timeout unnecessary for synchronous file operations

### Implementation Notes
- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions (idle, loading, validating, generating, embedding, complete, failed) have corresponding tests (TEST-022 to TEST-028)
- All constants (GROUP_NAMES, SLOTS, SLOT_LABELS, MIN_VENUES_PER_SLOT, MAX_VENUES_PER_SLOT, TOTAL_VENUES, TOTAL_DAILY_VENUES, DATE_SEED_FORMAT) are referenced
- This is a build-time module with no runtime user interaction
- Consumer features (group-selector, route-summary, venue-cards) will import from this module
- TEST-/IMPL- numbering is sequential across all user stories
