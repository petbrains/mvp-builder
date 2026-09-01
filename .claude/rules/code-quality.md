# Code Quality Standards

Cross-platform standards. Platform rules (ios.md, frontend.md, backend.md) take precedence for platform-specific concerns.

## Error Handling

### Non-negotiable
- Empty catch blocks are forbidden — always log or rethrow
- Never silently return null/undefined/default on error without logging
- Catch blocks must be specific to expected error types — broad catches hide unrelated errors
- Every user-facing error must be actionable: what went wrong + what to do
- Fallback behavior must be explicit and justified — never mask the real problem
- Mock/fake implementations belong only in tests, never as production fallbacks

### Error Messages
- Non-technical language for users, technical details for developers
- Include relevant context (operation name, file, IDs)
- Specific enough to distinguish from similar errors

## Code Simplification

- No nested ternaries — use switch/if-else for multiple conditions
- Simplification preserves all functionality — only change how, never what

## Comments

- Every comment claim must match actual code (signatures, behavior, types)
- Edge cases mentioned must actually be handled; examples must match current implementation

## Type Design

### Principles
- Make illegal states unrepresentable
- Validate invariants at construction time
- Prefer compile-time guarantees over runtime checks
- Immutability simplifies invariant maintenance
- Constructor validation is crucial

### Anti-patterns
- Anemic domain models with no behavior
- Types exposing mutable internals
- Invariants enforced only through documentation
- External code responsible for maintaining type invariants
- Missing validation at construction boundaries