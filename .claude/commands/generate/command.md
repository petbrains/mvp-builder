---
name: generate:command
description: Interactive command generator with sequential thinking analysis for creating optimized commands
allowed-tools: Read, Write, mcp__sequential-thinking
argument-hint: [initial-description]
---

# Instructions

Interactive command generator that uses sequential thinking to analyze requirements and guides through creating new command files via structured dialogue. Ensures all commands follow the standard template and best practices.

**Template:** @.claude/templates/command-template.md

**Tools Usage:**
- `mcp__sequential-thinking` - Analyzes initial input and optimizes question flow. See instructions here - @.claude/tools/sequential-thinking.md
- `Read` - Reads command template and existing commands for reference
- `Write` - Creates the final command file

## Usage

```
/generate:command [initial-description]
```

- `[initial-description]` - Optional initial description of desired command functionality
- No arguments - Starts with analysis of what command is needed

## Execution

### Phase 1: Initial Analysis with Sequential Thinking

#### Step 1: Analyze Context

Use `/mcp__sequential-thinking__sequentialthinking` to process initial input:

```
1. Parse initial description:
   - Extract potential command purpose
   - Identify implied functionality
   - Detect tool requirements hints
   - Find workflow patterns

2. Generate hypotheses:
   - What type of command is needed
   - Likely execution phases
   - Required tools and permissions
   - Potential safety considerations

3. Optimize dialogue strategy:
   - Determine question priority
   - Identify what can be inferred
   - Plan minimal question set
   - Prepare contextual follow-ups
```

#### Step 2: Initialize Dialogue

```dialogue
"🎯 Let's create a new command together. I'll use sequential thinking to optimize our dialogue.

[If initial description provided]:
Based on your input about '[summarized purpose]', I've analyzed potential requirements.

[If no description]:
First, let me understand what you want to automate or improve.

What's the main problem or task this command should solve?"
```

Wait for response, then analyze with `/mcp__sequential-thinking__sequentialthinking`.

### Phase 2: Intelligent Information Gathering

#### Stage 1: Core Definition

Use `/mcp__sequential-thinking__sequentialthinking` after each response to optimize next questions:

```dialogue
"Based on your description, I'm thinking this command should be called:
`[suggested-name]` 

Does this name work, or would you prefer something else?
(Format: lowercase with hyphens, e.g., 'analyze-code')"
```

Analyze response with `/mcp__sequential-thinking__sequentialthinking`:
- Validate naming convention
- Check for conflicts with existing commands
- Optimize for clarity and discoverability

```dialogue
"For the description, I suggest:
'[generated one-line description based on analysis]'

Would you like to modify this or keep it as is?"
```

#### Stage 2: Smart Tool Detection

Based on `/mcp__sequential-thinking__sequentialthinking` analysis:

```dialogue
"From what you've described, this command will likely need these tools:
- [Tool 1]: for [reason]
- [Tool 2]: for [reason]
[List detected tools]

Are there other tools you need, or should I remove any?
Available tools: Read, Write, Bash (*), [others]"
```

#### Stage 3: Adaptive Argument Pattern

Use `/mcp__sequential-thinking__sequentialthinking` to suggest argument pattern:

```dialogue
"Based on the functionality, I recommend this argument pattern:
[suggested pattern with explanation]

For example: /[command-name] [suggested-args]

Does this match your vision? You can also specify:
- [optional-arg] for optional parameters
- <required-arg> for required parameters
- No arguments for simple commands"
```

#### Stage 4: Intelligent Phase Structuring

Analyze with `/mcp__sequential-thinking__sequentialthinking` to propose phases:

```dialogue
"I've analyzed the workflow. Here's my suggested phase structure:

Phase 1: [Suggested name] - [Purpose]
Phase 2: [Suggested name] - [Purpose]
[Additional phases if needed]

This structure would [explain benefits].

Should we proceed with this structure, or would you like to modify it?"
```

For each confirmed phase:

```dialogue
"For Phase '[Name]', what specific steps should happen?
Based on the command's purpose, I'm expecting:
- [Predicted step 1]
- [Predicted step 2]

Please confirm or provide the actual steps:"
```

#### Stage 5: Smart Feature Detection

Use `/mcp__sequential-thinking__sequentialthinking` to determine needed features:

```dialogue
"Based on the command's nature, I've identified these potential features:

[✓/✗] Interactive mode - [Reason why needed/not needed]
[✓/✗] Safety guards - [Detected sensitive operations or none]
[✓/✗] Error handling - [Common error scenarios]
[✓/✗] Progress reporting - [Long-running operations detected]

Should I include any of these features? Any others needed?"
```

#### Stage 6: Example Generation with Analysis

```dialogue
"I'll generate examples based on our discussion. Here are my suggestions:

1. Basic usage: /[command] [common-args]
   - [What this accomplishes]

2. Advanced usage: /[command] [complex-args]
   - [Advanced scenario]

3. Edge case: /[command] [edge-args]
   - [Special handling]

Do these cover your use cases, or should I adjust them?"
```

### Phase 3: Sequential Validation & Generation

#### Step 1: Final Analysis

Use `/mcp__sequential-thinking__sequentialthinking` for final validation:

```
1. Verify completeness:
   - All required fields present
   - Logical flow consistency
   - Tool permissions match operations
   
2. Optimize structure:
   - Simplify redundant phases
   - Enhance error handling
   - Improve user experience

3. Predict issues:
   - Potential conflicts
   - Missing safety checks
   - Performance considerations
```

#### Step 2: Confirmation Dialogue

```dialogue
"📋 Command Analysis Complete:

**Summary:**
- Name: [final-name]
- Purpose: [final-description]
- Complexity: [Simple/Moderate/Complex]
- Estimated implementation time: [X minutes]

**Key Features:**
- Tools: [final-tools]
- Arguments: [final-pattern]
- Phases: [count] phases with [total-steps] steps
- Special features: [list if any]

**Optimization Notes:**
[Any improvements made through analysis]

Ready to generate the command file? (yes/no/modify)"
```

#### Step 3: Generate Optimized Command

If confirmed, write to `./.claude/commands/[command-name].md`:
- Use template from @.claude/templates/command-template.md
- Include all collected and optimized information
- Add sequential thinking patterns where applicable

```dialogue
"✅ Command successfully created at ./.claude/commands/[command-name].md

The command is ready to use with: /[command-name]

Would you like to:
1. Test the command now
2. Create another command
3. View the generated file
4. Done"
```

## Interactive Mode

The command maintains context throughout the dialogue:

```dialogue
"[Contextual question based on previous answers]"

Previous context:
- Already specified: [list]
- Still needed: [list]
- Optional enhancements: [list]
```

## Safety Guards

- Validates command name uniqueness before creation
- Checks tool permission compatibility
- Prevents overwriting existing commands without confirmation
- Validates argument patterns for conflicts
- Ensures all required template sections are filled

## Error Handling

**During Dialogue:**
- Invalid input format → Provide format example and retry
- Conflicting requirements → Use sequential thinking to resolve
- Missing information → Smart default suggestions

**During Generation:**
- File write permission → Check and request access
- Template not found → Use embedded template
- Existing command → Ask for overwrite confirmation

## Examples

### Example 1: With Initial Description
```
/generate:command automated test generator for Python modules
```
Sequential thinking analyzes: test patterns, Python conventions, likely tools needed

### Example 2: No Arguments
```
/generate:command
```
Starts with exploratory questions to understand needs

### Example 3: Complex Workflow
```
/generate:command multi-stage deployment pipeline with rollback
```
Detects complexity, suggests agent instead of simple command