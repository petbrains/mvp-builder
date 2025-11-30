# MVP Builder CLI - Claude Agent Configuration

This folder contains Claude agent configuration for specification-driven MVP development. The MVP Builder CLI tool automates the setup of this configuration in your projects.

## What is MVP Builder CLI?

MVP Builder CLI is a command-line tool that initializes specification-driven development projects with integrated AI assistance. It downloads and configures Claude agent templates, slash commands, and development workflows to help you build MVPs systematically.

## Installation

```bash
uv tool install specify-cli --from git+https://github.com/akhmat-s/mvp-builder.git
```

## Quick Start

### Initialize a New Project

```bash
# Create a new project in a new directory
mvpbuilder init my-project

# Initialize in the current directory
mvpbuilder init .
```

### For Private Repositories

If the template repository is private, provide a GitHub token:

```bash
mvpbuilder init my-project --github-token=ghp_yourtoken
```

Or set the token as an environment variable:

```bash
export GITHUB_TOKEN=ghp_yourtoken
mvpbuilder init my-project
```

## How It Works

When you run `mvpbuilder init <project_name>`, the tool:

1. **Prompts you to select an AI assistant** (currently Claude)
2. **Downloads the template repository** from GitHub containing:
   - `.claude/` folder with commands, skills, and templates
   - `CLAUDE.md` with development rules and standards
   - AI documentation structure
3. **Extracts the template** to your project directory
4. **Sets up the project structure** with all necessary configuration files

The result is a fully configured project ready for specification-driven development.

## Project Structure After Initialization

```
your-project/
├── .claude/                     # Claude agent configuration
│   ├── commands/                # Slash commands
│   │   ├── docs/                # Documentation commands
│   │   │   ├── prd.md           # Generate Product Requirements Document
│   │   │   ├── clarify.md       # Clarify existing PRD
│   │   │   ├── feature.md       # Create feature specifications
│   │   │   ├── plan.md          # Generate implementation plan
│   │   │   ├── tasks.md         # Create TDD task list
│   │   │   ├── ux.md            # Define UX schemas
│   │   │   ├── checklist.md     # Quality validation checklist
│   │   │   └── memory.md        # Session memory management
│   │   ├── generate/            # Code generation commands
│   │   │   ├── agent.md         # Generate custom agents
│   │   │   ├── command.md       # Generate custom commands
│   │   │   └── self-improve.md  # Self-improvement suggestions
│   │   └── git.md               # Git workflow automation
│   ├── skills/                  # Claude skills
│   │   ├── context7/            # Context management
│   │   ├── feature-analyzer/    # Feature analysis
│   │   └── sequential-thinking/ # Structured reasoning
│   ├── templates/               # Document templates
│   │   ├── spec-template.md     # Feature specification template
│   │   ├── ux-template.md       # UX schema template
│   │   ├── plan-template.md     # Implementation plan template
│   │   ├── tasks-template.md    # TDD tasks template
│   │   └── ...                  # Other templates
│   └── settings.local.json      # Local Claude settings
├── CLAUDE.md                    # Development rules and standards
└── ai-docs/                     # AI-generated documentation (created during use)
    ├── PRD.md                   # Product Requirements Document
    ├── FEATURES.md              # Feature roadmap
    ├── README.md                # Project overview
    └── features/                # Individual feature specifications
        └── [feature-name]/
            ├── spec.md          # Feature specification
            ├── ux.md            # UX design
            ├── plan.md          # Implementation plan
            ├── tasks.md         # TDD task list
            └── contracts/       # API contracts
```

## Available Slash Commands

After initialization, you can use these slash commands with Claude:

### Documentation Commands

- **`/docs:prd`** - Generate a Product Requirements Document through interactive dialogue
- **`/docs:clarify`** - Clarify and refine existing PRD
- **`/docs:feature`** - Create feature specification files from PRD
- **`/docs:plan`** - Generate implementation plan for a feature
- **`/docs:tasks`** - Create TDD task list from feature spec
- **`/docs:ux`** - Define UX schemas and user flows
- **`/docs:checklist`** - Generate quality validation checklist
- **`/docs:memory`** - Manage session memory and context

### Generation Commands

- **`/generate:agent`** - Generate custom Claude agents
- **`/generate:command`** - Generate custom slash commands
- **`/generate:self-improve`** - Get suggestions for workflow improvements

### Git Commands

- **`/git`** - Automated git workflow with conventional commits

## Typical Workflow

1. **Initialize project**: `mvpbuilder init my-mvp`
2. **Create PRD**: Use `/docs:prd` in Claude to generate Product Requirements Document
3. **Generate features**: Use `/docs:feature` to create feature specifications
4. **Plan implementation**: Use `/docs:plan` for each feature
5. **Create tasks**: Use `/docs:tasks` to generate TDD task lists
6. **Build**: Follow the generated tasks to implement features
7. **Iterate**: Use `/docs:clarify` to refine as needed

## Configuration

The `.claude/settings.local.json` file contains local Claude Code settings. You can customize:
- Tool permissions
- Command configurations
- Skill settings
- Model preferences

## Development Philosophy

MVP Builder follows a **specification-driven development** approach:

1. **Spec First**: No implementation without specification
3. **Atomic Changes**: Small, focused commits that keep the product runnable
4. **Clear Documentation**: All decisions and requirements captured in ai-docs/
5. **AI-Assisted**: Claude helps generate specs, plans, and code following best practices

For detailed development rules, see `CLAUDE.md` in your project root.

## Security Notice

The `.claude/` folder may contain:
- Local settings and preferences
- Session data and context
- Potentially cached credentials (depending on usage)

**Recommendation**: Add `.claude/settings.local.json` to `.gitignore` if it contains sensitive data.

## Troubleshooting

### Repository Not Found

If you get a 404 error:
```bash
mvpbuilder init my-project --github-token=your_github_token
```

### Command Not Found

Ensure mvpbuilder is installed and in your PATH:
```bash
pip install --upgrade mvpbuilder-cli
```

### Permission Issues

On Unix systems, you may need to make scripts executable:
```bash
chmod +x .claude/skills/*/scripts/*.sh
```

**Version**: 0.0.1
**Template Source**: https://github.com/akhmat-s/MVP-Builder-CLI
