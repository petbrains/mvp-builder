---
description: "Start a new feature by creating a specification and feature branch. This is the first step in the Spec-Driven Development lifecycle."
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking
---

Start a new feature by creating a specification and feature branch.

This is the first step in the Spec-Driven Development lifecycle.

**Tools Usage:**
- See @.claude/tools/sequential-thinking.md for iterative analysis with hypothesis generation and verification
- `Write`: For incremental PRD saving after each stage
- `Read`: For loading current PRD state before updates

Given the feature description provided as an argument, do this:

1. Run the script `.claude/scripts/create-new-feature.sh --json "{ARGS}"` from repo root and parse its JSON output for BRANCH_NAME and SPEC_FILE. All file paths must be absolute.
2. Load @.claude/templates/spec-template.md to understand required sections.
3. Write the specification to SPEC_FILE using the template structure, replacing placeholders with concrete details derived from the feature description (arguments) while preserving section order and headings.
4. Report completion with branch name, spec file path, and readiness for the next phase.

Note: The script creates and checks out the new branch and initializes the spec file before writing.