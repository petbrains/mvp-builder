---
allowed-tools: mcp__command_builder
argument-hint: [prompt]
description: Creates custom commands with specific structures and workflows
---

## Your task

Based on the instructions described in the context and rules described below, create new commands with proper structure and documentation via mcp__command_builder based on [prompt].

**For detailed workflow rules:** See @.claude/tools/command.md for command structure conventions, template requirements, and implementation standards.

---

## No Prompt / Help Mode

If you run `/command` with **no prompt** (i.e., just `/command` or only whitespace), Claude Code will show a concise help message explaining the command's purpose and how to use it, plus quick examples.

**Purpose:** Transform natural-language descriptions into properly structured Claude Code commands with documentation, validation rules, and implementation logic via **mcp__command_builder**, following established patterns.

**Quick examples:**
- `/command create deploy command for kubernetes`
- `/command build test runner with coverage reports`
- `/command setup database migration tool`
- `/command make API endpoint generator`

---

## Interactive Mode

When /command encounters ambiguous prompts, it enters interactive mode:
/command create new automation tool

```
"I need more details to create the command properly:
1. What should this command automate?
2. What tools/MCP servers will it use?
3. What parameters should it accept?
4. What validation rules are needed?

Please provide details or I can guide you through each step."
```

This ensures commands are created with complete specifications.

---

## Command Structure Template

Every command must include these sections:

```markdown
---
allowed-tools: [mcp_server_names]
argument-hint: [expected_arguments]
description: Brief description of command purpose
---

## Your task
[Main task description based on prompt]

## No Prompt / Help Mode
[Help text when no arguments provided]

## Interactive Mode
[Behavior for ambiguous inputs]

## Core Functionality
[What the command does]

## Validation Rules
[Input validation and safety checks]

## Safety Guards
[Protection mechanisms]

## Examples
[Usage examples with expected outcomes]
```

---

## Command Naming Conventions

Commands must follow these patterns:
- **Action-based:** Use clear verbs (e.g., `/create`, `/deploy`, `/analyze`)
- **Domain-specific:** Include context (e.g., `/db-migrate`, `/api-test`)
- **Composite:** Combine action and target (e.g., `/generate-schema`)

**Forbidden names:**
- System reserved: `help`, `exit`, `quit`, `clear`
- Single letters: `a`, `b`, `c` (except established ones like `q` for query)
- Special characters: no spaces, symbols except hyphens
- Conflicting: existing command names

---

## Required Command Components

### Metadata Section
```yaml
allowed-tools: # MCP servers required
argument-hint: # Expected input format
description: # One-line purpose
version: # Semantic version
author: # Creator identifier
tags: # Categories for discovery
```

### Behavior Definitions
1. **Default behavior** - No arguments provided
2. **Standard execution** - With expected arguments
3. **Error handling** - Invalid inputs or failures
4. **Edge cases** - Unusual but valid scenarios
5. **Interactive mode** - Ambiguous inputs

### Validation Rules
- **Input format** - Regex patterns, type checking
- **Parameter limits** - Min/max values, string lengths
- **Dependency checks** - Required tools/files
- **Permission validation** - Access rights needed
- **State verification** - Pre-conditions check

---

## Command Types

### Data Processing Commands
- Input/output specifications
- Transformation rules
- Format validations
- Error recovery

### Workflow Commands
- Step definitions
- Branching logic
- Rollback procedures
- Progress tracking

### Integration Commands
- API endpoints
- Authentication methods
- Rate limiting
- Response handling

### Utility Commands
- Single-purpose tools
- Configuration management
- Status reporting
- Cleanup operations

---

## MCP Tool Integration

### Tool Declaration
```yaml
allowed-tools:
  - mcp__filesystem  # File operations
  - mcp__git         # Version control
  - mcp__database    # Data queries
  - mcp__api         # External services
```

### Tool Usage Patterns
- Sequential execution
- Parallel operations
- Conditional tool selection
- Fallback strategies
- Tool chaining

---

## Safety and Security

### Input Sanitization
- Escape special characters
- Validate against injection
- Check file paths
- Verify URLs
- Sanitize command arguments

### Permission Checks
- User authorization
- Resource access rights
- Operation permissions
- Scope limitations
- Audit logging

