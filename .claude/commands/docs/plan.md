---
description: Execute the implementation planning workflow.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking
---

# Instructions

Generate comprehensive technical implementation plans from validated feature specifications.
Creates multiple planning artifacts covering research, data models, contracts, and deployment.

**Tools Usage:**
- `Read`: For loading spec.md, ux.md, and existing planning documents
- `Write`: For saving plan artifacts and research notes
- `Bash`: For directory creation and file verification
- `/mcp__sequential-thinking__sequentialthinking`: For complex architectural decisions
  - See @.claude/tools/sequential-thinking.md for details

**Sequential Thinking Usage:**
Use `/mcp__sequential-thinking__sequentialthinking`:

For Architecture Selection:
- When choosing project structure: "Analyze platform requirements → Evaluate architecture patterns → Compare with constraints → Select optimal structure"
- When resolving dependency conflicts: "Map dependency tree → Identify conflicts → Evaluate alternatives → Choose resolution strategy"

For Research Consolidation:
- When evaluating technology compatibility: "Extract tech stack → Check version conflicts → Verify ecosystem support → Document decision rationale"
- When mapping UX to technical: "Parse UX patterns → Identify technical requirements → Map to components → Validate feasibility"

For Coverage Validation:
- When verifying requirement coverage: "List all requirements → Map to implementation → Identify gaps → Confirm completeness"
- When checking error handling: "Extract error types from UX → Map to handling strategies → Verify all paths covered"

**Templates:**
- Plan: @.claude/templates/plan-template.md
- Data Model: (generated from entities)
- Contracts: (OpenAPI/GraphQL schemas)

**File Structure:**
- Input: `./ai-docs/features/[feature]/spec.md` and `./ai-docs/features/[feature]/ux.md`
- Output: `./ai-docs/features/[feature]/plan.md` (main plan)
- Supporting outputs:
  - `./ai-docs/features/[feature]/research.md` (research notes)
  - `./ai-docs/features/[feature]/data-model.md` (entities and schemas)
  - `./ai-docs/features/[feature]/quickstart.md` (environment setup)
  - `./ai-docs/features/[feature]/contracts/` (API definitions)
- Index: Updates `./ai-docs/FEATURES.md` with tech stack info

# Task

Transform validated feature specifications and UX patterns into actionable technical implementation plans.
Produce comprehensive planning artifacts that bridge design to development.
Each plan must be technically sound, cover all requirements, and provide clear implementation guidance.

# Rules

## Gate Evaluation Rules
- **Must evaluate all gates** before proceeding with implementation planning
- **ERROR on violations** unless explicitly justified in spec.md
- **Gates include**: Technical feasibility, Resource constraints, Security requirements

## Planning Coverage Rules
- All functional requirements from spec.md must have implementation approach
- All UX patterns from ux.md must map to technical components
- All error types from ux.md must have handling strategies
- Edge cases must have explicit implementation paths

## Artifact Generation Rules
- Each output file must be self-contained and actionable
- No circular dependencies between planning artifacts
- Tech stack choices must be justified in research.md
- API contracts must align with UX flows

## Structure Selection Rules
- Choose ONE project structure based on platform/architecture analysis
- Remove non-selected structures from final plan.md
- Document selection rationale in Implementation Strategy section
- Structure options: Single Project, Web Application, Mobile + API, Browser Extension

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

### 0.2 Extract Research Needs
**Technology Stack Analysis:**
- For each technology choice → compatibility research task
- For each external dependency → integration patterns task
- For each library combination → compatibility verification

**UX Pattern Feasibility:**
- For each UX pattern → technical feasibility check
- For error types in ux.md → error handling strategy research

### 0.3 Execute Research
Apply `/mcp__sequential-thinking__sequentialthinking` for technology evaluation.

**Generate Research Tasks:**
```
For each technology in Technical Context:
  Task: "Research {tech} compatibility with {existing stack}"
For each library combination:
  Task: "Verify compatibility between {lib1} and {lib2}"
For each UX pattern:
  Task: "Validate technical feasibility of {pattern} with {tech stack}"
```

### 0.4 Consolidate Findings
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

