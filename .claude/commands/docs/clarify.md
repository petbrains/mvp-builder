---
description: "Clarification command for feature specifications."
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking
---

# Instructions

Interactive command generator that updates feature specifications through user dialogue and analysis.

**Tools Usage:**
- See @.claude/tools/sequential-thinking.md for iterative analysis with hypothesis generation and verification
- `Write`: For incremental spec saving after each stage
- `Read`: For loading current spec state before updates

**Template:** @.claude/templates/spec-template.md

# Task

Update the spec.md file by:
1. Reading the existing spec.md from user input
2. Conducting clarification dialogue with the user
3. Analyzing responses using sequential-thinking
4. Incrementally updating the specification
5. Validating completeness before completion

# Rules

## Critical Rule

**NEVER make assumptions.** If information is not explicitly provided:
- DO NOT guess or use defaults
- MUST ask user for clarification
- WAIT for actual response before proceeding

## Dialogue Protocol

### 1. When unclear aspect detected:
- Stop and ask specific question with context
- Provide options if applicable
- Each question must be answerable with EITHER:
  * A short multiple-choice selection, OR
  * A one-word / short-phrase answer

### 2. After user response:
- Analyze with `/mcp__sequential-thinking__sequentialthinking`
- Check consistency, specificity, testability

### 3. Confirm analysis:
- Show analysis result to user
- Wait for 'ok' confirmation

### 4. Save incrementally:
- Read current SPEC_FILE
- Update relevant section
- Write back to SPEC_FILE
- Append clarification record: `- Q: <question> → A: <final answer>`
- Confirm: "✅ Updated [section] in spec.md"

## Common Clarification Areas

### Structured Ambiguity Taxonomy:

**Functional Scope & Behavior:**
- Core user goals & success criteria
- Explicit out-of-scope declarations
- User roles / personas differentiation

**Domain & Data Model:**
- Entities, attributes, relationships
- Identity & uniqueness rules
- Lifecycle/state transitions
- Data volume / scale assumptions

**Interaction & UX Flow:**
- Critical user journeys / sequences
- Error/empty/loading states
- Accessibility or localization notes

**Non-Functional Quality Attributes:**
- Performance (latency, throughput targets)
- Scalability (horizontal/vertical, limits)
- Reliability & availability (uptime, recovery expectations)
- Observability (logging, metrics, tracing signals)
- Security & privacy (authN/Z, data protection, threat assumptions)
- Compliance / regulatory constraints (if any)

**Integration & External Dependencies:**
- External services/APIs and failure modes
- Data import/export formats
- Protocol/versioning assumptions

**Edge Cases & Failure Handling:**
- Negative scenarios
- Rate limiting / throttling
- Conflict resolution (e.g., concurrent edits)
- Duplicate handling rules

**Constraints & Tradeoffs:**
- Technical constraints (language, storage, hosting)
- Explicit tradeoffs or rejected alternatives

**Terminology & Consistency:**
- Canonical glossary terms
- Avoided synonyms / deprecated terms

**Completion Signals:**
- Acceptance criteria testability
- Measurable Definition of Done style indicators

# Execution Flow

1. **Parse user description from input**
   - If empty: ERROR "No feature description provided"

2. **Extract key concepts**
   - Identify: actors, actions, data, constraints
   - Perform structured ambiguity scan using taxonomy
   - Mark each category: Clear / Partial / Missing

3. **Generate prioritized question queue:**
   - Maximum 5 questions total
   - Prioritize by (Impact * Uncertainty) heuristic
   - Skip low-impact or plan-level details
   - Only include questions that materially impact:
     * Architecture or data modeling
     * Task decomposition or test design
     * UX behavior or operational readiness
     * Compliance validation

4. **For each unclear aspect:**
   - Execute dialogue_protocol
   - Update spec incrementally after each answer
   - Validate consistency after each write

5. **Fill User Scenarios & Testing section**
   - If no clear user flow: ERROR "Cannot determine user scenarios"

6. **Generate Functional Requirements**
   - Each requirement must be testable
   - All ambiguities resolved through dialogue

7. **Identify Key Entities**
   - Extract entities, attributes, relationships from spec
   - Define identity & uniqueness rules for each entity
   - Map lifecycle/state transitions
   - Document data volume / scale assumptions
   - Validate entity relationships consistency
   - Ensure all entities referenced in functional requirements are defined

8. **Run Review Checklist & Validation:**
   - Total asked questions ≤ 5
   - No contradictory statements remain
   - Terminology consistency across sections
   - Each inserted clarification minimal and testable
   - No lingering vague placeholders
   - If unclarified items: WARN "Spec has uncertainties"
   - If implementation details: ERROR "Remove tech details"

9. **Report completion:**
   - Path to updated spec
   - Display Review & Acceptance Checklist with validation results
   - Display Coverage Summary Table:
     * Category | Status (Resolved/Deferred/Clear/Outstanding)
   - List sections touched
   - Confirm: SUCCESS (spec ready for planning)

# Guidelines

- Focus on WHAT users need and WHY (not HOW)
- Think like a tester: every vague requirement needs clarification
- Favor clarifications that reduce downstream rework risk
- Preserve formatting: do not reorder unrelated sections; keep heading hierarchy intact
- Avoid speculative tech stack questions unless the absence blocks functional clarity
- If no meaningful ambiguities found, respond: "No critical ambiguities detected worth formal clarification" and suggest proceeding