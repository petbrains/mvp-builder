---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
---

# Implementation Plan: [FEATURE]

## Purpose
Defines **how** the feature described in `spec.md` will be implemented — outlining the technical architecture, project structure, data model, contracts, and rollout strategy.  
Focus: translate *requirements* into an actionable *implementation strategy*.

## Summary

Extract the core implementation idea and key architectural direction from `spec.md`.

## Technical Context
Describe all technical parameters that define how this feature will be built.

**Language:** Primary programming language(s) used for implementation.

**Framework:** Core frameworks or libraries applied in the feature.

**Storage:** Database or state-management strategy (e.g., PostgreSQL, Redis, local storage).

**API Layer:** Internal or external APIs integrated in this feature.

**Testing:** Approach to unit, integration, and end-to-end testing.

**Deployment:** Target environment, packaging, and release approach.

**Constraints:** Known performance, security, or privacy limitations and budgets.

## Project Structure

### Documentation (this feature)

```
./ai-docs/features/[feature]/
├── plan.md              # Finalized implementation plan
├── research.md          # Phase 0 output (risks, options, decisions)
├── data-model.md        # Phase 1 output (domain & persistence design)
├── quickstart.md        # Phase 1 output (environment setup and CI configuration)
└── contracts/           # Phase 1 output (service/API definitions)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]

# [REMOVE IF UNUSED] Option 4: Browser Extension (when "Browser Extension" detected)
extension/
├── manifest.json
├── src/
│   ├── background/
│   ├── content/
│   ├── ui/
│   │   ├── popup/
│   │   └── options/
│   ├── services/
│   └── shared/
├── assets/
└── tests/
```

**Structure Decision**: [Document the selected structure and reference the real directories captured above]

## Complexity Tracking
*Fill only if Constitution Check has violations that must be justified.*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Example 1 | [Reason] | [Why simpler approach insufficient] |
| Example 2 | [Reason] | [Why simpler approach insufficient] |

---

<!-- MODEL INSTRUCTION: DO NOT INCLUDE IN OUTPUT -->
### Review Checklist
- [ ] All requirements from `spec.md` are addressed.  
- [ ] Chosen stack aligns with constraints and budgets.  
- [ ] Project structure and module boundaries defined clearly.  
- [ ] Performance/security/privacy criteria documented.  
- [ ] Rollout and monitoring strategy included.  
- [ ] Dependencies validated and scoped properly within this plan.