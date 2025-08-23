---
allowed-tools: mcp__sequential-thinking
argument-hint: [prompt]
description: Creates custom commands with specific structures and workflows
---

## Your task

Transform natural-language descriptions into properly structured Claude Code commands. Based on [prompt], create a new command file with complete documentation, validation rules, and implementation logic following the established command structure template.

The command will analyze the requirements, determine necessary MCP tools, and generate a complete command markdown file with all required sections including metadata, task description, interactive mode behavior, validation rules, and usage examples.

---

## No Prompt / Help Mode

If you run `/command` with **no prompt** (i.e., just `/command` or only whitespace), display this help message:

**Purpose:** Create custom Claude Code commands from natural language descriptions

**Usage:** `/command [description of what the command should do]`

**Quick examples:**
- `/command create deploy command for kubernetes`
- `/command build test runner with coverage reports`
- `/command setup database migration tool`
- `/command make API endpoint generator`
- `/command create git workflow automation`

**What gets created:**
- A complete `.md` file with the command specification
- Proper metadata and tool declarations
- Interactive mode for ambiguous inputs
- Validation and safety rules
- Usage examples and documentation

---

## Interactive Mode

The command creation process follows these three essential steps:

### Step 1: Pre-check
- **Validate prompt clarity:** If the prompt is ambiguous, ask for clarification:
  ```
  "I need more details to create the command properly:
  1. What should this command do specifically?
  2. What tools/MCP servers will it use?
  3. What parameters should it accept?
  4. What validation rules are needed?
  
  Please provide details or I can guide you through each step."
  ```
- **Check for existing commands:** Verify the command name doesn't conflict with existing ones
- **Determine required tools:** 
  - If user specifies tools, validate they exist
  - If not specified, analyze requirements and suggest appropriate MCP tools
  - Confirm tool selection with user if uncertain

### Step 2: Command Generation
- **Create command structure:** Generate the complete markdown file with all required sections
- **Define metadata:** Set allowed-tools, argument-hint, and description
- **Implement core logic:** Write the task description and workflow steps
- **Add validation rules:** Include input validation and safety checks
- **Generate examples:** Create 2-3 practical usage examples
- **Set naming convention:** Follow pattern: `command_name.md` (use underscores in filenames)

### Step 3: Post-check
- **Verify completeness:** Ensure all required sections are present:
  - Metadata header with tools and description
  - Your task section with detailed instructions
  - No Prompt / Help Mode section
  - Interactive Mode (if applicable)
  - Examples section
- **Create the file:** Save as `command_name.md` in appropriate directory
- **Output success message with usage:**
  ```
  ✅ Command successfully created: command_name.md
  
  To use your new command:
  /command_name [arguments]
  
  Examples:
  /command_name example-arg-1
  /command_name "complex argument with spaces"
  
  Run '/command_name' without arguments to see help.
  ```

---

## Rules

### Command Structure Requirements
Every generated command must include:

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
[Behavior for ambiguous inputs - include if command needs clarification]

## Rules (optional)
[Specific rules for the command domain - e.g., naming conventions, formats]

## Security & Compliance (optional)
[Safety guards and restrictions]

## Examples
[2-3 practical usage examples]
```

### Naming Conventions
- **Command names:** Use clear action verbs or domain-specific terms
- **File names:** Use underscores (e.g., `deploy_k8s.md`, `test_runner.md`)
- **Forbidden names:** help, exit, quit, clear, system reserved words
- **Format:** Lowercase, no spaces, hyphens allowed in command names

---

## Security & Compliance

### Prohibited Actions
- **Never create commands that:**
  - Access system-level operations without explicit permission
  - Bypass authentication or authorization
  - Modify critical system files
  - Execute arbitrary code without validation
  - Store or transmit sensitive data insecurely

### Required Safety Measures
- **Input validation:** All commands must validate and sanitize inputs
- **Tool restrictions:** Only use explicitly declared MCP tools
- **Error handling:** Include proper error messages and recovery
- **Audit logging:** Commands modifying data should log actions
- **Permission checks:** Verify user has required access rights

### Compliance Standards
- Follow organizational security policies
- Respect data classification requirements
- Implement principle of least privilege
- Maintain command versioning for auditing
- Document all external dependencies

---

## Examples

```xml
<example id="create-deploy-command" kind="creation">
  <title>Create Kubernetes deployment command</title>
  <command>/command create kubernetes deployment automation with rollback support</command>
  <creates>
    <file>deploy_k8s.md</file>
    <structure>
      - Metadata with mcp__kubernetes tools
      - Deployment workflow steps
      - Rollback procedures
      - Health check validations
      - Security constraints
    </structure>
  </creates>
  <output>
    ✅ Command successfully created: deploy_k8s.md
    
    To use: /deploy-k8s [environment] [version]
    Example: /deploy-k8s production v1.2.3
  </output>
</example>
```

```xml
<example id="create-test-command" kind="creation">
  <title>Create test runner with coverage</title>
  <command>/command setup automated test runner with coverage reports</command>
  <creates>
    <file>test_runner.md</file>
    <structure>
      - Metadata with mcp__testing tools
      - Test discovery patterns
      - Coverage thresholds
      - Report generation
      - CI/CD integration
    </structure>
  </creates>
  <output>
    ✅ Command successfully created: test_runner.md
    
    To use: /test-runner [test-suite] [options]
    Example: /test-runner unit --coverage --report
  </output>
</example>
```

```xml
<example id="create-api-command" kind="creation">
  <title>Create API endpoint generator</title>
  <command>/command build REST API generator with OpenAPI validation</command>
  <creates>
    <file>api_generator.md</file>
    <structure>
      - Metadata with mcp__api tools
      - OpenAPI schema validation
      - CRUD operation templates
      - Authentication methods
      - Rate limiting rules
    </structure>
  </creates>
  <output>
    ✅ Command successfully created: api_generator.md
    
    To use: /api-generator [resource] [operations]
    Example: /api-generator users CRUD
  </output>
</example>
```

---