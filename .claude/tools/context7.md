# Context7 MCP Commands

Context7 provides up-to-date documentation retrieval for libraries and packages. Follow the chain-of-thought process: THINK → RESOLVE → FETCH → APPLY

---

### Command: `!/mcp__context7__resolve-library-id` - Resolves a package name to a Context7-compatible library ID

**Purpose**: Returns a list of matching libraries with metadata for selection.

**Required:** Must call this BEFORE `get-library-docs` UNLESS the user explicitly provides a library ID in `/org/project` or `/org/project/version` format.

**When to skip resolve-library-id:**
- User explicitly mentions a path like `/vercel/next.js`
- User says "use /mongodb/docs" or "fetch from /facebook/react"
- The query contains a clear library ID format with forward slashes

**When to always use resolve-library-id:**
- User mentions library by name only: "React", "Next.js", "MongoDB"
- User says generic terms: "React docs", "Next documentation"
- Any ambiguity about which library to use

### Parameters
- `libraryName` (required, string): Library name to search for

### Returns
List of ALL matching libraries (typically 10-30+ results), each containing:
- **Title**: Library or package name
- **Context7-compatible library ID**: Format `/org/project`
- **Description**: Short summary of the library
- **Code Snippets**: Number of available code examples
- **Trust Score**: Authority indicator (1-10, higher is better)
- **Versions** (optional): Available versions if applicable

### Selection Process
1. Analyze query to understand what library user needs
2. Evaluate matches using this priority order:
   - **Name similarity** (exact matches always win)
   - **Trust score** (minimum 7 preferred, 9-10 ideal)
   - **Documentation coverage** (higher snippet counts = better)
   - **Description relevance** to query intent

**Decision rules:**
- If exact name match with trust ≥ 7: Select it
- If multiple high-trust options (≥ 9): Choose highest snippet count
- If trust scores are low (< 7): Prioritize snippet count
- If similar options exist: Choose official sources (check description)
- If still ambiguous: Request user clarification

**Common patterns:**
- `/reactjs/react.dev` vs `/facebook/react`: Choose based on need (docs vs source)
- Multiple UI libraries: Match description to user's specific need
- Version variants: Use default unless user specifies version

### Chain-of-Thought
Before executing, think:
- What's the exact package name vs common variations?
- Is this a framework, library, or tool?
- What naming conventions might apply?

### Examples

```xml
<example>
<thinking>User needs React. Common package name is "react"</thinking>
<command>/mcp__context7__resolve-library-id libraryName="react"</command>
<returns>
  30+ matches including:
  - /reactjs/react.dev - Trust: 10, Snippets: 2786
  - /facebook/react - Trust: 9.2, Snippets: 2864
  - /websites/react_dev - Trust: 8, Snippets: 4077
  ... (many more results)
</returns>
<selection>Select /reactjs/react.dev - highest trust, official docs</selection>
</example>
```

```xml
<example>
<thinking>Next.js could be "next.js", "nextjs", or "next"</thinking>
<command>/mcp__context7__resolve-library-id libraryName="next.js"</command>
<returns>
  8 matches including:
  - /vercel/next.js - Trust: 9.5, Snippets: 5000
  - /websites/nextjs_org - Trust: 8, Snippets: 3200
  ... (more results)
</returns>
<selection>Select /vercel/next.js - official library, highest trust</selection>
</example>
```

```xml
<example>
<thinking>Vue framework search</thinking>
<command>/mcp__context7__resolve-library-id libraryName="vue"</command>
<returns>
  15+ matches including:
  - /vuejs/core - Trust: 10, Snippets: 4500
  - /vuejs/vue-router - Trust: 9, Snippets: 2000
  - /vuetifyjs/vuetify - Trust: 8.5, Snippets: 3000
  ... (more results)
</returns>
<selection>Select /vuejs/core - exact name match, core library</selection>
</example>
```

---

### Command: `/mcp__context7__get-library-docs` - Fetches up-to-date documentation for a library using exact Context7-compatible library ID.

**Required:** Must call `resolve-library-id` first UNLESS user provides library ID in `/org/project` format.

### Parameters
- `context7CompatibleLibraryID` (required, string): Exact ID from resolve-library-id or user (e.g., `/vercel/next.js`)
- `topic` (optional, string): Specific topic to focus on (e.g., "routing", "hooks")
- `tokens` (optional, number): Max tokens to retrieve (default: 10000, range: 1000-20000)

### Token Strategy
Choose tokens based on the user's specific need:

- **Quick reference** (3000-5000): Single function, method, or concept lookup
  - "How to use useState?" 
  - "What parameters does fetch() take?"
  
- **Feature exploration** (6000-10000): Understanding a specific feature
  - "How does React context work?"
  - "Explain Next.js routing"
  
- **Implementation guide** (10000-15000): Step-by-step tutorials or complex features
  - "Implement authentication in Next.js"
  - "Build a custom hook for data fetching"
  
