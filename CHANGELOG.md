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
- `/generate:agent` — Custom agent generation

**Agents**
- `feature-setup` — Infrastructure scaffolding (INIT tasks)
- `feature-tdd` — TDD implementation (RED-GREEN cycles)
- `feature-fix` — Review-driven fixes (one error at a time)

**Skills**
- `sequential-thinking` — Structured reasoning with state verification
- `feature-analyzer` — Feature artifact loading
- `code-analyzer` — Codebase structure analysis
- `context7` — Library documentation retrieval
- `self-commenting` — AICODE-* markers for cross-session memory
- `git` — Branch management and secret protection
- `agent-creator` — Agent template generation
- `self-improve` — Intent interpretation
- `prompt-optimizer` — TCRO format structuring

**Core**
- Document-Driven Development pipeline
- Full traceability (FR-XXX → TEST-XXX → IMPL-XXX → CHK → REV)
- Feedback loop with self-verification
- Skills matching via `skills-rules.json`
- Cross-platform installation scripts (bash, PowerShell)

[0.0.1]: https://github.com/petbrains/mvp-builder/releases/tag/v0.0.1