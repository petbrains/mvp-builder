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

### Gap Detection
- [ ] Vague terms without source definition marked [Gap]
- [ ] Qualitative criteria without thresholds marked [Gap]
- [ ] Mechanisms/formats without specification marked [Gap]
- [ ] [Gap] questions ask WHETHER defined, not WHAT definition is

### Source Fidelity
- [ ] No fabricated values (numbers, percentages, thresholds not in source)
- [ ] No assumed mechanisms (auth types, protocols, formats)
- [ ] Constants use exact source values only
- [ ] Secondary sources checked before marking [Gap]

### Traceability
- [ ] All items have references (concrete or intermediate markers)
- [ ] Questions are self-descriptive
- [ ] [Conflict] items name both sources in question

### Content
- [ ] Categories match domain defaults (4-5 per domain)
- [ ] Total items ≤40
- [ ] Each category has 5-10 items
- [ ] No near-duplicate items

---