# Feature Specification: [FEATURE NAME]

**Feature Branch**: `feature/[feature-name]`  
**Input**: [Generated from PRD - [Specific PRD Section Name] OR "User Input"]

## User Scenarios & Testing

### Primary User Story
[Describe the main user journey in plain language - resolved through dialogue or PRD]

### Acceptance Scenarios
1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

### Edge Cases
- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements

### Functional Requirements
- **FR-001**: System MUST [specific capability]
- **FR-002**: System MUST [specific capability]
- **FR-003**: Users MUST be able to [key interaction]
- **FR-004**: System MUST [data requirement]
- **FR-005**: System MUST [behavior]

### UX Requirements
- **UX-001**: [User interaction requirement]
- **UX-002**: [Interface requirement]

### Key Entities
- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

### Technical Context
- **Tech Stack**: [only if critical for understanding limitations]
- **Dependencies**: [List specific feature folders that must be completed first, e.g., `user-authentication`, `database-setup`]
- **Constraints**: [known limitations]

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] All ambiguities resolved
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified
- [ ] Requirements use FR-/UX- prefixes
- [ ] Requirements use MUST/SHOULD/MAY keywords
- [ ] Primary user story clearly described
- [ ] Minimum 2 acceptance scenarios in Given/When/Then format
- [ ] Edge cases documented

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities resolved
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist passed

---