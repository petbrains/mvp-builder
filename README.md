<p align="center">
  <img src="assets/logo.png" width="180" alt="MVP Builder" />
</p>

<h1 align="center">MVP Builder</h1>

<p align="center">
  <strong>Build MVPs with AI agent that verifies its own work</strong><br>
  Claude Code instructions for Document-Driven Development
</p>

<p align="center">
  <a href="#the-approach">Approach</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#installation">Installation</a>
</p>

---

## The Problem

AI coding agents are brilliant but unreliable:

- 🎭 **They hallucinate** — write code that "looks right" but doesn't work
- 🦥 **They cut corners** — stubs, mocks, "TODO: implement later"
- 🧠 **They forget** — lose context between sessions
- ✅ **They lie** — say "done" when work is half-finished

You end up debugging AI's mistakes instead of building your product.

---

## The Approach

If the agent performs poorly, the task description is lacking. AI models are strong reasoners but unreliable workers — they hallucinate, cut corners, and forget previous context. The fix is not just better prompts but structured specifications that require verifiable outputs.

### Core Principles

**Document-Driven Development**  
Specifications generate code, not vice versa. Every feature starts as structured documentation (PRD → spec → UX → plan) before any implementation begins.

**Verification Chain**  
Each requirement gets a test. Each test gets an implementation. Each implementation gets reviewed. Nothing ships without passing the chain.

```
FR-XXX → TEST-XXX → IMPL-XXX → CHK → REV
```

**Feedback Loop**  
Agents check their own work. Review finds issues → feedback.md captures them → fix agent resolves → review verifies. `AICODE-*` markers track what's resolved and what's still relevant. Context stays clean.

**Memory System**  
CLAUDE.md defines agent identity and rules. `/docs:memory` maintains a code map of the project — run with a feature path after implementation, or without arguments to rescan the entire codebase. `HANDOFF.md` preserves session continuity — goal, progress, blockers, next steps. SessionStart hook auto-injects project context (HANDOFF + PRD + FEATURES + README) so every new session starts informed.

**Skills over Agents**  
The old approach: separate agent for each domain. The new approach: one general agent that loads skills for the task. Add expertise by adding folders, not rewriting agents.

---

## How It Works

### Pipeline

```mermaid
flowchart LR
    subgraph DEFINE ["Define"]
        PRD["prd"] --> DSETUP["design-setup"]
        DSETUP --> FEATURE["feature"]
        FEATURE --> CLARIFY["clarify"]
        DSETUP -.->|"to Figma"| DGEN["design-generate"]
        DGEN -.->|"from Figma"| DSETUP
    end
    
    subgraph DESIGN ["Design"]
        CLARIFY --> UX["ux"]
        UX --> UI["ui"]
        UI --> PLAN["plan"]
    end
    
    subgraph BUILD ["Build"]
        PLAN --> TASKS["tasks"]
        TASKS --> VAL["validation"]
        VAL --> SETUP["feature-setup"]
        SETUP --> TDD["feature-tdd"]
        TDD --> REVIEW["review"]
        REVIEW -->|BLOCKED| FIX["feature-fix"]
        FIX --> REVIEW
    end
    
    subgraph SHIP ["Ship"]
        REVIEW -->|PASSED| MEMORY["memory"]
    end
```

### Phase 1: Define

Transform product idea into structured specifications.

| Command / Agent | Output | Purpose |
|---------|--------|---------|
| `/docs:prd` | `PRD.md`, `references/` dir | Product vision, audience, core problem |
| `/docs:design-setup` | `references/design-system.md`, `tokens/`, `style-guide.md` | Normalize design generator output, extract from Figma |
| `design-generate` | Figma file with editable layers | Validate HTML references, fix token inconsistencies, push to Figma |
| `/docs:feature` | `spec.md`, `FEATURES.md` | Feature specs with requirements (FR-XXX, UX-XXX) |
| `/docs:clarify` | Updated `spec.md` | Resolve ambiguities through targeted questions |

**After `/docs:prd`**: Add supplementary materials to `ai-docs/references/` — design systems, tokens, schemas, API contracts, style guides, screenshots. Run `/docs:design-setup` to normalize raw generator output.

**Figma roundtrip** (optional): `design-generate` pushes HTML references into Figma for designer review. After refinement in Figma, run `/docs:design-setup [figma-url]` to extract changes back. Repeat until design is locked.

### Phase 2: Design

Convert specifications into technical architecture.

