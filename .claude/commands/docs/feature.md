---
description: Generate feature specifications.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate feature specifications from PRD or user description into structured spec files.

**Tools Usage:**
- `Read`: For loading PRD and existing FEATURES.md
- `Write`: For saving spec files and index
- `Bash`: For directory creation

**Skills:**
- Sequential Thinking Methodology: For analyzing PRD structure, extracting features, validating input, and detecting conflicts
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

**Templates:**
- Spec: @.claude/templates/spec-template.md
- Index: @.claude/templates/features-template.md

**File Structure:**
- Input: `./ai-docs/PRD.md` (PRD mode) or user description (User Input mode)
- Output: `./ai-docs/features/[feature-name]/spec.md`
- Index: `./ai-docs/FEATURES.md`

# Task

Transform PRD sections or user descriptions into feature specifications.
PRD processing happens only once - if FEATURES.md exists, PRD generation is skipped.
User Input Mode requires existing FEATURES.md to add new features.
Each feature follows spec-template.md structure exactly.
All features indexed in FEATURES.md per features-template.md.

# Rules

## Input Detection
- If user provides feature description in message → User Input Mode (requires existing FEATURES.md)
- If no description or user says "generate features" → PRD Mode (requires no existing FEATURES.md)

## Feature Boundary Rules

**Rule 1: Single User Action = One Feature**
- Atomic action (login, register, view) → Single feature
- Multiple UI screens → Multiple features

**Rule 2: Complexity-Based Splitting**
- Simple CRUD → One feature
- Complex workflow (>3 steps) → Split by logical checkpoints
- Forms with >5 fields → Consider splitting by sections

**Rule 3: Technical Dependency Splitting**
- New database tables → Separate technical feature
- External API integration → Separate integration feature
- New authentication → Separate auth feature

## User Input Validation
When adding new feature via user description (FEATURES.md must exist):
- Check if enough data exists to fill template sections:
  - Primary User Story (who, what, why)
  - At least 2 acceptance scenarios
  - Basic functional requirements

If critical data missing, ask clarifications (max 4 questions total):
```
To complete the specification, please provide:
1. [Missing element]
2. [Missing element]
```
Wait for response before proceeding.

## Epic Assignment Rules

**PRD Mode:**
- Extract epics from PRD structure based on functional groupings
- Create epics that reflect logical boundaries in the PRD
- Assign features to epics based on their source section and functionality

**User Input Mode:**
1. Analyze existing epics in FEATURES.md
2. Compare new feature's functionality with features in each epic
3. Assign to epic with highest functional similarity
4. If no clear match (similarity < 30%):
   - Create new epic based on feature's domain
   - Epic name derived from feature's core function

## Content Extraction Rules

**Title**: Action verb + object ("Create Profile", "View Dashboard")

**Acceptance Scenarios**: Flow → Given/When/Then format
- Assign priority (P1/P2/P3) based on user flow criticality:
  - P1: Core flow completion (happy path)
  - P2: Feedback and status visibility
  - P3: Error recovery and edge cases
- **Coverage rule**: Every FR-XXX MUST have at least one Acceptance Scenario that exercises it

**Requirements**:
- Each "must"/"should" → FR-XXX requirement
- Each validation → FR-XXX requirement
- Interface preferences → UX-XXX requirement
- **Testability rule**: Requirements with "maintain", "preserve", "ensure" MUST include verification criteria in parentheses
  - Example: "System MUST maintain [quality] (verified by [criteria])"

**UX Details Distribution:**
- Platform Strategy → Technical Context (if affects feature implementation)
- Interface Requirements → UX-XXX requirements

**Edge Cases**:
- Each edge case MUST reference the FR-XXX it extends
- Format: "When [condition], system MUST [behavior] [FR-XXX]"
- If edge case spans multiple requirements, list all affected FR-XXX

**Entities**: Nouns that get stored/retrieved → Entity with relationships

**Dependencies**: Prerequisites mentioned → Map to feature folders

**Constraints & Requirements Distribution**:
- Each constraint from source → FR-XXX if affects feature behavior
- Technical limitations → Technical Context > Constraints (only if critical)
- Cross-cutting requirements → Add to each affected feature
- When in doubt about scope → Include as requirement rather than omit

**Technical Context Decision:**
- Include only if feature has unique technical requirements
- Check existing specs in same epic for context patterns
- If similar features exist without Technical Context → likely not needed
- When uncertain → ask user: "Does this feature require specific technical constraints?"

# Execution Flow

## 1. Initialize

