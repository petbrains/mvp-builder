---
description: Set up and normalize design system references for the pipeline.
argument-hint: [figma-url]
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__context7__resolve-library-id, mcp__context7__get-library-docs, mcp__figma__whoami, mcp__figma__get_metadata, mcp__figma__get_screenshot, mcp__figma__get_variable_defs, mcp__figma__get_design_context
---

# Instructions

Validate, normalize, and enrich design references for the MVP Builder pipeline.

**Tools Usage:**
- `Read`: For loading PRD.md and all reference files
- `Write`: For saving normalized outputs
- `Bash`: For file discovery and directory operations

**Skills:**
- Sequential Thinking Methodology: For content classification, conflict resolution, gap analysis
  - Tool: `/mcp__sequential-thinking__sequentialthinking`
- Context7 Documentation Retrieval: For detected framework/library token format and naming conventions
  - Tools: `/mcp__context7__resolve-library-id`, `/mcp__context7__get-library-docs`
- Figma Design Extraction: For Figma URL parsing, token extraction, screen discovery, screenshots
  - Tools: `/mcp__figma__whoami`, `/mcp__figma__get_metadata`, `/mcp__figma__get_screenshot`, `/mcp__figma__get_variable_defs`, `/mcp__figma__get_design_context`

**Templates:**
- Design Setup: @.claude/templates/design-setup-template.md

**Project context:**
- PRD: @ai-docs/PRD.md

**File Structure:**
- Input: `./ai-docs/references/` (any generator output files)
- Output: `./ai-docs/references/` (standardized: design-system.md, style-guide.md, tokens/, screens/)

# Task

Read everything in references/, understand what's there regardless of file names,
normalize into standardized output, ask user about ambiguities, and clean up.

# Rules

## Source Priority Rules
- Token values: JSON files > Figma > markdown descriptions (always)
- Constraints and rules: markdown descriptions > Figma > PRD (human intent prevails)
- Metadata: PRD > JSON files > markdown (product context)
- If conflict between sources → Ask user, then process decision with Sequential Thinking

## Classification Rules
- Classify files by CONTENT, not by name
- JSON with color/typography/spacing keys → token source
- CSS with custom properties (--var) → token source
- JS/TS with theme/config object → framework config source
- Markdown with design descriptions/rules → specification source
- Image files → asset source
- Unknown format → Ask user what this file contains

## Token Categories
All token operations (classification, mapping, validation, output) use this canonical list:
- `color` — all color tokens (primitives, semantic, surface, etc.)
- `typography` — font family, weight, size, line-height
- `spacing` — margins, paddings, gaps, spacing scale
- `border-radius` — corner radius tokens
- `shadows` — box-shadow, drop-shadow, elevation
- `animation` — duration, easing, transition
- `breakpoints` — responsive breakpoints (if present)

Include only categories with actual data — skip empty categories entirely.

## Validation Rules
- `undefined` in ANY token source → 🚨 Critical
- Value mismatch between token sources → ⚠️ Warning, ask user which value to keep
- Gaps (token in one source but not others) → ask user: add or skip
- Only validate across sources actually found — never assume missing files are errors

## Output Rules
- Every token row in output MUST have a value (never empty, never "undefined")
- Patched values marked with `*` footnote
- Do's/Don'ts go ONLY to style-guide.md, NEVER to design-system.md
- Framework-specific columns only if framework detected in sources
- After normalization: consumed source files are automatically removed (Phase 4.4)

## Figma Mode Rules
- Figma URL detected in `$ARGUMENTS` → Figma Mode ON (Phase 2 executes via Figma Design Extraction skill)
- No Figma URL → Figma Mode OFF (Phase 2 skipped entirely)
- Figma extraction failures → Handled by skill (enrichment, not requirement) → pipeline continues
- Screen names → kebab-case slugs from skill's DISCOVER step

## User Interaction Rules
- Present ONE issue at a time, wait for user response before next
- For each issue: analyze with Sequential Thinking, generate 2-3 options with rationale
- Always show recommended option with reasoning
- Unknown file types → Ask user to classify before proceeding
- Never silently skip or auto-resolve ambiguous data
- Never present bare binary choices ([yes/no], [1/2]) — always provide analyzed options

