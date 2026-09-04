# CLAUDE.md

Code execution rules and MVP development standards.

## Required Context

Read these documents at session start (when they exist):
- `ai-docs/PRD.md` — product vision, audience, problem
- `ai-docs/FEATURES.md` — feature map, dependencies, priorities
- `ai-docs/README.md` — current implementation status

## Development Rules

### Execution Priority

Agents execute from existing specs — they do not re-plan.

- Specs, plans, and tasks exist BEFORE agents run. The planning phase is complete.
- After loading context, produce code changes within first 3 tool calls
- Do NOT create plan files, analysis documents, or enter planning mode during task execution
- Do NOT re-read all project files to "understand the codebase" — read only files referenced by current task
- Task tracking (TODO): track progress on existing tasks only, never create new plans
- Sequential Thinking: use for debugging and complex logic, not for upfront analysis of entire features
- Context7: fetch docs when hitting unfamiliar API, not preemptively for all libraries
- Subagents: request list of key files in return, read them after completion — don't re-scan independently
- If task has clear requirements and single-file scope — start coding immediately

### Harness Orchestration

Feature implementation runs as an agent pipeline driven from the main chat. Dialogue stages
are skills executed in the main session (`/prd`, `/feature`, `/clarify`, `/validation`);
implementation stages are dispatched to agents. Main session = orchestrator and validator
between agents. It runs the dialogue skills, dispatches agents, validates reports, and owns
the docs — it does not implement inside the pipeline.

Pipeline per feature:
1. Chat (dialogue, decisions live here): `/prd` → `/feature` → `/clarify`
2. `feature-docs` → creates `feature/[name]` branch, generates ux → ui → plan → tasks;
   auto-resolves architecture per its Decision Policy, flags uncertain decisions
3. Acceptance: orchestrator reviews report + Key Decisions; architectural/technical ⚠ items the
   orchestrator resolves and pins itself; only intellectual items (content, copy, assets, domain
   semantics, data governance, product policy) go to the user; overrides → re-dispatch
   `feature-docs` with pinned decisions
4. `/validation` (orchestrator invokes the skill itself as a pipeline step) → architectural
   checklist items the orchestrator resolves itself (recorded
   in resolutions.md); dialogue with the user only on intellectual items; orchestrator commits
   doc edits from acceptance and validation on the feature branch
5. `feature-setup` → validate report; if setup exposed doc gaps — fix feature docs before next step
6. `feature-tdd` → validate completion report against tasks.md
7. `feature-review` → read feedback.md; if findings trace to wrong/ambiguous docs — fix docs first
8. BLOCKED → `feature-fix` → `feature-review` again; repeat until PASSED
9. PASSED → `feature-memory` (updates the code map; README.md capped at 1000 lines)

Orchestrator duties:
- Validate every agent report before dispatching the next — spot-check key files it names, don't re-scan
- Doc edits between stages (spec/plan/tasks/validation) are orchestrator's job, never the
  agents' — this governs doc *content*; execution tracking (checkboxes, TDD/REV inline
  context, closure records) belongs to the stage agents per their definitions
- **Decision boundary**: architectural/technical questions the orchestrator decides autonomously
  and records as pinned (technical aspects were settled at the PRD stage); only intellectual
  questions — content, copy, assets, domain semantics, data governance, product policy — go to
  the user
- **Commit discipline**: every stage ends in a conscious commit per Git Workflow conventions
  (below) — agents commit their own completed blocks (docs chain, setup phase, each TDD cycle,
  each REV fix, review artifacts, memory update); the orchestrator commits acceptance and
  validation doc edits. No stage is dispatched over a dirty tree; no reminder should ever be needed
- **Loop breaker**: same REV finding survives 2 review↔fix cycles, or feature-fix escalates →
  stop dispatching. Apply final code and doc fixes directly in main session, run Verification
  Order, close remaining tasks/CHK yourself

