# [DOMAIN] Requirements Quality Checklist: [FEATURE_NAME]

**Purpose**: Validate [DOMAIN] requirement quality for [FEATURE_NAME]
**Source**: [PRIMARY_SOURCE]

## [CATEGORY_1]

- [ ] CHK001 [ITEM_QUESTION] [REFERENCE]
- [ ] CHK002 [ITEM_QUESTION] [REFERENCE]

## [CATEGORY_2]

- [ ] CHK003 [ITEM_QUESTION] [REFERENCE]
- [ ] CHK004 [ITEM_QUESTION] [REFERENCE]

## [CATEGORY_3]

- [ ] CHK005 [ITEM_QUESTION] [REFERENCE]
- [ ] CHK006 [ITEM_QUESTION] [REFERENCE]

## [CATEGORY_4]

- [ ] CHK007 [ITEM_QUESTION] [REFERENCE]
- [ ] CHK008 [ITEM_QUESTION] [REFERENCE]

## [CATEGORY_5]

- [ ] CHK009 [ITEM_QUESTION] [REFERENCE]
- [ ] CHK010 [ITEM_QUESTION] [REFERENCE]

---

## Review Checklist
*GATE: Automated checks*
**MODEL INSTRUCTION: This checklist is for internal validation only. Do not include in final output.**

### Format Compliance
- [ ] All items use CHK### sequential numbering
- [ ] All items are questions (not verification statements)
- [ ] No prohibited verbs (verify, test, confirm, check) or implementation language
- [ ] No borderline patterns (mapped/linked, properly specified, handles)

### Source Fidelity
- [ ] No fabricated values (numbers, percentages, thresholds not explicitly in source)
- [ ] No inferred mechanisms (auth types, protocols, formats not documented)
- [ ] Vague source terms preserved as-is (not quantified or specified)
- [ ] Every detail traces to exact text in source artifact

### Traceability
- [ ] All items have concrete references ([FR-XXX], [UX-XXX], [source: Section])
- [ ] No intermediate markers remaining ([Gap], [Ambiguity], [Conflict], [Assumption])
- [ ] Questions are self-descriptive (specify what aspects need documentation)

### Content
- [ ] Categories match domain defaults (4-5 per domain)
- [ ] Total items ≤40
- [ ] Each category has 5-10 items
- [ ] No near-duplicate items

---