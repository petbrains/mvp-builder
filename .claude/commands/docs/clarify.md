---
description: "Claification command for feature specifications."
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

## ⚠️ Critical Rule

**NEVER make assumptions.** If information is not explicitly provided:
- DO NOT guess or use defaults
- MUST ask user for clarification
- WAIT for actual response before proceeding

## Dialogue Protocol

### 1. When unclear aspect detected:
- Stop and ask specific question with context
- Provide options if applicable

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
- Confirm: "✅ Updated [section] in spec.md"

## Common Clarification Areas

- User types and permissions
- Data retention/deletion policies
- Performance targets and scale
- Error handling behaviors
- Integration requirements
- Security/compliance needs
- Visual representation preferences
- Duplicate handling rules
- System limits and boundaries

# Execution Flow

1. **Parse user description from input**
   - If empty: ERROR "No feature description provided"

2. **Extract key concepts**
   - Identify: actors, actions, data, constraints

3. **For each unclear aspect:**
   - Execute dialogue_protocol
   - Update spec incrementally

4. **Fill User Scenarios & Testing section**
   - If no clear user flow: ERROR "Cannot determine user scenarios"

5. **Generate Functional Requirements**
   - Each requirement must be testable
   - All ambiguities resolved through dialogue

6. **Identify Key Entities** (if data involved)

7. **Run Review Checklist**
   - If unclarified items: WARN "Spec has uncertainties"
   - If implementation details: ERROR "Remove tech details"

8. **Report completion:**
   - Display Review & Acceptance Checklist with validation results
   - Display Execution Status with dialogue completion proof
   - Confirm: SUCCESS (spec ready for planning)

# Guidelines

- Focus on WHAT users need and WHY (not HOW)
- Think like a tester: every vague requirement needs clarification