**1.1 Detect Input Mode**
- Check for feature description in user message
- Set mode: User Input or PRD

**1.2 Validate Source**

For PRD Mode:
- Check if `./ai-docs/FEATURES.md` exists
- If exists: "Features already generated from PRD. Use 'clarify' command to refine or provide specific feature description to add new feature."
- If not exists:
  - Read `./ai-docs/PRD.md`
  - If not found: "No PRD.md found. Run PRD command first."
  - Extract: Core Proposition, Solution Design, Technical Requirements, UX Details

For User Input Mode:
- Read `./ai-docs/FEATURES.md`
- If not found: "No FEATURES.md found. Run feature command without input to generate features from PRD first."
- Load existing epic structure
- Parse user description

## 2. Extract Features

### 2.1 PRD Mode

**Apply Sequential Thinking Methodology** for epic extraction and feature identification:
- Analyze PRD structure → Extract feature groupings
- Map to epic boundaries → Verify coverage

**Extract and Track Coverage:**
When processing PRD sections:
- Track which PRD elements map to which features
- Mark Supporting Features as extracted when converted to specs
- Note any constraints that affect multiple features for distribution

**Create Structure:**
```bash
mkdir -p ./ai-docs/features
mkdir -p ./ai-docs/references
```

**Generate Epic Structure:**
Based on PRD content, create logical epic groupings

### 2.2 User Input Mode

**Apply Sequential Thinking Methodology** for input validation and conflict detection:
- Analyze description completeness → Identify missing elements
- Compare with existing features → Detect overlaps

**Conflict Detection:**
- Compare functionality with existing features
- If overlap > 70% → warn about potential duplicate
- If entities conflict → warn about data model impact
- Let model determine conflict based on semantic similarity

If incomplete, ask clarifications and wait for response.

Determine appropriate epic from existing FEATURES.md for new feature.

## 3. Generate Specifications

### 3.A PRD Mode Process

For each identified feature:

**3.A.1 Create Feature Folder**
```bash
mkdir -p ./ai-docs/features/[kebab-case-feature-name]
```

**3.A.2 Extract Content from PRD**

**Apply Sequential Thinking Methodology** for content parsing and requirement extraction:
- Parse section content → Identify user actions
- Apply boundary rules → Generate feature list

**Map PRD to Template Sections:**
- User descriptions from PRD → Primary User Story
- Flow steps from PRD → Acceptance Scenarios (Given/When/Then) with P1/P2/P3 priority
- "must"/"should" from PRD → FR-XXX requirements (apply testability rule)
- Interface mentions → UX-XXX requirements
- Error handling from PRD → Edge Cases (with FR-XXX references)
- Data objects from PRD → Key Entities
- Critical technical limits → Technical Context > Constraints
- Platform Strategy from UX Details → Technical Context (if affects implementation)

**3.A.3 Fill Template**
- Load spec-template.md
- Fill all sections with extracted content
- Apply template's internal validation checklist (but DO NOT include in output)

**Validation before saving:**
- Ensure Technical Context not duplicated unnecessarily across features
- Verify UX requirements are actual requirements, not descriptions
- Check FR requirements are testable (especially those with "maintain", "preserve", "ensure")
- Confirm Edge Cases have FR-XXX references
- **Verify every FR-XXX has at least one Acceptance Scenario**

**3.A.4 Save Specification**
Write to: `./ai-docs/features/[feature-name]/spec.md`

### 3.B User Input Mode Process

**3.B.1 Create Feature Folder**
```bash
mkdir -p ./ai-docs/features/[kebab-case-feature-name]
```

**3.B.2 Extract Content from User Description**

**Apply Sequential Thinking Methodology** for description analysis and validation:
- Analyze description → Map to template sections
- Identify gaps → Generate clarification questions if needed

**Map User Input to Template:**
- Main description → Primary User Story
- Implied flows → Acceptance Scenarios with P1/P2/P3 priority
- Stated requirements → FR-XXX/UX-XXX (apply testability rule)
- Error conditions → Edge Cases (with FR-XXX references)
- Data mentioned → Key Entities

**3.B.3 Fill Template**
- Load spec-template.md
- Fill sections with available content
- Mark any sections that need clarification

**Context-Aware Validation:**
- Check if Technical Context needed based on feature type
- Verify requirements don't conflict with existing features
- Ensure compatibility with epic's other features
- **Verify every FR-XXX has at least one Acceptance Scenario**

**3.B.4 Save Specification**
Write to: `./ai-docs/features/[feature-name]/spec.md`

