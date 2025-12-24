# Tasks: Group Selector

## Purpose
TDD-structured tasks for implementing the horizontal scrollable pill selector for food vibe groups with instant UI updates on selection.

## Phase 1: Core Infrastructure

- [ ] INIT-001 Create group-selector components directory structure per plan.md in src/components/group-selector/
- [ ] INIT-002 Create selector constants (PILL_COUNT, DEFAULT_GROUP, ACCENT_COLOR, ACCENT_BG_OPACITY, MUTED_BORDER_COLOR, TOUCH_TARGET_MIN, UPDATE_LATENCY) in src/components/group-selector/constants.ts
- [ ] INIT-003 Create TypeScript types (Group, GroupPill, GroupName, PillState) in src/components/group-selector/types.ts
- [ ] INIT-004 Import GROUP_NAMES from daily-route-generator module in src/lib/route-generator/constants.ts
- [ ] INIT-005 Setup unit test file in tests/unit/group-selector/GroupSelector.test.tsx
- [ ] INIT-006 Setup unit test file for pill in tests/unit/group-selector/GroupPill.test.tsx
- [ ] INIT-007 Setup E2E test file in tests/e2e/group-selector.spec.ts

## Phase 2: User Story 1 - Pill Display and Selection (P1 - MVP)

### TDD Cycle 1: Pill Container
**Coverage:**
- Requirements: FR-001, FR-004
- Data entities: Group, GroupPill
- Constants: PILL_COUNT, DEFAULT_GROUP

#### RED Phase
- [ ] TEST-001 [US1] Test selector renders exactly PILL_COUNT (4) pills in tests/unit/group-selector/GroupSelector.test.tsx
- [ ] TEST-002 [US1] Test pills display in GROUP_NAMES order: Pan-Asian Flavors, Urban Hideaways, Sweet Bangkok, Local Thai Experience in tests/unit/group-selector/GroupSelector.test.tsx
- [ ] TEST-003 [US1] Test DEFAULT_GROUP (Pan-Asian Flavors) is active on initial render in tests/unit/group-selector/GroupSelector.test.tsx
- [ ] TEST-004 [US1] Test exactly one pill is active at any time (FR-004) in tests/unit/group-selector/GroupSelector.test.tsx

#### GREEN Phase
- [ ] IMPL-001 [US1] Create GroupSelector container component with state management in src/components/group-selector/GroupSelector.tsx
- [ ] IMPL-002 [US1] Create GroupPill component with active/inactive props in src/components/group-selector/GroupPill.tsx
- [ ] IMPL-003 [US1] Map GROUP_NAMES to GroupPill components with DEFAULT_GROUP active

### TDD Cycle 2: Selection Behavior
**Coverage:**
- Requirements: FR-003, FR-005, FR-006
- Constants: UPDATE_LATENCY

#### RED Phase
- [ ] TEST-005 [US1] Test click on inactive pill changes active state in tests/unit/group-selector/GroupSelector.test.tsx
- [ ] TEST-006 [US1] Test previous active pill becomes inactive on new selection in tests/unit/group-selector/GroupSelector.test.tsx
- [ ] TEST-007 [US1] Test updates are instant with UPDATE_LATENCY (0ms) - no transitions in tests/e2e/group-selector.spec.ts
- [ ] TEST-008 [US1] Test group switching triggers dependent UI updates (route-summary, venue-cards) in tests/e2e/group-selector.spec.ts

#### GREEN Phase
- [ ] IMPL-004 [US1] Implement selectedGroup state with React useState
- [ ] IMPL-005 [US1] Lift selectedGroup state to parent for route-summary and venue-cards consumption
- [ ] IMPL-006 [US1] Pass onGroupChange callback prop for state updates

### TDD Cycle 3: State Machine Transitions
**Coverage:**
- States: inactive → active, active → active (no action), active → inactive

#### RED Phase
- [ ] TEST-009 [US1] Test state transition inactive → active on tap pill in tests/e2e/group-selector.spec.ts
- [ ] TEST-010 [US1] Test state transition active → active on tap same pill (no action per FR-003 edge case) in tests/e2e/group-selector.spec.ts
- [ ] TEST-011 [US1] Test state transition active → inactive when different pill tapped in tests/e2e/group-selector.spec.ts

#### GREEN Phase
- [ ] IMPL-007 [US1] Add guard condition to ignore tap on already-active pill

### From CHK002: Alphabetical Pill Order
**Coverage:**
- Resolution: CHK002 - Document pill order as alphabetical

#### RED Phase
- [ ] TEST-030 [US1] Test pills display in alphabetical order in tests/unit/group-selector/GroupSelector.test.tsx

#### GREEN Phase
- [ ] IMPL-014 [US1] Reorder GROUP_NAMES constant alphabetically: Local Thai Experience, Pan-Asian Flavors, Sweet Bangkok, Urban Hideaways

### From CHK005: Maintain Card Position
**Coverage:**
- Resolution: CHK005 - Venue cards maintain current position on group switch

#### RED Phase
- [ ] TEST-031 [US1] Test venue cards maintain current card position on group switch in tests/e2e/group-selector.spec.ts

#### GREEN Phase
- [ ] IMPL-015 [US1] Remove card reset logic on group switch, preserve carousel position

