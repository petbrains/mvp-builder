# Design Setup Template

---

## Design System Reference

** MODEL INSTRUCTION: Fill all sections using validated source data.
JSON is source of truth for token values. Markdown specifications for descriptions.
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

** MODEL INSTRUCTION: Extract rules from spec Do's/Don'ts and PRD constraints.
Every rule must be actionable — specific enough for an agent to follow.
"Do: Use primary color (#3B82F6) for all CTA buttons" ✅
"Do: Use appropriate colors" ❌ **

```markdown
# Style Guide

Design rules and constraints for implementation.
Source: Generator + PRD [+ Figma]

## Design Principles
- [From generator spec: overall approach, mood, tone]
- [From PRD: audience-aligned constraints]

## Color Rules
### Do
- [From spec Do's — specific, actionable]

### Don't
- [From spec Don'ts — specific, actionable]

### Accessibility
- [Contrast requirements derived from token pairs]

## Typography Rules
### Do
- [From spec Do's]

### Don't
- [From spec Don'ts]

## Spacing & Layout
- [Rules from spec]
- [Platform-specific constraints from PRD]

## Animation Guidelines
- [Duration and easing rules from JSON + spec]

## Component Usage Rules
- [If Figma provided component context]
- [DS-specific constraints]

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
- [ ] Framework config matches JSON values (post-patch, if framework present)
- [ ] Token files moved to tokens/ directory
- [ ] No conflicting values remain unresolved without documentation

### PRD Alignment
- [ ] UI library matches PRD tech stack (or mismatch documented in report)
- [ ] Platform matches PRD
- [ ] Metadata section complete

### Style Guide Quality
- [ ] Every rule is actionable (Do/Don't with specific values or components)
- [ ] No vague terms without specifics: "appropriate", "suitable", "nice"
- [ ] Changes Applied section lists ALL modifications (patches, resolutions, skips)
- [ ] Accessibility rules reference concrete contrast ratios

### Output Completeness
- [ ] design-system.md written and follows template structure
- [ ] style-guide.md written and follows template structure
- [ ] Token files patched and moved to tokens/
- [ ] screens/index.md written (if Figma Mode ON)
- [ ] All screenshots saved to screens/ (if Figma Mode ON)
- [ ] Consumed source files removed from references/