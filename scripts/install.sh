#!/bin/bash
set -e

# MVP Builder Installer
# Usage: curl -fsSL https://raw.githubusercontent.com/petbrains/mvp-builder/main/scripts/install.sh | bash

REPO="petbrains/mvp-builder"
FILES_TO_COPY=".claude CLAUDE.md .mcp.json"

echo ""
echo "🚀 MVP Builder Installer"
echo ""

# Check dependencies
for cmd in curl unzip; do
    if ! command -v "$cmd" &>/dev/null; then
        echo "❌ Required: $cmd"
        exit 1
    fi
done

# Get latest release or fallback to main
get_download_url() {
    # Try to get latest release
    RELEASE_INFO=$(curl -fsSL -H "User-Agent: mvp-builder" "https://api.github.com/repos/$REPO/releases/latest" 2>/dev/null || echo "")
    
    if [ -n "$RELEASE_INFO" ] && echo "$RELEASE_INFO" | grep -q "zipball_url"; then
        VERSION=$(echo "$RELEASE_INFO" | grep '"tag_name"' | sed -E 's/.*"tag_name": *"([^"]+)".*/\1/')
        DOWNLOAD_URL=$(echo "$RELEASE_INFO" | grep '"zipball_url"' | sed -E 's/.*"zipball_url": *"([^"]+)".*/\1/')
        echo "📦 Installing $VERSION..."
    else
        # Fallback to main branch
        VERSION="main"
        DOWNLOAD_URL="https://github.com/$REPO/archive/refs/heads/main.zip"
        echo "📦 Installing from main branch..."
    fi
}

get_download_url

# Check for existing files
EXISTING=""
for file in $FILES_TO_COPY; do
    if [ -e "$file" ]; then
        EXISTING="$EXISTING $file"
    fi
done

if [ -n "$EXISTING" ]; then
    echo ""
    echo "⚠️  Found existing files: $EXISTING"
    echo ""
    read -p "Overwrite? (y/N) " -n 1 -r </dev/tty
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 1
    fi
fi

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Download
curl -fsSL -H "User-Agent: mvp-builder" "$DOWNLOAD_URL" -o "$TEMP_DIR/repo.zip"

# Extract
echo "📂 Extracting..."
unzip -q "$TEMP_DIR/repo.zip" -d "$TEMP_DIR"

# Find extracted folder
EXTRACTED_DIR=$(find "$TEMP_DIR" -maxdepth 1 -type d -name "*mvp-builder*" | head -1)

if [ -z "$EXTRACTED_DIR" ]; then
    echo "❌ Error: Could not find extracted directory"
    exit 1
fi

# Copy files
echo "📋 Copying files..."
for file in $FILES_TO_COPY; do
    if [ -e "$EXTRACTED_DIR/$file" ]; then
        rm -rf "./$file"
        cp -r "$EXTRACTED_DIR/$file" .
        echo "   ✓ $file"
    else
        echo "   ⚠ $file not found in repository"
    fi
done

echo ""
echo "✅ MVP Builder installed! ($VERSION)"
echo ""
echo "Next steps:"
echo "   1. Run /docs:prd to define your product"
echo "   2. Run /docs:feature to generate specifications"
echo ""