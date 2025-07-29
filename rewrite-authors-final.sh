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

# Create a mailmap file for the rewrite
cat > /tmp/git-mailmap << EOF
Ossaid Qadri <imossaidquadri@gmail.com>
kabeer11000 <kabeer11000>
tina-cloud-app[bot] <tina-cloud-app[bot]>
imossaidqadri <imossaidquadri@gmail.com>
imossaidqadri <users.noreply.github.com>
EOF

echo "Running git filter-repo..."

# Use git filter-repo with author/email rewriting
git filter-repo \
    --force \
    --name-callback '
        preserved = [b"kabeer11000", b"tina-cloud-app[bot]", b"imossaidqadri"]
        if any(p in name.lower() for p in [p.lower() for p in preserved]):
            return name
        return b"Ossaid Qadri"
    ' \
    --email-callback '
        # Get the corresponding name for context
        preserved_emails = [
            b"kabeer11000",
            b"tina-cloud-app[bot]", 
            b"imossaidquadri@gmail.com",
            b"users.noreply.github.com"
        ]
        if any(p in email.lower() for p in [p.lower() for p in preserved_emails]):
            return email
        return b"imossaidquadri@gmail.com"
    '

# Clean up
rm -f /tmp/git-mailmap

echo "Git history rewrite completed!"
echo ""
echo "Summary of changes:"
echo "- Preserved: kabeer11000, tina-cloud-app[bot], imossaidqadri"
echo "- All other commits rewritten to: Ossaid Qadri <imossaidquadri@gmail.com>"
echo ""
echo "Verifying results..."
git log --oneline --format='%h %an <%ae> %s' | head -10

echo ""
echo "Next steps:"
echo "1. Review the above output to verify changes"
echo "2. If satisfied, force push to remote: git push --force-with-lease origin --all"
echo "3. Force push tags if needed: git push --force-with-lease origin --tags"
echo ""
echo "WARNING: All collaborators will need to re-clone the repository!"