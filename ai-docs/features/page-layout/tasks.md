# Tasks: Page Layout

## Purpose
TDD-structured tasks for implementing the single-page vertical layout with auto-scroll navigation and footer attribution.

## Phase 1: Core Infrastructure

- [ ] INIT-001 Create page layout structure per plan.md in src/app/page.tsx
- [ ] INIT-002 Create Section wrapper component in src/components/layout/Section.tsx
- [ ] INIT-003 Create Footer component in src/components/layout/Footer.tsx
- [ ] INIT-004 Create useAutoScroll hook in src/hooks/useAutoScroll.ts
- [ ] INIT-005 Configure Tailwind theme with PAGE_BACKGROUND, FOOTER_TEXT_COLOR in tailwind.config.ts
- [ ] INIT-006 Add layout constants (SECTION_ORDER, AUTO_SCROLL_DURATION, SECTION_PADDING_X, SECTION_PADDING_Y) to src/lib/constants.ts
- [ ] INIT-007 Setup globals.css with dark theme background and section spacing
- [ ] INIT-008 Configure Vitest and Playwright for testing per setup.md

## Phase 2: User Story 1 - Section Structure Display (P1 - MVP)

### TDD Cycle 1: Section Layout
**Coverage:**
- Requirements: FR-001, FR-002, UX-001, UX-002
- Data entities: Section, SectionType
- Constants: SECTION_ORDER, SECTION_PADDING_X, SECTION_PADDING_Y, PAGE_BACKGROUND, ONBOARDING_HEIGHT

