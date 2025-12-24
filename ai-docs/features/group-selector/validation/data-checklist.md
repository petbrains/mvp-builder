# Data Checklist: Group Selector

**Source**: data-model.md

## Completeness

- [ ] CHK033 Is the source dependency for Group.description (daily-route-generator) explicitly documented with import path? [Completeness, data-model.md: Group entity]
- [ ] CHK034 Is the relationship between GroupPill and Group entities defined? [Completeness, data-model.md: Entities]
- [ ] CHK035 Are all 7 constants documented with value, description, and source reference? [Completeness, data-model.md: Constants]

## Clarity

- [ ] CHK036 Is ACCENT_BG_OPACITY format clarified (0.15 decimal vs "15%" percentage)? [Clarity, data-model.md: Constants]
- [ ] CHK037 Is the UPDATE_LATENCY = 0 meaning explicitly documented (no artificial delay)? [Clarity, data-model.md: Constants]
- [ ] CHK038 Is the unit for TOUCH_TARGET_MIN (44px) explicitly stated? [Clarity, data-model.md: Constants]

## Consistency

- [ ] CHK039 Does PILL_COUNT = 4 match the GroupName enum count (4 values)? [Consistency, data-model.md]
- [ ] CHK040 Does ACCENT_COLOR = '#ff9500' match the color value in ux.md? [Consistency, data-model.md → ux.md]
- [ ] CHK041 Does TOUCH_TARGET_MIN = 44 match the "44px" value in ux.md accessibility standards? [Consistency, data-model.md → ux.md]

## Edge Case

- [ ] CHK042 Is validation behavior defined for invalid GroupName values passed to components? [Edge Case, data-model.md: Enums]
- [ ] CHK043 Is behavior defined when Group entity receives empty or undefined description? [Edge Case, data-model.md: Group entity]

## Cross-Artifact

- [ ] CHK044 Do constants in data-model.md match quantified values in ux.md? [Consistency, data-model.md → ux.md]
- [ ] CHK045 Are all state transitions in data-model.md covered by TEST tasks? [Coverage, data-model.md → tasks.md]
- [ ] CHK046 Does the GroupName enum match GROUP_NAMES from daily-route-generator? [Consistency, data-model.md → daily-route-generator]
