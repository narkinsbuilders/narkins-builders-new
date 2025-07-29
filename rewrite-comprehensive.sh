#!/bin/bash

# Comprehensive Git Filter-Repo Script
# Only preserves: kabeer11000, tina-cloud-app[bot], imossaidqadri (exact matches)
# Rewrites ALL others to: Ossaid Qadri <imossaidquadri@gmail.com>

set -e

echo "Starting comprehensive Git history rewrite..."
echo "This will rewrite ALL authors except kabeer11000, tina-cloud-app[bot], and imossaidqadri"
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo "Running git filter-repo..."

# Create author-email pairs to preserve exactly
git filter-repo \
    --force \
    --name-callback '
        # Preserve these exact names
        if name in [b"kabeer11000", b"tina-cloud-app[bot]", b"imossaidqadri"]:
            return name
        return b"Ossaid Qadri"
    ' \
    --email-callback '
        # Preserve emails for preserved names only
        # All others become imossaidquadri@gmail.com
        if name in [b"kabeer11000", b"tina-cloud-app[bot]", b"imossaidqadri"]:
            return email
        return b"imossaidquadri@gmail.com"
    '

echo ""
echo "Rewrite completed! Checking results..."
echo ""
echo "Author summary:"
git log --format='%an <%ae>' | sort | uniq -c | sort -nr

echo ""
echo "Recent commits:"
git log --oneline --format='%h %an <%ae> %s' | head -5

echo ""
echo "SUCCESS: Git history has been rewritten!"
echo "Only kabeer11000, tina-cloud-app[bot], and imossaidqadri were preserved."
echo "All other commits are now authored by: Ossaid Qadri <imossaidquadri@gmail.com>"