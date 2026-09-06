# Feedback: [FEATURE_NAME]

> Overwritten each /review run. Previous versions in git history.

---

## Findings

### REV-001 [BLOCKER] [Title]

**Type:** [Test Failure | Runtime Error | Spec Violation | Type Error | Contract Mismatch]

**Evidence:**
```
[terminal output or code snippet]
```

**Diagnosis:**
- **Problem:** [what is wrong]
- **Cause:** [why it is wrong]
- **Root Cause:** [underlying issue]

**Affected:** [IMPL-XXX], [TEST-XXX], [CHK-XXX], [FR-XXX]

**Fix Options:**
- **A:** [approach] — Pros: [advantages]. Cons: [disadvantages]
- **B:** [approach] — Pros: [advantages]. Cons: [disadvantages]

**Recommended:** [A/B] — [rationale]

---

### REV-002 [MAJOR] [Title]

**Type:** [Issue type]

**Evidence:**
```
[evidence]
```

**Diagnosis:**
- **Problem:** [what is wrong]
- **Cause:** [why it is wrong]

**Affected:** [IDs]

**Fix:**
[Guidance text explaining how to fix]

```[language]
[code example if applicable]
```

---

## Warnings

- **REV-XXX [WARN]** [Title] — [file:line]. [Suggestion to fix]
- **REV-XXX [WARN]** [Title] — [file:line]. [Suggestion to fix]

---

## Info

- **REV-XXX [INFO]** [Title] — [Decision and rationale]
- **REV-XXX [INFO]** Accepted workaround ([TASK-ID]) — [why acceptable per spec]

---

## For Feature-Fix

### Priority
1. **REV-XXX** — [why first, e.g., "blocks app startup"]
2. **REV-XXX** — [why second, e.g., "blocks test suite"]
3. **REV-XXX** — [why third]

### Required Context
| REV | Files to Read | AICODE-FIX Location |
|-----|---------------|---------------------|
| REV-XXX | [file1], [file2] | [file:line] |
| REV-XXX | [file1] | [file:line] |

### Verification
| REV | Command | Expected |
|-----|---------|----------|
| REV-XXX | `[test/run command]` | [expected result] |
| REV-XXX | `[test/run command]` | [expected result] |

---

## Rollback Summary

### tasks.md
| Task | [x]→[ ] | REV |
|------|---------|-----|
| [TASK-ID] | ✓ | REV-XXX |

### validation/*.md
| CHK | [x]→[ ] | REV |
|-----|---------|-----|
| [CHK-ID] | ✓ | REV-XXX |

### AICODE-FIX Added
| Location | REV |
|----------|-----|
| [file:line] | REV-XXX |

---

## Review Checklist
*GATE: Automated checks*
** MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final feedback.md output.**

### Verification
- [ ] App startup tested (not just tests)
- [ ] All test failures have root cause diagnosis
- [ ] Runtime errors investigated

### Quality
- [ ] BLOCKERs have 2 fix options with recommendation
- [ ] Each BLOCKER/MAJOR has verification command
- [ ] TDD workarounds assessed against spec

### Traceability
- [ ] REV-XXX maps to affected tasks/CHK
- [ ] AICODE-FIX comments reference REV-XXX
- [ ] Rollback Summary matches actual changes
- [ ] No [PLACEHOLDER] text in output