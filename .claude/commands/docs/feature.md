---
description: Generate PRD-based user features as separate folders with spec files compatible with specify command. Each feature becomes an individual folder with specification.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking
---

# Features Command - PRD-Based Story Generator with Folder Separation

## Instructions

You are a senior product manager specializing in translating PRDs into actionable user stories formatted as feature specifications.
Each feature is saved as a separate folder with spec.md file, ready to be processed by the specify command.

**Tools Usage:**
- Use @.claude/tools/sequential-thinking.md for analyzing PRD and generating stories
- `Read`: For loading PRD (primary source)
- `Write`: For saving individual spec files
- `Bash`: For directory creation

Each feature will be saved as: `./ai-docs/features/[feature-name]/spec.md`

## Input Modes

**Mode Detection:**
- If user provides feature description directly → User Input Mode (single feature)
- If user provides no description or says "generate features" → PRD Mode (full generation)

## Execution Flow

### Phase 1: Pre-Flight Check

#### Stage 1: Input Source Detection

**1.1 Check for User Input**
If user provides a feature description in their message:
- Extract the feature description as input source
- Set mode to "User Input Mode"
- Skip to Stage 2 with user input as content

**1.2 Load and Validate PRD (if no user input)**
Action: Read ./ai-docs/PRD.md

If PRD not found:
```dialogue
"❌ No PRD.md found at ./ai-docs/PRD.md
Please either:
1. Run the PRD command first to generate a Product Requirements Document, OR
2. Provide a feature description directly for single feature creation"
```
**STOP EXECUTION**

If found, extract and analyze:
- Core Proposition (target user, problem, solution)
- Solution Design (user flow, core feature, supporting features)
- Technical Requirements (tech stack, constraints)
- UX Details (preferences, interface requirements)

#### Stage 2: Create Feature Directory Structure
```bash
mkdir -p ./ai-docs/features
```

**For User Input Mode:**
```dialogue
"✓ Feature description received
✓ Feature directory created

Analyzing description to generate feature specification..."
```

**For PRD Mode:**
```dialogue
"✓ PRD loaded: [product_name]
✓ Target User: [user_type]
✓ Core Feature: [feature_name]
✓ Feature directory created

Analyzing PRD to generate user features..."
```

### Phase 2: Epic Extraction from PRD

**Skip this phase entirely for User Input Mode - proceed directly to Phase 3**

Use @.claude/tools/sequential-thinking.md:
Analyze PRD structure → Extract feature groupings → Map to epic boundaries → Verify coverage

Based on PRD sections, identify epics:
1. Core Features - From "Core MVP Feature" 
2. Supporting Features - From "Supporting Features"
3. User Management - If authentication mentioned
4. Technical Foundation - From "Technical Requirements"

Present extracted structure:
```dialogue
"Extracted Epic Structure from PRD:

Epic 1: Core Features - [Core Feature Name]
Epic 2: User Management & Authentication  
Epic 3: Supporting Features - [Features List]
Epic 4: Technical Foundation

This structure aligns with your PRD. Proceed? (yes/modify)"
```

Only if user says "modify": Ask for specific changes.
Otherwise: Continue with extraction.

### Phase 3: Iterative Feature Creation

**Goal**: Process PRD sections sequentially, creating complete feature folders one at a time.
**For User Input Mode**: Create single feature from user description.

#### Stage 1: Initialize Feature Processing

**1.1 For User Input Mode**
- Set epic to "User-Defined Feature"
- Process user description as single feature content
- Apply same extraction rules as PRD content

**1.2 For PRD Mode - Use Epic Structure from Phase 2**
Process epics in the order extracted and approved in Phase 2

#### Stage 2: Process Each Epic

For each epic in processing order (or single user input):

**2.1 Extract Content for Current Feature**

**For User Input Mode:**
- Treat entire user description as feature specification
- Extract requirements, acceptance criteria, and technical details from description

**For PRD Mode:**
Use @.claude/tools/sequential-thinking.md:
```
Parse PRD section → Identify user actions → Apply boundary rules → Create feature list
```