# Execution Flow

## Phase 0: Discover & Classify

### 0.1 Load PRD Context
- Read `./ai-docs/PRD.md` → Extract: product name, platform, tech stack, design system preferences, target audience
- If PRD not found → Error: "PRD.md not found. Generate PRD first."

**Keep in context throughout execution**

### 0.2 Discover All Reference Files
```bash
if [ -d "./ai-docs/references" ]; then
    find ./ai-docs/references -type f 2>/dev/null
else
    echo "ERROR: ai-docs/references/ directory not found"
fi
```
- If directory empty or not found → Error: "No files found in ai-docs/references/. Place generator output first."

**Read every file into context.**

### 0.3 Classify by Content

For each file found, read content and classify:

| Content Pattern | Classification |
|---|---|
| JSON with color/typography/spacing/tokens keys | `token-json` |
| CSS with `--custom-property` declarations | `token-css` |
| JS/TS with theme config, tailwind config, or token exports | `token-framework` |
| Markdown with design system descriptions, rules, Do's/Don'ts | `spec-markdown` |
| PNG/JPG/SVG image files | `asset` |
| Anything else | `unknown` → ask user |

**Apply Sequential Thinking** to resolve ambiguous classifications.

### 0.4 Fetch Framework Documentation

If any files classified as `token-framework` or `token-css`:

**Identify framework** from file content:
- `tailwind.config` → Tailwind CSS
- `theme` object with MUI patterns → Material UI
- `chakra` theme → Chakra UI
- CSS custom properties with known prefix → corresponding library
- Other → extract library name from imports/comments

**Apply Context7 Documentation Retrieval** for detected framework:
- Resolve library ID (trust score ≥7 preferred)
- Fetch documentation with topic: "design tokens theme configuration"
- Use 10000 tokens for token-specific coverage

Keep framework docs in context for:
- Phase 1: validating token names match framework conventions
- Phase 4: normalizing output to correct framework format

If no framework detected → skip.

### 0.5 Detect Figma Mode
- If `$ARGUMENTS` contains a Figma URL (figma.com/design/, figma.com/file/, figma.com/proto/) → **Figma Mode ON**
- Otherwise → **Figma Mode OFF**

### 0.6 Discovery Report
```
📦 Design Setup initialized
Found: [count] files in references/

Classified:
  Token sources (JSON): [list]
  Token sources (CSS): [list]
  Token sources (Framework): [list]
  Specifications (Markdown): [list]
  Assets: [list]
  [Unknown: [list] — asking user...]

Figma: [ON with URL / OFF]
Framework: [name + version / none detected]
PRD: ✅ loaded

Starting validation...
```

If any files classified as `unknown` → Ask user before proceeding.

## Phase 1: Cross-Source Validation

**Apply Sequential Thinking** for systematic validation.

Validate only across sources that were actually found and classified. If only one token source exists — skip cross-source checks, extract values directly.

### 1.1 Build Unified Token Map
From all classified token sources, build a single map:

For each token found in any source:
- Record: token name, value per source, category (from Token Categories list)
- Flag: which sources have it, which don't

### 1.2 Detect Issues

**Undefined values:**
- Scan all token sources for `undefined`, empty values, or placeholders
- Flag: `🚨 Undefined in [filename] for token '[key]'`

**Cross-source mismatches:**
- For tokens present in multiple sources, compare values
- Flag: `⚠️ Token '[key]': [source1]=[value], [source2]=[value]`

**Font weight collisions:**
- Flag if two weight names share the same numeric value

**Gaps:**
- Token exists in one source but not others
- Flag: `ℹ️ Token '[key]' found in [source1] but missing from [source2]`

### 1.3 Spec vs Token Sources
Compare markdown specifications against token sources:
- Rules/constraints not represented in tokens → Note for style-guide.md
- Values in markdown that differ from token sources → Flag mismatch
- Do's/Don'ts → Extract for style-guide.md

