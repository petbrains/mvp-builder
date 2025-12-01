# [DOMAIN] Checklist: [FEATURE_NAME]

**Source**: [PRIMARY_SOURCE]

## Completeness

- [ ] CHK### [QUESTION] [Completeness, REFERENCE]

## Clarity

- [ ] CHK### [QUESTION] [Clarity, REFERENCE]

## Consistency

- [ ] CHK### [QUESTION] [Consistency, REFERENCE]

## Coverage

- [ ] CHK### [QUESTION] [Coverage, REFERENCE]
- [ ] CHK### Are all scenario types covered: Primary, Alternate, Exception, Recovery? [Coverage, REFERENCE]

## Edge Case

- [ ] CHK### [QUESTION] [Edge Case, REFERENCE]

## Cross-Artifact

- [ ] CHK### [QUESTION] [Consistency, source-A → source-B]
- [ ] CHK### [QUESTION] [Coverage, source-A → source-B]

---

## Review Checklist
**MODEL INSTRUCTION: Internal validation only. Exclude entire section from output.**

**Reference Format:** `[Dimension, Reference]`
- Dimensions: `Completeness`, `Clarity`, `Consistency`, `Coverage`, `Edge Case`
- References: `[FR-XXX]`, `[UX-XXX]`, `[source: Section]`, `[source-A → source-B]`, `[Resolution: CHK###]`

**Validation:**
- [ ] CHK### numbering continues from previous domain
- [ ] All items include quality dimension in brackets
- [ ] All items are questions (not verification statements)
- [ ] No prohibited verbs (verify, test, confirm, check)
- [ ] No intermediate markers after Phase 4
- [ ] Cross-Artifact category present with ≥2 items
- [ ] Scenario coverage check present
- [ ] Total items ≤40
- [ ] Traceability ≥80%