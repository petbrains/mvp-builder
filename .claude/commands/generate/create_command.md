---
name: generate_command
description: Creates custom commands with specific structures and workflows
allowed-tools: Read, Write, mcp__sequential-thinking
argument-hints: [prompt]
---

# Instructions

Transform natural-language descriptions into properly structured Claude Code commands. Based on [prompt], create a new command file with complete documentation, validation rules, and implementation logic following the established command structure template.

The command will analyze the requirements, determine necessary MCP tools, and generate a complete command markdown file with all required sections including metadata, task description, interactive mode behavior, validation rules, and usage examples.

**Tools Usage:**
- See @.claude/tools/sequential-thinking.md for iterative analysis with hypothesis generation and verification

## Usage

```
/generate:create_command [description of what the command should do]
```

If `[prompt]` provided - creates command based on description.
No prompt - displays help and usage examples.

## Execution

### 1. No Prompt / Help Mode

If run with **no prompt** (i.e., just `/generate:create_command` or only whitespace), display:

**Purpose:** Create custom Claude Code commands from natural language descriptions

**Quick examples:**
- `/generate:create_command create deploy command for kubernetes`
- `/generate:create_command build test runner with coverage reports`
- `/generate:create_command setup database migration tool`
- `/generate:create_command make API endpoint generator`
- `/generate:create_command create git workflow automation`

**What gets created:**
- A complete `.md` file with the command specification
- Proper metadata and tool declarations
- Execution workflow and documentation
- Usage examples and validation rules

### 2. Interactive Mode

The command creation process follows these essential steps:

#### Pre-check
- **Validate prompt clarity:** If the prompt is ambiguous, ask for clarification:
  ```
  "I need more details to create the command properly:
  1. What should this command do specifically?
  2. What tools/MCP servers will it use?
  3. What parameters should it accept?
  4. What validation rules are needed?
  
  Please provide details or I can guide you through each step."
  ```
- **Check for existing commands:** Verify the command name doesn't conflict
- **Determine required tools:** Analyze requirements and suggest appropriate MCP tools

#### Command Generation
Use `/mcp__sequential-thinking__sequentialthinking` to analyze:

```
1. Parse requirements:
   - Core functionality needed
   - Required MCP tools
   - Input parameters
   - Output format

2. Design command structure:
   - Command name (action-oriented)
   - Metadata configuration
   - Execution workflow
   - Validation requirements

3. Generate command file:
   - Complete markdown structure
   - All required sections
   - Usage examples
```

#### Post-check
- **Verify completeness:** Ensure all required sections are present
- **Create the file:** Save as `command_name.md` in appropriate directory
- **Output success message:**
  ```
  ✅ Command successfully created: command_name.md
  
  To use your new command:
  /command_name [arguments]
  
  Examples:
  /command_name example-arg-1
  /command_name "complex argument with spaces"
  
  Run '/command_name' without arguments to see help.
  ```

## Command Structure Template

Every generated command must follow this structure:

```markdown
---
name: [command_name]
description: [Brief description of command purpose]
allowed-tools: [Tool1, Tool2, mcp__server_name]
argument-hints: [expected_arguments]
---

# Instructions

[Main purpose and overview of what the command does]

**Tools Usage:**
- [Describe how each tool is used]

## Usage

\`\`\`
/[command_name] [arguments]
\`\`\`

If \`[argument]\` provided - [what happens with argument].
No argument - [what happens without argument].

## Execution

### 1. [First Major Step]

[Description of step and implementation details]

Use \`/mcp__tool__function\` to analyze:

\`\`\`
1. [Sub-step 1]:
   - [Detail]
   - [Detail]

2. [Sub-step 2]:
   - [Detail]
   - [Detail]
\`\`\`

### 2. [Second Major Step]

[Description and details]

### 3. [Output Format] (if applicable)

**Section Header:**
- Field: [description]
- Field: [description]

## [Additional Sections as Needed]

[Could include Rules, Security, Validation, etc.]
```

## Rules

### Naming Conventions
- **Command names:** Use clear action verbs or domain-specific terms
- **File names:** Use underscores (e.g., `deploy_k8s.md`, `test_runner.md`)
- **Forbidden names:** help, exit, quit, clear, system reserved words
- **Format:** Lowercase, no spaces, underscores preferred

### Required Sections
Every command must include:
1. **Metadata header** with name, description, allowed-tools, argument-hints
2. **Instructions** section with overview and tools usage
3. **Usage** section with command syntax
4. **Execution** section with detailed workflow steps
5. **Examples** or relevant output format

### Tool Declaration
- Only use explicitly declared MCP tools
- Include mcp__sequential-thinking for complex analysis
- List all required tools in allowed-tools metadata

## Security & Compliance

### Prohibited Actions
**Never create commands that:**
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

## Examples

### Example 1: Kubernetes Deployment Command

**Input:** `/generate:create_command create kubernetes deployment automation with rollback support`

**Creates:** `deploy_k8s.md`

```markdown
---
name: deploy_k8s
description: Automated Kubernetes deployment with rollback capabilities
allowed-tools: Read, Write, Bash, mcp__kubernetes
argument-hints: [environment, version]
---

# Instructions

Automates Kubernetes deployments with health checks and rollback support.

**Tools Usage:**
- mcp__kubernetes for cluster operations
- Bash for kubectl commands
- Read/Write for configuration files

## Usage

\`\`\`
/deploy_k8s [environment] [version]
\`\`\`

## Execution

### 1. Pre-deployment Checks
[Implementation details...]

### 2. Deployment Process
[Implementation details...]

### 3. Health Verification
[Implementation details...]

### 4. Rollback Procedures
[Implementation details...]
```

### Example 2: Test Runner Command

**Input:** `/generate:create_command setup automated test runner with coverage reports`

**Creates:** `test_runner.md`

```markdown
---
name: test_runner
description: Automated test execution with coverage reporting
allowed-tools: Read, Bash, mcp__testing
argument-hints: [test-suite, options]
---

# Instructions

Runs automated tests with coverage analysis and report generation.

**Tools Usage:**
- mcp__testing for test execution
- Bash for test commands
- Read for test file discovery

## Usage

\`\`\`
/test_runner [test-suite] [--coverage] [--report]
\`\`\`

## Execution

### 1. Test Discovery
[Implementation details...]

### 2. Test Execution
[Implementation details...]

### 3. Coverage Analysis
[Implementation details...]

### 4. Report Generation
[Implementation details...]
```

### Example 3: API Generator Command

**Input:** `/generate:create_command build REST API generator with OpenAPI validation`

**Creates:** `api_generator.md`

```markdown
---
name: api_generator
description: REST API endpoint generator with OpenAPI schema validation
allowed-tools: Read, Write, mcp__api, mcp__sequential-thinking
argument-hints: [resource, operations]
---

# Instructions

Generates REST API endpoints with automatic OpenAPI validation and documentation.

**Tools Usage:**
- mcp__api for endpoint creation
- mcp__sequential-thinking for schema analysis
- Read/Write for file operations

## Usage

\`\`\`
/api_generator [resource] [operations]
\`\`\`

## Execution

### 1. Schema Validation
[Implementation details...]

### 2. Endpoint Generation
[Implementation details...]

### 3. Documentation Creation
[Implementation details...]
```