# CLAUDE.md

Development context for the mvp-builder repository. The product is the content — nothing
here is live pipeline configuration for this repo itself.

## Layout

- `agents/`, `skills/`, `.mcp.json` — plugin components, distributed via the Claude Code plugin
- `.claude-plugin/` — plugin and marketplace manifests
- `scaffold/` — project payload materialized by `/mvp-init`: `INSTRUCTIONS.md` (becomes the
  project's `CLAUDE.md` on Claude / `AGENTS.md` on Codex), path-scoped `rules/`, curated
  `settings.json`
- `scripts/` — standalone installers (scaffold + full no-plugin mode)

## Conventions

- Branches and commits follow scaffold/INSTRUCTIONS.md → Git Workflow → Conventions
- Content stays platform-universal: no Claude-only or Codex-only phrasing inside
  `agents/`, `skills/`, or `scaffold/INSTRUCTIONS.md`; platform differences live only in
  installers, manifests, and the `mvp-init` skill
- No `mcp__` scoped-tool literals anywhere outside `.mcp.json` — reference tools by
  function ("the sequential-thinking MCP tool")
- Frontmatter must be strict-YAML (quote values containing `: ` or starting with `[`)