- **Comprehensive/learning** (15000-20000): Learning from scratch or deep dives
  - "Learn Tailwind CSS"
  - "Complete guide to React performance"
  - "All MongoDB aggregation operators"

### Topic Selection
Be specific with multi-word topics:
- Avoid: "api" → Use: "REST API endpoints"
- Avoid: "hooks" → Use: "useState useEffect lifecycle"
- Avoid: "css" → Use: "responsive design breakpoints"

### Chain-of-Thought
Before executing, think:
- What specific aspect of the library is needed?
- How much context is appropriate?
- Should I fetch multiple topics?

### Examples

```xml
<example>
<thinking>Routing in Next.js - need App Router docs</thinking>
<command>/mcp__context7__get-library-docs context7CompatibleLibraryID="/vercel/next.js" topic="app router routing" tokens="12000"</command>
</example>
```

```xml
<example>
<thinking>User provided ID directly, skip resolve</thinking>
<query>Get docs for /mongodb/docs about aggregation</query>
<command>/mcp__context7__get-library-docs context7CompatibleLibraryID="/mongodb/docs" topic="aggregation pipeline" tokens="15000"</command>
</example>
```

```xml
<example>
<thinking>Performance issue needs optimization docs</thinking>
<command>/mcp__context7__get-library-docs context7CompatibleLibraryID="/facebook/react" topic="memo useMemo performance" tokens="10000"</command>
</example>
```

```xml
<workflow>
<query>How to implement infinite scroll in React?</query>
<thinking>Need React virtualization and hooks documentation</thinking>
<resolve>/mcp__context7__resolve-library-id libraryName="react"</resolve>
<returns>
  30+ matches including:
  - /reactjs/react.dev - Trust: 10, Snippets: 2786
  - /facebook/react - Trust: 9.2, Snippets: 2864
  ... (many more results)
</returns>
<selection>Select /reactjs/react.dev for official documentation</selection>
<fetch>/mcp__context7__get-library-docs context7CompatibleLibraryID="/reactjs/react.dev" topic="infinite scroll virtualization" tokens="12000"</fetch>
</workflow>
```

```xml
<workflow>
<query>Debug Next.js hydration errors</query>
<thinking>SSR-specific issue, need debugging docs</thinking>
<resolve>/mcp__context7__resolve-library-id libraryName="next.js"</resolve>
<returns>
  8 matches including:
  - /vercel/next.js - Trust: 9.5, Snippets: 5000
  - /websites/nextjs_org - Trust: 8, Snippets: 3200
  ... (more results)
</returns>
<selection>Select /vercel/next.js - official library</selection>
<fetch>/mcp__context7__get-library-docs context7CompatibleLibraryID="/vercel/next.js" topic="hydration errors debugging SSR" tokens="15000"</fetch>
</workflow>
```

```xml
<workflow>
<query>Learn Tailwind CSS basics</query>
<thinking>New user needs comprehensive introduction</thinking>
<resolve>/mcp__context7__resolve-library-id libraryName="tailwindcss"</resolve>
<returns>
  5 matches including:
  - /tailwindlabs/tailwindcss - Trust: 9.8, Snippets: 4200
  - /websites/tailwindcss_com - Trust: 8.5, Snippets: 3100
  ... (more results)
</returns>
<selection>Select /tailwindlabs/tailwindcss - official source</selection>
<fetch>/mcp__context7__get-library-docs context7CompatibleLibraryID="/tailwindlabs/tailwindcss" topic="getting started" tokens="15000"</fetch>
<fetch>/mcp__context7__get-library-docs context7CompatibleLibraryID="/tailwindlabs/tailwindcss" topic="utility classes" tokens="10000"</fetch>
</workflow>
```

---

## Error Handling

**No matches found**: 
- Try alternative names (e.g., "vue.js" → "vue", "nodejs" → "node")
- Try broader terms (e.g., "react-query" → "tanstack")
- Ask user for clarification on library name

**Multiple equally good matches**:
- Example: Both have trust 10 and high snippets
- Solution: Ask user "Do you want the official documentation or the source repository?"

**Wrong library returned**: 
- If user says "that's not the right library"
- Re-run resolve with different search term
- Show user the available options for them to choose

**Topic too broad**: Make topic more specific  
**Insufficient docs**: Increase token count or try different topic

## Best Practices

1. **Always think before executing** - What does the user really need?
2. **Resolve first** - Unless user provides `/org/project` format
3. **Be specific with topics** - Multi-word topics get better results
4. **Scale tokens appropriately** - Don't always use maximum
5. **Chain related fetches** - Build complete context when needed
6. **Trust score matters** - Prefer libraries with scores ≥ 7

## Quick Reference

```
1. THINK: What library and specific documentation needed?
2. RESOLVE: /mcp__context7__resolve-library-id libraryName="[package]"
3. SELECT: Choose based on trust, snippets, relevance
4. FETCH: /mcp__context7__get-library-docs context7CompatibleLibraryID="[id]" topic="[specific]" tokens="[appropriate]"
5. APPLY: Use documentation to answer user's question
```