# UX Checklist: Venue Cards

**Source**: ux.md

## Completeness

- [ ] CHK027 Is the complete user flow documented from section entry to exit? [Completeness, ux.md: User Flow]
- [ ] CHK028 Are all exit path behaviors documented (scroll away, group change, open maps)? [Completeness, ux.md: Exit Path Behaviors]
- [ ] CHK029 Are all 3 core actions documented with trigger/feedback/success/error? [Completeness, ux.md: Core Actions]
- [ ] CHK030 Is swipe gesture feedback during drag documented (not just end state)? [Completeness, ux.md: swipe_card]
- [ ] CHK031 Are all 4 visibility states documented with corresponding UI? [Completeness, ux.md: States]
- [ ] CHK032 Are platform-specific patterns documented for both web and mobile? [Completeness, ux.md: Platform-Specific Patterns]

## Clarity

- [ ] CHK033 Is the swipe threshold (50px) specified as absolute or viewport-relative? [Clarity, Resolution: CHK033]
- [ ] CHK034 Is "2-3 sentences" for story length defined with character/word limits? [Clarity, ux.md: Quantified Elements]
- [ ] CHK035 Is the animation duration for card transitions specified? [Clarity, Resolution: CHK035]
- [ ] CHK036 Are dot indicator sizes (44x44px) specified with measurement context? [Clarity, ux.md: Touch Targets]
- [ ] CHK037 Is the Maps button pressed state appearance defined? [Clarity, ux.md: tap_maps feedback]

## Coverage

- [ ] CHK038 Are all state transitions (12 total) documented in the flow diagram? [Coverage, ux.md: User Flow]
- [ ] CHK039 Is keyboard navigation documented (Tab, Arrow keys, Enter)? [Coverage, ux.md: Web Platform]
- [ ] CHK040 Are all accessibility standards documented (screen readers, navigation, visual, touch)? [Coverage, ux.md: Accessibility Standards]
- [ ] CHK041 Are all error types documented even if N/A (network, validation, timeout, permission)? [Coverage, ux.md: Error Presentation]
- [ ] CHK042 Is offline behavior documented for static content and Maps button? [Coverage, ux.md: Mobile Offline]

## Edge Case

- [ ] CHK043 Is behavior for diagonal swipe gesture documented? [Edge Case, Resolution: CHK043]
- [ ] CHK044 Is swipe boundary behavior documented (bounce effect)? [Edge Case, ux.md: swipe_card error]
- [ ] CHK045 Is behavior when story exceeds 3 sentences documented? [Edge Case, ux.md: story length]
- [ ] CHK046 Is behavior for rapid consecutive swipes documented? [Edge Case, Resolution: CHK046]
- [ ] CHK047 Is touch target overlap behavior documented (card vs dots)? [Edge Case, ux.md: Touch Targets]

## Cross-Artifact

- [ ] CHK048 Are all accessibility requirements covered by TEST tasks in tasks.md? [Coverage, ux.md → tasks.md]
- [ ] CHK049 Are all state transitions covered by state tests (TEST-033 to TEST-040)? [Coverage, ux.md → tasks.md]
- [ ] CHK050 Do touch target sizes match minimum values in accessibility tests? [Consistency, ux.md → tasks.md]
- [ ] CHK051 Is color contrast ratio (4.5:1, 5.5:1) testable via implementation? [Coverage, ux.md → plan.md]
