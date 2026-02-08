#!/bin/bash
# SessionStart hook — inject project context into Claude's context window
# Reads: HANDOFF.md, PRD.md, FEATURES.md, README.md
# Returns: additionalContext via JSON stdout
#
# Files are optional — missing files are silently skipped.
# First session (empty project) returns minimal or empty context.

set -e

AI_DOCS="$CLAUDE_PROJECT_DIR/ai-docs"
CONTEXT=""

# Helper: append file content with header
append_file() {
  local file="$1"
  local label="$2"
  
  if [ -f "$file" ] && [ -s "$file" ]; then
    CONTEXT="${CONTEXT}--- ${label} ---\n$(cat "$file")\n\n"
  fi
}

# Load in priority order: handoff first (most actionable), then reference docs
append_file "$AI_DOCS/HANDOFF.md" "HANDOFF (session continuity)"
append_file "$AI_DOCS/PRD.md" "PRD (product vision)"
append_file "$AI_DOCS/FEATURES.md" "FEATURES (feature map)"
append_file "$AI_DOCS/README.md" "README (code map)"

# If nothing loaded — first session or empty project
if [ -z "$CONTEXT" ]; then
  echo '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":""}}'
  exit 0
fi

# Escape for JSON using python's json.dumps for portability
ESCAPED=$(printf '%s' "$CONTEXT" | python3 -c 'import json, sys; s = sys.stdin.read(); print(json.dumps(s)[1:-1])')

cat << EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "${ESCAPED}"
  }
}
EOF