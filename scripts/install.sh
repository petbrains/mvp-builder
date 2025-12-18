#!/bin/bash
set -e

# MVP Builder Installer
# Usage: curl -fsSL https://raw.githubusercontent.com/petbrains/mvp-builder/main/install.sh | bash

REPO="petbrains/mvp-builder"
BRANCH="main"
FILES_TO_COPY=".claude CLAUDE.md .mcp.json"

echo ""
echo "🚀 MVP Builder Installer"
echo ""

# Check for existing files
EXISTING=""
for file in $FILES_TO_COPY; do
    if [ -e "$file" ]; then
        EXISTING="$EXISTING $file"
    fi
done

if [ -n "$EXISTING" ]; then
    echo "⚠️  Found existing files:$EXISTING"
    echo ""
    read -p "Overwrite? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 1
    fi
fi

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Download repository
echo "📦 Downloading from GitHub..."
curl -fsSL "https://github.com/$REPO/archive/refs/heads/$BRANCH.zip" -o "$TEMP_DIR/repo.zip"

# Extract
echo "📂 Extracting..."
unzip -q "$TEMP_DIR/repo.zip" -d "$TEMP_DIR"

# Find extracted folder (GitHub adds branch suffix)
EXTRACTED_DIR=$(find "$TEMP_DIR" -maxdepth 1 -type d -name "mvp-builder-*" | head -1)

if [ -z "$EXTRACTED_DIR" ]; then
    echo "❌ Error: Could not find extracted directory"
    exit 1
fi

# Copy files
echo "📋 Copying files..."
for file in $FILES_TO_COPY; do
    if [ -e "$EXTRACTED_DIR/$file" ]; then
        cp -r "$EXTRACTED_DIR/$file" .
        echo "   ✓ $file"
    else
        echo "   ⚠ $file not found in repository"
    fi
done

echo ""
echo "✅ MVP Builder installed!"
echo ""
echo "Next steps:"
echo "   1. Run /docs:prd to define your product"
echo "   2. Run /docs:feature to generate specifications"
echo ""