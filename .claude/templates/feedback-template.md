# Feedback: [FEATURE_NAME]

**Review Date:** [TIMESTAMP]
**Branch:** [BRANCH_NAME]
**Commit Range:** [SETUP_COMMIT]..[HEAD_COMMIT]
**Status:** [🟢 PASSED | 🔴 BLOCKED | 🟡 PARTIAL]

> ⚠️ This file is overwritten on each `/review` run. Previous versions available in git history.

## Summary

| Category | Pass | Fail | Warn |
|----------|------|------|------|
| App Startup | [✓/✗] | [N] | [N] |
| Tests | [N] | [N] | [N] |
| Type Check | [✓/✗] | - | - |
| Lint | [✓/✗] | - | - |
| Traceability | [N] | [N] | [N] |
| Spec Compliance | [N] | [N] | [N] |
| Architecture | [✓/✗] | [N] | [N] |
| Code Standards | [N] | [N] | [N] |

**Verdict:** [VERDICT_SUMMARY - e.g., "2 blockers must be resolved before merge"]

---

## Investigation

### Diff Scope
```
[GIT_DIFF_SUMMARY]
Added: [N] files
Modified: [N] files
Deleted: [N] files

Key changes:
- [FILE_PATH]: [CHANGE_SUMMARY]
```

### Files Investigated Beyond Diff
| File | Reason | Key Findings |
|------|--------|--------------|
| [FILE_PATH] | [WHY_INVESTIGATED] | [WHAT_FOUND] |

### Architectural Impact
**Level:** [None | Minor | Moderate | Significant]

**New Patterns:** [PATTERNS_INTRODUCED_OR_NONE]

**Affected Areas:** [AREAS_IMPACTED_OR_NONE]

**Alignment with plan.md:** [ASSESSMENT]

---

## Pre-Existing Context

### From TDD-DEV
| Location | Type | Summary |
|----------|------|---------|
| [TASK_ID] | [Workaround/Blocked/Note] | [BRIEF_SUMMARY] |
| [CODE_FILE:LINE] | [AICODE-NOTE/TODO] | [BRIEF_SUMMARY] |

### From Previous Review
| REV-ID | Status | Summary |
|--------|--------|---------|
| [REV-XXX] | [Fixed/Persists/New] | [BRIEF_SUMMARY] |

---

## Blockers

### [REV-XXX] [BLOCKER] [TITLE]

**Type:** [Test Failure | Runtime Error | Spec Violation | Contract Mismatch | Type Error]

**Source:** [WHERE_DISCOVERED - e.g., "Phase 1.2 Test Suite", "Phase 3.1 Traceability"]

**Evidence:**
```
[TERMINAL_OUTPUT_OR_CODE_SNIPPET]
```

**Diagnosis:**
- **Problem:** [WHAT_IS_WRONG]
- **Cause:** [WHY_IT_IS_WRONG]
- **Root Cause:** [UNDERLYING_ISSUE]

**Analysis Context:**
- Sequential Thinking: [YES/NO] — [KEY_REASONING_IF_YES]
- Context7: [YES/NO] — [LIBRARY_AND_TOPIC_IF_YES]
- TDD Context: [YES/NO] — [WHAT_TDD_REPORTED_IF_YES]

**Affected Items:**
| Type | ID | Action |
|------|-----|--------|
| Task | [TASK_ID] | [Rolled back / Context added] |
| Checklist | [CHK_ID] | [Rolled back] |
| Requirement | [FR/UX-XXX] | [Violated] |
| Code | [FILE:LINE] | [AICODE-FIX added] |

**Required Context for Fix:**
| File | Section | Why Needed |
|------|---------|------------|
| [FILE_PATH] | [SECTION_OR_LINE] | [REASON] |

**Fix Options:**

**Option A: [OPTION_NAME]**
```[language]
[CODE_EXAMPLE]
```
- Pros: [ADVANTAGES]
- Cons: [DISADVANTAGES]

**Option B: [OPTION_NAME]**
```[language]
[CODE_EXAMPLE]
```
- Pros: [ADVANTAGES]
- Cons: [DISADVANTAGES]

**Recommended:** [OPTION_LETTER] — [RATIONALE_FOR_RECOMMENDATION]

**Verification After Fix:**
```bash
[COMMANDS_TO_RUN]
# Expected: [EXPECTED_RESULT]
```

---

## Major Issues

### [REV-XXX] [MAJOR] [TITLE]

**Type:** [ISSUE_TYPE]

**Source:** [WHERE_DISCOVERED]

**Evidence:**
```
[EVIDENCE]
```

**Diagnosis:**
- **Problem:** [WHAT_IS_WRONG]
- **Cause:** [WHY_IT_IS_WRONG]

**Affected Items:**
| Type | ID | Action |
|------|-----|--------|
| [TYPE] | [ID] | [ACTION] |