### 1.4 PRD Alignment Check
Cross-reference with PRD context:
- **Platform match**: mobile app but no mobile breakpoints → Warn
- **Tech stack match**: token framework type vs PRD tech stack → Warn
- **Audience alignment**: enterprise PRD vs playful design → Note

### 1.5 Interim Report
```
File Validation Results:

✅ Consistent: [count] tokens across [count] sources
⚠️ Issues found: [count] (pending resolution after Figma)
ℹ️ Notes for style-guide: [count]
```

If all tokens undefined with no resolvable data → recommend fixing generator and re-running.
Otherwise proceed.

**All issues accumulated — resolution deferred to Phase 3.**

## Phase 2: Figma Extraction (if Figma Mode ON)

Skip entirely if no Figma URL provided.

**Apply Figma Design Extraction skill** and follow its Full Extraction workflow:
- CHECK → verify MCP connection via `whoami`
- PARSE → extract fileKey and nodeId from URL
- DISCOVER → map file structure, build screen inventory
- EXTRACT → variables (primary), design context (fallback), screenshots, components
- ORGANIZE → unified token map with source tags, component list, screen index

### 2.1 Save Extraction Results

Store skill outputs into the pipeline:
- For each screen from skill's SCREENS[], save screenshot to `./ai-docs/references/screens/[slug].png`
- Screen index → `./ai-docs/references/screens/index.md` (load from design-setup-template.md)
- Token map, component list, and screen index data → hold in memory for Phase 3

### 2.2 Compare with File Token Map

Cross-reference Figma tokens (from skill) against token map from Phase 1:
- Matching values → Confirmed ✅
- Different values → **Accumulate as issue** (Figma vs file source conflict, include `source` tag from skill)
- Figma-only tokens → **Accumulate as issue** (new token, user decides)

```
📸 Figma extraction complete
- Screens captured: [count]
- Variables extracted: [count] (from figma-variables: [N], from figma-context: [N])
- Components found: [count]
- New issues from Figma: [count] (added to resolution queue)
```

## Phase 3: Resolve All Issues

**All issues from Phase 1 (file validation) and Phase 2 (Figma conflicts) are now collected.**

### 3.1 Collect

Scan accumulated issues from Phase 1 and Phase 2.
Build list: `UNRESOLVED[] = [{id, source, marker, description}, ...]`

Markers:
- `[Conflict]` — same token, different values across sources
- `[Undefined]` — token with undefined/empty/placeholder value
- `[Gap]` — token exists in one source but not others
- `[Unknown]` — unclassified file or ambiguous content
- `[Figma-only]` — token found in Figma but no file source

If none → Phase 4.

### 3.2 Generate Resolution Options

**Apply Sequential Thinking** for each unresolved item:
- Analyze the conflict context (which sources, what values, PRD alignment)
- Generate 2-3 concrete resolution options
- Determine impact of each option on output files
- Formulate recommended option with rationale

### 3.3 Present Resolution Dialogue

**CRITICAL: Process ONE item at a time. Do NOT batch multiple questions.**

For each item in `UNRESOLVED[]`:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Resolution [current]/[total]

[marker]
[description]

Sources:
  [source1]: [value1]
  [source2]: [value2]
  [PRD context if relevant]

> a) [option + rationale]
     → Impact: [what changes in output]
  b) [option + rationale]
     → Impact: [what changes in output]
  c) Skip — exclude from output
     → Impact: token omitted from design-system.md

Recommended: [a/b/c] — [brief why]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Wait for user selection before showing next item.**

### 3.4 Process Resolution

**Apply Sequential Thinking** for each selection:
- Update resolved token map with chosen value
- Record decision for style-guide.md (Changes Applied section):
  - Undefined patches: `"Token '[name]' in [file]: undefined → [value] from [source]"`
  - Conflict resolutions: `"Token '[name]': chose [value] ([source]) over [value] ([source]) — [reason]"`
  - Skipped tokens: `"Token '[name]': excluded by user decision"`