### Focus
- Single value path: one critical journey only
- One screen = one primary action
- Document Non-Goals explicitly in PRD
- Deliverable outcomes over individual commits
- Tasks: broad enough to be meaningful, specific enough to be actionable
- Avoid micro-tasks that clutter plans

### TDD Workflow
- RED → GREEN cycles when tasks.md exists
- Complete tests before implementation
- Verify test fails before writing implementation
- Verify test fails for expected reason (not syntax/import/setup errors)
- No stub tests or always-passing mocks
- No test-only methods in production code
- Tests must be isolated — no dependencies between tests
- Test behavior, not implementation details (no internal state assertions)

### Goal Transformation
Before starting any task, convert vague requests into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write test reproducing bug, then make it pass"
- "Refactor X" → "Verify tests pass before AND after changes"
- If success criteria can't be defined — stop and ask for clarification

### Traceability IDs

Feature artifacts use consistent ID system:
- **FR-XXX, UX-XXX**: Requirements in spec.md
- **[US1], [US2]**: User stories from acceptance scenarios
- **INIT-/TEST-/IMPL-**: Task prefixes in tasks.md
- **CHK###**: Validation checklist items

Maintain references when implementing: task → requirement → entity

### Specifications First
- No spec → no task
- Generate tasks.md from spec/ux/ui/plan before implementation
- Lock contracts in `ai-docs/features/[name]/contracts/`
- Use Given/When/Then for acceptance criteria
- ADR for irreversible architectural decisions

### Code Standards
- Atomic tasks: one task = one artifact
- Product stays runnable after each change
- Feature flags for new functionality
- Reversibility: prefer undoable choices
- Max 300-500 lines/file, 80-100 lines/function
- Line length: 100-120 characters
- No "god classes" - split by concern
- Prefer early returns over deep nesting
- Comments explain WHY, not WHAT
- Comment claims must match actual code (signatures, behavior, types); edge cases mentioned must actually be handled
- Must pass lint/type-check before done

### Type Design
- Make illegal states unrepresentable; validate invariants at construction time
- Prefer compile-time guarantees over runtime checks
- Immutability simplifies invariant maintenance
- Anti-patterns: anemic domain models with no behavior, types exposing mutable internals,
  invariants enforced only through documentation, external code responsible for maintaining
  type invariants, missing validation at construction boundaries

### Surgical Changes
- Every changed line must trace to the current task — no drive-by improvements
- Match existing style: quotes, spacing, naming, patterns — even if you'd do it differently
- Don't "improve" adjacent code, comments, or formatting
- Don't refactor what isn't broken — mention it, don't fix it
- Orphan cleanup: remove imports/variables YOUR changes made unused; leave pre-existing dead code alone

### Verification Order
Before claiming task complete, verify in sequence:
1. Build passes
2. Types pass
3. Lint passes
4. Tests pass

Stop on first failure. Fix before proceeding.

### Naming Conventions
- Files: descriptive names matching content (user-auth.ts not auth.ts)
- Functions: verb-noun pattern (validateUser not validate)
- Variables: clear intent (userEmail not email, isLoading not loading)
- No abbreviations unless standard (URL, API)
- Semantic folder structure matching mental model

### Error Handling
- Every user-facing error actionable: what went wrong + what to do; non-technical language for
  users, technical details (operation, file, IDs) for developers
- Never fail silently: empty catch blocks forbidden — always log or rethrow; never silently
  return null/undefined/default on error without logging
- Catch blocks specific to expected error types — broad catches hide unrelated errors
- Fallback behavior explicit and justified — never mask the real problem
- Mock/fake implementations belong only in tests, never as production fallbacks
- Never expose secrets/tokens/keys
- Use `.env.example` with placeholders
- Default to least-privilege permissions

### Test Failures
- When test fails: read terminal logs fully
- Analyze actual error, not symptoms
- Apply Sequential Thinking Methodology for root cause analysis
- Fix root cause, never add mocks/stubs to pass
- Document non-trivial fixes with AICODE-FIX
- If 3+ fix attempts fail: stop, question architecture

