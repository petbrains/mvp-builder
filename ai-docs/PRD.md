# SpendNote - Product Requirements Document

## Core Proposition

### Target User
- Individuals who want minimal, no-friction expense tracking
- Users frustrated by bloated finance apps with unnecessary complexity
- People who need simple daily expense logging without budgeting frameworks

### Problem Statement
- Large finance apps are bloated and slow to use
- Too many steps required to log a single expense
- Unnecessary features create friction: bank sync, investments, complex budgeting
- Users abandon tracking due to app complexity

### Core Solution
- Lightweight web app focused on speed and simplicity
- Quick expense recording with minimal steps
- Simple categorization without complex hierarchies
- Clear monthly summaries for spending insights
- No unnecessary complexity—fast, clean expense logging only

### Non-Goals
- Bank account synchronization
- Investment tracking
- Budgeting frameworks or allocation systems
- Complex financial analytics
- Multi-currency advanced features

## Solution Design

### Core User Flow
1. User visits app → Clean login/sign-up screen
2. After login → Dashboard displays:
   - "Add Expense" shortcut
   - Today's expenses list
   - Current month total
3. User taps "Add Expense" → Minimal form with:
   - Amount (required, autofocus)
   - Category (required)
   - Date (required, default: today)
   - Note (optional)
4. User submits → Expense appears instantly, totals refresh
5. User can scroll/filter expenses by date or category
6. User can edit or delete any expense
7. User can open Monthly Summary → Total + category breakdown
8. User logs out or closes session

### Core MVP Feature: Expense Logging

#### Capabilities
- **EXP-CREATE**: Add new expense with amount, category, date, optional note
- **EXP-READ**: View expense list with today filter and full history
- **EXP-UPDATE**: Edit existing expense fields
- **EXP-DELETE**: Remove expense from record
- **EXP-VALIDATE**: Client and server-side validation

#### UI Design
- Ultra-minimal form with autofocus on amount field
- Default date to today (covers 90% use case)
- Four fields total, three required

#### Backend Requirements
- Validate: amount > 0, category exists, date valid
- Save expense tied to user_id
- Return updated expense list or success flag

#### Constraints
- Submission response under 200ms (optimistic UI updates)
- No multi-currency support
- No recurring expenses
- Goal: complete expense log in under 10 seconds

### Supporting Features

#### Authentication
- User sign-up with email/password
- Login and logout functionality
- Secure session management

#### Category Management
- Default categories provided on signup
- User can add custom categories
- User can remove/rename categories

#### Monthly Summary
- Total spent this month
- Per-category breakdown
- Visual representation of spending distribution

#### Filtering & Navigation
- Filter by month
- Filter by category
- Scrollable expense history

#### Platform & Security
- Responsive web UI (mobile-first)
- Basic error handling and validation messages
- Secure backend with per-user data isolation

## Technical Requirements

### Tech Stack

#### Backend
- **Language**: TypeScript
- **Runtime**: Node.js (LTS)
- **Framework**: Express (lightweight, no heavy frameworks)
- **Database**: PostgreSQL (production), SQLite (local/dev)
- **ORM**: Prisma (migrations, type-safety, excellent DX)
- **Auth**: HTTP-only cookie sessions (simpler, XSS-resistant)
- **Validation**: Zod (request DTOs, shareable with frontend)

#### Frontend
- **Framework**: React
- **Bundler**: Vite (fast HMR)
- **Styling**: Tailwind CSS + custom components (no heavy UI kit)
- **Server State**: React Query (caching, optimistic updates)
- **Client State**: Local component state (no Redux)
- **Routing**: React Router

#### API & Testing
- **API Style**: JSON REST over HTTPS
- **Backend Testing**: Jest + Supertest (API routes)
- **Frontend Testing**: Vitest + React Testing Library (smoke tests for core flows)

### Technical Constraints

#### Scale Limits
- Target: up to 10,000 registered users (single-node deployment)
- Per user:
  - Up to 50 categories
  - Up to 100,000 expenses

#### Rate Limiting
- Auth endpoints: max 10 requests/minute/IP
- App endpoints: max 120 requests/minute/user

#### Performance Goals
- API p95 response time: < 200ms for main operations (create/list expenses)
- Initial dashboard load: < 1s on decent connection (after first visit, with caching)

#### Storage
- Single PostgreSQL instance
- Estimated footprint per user: minimal
- No sharding at MVP stage

#### Security Requirements
- Passwords hashed with bcrypt or argon2
- Session tokens expire with configurable TTL
- Support logout-all-sessions functionality
- Per-user data isolation enforced at query level

## UX Details

### Platform Strategy
- **Primary**: Mobile-first responsive web app
- **Design Philosophy**: Minimal + functional
- **Interaction Focus**: Speed over aesthetics

### Visual Design

#### Color Scheme
- **Base**: Neutral (white / light gray backgrounds)
- **Accent**: Single color (blue or green) for primary actions
- **Semantic**: Red for errors, subtle green for success
- **Dark Theme**: Not included in MVP

#### Typography & Style
- Clean, readable typography
- No decorative elements
- No gradients
- High contrast for readability

### Accessibility Requirements
- WCAG AA contrast compliance for all text
- All form fields operable via keyboard (no mouse required)
- Minimum tap target size: 44px height
- Focus indicators on interactive elements

### Interaction Design

#### Animations
- Micro-animations only:
  - Button press feedback
  - Input focus states
- No page transition animations
- Instant feedback on form submission (optimistic UI)

#### Form Behavior
- Autofocus on primary field (amount)
- Large tappable areas
- Single-column layout on mobile
- Inline validation messages near fields

### UI Patterns

#### Dashboard Layout
- Quick-add button (sticky bottom on mobile)
- Today's expenses list
- Current month total display
- Filters at top: month selector, category dropdown

#### Expense Creation
- One-screen modal or slide-up panel
- Minimal fields visible
- Submit button always visible

#### Error Handling
- Inline validation messages adjacent to fields
- Toast notifications for server/network errors
- No full-page error screens (unless critical)

### Navigation Structure

#### Mobile (Tab Bar)
1. Dashboard - Home view with quick actions
2. Expenses - Full expense list with filters
3. Summary - Monthly breakdown and insights
4. Categories - Category management
5. Account - User settings and logout

#### Desktop (Sidebar)
- Same sections as mobile tab bar
- Persistent sidebar navigation
- Expanded labels with icons
