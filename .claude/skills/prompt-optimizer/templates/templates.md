# Prompt Templates

Essential templates optimized for Claude's code generation. Replace [BRACKETED] placeholders with your specifics.

## Core TCRO Template

The foundation for all optimized prompts:

```
Task: [Action verb + specific objective]
Context: [Where this fits in the system and why it's needed]
Requirements:
1. [Primary functional requirement]
2. [Technical constraint or pattern to follow]
3. [Quality standard or performance target]
4. [Edge case or error handling need]
Output: [Exact format expected - language, structure, extras]
```

## Feature Development

### Basic Feature
```
Task: Implement [FEATURE NAME] in [LOCATION].
Context: Adding to [SYSTEM/MODULE] to enable [PURPOSE].
Requirements:
1. [Core functionality]
2. Follow patterns in [EXAMPLE FILE]
3. Include error handling for [SCENARIOS]
4. Must integrate with [EXISTING SYSTEM]
Output: [LANGUAGE] code with [tests/docs/types]
```

### API Endpoint
```
Task: Create [METHOD] endpoint at [PATH] for [PURPOSE].
Context: Part of [SERVICE] API, called by [CONSUMER].
Request: {field: type, field2: type}
Response: {success: format, error: format}
Requirements:
1. Validate [SPECIFIC FIELDS]
2. Check [AUTHORIZATION TYPE]
3. Return [STATUS CODES] appropriately
4. Log [EVENTS]
Output: [FRAMEWORK] implementation with error handling
```

### React Component
```
Task: Create [COMPONENT] for [PURPOSE].
Context: Used in [PARENT/PAGE] as part of [FEATURE].
Props: {propName: type - description}
Requirements:
1. Handle [USER INTERACTIONS]
2. Show loading/error/empty states
3. Responsive with [BREAKPOINTS]
4. Accessibility: [ARIA/keyboard/focus]
Output: TypeScript component using [STYLING APPROACH]
```

## Debugging

### With Error Message
```
Task: Fix error in [LOCATION/FUNCTION].
Context: Fails when [CONDITION] during [OPERATION].
Error: "[EXACT ERROR MESSAGE]"
Stack trace: [KEY LINES]
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
Context: Currently takes [TIME] for [OPERATION SIZE].
Target: Reduce to <[TARGET TIME]
Bottleneck: [SUSPECTED ISSUE]
Requirements:
1. Profile actual bottleneck
2. Maintain exact functionality
3. Document optimization approach
4. Add performance tests
Output: Optimized code with before/after metrics
```

## Testing

### Unit Tests
```
Task: Write tests for [CLASS/FUNCTION] in [FILE].
Context: [PURPOSE OF CODE BEING TESTED]
Requirements:
1. Test happy path: [SCENARIO]
2. Test edge cases: [LIST]
3. Test error conditions: [LIST]
4. Coverage target: [PERCENTAGE]
Framework: [JEST/MOCHA/PYTEST]
Output: Complete test file with descriptive names
```

## Refactoring

### Code Cleanup
```
Task: Refactor [FILE/MODULE] for [readability/performance/maintainability].
Context: Current code has [ISSUES].
Requirements:
1. Maintain API compatibility
2. Improve [SPECIFIC ASPECTS]
3. All existing tests must pass
4. Follow [STYLE GUIDE]
Output: Refactored code with change summary
```

## Complex Multi-Phase Template

For architecture or large features:

```
=== PHASE 1: ANALYZE ===
Task: Analyze [SYSTEM] to understand current implementation.
Focus: Architecture, patterns, dependencies.
Output: Summary of findings.

=== PHASE 2: DESIGN ===
Task: Design solution for [REQUIREMENT].
Constraints: [TECHNICAL/BUSINESS LIMITS]
Output: Detailed plan with trade-offs.

=== PHASE 3: IMPLEMENT ===
Task: Build according to approved design.
Priority: [CRITICAL PATH FIRST]
Output: Working implementation.

=== PHASE 4: VERIFY ===
Task: Test and document the solution.
Output: Tests passing, documentation complete.
```

## Quick Optimization Patterns

### Adding Constraints
```
DO NOT use [DEPRECATED THING]
AVOID [ANTI-PATTERN]
NEVER [SECURITY RISK]
MUST [REQUIREMENT]
ENSURE [QUALITY STANDARD]
```

### Specifying Output
```
Output: Python 3.11+ with type hints
Output: React component with Tailwind CSS
Output: SQL query optimized for PostgreSQL 15
Output: Working code only, no explanations
Output: Code with inline comments explaining logic
```

### Providing Context
```
Context: Part of e-commerce checkout flow
Context: Microservice handling 10K req/sec
Context: Legacy system migration, must be backwards compatible
Context: Startup MVP, prioritize speed over perfection
Context: Financial system, prioritize accuracy and audit trail
```

## Usage Tips

1. **Be Specific**: Replace all [PLACEHOLDERS] with actual values
2. **Add Examples**: Include sample input/output when helpful
3. **Set Boundaries**: Always specify what NOT to do
4. **Measure Success**: Use numbers, not adjectives
5. **One Task**: Never combine multiple objectives

## Combining Templates

Stack templates for comprehensive solutions:
```
[Bug Fix Template]
+ "Also write regression tests"
+ "Update documentation"
= Complete fix with tests and docs
```

Remember: The more specific the prompt, the better the output. Remove ambiguity, add constraints, specify exactly what you want.