# API Checklist: Venue Cards

**Source**: plan.md (no contracts/ - static URI integration only)

## Completeness

- [ ] CHK052 Is the Google Maps URI format documented? [Completeness, plan.md: Maps Integration]
- [ ] CHK053 Are link security attributes (target, rel) documented? [Completeness, plan.md: Implementation Notes]
- [ ] CHK054 Is the venue data source (props from daily-route-generator) documented? [Completeness, plan.md: Technical Context]

## Clarity

- [ ] CHK055 Is the Maps link behavior (new tab vs same tab) unambiguous? [Clarity, FR-007]
- [ ] CHK056 Is the data flow from route-generator to venue cards documented? [Clarity, plan.md: Component Architecture]

## Coverage

- [ ] CHK057 Is success path documented (Maps opens in new tab)? [Coverage, ux.md: tap_maps success]
- [ ] CHK058 Is error path documented (browser handles malformed URI)? [Coverage, ux.md: tap_maps error]
- [ ] CHK059 Is the no-API-key approach documented (pre-built URI)? [Coverage, plan.md: API Layer]

## Cross-Artifact

- [ ] CHK060 Does Maps button implementation match FR-007 and UX-007? [Consistency, plan.md → spec.md]
- [ ] CHK061 Are Maps button tests covering both success and error paths? [Coverage, plan.md → tasks.md]
