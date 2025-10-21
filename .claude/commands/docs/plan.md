---
description: Execute the implementation planning workflow.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7__resolve-library-id, mcp__context7__get-library-docs
---

# Instructions

Generate concise technical implementation plan by filling plan-template.md based on validated specifications.
Creates minimal supporting artifacts that complement (not duplicate) existing documentation.

**Tools Usage:**
- `Read`: For loading PRD.md, spec.md, ux.md, and existing planning documents
- `Write`: For saving plan artifacts and research notes
- `Bash`: For directory creation and file verification
- `/mcp__context7__resolve-library-id` and `/mcp__context7__get-library-docs`: For library documentation and compatibility verification
  - See @.claude/tools/context7.md for details
- `/mcp__sequential-thinking__sequentialthinking`: For complex architectural decisions
  - See @.claude/tools/sequential-thinking.md for details

**Context7 Usage:**
Use `/mcp__context7__resolve-library-id` and `/mcp__context7__get-library-docs`:

For Library Research:
- When spec/ux mentions external libraries: "Extract library names → Resolve each to ID → Fetch relevant docs"
- When evaluating tech stack: "Identify candidate libraries → Resolve IDs → Compare documentation coverage"
- When checking compatibility: "List all dependencies → Resolve versions → Verify compatibility matrix"

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:

For Research Phase:
- When analyzing feature complexity: "Extract requirements → Map to technical patterns → Identify risks → Select optimal approach"
- When evaluating library docs: "Compare capabilities → Check feature coverage → Assess integration effort → Make selection"
- When identifying risks: "Analyze dependencies → Find failure points → Calculate impact → Define mitigations"

For Code Organization:
- When feature has 5+ entities or complex state
- When multiple integration points (3+ external services)
- When conflicting requirements need resolution
- Input: "Select code organization for [feature]: Options: [structures] → Constraints: [from spec] → Dependencies: [from FEATURES.md] → Choose ONE"

**Template:**
- Plan: @.claude/templates/plan-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (expects spec.md and ux.md)
- Output: 
  - `./ai-docs/features/[feature]/plan.md` (implementation strategy)
  - `./ai-docs/features/[feature]/research.md` (technical research and decisions)
  - `./ai-docs/features/[feature]/data-model.md` (entities)
  - `./ai-docs/features/[feature]/setup.md` (environment setup and configuration)
  - `./ai-docs/features/[feature]/contracts/` (API contracts)

# Task

Transform validated feature specifications into focused technical implementation plan.
Fill plan-template.md with concrete technical decisions while generating MINIMAL supporting artifacts.

# Rules

## Content Minimalism Rules
- **Maximum file sizes**: 300 lines
- **No code examples** in documentation - only schemas and contracts
- **No alternatives** in research - only chosen solutions with brief rationale
- **No duplication** - if it's in spec.md, ux.md, FEATURES.md, or ANY other generated file, don't repeat
- **Every word must carry meaning** - remove filler, obvious explanations, verbose justifications
- **NO future scope** - remove all "for future use", "optional", unused fields
- **Contracts reference, not redefine**: Use entity type names, not field lists

## Cross-File Duplication Prevention
Each file owns specific information:
- research.md: WHY decisions were made (including any necessary deviations from PRD approach)
- data-model.md: ALL entities, states, validation rules, constants (timeouts, limits, enums)
- contracts/: HOW components communicate (transport schemas ONLY)
- setup.md: HOW TO install and run
- plan.md: HOW TO organize and implement

Never duplicate information owned by another file.
Constants (timeouts, limits, enums) belong in data-model.md ONLY.
When referencing constants in other files, use descriptive text: "uses timeout from data-model.md" not specific values.
When spec.md contains entities, data-model.md extends them with technical details only.
States are defined ONCE in data-model.md, even if ux.md has different state names.

## Planning Coverage Rules
- All functional requirements from spec.md must have implementation approach
- All UX patterns from ux.md must map to technical components
- Reference existing documentation instead of duplicating