## 4. Update Index

### 4.1 Prepare Index

- PRD Mode: Initialize new FEATURES.md structure
- User Input Mode: Read existing FEATURES.md and preserve all content

### 4.2 Build/Update Index Structure

**PRD Mode:**

**Validate PRD Coverage:**
Before generating FEATURES.md:
- List all Core MVP Features from PRD
- List all Supporting Features from PRD  
- List all Technical Constraints from PRD
- Verify each has corresponding spec file or is documented as distributed

If gaps found:
- Report: "Warning: PRD element '[element]' not mapped to any feature spec"
- Continue with generation but note in summary

**Apply Sequential Thinking Methodology** for relationship analysis and index generation:
- Load all features → Analyze relationships
- Detect dependencies → Generate index structure

**User Input Mode:**

Add new feature to selected/created epic while preserving existing structure.

### 4.3 Generate FEATURES.md

- Follow features-template.md structure
- PRD Mode: Create complete new structure
- User Input Mode: Add new feature to appropriate epic, preserve existing
- Apply template's internal validation checklist (for validation only)

### 4.4 Save Index

Write to: `./ai-docs/FEATURES.md`

## 5. Validate and Report

### 5.1 Run Validations

**Context-Aware Validations:**

For PRD Mode:
- Verify all Core MVP Features have corresponding specs
- Verify all Supporting Features mapped to specs
- Check no PRD requirements left unassigned
- Each major section from PRD mapped to at least one spec
- No duplicate requirements across unrelated features

For User Input Mode:
- Verify new feature doesn't duplicate existing features
- Check epic assignment is logical
- Validate all template sections filled
- Confirm no conflicts with existing features

For Both Modes:
- All spec files created successfully
- Template checklists satisfied (validated internally, not included in output)
- All Edge Cases have FR-XXX references
- All requirements with "maintain"/"preserve"/"ensure" have verification criteria
- **Every FR-XXX has at least one Acceptance Scenario**

### 5.2 Generate Summary

**PRD Mode:**
```
Feature Generation Complete

Summary:
- Total Features Created: [count]
- Epics Created: [list]
- Location: ./ai-docs/features/
- Index: ./ai-docs/FEATURES.md

All features extracted from PRD and saved as individual specs.

📁 References directory created: ai-docs/references/

Place supplementary materials for /docs:ux and /docs:plan commands:
- Design systems (.md) — colors, typography, spacing
- Content libraries (.md) — UI texts, error messages
- Data schemas (.json, .yaml) — API structures, data models
- Technical decisions (.md) — architecture notes

Recommendation: Keep files under 20KB for optimal context.
Note: Text files work best. Images/PDFs have limited support in CLI.

Next: /docs:ux <feature-path>
      /docs:clarify <feature-path> (optional: refine spec if ambiguities remain)
```

**User Input Mode:**
```
Feature Added Successfully

- Feature: [feature-name]
- Added to Epic: [epic-name] [or "New Epic Created: [epic-name]"]
- Location: ./ai-docs/features/[feature-name]/spec.md

FEATURES.md updated with new feature.

Next: /docs:ux <feature-path>
      /docs:clarify <feature-path> (optional: refine spec if ambiguities remain)
```

# Error Handling

**PRD Mode Errors:**
- **PRD not found**: "No PRD.md found at ./ai-docs/PRD.md. Run PRD command first."
- **Features already exist**: "Features already generated from PRD. Use 'clarify' command to refine or provide specific feature description to add new feature."
- **Unmapped PRD content**: "Warning: PRD element '[element]' not distributed to any feature"

**User Input Mode Errors:**
- **FEATURES.md missing**: "No FEATURES.md found. Run feature command without input to generate features from PRD first."
- **User input insufficient**: Request specific missing information (max 4 questions)
- **Duplicate feature detected**: "Feature similar to '[existing-feature]' already exists. Continue anyway? (yes/no)"
- **Epic assignment unclear**: "Could not determine appropriate epic. Please specify or confirm new epic creation."

**Common Errors:**
- **Template not found**: Report missing template path and stop execution
- **File write error**: Report specific file path that failed to save
- **Checklist in output**: "Error: Review Checklist must not be included in output files"
- **Missing verification criteria**: "Error: FR-XXX uses 'maintain'/'preserve'/'ensure' without verification criteria"
- **Edge case without reference**: "Error: Edge case '[description]' missing FR-XXX reference"
- **FR without acceptance scenario**: "Error: FR-XXX has no corresponding Acceptance Scenario. Add scenario or clarify requirement scope."