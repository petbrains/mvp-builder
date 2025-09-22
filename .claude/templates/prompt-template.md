# Universal Claude Code Prompt Template

```xml
<context>
[Project tech stack, constraints, existing patterns, file structure]
</context>

<task>
[Clear, specific description of what needs to be accomplished]
</task>

<instructions>
1. [Step 1: Research/analyze existing code]
2. [Step 2: Plan the implementation approach]
3. [Step 3: Implement the solution]
4. [Step 4: Add tests and validation]
5. [Step 5: Verify and commit]
</instructions>

<requirements>
- [Specific technical requirement or constraint]
- [Performance or quality metric to meet]
- [Security or compliance consideration]
- [Testing coverage or validation needed]
</requirements>

<examples>
GOOD: [Brief example of preferred pattern]
BAD: [Brief example of anti-pattern to avoid]
</examples>

<success_criteria>
- [Measurable outcome 1]
- [Measurable outcome 2]
- [Measurable outcome 3]
</success_criteria>

<thinking>
Consider: [Key questions or trade-offs to evaluate before implementing]
</thinking>
```

## Field Descriptions

- **context**: Project-specific information Claude needs to know
- **task**: The specific objective to accomplish
- **instructions**: Step-by-step execution plan (numbered list)
- **requirements**: Non-negotiable constraints and standards
- **examples**: Good/bad patterns for clarity (optional but recommended)
- **success_criteria**: How to measure if the task is complete
- **thinking**: Prompts deeper reasoning for complex problems