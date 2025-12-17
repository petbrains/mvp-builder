---
description: Clarification feature specifications.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Interactive command that refines existing feature specifications through targeted clarification dialogue.

**Tools Usage:**
- `Read`: For loading current spec state
- `Write`: For incremental spec updates after clarifications
- `Bash`: For file operations

**Skills:**
- Sequential Thinking Methodology: For analyzing section coherence and validating clarification consistency
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

**Template:** @.claude/templates/spec-template.md

# Task

Refine the existing spec.md by:
1. Reading and analyzing current spec.md content
2. Processing each template section sequentially
3. Identifying and resolving ambiguities within sections
4. Updating ONLY existing content with clarifications
5. Preserving structure and formatting

# Rules

## Critical Rule
**NEVER make assumptions.** When encountering ambiguity:
- DO NOT guess or use defaults
- MUST ask user for clarification
- WAIT for actual response before proceeding
- ONLY update existing template sections
- PRESERVE all existing content and structure

## Processing Constraints
- Work within existing template sections only
- Maximum 5 clarification questions per section
- Make minimal changes for maximum clarity
- Never add new sections or categories
- Never remove content without replacement

# Execution Flow

## 1. Initialize
- Read current spec.md content
- Parse template sections
- Identify sections with content

## 2. Process Each Section

### 2.1 Scan for Ambiguities
Check section content against these patterns:

**Primary User Story:**
- Vague roles: "users", "people", "someone"
- Unclear goals: "manage stuff", "handle things"  
- Missing context: when/why feature is used

**Acceptance Scenarios:**
- Non-specific states: "system is ready"
- Ambiguous actions: "user does something"
- Vague outcomes: "it works correctly"

**Edge Cases:**
- Generic descriptions: "error handling"
- Unspecified behaviors: "handle appropriately"
- Missing recovery actions

**Functional Requirements:**
- Non-testable metrics: "should be fast"
- Missing bounds: "handle many"
- Unclear priorities: MUST vs SHOULD

**UX Requirements:**
- Generic interactions: "user-friendly"
- Unspecified feedback: "show message"
- Missing error states

**Key Entities:**
- Undefined relationships: "related to"
- Missing cardinalities
- Vague attributes: "some data"

**Technical Context:**
- Unclear constraints: "performance limits", "scalability requirements"
- Vague tech stack: "modern framework", "standard tools"

### 2.2 Collect Clarifications
If ambiguities found:
- Generate numbered list of questions (max 5)
- Each question must be answerable with:
  * Multiple-choice selection, OR
  * Short phrase/value
- Present all questions for section at once

Example format:
```
Analyzing [Section Name]...
Found ambiguities:

1. In "Users can manage content", what type of users?
   a) Admins 
   b) Editors 
   c) Viewers

2. In "System MUST be fast", specify response time:
   Format: number+unit (e.g., "500ms")

Please answer all: (e.g., "1:b, 2:500ms")
```

### 2.3 Analyze Section Coherence
After receiving ALL answers for section:

**Apply Sequential Thinking Methodology** for coherence analysis:
- Verify clarifications are mutually consistent
- Check section completeness
- Validate testability improvement

### 2.4 Update Section
- Show before/after comparison
- Wait for user confirmation ("ok")
- Read current SPEC_FILE
- Apply all clarifications to section atomically
- Preserve formatting and structure
- Write back to SPEC_FILE
- Log: "✅ Clarified [section name]"

## 3. Complete Processing
After all sections processed:
- Validate cross-section consistency
- Ensure no contradictions introduced
- Verify all requirements testable

## 4. Final Report
```
Clarification Complete

- Sections clarified: [list]
- Total ambiguities resolved: [count]
- Status: SUCCESS (spec refined and ready)

Next: /docs:ux <feature-path>
```

# Examples

## Simple Clarification
**Before:** "FR-001: System MUST be fast"  
**Question:** "What specific response time - under 2s, 500ms, 100ms?"  
**Answer:** "500ms"  
**After:** "FR-001: System MUST respond within 500ms"

## Entity Clarification  
**Before:** "User: represents someone in system"  
**Question:** "What defines a unique user - email, username, or ID?"  
**Answer:** "email"  
**After:** "User: represents account holder, unique by email"

## Role Clarification
**Before:** "Users can manage their content"  
**Question:** "What type of users - admins, editors, or viewers?"  
**Answer:** "editors"  
**After:** "Content editors can manage their published articles"

# Error Conditions

- ERROR: Attempting to add new sections
- ERROR: More than 5 clarifications needed per section  
- ERROR: Breaking template structure
- WARN: Removing content without replacement