| Command | Output | Purpose |
|---------|--------|---------|
| `/docs:ux` | `ux.md` | User flows, states, error handling, accessibility |
| `/docs:ui` | `ui.md` | Component trees, DS mapping, layout structure |
| `/docs:plan` | `plan.md`, `data-model.md`, `contracts/`, `setup.md` | Architecture, entities, API specs, environment |

### Phase 3: Build

Execute implementation through TDD cycles with self-verification.

| Command / Agent | Output | Purpose |
|-----------------|--------|---------|
| `/docs:tasks` | `tasks.md` | INIT tasks + TDD cycles (TEST-XXX → IMPL-XXX) |
| `/docs:validation` | `validation/*.md` | Checklists with traceable checkpoints (CHK) |
| `feature-setup` | Infrastructure code | Execute INIT tasks, scaffold project |
| `feature-tdd` | Feature code + tests | RED-GREEN cycles, atomic commits |
| `/docs:review` | `feedback.md` | Verify implementation, generate findings (REV-XXX) |
| `feature-fix` | Fixed code | Apply fixes one error at a time |

**Review Loop**: If review status is BLOCKED → `feature-fix` → `/docs:review` → repeat until PASSED.

### Phase 4: Ship

Finalize and document completed implementation.

| Command | Output | Purpose |
|---------|--------|---------|
| `/docs:memory [feature-path]` | `ai-docs/README.md` | Add feature to code map, rebuild dependency graph |
| `/docs:memory` | `ai-docs/README.md` | Rescan entire project, capture all changes |

**Two modes**: with feature path — adds the feature entry and rebuilds the graph. Without arguments — full project rescan for changes made outside feature scope (refactoring, new shared modules, deleted files). Feature list is preserved, only the dependency graph is rebuilt from scratch.

### Session Continuity

Agent updates `ai-docs/HANDOFF.md` after completing TDD cycles or significant tasks — captures goal, progress, blockers, and next steps.

On every session start, a `SessionStart` hook auto-injects project context into Claude's context window:

| File | Content |
|------|---------|
| `HANDOFF.md` | What was happening, what's next |
| `PRD.md` | Product vision and scope |
| `FEATURES.md` | Feature map and priorities |
| `README.md` | Current code map |

Zero tool calls spent on loading context. New session starts informed immediately.

### Agents

Specialized agents execute tasks across pipeline phases:

**Define phase:**

| Agent | Role | When to use |
|-------|------|-------------|
| `design-generate` | Push HTML to Figma | After `/docs:design-setup`, sends validated references to Figma for designer review |

**Build phase:**

| Agent | Role | When to use |
|-------|------|-------------|
| `feature-setup` | Scaffold infrastructure | After `/docs:validation`, executes INIT-XXX tasks |
| `feature-tdd` | TDD implementation | After setup, runs RED-GREEN cycles |
| `feature-fix` | Apply review fixes | When review status = BLOCKED, fixes one error at a time |

### Skills System

Skills are reusable capabilities that agents can load on demand.

Each skill contains:
- Instructions for specific domain (analysis, documentation, git workflow)
- Decision rules with explicit conditions
- Tool permissions and constraints

Add new expertise: create a skill folder in `.claude/skills/`.

---

## Document Structure

Generated by MVP Builder:

```
ai-docs/
├── PRD.md                      # Product vision
├── FEATURES.md                 # Feature index  
├── README.md                   # Code map (navigation for agents)
├── HANDOFF.md                  # Session continuity (auto-injected on start)
├── references/                 # Design systems, tokens, schemas, style guides, screens, API contracts
└── features/
    └── [feature-name]/
        ├── spec.md             # Requirements (FR-XXX, UX-XXX)
        ├── ux.md               # User flows and states
        ├── ui.md               # Component trees, DS mapping, layout
        ├── plan.md             # Architecture decisions
        ├── research.md         # Technical research and rationale
        ├── data-model.md       # Entities and validation
        ├── setup.md            # Environment config
        ├── contracts/          # API specifications
        ├── tasks.md            # TDD execution tasks
        ├── validation/         # Verification checklists
        └── feedback.md         # Review findings
```

---

## Installation

Navigate to your project directory, then run:

**macOS, Linux, WSL:**

```bash
curl -fsSL https://raw.githubusercontent.com/petbrains/mvp-builder/main/scripts/install.sh | bash
```

**Windows PowerShell:**

```powershell
irm https://raw.githubusercontent.com/petbrains/mvp-builder/main/scripts/install.ps1 | iex
```

This installs:
- `.claude/` — commands, agents, skills, hooks
- `CLAUDE.md` — agent identity and rules
- `.mcp.json` — MCP server configuration

Start with `/docs:prd` to define your product.