# [DOMAIN] Checklist: [FEATURE_NAME]

**Source**: [PRIMARY_SOURCE]
**CHK Range**: [START]-[END] (e.g., CHK020-CHK038)

## Completeness

- [ ] CHK001 [QUESTION] [Completeness, REFERENCE]
- [ ] CHK002 [QUESTION] [Completeness, REFERENCE]

## Clarity

- [ ] CHK003 [QUESTION] [Clarity, REFERENCE]
- [ ] CHK004 [QUESTION] [Clarity, REFERENCE]

## Consistency

- [ ] CHK005 [QUESTION] [Consistency, REFERENCE]
- [ ] CHK006 [QUESTION] [Consistency, REFERENCE]

## Coverage

- [ ] CHK007 [QUESTION] [Coverage, REFERENCE]
- [ ] CHK008 Are all scenario types covered: Primary, Alternate, Exception, Recovery? [Coverage, REFERENCE]

## Cross-Artifact

- [ ] CHK009 [QUESTION] [Consistency, source-A → source-B]
- [ ] CHK010 [QUESTION] [Coverage, source-A → source-B]

---

## Reference Types

**Format:** `[Dimension, Reference]`

**Dimensions:** `Completeness`, `Clarity`, `Consistency`, `Measurability`, `Coverage`, `Edge Case`
**References:** `[FR-XXX]`, `[UX-XXX]`, `[source: Section]`, `[source-A → source-B]`, `[Resolution: CHK###]`

---

## Review Checklist
**MODEL INSTRUCTION: Internal validation only. Exclude from output.**

- [ ] CHK### numbering continues from previous domain
- [ ] All items include quality dimension in brackets
- [ ] All items are questions (not verification statements)
- [ ] No prohibited verbs (verify, test, confirm, check)
- [ ] No intermediate markers after Phase 4
- [ ] Cross-Artifact category present with ≥2 items
- [ ] Scenario coverage check present (Primary/Alternate/Exception/Recovery)
- [ ] Total items ≤40
- [ ] Traceability ≥80%