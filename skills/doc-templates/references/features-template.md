# Feature Index

Total Features: [TOTAL_COUNT]

## Features List

### [EPIC_NAME] ([EPIC_FEATURE_COUNT] features)

- **[FEATURE_TITLE]**
  - Folder: `[FEATURE_FOLDER_NAME]`

[REPEAT FOR ALL FEATURES IN EPIC...]

### [EPIC_NAME] ([EPIC_FEATURE_COUNT] features)
[REPEAT STRUCTURE...]

## Implementation Sequence

**Recommended Order:** [SEQUENCE_DESCRIPTION]

### Phase 1: [PHASE_NAME] ([PHASE_DESCRIPTION])
1. **[FEATURE_TITLE]** - [JUSTIFICATION]
2. **[FEATURE_TITLE]** - Depends on: `[DEPENDENCY_FOLDERS]`
[...]

[REPEAT FOR ALL PHASES...]

---

## Review Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final FEATURES.md output.**

### Redundancy Check
- [ ] No duplicate feature titles (>70% similarity)
- [ ] No functional overlap between features
- [ ] No duplicate acceptance criteria across features
- [ ] Entity CRUD ownership clearly defined

### Dependency Validation
- [ ] No circular dependencies
- [ ] All dependency targets exist
- [ ] No orphaned features
- [ ] Implementation sequence is achievable

### Consistency Check
- [ ] Entity definitions consistent across features
- [ ] No contradictory business rules
- [ ] Requirements don't contradict between features
- [ ] Technical approaches are compatible
- [ ] All features align with core proposition

### Content Completeness
- [ ] Each epic has at least one feature
- [ ] All features have clear path to completion

---