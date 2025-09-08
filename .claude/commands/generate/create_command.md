---
allowed-tools: Read, Write, Bash (*), mcp__sequential-thinking
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
- **Requirements Analysis:**
  - Identify the target use case and user needs
  - Analyze input requirements and argument structure
  - Determine output format and success criteria
  - Plan error handling and edge cases
  - Consider performance and scalability

### Step 2: Command Generation
- **Create command structure:** Generate the complete markdown file with all required sections
- **Define metadata:** Set allowed-tools, argument-hint, and description
- **Implement core logic:** Write the task description and workflow steps
- **Add validation rules:** Include input validation and safety checks
- **Generate examples:** Create 2-3 practical usage examples
- **Set naming convention:** Follow pattern: `command_name.md` (use underscores in filenames)
- **Apply Command Design Patterns:**
  - For task-oriented commands: Focus on automation steps and validation
  - For analysis commands: Include comprehensive analysis areas and reporting
  - For generation commands: Define templates and best practices
  - For workflow commands: Map out complete process flows

### Step 3: Post-check
- **Verify completeness:** Ensure all required sections are present:
  - Metadata header with tools and description
  - Your task section with detailed instructions
  - No Prompt / Help Mode section
  - Interactive Mode (if applicable)
  - Examples section
  - Validation process and error handling
  - Best practices section (when applicable)
- **Create the file:** Save as `command_name.md` in appropriate directory (`cli-tool/components/commands/`)
- **Test command structure:**
  - Verify all examples work as documented
  - Test argument descriptions and options
  - Validate process steps and outcomes
  - Check for clarity and completeness
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
I'll [action description] for $ARGUMENTS following [relevant standards/practices].

## Process
I'll follow these steps:
1. [Step 1 description - validation/analysis]
2. [Step 2 description - core execution]
3. [Step 3 description - optimization/enhancement]
4. [Final step - output/reporting]

## No Prompt / Help Mode
[Help text when no arguments provided]

## Interactive Mode
[Behavior for ambiguous inputs - include if command needs clarification]

## [Command-Specific Sections]
### [Category 1]
- [Feature/capability 1]
- [Feature/capability 2]
- [Feature/capability 3]

### [Category 2]
- [Implementation detail 1]
- [Implementation detail 2]
- [Implementation detail 3]

## Validation Process (when applicable)
1. **Input Validation**
   - Verify file/directory existence
   - Check parameter combinations
   - Validate configuration syntax

2. **Environment Validation**
   - Check system requirements
   - Validate tool availability
   - Ensure required dependencies exist

## Error Handling (when applicable)
### Recovery Strategies
- Graceful degradation for non-critical failures
- Automatic retry for transient errors
- Clear error messages with resolution steps
- Rollback mechanisms for destructive operations

## Best Practices (when applicable)
### [Practice Category]
- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

## Security & Compliance (optional)
[Safety guards and restrictions]

## Examples
[2-3 practical usage examples]
```

### Command Types Templates

#### Code Generation Commands
Include sections for:
- Generation types (components, APIs, tests, configs)
- Framework-specific patterns
- Code quality standards
- Integration approaches
- Template examples in YAML/JSON format when applicable

#### Code Analysis Commands
Include sections for:
- Analysis areas and methods
- Issue classification (Critical/Warning/Info)
- Reporting format and recommendations
- Performance metrics
- Visual output formats (tables, charts references)

#### Build and Deploy Commands
Include sections for:
- Build optimization strategies
- Deployment steps and rollback procedures
- Environment configurations
- CI/CD integration
- Configuration examples in YAML format

#### Development Workflow Commands
Include sections for:
- Workflow automation steps
- Git operations and branching
- Database operations
- Documentation generation
- Pipeline definitions

#### Agent/Assistant Creation Commands
Include sections for:
- Core architecture and identity
- Expertise domains with specific knowledge areas
- Personality configuration (tone, verbosity, proactivity)
- Tool permissions (allowed, restricted, usage guidelines)
- Behavioral patterns and constraints
- Communication style examples

### Naming Conventions
- **Command names:** Use clear, imperative verbs (e.g., "Generate Component", "Optimize Bundle")
- **File names:** Use underscores in files (e.g., `deploy_k8s.md`, `test_runner.md`)
- **Forbidden names:** help, exit, quit, clear, system reserved words
- **Format:** Lowercase, action-oriented, descriptive but concise
- **Include target type:** `analyze-security.md`, `generate-component.md`

### Argument and Parameter Handling

#### File/Directory Arguments
- Validate input paths and file existence
- Apply glob patterns for multi-file operations
- Check file permissions and access rights
- Process files with proper error handling
- Generate comprehensive output and logs

#### Configuration Arguments
Standard parameters to consider:
- **--config**: Custom configuration file path
- **--output**: Output directory or format
- **--verbose**: Enable detailed logging
- **--dry-run**: Preview changes without execution
- **--force**: Override safety checks
- **--format**: Specify output format
- **--parallel**: Enable concurrent processing

---

## Security & Compliance

### Prohibited Actions
- **Never create commands that:**
  - Access system-level operations without explicit permission
  - Bypass authentication or authorization
  - Modify critical system files
  - Execute arbitrary code without validation
  - Store or transmit sensitive data insecurely
  - Reproduce copyrighted material

### Required Safety Measures
- **Input validation:** All commands must validate and sanitize inputs
- **File System Validation:**
  - Verify file/directory existence
  - Check read/write permissions
  - Validate file formats and extensions
- **Tool restrictions:** Only use explicitly declared MCP tools
- **Error handling:** Include proper error messages and recovery
- **Audit logging:** Commands modifying data should log actions
- **Permission checks:** Verify user has required access rights
- **Rollback mechanisms:** For destructive operations

### Compliance Standards
- Follow organizational security policies
- Respect data classification requirements
- Implement principle of least privilege
- Maintain command versioning for auditing
- Document all external dependencies
- Include comprehensive type definitions where applicable
- Add accessibility features when relevant

---

## Command Creation Workflow

When creating new CLI commands:

### 1. Create the Command File
- **Location**: Always create new commands in `cli-tool/components/commands/`
- **Naming**: Use kebab-case for display, underscores for files
- **Format**: Markdown with specific structure and $ARGUMENTS placeholder

### 2. Installation Command Support
After creating the command, ensure it can be installed with:
```bash
npx claude-code-templates@latest --command="[command-name]" --yes
```

This will:
- Read from `cli-tool/components/commands/[command_name].md`
- Copy the command to the user's `.claude/commands/` directory
- Enable the command for Claude Code usage

### 3. Usage in Claude Code
Users can then run the command:
```
/[command-name] [arguments]
```

### 4. Testing Workflow
1. Create the command file in correct location
2. Test the installation command
3. Verify the command works with various arguments
4. Test error handling and edge cases
5. Ensure output is clear and actionable
6. Validate performance with large inputs
7. Test cross-platform compatibility

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
      - Deployment workflow steps with validation
      - Rollback procedures and recovery strategies
      - Health check validations
      - Security constraints and compliance
      - Best practices for container orchestration
      - Environment-specific configurations
    </structure>
  </creates>
  <output>
    ✅ Command successfully created: deploy_k8s.md
    
    To use: /deploy-k8s [environment] [version]
    Example: /deploy-k8s production v1.2.3
    
    Installation: npx claude-code-templates@latest --command="deploy-k8s" --yes
  </output>
</example>
```

