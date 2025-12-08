#!/usr/bin/env bash

# Codebase scanner for code-analyzer skill
# Usage: ./scan-codebase.sh
#
# Auto-detects project root (git root or pwd) and outputs JSON with:
# - structure: files, extensions, configs, directories
# - markers: AICODE-NOTE, AICODE-TODO, AICODE-FIX
# - git: branch, modified, added, deleted files
#
# No external dependencies (jq not required).
# This script provides its own JSON helpers (json_escape, array_to_json) to avoid jq.
# Note: The related script 'feature-analyzer/scripts/check-prerequisites.sh' does require jq for JSON parsing.

set -e

# Auto-detect project root
PROJECT_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)

# Exclusion patterns
EXCLUDE_DIRS="node_modules|\.git|dist|build|__pycache__|\.venv|venv|ai-docs|\.next|\.nuxt|coverage|\.cache|\.idea|\.vscode"

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

# Escape string for JSON (without jq)
json_escape() {
    local str="$1"
    str="${str//\\/\\\\}"      # backslash
    str="${str//\"/\\\"}"      # double quote
    str="${str//$'\n'/\\n}"    # newline
    str="${str//$'\r'/\\r}"    # carriage return
    str="${str//$'\t'/\\t}"    # tab
    printf '%s' "$str"
}

