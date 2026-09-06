#!/bin/bash
set -euo pipefail

# MVP Builder scaffold installer.
#
# Usage:
#   Local (from a cloned repo or the installed plugin directory):
#     scripts/install.sh [--platform claude|codex] [--rules web|mobile|all] [--standalone] [--yes]
#   Remote:
#     curl -fsSL https://raw.githubusercontent.com/app-builders-club/mvp-builder/main/scripts/install.sh | bash -s -- --standalone
#
# Installs into the CURRENT directory:
#   --platform claude (default):
#       scaffold/INSTRUCTIONS.md  -> CLAUDE.md
#       scaffold/rules/<preset>   -> .claude/rules/
#       scaffold/settings.json    -> .claude/settings.json
#     --standalone additionally copies plugin components for use WITHOUT the plugin:
#       agents/ -> .claude/agents/   skills/ -> .claude/skills/   .mcp.json -> .mcp.json
#   --platform codex:
#       scaffold/INSTRUCTIONS.md  -> AGENTS.md
#     (Codex agents/skills wiring lands in a later release)
#
# Scenarios (detected automatically):
#   clean   — nothing installed yet: copy all, write .mvp-builder-manifest
#   upgrade — .mvp-builder-manifest present: overwrite only files you have not modified;
#             modified files are kept, the new version is written next to them as <file>.new
#   legacy  — pre-plugin install detected (.claude/commands, .claude/agents, or an old
#             CLAUDE.md without a manifest): everything is backed up to
#             .mvp-builder-backup-<timestamp>/, superseded files removed, then clean install

REPO="app-builders-club/mvp-builder"
MANIFEST=".mvp-builder-manifest"
PLATFORM="claude"
RULES="all"
STANDALONE=0
ASSUME_YES=0

while [ $# -gt 0 ]; do
    case "$1" in
        --platform) PLATFORM="$2"; shift 2 ;;
        --rules)    RULES="$2"; shift 2 ;;
        --standalone) STANDALONE=1; shift ;;
        --yes)      ASSUME_YES=1; shift ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
done

case "$PLATFORM" in claude|codex) ;; *) echo "❌ --platform must be claude or codex"; exit 1 ;; esac
case "$RULES" in
    web)    RULE_FILES="frontend backend" ;;
    mobile) RULE_FILES="backend mobile ios" ;;
    all)    RULE_FILES="frontend backend mobile ios" ;;
    *) echo "❌ --rules must be web, mobile or all"; exit 1 ;;
esac

echo ""
echo "🚀 MVP Builder installer (platform: $PLATFORM, rules: $RULES)"
echo ""

hash_file() {
    if command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1" | cut -d' ' -f1
    else sha256sum "$1" | cut -d' ' -f1; fi
}

confirm() {
    [ "$ASSUME_YES" = "1" ] && return 0
    read -p "$1 (y/N) " -n 1 -r </dev/tty; echo ""
    [[ $REPLY =~ ^[Yy]$ ]]
}

# --- Resolve source: sibling scaffold/ (cloned repo / plugin dir) or download ---
SCRIPT_PATH="${BASH_SOURCE[0]:-$0}"
SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" 2>/dev/null && pwd || echo "")"
SRC_ROOT=""
if [ -n "$SCRIPT_DIR" ] && [ -d "$SCRIPT_DIR/../scaffold" ]; then
    SRC_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
    echo "📦 Source: local ($SRC_ROOT)"
else
    for cmd in curl unzip; do
        command -v "$cmd" >/dev/null 2>&1 || { echo "❌ Required: $cmd"; exit 1; }
    done
    TEMP_DIR=$(mktemp -d); trap 'rm -rf "$TEMP_DIR"' EXIT
    RELEASE_INFO=$(curl -fsSL -H "User-Agent: mvp-builder" "https://api.github.com/repos/$REPO/releases/latest" 2>/dev/null || echo "")
    if echo "$RELEASE_INFO" | grep -q '"zipball_url"'; then
        VERSION=$(echo "$RELEASE_INFO" | grep '"tag_name"' | sed -E 's/.*"tag_name": *"([^"]+)".*/\1/')
        DOWNLOAD_URL=$(echo "$RELEASE_INFO" | grep '"zipball_url"' | sed -E 's/.*"zipball_url": *"([^"]+)".*/\1/')
    else
        VERSION="main"
        DOWNLOAD_URL="https://github.com/$REPO/archive/refs/heads/main.zip"
    fi
    echo "📦 Source: download ($VERSION)"
    curl -fsSL -H "User-Agent: mvp-builder" "$DOWNLOAD_URL" -o "$TEMP_DIR/repo.zip"
    unzip -q "$TEMP_DIR/repo.zip" -d "$TEMP_DIR"
    SRC_ROOT=$(find "$TEMP_DIR" -maxdepth 1 -type d ! -path "$TEMP_DIR" | head -1)
    [ -d "$SRC_ROOT/scaffold" ] || { echo "❌ scaffold/ not found in download"; exit 1; }
fi

# --- Build install list: "src|dst" pairs ---
PAIRS=""
add_pair() { PAIRS="$PAIRS$1|$2"$'\n'; }

