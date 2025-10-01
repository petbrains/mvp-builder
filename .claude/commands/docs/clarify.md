---
description: "Clarification command for feature specifications."
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking
---

# Instructions

Interactive command that refines existing feature specifications through targeted clarification dialogue.

**Tools Usage:**
- See @.claude/tools/sequential-thinking.md for iterative analysis with hypothesis generation and verification
- `Write`: For incremental spec updates after clarifications
- `Read`: For loading current spec state

**Template:** @.claude/templates/spec-template.md

# Task

Refine the existing spec.md by:
1. Reading and analyzing current spec.md content
2. Identifying ambiguities within existing sections
3. Conducting targeted clarification dialogue
4. Updating ONLY existing template sections with clarifications
5. Preserving all existing content while adding precision

# Rules

## Critical Rule

**NEVER make assumptions.** If information is ambiguous:
- DO NOT guess or use defaults
- MUST ask user for clarification
- WAIT for actual response before proceeding
- ONLY update existing template sections
- PRESERVE all existing content

## Dialogue Protocol

### 1. When ambiguity detected in existing content:
- Identify which template section contains the ambiguity
- Ask specific clarification question
- Reference the existing text being clarified
- Each question must be answerable with EITHER:
  * A short multiple-choice selection, OR
  * A one-word / short-phrase answer

### 2. After user response:
- Analyze with `/mcp__sequential-thinking__sequentialthinking`
- Validate clarification fits within existing section

### 3. Confirm analysis:
- Show current text vs. clarified version
- Wait for 'ok' confirmation

### 4. Save incrementally:
- Read current SPEC_FILE
- Update the specific part within existing section
- Preserve all other content
- Write back to SPEC_FILE
- Log: "✅ Clarified [aspect] in [section name]"

## Ambiguity Detection by Template Section

### In "Primary User Story":
- Vague user roles ("users", "people", "someone")
- Unclear goals ("manage stuff", "handle things")
- Missing context (when/why they use feature)

### In "Acceptance Scenarios":
- Non-specific initial states ("system is ready")
- Ambiguous actions ("user does something")
- Vague outcomes ("it works correctly")
- Missing edge conditions

### In "Edge Cases":
- Generic descriptions ("error handling")
- Unspecified behaviors ("handle appropriately")
- Missing recovery actions

### In "Functional Requirements":
- Non-testable requirements ("should be fast")
- Ambiguous MUST/SHOULD/MAY usage
- Missing success criteria
- Vague data specifications

### In "UX Requirements":
- Generic interactions ("user-friendly")
- Unspecified feedback ("show message")
- Missing error states

### In "Key Entities":
- Undefined relationships ("related to")
- Missing cardinality (one-to-many?)
- Vague attributes ("some data")

### In "Technical Context":
- Unclear constraints ("performance limits")
- Vague dependencies ("needs other system")

# Execution Flow

1. **Load and parse existing spec.md**
   - Read current spec content
   - Parse all template sections
   - Preserve formatting and structure

2. **Analyze existing content for ambiguities**
   
   For each template section with content:
   - Scan for vague terms and placeholders
   - Identify non-testable statements
   - Find missing specificity
   - Mark unclear relationships

3. **Generate prioritized clarification queue:**
   - Focus on high-impact ambiguities that affect:
     * Test design and validation
     * Implementation decisions
     * User experience flows
   - Skip minor wording issues
   - Limit to MAX 5 questions

4. **For each identified ambiguity:**
   
   → **Extract context**
   - Show existing text
   - Identify specific unclear part
   
   → **Ask targeted question**
   - Format: "In [Section Name], you wrote: '[existing text]'"
   - Question: "What specifically does '[vague part]' mean?"
   - Provide options if applicable
   
   → **Update with clarification**
   - Replace vague text with specific answer
   - Keep surrounding content intact
   - Maintain section structure

5. **Validate after each update:**
   - Check requirement testability improved
   - Verify no new ambiguities introduced
   - Ensure consistency with other sections

6. **Final validation:**
   - All clarified text is specific and testable
   - No contradictions between sections
   - Template structure preserved
   - Original intent maintained

7. **Report completion:**
   - List clarifications made by section
   - Show before/after for each change
   - Confirm: SUCCESS (spec refined and ready)

# Examples of Clarifications

## Before/After Examples:

**Primary User Story:**
- Before: "Users can manage their content"
- Ask: "What type of users - admins, editors, or viewers?"
- After: "Content editors can manage their published articles"

**Functional Requirement:**
- Before: "FR-001: System MUST be fast"
- Ask: "What specific response time - under 2s, 500ms, 100ms?"
- After: "FR-001: System MUST respond within 500ms"

**Key Entity:**
- Before: "User: represents someone in system"
- Ask: "What defines a unique user - email, username, or ID?"
- After: "User: represents account holder, unique by email"

# Guidelines

- Work ONLY within existing template sections
- Maximum 5 clarification questions total
- Preserve all existing valid content
- Make minimal changes for maximum clarity
- Keep original structure and formatting
- Focus on testability and specificity
- Never add new sections or categories

# Error Conditions

- ERROR if attempting to add new sections
- ERROR if more than 5 clarifications needed
- WARN if removing existing content without replacement
- ERROR if breaking template structure