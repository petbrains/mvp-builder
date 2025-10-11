---
description: Generate feature specifications from PRD or user input.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate feature specifications from PRD or user description into structured spec files.

**Tools Usage:**
- `Read`: For loading PRD and existing FEATURES.md
- `Write`: For saving spec files and index
- `Bash`: For directory creation
- `/mcp__sequential-thinking__sequentialthinking`: For analyzing and generating specs
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:
- When extracting epics from PRD: "Analyze PRD structure → Extract feature groupings → Map to epic boundaries → Verify coverage"
- When parsing PRD sections: "Parse section content → Identify user actions → Apply boundary rules → Generate feature list"
- When building FEATURES.md: "Load all features → Analyze relationships → Detect dependencies → Generate index structure"
- When validating user input: "Analyze description completeness → Identify missing template elements → Generate clarification questions"

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
- PRD Mode: Extract epics from PRD structure (only when FEATURES.md doesn't exist)
- User Input Mode: Assign to most relevant existing epic from FEATURES.md
- Never create "User Input" or "Miscellaneous" epic

## Content Extraction Rules

**Title**: Action verb + object ("Create Profile", "View Dashboard")

**Acceptance Scenarios**: PRD flow → Given/When/Then format

**Requirements**:
- Each "must"/"should" → FR-XXX requirement
- Each validation → FR-XXX requirement
- Interface preferences → UX-XXX requirement

**Entities**: Nouns that get stored/retrieved → Entity with relationships

**Dependencies**: Prerequisites mentioned → Map to feature folders

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
  - Extract: Core Proposition, Solution Design, Technical Requirements

For User Input Mode:
- Read `./ai-docs/FEATURES.md`
- If not found: "No FEATURES.md found. Run feature command without input to generate features from PRD first."
- Load existing epic structure
- Parse user description

**1.3 Create Structure**
```bash
mkdir -p ./ai-docs/features
```

## 2. Extract Features

**2.1 PRD Mode**

Apply `/mcp__sequential-thinking__sequentialthinking`:
Analyze PRD structure → Extract feature groupings → Map to epic boundaries

Typical epic structure:
- Core Features (from "Core MVP Feature")
- User Management (if authentication mentioned)
- Supporting Features (from "Supporting Features")
- Technical Foundation (from "Technical Requirements")

**2.2 User Input Mode**

Apply `/mcp__sequential-thinking__sequentialthinking`:
Analyze description → Check template completeness → Generate questions if needed

If incomplete, ask clarifications and wait for response.

Determine appropriate epic from existing FEATURES.md for new feature.

## 3. Generate Specifications

For each identified feature:

**3.1 Create Feature Folder**
```bash
mkdir -p ./ai-docs/features/[kebab-case-feature-name]
```

**3.2 Extract Content**

Apply `/mcp__sequential-thinking__sequentialthinking`:
Parse source content → Extract requirements → Map to template sections

**3.3 Fill Template**
- Load spec-template.md
- Fill all sections with extracted content
- Apply template's internal validation checklist

**3.4 Save Specification**
Write to: `./ai-docs/features/[feature-name]/spec.md`

## 4. Update Index

**4.1 Load Existing Index**
- PRD Mode: Create new FEATURES.md structure
- User Input Mode: Read existing FEATURES.md and preserve all content

**4.2 Build/Update Index Structure**

Apply `/mcp__sequential-thinking__sequentialthinking`:
Load all features → Analyze relationships → Detect dependencies → Generate structure

**4.3 Generate FEATURES.md**
- Follow features-template.md structure
- PRD Mode: Create complete new structure
- User Input Mode: Add new feature to appropriate epic, preserve existing
- Apply template's internal validation checklist

**4.4 Save Index**
Write to: `./ai-docs/FEATURES.md`

## 5. Validate and Report

**5.1 Run Validations**
- All spec files created successfully
- Template checklists satisfied

**5.2 Generate Summary**
```
Feature Generation Complete

Summary:
- Total Features Created: [count]
- Location: ./ai-docs/features/
- Index: ./ai-docs/FEATURES.md

Each feature contains spec.md
```

# Error Handling

- **PRD not found**: "No PRD.md found at ./ai-docs/PRD.md. Run PRD command first."
- **Features already exist**: "Features already generated from PRD. Use 'clarify' command to refine or provide specific feature description to add new feature."
- **FEATURES.md missing for User Input**: "No FEATURES.md found. Run feature command without input to generate features from PRD first."
- **Template not found**: Report missing template path and stop execution
- **File write error**: Report specific file path that failed to save
- **User input insufficient**: Request specific missing information (max 4 questions)