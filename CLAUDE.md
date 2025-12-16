# CLAUDE.md

Code execution rules and MVP development standards.

## Required Context

Load these documents when starting work:
- @ai-docs/PRD.md - product vision, audience, problem
- @ai-docs/FEATURES.md - feature map, dependencies, priorities
- @ai-docs/README.md - current implementation status

## Development Rules

### Focus
- Single value path: one critical journey only
- One screen = one primary action
- Document Non-Goals explicitly in PRD
- Deliverable outcomes over individual commits
- Tasks: broad enough to be meaningful, specific enough to be actionable
- Avoid micro-tasks that clutter plans

### TDD Workflow
- RED → GREEN cycles when tasks.md exists
- Complete tests before implementation
- No stub tests or always-passing mocks

### Traceability IDs

Feature artifacts use consistent ID system:
- **FR-XXX, UX-XXX**: Requirements in spec.md
- **[US1], [US2]**: User stories from acceptance scenarios
- **INIT-/TEST-/IMPL-**: Task prefixes in tasks.md
- **CHK###**: Validation checklist items

Maintain references when implementing: task → requirement → entity

### Specifications First
- No spec → no task
- Generate tasks.md from spec/ux/plan before implementation
- Lock contracts in @ai-docs/features/[name]/contracts/
- Use Given/When/Then for acceptance criteria
- ADR for irreversible architectural decisions

### Code Standards
- Atomic tasks: one task = one artifact
- Product stays runnable after each change
- Feature flags for new functionality
- Reversibility: prefer undoable choices
- Max 300 lines/file, 80 lines/function
- Line length: 100-120 characters
- No "god classes" - split by concern
- Must pass lint/type-check before done

### Naming Conventions
- Files: descriptive names matching content (user-auth.ts not auth.ts)
- Functions: verb-noun pattern (validateUser not validate)
- Variables: clear intent (userEmail not email, isLoading not loading)
- No abbreviations unless standard (URL, API)
- Semantic folder structure matching mental model

### Error Handling
- Comprehensive errors with actionable messages
- Never fail silently
- Never expose secrets/tokens/keys
- Use `.env.example` with placeholders
- Default to least-privilege permissions

### Test Failures
- When test fails: read terminal logs fully
- Analyze actual error, not symptoms
- Apply Sequential Thinking Methodology for root cause analysis
- Fix root cause, never add mocks/stubs to pass
- Document non-trivial fixes with AICODE-FIX

## File Operations

- Check existence before reading - HALT if missing
- Never overwrite without confirmation
- Create parent directories automatically
- Use relative paths from {root}
- UTF-8 encoding

## UI/UX Rules

- Sane defaults, minimal fields
- Cover states: empty, loading, error, success
- Clear copy over decorative effects

## Validation & Errors

**Block and request clarification when:**
- Requirements ambiguous
- Multiple valid approaches exist
- Architecture decisions needed
- Validation fails

**When uncertain:**
- First: Apply Sequential Thinking Methodology to analyze
- If still unclear: Ask user for clarification
- Never assume — continue with confirmed parts while awaiting response

**If operation fails:**
1. HALT immediately
2. Report what succeeded
3. Provide error context
4. Ask how to proceed

## AI Documentation Structure

```
ai-docs/
├── PRD.md                 # Product vision and scope
├── README.md              # Implementation status (code map)
├── FEATURES.md            # Feature index and dependencies
├── references/            # User-provided supplementary materials
└── features/
    └── [feature-name]/
        ├── spec.md        # Requirements (FR-*, UX-*), acceptance scenarios
        ├── ux.md          # Flows, error handling, states
        ├── plan.md        # Technical approach, code organization
        ├── tasks.md       # TDD execution tasks
        ├── data-model.md  # Entities, constants, validation rules
        ├── research.md    # Technical decisions
        ├── setup.md       # Environment configuration
        ├── contracts/     # API specifications
        ├── validation/    # Quality checklists
        └── feedback.md    # Review findings (regenerated each /review)
```

## Session Continuity

Use searchable comment prefixes in code:
- AICODE-NOTE: critical implementation details
- AICODE-TODO: pending tasks to complete
- AICODE-FIX: non-trivial bug solutions (problem → cause → fix)

Before modifying code: grep for AICODE- prefixes
Before debugging: check for similar AICODE-FIX in codebase
After completing work: add AICODE-NOTE for complex logic

## Output Format

- Lead with status/answer
- List created/modified files with full paths
- End with clear next action

## Anti-Rules

- "Just in case" features
- Changes without spec updates  
- Secrets in code/logs
- Long-lived branches
- Big PRs, dump commits
- Hardcoded absolute paths
- Implementing features without following TDD sequence