## Template Filling Rules
- Fill all sections of plan-template.md concisely
- Select ONE feature code organization structure and remove others
- Do NOT include Review Checklist in final output
- Keep descriptions brief and actionable
- When feature deviates from PRD architecture, document in Technical Context > PRD Deviations
- When referencing entities/states from data-model.md, use inline comments for clarity

**Technical Context filling:**
- Must align with PRD Technical Requirements section where applicable
- If feature requires deviation from PRD stack, briefly note: "[Component]: [Choice] - [One sentence rationale]"
- Rationale must be feature-specific, not technology-specific

## API Specification Rules
- Use OpenAPI 3.1.0+ for REST API specifications
- Follow latest specification standards for all contract types
- Keep contracts focused on interfaces, not implementation

# Execution Flow

## Phase 0: Research (Concise)

### 0.1 Initialize Planning
```bash
# Validate required inputs exist
[ ! -f "./ai-docs/features/$FEATURE/spec.md" ] && echo "Error: spec.md not found" && exit 1
[ ! -f "./ai-docs/features/$FEATURE/ux.md" ] && echo "Error: ux.md not found" && exit 1
```

**Load Sources:**
- Read PRD.md → Extract original technical architecture and constraints
- Read spec.md → Extract requirements, entities (note existing Key Entities section)
- Read ux.md → Extract flows, patterns
- Read FEATURES.md → Check dependencies

### 0.2 Execute Research & Document
**Extract dependencies from spec.md and ux.md:**
- Identify mentioned libraries, frameworks, packages
- Note technology stack references from PRD

**When external dependencies are identified:**
1. Apply `/mcp__context7__resolve-library-id` for each library
2. Apply `/mcp__context7__get-library-docs` for resolved IDs with feature-relevant topics
3. Apply `/mcp__sequential-thinking__sequentialthinking` for research analysis when complexity requires it

**Create concise research.md:**
```markdown
# Research Notes - [Feature Name]

## Key Decisions (3-5 points max)
- **[Decision]**: [What chosen] - [Brief why, 1 sentence]
- **[Decision]**: [What chosen] - [Brief why, 1 sentence]

## Critical Risks
- **[Risk]**: [Impact] → [Mitigation]

## Stack Compatibility
- [Verified combination]: ✔
```

**Research coherence rule:**
- First decision point must address alignment with PRD Technical Requirements
- Format: "**Architecture Alignment**: [Follows PRD | Adapted for feature needs] - [Brief rationale]"
- Rationale focuses on feature requirements, not technology preferences

NO alternatives, NO lengthy explanations, NO rejected approaches.
NO configuration details (those go in setup.md).
NO implementation details (those go in plan.md).
ONLY decisions and their brief rationale.

**Status:**
```
✅ Research complete → Phase 1
```

## Phase 1: Design (Minimal Artifacts)

### 1.1 Generate Data Model
**Create data-model.md with technical specs:**
```markdown
# Data Model - [Feature Name]

## Entities
[For each entity from spec.md add:
- Field types and constraints (required/optional, length limits)
- System fields (unique identifier, timestamps)
- Validation rules (word counts, format patterns)
- Default values and computed fields]

## Relationships
[How entities connect: cardinality, ownership, lifecycle dependencies]

## States
[State transitions: triggers, conditions, timeouts]
```

NO code, NO SQL, NO platform-specific types.
Abstract technical specifications that apply to any implementation.

### 1.2 Generate API Contracts (if needed)
**Create contracts based on feature interfaces:**

Create `./ai-docs/features/$FEATURE/contracts/`:
- Write to `openapi.yaml` - For REST API endpoints
- Write to `contracts.md` - For messaging, events, WebSocket, storage schemas

Feature may require BOTH files if it uses multiple interface types

**Content guidelines:**
- Message/event contracts: type names and message structure only
- Storage contracts: reference to entity type, not field expansion
- API contracts: field names and primitive types only, no constraints
- Configuration structures: actual config data needed at runtime
- When referencing entity types: add comment "// Entity from data-model.md"
- When referencing states: add comment "// State from data-model.md"
- NO validation rules or constraints (those belong in data-model.md)
- NO entity field definitions (those belong in data-model.md)

