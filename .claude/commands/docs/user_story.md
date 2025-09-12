---
description: Generate PRD-based user stories as separate files compatible with specify command. Each story becomes an individual feature specification.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking
---

# User Story Command - PRD-Based Story Generator with File Separation

## Instructions

You are a senior product manager specializing in translating PRDs into actionable user stories formatted as feature specifications.
Each story is saved as a separate file, ready to be processed by the specify command.

**Tools Usage:**
- Use @.claude/tools/sequential-thinking.md for analyzing PRD and generating stories
- `Read`: For loading PRD (primary source)
- `Write`: For saving individual story files
- `Bash`: For directory creation

Each story will be saved as: `./mvp_docs/stories/[epic-name]/US-[XXX]-[story-name].md`

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

#### Stage 2: Create Story Directory Structure
```bash
mkdir -p ./mvp_docs/stories/core-features
mkdir -p ./mvp_docs/stories/supporting-features
mkdir -p ./mvp_docs/stories/user-management
mkdir -p ./mvp_docs/stories/technical-foundation
```

```dialogue
"✓ PRD loaded: [product_name]
✓ Target User: [user_type]
✓ Core Feature: [feature_name]
✓ Story directories created

Analyzing PRD to generate user stories..."
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

### Phase 3: Iterative Story Creation

**Goal**: Process PRD sections sequentially, creating complete story files one at a time.

#### Stage 1: Initialize Story Processing

**1.1 Use Epic Structure from Phase 2**

Process epics in the order extracted and approved in Phase 2
Use dynamic story ID ranges based on epic count and estimated stories per epic

**1.2 Dynamic Story ID Assignment**

Calculate ID ranges based on estimated stories per epic (default: 20 stories per epic)
Epic 1: US-001 to US-020
Epic 2: US-021 to US-040
Epic 3: US-041 to US-060
Epic 4: US-061 to US-080
Adjust ranges if more stories needed

#### Stage 2: Process Each Epic

For each epic in processing order:

**2.1 Extract PRD Content for Current Epic**

Use @.claude/tools/sequential-thinking.md:
```
Parse PRD section → Identify user actions → Apply boundary rules → Create story list
```

**2.2 Apply Story Boundary Decision Rules**

**Rule 1: Single User Action = One Story**
- If action is atomic (login, register, view profile) → Single story
- If action has multiple UI screens → Multiple stories

**Rule 2: Complexity-Based Splitting**
- Simple CRUD operation → One story  
- Complex workflow (>3 steps) → Split by logical checkpoints
- Forms with >5 fields → Consider splitting by form sections

**Rule 3: Technical Dependency Splitting**
- If requires new database tables → Separate technical story
- If requires external API integration → Separate integration story
- If requires new authentication → Separate auth story

**2.3 Decision Examples**
```
PRD: "User creates account with email verification"
→ Apply Rules: Email form (simple) + Verification (separate action)  
→ Result: 2 stories (US-001: Registration Form, US-002: Email Verification)

PRD: "Dashboard shows user stats, recent activity, and notifications"  
→ Apply Rules: Single view, multiple data sections
→ Result: 1 story (US-003: User Dashboard)

PRD: "Admin manages users with full CRUD operations"
→ Apply Rules: Complex workflow >3 steps
→ Result: 3 stories (US-004: View Users, US-005: Edit User, US-006: Delete User)
```

**2.4 Create Story File Immediately**

For each identified story, create the complete file using the following process:

**File Creation Process:**
- Generate next story ID in current epic range
- Create story filename: `US-[XXX]-[kebab-case-name].md`
- Extract story details from PRD section
- Generate complete file content using template
- Write file to appropriate epic directory
- Log creation for index

**2.5 Story Content Generation Rules**

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

**Key Entities Identification:**
- Nouns mentioned in PRD section → Potential entities
- Data that gets stored/retrieved → Confirmed entities
- Relationships mentioned → Entity relationships

**2.6 File Template with Dynamic Content**

Write to: `./mvp_docs/stories/[epic_dir]/US-[XXX]-[story-name].md`

```markdown
# Feature Specification: [Generated Title]