## Phase 3: User Story 2 - Horizontal Scroll and Active Styling (P2)

### TDD Cycle 1: Horizontal Scroll
**Coverage:**
- Requirements: FR-002

#### RED Phase
- [ ] TEST-012 [US2] Test pill container is horizontally scrollable in tests/e2e/group-selector.spec.ts
- [ ] TEST-013 [US2] Test horizontal swipe reveals overflow pills in tests/e2e/group-selector.spec.ts
- [ ] TEST-014 [US2] Test scroll boundary shows elastic bounce effect (browser default behavior per CHK022) in tests/e2e/group-selector.spec.ts

#### GREEN Phase
- [ ] IMPL-008 [US2] Add overflow-x-auto with scroll-snap to GroupSelector container
- [ ] IMPL-009 [US2] Add -webkit-overflow-scrolling: touch for iOS momentum

### TDD Cycle 2: Active Pill Styling
**Coverage:**
- Requirements: UX-001, UX-002, UX-003
- Constants: ACCENT_COLOR, ACCENT_BG_OPACITY

#### RED Phase
- [ ] TEST-015 [US2] Test active pill has rounded-full shape (UX-001) in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-016 [US2] Test active pill has ACCENT_COLOR background at ACCENT_BG_OPACITY (15%) in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-017 [US2] Test active pill has ACCENT_COLOR border in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-018 [US2] Test active pill has ACCENT_COLOR text in tests/unit/group-selector/GroupPill.test.tsx

#### GREEN Phase
- [ ] IMPL-010 [US2] Apply active styling classes: bg-accent/15, border-accent, text-accent

### TDD Cycle 3: Accessibility
**Coverage:**
- Accessibility: role="tablist", role="tab", aria-selected, keyboard navigation, touch targets

#### RED Phase
- [ ] TEST-019 [US2] Test container has role="tablist" in tests/unit/group-selector/GroupSelector.test.tsx
- [ ] TEST-020 [US2] Test each pill has role="tab" in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-021 [US2] Test active pill has aria-selected="true" in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-022 [US2] Test pills meet TOUCH_TARGET_MIN (44px) height with 12px gap per CHK021 in tests/e2e/group-selector.spec.ts
- [ ] TEST-023 [US2] Test Tab focuses pill container in tests/e2e/group-selector.spec.ts
- [ ] TEST-024 [US2] Test Arrow Left/Right moves between pills in tests/e2e/group-selector.spec.ts
- [ ] TEST-025 [US2] Test Enter/Space selects focused pill in tests/e2e/group-selector.spec.ts

#### GREEN Phase
- [ ] IMPL-011 [US2] Add ARIA attributes to GroupSelector and GroupPill
- [ ] IMPL-012 [US2] Implement keyboard navigation with Arrow key handlers

### From CHK018: ARIA Controls
**Coverage:**
- Resolution: CHK018 - aria-controls points to route-summary section ID

#### RED Phase
- [ ] TEST-032 [US2] Test pills have aria-controls pointing to route-summary section ID in tests/unit/group-selector/GroupPill.test.tsx

#### GREEN Phase
- [ ] IMPL-016 [US2] Add aria-controls="route-summary" attribute to each pill

### From CHK027+CHK028: Circular Keyboard Navigation
**Coverage:**
- Resolution: CHK027, CHK028 - Keyboard navigation wraps circularly at boundaries

#### RED Phase
- [ ] TEST-033 [US2] Test Arrow Left at first pill wraps to last pill in tests/e2e/group-selector.spec.ts
- [ ] TEST-034 [US2] Test Arrow Right at last pill wraps to first pill in tests/e2e/group-selector.spec.ts

#### GREEN Phase
- [ ] IMPL-017 [US2] Implement circular wrap logic in Arrow key handlers

## Phase 4: User Story 3 - Inactive Pill Styling (P3)

### TDD Cycle 1: Inactive Styling
**Coverage:**
- Requirements: UX-004, UX-005
- Constants: MUTED_BORDER_COLOR

#### RED Phase
- [ ] TEST-026 [US3] Test inactive pill has transparent background in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-027 [US3] Test inactive pill has MUTED_BORDER_COLOR (#666666) border in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-028 [US3] Test inactive pill has muted text color in tests/unit/group-selector/GroupPill.test.tsx
- [ ] TEST-029 [US3] Test active state uses color + border + text (not color alone) for accessibility in tests/e2e/group-selector.spec.ts

#### GREEN Phase
- [ ] IMPL-013 [US3] Apply inactive styling classes: bg-transparent, border-text-muted, text-text-muted

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: US1 - Pill Display and Selection (P1)
3. **Phase 3**: US2 - Horizontal Scroll and Active Styling (P2)
4. **Phase 4**: US3 - Inactive Pill Styling (P3)

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions (inactive → active, active → active, active → inactive) have corresponding tests (TEST-009 to TEST-011)
- All constants (PILL_COUNT, DEFAULT_GROUP, ACCENT_COLOR, ACCENT_BG_OPACITY, MUTED_BORDER_COLOR, TOUCH_TARGET_MIN, UPDATE_LATENCY) are referenced
- Depends on daily-route-generator for GROUP_NAMES constant
- selectedGroup state is lifted to parent component for consumption by route-summary and venue-cards
- TEST-/IMPL- numbering is sequential across all user stories