**2.2 Apply Feature Boundary Decision Rules**

**Rule 1: Single User Action = One Feature**
- If action is atomic (login, register, view profile) → Single feature
- If action has multiple UI screens → Multiple features

**Rule 2: Complexity-Based Splitting**
- Simple CRUD operation → One feature  
- Complex workflow (>3 steps) → Split by logical checkpoints
- Forms with >5 fields → Consider splitting by form sections

**Rule 3: Technical Dependency Splitting**
- If requires new database tables → Separate technical feature
- If requires external API integration → Separate integration feature
- If requires new authentication → Separate auth feature

**2.3 Decision Examples**
```
PRD: "User creates account with email verification"
→ Apply Rules: Email form (simple) + Verification (separate action)  
→ Result: 2 features (Registration Form, Email Verification)

PRD: "Dashboard shows user stats, recent activity, and notifications"  
→ Apply Rules: Single view, multiple data sections
→ Result: 1 feature (User Dashboard)

PRD: "Admin manages users with full CRUD operations"
→ Apply Rules: Complex workflow >3 steps
→ Result: 3 features (View Users, Edit User, Delete User)
```

**2.4 Create Feature Folder and Spec File Immediately**

For each identified feature, create the complete folder and spec using the following process:

**Folder Creation Process:**
- Create feature folder name: `[kebab-case-name]` (semantic name without numbering)
- Create folder: `mkdir -p ./ai-docs/features/[feature-folder-name]`
- Extract feature details from PRD section (or user input)
- Generate complete spec file content using template
- Write spec to: `./ai-docs/features/[feature-folder-name]/spec.md`
- Log creation for FEATURES.md

**2.5 Feature Content Generation Rules**

**Title Generation:**
- Use action verb + object: "Create User Profile", "View Dashboard"
- Match user's mental model from PRD (or user description)

**Acceptance Scenarios Generation:**
```
PRD Flow Step → Primary Scenario (Given/When/Then)
PRD Error Handling → Edge Case Scenarios
PRD Business Rules → Additional Scenarios
```

**Functional Requirements Extraction:**
- Each "must" or "should" in PRD → FR-XXX requirement
- Each validation rule → FR-XXX requirement  
- Each business constraint → FR-XXX requirement

**UX Requirements Extraction:**
- Interface preferences from PRD UX Details → UX-XXX requirement
- User experience constraints → UX-XXX requirement
- Design specifications → UX-XXX requirement

**Key Entities Identification:**
- Nouns mentioned in PRD section → Potential entities
- Data that gets stored/retrieved → Confirmed entities
- Relationships mentioned → Entity relationships

**Dependencies Identification:**
- Prerequisites mentioned in PRD section → Feature folder dependencies
- Technical foundations required → Map to specific feature folders
- Sequential workflow steps → Identify prerequisite features

**2.6 Spec File Template with Dynamic Content**

Write to: `./ai-docs/features/[feature-folder-name]/spec.md`

```markdown
# Feature Specification: [Generated Title]

**Epic**: [Current Epic Name or "User-Defined Feature" for user input mode]
**Created**: [Current Date]
**Status**: Draft
**Priority**: [High for Core, Medium for Supporting, etc.]
**Input**: [Generated from PRD - [Specific PRD Section Name] OR "User Input"]

## User Scenarios & Testing

### Primary User Feature
As a [extracted from PRD/user input], I want [specific functionality from PRD/user input] so that [business value from PRD/user input]

### Acceptance Scenarios
[Generated from PRD/user input flow steps - minimum 2, maximum 5]
1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [error condition], **When** [action], **Then** [error handling]

### Edge Cases  
[Generated from PRD/user input constraints and error conditions]
- What happens when [boundary condition from PRD/user input]?
- How does system handle [error scenario from PRD/user input]?

## Requirements

### Functional Requirements
[Generated from PRD/user input "must" and "should" statements]
- **FR-001**: System MUST [capability from PRD/user input]
- **FR-002**: System MUST [validation from PRD/user input]

### UX Requirements
[Generated from PRD UX Details section/user input - interface preferences, design constraints, user experience specifications]
- **UX-001**: Interface MUST [design requirement from PRD/user input]
- **UX-002**: User experience SHOULD [UX constraint from PRD/user input]

### Key Entities
[Generated from PRD/user input nouns and data references]
- **[Entity Name]**: [Description from PRD/user input, relationships]

## Technical Context
- **Tech Stack**: [Extracted from PRD Technical Requirements or inferred from user input]
- **Dependencies**: [List specific feature folders that must be completed first, e.g., `user-authentication`, `database-setup`]
- **Constraints**: [Extracted from PRD constraints section or user input]
```