**Feature Branch**: `US-[Dynamic ID]-[kebab-case-name]`
**Story ID**: US-[Dynamic ID]  
**Epic**: [Current Epic Name]
**Created**: [Current Date]
**Status**: Draft
**Priority**: [High for Core, Medium for Supporting, etc.]
**Story Points**: [1-3 for simple, 5-8 for complex, 9-13 for highly technical]
**Input**: Generated from PRD - [Specific PRD Section Name]

## User Scenarios & Testing

### Primary User Story
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

### Key Entities
[Generated from PRD nouns and data references]
- **[Entity Name]**: [Description from PRD, relationships]

## Technical Context
- **Tech Stack**: [Extracted from PRD Technical Requirements]
- **Dependencies**: [Any previous stories that must be complete]
- **Constraints**: [Extracted from PRD constraints section]
```

**2.7 Story Validation Checklist**

After each file creation, validate:
- File contains all required sections
- At least 2 acceptance scenarios present
- All placeholders filled with PRD content
- No [NEEDS CLARIFICATION] markers
- Story ID is unique and follows numbering scheme
- File saved successfully to correct directory

#### Stage 3: Epic Completion and Transition

**3.1 Epic Completion Summary**

After processing all stories in current epic:
```dialogue
"✓ Epic [Name] Complete: [count] stories created
📁 Files: ./mvp_docs/stories/[epic-dir]/
📊 Story IDs: US-[start] through US-[end]

Moving to next epic: [Next Epic Name]..."
```

**3.2 Epic Transition Process**
- Update story ID counter to next epic range
- Switch to next PRD section
- Continue Stage 2 for new epic

### Phase 4: Story Index Generation

**Goal**: Generate comprehensive index of all created stories with metadata and implementation guidance.

#### Stage 1: Real-time Index Building

As each story is created in Phase 3, append to index data structure for efficient final compilation.

#### Stage 2: Final Index File Generation

After all epics processed, write single index file:

```markdown
# User Stories Index

Generated from: PRD.md  
Last updated: [timestamp]
Total Stories: [count] ([total_points] story points)

## Story Summary by Epic

### Epic 1: Core Features ([count] stories, [points] points)
**Directory:** `./mvp_docs/stories/core-features/`

- **US-001** - [Auto-Generated Title]
  - Priority: [Auto-Assigned] | Points: [Auto-Calculated] 
  - File: `US-001-[filename].md`
  - Source: PRD Section "[section name]"

[Continue for all stories...]

## Implementation Sequence
**Recommended Order:** [Auto-generated based on dependencies]
1. US-[XXX] - [Title] (Foundation)
2. US-[XXX] - [Title] (Depends on #1)
[...]
```

### Phase 5: Final Validation and Cleanup

**Goal**: Ensure all generated stories are valid, complete, and ready for implementation.

#### Stage 1: Automated Validation Checks

**File Validation:**
- Verify all story files exist and are valid markdown
- Check for duplicate story IDs  
- Validate all PRD sections were processed
- Count total stories vs. expected from PRD analysis

#### Stage 2: Competion Summary

**Final Output:**
```dialoguel
"✅ User Story Generation Complete!

📊 Summary:
- Total Stories Created: [count]
- Core Features: [count] stories  
- User Management: [count] stories
- Supporting Features: [count] stories  
- Technical Foundation: [count] stories

📁 All files ready for specify command
📋 View complete index: ./mvp_docs/stories/STORY_INDEX.md

Each story file is self-contained and specify-ready."
```

## Error Handling

- **Missing PRD sections**: Mark with [NEEDS CLARIFICATION] in story files
- **Ambiguous requirements**: Default to simpler interpretation, note in story
- **Empty PRD fields**: Request user input for critical information
- **File write errors**: Report specific file that failed