# Array to JSON array
array_to_json() {
    local arr=("$@")
    if [[ ${#arr[@]} -eq 0 ]]; then
        printf '[]'
        return
    fi
    printf '['
    local first=true
    for item in "${arr[@]}"; do
        if [[ "$first" == true ]]; then
            first=false
        else
            printf ','
        fi
        printf '"%s"' "$(json_escape "$item")"
    done
    printf ']'
}

# ============================================================================
# STRUCTURE: files, extensions, configs, directories
# ============================================================================

# Count total files (excluding hidden and excluded dirs)
total_files=$(find "$PROJECT_DIR" -type f \
    -not -path "*/\.*" \
    2>/dev/null \
    | grep -vE "/($EXCLUDE_DIRS)/" \
    | wc -l | tr -d ' ')

# Get extension distribution (top extensions)
# Format: ".ext": count, ...
extensions_json=$(find "$PROJECT_DIR" -type f \
    -not -path "*/\.*" \
    2>/dev/null \
    | grep -vE "/($EXCLUDE_DIRS)/" \
    | sed 's/.*\./\./' \
    | grep '^\.' \
    | sort | uniq -c | sort -rn \
    | head -20 \
    | awk '{printf "%s\"%s\": %d", (NR==1?"":", "), $2, $1}')

# Detect config files
config_files=()
config_patterns=(
    "package.json" "package-lock.json" "yarn.lock" "pnpm-lock.yaml"
    "tsconfig.json" "jsconfig.json"
    "vite.config.*" "webpack.config.*" "rollup.config.*"
    "next.config.*" "nuxt.config.*" "astro.config.*"
    "nest-cli.json" "angular.json"
    "Cargo.toml" "Cargo.lock"
    "go.mod" "go.sum"
    "pyproject.toml" "setup.py" "requirements.txt" "Pipfile"
    "composer.json"
    "Gemfile" "Gemfile.lock"
    "Makefile" "CMakeLists.txt"
    "Dockerfile" "docker-compose.yml" "docker-compose.yaml"
    "tailwind.config.*" "postcss.config.*"
    "jest.config.*" "vitest.config.*" "playwright.config.*"
    ".eslintrc*" ".prettierrc*" "biome.json"
)

for pattern in "${config_patterns[@]}"; do
    while IFS= read -r file; do
        if [[ -n "$file" ]]; then
            config_files+=("$(basename "$file")")
        fi
    done < <(find "$PROJECT_DIR" -maxdepth 2 -name "$pattern" -type f 2>/dev/null)
done

# Remove duplicates from config_files
if [[ ${#config_files[@]} -gt 0 ]]; then
    config_files=($(printf '%s\n' "${config_files[@]}" | sort -u))
fi

# Get top-level directories (potential modules)
directories=()
while IFS= read -r dir; do
    dirname=$(basename "$dir")
    # Skip hidden and excluded
    if [[ ! "$dirname" =~ ^\. ]] && [[ ! "$dirname" =~ ^(node_modules|dist|build|__pycache__|coverage)$ ]]; then
        directories+=("$dirname/")
    fi
done < <(find "$PROJECT_DIR" -maxdepth 1 -type d 2>/dev/null | tail -n +2 | sort)

# Get src subdirectories if src exists (common module pattern)
src_modules=()
if [[ -d "$PROJECT_DIR/src" ]]; then
    while IFS= read -r dir; do
        dirname=$(basename "$dir")
        if [[ ! "$dirname" =~ ^\. ]]; then
            src_modules+=("src/$dirname/")
        fi
    done < <(find "$PROJECT_DIR/src" -maxdepth 1 -type d 2>/dev/null | tail -n +2 | sort)
fi

# ============================================================================
# MARKERS: AICODE-NOTE, AICODE-TODO, AICODE-FIX
# ============================================================================

# Function to extract markers
extract_markers() {
    local marker_type="$1"
    local first=true
    
    while IFS=: read -r file line text; do
        if [[ -n "$file" ]] && [[ -n "$line" ]]; then
            # Get relative path
            rel_file="${file#$PROJECT_DIR/}"
            # Clean up text (remove marker prefix, trim, limit length)
            clean_text=$(echo "$text" | sed "s/.*AICODE-$marker_type:[[:space:]]*//" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | head -c 200)
            # Escape for JSON
            clean_text=$(json_escape "$clean_text")
            
            if [[ "$first" == true ]]; then
                first=false
            else
                printf ','
            fi
            printf '{"file": "%s", "line": %s, "text": "%s"}' \
                "$(json_escape "$rel_file")" "$line" "$clean_text"
        fi
    done < <(grep -rn "AICODE-$marker_type:" "$PROJECT_DIR" \
        --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
        --include="*.py" --include="*.go" --include="*.rs" --include="*.java" \
        --include="*.c" --include="*.cpp" --include="*.h" --include="*.hpp" \
        --include="*.rb" --include="*.php" --include="*.swift" --include="*.kt" \
        --include="*.scala" --include="*.cs" --include="*.vue" --include="*.svelte" \
        --include="*.sh" --include="*.bash" \
        2>/dev/null | grep -vE "/($EXCLUDE_DIRS)/" || true)
}

# ============================================================================
# GIT: branch, modified, added, deleted
# ============================================================================

is_git_repo=false
git_branch=""
git_modified=()
git_added=()
git_deleted=()

if [[ -d "$PROJECT_DIR/.git" ]] || git -C "$PROJECT_DIR" rev-parse --git-dir >/dev/null 2>&1; then
    is_git_repo=true
    
    # Current branch
    git_branch=$(git -C "$PROJECT_DIR" branch --show-current 2>/dev/null || echo "")
    
    # Parse git status
    while IFS= read -r line; do
        if [[ -n "$line" ]]; then
            status="${line:0:2}"
            file="${line:3}"
            
            case "$status" in
                " M"|"MM"|"AM"|"M ") git_modified+=("$file") ;;
                "A "|"??") git_added+=("$file") ;;
                " D"|"D ") git_deleted+=("$file") ;;
                "R "*) 
                    # Renamed file: format is "R  oldname -> newname"
                    newfile="${file##*-> }"
                    git_modified+=("$newfile")
                    ;;
                "RM")
                    # Renamed and modified
                    newfile="${file##*-> }"
                    git_modified+=("$newfile")
                    ;;
                "C "*) 
                    # Copied file: format is "C  oldname -> newname"
                    newfile="${file##*-> }"
                    git_added+=("$newfile")
                    ;;
            esac
        fi
    done < <(git -C "$PROJECT_DIR" status --porcelain 2>/dev/null || true)
fi

# ============================================================================
# OUTPUT JSON
# ============================================================================

cat << EOF
{
  "project_root": "$(json_escape "$PROJECT_DIR")",
  "structure": {
    "total_files": $total_files,
    "extensions": {$extensions_json},
    "configs": $(array_to_json "${config_files[@]}"),
    "directories": $(array_to_json "${directories[@]}"),
    "src_modules": $(array_to_json "${src_modules[@]}")
  },
  "markers": {
    "AICODE-NOTE": [$(extract_markers "NOTE")],
    "AICODE-TODO": [$(extract_markers "TODO")],
    "AICODE-FIX": [$(extract_markers "FIX")]
  },
  "git": {
    "is_repo": $is_git_repo,
    "branch": "$git_branch",
    "modified": $(array_to_json "${git_modified[@]}"),
    "added": $(array_to_json "${git_added[@]}"),
    "deleted": $(array_to_json "${git_deleted[@]}")
  }
}
EOF