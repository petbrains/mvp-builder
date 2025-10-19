---
description: Execute the implementation planning workflow.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7
---

# Instructions

Generate comprehensive technical implementation plan by filling plan-template.md based on validated specifications.
Creates supporting artifacts (research, data model, contracts, quickstart) that inform the main plan.

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

For Technology Evaluation:
- When researching compatibility: "Analyze tech stack → Check dependencies → Verify ecosystem support → Document decisions"

For Feature Code Organization: 
- When choosing structure: "Analyze feature complexity → Evaluate platform requirements → Compare structures → Select optimal for this feature"

**Context7 Usage:**
Use `/mcp__context7__resolve-library-id` and `/mcp__context7__get-library-docs`:

For Library Research:
- When verifying library compatibility: Resolve library ID → Fetch docs on integration patterns
- When evaluating alternatives: Get documentation for comparison across options
- When checking version requirements: Fetch specific version docs and breaking changes

For Architecture Decisions:
- When selecting frameworks: Get latest best practices and patterns
- When validating tech stack: Fetch compatibility matrices and known issues

**Template:**
- Plan: @.claude/templates/plan-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/spec.md` and `./ai-docs/features/[feature]/ux.md`
- Output: `./ai-docs/features/[feature]/plan.md` (main plan)
- Supporting outputs:
  - `./ai-docs/features/[feature]/research.md` (research notes)
  - `./ai-docs/features/[feature]/data-model.md` (entities and schemas)
  - `./ai-docs/features/[feature]/quickstart.md` (feature setup and testing)
  - `./ai-docs/features/[feature]/contracts/` (API specification)
- Index: Updates `./ai-docs/FEATURES.md` with architecture info

# Task

Transform validated feature specifications and UX patterns into comprehensive technical implementation plan.
Fill plan-template.md with concrete technical decisions while generating supporting research and design artifacts.
Ensure all requirements mapped to implementation approach without duplication.

# Rules

## Planning Coverage Rules
- All functional requirements from spec.md must have implementation approach
- All UX patterns from ux.md must map to technical components
- All error types from ux.md must have handling strategies
- Edge cases must have explicit implementation paths

## Template Filling Rules
- Fill all sections of plan-template.md
- Select ONE feature code organization structure and remove others including labels
- Expand paths with concrete feature-specific names
- Do NOT include Review Checklist in final output (internal validation only)
- Document all technical decisions in appropriate sections

## Architecture Documentation Rules
- Update Architecture section in FEATURES.md when needed
- Document overall project structure decisions
- Track technology stack evolution

# Execution Flow

## Phase 0: Research

### 0.1 Initialize Planning
**Validate Prerequisites:**
```bash
# Check for required inputs
if [ ! -f "./ai-docs/features/$FEATURE/spec.md" ]; then
  echo "Error: spec.md not found for feature: $FEATURE"
  exit 1
fi
if [ ! -f "./ai-docs/features/$FEATURE/ux.md" ]; then
  echo "Error: ux.md not found for feature: $FEATURE"
  exit 1
fi
```

**Load Sources:**
- Read spec.md → Extract requirements, entities, constraints
- Read ux.md → Extract flows, patterns, error types
- Read FEATURES.md → Check feature dependencies

### 0.2 Execute Research & Document
Apply `/mcp__sequential-thinking__sequentialthinking` for technology evaluation.
Use `/mcp__context7__` tools when needed:
- Library compatibility verification
- Latest framework documentation
- Integration patterns

**Create research.md:**
```markdown
# Research Notes - [Feature Name]

## Technology Decisions
- **Decision**: [what was chosen]
- **Rationale**: [why chosen]
- **Compatibility Notes**: [verified combinations]
- **Alternatives Considered**: [what else evaluated]

## UX Pattern Feasibility
- **Pattern**: [ux pattern] → **Implementation**: [technical approach]

## Risk Analysis
- **Identified Risks**: [technical risks found]
- **Mitigation Strategies**: [how to address]
```

**Status:**
```
✅ Phase 0 Complete: Research documented
→ Next: Phase 1 - Design
```

## Phase 1: Design

### 1.1 Verify Prerequisites
- Confirm research.md exists and is complete
- Validate technology decisions are documented

### 1.2 Generate Data Model
**Extract Entities from spec.md:**
- Entity names, fields, relationships
- Validation rules from requirements
- State transitions if applicable
- UX-driven data requirements from ux.md

**Create data-model.md:**
```markdown
# Data Model - [Feature Name]

## Domain Entities
[Entity definitions with fields and types]

## Relationships
[Entity relationships and cardinality]

## Validation Rules
[Business rules and constraints]

