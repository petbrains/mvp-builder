# MEMORY.md

Memory management rules for maintaining project README.md as implementation status tracker.

## Purpose

README.md serves as central memory bank providing agents with:
- Current implementation status of features
- Feature completion tracking
- Code module dependency graph
- Project context

## README.md Structure

Follow structure defined in: `.claude/templates/readme-template.md`

**Required sections:**
1. Project Name & Description (one sentence)
2. Implementation Status (Features: Completed, In Progress)
3. Dependency Graph (code module relationships)
4. Architecture Decisions (ADR format with dates)
5. Technical Constraints

**Dependency Graph Extraction:**
- Analyze implemented code structure
- Identify actual module/component dependencies in codebase
- Build graph showing "depends on" and "used by" relationships between code modules
- Note: This is NOT the same as feature dependencies in FEATURES.md - this shows real code dependencies

## Content Rules

### Terminology Distinction
- **Feature**: Business functionality from FEATURES.md (e.g., "User Authentication")
- **Module**: Code implementation unit (e.g., "AuthService", "TokenManager")
- Implementation Status tracks **Features**
- Dependency Graph shows **Module** relationships

### Must Have
- Every section filled with real data
- Concrete file paths, not placeholders
- Actual dependency relationships
- Specific dates on decisions
- Real constraint impact

### Must Not Have
- Introduction paragraphs
- Marketing language
- Future aspirations
- Vague descriptions ("helps with", "improves")
- Duplicate information
- Explanatory prose

### Writing Style
- Bullet points, not paragraphs
- Action verbs (enables, blocks, requires)
- Technical precision
- Maximum 2 sentences per bullet
- Sub-bullets for details only

## Update Procedure

### After Feature Completion

1. **Read current README.md**
2. **Move feature from In Progress → Completed**
3. **Update Dependency Graph** if new code dependencies introduced
4. **Document architecture decision** if made
5. **Write updated README.md**

### After Architecture Change

1. **Read current README.md**
2. **Add Architecture Decision entry**
3. **Update dependency relationships** if affected
4. **Write updated README.md**

### After Adding Module

1. **Read current README.md**
2. **Add to Dependency Graph** with actual code dependencies
3. **Write updated README.md**

### Validation Checklist

Before writing updated README.md:
- [ ] No placeholder text ([TBD], [TODO])
- [ ] All file paths valid and exist
- [ ] Dependency graph has no orphans or circular dependencies
- [ ] Architecture decisions dated
- [ ] No duplicate information
- [ ] Every sentence adds value

## Dependency Graph Format

Text format (simple graphs):
```
Module A
├── depends on: Module B, Module C
└── used by: Module D
```

## Anti-Patterns

**Do Not:**
- Write README.md from scratch (always read first)
- Copy descriptions from PRD verbatim
- Include motivation/inspiration sections
- Add "About this project" prose
- List features as marketing points
- Add contribution guidelines
- Include changelog (use git log)
- Add "Future improvements" section
- Write installation tutorials
- Add screenshots or demos

**Do:**
- Update incrementally after each change
- Keep technical and factual
- Link to detailed docs, not duplicate
- Track actual implementation state
- Document what exists now
- Show real dependencies between code modules
- Provide quick agent context

## Example Updates

### Good Update
```markdown
### Completed
- User Authentication: JWT-based auth with refresh tokens
  - Dependencies: Database, Redis cache
  - Location: `src/auth/`
```

### Bad Update
```markdown
### Completed
- User Authentication: This feature allows users to securely log into 
  the system using their credentials. It provides a robust and scalable
  authentication solution that will help improve security.
```

## When Not to Update

Skip README.md updates for:
- Minor bug fixes (no feature status change)
- Refactoring (no external interface change)
- Documentation updates (unless structure change)
- Code formatting  
- Test additions (unless testing new feature)

README.md only:
- Summarizes current state
- Maps implemented code modules
- Shows dependency relationships between code
- Links to detailed docs

## File Location

- Always: `./ai-docs/README.md`