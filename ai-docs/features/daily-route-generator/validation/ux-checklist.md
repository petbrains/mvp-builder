# UX Checklist: Daily Route Generator

**Source**: ux.md

## Completeness

- [ ] CHK022 Is embedding failure handled by Next.js framework (not custom code)? [Completeness, Resolution: CHK022]
- [ ] CHK023 Is behavior documented for build interruption (SIGTERM/SIGINT)? [Completeness, ux.md: States & Transitions]
- [ ] CHK024 Is console output format standardized (prefix, timestamp, level)? [Completeness, ux.md: Core Actions]
- [ ] CHK025 Are all consumer integration contracts documented with exact export names? [Completeness, ux.md: Consumer Integration]

## Clarity

- [ ] CHK026 Is build timeout unnecessary for synchronous file operations? [Clarity, Resolution: CHK026]
- [ ] CHK027 Are console log message templates explicitly defined with placeholders? [Clarity, ux.md: Core Actions]
- [ ] CHK028 Is the "descriptive error" format specified with required components? [Clarity, ux.md: Error Presentation]

## Coverage

- [ ] CHK029 Are all scenario types covered: Primary, Alternate, Exception/Error, Recovery? [Coverage, ux.md: User Flow]
- [ ] CHK030 Are all 7 states (idle, loading, validating, generating, embedding, complete, failed) documented with entry/exit conditions? [Coverage, ux.md: States & Transitions]
- [ ] CHK031 Is recovery behavior defined after validation failure (retry possible?)? [Coverage, ux.md: Exit Path Behaviors]
- [ ] CHK032 Are all error types from Error Presentation covered by validation tests? [Coverage, ux.md → tasks.md]

## Edge Case

- [ ] CHK033 Is behavior defined for concurrent build invocations (race condition)? [Edge Case, ux.md: Platform-Specific Patterns]
- [ ] CHK034 Is behavior defined for read-only filesystem during embedding? [Edge Case, ux.md: permission_denied]
- [ ] CHK035 Is behavior defined when source JSON is valid but contains zero groups? [Edge Case, ux.md: ValidateGroups]
- [ ] CHK036 Is behavior defined for extremely large JSON files (memory limits)? [Edge Case, ux.md: loading state]

## Cross-Artifact

- [ ] CHK037 Do error message templates in ux.md match error assertions in TEST-032 to TEST-035? [Consistency, ux.md → tasks.md]
- [ ] CHK038 Are all state transitions (TEST-022 to TEST-028) covered in ux.md flow diagram? [Coverage, tasks.md → ux.md]
- [ ] CHK039 Do consumer integration imports match plan.md code organization exports? [Consistency, ux.md → plan.md]
- [ ] CHK040 Are exit path behaviors documented for all error states in flow diagram? [Coverage, ux.md: User Flow]
