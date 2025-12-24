# Tasks: Route Summary

## Purpose
TDD-structured tasks for implementing the route summary section displaying selected group's name, description, and 4-venue route preview with CTA button.

## Phase 1: Core Infrastructure

- [ ] INIT-001 Create route-summary components directory structure per plan.md in src/components/route-summary/
- [ ] INIT-002 Create constants (VENUE_PREVIEW_COUNT, LABEL_TEXT, CTA_TEXT, CTA_SCROLL_TARGET, LABEL_COLOR, GROUP_NAME_COLOR, DESCRIPTION_COLOR) in src/components/route-summary/constants.ts
- [ ] INIT-003 Create TypeScript types (RoutePreview, RoutePreviewItem) in src/components/route-summary/types.ts
- [ ] INIT-004 Import SLOT_LABELS from daily-route-generator module in src/lib/route-generator/constants.ts
- [ ] INIT-005 Import DailyRoutes type from daily-route-generator module
- [ ] INIT-006 Setup unit test files in tests/unit/route-summary/
- [ ] INIT-007 Setup E2E test file in tests/e2e/route-summary.spec.ts

## Phase 2: User Story 1 - Group Display and Route Preview (P1 - MVP)

### TDD Cycle 1: Group Header
**Coverage:**
- Requirements: FR-001, FR-002, FR-003, UX-001, UX-002, UX-003
- Data entities: RoutePreview
- Constants: LABEL_TEXT, LABEL_COLOR, GROUP_NAME_COLOR, DESCRIPTION_COLOR

