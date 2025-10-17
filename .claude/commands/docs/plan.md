## Inputs
- **Required:** `./ai-docs/features/[feature]/` — feature folder containing:
  - `spec.md` — validated feature specification
  - `ux.md` — UX patterns and user flows (if exists)

## Outputs
- `./ai-docs/features/[feature]/plan.md` — technical implementation plan (based on plan-template.md)
- Supporting docs produced by this command:
  - `./ai-docs/features/[feature]/research.md` — research notes (compatibility, risks, decisions)
  - `./ai-docs/features/[feature]/data-model.md` — domain entities, schemas, and persistence layer
  - `./ai-docs/features/[feature]/quickstart.md` — environment setup and CI guide
  - `./ai-docs/features/[feature]/contracts/` — API schemas or external service definitions

## Workflow

1. **Parse feature folder**: Read `spec.md` and `ux.md` (if exists) from input folder
2. **Load template**: Use @.claude/templates/plan-template.md as base structure
3. **Fill Technical Context**: Analyze spec.md and ux.md to populate context section
4. **Evaluate gates**: Check for violations (ERROR if unjustified)
5. **Execute phases**: Run Phase 0-3 sequentially

## Phases

### Phase 0 — Research
**Output**: `research.md`

**Steps**:
1. Extract research needs from spec.md and ux.md:
   - For each technology stack choice → compatibility research task
   - For each external dependency → integration patterns task
   - For each library combination → compatibility verification via context7 mcp
   - For each UX pattern → technical feasibility check

2. Generate and dispatch research agents:
   ```
   For each technology in Technical Context:
     Task: "Research {tech} compatibility with {existing stack}"
   For each library combination:
     Task: "Verify compatibility between {lib1} and {lib2} via context7"
   For each UX pattern:
     Task: "Validate technical feasibility of {pattern} with {tech stack}"
   ```

3. Consolidate findings in `research.md`:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Compatibility notes: [verified combinations]
   - Alternatives considered: [what else evaluated]

### Phase 1 — Design
**Prerequisites**: `research.md` complete  
**Output**: `data-model.md`, `/contracts/*`, `quickstart.md`, updated agent context

**Steps**:
1. Extract entities from spec.md → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable
   - UX-driven data requirements from ux.md

2. Generate API contracts from functional requirements:
   - For each user action in spec.md → endpoint
   - For each UX flow in ux.md → API sequence
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. Create quickstart.md:
   - Local environment setup
   - CI configuration
   - Lint/test hooks
   - UX testing setup (if ux.md exists)

4. Update agent context:
   - Update appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

### Phase 2 — Implementation Plan
**Prerequisites**: Phase 1 complete

**Steps**:
1. Select appropriate project structure from template:
   - Analyze spec.md and ux.md to determine platform/architecture
   - Choose from: Single Project, Web Application, Mobile + API, Browser Extension
   - Document selection rationale

2. Define implementation strategy:
   - Testing pyramid and coverage targets
   - Module boundaries and naming conventions
   - Build/deploy specifics (artifacts, env matrices)
   - UX implementation patterns (if ux.md exists)

3. Map UX patterns to technical components:
   - For each UX pattern → implementation approach
   - Component structure for UI elements
   - State management for user flows

### Phase 3 — Validation & Sign-off
**Prerequisites**: All previous phases complete

**Steps**:
1. Cross-check coverage:
   - All functional requirements from `spec.md` addressed
   - All UX patterns from `ux.md` implementable (if exists)
   - Edge cases have implementation approach

2. Verify technical alignment:
   - Tech stack matches project constraints
   - Selected structure fits platform/architecture
   - Testing approach covers critical paths
   - Performance requirements achievable

3. Final validation:
   - Ensure no redundant or cyclic dependencies
   - Confirm alignment with constraints and budgets
   - Approve plan for downstream task breakdown

## Key Rules
- Use absolute paths
- ERROR on gate failures or unresolved clarifications
- Always check for ux.md existence before processing UX-related steps
- Fill all sections of plan-template.md including structure selection rationale