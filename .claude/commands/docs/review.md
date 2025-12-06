---
description: Review feature implementation and generate actionable feedback.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7__resolve-library-id, mcp__context7__get-library-docs
---

# Instructions

Review feature implementation quality after TDD completion. Verify tests, app startup, and spec compliance. Generate actionable feedback for tdd-dev fix mode.

**Tools Usage:**
- `Read`: For loading feature artifacts, code files, investigation targets
- `Write`: For feedback.md, AICODE-FIX comments, rollback updates
- `Bash`: For running tests, app startup, git diff operations

**Skills:**
- Feature Analyzer: For loading complete feature context from artifacts
- Git Workflow: For branch validation, diff extraction, commit
- Sequential Thinking Methodology: For root cause analysis of failures
  - Tool: `/mcp__sequential-thinking__sequentialthinking`
- Context7 Documentation Retrieval: For library error diagnosis
  - Tools: `/mcp__context7__resolve-library-id`, `/mcp__context7__get-library-docs`
- Self-Commenting: For AICODE-FIX markers in code

**Template:** @.claude/templates/feedback-template.md

**File Structure:**
- Input: `./ai-docs/features/[feature]/` (expects completed TDD cycles)
- Output:
  - `./ai-docs/features/[feature]/feedback.md` (actionable report)
  - `./ai-docs/features/[feature]/tasks.md` (updated: rollbacks + inline context)
  - `./ai-docs/features/[feature]/validation/*.md` (updated: rollbacks + inline context)
  - Source files (AICODE-FIX comments inserted)

# Task

Verify implementation quality and generate feedback for tdd-dev fix mode.
Review does NOT fix code — it diagnoses, documents, and provides fix guidance.
All review changes are committed as audit trail.

# Rules

## Core Principles
- **Verify, don't trust** — Run tests yourself, don't assume [x] means passing
- **Diagnose, don't guess** — Use Sequential Thinking + Context7 for root cause
- **Report, don't fix** — Generate actionable feedback for tdd-dev
- **Context is key** — Inline context at rollback points + feedback.md
- **Commit your work** — Review changes are tracked in git

## What Review Does
- Run application from setup.md, check startup logs for errors
- Run tests from setup.md, capture and parse results
- Investigate files beyond diff (imports, base classes, configs)
- Use Context7 for library error diagnosis
- Use Sequential Thinking for root cause analysis
- Assess TDD workarounds against spec requirements
- Re-diagnose blocked tasks with fresh perspective
- Insert AICODE-FIX comments in problematic code
- Rollback task/checklist statuses with inline context
- Generate feedback.md with full actionable details
- Commit all changes

## What Review Does NOT Do
- Write implementation code (only AICODE-FIX comments)
- Make fix decisions for human
- Approve when blockers exist
- Skip verification steps

## Finding Severity

| Severity | Criteria | Blocks Approval |
|----------|----------|-----------------|
| BLOCKER | Tests fail, app crashes, type errors, spec violations | Yes |
| MAJOR | Missing coverage, contract mismatches, security issues | Yes |
| WARN | Code standards, documentation gaps, optimization opportunities | No |
| INFO | Suggestions, accepted workarounds, observations | No |

## REV-XXX Numbering
- Sequential within single review session: REV-001, REV-002, etc.
- Reset on each review run (numbering starts fresh)

## Feedback File Management
- feedback.md is **always overwritten** on each review run
- Previous feedback is not preserved — each review is a fresh assessment
- This prevents confusion between old and new findings
- If historical tracking needed, git history contains previous versions

## Inline Context Format

**New finding in tasks.md:**
```markdown
- [ ] IMPL-003 [US1] Implement validator
      <!-- REV-001: [Brief description]
           [Details and guidance]
           See feedback.md § REV-001 -->
```

**On top of existing TDD context:**
```markdown
- [ ] IMPL-004 [US1] Implement upload
      <!-- TDD: BLOCKED - [original tdd-dev context] -->
      <!-- REV-002: Fresh diagnosis - [solution approach]
           See feedback.md § REV-002 -->
```

**Accepted workaround:**
```markdown
- [x] IMPL-007 [US2] Implement chunking
      <!-- TDD: Workaround for memory issue... -->
      <!-- REV-003 [INFO]: Acceptable for MVP. [rationale] -->
```