### Simplification
- No code additions without explicit request
- No abstractions for single-use code
- No "flexibility" or "configurability" that wasn't requested
- No error handling for impossible scenarios
- No nested ternaries — use switch/if-else for multiple conditions
- Simplification preserves all functionality — only change how, never what
- If 200 lines could be 50 — rewrite before committing
- Question unexpected changes before applying
- Litmus test: would a senior engineer call this overcomplicated? If yes — simplify

### Self-Check
- After generating: verify each claim
- For critical changes: create verification table
- Double-check traceability: task → requirement → entity
- No completion claims with "should", "probably", "seems to" — run command first

## File Operations

- Check existence before reading - HALT if missing
- Never overwrite without confirmation
- Create parent directories automatically
- Use relative paths from {root}
- UTF-8 encoding

## UI/UX Rules

- Sane defaults, minimal fields
- Cover states: empty, loading, error, success
- Clear copy over decorative effects

## Validation & Errors

**Block and request clarification when:**
- Requirements ambiguous in intent or meaning (intellectual: content, copy, assets, domain
  semantics, data governance, product policy) — never guess product-owner knowledge
- Validation fails

**Decide autonomously (do not ask) when:**
- The question is architectural/technical: stack, structure, module shape, storage, testing
  strategy, mechanisms, tolerances — pick the recommended option, record decision + rationale
  as pinned, move on

**When uncertain:**
- State assumptions explicitly before implementing — don't proceed on silent guesses
- If multiple valid interpretations exist: architectural — pick one, record it with tradeoffs
  (pinned); intellectual — present them to the user with tradeoffs
- If a simpler approach exists than what was requested, say so
- Apply Sequential Thinking for complex analysis
- If still unclear and the question is intellectual: ask user for clarification
- Continue with confirmed parts while awaiting response

**If operation fails:**
1. HALT immediately
2. Report what succeeded
3. Provide error context
4. Ask how to proceed

## Git Workflow

Enforces repository conventions for branches, commits, and pushes.

### Conventions

#### Branch Naming

**Format:** `<prefix>/<description>` or `<prefix>/<scope>/<description>` (scope optional —
pipeline branches use `feature/[name]`)

**Prefixes:** `feature/`, `fix/`, `refactor/`, `docs/`, `chore/`, `hotfix/`, `release/`

**Regex:**
```regex
^(feature|fix|refactor|docs|chore)/[a-z0-9._-]+(/[a-z0-9._-]+)?$|^(hotfix|release)/[a-z0-9._-]+$
```

**Examples:**
```
feature/cv-upload
feature/auth/oauth-implementation
fix/payments/rounding-bug
hotfix/critical-security-patch
release/2.1.0
```

#### Commit Format
```
[KEY-123] <type>(<scope>): <summary>
```

**Types:** `feature`, `fix`, `refactor`, `docs`, `chore`, `test`, `build`, `ci`

**Rules:**
- Summary ≤50 chars
- Imperative mood

**Examples:**
```
[KEY-123] feature(auth): implement OAuth 2.0 flow
[KEY-456] fix(payments): correct VAT rounding
refactor(api): extract validation middleware
```

### Decision Rules

#### Source Branch
- feature/fix/refactor/docs/chore → from `main`
- hotfix → from `release/*` or `main`
- release → from `main`

#### Protected Branches

Never push directly: `main`, `master`, `release/*`, `hotfix/*`, `prod/*`

### Secret Protection

#### Protected Patterns

**Files (block commit):**
```
*.env, *.env.*, *.pem, *.key, *.p12, *.pfx, *.crt
credentials.*, secrets.*, *_secret.*, *.keystore
```

**Directories (block commit):** `.secrets/`, `.credentials/`

**Allowed exceptions:** `*.env.example`, `*.example`

#### Pre-Commit Check

Before any commit, scan staged files:
```bash
git diff --cached --name-only
```

If protected pattern detected:
1. Add pattern to `.gitignore`
2. Unstage file: `git reset HEAD [file]`
3. Continue commit without secret

#### .gitignore Management

