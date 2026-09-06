#!/usr/bin/env bash

# Feature artifacts scanner
# Usage: ./check-prerequisites.sh /path/to/feature/folder
#
# Scans feature directory for required artifacts and outputs their status

set -e

# Feature directory must be provided as argument
if [[ -z "$1" ]]; then
    echo "ERROR: Feature directory path required" >&2
    echo "Usage: $0 /path/to/feature/folder" >&2
    exit 1
fi

# Convert to absolute path
FEATURE_DIR=$(cd "$1" 2>/dev/null && pwd) || {
    echo "ERROR: Feature directory not found: $1" >&2
    exit 1
}

# Define expected artifacts
SPEC="$FEATURE_DIR/spec.md"
UX="$FEATURE_DIR/ux.md"
PLAN="$FEATURE_DIR/plan.md"
TASKS="$FEATURE_DIR/tasks.md"
DATA_MODEL="$FEATURE_DIR/data-model.md"
RESEARCH="$FEATURE_DIR/research.md"
SETUP="$FEATURE_DIR/setup.md"
CONTRACTS_DIR="$FEATURE_DIR/contracts"

# Build list of available documents
available_docs=()
missing_docs=()

# Check each artifact
for file in "$SPEC" "$UX" "$PLAN" "$TASKS" "$DATA_MODEL" "$RESEARCH" "$SETUP"; do
    filename=$(basename "$file")
    if [[ -f "$file" ]]; then
        available_docs+=("$filename")
    else
        missing_docs+=("$filename")
    fi
done

# Check contracts directory
if [[ -d "$CONTRACTS_DIR" ]] && [[ -n "$(ls -A "$CONTRACTS_DIR" 2>/dev/null)" ]]; then
    available_docs+=("contracts/")
else
    missing_docs+=("contracts/")
fi

# Output JSON result
FEATURE_DIR_JSON=$(printf '%s' "$FEATURE_DIR" | jq -Rr @json)
printf '{"FEATURE_DIR":%s,"AVAILABLE":[' "$FEATURE_DIR_JSON"
first=true
for doc in "${available_docs[@]}"; do
    if [ "$first" = true ]; then
        first=false
    else
        printf ','
    fi
    printf '"%s"' "$doc"
done
printf '],"MISSING":['
first=true
for doc in "${missing_docs[@]}"; do
    if [ "$first" = true ]; then
        first=false
    else
        printf ','
    fi
    printf '"%s"' "$doc"
done
printf ']}\n'

# Exit with error if any core files missing
if [[ ! -f "$SPEC" ]] || [[ ! -f "$UX" ]] || [[ ! -f "$PLAN" ]] || [[ ! -f "$TASKS" ]]; then
    exit 1
fi