**In validation/*.md:**
```markdown
- [ ] CHK012 Is validation async? [Coverage, FR-003]
      <!-- REV-001: Blocked by async implementation issue. See feedback.md § REV-001 -->
```

## AICODE-FIX Format
```
// AICODE-FIX: REV-XXX | TASK-XXX | [short description]
// Problem: [what is wrong]
// Cause: [why it is wrong]
// Fix: [how to fix it]
// Context: feedback.md § REV-XXX, [other references]
```

## Commit Message Format
```
review([feature]): [PASSED|BLOCKED] - [N] blockers, [N] major, [N] warnings

Findings:
- REV-XXX: [summary]
- REV-XXX: [summary]

Actions:
- Rolled back: [N] tasks, [N] CHK items
- AICODE-FIX: [N] locations
- Generated: feedback.md

Status: [BLOCKED requires tdd-dev fix | PASSED ready for /memory]
```

# Execution Flow

## Phase 0: Prepare Context

### 0.1 Validate Prerequisites

Check TDD completion:
```bash
# Verify TEST/IMPL tasks exist and some are marked complete
grep -c "\[x\] \(TEST\|IMPL\)-" ai-docs/features/[feature]/tasks.md
```

If no completed tasks → "No implementation found. Run tdd-dev first."

**Check for previous review:**
```bash
# If feedback.md exists, get its commit for metadata
if [ -f "ai-docs/features/[feature]/feedback.md" ]; then
  PREV_REVIEW_COMMIT=$(git log -1 --format="%H" -- "ai-docs/features/[feature]/feedback.md")
else
  PREV_REVIEW_COMMIT="First review"
fi
```

**Apply Git Workflow skill:**
- Validate on feature branch
- Get setup commit hash for diff range:
```bash
SETUP_COMMIT=$(git log --oneline --grep="scaffold infrastructure" -1 --format="%H")
```

### 0.2 Load Feature Context

**Apply Feature Analyzer skill** to scan and load:

**Required artifacts:**
- spec.md → Requirements (FR-XXX, UX-XXX), acceptance scenarios
- ux.md → Error states, accessibility standards
- plan.md → Code organization, component mapping
- data-model.md → Entities, validation rules, constants
- setup.md → Test and Run commands
- tasks.md → Task status + inline TDD context

**Optional artifacts:**
- validation/*.md → CHK status + context
- contracts/openapi.yaml → API contracts
- contracts/contracts.md → Message schemas
- research.md → Technical decisions

### 0.3 Extract Implementation Diff

```bash
git diff $SETUP_COMMIT..HEAD --name-status
```

Parse output:
- Added files (A)
- Modified files (M)
- Deleted files (D)

Store diff scope for investigation.

### 0.4 Build Investigation TODO

For each changed file in diff, scan for external references:

**Identify references NOT in diff:**
- Imports from src/ (exclude node_modules)
- Extended classes / implemented interfaces
- Called functions from other project files
- Referenced configurations / constants

**Generate investigation list:**
```
Investigation TODO:
- [ ] src/validators/base.ts (extended by input.ts)
- [ ] src/types/validation.ts (imported types)
- [ ] src/config/limits.ts (referenced constants)
```

### 0.5 Execute Investigation

For each TODO item:
- Read the file
- Extract relevant context:
  - Base class contracts / required methods
  - Interface requirements
  - Shared utility behavior
  - Configuration values / constants
- Note constraints that affect review

### 0.6 Parse Existing Context

Scan for accumulated context from previous work:

**In tasks.md:**
- `<!-- TDD: ... -->` markers from tdd-dev
- `<!-- REV: ... -->` markers from previous reviews

**In code files:**
- `AICODE-NOTE`: Implementation context
- `AICODE-TODO`: Pending work
- `AICODE-FIX`: Previous fixes (check if resolved)

Build context map for analysis.

### 0.7 Assess Architectural Impact

Based on investigation:
- New patterns introduced vs plan.md?
- Existing patterns affected?
- Cross-cutting concerns modified?

**Levels:**
- None: Bug fixes, minor changes
- Minor: New components within existing patterns
- Moderate: New patterns, affects multiple components
- Significant: Architecture changes, new integrations

Flag significant changes for detailed review.

## Phase 1: Active Verification

### 1.1 Run Application

From setup.md § Run section:
```bash
[run-command] &
PID=$!
sleep [startup-timeout, default 10s]
```

**Capture and scan logs for error patterns:**
- "Error:", "Exception:", "FATAL"
- Stack traces
- "Cannot find module", "Module not found"
- "Connection refused", "ECONNREFUSED"
- Unhandled promise rejections
- Segmentation faults

**Clean startup:** No errors in logs → Continue
**Errors found:** Add each as finding, diagnose

```bash
kill $PID 2>/dev/null
```

### 1.2 Run Test Suite

From setup.md § Test section:
```bash
[test-command] 2>&1 | tee test-output.log
```

**Parse results:**
- Total tests, passed, failed, skipped
- For each failure: test name, file, line, error message
- Capture full terminal output for diagnosis

### 1.3 Run Static Checks

**Type check (if applicable):**
```bash
[type-check-command] 2>&1
```

**Lint check:**
```bash
[lint-command] 2>&1
```

Capture any errors for findings.

### 1.4 Diagnose Failures

For each failure detected:

**1.4.1 Read terminal logs fully**
- Don't skim — read complete error output
- Note the actual error, not symptoms

**1.4.2 Identify error type:**

| Error Pattern | Diagnosis Tool |
|---------------|----------------|
| Library/package error | Context7 |
| Logic/business error | Sequential Thinking |
| Config/setup error | Check setup.md alignment |
| Type error | Check data-model.md |
| Contract error | Check contracts/ |

**1.4.3 Apply Sequential Thinking Methodology:**

```
THINK → What is the error message saying literally?
THINK → What component/function is involved?
THINK → What was the expected behavior per spec?
THINK → What actually happened?
THINK → What is the root cause (not symptom)?
THINK → What are possible fixes?
```

**1.4.4 Apply Context7 if library-related:**

```
RESOLVE: /mcp__context7__resolve-library-id libraryName="[package]"
SELECT: Trust score ≥7, highest snippet count
FETCH: /mcp__context7__get-library-docs context7CompatibleLibraryID="[id]" topic="[error-related-topic]" tokens=8000
```

**1.4.5 Generate diagnosis:**
- Problem: What is wrong
- Cause: Why it is wrong
- Root Cause: Underlying issue
- Fix Options: At least 2 for BLOCKERs

## Phase 2: Analyze Accumulated Context

### 2.1 Analyze TDD Workarounds

For each `<!-- TDD: ... -->` marker indicating workaround:

**Check against spec:**
- Does workaround violate any FR-XXX?
- Does it violate any UX-XXX?
- Is it acceptable for MVP scope?

**Generate assessment:**
- ACCEPT: Workaround is acceptable, add `<!-- REV-XXX [INFO]: Acceptable... -->`
- REJECT: Workaround violates spec, add to findings as BLOCKER/MAJOR

### 2.2 Analyze Blocked Tasks

For each task marked blocked with `<!-- TDD: BLOCKED ... -->`:

**Re-diagnose with fresh perspective:**
- Read TDD's original diagnosis
- Apply Sequential Thinking for new analysis
- Try Context7 if library-related
- Check if issue still exists or was incidentally fixed

**Generate solution guidance:**
- If solvable: Provide concrete fix steps
- If still blocked: Escalate with more context

### 2.3 Analyze Previous AICODE-FIX

If previous review markers exist in code:
- Was the fix applied correctly?
- Did fix introduce new issues?
- Can marker be removed or needs update?

### 2.4 Cross-Reference Validation

Check TDD workarounds and implementations against:
- spec.md requirements (FR-XXX, UX-XXX)
- data-model.md constraints and constants
- contracts/ definitions
- plan.md architecture decisions

Note any misalignments as findings.

## Phase 3: Spec Compliance Review

### 3.1 Traceability Check

Verify complete chains:
- Each FR-XXX → has TEST-XXX → has IMPL-XXX marked [x]
- Each edge case from spec.md → has test
- Each state transition from data-model.md → has test
- Each accessibility standard from ux.md → has test (if applicable)

**Missing coverage:** Add as MAJOR finding

### 3.2 Contract Alignment

**API contracts:**
- Implementation matches contracts/openapi.yaml endpoints
- Request/response schemas match
- Error codes align with ux.md error types

**Message contracts:**
- Message schemas match contracts/contracts.md
- Event structures correct

**Entity contracts:**
- Entity fields match data-model.md definitions
- Validation rules implemented per data-model.md

**Misalignment:** Add as BLOCKER or MAJOR

### 3.3 Architecture Check

Compare implementation against plan.md:
- File structure matches Code Organization
- Component boundaries respected
- No unexpected cross-dependencies
- Patterns align with Technical Context

**Violations:** Add as MAJOR or WARN

### 3.4 Code Standards Check

Per CLAUDE.md rules:
- Max 300 lines per file
- Max 80 lines per function
- Proper naming conventions
- Error handling patterns
- AICODE-* markers where needed for complex logic

**Violations:** Add as WARN

## Phase 4: Generate Feedback

### 4.1 Categorize All Findings

Aggregate findings from:
- Phase 1: Verification failures
- Phase 2: Context analysis issues
- Phase 3: Compliance violations

Assign severity per rules: BLOCKER, MAJOR, WARN, INFO

Assign REV-XXX IDs sequentially.

### 4.2 For Each Finding

**4.2.1 Generate diagnosis structure:**
- Problem: What is wrong
- Cause: Why it is wrong
- Root Cause: Underlying issue (for BLOCKERs)
- Context Used: Sequential Thinking / Context7 / TDD context

**4.2.2 Map to affected items:**
- Tasks: TEST-XXX, IMPL-XXX that need rollback
- Checklists: CHK-XXX that are blocked
- Requirements: FR-XXX, UX-XXX violated
- Code: File:line for AICODE-FIX

**4.2.3 Generate fix options (for BLOCKERs and MAJORs):**
- At least 2 options with code examples
- Pros/cons for each option
- Recommended option with rationale

**4.2.4 Specify verification:**
- Commands to run after fix
- Expected results

### 4.3 Insert AICODE-FIX in Code

**Apply Self-Commenting skill:**

At each problematic code location, insert:
```
// AICODE-FIX: REV-XXX | IMPL-XXX | [short description]
// Problem: [what is wrong]
// Cause: [why it is wrong]
// Fix: [how to fix]
// Context: feedback.md § REV-XXX
```

### 4.4 Update tasks.md

**For problematic completed tasks:**
- Rollback: `[x]` → `[ ]`
- Add inline context below task line

**For blocked tasks with fresh diagnosis:**
- Add `<!-- REV-XXX: Fresh diagnosis... -->` below existing TDD context

**For accepted workarounds:**
- Keep `[x]`
- Add `<!-- REV-XXX [INFO]: Acceptable for MVP... -->`

### 4.5 Update validation/*.md

**For affected CHK items:**
- Rollback: `[x]` → `[ ]`
- Add inline context: `<!-- REV-XXX: Blocked by... -->`

### 4.6 Write feedback.md

Load @.claude/templates/feedback-template.md

**Overwrite** existing feedback.md (if present) with fresh review results.

Fill all sections per template structure.

**Exclude Review Checklist from output** (internal validation only).

## Phase 5: Commit & Report

### 5.1 Commit All Changes

**Apply Git Workflow skill:**

Stage all modified files:
- feedback.md
- tasks.md
- validation/*.md
- Source files with AICODE-FIX

Commit with message per format in Rules section.

### 5.2 Output Summary

```
═══════════════════════════════════════════════════════════════
Review Complete: [feature-name]
═══════════════════════════════════════════════════════════════

Status: [🟢 PASSED | 🔴 BLOCKED | 🟡 PARTIAL]

Summary:
  App Startup: [✓ Clean | ✗ Errors]
  Tests: [passed]/[total] passing
  Findings: [N] blockers, [N] major, [N] warnings, [N] info

Investigation:
  Diff Scope: [N] files changed
  Additional Files: [N] investigated
  Architectural Impact: [None | Minor | Moderate | Significant]

TDD Context Analyzed:
  Workarounds: [N] accepted, [N] rejected
  Blocked Tasks: [N] re-diagnosed

Actions Taken:
  - feedback.md created
  - tasks.md: [N] tasks rolled back
  - validation/*.md: [N] CHK items rolled back
  - Source files: [N] AICODE-FIX comments added

Committed: [commit-hash]

Next Steps:
  [If BLOCKED] → Run tdd-dev to fix, then /review again
  [If PASSED]  → Run /memory to update code map
═══════════════════════════════════════════════════════════════
```

# Error Handling

## Verification Errors

- **Tests won't run**: Check setup.md § Test section, report as BLOCKER with config diagnosis
- **App won't start**: Capture logs, diagnose as BLOCKER, provide startup fix guidance
- **Type check fails**: Report all type errors, map to tasks/requirements

## Investigation Errors

- **Referenced file not found**: Note in investigation summary, continue review
- **Circular import detected**: Flag as architectural issue (MAJOR)
- **Cannot parse file**: Report as WARN, skip file

## Context Errors

- **Malformed TDD context**: Report as WARN in feedback, continue review
- **Missing required artifacts**: HALT with message: "Missing [artifact]. Run [command] first."

## General Protocol

On any error:
1. Attempt to continue with available information
2. Note limitation in feedback.md
3. If critical (can't verify at all): HALT and report

# Safety

- Never approve with BLOCKERs present
- Never skip verification phase (tests + app startup)
- Never modify implementation code beyond AICODE-FIX comments
- Always commit review changes for audit trail
- If uncertain about severity → escalate to higher severity
- If uncertain about fix → provide multiple options, let tdd-dev decide