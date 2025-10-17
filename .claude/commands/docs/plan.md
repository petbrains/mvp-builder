## Inputs
- **Required:** `./ai-docs/features/[feature]/spec.md` — validated feature specification.

## Outputs
- `./ai-docs/features/[feature]/plan.md` — technical implementation plan  
- Supporting docs produced by this command:
  - `./ai-docs/features/[feature]/research.md` — research notes (risks, options, decisions)
  - `./ai-docs/features/[feature]/data-model.md` — domain entities, schemas, and persistence layer
  - `./ai-docs/features/[feature]/quickstart.md` — environment setup and CI guide
  - `./ai-docs/features/[feature]/contracts/` — API schemas or external service definitions

## Workflow

1. **Load template**: Use @.claude/templates/plan-template.md as base structure
2. **Fill Technical Context**: Analyze spec.md and populate context section
3. **Evaluate gates**: Check for violations (ERROR if unjustified)
4. **Execute phases**: Run Phase 0-3 sequentially

## Phases

### Phase 0 — Research
**Output**: `research.md`

**Steps**:
1. Extract unknowns from Technical Context:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. Generate and dispatch research agents:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. Consolidate findings in `research.md`:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

### Phase 1 — Design
**Prerequisites**: `research.md` complete  
**Output**: `data-model.md`, `/contracts/*`, `quickstart.md`, updated agent context

**Steps**:
1. Extract entities from feature spec → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. Generate API contracts from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. Create quickstart.md:
   - Local environment setup
   - CI configuration
   - Lint/test hooks

4. Update agent context:
   - Update appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

### Phase 2 — Implementation Plan
- Define testing pyramid and coverage targets.  
- Outline module boundaries and naming conventions.  
- Note build/deploy specifics (artifacts, env matrices).  
- Declare readiness criteria for downstream task generation.

### Phase 3 — Validation & Sign-off
- Cross-check coverage of all requirements from `spec.md`.  
- Verify alignment with constraints and budgets.  
- Ensure no redundant or cyclic dependencies within this plan.  
- Approve plan for downstream task breakdown.

## Key Rules
- Use absolute paths
- ERROR on gate failures or unresolved clarifications