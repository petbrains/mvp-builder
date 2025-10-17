# Implementation Plan: [FEATURE_NAME]

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
./ai-docs/features/[FEATURE_FOLDER_NAME]/
├── plan.md              # Finalized implementation plan
├── research.md          # Phase 0 output (risks, options, decisions)
├── data-model.md        # Phase 1 output (domain & persistence design)
├── quickstart.md        # Phase 1 output (environment setup and CI configuration)
└── contracts/           # Phase 1 output (service/API definitions)
```

### Source Code (repository root)
** MODEL INSTRUCTION: Select ONE structure option based on detected platform/architecture from spec.md and ux.md. Remove all other options and "Option X:" labels. Expand paths with concrete names.**

```
# Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Option 2: Web application (when "frontend" + "backend" detected)
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

# Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]

# Option 4: Browser Extension (when "Browser Extension" detected)
extension/
├── manifest.json
├── src/
│   ├── background/
│   ├── content/
│   └── popup/
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

## Review Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final plan.md output.**

### Requirements Coverage
- [ ] All requirements from `spec.md` are addressed
- [ ] UX patterns from `ux.md` are implementable
- [ ] No requirements left unimplemented

### Technical Alignment
- [ ] Chosen stack aligns with PRD technical requirements
- [ ] Constraints and budgets respected
- [ ] Testing strategy covers all critical paths

### Structure Clarity
- [ ] Project structure matches detected platform/architecture
- [ ] Module boundaries defined clearly
- [ ] Documentation structure supports all phases

### Implementation Readiness
- [ ] Performance criteria documented
- [ ] Security/privacy criteria documented
- [ ] Rollout strategy included
- [ ] Monitoring strategy defined
- [ ] Dependencies validated and scoped

---