# Design Setup Template

---

## Design System Reference

** MODEL INSTRUCTION: Fill all sections using validated source data.
JSON is source of truth for token values. Markdown specifications for descriptions.
Product Context from PRD — provides layout and interaction hints for downstream agents.
Include only sections with actual data — remove empty sections entirely.
Do NOT include Do's/Don'ts here — those go to Style Guide only. **

```markdown
# Design System Reference

## Metadata
- **Name**: [from JSON metadata or spec title]
- **UI Library**: [from JSON metadata.uiLibrary]
- **Platform**: [from PRD]
- **Generated**: [ISO date]
- **Source**: Generator [+ Figma: URL]

## Product Context
- **Type**: [from PRD: SaaS dashboard / mobile app / landing page / e-commerce / ...]
- **Primary layout**: [from sources: sidebar + content / top-nav + full-width / bottom-tabs + content / ...]
- **Key interaction pattern**: [from PRD: form-heavy / data-display / content-consumption / CRUD / ...]
- **Target audience**: [from PRD: enterprise users / consumers / developers / ...]

## Color Tokens

| Token | Value | CSS Variable | [Framework Class] | Usage |
|-------|-------|-------------|-------------------|-------|
| [name] | [hex/rgb] | --color-[name] | [class] | [from spec] |

## Typography

| Role | Font Family | Weight | Size | Line Height |
|------|------------|--------|------|-------------|
| [role] | [family] | [weight] | [size] | [lh] |

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| [name] | [value] | [usage] |

## Border Radius

| Token | Value |
|-------|-------|
| [name] | [value] |

## Shadows

| Token | Value |
|-------|-------|
| [name] | [value] |

## Animation

| Property | Value |
|----------|-------|
| duration | [from JSON] |
| easing | [from JSON] |

## Breakpoints

| Token | Value |
|-------|-------|
| [name] | [value] |

## Components

| Component | DS Name | Variants | Notes |
|-----------|---------|----------|-------|
| [component] | [ds_name] | [list] | [notes] |

If no Figma data: "Component list will be populated during UI specification generation via Context7."
```

**Notes:**
- `[Framework Class]` column header adapts: "Tailwind Class" if Tailwind detected, omit column entirely if no framework
- Patched tokens (where undefined was resolved) marked with `*` footnote
- Every Value cell MUST be populated — never "undefined", never empty
- Include only sections with actual data — remove empty sections entirely

---

## Style Guide

** MODEL INSTRUCTION: Transform source Do's/Don'ts and PRD constraints into
AI-actionable implementation rules. Every rule must bind to concrete token names
from design-system.md — an agent reading this must know exactly which token to use.
"CTA buttons: background `color-primary-600`, text `color-white`, radius `radius-md`" ✅
"Use appropriate colors for buttons" ❌
"Do: Use primary color for CTAs" ❌ (missing token binding) **

```markdown
# Style Guide

Implementation rules for AI agents.
Every rule references concrete tokens from design-system.md.
Source: Generator + PRD [+ Figma]

## Design Principles
- [From generator spec: overall approach, mood, tone]
- [From PRD: audience-aligned constraints]

## Color Implementation
- Primary actions (CTA, submit, confirm): background `[token]` ([value]), text `[token]` ([value])
- Destructive actions (delete, remove): background `[token]` ([value])
- Error states only: `[token]` ([value]) — never use for emphasis or decoration
- Surface hierarchy: page `[token]`, card `[token]`, overlay `[token]`
- [Contrast requirements: `[token-pair]` achieves [ratio]:1 WCAG [level]]

## Typography Implementation
- Page headings: `[token]` ([family] [weight] [size]/[lh])
- Section headings: `[token]` ([family] [weight] [size]/[lh])
- Body text: `[token]` ([family] [weight] [size]/[lh])
- Captions/labels: `[token]` ([family] [weight] [size]/[lh])
- Never combine more than [N] type roles on one screen

## Spacing & Layout Implementation
- Component internal padding: `[token]` ([value])
- Between components: `[token]` ([value])
- Section separation: `[token]` ([value])
- Page margins: `[token]` ([value])
- [Platform-specific constraints from PRD]

## Animation Implementation
- Micro-interactions (hover, focus): duration `[token]` ([value]), easing `[token]` ([value])
- Page transitions: duration `[token]` ([value]), easing `[token]` ([value])
- Loading states: [pattern from spec]

## Component Implementation
- Buttons: radius `[token]`, padding `[spacing-x]` `[spacing-y]`, shadow `[token]` or none
- Cards: radius `[token]`, padding `[token]`, shadow `[token]`, border `[token]` or none
- Inputs: radius `[token]`, border `[token]`, focus ring `[token]`
- [Additional components from Figma or DS-specific constraints]

## Changes Applied

All modifications made during normalization for full transparency.

### Undefined Patches
- [Format: "Token '[name]' in [file]: undefined → [value] from [source]"]

### Conflict Resolutions
- [Format: "Token '[name]': chose [value] ([source]) over [value] ([source]) — [reason]"]

### Skipped Tokens
- [Format: "Token '[name]': excluded by user decision"]
```

---

## Screen Index

** MODEL INSTRUCTION: Only generate if Figma Mode ON.
Skip this template entirely if no Figma URL was provided. **

```markdown
# Screen References

Extracted from Figma: [figma-url]
Date: [ISO date]

## Screens

| Screen | File | Dimensions | Notes |
|--------|------|------------|-------|
| [name] | screens/[slug].png | [WxH] | [from frame annotations] |

## Component Mapping

Components observed in Figma frames mapped to design system.
Source: Figma Design Extraction skill (FIGMA_COMPONENTS output).

| Figma Component | DS Component | Confidence |
|-----------------|-------------|------------|
| [figma name]    | [ds name]   | high/medium/low |
```

---

## Review Checklist

** MODEL INSTRUCTION: This checklist is for internal validation only.
Run through every item before writing final output files.
Do NOT include this checklist in any output file. **

### Token Completeness
- [ ] Every JSON token has a corresponding row in design-system.md
- [ ] No "undefined" values in any output file
- [ ] All Value columns in tables are populated
- [ ] Patched tokens marked with `*` footnote
- [ ] Only categories with actual data are present (empty sections removed)

### Cross-File Consistency
- [ ] CSS variables match JSON values (post-patch)
- [ ] HTML-extracted tokens match JSON/CSS values (post-patch, if HTML sources present)
- [ ] Framework config matches JSON values (post-patch, if framework present)
- [ ] Token files moved to tokens/ directory
- [ ] No conflicting values remain unresolved without documentation

### PRD Alignment
- [ ] UI library matches PRD tech stack (or mismatch documented in report)
- [ ] Platform matches PRD
- [ ] Metadata section complete
- [ ] Product Context section populated from PRD (type, layout, interaction pattern, audience)

### Style Guide Quality
- [ ] Every rule references concrete token names from design-system.md
- [ ] Every rule includes token value in parentheses for quick reference
- [ ] No vague terms without token bindings: "appropriate", "suitable", "primary color"
- [ ] Changes Applied section lists ALL modifications (patches, resolutions, skips)
- [ ] Accessibility rules reference concrete contrast ratios with token pairs
- [ ] Component Implementation rules cover all components listed in design-system.md

### Output Completeness
- [ ] design-system.md written and follows template structure
- [ ] style-guide.md written and follows template structure
- [ ] Token files patched and moved to tokens/
- [ ] screens/index.md written (if Figma Mode ON)
- [ ] All screenshots saved to screens/ (if Figma Mode ON)
- [ ] Consumed source files removed from references/