# Changelog

All notable changes to MVP Builder will be documented in this file. The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

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

[0.0.1]: https://github.com/petbrains/mvp-builder/releases/tag/v0.0.1