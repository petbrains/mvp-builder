---
name: prompt-optimizer
description: Advanced prompt engineering framework for Claude and Claude Code. Use when crafting prompts for code generation, debugging, documentation, or any development task. Provides structured templates (TCRO), phase-based workflows, and proven patterns that improve code generation accuracy by 20-45%. Especially useful for creating new prompts for coding tasks, improving existing prompts that aren't getting desired results, structuring complex multi-step development workflows, and debugging prompt issues and pattern drift.
---

# Prompt Optimizer

A streamlined framework for optimizing prompts to maximize Claude's code generation capabilities.

## Core Optimization Process

When given a prompt to optimize, follow these steps:

### 1. Identify Intent and Mode
Determine the primary goal and ensure single-mode operation:
- **Build**: Creating new functionality
- **Debug**: Fixing problems
- **Refactor**: Improving existing code
- **Learn**: Understanding concepts

Never mix modes - this reduces quality by 15-30%.

### 2. Apply TCRO Structure

Transform any prompt into this optimal format:

```
Task: [Single-line action statement - start with imperative verb]
Context: [System context, dependencies, and why this is needed]
Requirements:
1. [Specific functional requirement]
2. [Technical constraint or pattern]
3. [Quality standard to maintain]
4. [Edge cases to handle]
Output: [Expected format - code only, with tests, with docs]
```

### 3. Enhance with Power Patterns

#### Negative Constraints (Highly Effective)
Add explicit "DO NOT" statements:
- DO NOT use deprecated APIs
- AVOID nested loops exceeding O(n²)
- NEVER expose secrets in logs

#### XML Structure for Complex Requirements
```xml
<task>Primary objective</task>
<constraints>
  <performance>Max 200ms response</performance>
  <security>Input validation required</security>
</constraints>
<output>TypeScript with JSDoc</output>
```

#### Phase Separation for Complex Tasks
For tasks >500 lines or requiring architecture decisions:
```
Phase 1: Read [files]. Analyze current implementation.
Phase 2: Create detailed plan with architecture decisions.
Phase 3: Implement according to plan.
Phase 4: Verify and commit with descriptive message.
```

### 4. Optimize Language Patterns

#### Remove Ambiguity
- **Bad**: "Make it better"
- **Good**: "Reduce time complexity from O(n²) to O(n log n)"

#### Use Direct Commands
- **Bad**: "Could you please help..."
- **Good**: "Implement..."

#### Specify Concrete Metrics
- **Bad**: "Fast performance"
- **Good**: "Response time <100ms for 1000 records"

### 5. Add Essential Context

Always include:
- Technology stack and version
- File paths and relationships
- Existing patterns to follow
- Performance/security requirements
- Example of expected output (when helpful)

## Quick Optimization Examples

### Before:
"Can you help me create a login form that looks nice and works well?"

### After:
```
Task: Implement React login form with email/password authentication.
Context: Part of user authentication flow in Next.js 14 app using App Router.
Requirements:
1. Email validation (RFC 5322 compliant)
2. Password minimum 8 characters with complexity check
3. Show inline validation errors
4. Handle loading/error/success states
5. Responsive design using Tailwind CSS
Output: TypeScript component with error handling and ARIA labels
```

### Before:
"Fix the bug in the payment processing"

### After:
```
Task: Fix payment validation error in checkout flow.
Context: Occurs when processing amounts >$999.99 in PaymentProcessor class.
Error: "Invalid amount format" thrown at line 156
Requirements:
1. Handle currency amounts up to $999,999.99
2. Maintain decimal precision
3. Preserve existing validation for other fields
4. Add unit tests for edge cases
Output: Fixed code with tests for boundary values
```

## Validation Checklist

After optimization, verify:
- [ ] Single, clear task (not mixed modes)
- [ ] Imperative verb starts the task
- [ ] Measurable requirements (not "good" or "nice")
- [ ] Technology stack specified
- [ ] Output format explicit
- [ ] Constraints clearly stated
- [ ] No ambiguous terms

## Common Pitfalls to Fix

1. **Politeness Overhead**: Remove "please", "could you", "would you mind"
2. **Vague Quality Terms**: Replace "good", "proper", "nice" with specifics
3. **Missing Context**: Add file locations, dependencies, tech stack
4. **Implicit Requirements**: Make all assumptions explicit
5. **Mixed Objectives**: Split into separate prompts

## Templates Reference

See `templates/templates.md` for ready-to-use templates covering:
- Feature development
- Bug fixing
- Testing
- Refactoring
- Documentation

- API development
- Database operations

## Usage

When a user asks to optimize a prompt:

1. Analyze their original prompt
2. Identify what's missing or unclear
3. Apply TCRO structure
4. Add necessary constraints and context
5. Present the optimized version
6. Explain key improvements made

The goal is to transform vague requests into precise, actionable specifications that produce consistent, high-quality code output.