If `.gitignore` missing — create with standard security block:
```gitignore
# Secrets - NEVER COMMIT
.env
.env.*
!.env.example
*.pem
*.key
*.p12
*.secret
.secrets/
.credentials/
```

If `.gitignore` exists but missing pattern — append it.

### Safety Guards

#### Block Operations

| Trigger | Action |
|---------|--------|
| Push to `main`/`master`/`release/*`/`prod/*` | Block → suggest PR |
| Force-push on shared branch | Block |
| Amend after push | Block → suggest new commit |
| Secret file in staged changes | Block → update .gitignore |
| Binary >100MB | Block |

#### Warn Only
- Binary >10MB

### Validation

Before commit/push:
1. Branch name matches convention?
2. Commit message format correct?
3. No secrets in staged files?
4. Not pushing to protected branch?

## Authentication

### By Platform

| Platform | Library |
|----------|---------|
| Next.js App Router | Auth.js v5 (`next-auth@beta`) + `@auth/prisma-adapter` |
| Express / Node API | Passport.js + JWT strategy |
| React Native / Expo | Expo Auth Session |
| iOS (Swift) | Sign in with Apple + Keychain for token storage |
| Android (Kotlin) | Google Identity Services + EncryptedSharedPreferences |
| Flutter | firebase_auth or flutter_appauth + flutter_secure_storage |
| Browser Extension | OAuth 2.0 via `chrome.identity` / `browser.identity` + `chrome.storage.session` |
| Python (FastAPI) | fastapi-users + python-jose + passlib |
| Python (Django) | django-allauth + djangorestframework-simplejwt |

### Non-negotiable Rules

