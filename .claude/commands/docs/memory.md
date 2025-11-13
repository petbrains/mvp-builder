# MEMORY.md

Memory management rules for maintaining project README.md as implementation status tracker.

## Purpose

README.md serves as central memory bank providing agents with:
- Current implementation status
- Feature completion tracking
- Component dependency graph
- Project context

## README.md Structure

Follow structure defined in: `.claude/templates/readme-template.md`

**Required sections:**
1. Project Name & Description (one sentence)
2. Implementation Status (Completed, In Progress)
3. Component Map (Core, Supporting, External Dependencies)
4. Dependency Graph (component relationships)
5. Architecture Decisions (ADR format with dates)
6. Technical Constraints
7. Documentation Index

**Dependency Graph Extraction:**
- Read `./ai-docs/features/FEATURES.md` for feature dependencies
- Map feature folder names to implemented component names
- Build graph showing "depends on" and "used by" relationships

## Content Rules

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
3. **Update Component Map** if new component added
4. **Update Dependency Graph** (extract from FEATURES.md if needed)
5. **Document architecture decision** if made
6. **Write updated README.md**

### After Architecture Change

1. **Read current README.md**
2. **Add Architecture Decision entry**
3. **Update affected components in Component Map**
4. **Update dependency relationships**
5. **Write updated README.md**

### After Adding Component

1. **Read current README.md**
2. **Add component to Component Map** with purpose and location
3. **Add to Dependency Graph** (extract from FEATURES.md if needed)
4. **Write updated README.md**

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
Component A
├── depends on: Component B, Component C
└── used by: Component D
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
- Show real dependencies
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

### Good Component Entry
```markdown
**AuthService** (`src/auth/service.ts`)
Purpose: Validates credentials, issues JWT tokens
Depends on: UserRepository, TokenManager
Used by: AuthController, AuthMiddleware
```

### Bad Component Entry
```markdown
**Authentication Service**
This service handles all authentication-related operations including
user login, logout, and session management. It's a crucial part of
our security infrastructure.
```

## When Not to Update

Skip README.md updates for:
- Minor bug fixes (no component/status change)
- Refactoring (no external interface change)
- Documentation updates (unless structure change)
- Code formatting
- Test additions (unless new component tested)

README.md only:
- Summarizes current state
- Maps implemented components
- Shows dependency relationships
- Links to detailed docs

## File Location

- Always: `./ai-docs/README.md`