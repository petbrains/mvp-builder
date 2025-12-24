# Data Checklist: Daily Route Generator

**Source**: data-model.md

## Completeness

- [ ] CHK041 Is validation rule defined for GroupData.group_description field (non-empty)? [Completeness, data-model.md: GroupData]
- [ ] CHK042 Is TEST task defined for group_description validation? [Completeness, data-model.md → tasks.md]
- [ ] CHK043 Is TOTAL_VENUES (72) validated at build time with corresponding TEST task? [Completeness, data-model.md: Constants]
- [ ] CHK044 Is validation rule defined for maximum story length? [Completeness, data-model.md: VenueData]

## Clarity

- [ ] CHK045 Is rating range (1.0-5.0) precision specified (integer vs decimal, how many places)? [Clarity, data-model.md: VenueData]
- [ ] CHK046 Is primaryType field format specified (free text vs enum of allowed values)? [Clarity, data-model.md: VenueData]
- [ ] CHK047 Is googleMapsUri format specified beyond "starts with https://"? [Clarity, data-model.md: Validation Rules]

## Consistency

- [ ] CHK048 Do entity field names in data-model.md match TypeScript interface names in tasks.md INIT-003? [Consistency, data-model.md → tasks.md]
- [ ] CHK049 Do constant values in data-model.md match PRD source references? [Consistency, data-model.md → PRD]
- [ ] CHK050 Does GroupRoute.groupDescription field name align with GroupData.group_description? [Consistency, data-model.md: Entities]

## Edge Case

- [ ] CHK051 Is behavior defined for rating value at exact boundaries (1.0 and 5.0)? [Edge Case, data-model.md: Validation Rules]
- [ ] CHK052 Is behavior defined for rating with extra decimal places (e.g., 4.567)? [Edge Case, data-model.md: VenueData]
- [ ] CHK053 Is behavior defined when venue name (object key) contains special characters? [Edge Case, data-model.md: SlotPool]
- [ ] CHK054 Is behavior defined for type coercion (rating as string "4.5" vs number 4.5)? [Edge Case, data-model.md: Validation Rules]
- [ ] CHK055 Is behavior defined for JSON with extra fields beyond schema definition? [Edge Case, data-model.md: Entities]

## Cross-Artifact

- [ ] CHK056 Do constants in data-model.md match quantified values in ux.md Quantified UX Elements? [Consistency, data-model.md → ux.md]
- [ ] CHK057 Are all entity fields from data-model.md covered by validation TEST tasks? [Coverage, data-model.md → tasks.md]
- [ ] CHK058 Do Build Failure Triggers in data-model.md map to edge cases in spec.md? [Consistency, data-model.md → spec.md]
- [ ] CHK059 Are all enum values (GroupName, Slot) validated against corresponding constants? [Coverage, data-model.md: Enums]
