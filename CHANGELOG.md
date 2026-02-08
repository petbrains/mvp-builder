# Changelog

All notable changes to MVP Builder will be documented in this file. The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [0.0.3] - 2025-02-08

### Added

**Hooks**
- `session-start.sh` — SessionStart hook auto-injects project context (HANDOFF + PRD + FEATURES + README) into Claude's context window. Zero tool calls on session start.

**Rules (CLAUDE.md)**
- Context Handoff: update HANDOFF.md after TDD cycles, keep max 2 previous entries
- Required Context: changed from "Load these documents" to "auto-loaded via SessionStart hook, read manually if not in context"
- AI Documentation Structure: added HANDOFF.md to graph

**Commands**
- `/docs:memory` — dual-mode: with feature path (existing behavior) or without arguments (full project rescan for changes outside feature scope)
- `/docs:plan` — Phase 0.2: conditional codebase scan via Code Analyzer skill before planning. Reuse existing modules, follow established patterns.

### Changed

**Commands**
- `/docs:plan` — removed inline bash from Phase 0.2, delegates fully to Code Analyzer skill

**Documentation**
- README.md: added Session Continuity section, HANDOFF.md in document structure, hook mention in installation
- README.md: updated Memory System principle with HANDOFF and SessionStart hook

## [0.0.2] - 2025-01-27

### Changed

**Rules (CLAUDE.md)**
- TDD: verify test fails for expected reason before implementation
- Verification Order: build → types → lint → tests sequence
- New Simplification section: minimal diff, fight complexity bias
- New Self-Check section: verify claims, no "should/probably" completions
- Plan Mode: concise plans with unresolved questions list

**Agents**
- `feature-fix`: added Quality Gates step before test suite

## [0.0.1] - 2025-12-19

### Added

**Commands**
- `/docs:prd` — Interactive PRD generation with validation
- `/docs:feature` — Feature specification from PRD or user input
- `/docs:clarify` — Targeted clarification dialogue for specs
- `/docs:ux` — Platform-aware UX specifications
- `/docs:plan` — Technical implementation planning with artifacts
- `/docs:tasks` — TDD task generation (INIT + RED-GREEN cycles)
- `/docs:validation` — Verification checklists with traceability
- `/docs:review` — Implementation review with feedback loop
- `/docs:memory` — Code map generation for session continuity

**Agents**
- `feature-setup` — Infrastructure scaffolding (INIT tasks)
- `feature-tdd` — TDD implementation (RED-GREEN cycles)
- `feature-fix` — Review-driven fixes (one error at a time)
- `/generate:agent` — Custom agent generation from task description

**Skills**
- `skills-registry` — Dynamic skill matching (see `.claude/skills/skills-registry/SKILL.md` for full list)

**Core**
- Document-Driven Development pipeline
- Full traceability (FR-XXX → TEST-XXX → IMPL-XXX → CHK → REV)
- Feedback loop with self-verification
- Skills Registry for automatic skill matching
- Cross-platform installation scripts (bash, PowerShell)

[0.0.3]: https://github.com/petbrains/mvp-builder/releases/tag/v0.0.3
[0.0.2]: https://github.com/petbrains/mvp-builder/releases/tag/v0.0.2
[0.0.1]: https://github.com/petbrains/mvp-builder/releases/tag/v0.0.1