- Never store sensitive data in JWT payload (it's readable)
- Credentials-based auth requires password hashing (`argon2` or `bcrypt`), on server only — never client-side
- Tokens: access token ≤15min, refresh token in httpOnly cookie
- Mobile: always use platform secure storage — never plain AsyncStorage or localStorage
- Browser extensions: never `localStorage` for tokens — use `chrome.storage.session`
- Session strategy: `jwt` for serverless, `database` when sessions must be revocable

## Docker

Use for: cloud deployment, CI/CD, team dev-environment consistency, Kubernetes, local DB/Redis
isolation. Skip for: serverless deployments, simple scripts, early prototyping.

- Production: multi-stage builds (`deps` → `builder` → `runner`), non-root user, `HEALTHCHECK`
- Node.js: base `node:20-alpine`; `npm ci --only=production` in production stage;
  `prisma migrate deploy` in CMD, not during build
- Python: base `python:3.12-slim`; multi-stage — runner copies only site-packages;
  `pip install --no-cache-dir` in builder; Poetry → `poetry export -f requirements.txt` +
  pip in runner (no Poetry in production image); Django `collectstatic --noinput` in builder,
  not at runtime; Gunicorn/Uvicorn as process manager — never `runserver` in production
- Dev compose: DB service with `healthcheck` + `depends_on` with `condition: service_healthy`;
  service name as DB host (`postgres`, not `localhost`)
- `.dockerignore` required — exclude `node_modules`, `dist`, `.env*`, `.git`, `__pycache__`,
  `.venv`, test files
- Pin base image versions in production (`node:20.11-alpine`, `python:3.12.2-slim`) — never `latest`

## Design Standards

### Token Architecture

Three-layer system — never skip layers:

```
Primitive (raw values)  →  Semantic (purpose)  →  Component (specific)
color-blue-600          →  color-primary        →  button-bg
```

- Never use raw color values in components — always reference semantic or component tokens
- Semantic layer enables theme switching (light/dark)
- Name tokens semantically (`space-sm`, `color-primary`), not by value (`spacing-8`, `blue-500`)

### Color System

- Use perceptually uniform color spaces (OKLCH preferred)
- Reduce saturation as you approach white or black; tint neutrals toward brand hue
- Never use pure black or pure white — always tint
- Never use gray text on colored backgrounds — use a darker shade of the background color
- 60-30-10 rule by visual weight: 60% neutral/surface, 30% secondary, 10% accent — keep accents rare
- Every color combination: WCAG AA contrast (4.5:1 normal text, 3:1 large text)
- Plan dark mode from project start — never retrofit; depth from surface lightness not shadow,
  desaturate accents, reduce body text weight slightly
- Never convey information through color alone — always add icon/text
- Theme (light/dark) derived from audience and viewing context, not default preference

### Typography

| Project Type | Heading | Body |
|--------------|---------|------|
| Modern SaaS | Plus Jakarta Sans | Inter |
| Corporate | Source Sans 3 | Source Serif 4 |
| Editorial | Playfair Display | Lora |
| Dev Tools | Geist | Inter |

- Load fonts efficiently — never block rendering; base 16px minimum on mobile
- Relative units for font sizes — respect user system settings; never disable user zoom/text scaling
- Line height 1.5–1.6 for body; +0.05–0.1 for light-on-dark text; max line length 65–75 characters
- Fewer sizes with more contrast — at least 1.25 ratio between scale steps
- Fluid sizing for marketing headings; fixed scale for app UI
- Max 2 typefaces per page — single family with weight variation often suffices
- Tabular/monospaced figures for data tables and aligned numbers

### UI Components (Web)

| Need | Library |
|------|---------|
| Forms, dialogs, tables, base UI | shadcn/ui |
| SaaS polish — tickers, marquees | Magic UI |
| Dramatic hero effects — spotlight, 3D | Aceternity UI |

### Animations

| Need | Library |
|------|---------|
| Plays/loops — loaders, feedback | Lottie |
| Reacts to input, has states | Rive |
| Hero backgrounds, entrance effects | Aceternity / Framer Motion |

Timing:

| Duration | Use |
|----------|-----|
| 100–150ms | Instant feedback (button press, toggle) |
| 200–300ms | State changes (hover, menu, tooltip) |
| 300–500ms | Layout changes (accordion, modal, drawer) |
| 500–800ms | Entrance animations (page load, hero) |

Easing:
- Custom exponential curves — never platform default linear/ease, never bounce or elastic
- Deceleration curve for entering, acceleration for exiting, symmetric for state toggles

Rules:
- Only animate transform and opacity — never layout properties (width, height, position)
- Never animate from scale(0) — start from ~scale(0.95) + transparent; exit ~75% of enter duration
- Stagger list items by 30–50ms; cap total stagger time
- Animations must be interruptible — never block user input
- Respect reduced motion preferences — keep functional animations, remove spatial motion
- Pause animations when not in viewport; no animation for high-frequency actions (100+/day)
- Popovers/popups scale from trigger; modals scale from center

### Assets — Free First

| Asset | Source |
|-------|--------|
| Icons | Iconify / Lucide |
| Avatars | DiceBear, Boring Avatars |
| Photos | Unsplash, Picsum |
| Illustrations | unDraw, Storyset |
| Backgrounds | Haikei, Hero Patterns |

AI generation only when custom branded asset needed and no free alternative exists.
Never use emojis as structural icons — always vector icons.

### Pipeline Artifacts Consumption

When `ai-docs/references/` contains generated artifacts (`design-system.md`, `style-guide.md`,
`screens/`), these are the source of truth for implementation. Platform-specific mapping rules
live in the platform rules (web/iOS) — loaded when present.

Token mapping:
- If design-system.md provides `codeSyntax` for a token — use that exact name in code.
  Auto-generated codeSyntax (marked `†`) should be verified against project conventions.
- Map tokens to platform abstractions (CSS variables, Asset Catalog, enums) — never inline raw
  values that exist as tokens.
- Tokens ordered by `usageCount`: high-frequency tokens are core to the design — prioritize
  their adoption in shared components.
- Tokens with quality warnings (hardcoded colors, orphan variables) may need designer review
  before adoption.

Style guide:
- Token bindings in style-guide.md are concrete instructions — apply exactly, not as suggestions.
- `usedIn` data confirms where tokens are actually applied — use for verification, not to limit scope.

Screen references:
- Screenshots in `screens/` are visual truth for validation during implementation.
- Skip system-provided elements visible in screenshots — rendered by the platform, not
  implemented by code (keyboard, status bar, home indicator; browser chrome, scrollbar).

Components:
- Before creating new components, check existing codebase for matching views. Reuse over recreation.
- Design-system.md `propertyClassification` guides implementation pattern:
  - `state` (Default/Pressed/Disabled) → platform system state mechanisms before custom enums
  - `size` (Small/Medium/Large) → platform size APIs or custom enum
  - `style` (Primary/Secondary) → single component with parameter when differences are cosmetic,
    separate components when structure differs
  - `content` toggles (HasIcon, ShowBadge) → optional parameters
- Figma design context from MCP is a specification, not code to port. Read design properties and
  build native platform code — never translate framework-specific output literally.

### Accessibility
- All interactive elements reachable by keyboard/assistive tech
- Focus states always visible — never remove without replacement
- Decorative elements hidden from assistive tech; labels on all icon-only buttons
- Touch targets: min 44×44pt (iOS) / 48×48dp (Android); min 8px gap between targets
- Hover effects gated behind pointer capability detection — touch users can't hover

### Spacing & Layout
- 4pt spacing base: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Vary spacing for hierarchy — not everything gets the same padding
- Mobile-first, then scale up; no horizontal scroll on mobile
- Avoid fixed viewport height on mobile — use dynamic values
- Respect platform safe areas (notch, home indicator, status bar)
- z-index: semantic scale (dropdown → sticky → modal-backdrop → modal → toast → tooltip)
- Not everything needs a card — spacing and alignment create grouping; never nest cards in cards

### Forms
- Visible label per input — never placeholder-only
- Error below related field with clear cause + fix
- Validate on blur, not keystroke; required fields marked visually
- Loading → success/error state on submit
- Prefer undo over confirmation dialogs for non-destructive actions
- Platform-appropriate input types for correct keyboard

### Navigation
- Bottom nav max 5 items with labels + icons
- Back navigation must be predictable and preserve state
- All key screens reachable via deep link
- One primary CTA per screen — secondary visually subordinate

### Quality Gate
- Lint: 0 errors; type check: 0 errors
- No runtime errors in console/logs; no failed network requests
- Mobile viewport works
- Verify both light and dark themes before delivery

## AI Documentation Structure

```
ai-docs/
├── PRD.md                 # Product vision and scope
├── README.md              # Implementation status (code map)
├── FEATURES.md            # Feature index and dependencies
├── references/            # Design systems, tokens, schemas, style guides, screens, API contracts, architecture notes
└── features/
    └── [feature-name]/
        ├── spec.md        # Requirements (FR-*, UX-*), acceptance scenarios
        ├── ux.md          # Flows, error handling, states
        ├── ui.md          # Component trees, DS mapping, layout structure
        ├── plan.md        # Technical approach, code organization
        ├── tasks.md       # TDD execution tasks
        ├── data-model.md  # Entities, constants, validation rules
        ├── research.md    # Technical decisions
        ├── setup.md       # Environment configuration
        ├── contracts/     # API specifications
        ├── validation/    # Quality checklists
        └── feedback.md    # Review findings (regenerated by feature-review agent)
```

## Session Continuity

Use searchable comment prefixes in code:
- AICODE-NOTE: critical implementation details
- AICODE-TODO: pending tasks to complete
- AICODE-FIX: non-trivial bug solutions (problem → cause → fix)

Before modifying code: grep for AICODE- prefixes
Before debugging: check for similar AICODE-FIX in codebase
After completing work: add AICODE-NOTE for complex logic

## Output Format

- Lead with status/answer
- List created/modified files with full paths
- End with clear next action

## Planning

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Anti-Rules

- "Just in case" features
- Changes without spec updates  
- Secrets in code/logs
- Long-lived branches
- Big PRs, dump commits
- Hardcoded absolute paths
- Implementing features without following TDD sequence