#### RED Phase
- [ ] TEST-001 [US1] Test renders LABEL_TEXT "Vibe of the day:" label in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-002 [US1] Test label has LABEL_COLOR (#666666) styling in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-003 [US1] Test renders group name from selectedGroup prop in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-004 [US1] Test group name has GROUP_NAME_COLOR (#ffffff), bold styling, and 1.875rem font-size (per CHK006) in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-005 [US1] Test renders group description when available in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-006 [US1] Test description has DESCRIPTION_COLOR (#a0a0a0) styling in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-007 [US1] Test omits description gracefully when missing (edge case) in tests/unit/route-summary/RouteSummary.test.tsx

#### GREEN Phase
- [ ] IMPL-001 [US1] Create GroupHeader component with label, name, optional description in src/components/route-summary/GroupHeader.tsx
- [ ] IMPL-002 [US1] Implement conditional description rendering with graceful omission

### TDD Cycle 2: Route Preview List
**Coverage:**
- Requirements: FR-004, FR-005, UX-004
- Data entities: RoutePreviewItem
- Constants: VENUE_PREVIEW_COUNT, SLOT_LABELS

#### RED Phase
- [ ] TEST-008 [US1] Test renders exactly VENUE_PREVIEW_COUNT (4) preview items in tests/unit/route-summary/RoutePreviewList.test.tsx
- [ ] TEST-009 [US1] Test each item uses SLOT_LABELS emoji for corresponding slot in tests/unit/route-summary/RoutePreviewList.test.tsx
- [ ] TEST-010 [US1] Test each item displays venue name from routes data in tests/unit/route-summary/RoutePreviewList.test.tsx
- [ ] TEST-011 [US1] Test items ordered: Morning, Lunch, Afternoon, Evening in tests/unit/route-summary/RoutePreviewList.test.tsx
- [ ] TEST-012 [US1] Test long venue names truncate with ellipsis (edge case) in tests/e2e/route-summary.spec.ts

#### GREEN Phase
- [ ] IMPL-003 [US1] Create RoutePreviewList component mapping 4 slots to items in src/components/route-summary/RoutePreviewList.tsx
- [ ] IMPL-004 [US1] Create RoutePreviewItem component with slot label + venue name in src/components/route-summary/RoutePreviewItem.tsx
- [ ] IMPL-005 [US1] Apply text-overflow: ellipsis with 100% parent width container for long venue name handling (per CHK024)

### TDD Cycle 3: Route Summary Container
**Coverage:**
- Requirements: Integration of header and preview
- Accessibility: aria-live="polite", logical reading order

#### RED Phase
- [ ] TEST-013 [US1] Test RouteSummary receives selectedGroup prop and renders correct data in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-014 [US1] Test group name has aria-live="polite" for screen reader updates in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-015 [US1] Test logical reading order: label → name → description → preview → CTA in tests/e2e/route-summary.spec.ts

#### GREEN Phase
- [ ] IMPL-006 [US1] Create RouteSummary container integrating GroupHeader and RoutePreviewList in src/components/route-summary/RouteSummary.tsx
- [ ] IMPL-007 [US1] Add aria-live attribute to group name element

## Phase 3: User Story 2 - CTA and Instant Updates (P2)

### TDD Cycle 1: CTA Button
**Coverage:**
- Requirements: FR-006, UX-005
- Constants: CTA_TEXT, CTA_SCROLL_TARGET

#### RED Phase
- [ ] TEST-016 [US2] Test CTA button displays CTA_TEXT "Meet the Places" in tests/unit/route-summary/RouteSummary.test.tsx
- [ ] TEST-017 [US2] Test CTA button positioned at bottom of section (UX-005) in tests/e2e/route-summary.spec.ts
- [ ] TEST-018 [US2] Test CTA button triggers smooth scroll with ease-out easing to CTA_SCROLL_TARGET section (per CHK021) in tests/e2e/route-summary.spec.ts

#### GREEN Phase
- [ ] IMPL-008 [US2] Add CTA button with page-layout useAutoScroll hook integration
- [ ] IMPL-009 [US2] Position CTA at section bottom with proper spacing

### TDD Cycle 2: Instant Updates
**Coverage:**
- Requirements: FR-007
- States: displaying → updating → displaying

#### RED Phase
- [ ] TEST-019 [US2] Test group selection change updates group name in <100ms (per CHK008) in tests/e2e/route-summary.spec.ts
- [ ] TEST-020 [US2] Test group selection change updates description in <100ms (per CHK008) in tests/e2e/route-summary.spec.ts
- [ ] TEST-021 [US2] Test group selection change updates 4 venue preview items in <100ms (per CHK008) in tests/e2e/route-summary.spec.ts

#### GREEN Phase
- [ ] IMPL-010 [US2] Ensure React props change triggers immediate re-render (no debounce)

### TDD Cycle 3: State Machine Transitions
**Coverage:**
- States: displaying → updating, updating → displaying, displaying → scrolling

#### RED Phase
- [ ] TEST-022 [US2] Test state transition displaying → updating on group selection change in tests/e2e/route-summary.spec.ts
- [ ] TEST-023 [US2] Test state transition updating → displaying when render complete in tests/e2e/route-summary.spec.ts
- [ ] TEST-024 [US2] Test state transition displaying → scrolling on tap CTA in tests/e2e/route-summary.spec.ts

#### GREEN Phase
- [ ] IMPL-011 [US2] Verify state transitions handled by React's natural re-render cycle

## Phase 4: User Story 3 - Slot Format Display (P3)

### TDD Cycle 1: Slot Label Format
**Coverage:**
- Requirements: display format "[emoji] Slot: Venue Name"
- Constants: SLOT_LABELS from daily-route-generator

#### RED Phase
- [ ] TEST-025 [US3] Test Morning slot shows "🌅 Morning: [venue name]" format in tests/unit/route-summary/RoutePreviewItem.test.tsx
- [ ] TEST-026 [US3] Test Lunch slot shows "🌞 Lunch: [venue name]" format in tests/unit/route-summary/RoutePreviewItem.test.tsx
- [ ] TEST-027 [US3] Test Afternoon slot shows "🍰 Afternoon: [venue name]" format in tests/unit/route-summary/RoutePreviewItem.test.tsx
- [ ] TEST-028 [US3] Test Evening slot shows "🌙 Evening: [venue name]" format in tests/unit/route-summary/RoutePreviewItem.test.tsx

#### GREEN Phase
- [ ] IMPL-012 [US3] Format RoutePreviewItem template using SLOT_LABELS constant

### TDD Cycle 2: Accessibility
**Coverage:**
- Accessibility: CTA button minimum 48px height, Tab navigation

#### RED Phase
- [ ] TEST-029 [US3] Test CTA button has minimum 48px height in tests/e2e/route-summary.spec.ts
- [ ] TEST-030 [US3] Test CTA button full section width (touch target) in tests/e2e/route-summary.spec.ts
- [ ] TEST-031 [US3] Test Tab focuses CTA button in tests/e2e/route-summary.spec.ts
- [ ] TEST-032 [US3] Test Enter/Space on CTA triggers scroll in tests/e2e/route-summary.spec.ts

#### GREEN Phase
- [ ] IMPL-013 [US3] Apply min-h-12 (48px) and w-full to CTA button
- [ ] IMPL-014 [US3] Apply focus styles: #ff9500 outline, 2px width, 2px offset (per CHK022)

### From CHK022: CTA Focus Style
**Coverage:**
- Resolution: CHK022 → accent color (#ff9500) outline with 2px width and 2px offset

#### RED Phase
- [ ] TEST-033 [US3] Test CTA button shows #ff9500 focus outline on focus-visible in tests/e2e/route-summary.spec.ts

#### GREEN Phase
- [ ] IMPL-015 [US3] Implement focus-visible ring with accent color outline in src/components/route-summary/RouteSummary.tsx

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: US1 - Group Display and Route Preview (P1)
3. **Phase 3**: US2 - CTA and Instant Updates (P2)
4. **Phase 4**: US3 - Slot Format Display (P3)

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions (displaying, updating, scrolling) have corresponding tests (TEST-022 to TEST-024)
- All constants (VENUE_PREVIEW_COUNT, LABEL_TEXT, CTA_TEXT, CTA_SCROLL_TARGET, LABEL_COLOR, GROUP_NAME_COLOR, DESCRIPTION_COLOR, SLOT_LABELS) are referenced
- Depends on daily-route-generator for routes data and SLOT_LABELS constant
- Depends on group-selector for selectedGroup prop
- Depends on page-layout for useAutoScroll hook
- TEST-/IMPL- numbering is sequential across all user stories
