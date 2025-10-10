# Feature Index

Generated from: [SOURCE: ./ai-docs/PRD.md OR User Input]
Last updated: [TIMESTAMP]
Total Features: [TOTAL_COUNT]

## Feature Summary by Epic

### Epic 1: [EPIC_NAME] ([EPIC_FEATURE_COUNT] features)

- **[FEATURE_TITLE]**
  - Priority: [PRIORITY_LEVEL]
  - Folder: `[FEATURE_FOLDER_NAME]`
  - Dependencies: [DEPENDENCY_LIST OR None]
  - Source: [SOURCE_REFERENCE]

[REPEAT FOR ALL FEATURES IN EPIC...]

### Epic 2: [EPIC_NAME] ([EPIC_FEATURE_COUNT] features)
[REPEAT STRUCTURE...]

## Implementation Sequence

**Recommended Order:** [SEQUENCE_DESCRIPTION]

### Phase 1: [PHASE_NAME] ([PHASE_DESCRIPTION])
1. **[FEATURE_TITLE]** - [JUSTIFICATION]
2. **[FEATURE_TITLE]** - Depends on: `[DEPENDENCY_FOLDERS]`
[...]

[REPEAT FOR ALL PHASES...]

## Feature Priorities

**Critical (Must Have):**
- [FEATURE_NAMES_LIST]

**High (Core User Journey):**
- [FEATURE_NAMES_LIST]

**Medium (Quality Enhancement):**
- [FEATURE_NAMES_LIST]

## Development Notes

[PROJECT_SPECIFIC_NOTES]

---

## Review & Acceptance Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This section is for internal validation only. Do not include in final FEATURES.md output.**

### Redundancy Check
- [ ] No duplicate feature titles (>70% similarity)
- [ ] No functional overlap between features
- [ ] No duplicate acceptance criteria across features
- [ ] Entity CRUD ownership clearly defined

### Conflict Detection
- [ ] No circular dependencies
- [ ] All dependency targets exist
- [ ] No orphaned features
- [ ] Entity definitions consistent across features
- [ ] No contradictory business rules
- [ ] Requirements don't contradict between features
- [ ] Technical approaches are compatible

### Source Consistency
- [ ] All features align with PRD core proposition
- [ ] Technical constraints respected
- [ ] User Input features don't contradict PRD (if mixed)

### Implementation Validation
- [ ] Dependency chain has no circular references
- [ ] Foundation features ordered before dependent features
- [ ] Implementation sequence is achievable
- [ ] All critical features have clear path to completion

### Content Completeness
- [ ] All PRD sections processed into features
- [ ] Each epic has at least one feature
- [ ] All features have spec.md files
- [ ] No missing dependencies
- [ ] Priority levels assigned to all features

---