**2.7 Feature Validation Checklist**

After each folder and spec creation, validate:
- Folder created successfully
- Spec file contains all required sections
- At least 2 acceptance scenarios present
- All placeholders filled with PRD content (or user input)
- No [NEEDS CLARIFICATION] markers
- File saved successfully to feature folder

#### Stage 3: Epic Completion and Transition

**For User Input Mode:**
```dialogue
"✓ Feature created: [feature name]
📁 Location: ./ai-docs/features/[feature-folder-name]/

Feature specification ready for specify command."
```
**Skip to Phase 5 for validation**

**For PRD Mode:**

**3.1 Epic Completion Summary**

After processing all features in current epic:
```dialogue
"✓ Epic [Name] Complete: [count] features created
📁 Features created in: ./ai-docs/features/

Moving to next epic: [Next Epic Name]..."
```

**3.2 Epic Transition Process**
- Switch to next PRD section
- Continue Stage 2 for new epic

### Phase 4: FEATURES.md Generation

**For User Input Mode:** Create minimal FEATURES.md with single feature entry
**For PRD Mode:** Generate comprehensive index as specified below

**Goal**: Generate comprehensive index of all created features with metadata and implementation guidance.

#### Stage 1: Real-time Index Building

As each feature is created in Phase 3, append to index data structure for efficient final compilation, including dependency relationships between features.

#### Stage 2: Final FEATURES.md File Generation

After all epics processed (or single feature for user input), write FEATURES.md file to `./ai-docs/features/FEATURES.md`:

```markdown
# Feature Index

Generated from: ./ai-docs/PRD.md or User Input
Last updated: [timestamp]
Total Features: [total]

## Feature Summary by Epic

### Epic 1: Core Features ([total] features)

- **[Auto-Generated Title]**
  - Priority: [Auto-Assigned]
  - Folder: `[feature-folder-name]`
  - Dependencies: [List of required feature folders]
  - Source: PRD Section "[section name]" or User Input

[Continue for all features...]

## Implementation Sequence
**Recommended Order:** [Auto-generated based on feature dependencies]
1. [Title] (Foundation)
2. [Title] (Depends on: [feature-folder-name])
[...]
```

### Phase 5: Final Validation and Cleanup

**Goal**: Ensure all generated features are valid, complete, and ready for implementation.

#### Stage 1: Automated Validation Checks

**File Validation:**
- Verify all feature folders and spec files exist and are valid markdown
- For PRD Mode: Validate all PRD sections were processed
- Count total features vs. expected from PRD analysis (or 1 for user input)

#### Stage 2: Completion Summary

```dialogue
"✅ Feature Generation Complete!

📊 Summary:
- Total Features Created: [total]
- Core Features: [total] features  
- User Management: [total] features
- Supporting Features: [total] features  
- Technical Foundation: [total] features

📁 All features ready for specify command
📋 View complete index: ./ai-docs/features/FEATURES.md

Each feature folder contains spec.md ready for further processing."
```

## Error Handling

- **Missing PRD sections**: Mark with [NEEDS CLARIFICATION] in spec files
- **Ambiguous requirements**: Default to simpler interpretation, note in spec
- **Empty PRD fields**: Request user input for critical information
- **File write errors**: Report specific file that failed
- **User input too vague**: Request clarification for minimal requirements (title, basic functionality)