---
description: Review feature implementation and generate actionable feedback for tdd-dev fix mode.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7__resolve-library-id, mcp__context7__get-library-docs
---

# Instructions

**Tools Usage:**
- `Read`: For loading feature artifacts, code files, investigation targets
- `Write`: For feedback.md, AICODE-FIX comments, rollback updates
- `Bash`: For running tests, app startup, git diff operations

**Skills:**
- Feature Analyzer: For loading complete feature context from artifacts
- Code Analyzer: For loading codebase structure, dependencies, markers, and git context
- Git Workflow: For branch validation, diff extraction, commit
- Sequential Thinking Methodology: For root cause analysis of failures
  - Tool: `/mcp__sequential-thinking__sequentialthinking`
- Context7 Documentation Retrieval: For library error diagnosis
  - Tools: `/mcp__context7__resolve-library-id`, `/mcp__context7__get-library-docs`
- Self-Commenting: For AICODE-FIX markers in code

**Template:** @.claude/templates/feedback-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (expects completed TDD cycles)
- Output: `feedback.md`, `tasks.md` (rollbacks), `validation/*.md` (rollbacks), source files (AICODE-FIX)

# Task

Review implementation quality after TDD completion. Generate feedback.md for tdd-dev fix mode.

# Rules

## Core Rules

1. **Verify, don't trust** — Run tests yourself, don't assume [x] means passing
2. **Diagnose, don't guess** — Use Sequential Thinking + Context7 for root cause
3. **Report, don't fix** — Generate actionable feedback, don't write implementation
4. **Context is key** — Inline context at rollback points + feedback.md
5. **Commit your work** — Review changes tracked in git

## Finding Severity

| Severity | Criteria | Blocks |
|----------|----------|--------|
| BLOCKER | Tests fail, app crashes, type errors, spec violations | Yes |
| MAJOR | Missing coverage, contract mismatches, security issues | Yes |
| WARN | Code standards, documentation gaps | No |
| INFO | Accepted workarounds, observations | No |

## REV-XXX Numbering

- Sequential within review session: REV-001, REV-002, etc.
- Reset on each review run

## Priority Algorithm

Order findings for tdd-dev fix mode:

1. **App startup blockers** — nothing works without this
2. **Test infrastructure blockers** — can't verify anything
3. **Type/build errors** — won't compile
4. **Test failures** — actual bugs
5. **Spec violations** — compliance issues
6. **Code standards** — quality improvements

Within same level: order by task dependency (earlier tasks first).

## Inline Context Format

**In tasks.md:**
```markdown
- [ ] IMPL-003 [US1] Implement validator
      <!-- REV-001: [description]. See feedback.md REV-001 -->
```

**On top of TDD context:**
```markdown
- [ ] IMPL-004 [US1] Implement upload
      <!-- TDD: BLOCKED - [original context] -->
      <!-- REV-002: Fresh diagnosis - [approach]. See feedback.md REV-002 -->
```

**Accepted workaround:**
```markdown
- [x] IMPL-007 [US2] Implement chunking
      <!-- REV-003 [INFO]: Acceptable for MVP. [rationale] -->
```