```xml
<example id="create-test-command" kind="creation">
  <title>Create test runner with coverage</title>
  <command>/command setup automated test runner with coverage reports and parallel execution</command>
  <creates>
    <file>test_runner.md</file>
    <structure>
      - Metadata with mcp__testing tools
      - Test discovery patterns and file validation
      - Coverage thresholds and quality gates
      - Report generation in multiple formats
      - CI/CD integration with artifacts
      - Error handling and retry mechanisms
      - Performance optimization for large suites
    </structure>
  </creates>
  <output>
    ✅ Command successfully created: test_runner.md
    
    To use: /test-runner [test-suite] [options]
    Example: /test-runner unit --coverage --report --parallel
    
    Installation: npx claude-code-templates@latest --command="test-runner" --yes
  </output>
</example>
```

```xml
<example id="create-api-command" kind="creation">
  <title>Create API endpoint generator</title>
  <command>/command build REST API generator with OpenAPI validation and TypeScript support</command>
  <creates>
    <file>api_generator.md</file>
    <structure>
      - Metadata with mcp__api tools
      - OpenAPI schema validation and parsing
      - CRUD operation templates with types
      - Authentication methods (JWT, OAuth, API Key)
      - Rate limiting rules and throttling
      - Input validation and sanitization
      - Error response standardization
      - Documentation generation
      - Test file generation for endpoints
    </structure>
  </creates>
  <output>
    ✅ Command successfully created: api_generator.md
    
    To use: /api-generator [resource] [operations]
    Example: /api-generator users CRUD --auth=jwt --docs
    
    Installation: npx claude-code-templates@latest --command="api-generator" --yes
  </output>
</example>
```

```xml
<example id="create-image-optimizer" kind="creation">
  <title>Create image optimization command</title>
  <command>/command create image optimizer for web performance with responsive variants</command>
  <creates>
    <file>optimize_images.md</file>
    <structure>
      - Metadata with mcp__image-processing tools
      - Image format detection and validation
      - Compression algorithms for different formats
      - Responsive image variant generation
      - WebP and AVIF conversion options
      - Batch processing with progress tracking
      - Performance metrics and size reduction reports
      - Alt text suggestion generation
      - Directory structure optimization
    </structure>
  </creates>
  <output>
    ✅ Command successfully created: optimize_images.md
    
    To use: /optimize-images [directory] [options]
    Example: /optimize-images src/assets/images --webp --responsive
    
    Installation: npx claude-code-templates@latest --command="optimize-images" --yes
  </output>
</example>
```

---

## Command Quality Checklist

When creating a command, ensure:
- ✅ Clear, action-oriented naming
- ✅ Comprehensive task description with $ARGUMENTS
- ✅ Step-by-step process documentation
- ✅ Input validation and error handling
- ✅ Security measures and compliance checks
- ✅ At least 2-3 practical examples
- ✅ Help mode for no-argument usage
- ✅ Interactive mode for ambiguous inputs
- ✅ Best practices section when applicable
- ✅ Recovery strategies for failures
- ✅ Performance considerations addressed
- ✅ Cross-platform compatibility noted
- ✅ Installation command documented
- ✅ Testing workflow included