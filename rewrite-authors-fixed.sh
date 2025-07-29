#!/bin/bash

# Git Filter-Repo Script to Rewrite Commit Authors
# Preserves: kabeer11000, tina-cloud-app[bot], imossaidqadri
# Rewrites all others to: Ossaid Qadri <imossaidquadri@gmail.com>

set -e

echo "Starting Git history rewrite..."
echo "This will permanently modify your repository history!"
echo "Make sure you have a backup before proceeding."
read -p "Continue? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo "Running git filter-repo..."

# Use git filter-repo with mailmap-based approach
git filter-repo \
    --force \
    --name-callback '
        preserved_names = [b"kabeer11000", b"tina-cloud-app[bot]", b"imossaidqadri"]
        if name.lower() not in [p.lower() for p in preserved_names]:
            return b"Ossaid Qadri"
        return name
    ' \
    --email-callback '
        preserved_names = [b"kabeer11000", b"tina-cloud-app[bot]", b"imossaidqadri"]
        if name.lower() not in [p.lower() for p in preserved_names]:
            return b"imossaidquadri@gmail.com"
        return email
    '

echo "Git history rewrite completed!"
echo ""
echo "Summary of changes:"
echo "- Preserved: kabeer11000, tina-cloud-app[bot], imossaidqadri"
echo "- All other commits rewritten to: Ossaid Qadri <imossaidquadri@gmail.com>"
echo ""
echo "Next steps:"
echo "1. Verify the changes with: git log --oneline --format='%h %an <%ae> %s'"
echo "2. If satisfied, force push to remote: git push --force-with-lease origin --all"
echo "3. Force push tags if needed: git push --force-with-lease origin --tags"
echo ""
echo "WARNING: All collaborators will need to re-clone the repository!"