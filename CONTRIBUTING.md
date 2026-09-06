# Contributing

## Layout

- `agents/`, `skills/`, `.mcp.json` — plugin components, distributed via the Claude Code plugin
- `.claude-plugin/` — plugin and marketplace manifests
- `scaffold/` — project payload materialized by `/mvp-init`: `INSTRUCTIONS.md` (becomes the
  project's `CLAUDE.md` on Claude / `AGENTS.md` on Codex), path-scoped `rules/`, curated
  `settings.json`
- `scripts/` — standalone installers (scaffold + full no-plugin mode)

Nothing in this repo is live pipeline configuration for the repo itself — the product is
the content.

## Content conventions

- Branches and commits follow scaffold/INSTRUCTIONS.md → Git Workflow → Conventions
- Content stays platform-universal: no Claude-only or Codex-only phrasing inside
  `agents/`, `skills/`, or `scaffold/INSTRUCTIONS.md`; platform differences live only in
  installers, manifests, and the `mvp-init` skill
- No `mcp__` scoped-tool literals anywhere outside `.mcp.json` — reference tools by
  function ("the sequential-thinking MCP tool")
- Skills reference their bundled files relative to the skill directory — never via
  `.claude/skills/...` paths (they do not exist under a plugin install)
- Frontmatter must be strict-YAML (quote values containing `: ` or starting with `[`)
- Agent frontmatter carries only `name`, `description`, `model`, `color`; skills carry
  `name`, `description`, optional `argument-hint` — no `tools:`, `skills:`, or
  `allowed-tools:` allowlists