- If resolution affects multiple tokens (e.g., choosing a color scale) → propagate

After ALL resolutions complete:

```
Resolution Complete:
✅ Resolved: [count] items
Decisions: [count] user choices applied
Skipped: [count] tokens excluded

Proceeding to normalization...
```

## Phase 4: Normalize & Generate

### 4.1 Normalize design-system.md

Load Design System Reference section from design-setup-template.md.

**Input:** Resolved token map from Phase 3 + Figma enrichment from Phase 2 + framework docs from Phase 0.4.

**Fill template sections:**
- Metadata from PRD context + token source metadata
- Token tables from resolved values (every row MUST have value)
- Only include categories that have actual data (from Token Categories list)
- Framework-specific columns only if framework config was found in sources
- Patched tokens marked with `*` footnote
- Components section from Figma component list or placeholder

**Critical:** Do's/Don'ts and constraints go to style-guide.md, NOT here.

Write to: `./ai-docs/references/design-system.md`

### 4.2 Normalize Token Files

Based on resolved token map, update each token source:
- Fix `undefined` values with resolved values
- Add missing tokens where user confirmed
- Remove conflicting values replaced by user choice
- Preserve file format (JSON stays JSON, CSS stays CSS, etc.)
- Follow framework naming conventions from Context7 docs (if loaded)

Move patched token files to `./ai-docs/references/tokens/` with original filenames preserved.
If `tokens/` directory doesn't exist, create it.

### 4.3 Generate style-guide.md

Load Style Guide section from design-setup-template.md.

**Input sources:**
1. Do's/Don'ts extracted from markdown specifications
2. PRD constraints (platform, audience, tone)
3. Figma usage patterns (if extracted)
4. All decisions recorded in Phase 3.4

Write to: `./ai-docs/references/style-guide.md`

### 4.4 Clean Up

Automatically remove original input files that were fully consumed into normalized outputs:
- Markdown spec files merged into design-system.md and style-guide.md → remove
- Original token source files that were moved to `tokens/` → remove from old location
- Asset files → keep (not consumed)
- `screens/` directory → keep
- `design-system.md`, `style-guide.md`, `tokens/` → keep (these are outputs)

Record all removals for the final report.

## Phase 5: Finalize & Report

### 5.1 Validate Output

Apply Review Checklist from design-setup-template.md.

```bash
echo "=== Output Validation ==="
for f in $(find ./ai-docs/references -type f 2>/dev/null); do
    echo "✅ $(echo $f | sed 's|./ai-docs/references/||')"
done
```

### 5.2 Final Report

```
Design Setup Complete!

Summary:
- Design System: [name] ([UI library or "custom"])
- Platform: [from PRD]
- Tokens: [count] colors, [count] typography, [count] spacing, [count] other
- Sources processed: [count] files ([classifications])
- Screens: [count or "none (no Figma)"]
- Components: [count or "none (no Figma)"]
- User decisions applied: [count]
- Auto-patches: [count]

Files:
  [✅ list of all files now in references/]

Cleaned up:
  [🗑 list of removed original files, or "none"]
```

# Error Handling

**Input Errors:**
- **No reference files**: "No files found in ai-docs/references/. Place generator output first."
- **No PRD**: "PRD.md not found. Generate PRD first."
- **Invalid Figma URL**: Skill's Step 1 (PARSE) will detect unsupported formats → warns and skips.
- **Unclassifiable files**: "Could not determine content type of [filename]. What does this file contain?"

**Validation Errors:**
- **All tokens undefined**: "All token values are undefined. Fix generator output and re-export."
- **PRD mismatch**: "Warning: Detected [framework] but PRD specifies [other]. Proceeding with detected values."
- **No token sources found**: "No token data found in any file. At minimum, provide a JSON or CSS file with token values."

**Runtime Errors:**
- **Figma MCP unavailable**: Skill's Step 0 (whoami) will detect this → warns and skips Figma extraction. Pipeline continues.
- **File write failed**: "Failed to write [file path]: [error]"
- **Template not found**: "Template design-setup-template.md not found at expected path."