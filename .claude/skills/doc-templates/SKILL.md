---
name: doc-templates
description: Canonical templates for every MVP Builder pipeline artifact. Use whenever generating, regenerating, or restructuring any ai-docs artifact — spec.md, FEATURES.md, ux.md, ui.md, plan.md, tasks.md, validation checklists, resolutions.md, feedback.md, design-system.md — so the exact section structure downstream agents parse is preserved. Triggers on: generate spec, create feature docs, write tasks, validation checklist, review feedback, design setup, artifact template.
allowed-tools: Read
---

# Document Templates

Single source of truth for pipeline artifact structure. Every artifact the pipeline
produces follows its template exactly — downstream agents parse these structures by
section name and ID convention (FR-XXX, TEST-XXX, CHK###, REV-XXX), so a missing or
renamed section breaks the chain, not just the style.

## Usage

1. Pick the template for the artifact you are about to generate (table below).
2. Read it from `references/` **at the stage start** — not all templates upfront.
3. Fill every section. Never invent, rename, or drop sections. Placeholders in
   `[BRACKETS]` are replaced; `MODEL INSTRUCTION` blocks guide filling and are
   removed from output.

## Template Index

| Template | Produces | Primary consumer |
|----------|----------|------------------|
| `references/spec-template.md` | `features/[name]/spec.md` | `/docs:feature`, `/docs:clarify` |
| `references/features-template.md` | `ai-docs/FEATURES.md` | `/docs:feature` |
| `references/ux-template.md` | `features/[name]/ux.md` | feature-docs agent |
| `references/ui-template.md` | `features/[name]/ui.md` | feature-docs agent |
| `references/plan-template.md` | `features/[name]/plan.md` | feature-docs agent |
| `references/tasks-template.md` | `features/[name]/tasks.md` | feature-docs agent |
| `references/checklist-template.md` | `validation/[domain]-checklist.md` | `/docs:validation` |
| `references/resolutions-template.md` | `validation/resolutions.md` | `/docs:validation` |
| `references/feedback-template.md` | `features/[name]/feedback.md` | feature-review agent |
| `references/design-setup-template.md` | `references/design-system.md`, `style-guide.md` | design-setup agent |

## Rules

- Template structure is a contract: traceability IDs defined here are referenced
  across spec → tasks → validation → feedback. Keep ID formats intact.
- When an artifact is regenerated, regenerate from the template — never by mutating
  the previous artifact's structure.
- Existing artifacts with the old structure are updated in place only for content,
  never restructured mid-feature.
