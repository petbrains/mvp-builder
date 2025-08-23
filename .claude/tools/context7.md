# Context7 MCP Commands

Context7 provides up-to-date documentation retrieval for libraries and packages. Always resolve library IDs first, then fetch documentation.

---

### !`/mcp__context7__resolve-library-id` - Resolves a package/product name to a Context7-compatible library ID. Use before get-library-docs to find the correct library identifier.
**Params:**
- libraryName="<package_name>" - Library name to search for

```xml
<example>
/mcp__context7__resolve-library-id  libraryName="react"
</example>
```

```xml
<example>
/mcp__context7__resolve-library-id  libraryName="next.js"
</example>
```

```xml
<bad_example>
/mcp__context7__resolve-library-id  libraryName=""
</bad_example>
```

**Selection Process:**
- Prioritizes exact name matches
- Considers description relevance to query intent  
- Favors libraries with higher documentation coverage
- Considers trust scores (7-10 are more authoritative)
- For ambiguous queries, requests clarification

---

### !`/mcp__context7__get-library-docs` - Fetches up-to-date documentation for a library. Must use exact Context7-compatible library ID from resolve-library-id.
**Params:**
- context7CompatibleLibraryID="<library_id>" - Exact library ID (e.g., '/vercel/next.js', '/mongodb/docs')
- topic="<focus_topic>" - Specific topic to focus documentation on (optional)
- tokens=10000 - Maximum tokens of documentation to retrieve

```xml
<example>
/mcp__context7__get-library-docs  context7CompatibleLibraryID="/vercel/next.js"  topic="routing"  tokens="8000"
</example>
```

```xml
<example>
/mcp__context7__get-library-docs  context7CompatibleLibraryID="/mongodb/docs"  topic="aggregation"
</example>
```

```xml
<bad_example>
/mcp__context7__get-library-docs  context7CompatibleLibraryID="react"
</bad_example>
```

---

## Workflow

1. **Resolve Library**: Always start with `/mcp__context7__resolve-library-id` to find the correct library identifier
2. **Get Documentation**: Use the returned library ID with `/mcp__context7__get-library-docs`
3. **Focus Topics**: Use the topic parameter to get relevant documentation sections
4. **Manage Tokens**: Adjust token count based on how much context you need

```xml
<example>
# Step 1: Find the library
/mcp__context7__resolve-library-id  libraryName="tailwindcss"

# Step 2: Get focused documentation  
/mcp__context7__get-library-docs  context7CompatibleLibraryID="/tailwindlabs/tailwindcss"  topic="responsive design"  tokens="6000"
</example>
```