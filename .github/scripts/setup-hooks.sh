#!/bin/sh
#
# Setup script to install git hooks for this repository
# Run this after cloning the repo to enable security scanning
#
# Usage: .github/scripts/setup-hooks.sh
#

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
HOOKS_SOURCE="$REPO_ROOT/.github/hooks"
HOOKS_DEST="$REPO_ROOT/.git/hooks"

printf "🔧 Setting up git hooks for awesome-econ-ai-stuff...\n\n"

# Check if we're in a git repository
if [ ! -d "$REPO_ROOT/.git" ]; then
    printf "Error: Not a git repository. Run this script from the repo root.\n"
    exit 1
fi

# Check if hooks source exists
if [ ! -d "$HOOKS_SOURCE" ]; then
    printf "Error: Hooks source directory not found at %s\n" "$HOOKS_SOURCE"
    exit 1
fi

# Install each hook
for hook in "$HOOKS_SOURCE"/*; do
    if [ -f "$hook" ]; then
        hook_name=$(basename "$hook")
        dest="$HOOKS_DEST/$hook_name"
        
        # Check if hook already exists
        if [ -f "$dest" ]; then
            printf "${YELLOW}⚠️  Hook '%s' already exists. Backing up to %s.bak${NC}\n" "$hook_name" "$hook_name"
            cp "$dest" "$dest.bak"
        fi
        
        # Copy and make executable
        cp "$hook" "$dest"
        chmod +x "$dest"
        printf "${GREEN}✓ Installed %s${NC}\n" "$hook_name"
    fi
done

printf "\n${GREEN}✅ Git hooks installed successfully!${NC}\n"
printf "\nThe following hooks are now active:\n"
printf "  - pre-commit: Scans markdown files for malicious content\n"
printf "\nTo bypass hooks (if needed): git commit --no-verify\n"