**Status Report:**
```
✅ Phase 0: Research Complete
- Research documented: ./ai-docs/features/[feature]/research.md
- Technology decisions validated
- Proceeding to Phase 1: Design
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
Apply `/mcp__sequential-thinking__sequentialthinking` for API design.

**Map User Actions to Endpoints:**
- For each user action in spec.md → endpoint definition
- For each UX flow in ux.md → API sequence
- Use standard REST/GraphQL patterns

**Create contracts:**
```bash
mkdir -p ./ai-docs/features/$FEATURE/contracts
# Generate OpenAPI/GraphQL schemas in contracts/
```

### 1.4 Create Quickstart Guide
**Generate quickstart.md:**
- Local environment setup commands
- CI configuration templates
- Lint/test hook setup
- UX testing configuration

### 1.5 Update Feature Index
**Update FEATURES.md:**
- Locate feature entry
- Add tech stack summary line
- Format: `  - Tech: [key technologies]`
- Preserve all existing content

**Status Report:**
```
✅ Phase 1: Design Complete
- Data model created: ./ai-docs/features/[feature]/data-model.md
- API contracts generated: ./ai-docs/features/[feature]/contracts/
- Quickstart guide created: ./ai-docs/features/[feature]/quickstart.md
- Feature index updated: ./ai-docs/FEATURES.md
- Proceeding to Phase 2: Implementation Plan
```

## Phase 2: Implementation Plan

### 2.1 Load Planning Template
- Read plan-template.md
- Load all Phase 0-1 artifacts for reference

### 2.2 Fill Technical Context
**Map Research to Plan Sections:**
- Generate Summary from key technical decisions
- Complete Technical Context from research.md
- Fill Implementation Mapping sections
- Map error types from ux.md to Error Handling Approach

### 2.3 Select Project Structure
Apply `/mcp__sequential-thinking__sequentialthinking` for architecture selection.

**Analyze and Choose Structure:**
- Evaluate platform from ux.md
- Consider architecture requirements
- Select from: Single Project, Web Application, Mobile + API, Browser Extension
- Remove non-selected structures from document
- Document selection rationale

### 2.4 Define Implementation Strategy
**Generate Strategy Sections:**
- Testing approach mapping scenarios to test files
- Module boundaries and naming conventions
- Build/deploy specifics (artifacts, env matrices)

### 2.5 Map UX to Technical
**Create Component Mapping:**
- For each UX pattern → implementation approach
- Error types from ux.md → Error Handling Approach section
- Component structure for UI elements
- State management for user flows

**Status Report:**
```
✅ Phase 2: Implementation Plan Complete
- Plan generated: ./ai-docs/features/[feature]/plan.md
- Project structure selected: [structure type]
- All requirements mapped to implementation
- Proceeding to Phase 3: Validation
```

## Phase 3: Validation & Sign-off

### 3.1 Cross-check Coverage
Apply `/mcp__sequential-thinking__sequentialthinking` for coverage validation.

**Verify Complete Coverage:**
- All functional requirements from spec.md addressed ✓
- All UX patterns from ux.md implementable ✓
- Edge cases have implementation approach ✓
- Error handling covers all error types from ux.md ✓

### 3.2 Verify Technical Alignment
**Validate Technical Decisions:**
- Tech stack matches project constraints
- Selected structure fits platform/architecture
- Testing approach covers critical paths
- Performance requirements achievable

### 3.3 Final Validation
**Complete Validation Checklist:**
- No redundant or cyclic dependencies
- Alignment with constraints and budgets confirmed
- All template sections filled
- Plan approved for downstream task breakdown

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
Project Structure: [selected structure type]

All requirements covered and validated.
Ready for task breakdown and development.
```

# Error Handling

## Input Errors
- **Spec not found**: "Error: No spec.md found at ./ai-docs/features/[feature]/spec.md. Run 'feature' command first."
- **UX not found**: "Error: No ux.md found at ./ai-docs/features/[feature]/ux.md. Run 'ux' command first."
- **Feature folder missing**: "Error: Feature folder not found at ./ai-docs/features/[feature]/. Ensure feature exists."

## Gate Violations
- **Technical feasibility**: "ERROR: Technical constraint violated: [specific constraint]. Justification required in spec.md."
- **Resource constraints**: "ERROR: Resource limit exceeded: [specific limit]. Review requirements or provide override."
- **Security requirements**: "ERROR: Security gate failed: [specific requirement]. Cannot proceed without resolution."

## Research Errors
- **Incompatible technologies**: "Error: Technology conflict detected between [tech1] and [tech2]. Research alternative stack."
- **Missing dependency**: "Error: Required dependency [name] not available for [platform]. Select alternative."
- **UX pattern infeasible**: "Warning: UX pattern [pattern] may not be technically feasible with current stack."

## Generation Errors
- **Template not found**: "Error: Plan template not found at @.claude/templates/plan-template.md"
- **Contract generation failed**: "Error: Failed to generate API contract for [endpoint]. Check specification format."
- **Data model conflict**: "Error: Entity [name] conflicts with existing model. Resolve before proceeding."

## Validation Errors
- **Incomplete coverage**: "Error: Requirements [list] not addressed in plan. Update implementation mapping."
- **Missing error handling**: "Error: Error type [type] from ux.md has no handling strategy. Add to Error Handling Approach."
- **Circular dependency**: "Error: Circular dependency detected between [module1] and [module2]. Refactor architecture."

## Common Warnings
- **Performance concern**: "Warning: Current architecture may not meet performance requirement: [requirement]"
- **Scalability limit**: "Warning: Selected structure has scalability limitations for [scenario]"
- **Tech debt risk**: "Warning: Technology choice [tech] may introduce technical debt. Document mitigation."