# Implementation Plan: [FEATURE_NAME]

## Purpose
Translates feature requirements into technical implementation strategy.

## Summary
[Describe the core technical approach and key architectural decisions for implementing this feature]

## Technical Context

**Language:** [Primary programming language]

**Framework:** [Core framework/library]

**Storage:** [Data persistence strategy]

**API Layer:** [API architecture approach]

**Testing:** [Testing strategy and scope]

**Deployment:** [Target environment and deployment approach]

**Constraints:** [Technical limitations and boundaries]

## Implementation Mapping

### Component Architecture
[How requirements map to code components without duplicating the requirements themselves]
- Core Components: [Main modules/services needed]
- Data Models: [Entity implementation approach]
- API Operations: [How actions become endpoints/methods]
- State Management: [How states/transitions are handled]

### Error Handling Approach
[Where and how errors from ux.md will be handled in code]
- Error handlers location: [General approach/layer]
- Recovery mechanisms: [How system recovers]
- User feedback: [How errors are presented]

## Project Structure

### Documentation
```
./ai-docs/
├── features/
│   └── [feature-name]/    # Semantic names only
│       ├── plan.md        # This implementation plan
│       ├── research.md    # Technical research and decisions
│       ├── data-model.md  # Domain and persistence design
│       ├── quickstart.md  # Environment setup and configuration
│       └── contracts/     # Service and API contracts
```

### Source Code
** MODEL INSTRUCTION: Select ONE structure based on detected platform/architecture. Remove all other structures and labels. Expand paths with concrete names.**

```
# Structure A: Single Project
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# Structure B: Web Application
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

# Structure C: Mobile + API
api/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

mobile/
└── [platform-specific structure]

# Structure D: Browser Extension
extension/
├── manifest.json
├── src/
│   ├── background/
│   ├── content/
│   └── popup/
└── tests/
```

**Selected Structure:** [Specify which structure was selected and why]

## Testing Approach
[How acceptance scenarios and edge cases map to test files]
- Test Structure: [Organization approach]
- Coverage Strategy: [What gets tested where]

## Implementation Notes
[Any critical implementation decisions, trade-offs, or considerations that don't fit other sections]

---

## Review Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final plan.md output.**

### Requirements Coverage
- [ ] All functional requirements from spec.md addressed
- [ ] All UX patterns from ux.md implementable
- [ ] Edge cases have implementation approach
- [ ] Error handling approach defined

### Technical Alignment  
- [ ] Tech stack matches project constraints
- [ ] Selected structure fits platform/architecture
- [ ] Testing approach covers critical paths

### Structure Clarity
- [ ] Documentation structure supports all artifacts
- [ ] Source code structure is complete
- [ ] Module boundaries clearly defined
- [ ] Component mapping is clear

### Implementation Readiness
- [ ] Technical Context fully specified
- [ ] Performance requirements achievable
- [ ] Security considerations addressed
- [ ] Selected Structure documented with rationale

---