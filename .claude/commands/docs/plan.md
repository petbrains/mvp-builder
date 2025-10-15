

## Inputs
- **Required:** `./ai-docs/features/[feature]/spec.md` — validated feature specification.

## Outputs
- `./ai-docs/features/[feature]/plan.md` — technical implementation plan  
- Supporting docs produced by this command:
  - `./ai-docs/features/[feature]/research.md` — Phase 0 research notes (risks, options, decisions)
  - `./ai-docs/features/[feature]/data-model.md` — domain entities, schemas, and persistence layer
  - `./ai-docs/features/[feature]/quickstart.md` — environment setup and CI guide
  - `./ai-docs/features/[feature]/contracts/` — API schemas or external service definitions


## Phases

### Phase 0 — Research (produces `research.md`)
- Analyze `spec.md` for complexity, dependencies, and constraints.  
- Evaluate technology options and trade-offs.  
- Capture assumptions, risks, open questions.  
- Record decisions with rationale (Decision Log).

### Phase 1 — Design (produces `data-model.md`, `contracts/`, `quickstart.md`)
- Define **data model** (entities, relations, persistence patterns).  
- Specify **API contracts** and external integrations.  
- Establish **performance, security, privacy budgets**.  
- Design **observability & rollout** (flags, migration, monitoring, backout).  
- Write **quickstart.md** (local env, CI, lint/test hooks).

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