---
description: Generate PRD-based user features as separate files compatible with specify command. Each feature becomes an individual feature specification.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking
---

# Features Command - PRD-Based Story Generator with File Separation

## Instructions

You are a senior product manager specializing in translating PRDs into actionable user stories formatted as feature specifications.
Each feature is saved as a separate file, ready to be processed by the specify command.

**Tools Usage:**
- Use @.claude/tools/sequential-thinking.md for analyzing PRD and generating stories
- `Read`: For loading PRD (primary source)
- `Write`: For saving individual feature files
- `Bash`: For directory creation

Each feature will be saved as: `./mvp_docs/features/[epic-name]/feature-[feature-name].md`

## Execution Flow

### Phase 1: Pre-Flight Check

#### Stage 1: Load and Validate PRD
Action: Read ./mvp_docs/PRD.md

If PRD not found:
```dialogue
"❌ No PRD.md found at ./mvp_docs/PRD.md
Please run the PRD command first to generate a Product Requirements Document."
```
**STOP EXECUTION**

If found, extract and analyze:
- Core Proposition (target user, problem, solution)
- Solution Design (user flow, core feature, supporting features)
- Technical Requirements (tech stack, constraints)
- UX Details (preferences, interface requirements)

#### Stage 2: Create Feature Directory Structure
```bash
mkdir -p ./mvp_docs/features/core-features
mkdir -p ./mvp_docs/features/supporting-features
mkdir -p ./mvp_docs/features/user-management
mkdir -p ./mvp_docs/features/technical-foundation
```

```dialogue
"✓ PRD loaded: [product_name]
✓ Target User: [user_type]
✓ Core Feature: [feature_name]
✓ Feature directories created

Analyzing PRD to generate user features..."
```

### Phase 2: Epic Extraction from PRD

Use @.claude/tools/sequential-thinking.md:
Analyze PRD structure → Extract feature groupings → Map to epic boundaries → Verify coverage

Based on PRD sections, identify epics and their directory names:
1. Core Features (`core-features/`) - From "Core MVP Feature" 
2. Supporting Features (`supporting-features/`) - From "Supporting Features"
3. User Management (`user-management/`) - If authentication mentioned
4. Technical Foundation (`technical-foundation/`) - From "Technical Requirements"

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

**Goal**: Process PRD sections sequentially, creating complete feature files one at a time.

#### Stage 1: Initialize Feature Processing

**1.1 Use Epic Structure from Phase 2**

Process epics in the order extracted and approved in Phase 2

#### Stage 2: Process Each Epic

For each epic in processing order:

**2.1 Extract PRD Content for Current Epic**

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

**2.4 Create Feature File Immediately**

For each identified feature, create the complete file using the following process:

**File Creation Process:**
- Create feature filename: `feature-[kebab-case-name].md`
- Extract feature details from PRD section
- Generate complete file content using template
- Write file to appropriate epic directory
- Log creation for index

**2.5 Feature Content Generation Rules**

**Title Generation:**
- Use action verb + object: "Create User Profile", "View Dashboard"
- Match user's mental model from PRD

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
- Prerequisites mentioned in PRD section → Feature file dependencies
- Technical foundations required → Map to specific feature files
- Sequential workflow steps → Identify prerequisite features

**2.6 File Template with Dynamic Content**

Write to: `./mvp_docs/features/[epic_dir]/feature-[feature-name].md`

```markdown
# Feature Specification: [Generated Title]

**Feature Branch**: `feature-[kebab-case-name]`
**Epic**: [Current Epic Name]
**Created**: [Current Date]
**Status**: Draft
**Priority**: [High for Core, Medium for Supporting, etc.]
**Input**: Generated from PRD - [Specific PRD Section Name]

## User Scenarios & Testing

### Primary User Feature
As a [extracted from PRD], I want [specific functionality from PRD] so that [business value from PRD]

### Acceptance Scenarios
[Generated from PRD flow steps - minimum 2, maximum 5]
1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [error condition], **When** [action], **Then** [error handling]

### Edge Cases  
[Generated from PRD constraints and error conditions]
- What happens when [boundary condition from PRD]?
- How does system handle [error scenario from PRD]?

## Requirements

### Functional Requirements
[Generated from PRD "must" and "should" statements]
- **FR-001**: System MUST [capability from PRD]
- **FR-002**: System MUST [validation from PRD]

### UX Requirements
[Generated from PRD UX Details section - interface preferences, design constraints, user experience specifications]
- **UX-001**: Interface MUST [design requirement from PRD]
- **UX-002**: User experience SHOULD [UX constraint from PRD]

### Key Entities
[Generated from PRD nouns and data references]
- **[Entity Name]**: [Description from PRD, relationships]

## Technical Context
- **Tech Stack**: [Extracted from PRD Technical Requirements]
- **Dependencies**: [List specific feature files that must be completed first, e.g., `feature-user-authentication.md`, `feature-database-setup.md`]
- **Constraints**: [Extracted from PRD constraints section]
```

**2.7 Feature Validation Checklist**

After each file creation, validate:
- File contains all required sections
- At least 2 acceptance scenarios present
- All placeholders filled with PRD content
- No [NEEDS CLARIFICATION] markers
- File saved successfully to correct directory

#### Stage 3: Epic Completion and Transition

**3.1 Epic Completion Summary**

After processing all features in current epic:
```dialogue
"✓ Epic [Name] Complete: [count] features created
📁 Files: ./mvp_docs/features/[epic-dir]/

Moving to next epic: [Next Epic Name]..."
```

**3.2 Epic Transition Process**
- Switch to next PRD section
- Continue Stage 2 for new epic

### Phase 4: Feature Index Generation

**Goal**: Generate comprehensive index of all created features with metadata and implementation guidance.

#### Stage 1: Real-time Index Building

As each feature is created in Phase 3, append to index data structure for efficient final compilation, including dependency relationships between feature files.

#### Stage 2: Final Index File Generation

After all epics processed, write single index file:

```markdown
# Feature Index

Generated from: PRD.md  
Last updated: [timestamp]
Total Features: [total]

## Feature Summary by Epic

### Epic 1: Core Features ([total] features)
**Directory:** `./mvp_docs/features/core-features/`

- **[Auto-Generated Title]**
  - Priority: [Auto-Assigned]
  - File: `feature-[filename].md`
  - Dependencies: [List of required feature files]
  - Source: PRD Section "[section name]"

[Continue for all features...]

## Implementation Sequence
**Recommended Order:** [Auto-generated based on feature file dependencies]
1. [Title] (Foundation)
2. [Title] (Depends on: `feature-[filename].md`)
[...]
```

### Phase 5: Final Validation and Cleanup

**Goal**: Ensure all generated features are valid, complete, and ready for implementation.

#### Stage 1: Automated Validation Checks

**File Validation:**
- Verify all feature files exist and are valid markdown
- Validate all PRD sections were processed
- Count total features vs. expected from PRD analysis

#### Stage 2: Competion Summary

**Final Output:**
```dialoguel
"✅ Feature Generation Complete!

📊 Summary:
- Total Features Created: [total]
- Core Features: [total] features  
- User Management: [total] features
- Supporting Features: [total] features  
- Technical Foundation: [total] features

📁 All files ready for specify command
📋 View complete index: ./mvp_docs/features/FEATURE_INDEX.md

Each feature file is self-contained and specify-ready."
```

## Error Handling

- **Missing PRD sections**: Mark with [NEEDS CLARIFICATION] in feature files
- **Ambiguous requirements**: Default to simpler interpretation, note in feature
- **Empty PRD fields**: Request user input for critical information
- **File write errors**: Report specific file that failed