### 1.3 Create Setup Guide
**Generate setup.md:**
```markdown
# Setup - [Feature Name]

## Install
[Installation commands for dependencies]

## Config
[Key configuration needed for this feature]

## Run
[Commands to start development]

## Test
[Commands to run automated tests for TDD workflow]
```

Brief setup instructions only - TDD test commands, no lengthy configs.
NO architecture explanations (those are in plan.md).
NO justifications for dependencies (those are in research.md).
ONLY commands and minimal configs to run the feature.

**Status:**
```
✅ Design complete → Phase 2
```

## Phase 2: Implementation Plan

### 2.1 Load Planning Context
- Read plan-template.md
- Read FEATURES.md for dependencies
- Load Phase 0-1 artifacts

### 2.2 Fill Template Sections

**Purpose & Summary:**
- 1-2 sentences max each
- Reference research.md for details

**Technical Context:**
- Brief bullets only
- State what is used, not why (why is in research.md)
- Reference specific technology decisions from research.md

**Implementation Mapping:**
- How requirements → components (don't repeat requirements)
- How errors → handling (don't repeat error types)
- Must reference PRD architecture where applicable
- Component names should reflect feature purpose, not technology choice

**Testing Approach section must focus on:**
- Test-first development workflow
- Unit test structure matching code organization
- Integration test scenarios from acceptance criteria
- NO manual test checklists or manual testing steps

### 2.3 Select Feature Code Organization
**When feature is complex (5+ entities, multiple integrations, conflicting requirements):**
Apply `/mcp__sequential-thinking__sequentialthinking` for code organization selection.

- Choose ONE structure from template
- Remove all others and labels
- Document brief rationale

### 2.4 Complete Remaining Sections
- Testing Approach: TDD strategy - test files for each component, coverage targets
- Implementation Notes: Critical decisions only (2-3 points max)

### 2.5 Save Implementation Plan
Write to `./ai-docs/features/[feature]/plan.md`
Exclude Review Checklist from output.

**Status:**
```
✅ Plan complete → Phase 3
```

## Phase 3: Validation & Sign-off

### 3.1 Apply Internal Checklist
Use template's Review Checklist for validation (don't output it).

**Content Isolation Check:**
- [ ] Each file contains only its defined content types
- [ ] No entity definitions outside data-model.md
- [ ] No state definitions outside data-model.md
- [ ] No manual test procedures in any file
- [ ] No future scope markers in any file
- [ ] Technical decisions traceable to either PRD or feature requirements
- [ ] All numeric constants defined once in data-model.md
- [ ] Cross-references use comments indicating source file

### 3.2 Final Report
```
Implementation Planning Complete!

Feature: [feature-name]
Generated:
- plan.md (implementation strategy)
- research.md (key decisions)
- data-model.md (entities)
- setup.md (setup commands)
- contracts/ (if API needed)
```

# Error Handling

## Input Errors
- **Missing spec/ux**: "Error: [file] not found. Run [command] first."
- **FEATURES.md missing**: "Warning: Cannot check dependencies."

## Content Errors
- **Excessive size**: "Error: [file] exceeds maximum size. Reduce to [limit] lines."
- **Duplication detected**: "Warning: Content duplicates [source]. Reference instead."
- **Architecture inconsistency**: "Warning: Technical choice differs from PRD without documented rationale"
- **Constant duplication**: "Error: [value] defined in multiple files. Use data-model.md as single source"

## Validation Errors
- **Missing coverage**: "Error: Requirement [FR-XXX] not addressed."
- **Structure not selected**: "Error: Choose one code organization structure."

# Critical Instructions

**EVERY generated file must be:**
1. **Concise** - Maximum line limits enforced
2. **Unique** - No duplication of existing content
3. **Actionable** - Every line helps development
4. **Meaningful** - No filler, no obvious explanations