---
description: Set up and normalize design system references for the pipeline.
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking__sequentialthinking, mcp__figma-dev-mode-mcp-server__get_metadata, mcp__figma-dev-mode-mcp-server__get_screenshot, mcp__figma-dev-mode-mcp-server__get_variable_defs, mcp__figma-dev-mode-mcp-server__get_design_context
---

# Instructions

Validate, normalize, and enrich design references for the MVP Builder pipeline.
Reads all generator output from `ai-docs/references/`, classifies content by type,
resolves conflicts through user interaction, and produces standardized reference files.

**Tools Usage:**
- `Read`: For loading PRD.md and all reference files
- `Write`: For saving normalized outputs
- `Bash`: For file discovery and directory operations
- Figma MCP (optional): For extracting screens, metadata, and variables from Figma

**Skills:**
- Sequential Thinking Methodology: For content classification, conflict resolution, gap analysis
  - Tool: `/mcp__sequential-thinking__sequentialthinking`

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
- After normalization: remove original input files that were consumed into outputs

## Figma Mode Rules
- Figma URL detected in `$ARGUMENTS` → Figma Mode ON (Phase 2 executes)
- No Figma URL → Figma Mode OFF (Phase 2 skipped entirely)
- Figma extraction failures → Warning + continue (enrichment, not requirement)
- Screen names → kebab-case from frame name

## User Interaction Rules
- Conflicts between sources → Ask user before resolving
- Gaps in required token categories → Ask user to provide or confirm skip
- Unknown file types → Ask user to classify
- After collecting all questions → batch-process answers with Sequential Thinking
- Never silently skip or auto-resolve ambiguous data

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

### 0.4 Detect Figma Mode
- If `$ARGUMENTS` contains a Figma URL (figma.com/design/, figma.com/file/, figma.com/proto/) → **Figma Mode ON**
- Otherwise → **Figma Mode OFF**

### 0.5 Discovery Report
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
- Record: token name, value per source, category (color/typography/spacing/etc.)
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

### 1.5 Collect & Resolve Issues

**Batch all questions for user:**

```
Validation found issues requiring your input:

1. ⚠️ Token 'primary' has conflicting values:
   - [source1]: #3B82F6
   - [source2]: #2563EB
   Which value to use? [1/2]

2. ℹ️ Token 'shadow-xl' found in [source1] but not [source2].
   Add to output? [yes/no]

3. 🚨 Token 'gray-500' is 'undefined' in [source].
   Provide value or skip? [value/skip]
```

After user responds → **Process all answers with Sequential Thinking** to build resolved token map.

### 1.6 Validation Report
```
Validation Results:

✅ Resolved: [count] tokens across [count] sources
⚠️ User decisions applied: [count]
🚨 Skipped (user choice): [count]
ℹ️ Notes for style-guide: [count]
```

If all tokens undefined with no resolvable data → recommend fixing generator and re-running.
Otherwise proceed to normalization.

## Phase 2: Figma Extraction (if Figma Mode ON)

Skip entirely if no Figma URL provided.

### 2.1 Extract Screen Metadata
Use Figma MCP `get_metadata` → Frame names, IDs, hierarchy, sizes.
Parse XML response → Build screen inventory.

### 2.2 Extract Screenshots
For each top-level frame:
Use Figma MCP `get_screenshot` → Save to `./ai-docs/references/screens/[kebab-name].png`

### 2.3 Extract Figma Variables (Optional Enrichment)
Use Figma MCP `get_variable_defs` → Compare with token map:
- Matching values → Confirmed ✅
- Different values → Add to user questions batch
- Figma-only tokens → Ask user: add or skip

### 2.4 Extract Design Context (Optional Enrichment)
For key frames, use Figma MCP `get_design_context` → Component structure, layout patterns.
Use to enrich style-guide.md with real usage examples.

### 2.5 Generate Screen Index
Load Screen Index section from design-setup-template.md.
Fill with extracted data.
Write to: `./ai-docs/references/screens/index.md`

```
📸 Figma extraction complete
- Screens captured: [count]
- Variables extracted: [count]
- New tokens from Figma: [count] (pending user review)
```

## Phase 3: Normalize & Generate

### 3.1 Normalize design-system.md

Load Design System Reference section from design-setup-template.md.

**Input:** Resolved token map from Phase 1 + Figma enrichment from Phase 2.

**Fill template sections:**
- Metadata from PRD context + token source metadata
- Token tables from resolved values (every row MUST have value)
- Framework-specific columns only if framework config was found in sources
- Patched tokens marked with `*` footnote
- Components section from Figma mapping or placeholder

**Critical:** Do's/Don'ts and constraints go to style-guide.md, NOT here.

Write to: `./ai-docs/references/design-system.md`

### 3.2 Normalize Token Files

Based on resolved token map, update each token source that was found:
- Fix `undefined` values with resolved values
- Add missing tokens where user confirmed
- Remove conflicting values replaced by user choice
- Preserve file format (JSON stays JSON, CSS stays CSS, etc.)

Write patched files back to their original locations in `./ai-docs/references/tokens/`

### 3.3 Generate style-guide.md

Load Style Guide section from design-setup-template.md.

**Input sources:**
1. Do's/Don'ts extracted from markdown specifications
2. PRD constraints (platform, audience, tone)
3. Figma usage patterns (if extracted)
4. Validation findings (collision resolutions, patches applied)

Write to: `./ai-docs/references/style-guide.md`

### 3.4 Clean Up

Remove original input files that were fully consumed into normalized outputs:
- Markdown spec files that were merged into design-system.md and style-guide.md → remove
- Token source files are kept (updated in place in 3.2)
- Asset files are kept
- `screens/` directory is kept

Before deleting, confirm with user:
```
These original files were consumed into normalized outputs:
- [filename1] → merged into design-system.md + style-guide.md
- [filename2] → merged into design-system.md

Remove originals? [yes/no]
```

## Phase 4: Finalize & Report

### 4.1 Validate Output

Apply Review Checklist from design-setup-template.md.

```bash
echo "=== Output Validation ==="
for f in $(find ./ai-docs/references -type f 2>/dev/null); do
    echo "✅ $(echo $f | sed 's|./ai-docs/references/||')"
done
```

### 4.2 Final Report

```
Design Setup Complete!

Summary:
- Design System: [name] ([UI library or "custom"])
- Platform: [from PRD]
- Tokens: [count] colors, [count] typography, [count] spacing
- Sources processed: [count] files ([classifications])
- Screens: [count or "none (no Figma)"]
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
- **Invalid Figma URL**: "Could not parse Figma URL. Expected: figma.com/design/... or figma.com/file/..."
- **Unclassifiable files**: "Could not determine content type of [filename]. What does this file contain?"

**Validation Errors:**
- **All tokens undefined**: "All token values are undefined. Fix generator output and re-export."
- **PRD mismatch**: "Warning: Detected [framework] but PRD specifies [other]. Proceeding with detected values."
- **No token sources found**: "No token data found in any file. At minimum, provide a JSON or CSS file with token values."

**Runtime Errors:**
- **Figma MCP unavailable**: "Figma MCP server not available. Run without Figma link or connect MCP first."
- **File write failed**: "Failed to write [file path]: [error]"
- **Template not found**: "Template design-setup-template.md not found at expected path."