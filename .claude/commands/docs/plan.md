

## Inputs
- **Required:** `./ai-docs/features/[feature]/spec.md` — validated feature specification.

## Outputs
- `./ai-docs/features/[feature]/plan.md` — technical implementation plan  
- Supporting docs produced by this command:
  - `./ai-docs/features/[feature]/research.md` — research notes (risks, options, decisions)
  - `./ai-docs/features/[feature]/data-model.md` — domain entities, schemas, and persistence layer
  - `./ai-docs/features/[feature]/quickstart.md` — environment setup and CI guide
  - `./ai-docs/features/[feature]/contracts/` — API schemas or external service definitions


## Outline

3. **Execute plan workflow**: Follow the structure in @.claude/templates/plan-template.md template to:
   - Fill Technical Context
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context file

## Phases

### Phase 0 — Research (produces `research.md`)
- Analyze `spec.md` for complexity, dependencies, and constraints.  
- Evaluate technology options and trade-offs.  
- Capture assumptions, risks, open questions.  
- Record decisions with rationale (Decision Log).

(Доработать инструкцию под Sequential and Context7)

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md

### Phase 1 — Design (produces `data-model.md`, `contracts/`, `quickstart.md`)
- Define **data model** (entities, relations, persistence patterns).  
- Specify **API contracts** and external integrations.  
- Establish **performance, security, privacy budgets**.  
- Design **observability & rollout** (flags, migration, monitoring, backout).  
- Write **quickstart.md** (local env, CI, lint/test hooks).

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

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

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications