# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → MUST ask user specific question (no assumptions allowed)
   → Wait for actual user response
   → Analyze with /mcp__sequential-thinking__sequentialthinking for consistency
   → Show analysis result
   → Wait for 'ok' confirmation
   → Write clarified info to SPEC_FILE incrementally
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → All ambiguities must be resolved through dialogue
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any unclarified items: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## Clarification Dialogue Protocol

**CRITICAL RULE**: If information is not explicitly provided in user description:
- DO NOT assume or guess
- DO NOT use "reasonable defaults"
- MUST ask user for clarification
- WAIT for actual response before proceeding

### When unclear aspect detected:

1. **Stop and Ask:**
   ```dialogue
   "I need to clarify [aspect].
   [Specific question with context]
   [Provide options if applicable]"
   ```

2. **Analyze Response:**
   ```
   Use /mcp__sequential-thinking__sequentialthinking:
   - Check consistency with existing requirements
   - Verify specificity and testability
   - Detect any contradictions
   - Minimum score: 5 to proceed
   ```

3. **Confirm with User:**
   ```dialogue
   "Analysis: [result from sequential-thinking]
   Type 'ok' to confirm or provide adjustments."
   ```

4. **Save After Confirmation:**
   - Read current SPEC_FILE
   - Update relevant section with clarified information
   - Write back to SPEC_FILE
   - Confirm: "✅ Updated [section] in spec.md"

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Clarify all ambiguities through dialogue**: Never make assumptions
2. **Don't guess**: If the prompt doesn't specify something, you MUST ask
3. **Think like a tester**: Every vague requirement needs explicit clarification
4. **Common areas requiring clarification**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs
   - Visual representation preferences
   - Duplicate handling rules
   - System limits and boundaries

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
[Describe the main user journey in plain language - resolved through dialogue]

### Acceptance Scenarios
1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

### Edge Cases
- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST [specific capability - clarified through dialogue]
- **FR-002**: System MUST [specific capability - no assumptions made]
- **FR-003**: Users MUST be able to [key interaction - explicitly confirmed]
- **FR-004**: System MUST [data requirement - user specified]
- **FR-005**: System MUST [behavior - verified with user]

### Key Entities *(include if feature involves data)*
- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] All ambiguities resolved through dialogue (no assumptions)
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified
- [ ] User confirmed all clarifications with 'ok'

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities clarified through dialogue (not assumptions)
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] All user confirmations received
- [ ] Review checklist passed

---