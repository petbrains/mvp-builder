---
description: Execute the implementation planning workflow.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7
---

# Instructions

Generate concise technical implementation plan by filling plan-template.md based on validated specifications.
Creates minimal supporting artifacts that complement (not duplicate) existing documentation.

**Tools Usage:**
- `Read`: For loading spec.md, ux.md, and existing planning documents
- `Write`: For saving plan artifacts and research notes
- `Bash`: For directory creation and file verification
- `/mcp__sequential-thinking__sequentialthinking`: For complex architectural decisions
  - See @.claude/tools/sequential-thinking.md for details
- `/mcp__context7`: For resolving library names to IDs and fetching up-to-date library documentation
  - See @.claude/tools/context7.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:
- When choosing structure: "Analyze feature complexity → Evaluate platform requirements → Compare structures → Select optimal"

**Context7 Usage:**
Use `/mcp__context7__resolve-library-id` and `/mcp__context7__get-library-docs`:
- When verifying library compatibility: Resolve library ID → Fetch integration docs
- When selecting frameworks: Get latest best practices

**Template:**
- Plan: @.claude/templates/plan-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (expects spec.md and ux.md)
- Output: 
  - `./ai-docs/features/[feature]/plan.md` (main plan)
  - `./ai-docs/features/[feature]/research.md` (key decisions, max 150 lines)
  - `./ai-docs/features/[feature]/data-model.md` (entities only, max 100 lines)
  - `./ai-docs/features/[feature]/quickstart.md` (setup commands, max 50 lines)
  - `./ai-docs/features/[feature]/contracts/` (API specifications)
- Index: Updates `./ai-docs/FEATURES.md` Architecture section

# Task

Transform validated feature specifications into focused technical implementation plan.
Fill plan-template.md with concrete technical decisions while generating MINIMAL supporting artifacts.
Avoid ALL duplication - if information exists in spec/ux/FEATURES.md, reference it, don't repeat it.

# Rules

## Content Minimalism Rules
- **Maximum file sizes**: research.md (150 lines), data-model.md (100 lines), others as needed
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
Apply `/mcp__sequential-thinking__sequentialthinking` for key decisions.
Use `/mcp__context7__` tools when needed for library verification.

**Create concise research.md (max 150 lines):**
```markdown
# Research Notes - [Feature Name]

## Key Decisions (3-5 points max)
- **[Decision]**: [What chosen] - [Brief why, 1 sentence]
- **[Decision]**: [What chosen] - [Brief why, 1 sentence]

## Critical Risks
- **[Risk]**: [Impact] → [Mitigation]

## Stack Compatibility
- [Verified combination]: ✓
```

NO alternatives, NO lengthy explanations, NO rejected approaches.

**Status:**
```
✅ Research complete → Phase 1
```

## Phase 1: Design (Minimal Artifacts)

### 1.1 Generate Data Model
**Create data-model.md (max 100 lines):**
```markdown
# Data Model - [Feature Name]

## Entities
### [Entity Name]
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| id    | UUID | Yes      | Auto       |

## Relationships
[Entity1] → [Entity2]: [relationship type]

## State Diagram (if applicable)
[Mermaid diagram if states exist]
```

NO code examples, NO SQL schemas, NO repository patterns.

### 1.2 Generate API Contracts (if needed)
**Only if feature requires API endpoints:**

Create `./ai-docs/features/$FEATURE/contracts/`:
- `openapi.yaml` - Required for REST API features
- `contracts.md` - Optional for additional contracts (GraphQL, message contracts, etc.)
- Endpoint definitions and schemas only
- NO implementation examples

### 1.3 Create Quickstart Guide
**Generate quickstart.md (max 50 lines):**
```markdown
# Quickstart - [Feature Name]

## Install
`npm install` or specific dependencies if needed

## Config
- manifest.json: [key permissions needed]
- vite.config.ts: [if special config]

## Run
`npm run dev` or feature-specific command

## Test
`npm test [feature]` for TDD cycle
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
Apply `/mcp__sequential-thinking__sequentialthinking` if complex.

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
🎯 Implementation Planning Complete!

Feature: [feature-name]
Generated:
- plan.md (implementation strategy)
- research.md (key decisions)
- data-model.md (entities)
- quickstart.md (setup commands)
- contracts/ (if API needed)

Ready for development.
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

**Remember:**
- research.md: Max 150 lines, decisions only
- data-model.md: Max 100 lines, schemas only
- quickstart.md: Max 50 lines, setup commands only
- NO code examples in any documentation
- NO alternatives or rejected approaches
- If it's in spec/ux/FEATURES.md, reference don't repeat