## Persistence Layer
[Storage strategy and schemas]
```

### 1.3 Generate API Contracts
**Map User Actions to Endpoints:**
- For each user action in spec.md → endpoint definition
- For each UX flow in ux.md → API sequence

**Output:** `./ai-docs/features/$FEATURE/contracts/`
- OpenAPI specification for REST features
- GraphQL schema for GraphQL features
- Document all endpoints, request/response schemas, error codes

### 1.4 Create Quickstart Guide
**Generate quickstart.md:**
- Environment setup specific to THIS feature
- Test data/fixtures needed for feature testing
- Local testing commands
- Feature-specific dependencies installation
- Manual testing steps for acceptance scenarios

### 1.5 Update Architecture Section
**Update FEATURES.md Architecture section (create if doesn't exist):**
```markdown
## Architecture
**Project Structure:** [Overall architecture pattern]
**Platform:** [Web/Mobile/Desktop/Extension]
**Tech Stack:** [Core technologies]
```
- Update only when this feature introduces new architectural decisions
- No conditional logic, just append/update as needed

**Status:**
```
✅ Phase 1 Complete: Design artifacts created
→ Next: Phase 2 - Implementation Plan
```

## Phase 2: Implementation Plan

### 2.1 Load Planning Context
- Read plan-template.md
- Read FEATURES.md to check feature dependencies
- Load all Phase 0-1 artifacts for reference

### 2.2 Fill Purpose and Summary
**Generate opening sections:**
- Purpose: Concise statement of what this plan translates and why
- Summary: Core technical approach and key architectural decisions from research.md

### 2.3 Fill Technical Context
**Map Research to Technical Context:**
- Language, Framework, Storage from technology decisions
- API Layer approach from contracts design
- Testing strategy from requirements analysis
- Deployment target from constraints
- Document any technical limitations

### 2.4 Generate Implementation Mapping
**Create mappings without duplicating requirements:**
- Component Architecture: How requirements become code modules
- Error Handling Approach: Map error types from ux.md to handling layer

### 2.5 Select and Configure Feature Code Organization
Apply `/mcp__sequential-thinking__sequentialthinking` for structure selection.
Use `/mcp__context7__` tools for latest architecture patterns if needed.

**Choose appropriate structure for THIS FEATURE:**
- Analyze feature complexity and platform from ux.md
- Consider feature dependencies from FEATURES.md
- Select ONE structure from template options based on feature needs
- Remove all other structures and their labels
- Expand paths with concrete feature names (replace placeholders)
- Document "Selected Structure" with rationale

### 2.6 Complete Remaining Sections
**Fill final template sections:**
- Testing Approach: Map acceptance scenarios to test structure
- Implementation Notes: Critical decisions, trade-offs, or special considerations

### 2.7 Save Implementation Plan
**Write completed plan:**
- Save to `./ai-docs/features/[feature]/plan.md`
- Ensure Review Checklist excluded from output

**Status:**
```
✅ Phase 2 Complete: Plan generated
→ Next: Phase 3 - Validation
```

## Phase 3: Validation & Sign-off

### 3.1 Apply Review Checklist
**Use template's internal checklist for validation:**
- Apply all checks from plan-template.md Review Checklist
- Verify Requirements Coverage section
- Verify Technical Alignment section  
- Verify Structure Clarity section
- Verify Implementation Readiness section

### 3.2 Resolve Any Issues
**If checklist failures found:**
- Address missing coverage
- Adjust technical decisions
- Clarify ambiguous sections
- Ensure all template sections properly filled

### 3.3 Final Sign-off
**Confirm plan ready for development:**
- All checklist items validated
- Plan document complete (without Review Checklist)
- Supporting artifacts in place
- No unresolved clarifications

### 3.4 Generate Final Report
```
🎯 Implementation Planning Complete!

Feature: [feature-name]
Artifacts Generated:
- Implementation Plan: ./ai-docs/features/[feature]/plan.md
- Research Notes: ./ai-docs/features/[feature]/research.md
- Data Model: ./ai-docs/features/[feature]/data-model.md
- API Contracts: ./ai-docs/features/[feature]/contracts/
- Quickstart Guide: ./ai-docs/features/[feature]/quickstart.md

Tech Stack: [summary of chosen technologies]
Feature Code Organization: [selected structure type]

All requirements covered and validated.
Ready for task breakdown and development.
```

# Error Handling

## Input Errors
- **Spec not found**: "Error: No spec.md found at ./ai-docs/features/[feature]/spec.md. Run 'feature' command first."
- **UX not found**: "Error: No ux.md found at ./ai-docs/features/[feature]/ux.md. Run 'ux' command first."
- **Feature folder missing**: "Error: Feature folder not found at ./ai-docs/features/[feature]/. Ensure feature exists."
- **FEATURES.md missing**: "Warning: FEATURES.md not found. Cannot check dependencies or update architecture."

## Research Errors
- **Incompatible technologies**: "Error: Technology conflict detected between [tech1] and [tech2]. Research alternative stack."
- **Missing dependency**: "Error: Required dependency [name] not available for [platform]. Select alternative."
- **UX pattern infeasible**: "Warning: UX pattern [pattern] may not be technically feasible with current stack."

## Generation Errors
- **Template not found**: "Error: Plan template not found at @.claude/templates/plan-template.md"
- **Contract generation failed**: "Error: Failed to generate API contract for [endpoint]. Check specification format."
- **Data model conflict**: "Error: Entity [name] conflicts with existing model. Resolve before proceeding."

## Validation Errors
- **Checklist failure**: "Error: Review Checklist validation failed. See specific failures above."
- **Missing section**: "Error: Template section [section] not filled. Complete all required sections."
- **Structure not selected**: "Error: No feature code organization selected. Choose one structure and remove others."

## Common Warnings
- **Performance concern**: "Warning: Current architecture may not meet performance requirement: [requirement]"
- **Scalability limit**: "Warning: Selected structure has scalability limitations for [scenario]"
- **Tech debt risk**: "Warning: Technology choice [tech] may introduce technical debt. Document mitigation."