### Resource Protection
- Rate limiting
- Memory constraints
- CPU usage limits
- Network restrictions
- Storage quotas

---

## Error Handling

### Error Categories
1. **Input errors** - Invalid arguments or format
2. **Permission errors** - Insufficient access rights
3. **Resource errors** - Missing files or connections
4. **Logic errors** - Business rule violations
5. **System errors** - Infrastructure failures

### Error Response Format
```json
{
  "error_type": "category",
  "message": "Human-readable description",
  "details": "Technical information",
  "suggestion": "How to resolve",
  "code": "ERROR_CODE"
}
```

---

## Documentation Standards

### Required Documentation
- **Purpose statement** - What problem it solves
- **Usage instructions** - How to use the command
- **Parameter descriptions** - Each argument explained
- **Examples** - Real-world usage scenarios
- **Troubleshooting** - Common issues and solutions

### Example Format
```xml
<example id="unique-id" type="category">
  <title>Descriptive title</title>
  <command>/command-name parameters</command>
  <description>What this does</description>
  <expected-output>Result description</expected-output>
  <notes>Additional context</notes>
</example>
```

---

## Testing Requirements

### Test Coverage
- **Happy path** - Normal successful execution
- **Edge cases** - Boundary conditions
- **Error paths** - Failure scenarios
- **Integration** - With other commands
- **Performance** - Load and stress testing

### Validation Checklist
- [ ] Command executes without arguments
- [ ] Help text is clear and complete
- [ ] Interactive mode handles ambiguity
- [ ] Error messages are helpful
- [ ] Examples work as documented
- [ ] Safety guards prevent misuse

---

## Versioning and Updates

### Version Schema
- **Major:** Breaking changes (1.0.0 → 2.0.0)
- **Minor:** New features (1.0.0 → 1.1.0)
- **Patch:** Bug fixes (1.0.0 → 1.0.1)

### Update Process
1. Document changes in changelog
2. Update version in metadata
3. Test backward compatibility
4. Update documentation
5. Notify users of changes

---

## Examples

```xml
<example id="create-api-command" kind="creation">
  <title>Create API endpoint generator</title>
  <command>/command create REST API generator with OpenAPI support</command>
  <creates>
    <file>api-generator.md</file>
    <structure>
      - Metadata with mcp__api tools
      - OpenAPI schema validation
      - CRUD operation templates
      - Authentication handling
      - Rate limiting rules
    </structure>
  </creates>
  <features>
    <feature>Auto-generates endpoints from schemas</feature>
    <feature>Includes validation middleware</feature>
    <feature>Creates test suites</feature>
  </features>
</example>
```

```xml
<example id="create-deploy-command" kind="creation">
  <title>Create deployment automation</title>
  <command>/command build kubernetes deployment tool with rollback</command>
  <creates>
    <file>deploy-k8s.md</file>
    <structure>
      - Metadata with mcp__kubernetes
      - Deployment strategies
      - Health check definitions
      - Rollback procedures
      - Secret management
    </structure>
  </creates>
  <safety>
    <check>Validates manifests</check>
    <check>Dry-run before apply</check>
    <check>Automatic rollback on failure</check>
  </safety>
</example>
```

```xml
<example id="create-test-command" kind="creation">
  <title>Create test runner command</title>
  <command>/command setup test runner with coverage and reporting</command>
  <creates>
    <file>test-runner.md</file>
    <structure>
      - Metadata with mcp__test_framework
      - Test discovery patterns
      - Coverage thresholds
      - Report generation
      - CI/CD integration
    </structure>
  </creates>
  <outputs>
    <output>Coverage reports in HTML/JSON</output>
    <output>Test results in JUnit format</output>
    <output>Performance metrics</output>
  </outputs>
</example>
```

---

## Command Registry

Commands created with `/command` are automatically:
- Registered in the command index
- Validated against existing commands
- Tagged for discoverability
- Versioned for tracking
- Documented in help system

---

## Best Practices

1. **Single Responsibility** - Each command does one thing well
2. **Clear Naming** - Self-descriptive command names
3. **Comprehensive Help** - Users shouldn't need external docs
4. **Graceful Degradation** - Handle missing tools elegantly
5. **Progressive Disclosure** - Simple by default, powerful when needed
6. **Consistent Patterns** - Follow established conventions
7. **Useful Defaults** - Work without configuration when possible

---