#### RED Phase
- [ ] TEST-001 [US1] Test page renders 4 sections in correct order (onboarding, route-summary, venue-cards, footer) in tests/e2e/page-layout.spec.ts
- [ ] TEST-002 [US1] Test onboarding section has height 100vh in tests/e2e/page-layout.spec.ts
- [ ] TEST-003 [US1] Test sections have correct padding (24px horizontal, 48px vertical) in tests/e2e/page-layout.spec.ts
- [ ] TEST-004 [US1] Test page background is PAGE_BACKGROUND (#0a0a0a) in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-001 [US1] Implement Section component with id, height props in src/components/layout/Section.tsx
- [ ] IMPL-002 [US1] Implement page layout with 4 sections in SECTION_ORDER in src/app/page.tsx
- [ ] IMPL-003 [US1] Apply SECTION_PADDING_X, SECTION_PADDING_Y to sections

## Phase 3: User Story 2 - Auto-Scroll Navigation (P1 - MVP)

### TDD Cycle 1: useAutoScroll Hook
**Coverage:**
- Requirements: FR-003, UX-005
- Data entities: AutoScrollConfig, ScrollState
- Constants: AUTO_SCROLL_DURATION

#### RED Phase
- [ ] TEST-005 [US2] Test useAutoScroll calls scrollIntoView with behavior smooth in tests/unit/hooks/useAutoScroll.test.ts
- [ ] TEST-006 [US2] Test auto-scroll duration is AUTO_SCROLL_DURATION (500ms), uses browser smooth behavior, browser-controlled timing per CHK039/CHK041 in tests/unit/hooks/useAutoScroll.test.ts

#### GREEN Phase
- [ ] IMPL-004 [US2] Implement useAutoScroll hook with scrollIntoView wrapper in src/hooks/useAutoScroll.ts

### TDD Cycle 2: Auto-Scroll State Machine
**Coverage:**
- States: idle → scrolling, scrolling → idle, scrolling → interrupted, interrupted → idle

#### RED Phase
- [ ] TEST-007 [US2] Test state transition idle → scrolling on CTA tap in tests/e2e/page-layout.spec.ts
- [ ] TEST-008 [US2] Test state transition scrolling → idle on animation complete in tests/e2e/page-layout.spec.ts
- [ ] TEST-009 [US2] Test state transition scrolling → interrupted on user scroll in tests/e2e/page-layout.spec.ts
- [ ] TEST-010 [US2] Test state transition interrupted → idle when scroll stops in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-005 [US2] Implement scroll state management with interruption handling in src/hooks/useAutoScroll.ts

### TDD Cycle 3: CTA Button Integration
**Coverage:**
- Requirements: FR-003
- Accessibility: Tab navigation, Enter/Space activation

#### RED Phase
- [ ] TEST-011 [US2] Test CTA button triggers auto-scroll to target section in tests/e2e/page-layout.spec.ts
- [ ] TEST-012 [US2] Test keyboard navigation Tab focuses CTA button in tests/e2e/page-layout.spec.ts
- [ ] TEST-013 [US2] Test Enter/Space on CTA triggers scroll in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-006 [US2] Create CTAButton component with useAutoScroll integration in src/components/ui/CTAButton.tsx

### From CHK014: Mid-Scroll CTA Behavior
**Coverage:**
- Resolution: CHK014 - Add test for mid-scroll CTA tap triggering auto-scroll interrupt

#### RED Phase
- [ ] TEST-025 [US2] Test mid-scroll CTA tap triggers auto-scroll and interrupts current scroll in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-011 [US2] Ensure CTA tap during manual scroll initiates auto-scroll correctly in src/hooks/useAutoScroll.ts

## Phase 4: User Story 3 - Manual Scroll and Footer (P2)

### TDD Cycle 1: Manual Scroll Behavior
**Coverage:**
- Requirements: FR-004, FR-005

#### RED Phase
- [ ] TEST-014 [US3] Test manual scroll works without hijacking at any point in tests/e2e/page-layout.spec.ts
- [ ] TEST-015 [US3] Test state transition idle → idle on manual scroll in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-007 [US3] Ensure no scroll-hijacking CSS or JS prevents natural scroll

### TDD Cycle 2: Footer Component
**Coverage:**
- Requirements: FR-005, FR-006, UX-003, UX-004
- Constants: FOOTER_TEXT, FOOTER_TEXT_COLOR

#### RED Phase
- [ ] TEST-016 [US3] Test footer displays FOOTER_TEXT attribution in tests/e2e/page-layout.spec.ts
- [ ] TEST-017 [US3] Test footer text is FOOTER_TEXT_COLOR (#666666) in tests/e2e/page-layout.spec.ts
- [ ] TEST-018 [US3] Test footer has no interactive elements in tests/e2e/page-layout.spec.ts
- [ ] TEST-019 [US3] Test footer is only accessible via manual scroll in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-008 [US3] Implement Footer with FOOTER_TEXT, centered, muted styling in src/components/layout/Footer.tsx

### TDD Cycle 3: Accessibility
**Coverage:**
- Accessibility: semantic landmarks, skip link, focus visibility, touch targets

#### RED Phase
- [ ] TEST-020 [US3] Test page has semantic HTML5 landmarks (main, footer) and skip link to main content per CHK021 in tests/e2e/page-layout.spec.ts
- [ ] TEST-021 [US3] Test all interactive elements meet TOUCH_TARGET_MIN (44px) in tests/e2e/page-layout.spec.ts
- [ ] TEST-022 [US3] Test focus is visible on all interactive elements in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-009 [US3] Add semantic landmarks and focus-visible styles to layout components

## Phase 5: User Story 4 - Responsive Layout (P3)

### TDD Cycle 1: Viewport Responsiveness
**Coverage:**
- Requirements: viewport consistency across sizes
- Edge cases: 100vh mobile, iOS Safari address bar

#### RED Phase
- [ ] TEST-023 [US4] Test sections maintain proper spacing across viewport sizes in tests/e2e/page-layout.spec.ts
- [ ] TEST-024 [US4] Test onboarding maintains 100vh with dvh fallback for mobile in tests/e2e/page-layout.spec.ts

#### GREEN Phase
- [ ] IMPL-010 [US4] Add CSS dvh with vh fallback for iOS Safari compatibility in src/app/globals.css

## Execution Order

1. **Phase 1**: Core Infrastructure (blocks all stories)
2. **Phase 2**: US1 - Section Structure Display (P1)
3. **Phase 3**: US2 - Auto-Scroll Navigation (P1)
4. **Phase 4**: US3 - Manual Scroll and Footer (P2)
5. **Phase 5**: US4 - Responsive Layout (P3)

Within each story: RED → GREEN cycles

## Notes

- Tasks organized by TDD cycles: RED → GREEN
- Stories execute in priority order (P1 → P2 → P3)
- Each story independently testable
- Tests precede implementation
- No test stubs or always-passing mocks
- All state transitions (idle, scrolling, interrupted) have corresponding tests
- All constants (SECTION_ORDER, AUTO_SCROLL_DURATION, SECTION_PADDING_X/Y, PAGE_BACKGROUND, FOOTER_TEXT, FOOTER_TEXT_COLOR, ONBOARDING_HEIGHT, TOUCH_TARGET_MIN) are referenced
- TEST-/IMPL- numbering is sequential across all user stories
- Deferred: CHK028 - Momentum scrolling for mobile (post-MVP)
- Deferred: CHK029 - Safari < 15.4 scrollIntoView fallback (post-MVP)
- Deferred: CHK030 - Rapid CTA tap handling (post-MVP)
