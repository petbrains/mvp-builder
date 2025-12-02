---
name: prompt-optimizer
description: Prompt engineering framework for Claude Code. Transforms vague requests into precise TCRO-structured prompts. Use when: crafting prompts for code generation, improving prompts not getting results, structuring multi-step workflows, debugging pattern drift. Triggers: optimize prompt, improve prompt, create prompt, prompt engineering, TCRO, prompt template, better prompt.
---

# Prompt Optimizer

Transform vague requests into precise, actionable prompts using TCRO structure.

**Templates:** See @.claude/skills/prompt-optimizer/references/templates.md when applying structure or selecting template by task type.

## Process

**IDENTIFY → STRUCTURE → ENHANCE → VALIDATE**

## Step 1: Identify Mode

Determine single mode (mixing reduces quality 15-30%):

| Mode | Intent | Indicators |
|------|--------|------------|
| Build | Create new | "implement", "create", "add" |
| Debug | Fix problem | "fix", "error", "broken" |
| Refactor | Improve existing | "improve", "optimize", "clean" |
| Learn | Understand | "explain", "how does", "why" |

**Rule:** One prompt = One mode. Split if mixed.

## Step 2: Apply TCRO Structure

Transform any prompt into:

```
Task: [Imperative verb + specific objective]
Context: [System, dependencies, why needed]
Requirements:
1. [Functional requirement]
2. [Technical constraint]
3. [Quality standard]
4. [Edge cases]
Output: [Exact format expected]
```

Select specific template from @.claude/skills/prompt-optimizer/references/templates.md based on task type.

## Step 3: Enhance

### Add Negative Constraints
```
DO NOT use deprecated APIs
AVOID complexity > O(n²)
NEVER expose secrets in logs
```

### Add Phase Separation
Use for tasks >500 lines or requiring architecture decisions:
```
Phase 1: Analyze current implementation
Phase 2: Create detailed plan
Phase 3: Implement according to plan
Phase 4: Verify and test
```

### Specify Metrics
Replace vague terms with concrete values:
- "fast" → "<100ms for 1000 records"
- "scalable" → "handle 10K concurrent users"
- "secure" → "OWASP Top 10 compliant"

## Step 4: Validate

Check before delivering:

- [ ] Single mode (not mixed objectives)
- [ ] Imperative verb starts Task
- [ ] Measurable requirements (no "good", "nice")
- [ ] Tech stack specified
- [ ] Output format explicit
- [ ] Constraints stated

## Decision Rules

### Template Selection

| Task Type | Template |
|-----------|----------|
| New feature | Feature Development |
| API work | API Endpoint |
| UI work | React Component |
| Bug | Debugging |
| Slow code | Performance |
| Tests | Testing |
| Cleanup | Refactoring |
| Large scope (>500 LOC) | Multi-Phase |

### Complexity Escalation

- Simple task → Basic TCRO
- Multiple concerns → Add constraints
- Large scope → Multi-phase template
- Architecture decision → Phase 1 = Analysis only

## Example

### Before
"Create a login form that works well"

### After
```
Task: Implement React login form with email/password authentication.
Context: Next.js 14 App Router, part of auth flow.
Requirements:
1. Email validation (RFC 5322)
2. Password min 8 chars with complexity
3. Inline validation errors
4. Loading/error/success states
5. Tailwind CSS, responsive
Output: TypeScript component with ARIA labels
```

## Usage

When optimizing a prompt:

1. Identify mode and complexity
2. Select template from references
3. Apply TCRO structure
4. Add constraints and context
5. Validate against checklist
6. Explain key improvements