if [ "$PLATFORM" = "claude" ]; then
    add_pair "$SRC_ROOT/scaffold/INSTRUCTIONS.md" "CLAUDE.md"
    add_pair "$SRC_ROOT/scaffold/settings.json" ".claude/settings.json"
    for r in $RULE_FILES; do
        add_pair "$SRC_ROOT/scaffold/rules/$r.md" ".claude/rules/$r.md"
    done
    if [ "$STANDALONE" = "1" ]; then
        add_pair "$SRC_ROOT/.mcp.json" ".mcp.json"
        while IFS= read -r f; do
            add_pair "$f" ".claude/agents/$(basename "$f")"
        done < <(find "$SRC_ROOT/agents" -type f -name "*.md" | sort)
        while IFS= read -r f; do
            add_pair "$f" ".claude/skills/${f#"$SRC_ROOT"/skills/}"
        done < <(find "$SRC_ROOT/skills" -type f | sort)
    fi
else
    add_pair "$SRC_ROOT/scaffold/INSTRUCTIONS.md" "AGENTS.md"
fi

# --- Detect scenario ---
SCENARIO="clean"
if [ -f "$MANIFEST" ]; then
    SCENARIO="upgrade"
elif [ -d ".claude/commands" ] || [ -d ".claude/agents" ] || { [ -f "CLAUDE.md" ] && grep -q "Harness Orchestration" "CLAUDE.md" 2>/dev/null; }; then
    SCENARIO="legacy"
fi
echo "🔍 Scenario: $SCENARIO"

# --- Legacy: back up and remove pre-plugin install ---
if [ "$SCENARIO" = "legacy" ]; then
    LEGACY_ITEMS=""
    for item in .claude/commands .claude/agents .claude/skills .claude/rules .claude/settings.json CLAUDE.md .mcp.json; do
        [ -e "$item" ] && LEGACY_ITEMS="$LEGACY_ITEMS $item"
    done
    echo ""
    echo "⚠️  Pre-plugin MVP Builder install detected:$LEGACY_ITEMS"
    echo "   These will be backed up and replaced. Agents, skills and MCP servers now ship"
    echo "   with the Claude Code plugin (unless --standalone)."
    confirm "Back up and migrate?" || { echo "Cancelled — nothing modified."; exit 1; }
    BACKUP_DIR=".mvp-builder-backup-$(date +%Y%m%d-%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    for item in $LEGACY_ITEMS; do
        mkdir -p "$BACKUP_DIR/$(dirname "$item")"
        mv "$item" "$BACKUP_DIR/$item"
    done
    echo "   ✓ Backed up to $BACKUP_DIR/"
fi

# --- Clean scenario: never silently overwrite files we did not install ---
if [ "$SCENARIO" = "clean" ]; then
    EXISTING=""
    while IFS='|' read -r src dst; do
        [ -n "$src" ] && [ -e "$dst" ] && EXISTING="$EXISTING $dst"
    done <<< "$PAIRS"
    if [ -n "$EXISTING" ]; then
        echo ""
        echo "⚠️  Existing files would be overwritten:$EXISTING"
        confirm "Overwrite?" || { echo "Cancelled — nothing modified."; exit 1; }
    fi
fi

# --- Install ---
manifest_hash_for() {
    [ -f "$MANIFEST" ] && grep "  $1\$" "$MANIFEST" | head -1 | cut -d' ' -f1 || true
}

NEW_MANIFEST="$(mktemp)"
INSTALLED=0; KEPT=0
while IFS='|' read -r src dst; do
    [ -z "$src" ] && continue
    [ -f "$src" ] || { echo "   ⚠ missing in source: $src"; continue; }
    mkdir -p "$(dirname "$dst")" 2>/dev/null || true
    NEW_HASH=$(hash_file "$src")
    if [ -f "$dst" ] && [ "$SCENARIO" = "upgrade" ]; then
        CUR_HASH=$(hash_file "$dst")
        REC_HASH=$(manifest_hash_for "$dst")
        if [ "$CUR_HASH" = "$NEW_HASH" ]; then
            :  # already current
        elif [ -n "$REC_HASH" ] && [ "$CUR_HASH" = "$REC_HASH" ]; then
            cp "$src" "$dst"; echo "   ✓ updated  $dst"; INSTALLED=$((INSTALLED+1))
        else
            cp "$src" "$dst.new"
            echo "   ↷ kept     $dst (modified by you — new version: $dst.new)"
            KEPT=$((KEPT+1))
            # Manifest records what WE installed, never the user's content: keep the old
            # entry so the file still reads as user-modified on the next upgrade. A file
            # we never installed gets no entry at all.
            [ -n "$REC_HASH" ] && echo "$REC_HASH  $dst" >> "$NEW_MANIFEST"
            continue
        fi
    else
        cp "$src" "$dst"; echo "   ✓ $dst"; INSTALLED=$((INSTALLED+1))
    fi
    echo "$NEW_HASH  $dst" >> "$NEW_MANIFEST"
done <<< "$PAIRS"

mv "$NEW_MANIFEST" "$MANIFEST"

echo ""
echo "✅ MVP Builder scaffold installed ($SCENARIO: $INSTALLED written, $KEPT kept)"
echo ""
if [ "$PLATFORM" = "claude" ]; then
    if [ "$STANDALONE" = "0" ]; then
        echo "Requires the mvp-builder plugin (agents, skills, MCP servers):"
        echo "   /plugin marketplace add $REPO"
        echo "   /plugin install mvp-builder@mvp-builder"
        echo ""
    fi
    echo "Next steps:"
    echo "   1. Restart the Claude Code session (loads CLAUDE.md and rules)"
    echo "   2. /prd — define your product"
else
    echo "AGENTS.md installed. Codex agents/skills wiring lands in a later release."
fi
[ "$KEPT" -gt 0 ] && echo "" && echo "⚠️  $KEPT modified file(s) kept — review the *.new versions and merge manually."
echo ""
