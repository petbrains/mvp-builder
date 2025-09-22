---
name: create-command
description: Generate a new command through interactive dialogue following the standard template
allowed-tools: Read, Write
argument-hints: [user-input]
---

# Instructions

Interactive command generator that guides you through creating a new command file by collecting all required information through dialogue. Ensures all commands follow the standard template structure and best practices.

## Usage

```
/create-command [user-input]
```

- `[user-input]` - Optional initial description of the command you want to create
- No arguments - Starts from scratch with full dialogue

## Execution

### Phase 1: Initial Context

#### Step 1: Parse Initial Input

If user provides initial input:
- Extract potential command name, purpose, or functionality hints
- Use this as context for more targeted questions

If no input provided:
- Start with blank slate
- Ask for basic command concept first

#### Step 2: Start Dialogue

```dialogue
"🎯 Let's create a new command together.
I'll guide you through each required section."
```

### Phase 2: Information Gathering

#### Stage 1: Basic Information

Questions to ask in sequence:

```dialogue
"What should this command be called? 
(lowercase, hyphens for spaces, e.g., 'analyze-code' or 'format-docs')"
```

Wait for response, validate format (lowercase, hyphens only).

```dialogue
"Provide a brief one-line description of what this command does:"
```

Wait for response.

```dialogue
"What is the main purpose and approach of this command?
(This will become the detailed instructions section)"
```

Wait for response.

#### Stage 2: Technical Requirements

```dialogue
"Which tools will this command need? Choose from:
[List of availible tools]

List the tools separated by commas:"
```

Wait for response, validate tool names.

```dialogue
"What arguments will this command accept?
- [optional-arg] for optional arguments
- <required-arg> for required arguments
- No arguments
- Multiple patterns

Describe the argument pattern:"
```

Wait for response.

#### Stage 3: Execution Flow

```dialogue
"Let's define the execution phases. How many main phases will your command have?
(Most commands have 2-4 phases like Initialize, Process, Output)"
```

Wait for response with number.

For each phase, ask:

```dialogue
"Phase [N]: What should this phase be called and what does it do?"
```

Then for each phase:

```dialogue
"For Phase [Name], describe the key steps that should happen:
(You can list multiple steps, I'll structure them properly)"
```

Wait for responses.

#### Stage 4: Output and Features

```dialogue
"Will this command produce formatted output that users will see?
(yes/no - if yes, describe the output format)"
```

If yes, collect output format details.

```dialogue
"Does this command need interactive mode for clarifying ambiguous inputs?
(yes/no - if yes, describe when it would ask for clarification)"
```

If yes, collect interactive mode scenarios.

```dialogue
"Does this command perform any sensitive operations that need safety guards?
(yes/no - if yes, list the safety checks needed)"
```

If yes, collect safety guard requirements.

#### Stage 5: Examples and Documentation

```dialogue
"Provide 2-3 example use cases for this command:
1. Most common usage
2. Advanced usage (if applicable)
3. Edge case or special scenario"
```

Wait for examples.

```dialogue
"What are common errors users might encounter? 
(List any error conditions and how to resolve them, or 'none' if not applicable)"
```

Wait for response.

```dialogue
"Are there related commands that work with this one?
(List related commands or 'none' if standalone)"
```

Wait for response.

### Phase 3: Command Generation

#### Step 1: Review Collected Information

Display summary for confirmation:

```dialogue
"📋 Command Summary:
- Name: [collected-name]
- Description: [collected-description]
- Tools: [collected-tools]
- Arguments: [collected-arguments]
- Phases: [list of phases]
- Special features: [interactive mode, safety guards, etc.]

Is this correct? (yes to proceed, or specify what to change)"
```

If changes requested, go back to relevant stage.

#### Step 2: Generate Command File

Action: Write to `./.claude/commands/[command-name].md`

Build the command file following the template structure - @.claude/templates/command-template.md