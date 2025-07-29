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

# Create the author mapping script
cat > /tmp/author-mapping.py << 'EOF'
#!/usr/bin/env python3

import re

def update_author(author_info):
    name = author_info.name.decode('utf-8')
    email = author_info.email.decode('utf-8')
    
    # Preserve these authors exactly as they are
    preserved_authors = [
        'kabeer11000',
        'tina-cloud-app[bot]',
        'imossaidqadri'
    ]
    
    # Check if this author should be preserved
    for preserved in preserved_authors:
        if preserved.lower() in name.lower():
            return
    
    # Check for bot patterns to exclude
    bot_patterns = [
        r'claude',
        r'blog\s*automation',
        r'\[bot\]',
        r'bot',
        r'automation'
    ]
    
    is_bot = any(re.search(pattern, name, re.IGNORECASE) for pattern in bot_patterns)
    
    # If it's not a preserved author and not a bot we want to keep,
    # rewrite to Ossaid Qadri
    if not is_bot or name.lower() not in [p.lower() for p in preserved_authors]:
        author_info.name = b'Ossaid Qadri'
        author_info.email = b'imossaidquadri@gmail.com'

def update_committer(committer_info):
    # Apply same logic to committer
    update_author(committer_info)

# Register the callbacks
import git_filter_repo as fr
fr.Blob.register_callback('author', update_author)
fr.Blob.register_callback('committer', update_committer)
EOF

# Make the script executable
chmod +x /tmp/author-mapping.py

echo "Running git filter-repo..."

# Run git filter-repo with the author mapping
git filter-repo \
    --force \
    --commit-callback /tmp/author-mapping.py

echo "Cleaning up temporary files..."
rm -f /tmp/author-mapping.py

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