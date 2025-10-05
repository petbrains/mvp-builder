# CLAUDE.md

Technical execution settings and rules for MVP building.

## Project Structure

### AI-Generated Documents

All documentation for ai developvent in folder `ai-docs/`:

```
ai-docs/
├── PRD.md                 # Product Requirements
├── README.md              # Project overview and purpose
├── AGENTS.md              # Project structure, naming conventions, and architecture decisions
├── FEATURES.md            # Features development map (epics, priorities)
├── features/
│   └── [feature-name]/    # Semantic names, no numbering
│       ├── spec.md        # Feature specification
│       ├── ux.md          # Ux schema
│       ├── plan.md        # Implementation plan
│       ├── tasks.md       # Task breakdown
│       └── contracts/     # API contracts (conditional)
```

**Reference when implementing:**
- `@ai-docs/PRD.md` → `@ai-docs/features/FEATURES.md` → `@ai-docs/features/[name]/spec.md`

## Code Writing Rules

### File & Function Size
- **Maximum 300-500 lines per file**
- **Maximum 80 lines per function**
- Split larger implementations into logical modules
- Exception: Generated files, configs, data files

### Code Quality Standards
- Line length: 100-120 characters max
- No monolithic "god classes" - split by concern
- All code must lint/type-check before marking done
- Small, testable increments - save after logical units
- Test components before integration
- Document non-obvious "why" decisions inline
- Cite sources: `[Source: path/to/file.md#section]`

### Error Handling & Security
- Comprehensive error handling with actionable messages
- Never fail silently
- **Never expose secrets/tokens/keys in output**
- Use `.env.example` with placeholders, never real values
- Default to least-privilege permissions

### Performance Constraints
- Avoid O(n²)+ complexity unless justified
- Files >100MB: use streaming, never load into memory
- Guard concurrency - document thread/async assumptions

## File Operations

### Reading
- Verify existence before reading - HALT if missing
- Use `@path/to/file.md` notation
- Skip re-reading files already in context (document this)

### Writing
- Never overwrite without confirmation (unless command specifies)
- Create parent directories automatically
- UTF-8 encoding, atomic writes

### Paths
- Use relative paths from `{root}`
- Never hardcode absolute paths

## Validation & Error Recovery

**Block and request clarification when:**
- Requirements ambiguous or files/config missing
- Multiple valid approaches exist or architecture affected
- File size would exceed limits or validation fails

**Before creating files:** Validate inputs, check naming, verify paths

**After operations:** Verify success, list all created/modified files

**If operation fails:**
```
1. HALT immediately
2. Report what succeeded before failure
3. Provide error context and remediation steps
4. Ask how to proceed
```

## Integration with Project Workflow

**Reference Chain:**
```
CLAUDE.md → README.md → AGENTS.md → ai-docs/PRD.md → ai-docs/features/ → feature specs
  (how)      (what)      (structure)    (product)        (index)           (implementation)
```

## Session Continuity

**Between sessions:** Store decisions/context in code comments, preserve implementation notes

**Session resume:** Review previous notes, verify state, confirm plan, load context

## Output Formatting

- Lead with status/answer
- Show reasoning for complex decisions
- List artifacts with full paths: `@path/to/file`
- End with clear next action

---