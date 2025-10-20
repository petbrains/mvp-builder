---
description: Execute the implementation planning workflow.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7__resolve-library-id, mcp__context7__get-library-docs
---

# Instructions

Generate concise technical implementation plan by filling plan-template.md based on validated specifications.
Creates minimal supporting artifacts that complement (not duplicate) existing documentation.

**Tools Usage:**
- `Read`: For loading spec.md, ux.md, and existing planning documents
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

Topics to fetch:
- For UI libraries: "components [specific components mentioned in ux]"
- For frameworks: "[feature-specific patterns] routing state-management"
- For databases: "schema migrations [relevant operations]"
- For APIs: "authentication endpoints [specific endpoints needed]"

Token strategy:
- Quick reference (3000-5000): Single library method/component
- Feature implementation (10000-15000): Complete feature docs
- Multiple libraries (5000-8000 each): Distributed across dependencies

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
  - `./ai-docs/features/[feature]/contracts/` (API сontracts)
- Index: Updates `./ai-docs/FEATURES.md` Architecture section

# Task

Transform validated feature specifications into focused technical implementation plan.
Fill plan-template.md with concrete technical decisions while generating MINIMAL supporting artifacts.

# Rules

## Content Minimalism Rules
- **Maximum file sizes**: 300 lines
- **No code examples** in documentation - only schemas and contracts
- **No alternatives** in research - only chosen solutions with brief rationale
- **No duplication** - if it's in spec.md, ux.md, or FEATURES.md, don't repeat
- **Every word must carry meaning** - remove filler, obvious explanations, verbose justifications

## Planning Coverage Rules
- All functional requirements from spec.md must have implementation approach
- All UX patterns from ux.md must map to technical components
- Reference existing documentation instead of duplicating

## Template Filling Rules
- Fill all sections of plan-template.md concisely
- Select ONE feature code organization structure and remove others
- Do NOT include Review Checklist in final output
- Keep descriptions brief and actionable

## Architecture Documentation Rules
- Update Architecture section in FEATURES.md only with high-level decisions
- Keep to 2-3 lines max for tech stack
- Document project-wide decisions, not feature-specific details

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
- Read spec.md → Extract requirements, entities
- Read ux.md → Extract flows, patterns
- Read FEATURES.md → Check dependencies and architecture

### 0.2 Execute Research & Document
**Extract dependencies from spec.md and ux.md:**
- Identify mentioned libraries, frameworks, packages
- Note technology stack references

**If external dependencies found:**
1. Apply `/mcp__context7__resolve-library-id` for each library
2. Apply `/mcp__context7__get-library-docs` for resolved IDs with relevant topics
3. Apply `/mcp__sequential-thinking__sequentialthinking` for research analysis

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

NO alternatives, NO lengthy explanations, NO rejected approaches.

**Status:**
```
✅ Research complete → Phase 1
```

## Phase 1: Design (Minimal Artifacts)

### 1.1 Generate Data Model
**Create data-model.md:**
```markdown
# Data Model - [Feature Name]

## Entities
[Entity definitions with attributes and types]

## Relationships
[How entities relate to each other]

## States
[State diagrams if applicable]
```

NO code examples, NO SQL schemas, NO repository patterns.

### 1.2 Generate API Contracts (if needed)
**Only if feature requires API endpoints:**

Create `./ai-docs/features/$FEATURE/contracts/`:
- `openapi.yaml` - Required for REST API features
- `contracts.md` - Optional for additional contracts (GraphQL, message contracts, etc.)
- Endpoint definitions and schemas only
- NO implementation examples

### 1.2 Generate API Contracts (if needed)
**Create contracts based on feature interfaces:**

Create `./ai-docs/features/$FEATURE/contracts/`:
- Write to `openapi.yaml` - For REST API endpoints
- Write to `contracts.md` - For messaging, events, WebSocket, storage schemas

Feature may require BOTH files if it uses multiple interface types

**Content guidelines:**
- Endpoint/message definitions and schemas only
- NO implementation examples
- Focus on contract, not code

### 1.3 Create SetUp Guide
**Generate setup.md:**
```markdown
# SetUp - [Feature Name]

## Install
[Installation commands for dependencies]

## Config
[Key configuration needed for this feature]

## Run
[Commands to start development]

## Test
[Commands to run tests]
```

Brief setup instructions only - no manual testing, no lengthy configs.

### 1.4 Update Architecture (if needed)
**Update FEATURES.md Architecture section (only if new architectural decisions):**
```markdown
## Architecture
**Platform:** [High-level platform]
**Stack:** [Core technologies only, 1 line]
```

Keep high-level, no feature-specific details.

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
- Reference Architecture in FEATURES.md

**Implementation Mapping:**
- How requirements → components (don't repeat requirements)
- How errors → handling (don't repeat error types)

### 2.3 Select Feature Code Organization
**When feature is complex (5+ entities, multiple integrations, conflicting requirements):**
Apply `/mcp__sequential-thinking__sequentialthinking` for code organization selection.

- Choose ONE structure from template
- Remove all others and labels
- Document brief rationale

### 2.4 Complete Remaining Sections
- Testing Approach: Reference acceptance scenarios
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

## Validation Errors
- **Missing coverage**: "Error: Requirement [FR-XXX] not addressed."
- **Structure not selected**: "Error: Choose one code organization structure."

# Critical Instructions

**EVERY generated file must be:**
1. **Concise** - Maximum line limits enforced
2. **Unique** - No duplication of existing content
3. **Actionable** - Every line helps development
4. **Meaningful** - No filler, no obvious explanations