**In validation/*.md:**
```markdown
- [ ] CHK012 Is validation async? [Coverage, FR-003]
      <!-- REV-001: Blocked by async issue. See feedback.md REV-001 -->
```

## AICODE-FIX Format

```
// AICODE-FIX: REV-XXX | TASK-XXX | [short description]
// Problem: [what is wrong]
// Cause: [why it is wrong]
// Fix: [how to fix]
```

## Commit Format

```
review([feature]): [PASSED|BLOCKED] - [N] blockers, [N] major, [N] warnings

Findings: REV-001 [summary], REV-002 [summary]
Actions: [N] tasks rolled back, [N] AICODE-FIX added
```

# Execution Flow

## Phase 0: Prepare

### 0.1 Validate Prerequisites

```bash
# Verify TDD completion
grep -c "\[x\] \(TEST\|IMPL\)-" ai-docs/features/[feature]/tasks.md
```

If no completed tasks → HALT: "No implementation found. Run tdd-dev first."

**Apply Git Workflow skill:** Validate on feature branch.

### 0.2 Load Feature Context

**Apply Feature Analyzer skill** to load:

**Required:**
- spec.md → Requirements (FR-XXX, UX-XXX), acceptance scenarios
- plan.md → Code organization, component mapping
- data-model.md → Entities, validation rules
- setup.md → Test and Run commands
- tasks.md → Task status + inline TDD context

**Optional:**
- ux.md → Error states, accessibility
- validation/*.md → CHK status
- contracts/ → API and message schemas

### 0.3 Load Code Context

**Apply Code Analyzer skill** to extract:
- Changed files and their dependencies
- AICODE-* markers (NOTE, TODO, FIX)
- Git branch and modified files

Note constraints that affect review.

### 0.4 Parse TDD Context

Scan tasks.md for accumulated context:

**In tasks.md:**
- `<!-- TDD: ... -->` markers from tdd-dev
- `<!-- TDD: BLOCKED ... -->` blocked tasks

## Phase 1: Verify & Analyze

### 1.1 Run Application

From setup.md Run section:
```bash
[run-command] &
sleep [startup-timeout, default 10s]
```

**Scan logs for errors:**
- "Error:", "Exception:", "FATAL"
- Stack traces
- "Cannot find module"
- Unhandled rejections

Clean startup → continue. Errors → add as findings.

### 1.2 Run Test Suite

From setup.md Test section:
```bash
[test-command] 2>&1 | tee test-output.log
```

Parse: total, passed, failed, skipped. For each failure: test name, file, error message.

### 1.3 Run Static Checks

```bash
[type-check-command] 2>&1  # if applicable
[lint-command] 2>&1
```

Capture errors for findings.

### 1.4 Diagnose Failures

For each failure:

**1.4.1 Read terminal logs fully** — actual error, not symptoms.

**1.4.2 Identify error type:**

| Error Pattern | Tool |
|---------------|------|
| Library/package | Context7 |
| Logic/business | Sequential Thinking |
| Type mismatch | Check data-model.md |
| Contract error | Check contracts/ |

**1.4.3 Apply Sequential Thinking:**
```
THINK → What is the error literally saying?
THINK → What component is involved?
THINK → What was expected per spec?
THINK → What actually happened?
THINK → What is root cause?
```

**1.4.4 Apply Context7 if library-related:**
```
RESOLVE: mcp__context7__resolve-library-id libraryName="[package]"
SELECT: Trust score ≥7
FETCH: mcp__context7__get-library-docs topic="[error-topic]" tokens=8000
```

**1.4.5 Generate diagnosis:**
- Problem: What is wrong
- Cause: Why it is wrong
- Root Cause: Underlying issue (for BLOCKERs)

### 1.5 Analyze TDD Context

**For each `<!-- TDD: ... -->` workaround:**

Check against spec:
- Does it violate FR-XXX or UX-XXX?
- Acceptable for MVP scope?

Result:
- ACCEPT → Add `<!-- REV-XXX [INFO]: Acceptable... -->`
- REJECT → Add as BLOCKER/MAJOR finding

**For each `<!-- TDD: BLOCKED ... -->` task:**

Re-diagnose with fresh perspective:
- Read TDD's original diagnosis
- Apply Sequential Thinking
- Try Context7 if library-related
- Check if issue still exists

Result:
- Solvable → Provide fix steps
- Still blocked → Escalate with more context

### 1.6 Check Compliance

**Traceability:**
- Each FR-XXX → has TEST-XXX → has IMPL-XXX marked [x]
- Each edge case from spec.md → has test

Missing coverage → MAJOR finding.

**Contracts:**
- Implementation matches contracts/ schemas
- Entity fields match data-model.md
- Validation rules implemented per data-model.md

Misalignment → BLOCKER or MAJOR.

**Architecture:**
- File structure matches plan.md
- Component boundaries respected

Violations → MAJOR or WARN.

**Code Standards (per CLAUDE.md):**
- Max 300 lines/file, 80 lines/function
- Naming conventions
- Error handling

Violations → WARN.

## Phase 2: Generate & Commit

### 2.1 Categorize Findings

Aggregate from Phase 1:
- Verification failures (1.1-1.3)
- Diagnosis results (1.4)
- TDD context issues (1.5)
- Compliance violations (1.6)

Assign severity per rules. Assign REV-XXX IDs sequentially.

**If no findings:** Status = PASSED. Generate minimal feedback.md with empty Findings section and proceed to 2.9.

### 2.2 Determine Priority Order

Apply Priority Algorithm from Rules section.

Generate ordered list for For TDD-DEV section.

### 2.3 Generate For TDD-DEV Section

**Priority table:**
```markdown
### Priority
1. **REV-XXX** — [why first]
2. **REV-XXX** — [why second]
```

**Required Context table:**
```markdown
| REV | Files to Read | AICODE-FIX Location |
|-----|---------------|---------------------|
| REV-XXX | [files] | [file:line] |
```

**Verification table:**
```markdown
| REV | Command | Expected |
|-----|---------|----------|
| REV-XXX | `[cmd]` | [result] |
```

### 2.4 Generate Finding Details

**For BLOCKER:**
- Type, Evidence, Diagnosis (Problem, Cause, Root Cause)
- Affected items (inline list)
- Fix Options A/B with pros/cons
- Recommended option with rationale

**For MAJOR:**
- Type, Evidence, Diagnosis (Problem, Cause)
- Affected items
- Fix guidance with code example

**For WARN:**
- One line: Title, location, suggestion

**For INFO:**
- One line: Title, decision/rationale

### 2.5 Insert AICODE-FIX in Code

At each problematic location, insert per AICODE-FIX Format in Rules.

### 2.6 Update tasks.md

**Problematic completed tasks:**
- Rollback: `[x]` → `[ ]`
- Add inline context: `<!-- REV-XXX: ... -->`

**Blocked tasks with fresh diagnosis:**
- Add `<!-- REV-XXX: Fresh diagnosis... -->` below TDD context

**Accepted workarounds:**
- Keep `[x]`
- Add `<!-- REV-XXX [INFO]: Acceptable... -->`

### 2.7 Update validation/*.md

**Affected CHK items:**
- Rollback: `[x]` → `[ ]`
- Add inline context: `<!-- REV-XXX: Blocked by... -->`

### 2.8 Generate Rollback Summary

Record all changes made:
- tasks.md: which tasks rolled back, which REV
- validation/*.md: which CHK rolled back, which REV
- AICODE-FIX: which files, which REV

### 2.9 Write feedback.md

Load template. Fill all sections:
- Findings (BLOCKER, MAJOR, Warnings, Info)
- For TDD-DEV (Priority, Required Context, Verification)
- Rollback Summary

**Overwrite** existing feedback.md.

**Exclude** Review Checklist from output (internal validation only).

### 2.10 Commit All Changes

**Apply Git Workflow skill:**

Stage: feedback.md, tasks.md, validation/*.md, source files with AICODE-FIX.

Commit per format in Rules.

### 2.11 Output Summary

```
Review Complete: [feature]

Status: [BLOCKED | PASSED]
Findings: [N] blockers, [N] major, [N] warnings

Actions:
- feedback.md generated
- [N] tasks rolled back
- [N] AICODE-FIX added

Next: [tdd-dev [feature] | /memory [feature]]
```

# Error Handling

| Error | Action |
|-------|--------|
| Tests won't run | BLOCKER with config diagnosis |
| App won't start | BLOCKER with startup fix guidance |
| Type check fails | Map errors to tasks/requirements |
| File not found | Note limitation, continue |
| Malformed TDD context | WARN, continue |
| Missing required artifact | HALT: "Missing [artifact]. Run [command] first." |

**General:** Attempt to continue. Note limitations in feedback.md. HALT only if can't verify at all.

# Safety

- Never approve with BLOCKERs present
- Never skip verification (tests + app startup)
- Never modify code beyond AICODE-FIX comments
- Always commit review changes
- If uncertain about severity → escalate higher
- If uncertain about fix → provide multiple options