**Fix Guidance:**
[GUIDANCE_TEXT_EXPLAINING_HOW_TO_FIX]

```[language]
[CODE_EXAMPLE_IF_APPLICABLE]
```

**Verification:**
```bash
[VERIFICATION_COMMAND]
```

---

## Warnings

### [REV-XXX] [WARN] [TITLE]

**File:** [FILE_PATH]

**Issue:** [ISSUE_DESCRIPTION]

**Suggestion:** [SUGGESTED_FIX_OR_IMPROVEMENT]

**Impact if Ignored:** [CONSEQUENCE]

---

## Info

### [REV-XXX] [INFO] [TITLE]

**Context:** [WHAT_WAS_REVIEWED]

**Assessment:** [ASSESSMENT_RESULT]

**Decision:** [DECISION_AND_RATIONALE]

---

## TDD Workaround Assessment

| Task | Workaround | Spec Reference | Compliance | Verdict |
|------|------------|----------------|------------|---------|
| [TASK_ID] | [WORKAROUND_SUMMARY] | [FR/UX-XXX] | [✓/✗] | [Accept/Reject] |

### Accepted Workarounds
- **[TASK_ID]**: [WORKAROUND] — Acceptable because [RATIONALE]

### Rejected Workarounds
- **[TASK_ID]**: [WORKAROUND] — Rejected because [VIOLATION_DESCRIPTION]
  - Action: Rolled back, see REV-XXX

---

## Rollback Summary

### tasks.md Changes
| Task | Previous | Current | REV | Inline Context Added |
|------|----------|---------|-----|----------------------|
| [TASK_ID] | [x] | [ ] | [REV-XXX] | [CONTEXT_SUMMARY] |

### validation/*.md Changes
| File | CHK | Previous | Current | REV |
|------|-----|----------|---------|-----|
| [CHECKLIST_FILE] | [CHK_ID] | [x] | [ ] | [REV-XXX] |

### Code Markers Added
| File | Line | Type | REV | Summary |
|------|------|------|-----|---------|
| [FILE_PATH] | [LINE] | AICODE-FIX | [REV-XXX] | [FIX_SUMMARY] |

---

## For TDD-DEV Fix Mode

### Priority Order
1. **[REV-XXX]** — [WHY_FIRST - e.g., "Blocks app startup"]
2. **[REV-XXX]** — [WHY_SECOND - e.g., "Blocks test suite"]
3. **[REV-XXX]** — [WHY_THIRD]

### Execution Checklist
- [ ] Load this feedback.md
- [ ] Fix [REV-XXX]: [BRIEF_ACTION]
- [ ] Fix [REV-XXX]: [BRIEF_ACTION]
- [ ] Run verification commands
- [ ] Request re-review: `/review [FEATURE]`

### Quick Reference: Required Files
| REV | Files to Read | AICODE-FIX Location |
|-----|---------------|---------------------|
| [REV-XXX] | [FILE_LIST] | [FILE:LINE] |

### Re-verification Criteria
| REV | Success Criterion | Verification Command |
|-----|-------------------|----------------------|
| [REV-XXX] | [WHAT_SHOULD_PASS] | `[COMMAND]` |

---

## Review Metadata

**Reviewed By:** review command
**Artifacts Loaded:** [LIST_OF_ARTIFACTS]
**Investigation Depth:** [N] files beyond diff
**Review Commit:** [REVIEW_COMMIT_HASH]
**Previous Review:** [PREVIOUS_COMMIT_HASH or "First review"]

---

## Review Checklist
*GATE: Internal validation*
**MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final feedback.md output.**

### Completeness
- [ ] All test failures diagnosed with root cause
- [ ] All runtime errors investigated
- [ ] All TDD workarounds assessed against spec
- [ ] All blocked tasks re-diagnosed with fresh perspective
- [ ] Investigation TODO fully executed
- [ ] App startup verified (not just tests)

### Quality
- [ ] Each BLOCKER has at least 2 fix options with pros/cons
- [ ] Each finding has Required Context for Fix section
- [ ] Verification commands provided for each BLOCKER/MAJOR
- [ ] Recommended option justified for each BLOCKER

### Traceability
- [ ] Each REV-XXX maps to affected tasks and/or CHK items
- [ ] AICODE-FIX comments reference REV-XXX
- [ ] Inline context in tasks.md references feedback.md section
- [ ] Rollback Summary matches actual changes made

### Format
- [ ] REV-XXX numbering is sequential (001, 002, ...)
- [ ] All tables properly formatted
- [ ] Code snippets have language tags
- [ ] No placeholder text remaining (no [BRACKETS] in final output)
- [ ] Status correctly reflects findings (BLOCKED if any blockers)

### Consistency
- [ ] Severity assignments consistent across similar issues
- [ ] Fix guidance aligns with spec requirements
- [ ] Architectural impact assessment matches findings
- [ ] TDD Workaround verdicts justified by spec references

---