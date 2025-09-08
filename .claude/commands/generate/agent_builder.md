---
allowed-tools: [Task, MultiEdit, Write, Read, Glob]
argument-hint: [agent description or requirements]
description: Create specialized AI agents with custom expertise, personality traits, and tool permissions
---

## Your task

Generate a specialized AI agent based on $ARGUMENTS. I'll analyze the requirements to create an agent with custom expertise domains, personality configuration, tool permissions, behavioral patterns, and communication style that perfectly matches the described needs.

## Process

I'll follow these steps:
1. **Requirements Analysis** - Parse the description to identify agent purpose, required expertise, and desired behaviors
2. **Agent Architecture Design** - Define core identity, capabilities, and operational constraints
3. **Personality & Communication Setup** - Configure tone, verbosity, proactivity levels, and interaction patterns
4. **Tool Permission Mapping** - Determine appropriate MCP tools and usage restrictions based on agent role
5. **Implementation Generation** - Create the complete agent specification with all configurations

## No Prompt / Help Mode

If you run `/agent-builder` with **no prompt** (i.e., just `/agent-builder` or only whitespace), display this help message:

**Purpose:** Create specialized AI agents with custom configurations

**Usage:** `/agent-builder [description of agent requirements]`

**Quick examples:**
- `/agent-builder code review specialist with security focus`
- `/agent-builder data analyst for financial reports`
- `/agent-builder friendly tutor for programming beginners`
- `/agent-builder DevOps automation expert`
- `/agent-builder technical documentation writer`

**What gets created:**
- Complete agent specification file
- Custom expertise domains and knowledge areas
- Personality configuration (tone, style, verbosity)
- Tool permissions and usage guidelines
- Behavioral patterns and constraints
- Communication examples and templates

## Interactive Mode

When the agent description is ambiguous or incomplete, I'll ask for clarification:

```
I need more details to create your agent properly:

1. **Primary Purpose**: What is the agent's main function?
2. **Expertise Areas**: What domains should it specialize in?
3. **Personality Traits**: How should it communicate? (formal/casual, verbose/concise)
4. **Proactivity Level**: Should it suggest improvements or only respond to requests?
5. **Tool Access**: What operations should it be allowed to perform?
6. **Constraints**: Any specific limitations or rules to enforce?

Please provide these details or I can guide you through each aspect.
```

## Agent Architecture Components

### Core Identity
- **Agent Name**: Descriptive identifier based on purpose
- **Primary Role**: Main function and responsibility
- **Mission Statement**: Clear definition of agent's goals
- **Operational Scope**: Boundaries of agent capabilities

### Expertise Domains
- **Primary Knowledge Areas**: Core competencies and specializations
- **Secondary Skills**: Supporting knowledge domains
- **Industry Context**: Relevant sector-specific expertise
- **Technical Proficiencies**: Programming languages, frameworks, tools

### Personality Configuration
- **Communication Style**:
  - Tone: Professional, Casual, Academic, Friendly, Authoritative
  - Verbosity: Concise, Detailed, Balanced
  - Formality: Formal, Informal, Adaptive
  
- **Interaction Patterns**:
  - Proactivity: Passive, Suggestive, Proactive
  - Teaching Style: Explanatory, Demonstrative, Socratic
  - Response Format: Structured, Conversational, Technical

### Tool Permissions
- **Allowed Tools**: Specific MCP tools the agent can use
- **Restricted Operations**: Actions requiring user approval
- **Usage Guidelines**: When and how to use each tool
- **Safety Constraints**: Limitations to prevent unintended actions

### Behavioral Patterns
- **Decision Making**: How the agent evaluates options
- **Problem Solving**: Approach to tackling challenges
- **Error Handling**: Response to failures and uncertainties
- **Learning Adaptation**: How it improves from interactions

## Validation Process

### Requirements Validation
1. **Completeness Check**
   - Verify all essential components are defined
   - Ensure no conflicting configurations
   - Validate tool availability

2. **Consistency Verification**
   - Check personality traits align with role
   - Ensure expertise matches intended use
   - Verify constraints don't limit core functions

### Safety Validation
1. **Permission Boundaries**
   - Confirm tool access is appropriate
   - Validate no excessive permissions
   - Ensure compliance with security policies

2. **Behavioral Constraints**
   - Check for potential harmful actions
   - Verify ethical guidelines compliance
   - Ensure user control maintained

## Best Practices

### Agent Design Principles
- **Single Responsibility**: Focus on one primary domain
- **Clear Communication**: Unambiguous interaction patterns
- **Predictable Behavior**: Consistent responses and actions
- **User Control**: Always respect user decisions
- **Graceful Degradation**: Handle limitations transparently

### Configuration Guidelines
- **Start Conservative**: Begin with minimal permissions
- **Iterate Based on Needs**: Expand capabilities as required
- **Document Thoroughly**: Clear descriptions of all behaviors
- **Test Edge Cases**: Verify handling of unusual requests
- **Monitor Performance**: Track effectiveness and adjust

### Communication Excellence
- **Match User Context**: Adapt to user's technical level
- **Provide Examples**: Illustrate concepts with practical cases
- **Acknowledge Limitations**: Be transparent about constraints
- **Maintain Consistency**: Keep personality traits stable
- **Respect Preferences**: Honor user communication style

## Output Format

The generated agent will be saved as a structured specification file containing:

```yaml
agent:
  identity:
    name: [Agent Name]
    role: [Primary Function]
    mission: [Goal Statement]
    
  expertise:
    primary: [Main Knowledge Areas]
    secondary: [Supporting Skills]
    technical: [Specific Technologies]
    
  personality:
    tone: [Communication Style]
    verbosity: [Detail Level]
    proactivity: [Initiative Level]
    
  tools:
    allowed: [Permitted MCP Tools]
    restricted: [Limited Operations]
    forbidden: [Prohibited Actions]
    
  behaviors:
    problem_solving: [Approach]
    decision_making: [Method]
    error_handling: [Strategy]
    
  constraints:
    operational: [Functional Limits]
    ethical: [Moral Guidelines]
    security: [Safety Measures]
    
  examples:
    interactions: [Sample Conversations]
    responses: [Typical Outputs]
    edge_cases: [Unusual Situations]
```

## Examples

### Example 1: Code Review Specialist
```
/agent-builder code review expert focusing on security, performance, and best practices
```

Creates an agent that:
- Analyzes code for vulnerabilities and inefficiencies
- Suggests improvements following industry standards
- Provides detailed feedback with examples
- Uses Read, Grep, and Task tools for analysis
- Maintains professional, educational tone

### Example 2: Data Analysis Assistant
```
/agent-builder financial data analyst for quarterly reports and trend analysis
```

Creates an agent that:
- Processes financial datasets and metrics
- Generates insights and visualizations
- Identifies patterns and anomalies
- Uses data processing and visualization tools
- Communicates findings clearly with charts

### Example 3: DevOps Automation Expert
```
/agent-builder DevOps specialist for CI/CD pipelines and infrastructure automation
```

Creates an agent that:
- Designs and implements deployment workflows
- Optimizes build and release processes
- Manages container orchestration
- Uses Bash, Docker, and Kubernetes tools
- Provides detailed technical documentation