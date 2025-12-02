# Prompt Templates

Ready-to-use templates for Claude Code. Replace [BRACKETED] placeholders.

## Core TCRO Template

```
Task: [Action verb + specific objective]
Context: [Where this fits, why needed]
Requirements:
1. [Primary functional requirement]
2. [Technical constraint or pattern]
3. [Quality standard or performance target]
4. [Edge case or error handling]
Output: [Exact format - language, structure, extras]
```

## Feature Development

### Basic Feature
```
Task: Implement [FEATURE] in [LOCATION].
Context: Adding to [MODULE] to enable [PURPOSE].
Requirements:
1. [Core functionality]
2. Follow patterns in [EXAMPLE FILE]
3. Error handling for [SCENARIOS]
4. Integrate with [EXISTING SYSTEM]
Output: [LANGUAGE] with [tests/docs/types]
```

### API Endpoint
```
Task: Create [METHOD] endpoint at [PATH].
Context: Part of [SERVICE] API, called by [CONSUMER].
Request: {field: type}
Response: {success: format, error: format}
Requirements:
1. Validate [FIELDS]
2. Check [AUTH TYPE]
3. Return [STATUS CODES]
4. Log [EVENTS]
Output: [FRAMEWORK] implementation with error handling
```

### React Component
```
Task: Create [COMPONENT] for [PURPOSE].
Context: Used in [PARENT] as part of [FEATURE].
Props: {propName: type - description}
Requirements:
1. Handle [INTERACTIONS]
2. Loading/error/empty states
3. Responsive: [BREAKPOINTS]
4. A11y: [ARIA/keyboard/focus]
Output: TypeScript with [STYLING]
```

## Debugging

### With Error Message
```
Task: Fix error in [LOCATION].
Context: Fails when [CONDITION] during [OPERATION].
Error: "[EXACT MESSAGE]"
Stack: [KEY LINES]
Requirements:
1. Find root cause
2. Fix without breaking [DEPENDENCIES]
3. Add guards to prevent recurrence
4. Preserve [EXISTING BEHAVIOR]
Output: Fixed code with explanation
```

### Performance Issue
```
Task: Optimize [FUNCTION/QUERY] performance.
Context: Currently [TIME] for [SIZE]. Target: <[TARGET].
Bottleneck: [SUSPECTED]
Requirements:
1. Profile actual bottleneck
2. Maintain functionality
3. Document approach
4. Add performance tests
Output: Optimized code with before/after metrics
```

## Testing

### Unit Tests
```
Task: Write tests for [FUNCTION] in [FILE].
Context: [PURPOSE OF CODE]
Requirements:
1. Happy path: [SCENARIO]
2. Edge cases: [LIST]
3. Error conditions: [LIST]
4. Coverage: [PERCENTAGE]
Framework: [JEST/PYTEST/etc]
Output: Complete test file with descriptive names
```

## Refactoring

### Code Cleanup
```
Task: Refactor [FILE] for [readability/performance/maintainability].
Context: Current issues: [PROBLEMS].
Requirements:
1. Maintain API compatibility
2. Improve [ASPECTS]
3. All tests must pass
4. Follow [STYLE GUIDE]
Output: Refactored code with change summary
```

## Multi-Phase (Complex Tasks)

For >500 LOC or architecture decisions:

```
=== PHASE 1: ANALYZE ===
Task: Analyze [SYSTEM] implementation.
Focus: Architecture, patterns, dependencies.
Output: Summary of findings.

=== PHASE 2: DESIGN ===
Task: Design solution for [REQUIREMENT].
Constraints: [LIMITS]
Output: Detailed plan with trade-offs.

=== PHASE 3: IMPLEMENT ===
Task: Build according to approved design.
Priority: [CRITICAL PATH]
Output: Working implementation.

=== PHASE 4: VERIFY ===
Task: Test and document solution.
Output: Tests passing, docs complete.
```

## Constraint Patterns

### Negative Constraints
```
DO NOT use [DEPRECATED]
AVOID [ANTI-PATTERN]
NEVER [SECURITY RISK]
MUST [REQUIREMENT]
ENSURE [STANDARD]
```

### Output Specifications
```
Output: Python 3.11+ with type hints
Output: React + Tailwind CSS
Output: SQL optimized for PostgreSQL 15
Output: Working code only, no explanations
Output: Code with inline comments
```

### Context Patterns
```
Context: E-commerce checkout flow
Context: Microservice, 10K req/sec
Context: Legacy migration, backwards compatible
Context: MVP, prioritize speed
Context: Financial system, audit trail required
```

## Combining Templates

Stack for comprehensive solutions:

```
[Bug Fix Template]
+ "Also write regression tests"
+ "Update documentation"
= Complete fix with tests and docs
```