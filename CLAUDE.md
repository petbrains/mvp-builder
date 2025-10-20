# CLAUDE.md

Code execution rules and MVP development standards.

## Required Context

Load these documents when starting work:
- @ai-docs/PRD.md - product vision, audience, problem
- @ai-docs/FEATURES.md - feature map, technologies, dependencies, priorities
- @ai-docs/README.md - current implementation status

## Development Rules

### Focus
- Single value path: one critical journey only
- One screen = one primary action
- Document Non-Goals explicitly in PRD

### Specifications First
- No spec → no task
- Lock contracts in @ai-docs/features/[name]/contracts/
- Use Given/When/Then for acceptance criteria
- ADR for irreversible architectural decisions

### Code Standards
- Atomic tasks: one task = one artifact
- Product stays runnable after each change
- Feature flags for new functionality
- Reversibility: prefer undoable choices
- Max 400 lines/file, 80 lines/function
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
- Fix root cause, never add mocks/stubs
- If unclear: trace execution step-by-step

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

**If operation fails:**
1. HALT immediately
2. Report what succeeded
3. Provide error context
4. Ask how to proceed

## AI Documentation Structure

```
ai-docs/
├── PRD.md                 # Product requirements
├── README.md              # Project overview
├── FEATURES.md            # Development roadmap and technology decisions
├── features/
│   └── [feature-name]/    # Semantic names only
│       ├── spec.md        # Requirements
│       ├── ux.md          # UX schemas
│       ├── plan.md        # Implementation plan
│       ├── research.md    # Technical research and decisions
│       ├── data-model.md  # Domain and persistence design
│       ├── setup.md       # Environment setup and configuration
│       └── contracts/     # Service and API contracts
```

## Session Continuity

Use searchable comment prefixes in code:
- AICODE-NOTE: critical implementation details for next session
- AICODE-TODO: pending tasks to complete

Before modifying code: grep for AICODE- prefixes
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