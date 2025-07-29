#!/bin/bash

# Git Filter-Repo with Mailmap approach
# Preserves: kabeer11000, tina-cloud-app[bot], imossaidqadri
# Rewrites all others to: Ossaid Qadri <imossaidquadri@gmail.com>

set -e

echo "Creating mailmap for author rewriting..."

# Create mailmap that preserves specific authors and rewrites others
cat > /tmp/mailmap << 'EOF'
# Preserve these authors exactly
kabeer11000 <kabeer11000@gmail.com> kabeer11000 <kabeer11000@gmail.com>
kabeer11000 <imossaidquadri@gmail.com> kabeer11000 <imossaidquadri@gmail.com>
tina-cloud-app[bot] <58178390+tina-cloud-app[bot]@users.noreply.github.com> tina-cloud-app[bot] <58178390+tina-cloud-app[bot]@users.noreply.github.com>
imossaidqadri <imossaidquadri@gmail.com> imossaidqadri <imossaidquadri@gmail.com>
imossaidqadri <62793347+imossaidqadri@users.noreply.github.com> imossaidqadri <62793347+imossaidqadri@users.noreply.github.com>

# Rewrite all others to Ossaid Qadri
Ossaid Qadri <imossaidquadri@gmail.com> Ossaid Qadri <imossaidquadri@gmail.com>
Ossaid Qadri <imossaidquadri@gmail.com> Ossaid Qadri <kabeer11000@gmail.com>
Ossaid Qadri <imossaidquadri@gmail.com> Ossaid Qadri <161369871+google-labs-jules[bot]@users.noreply.github.com>
EOF

echo "Running git filter-repo with mailmap..."

git filter-repo --force --mailmap /tmp/mailmap

echo "Cleaning up..."
rm -f /tmp/mailmap

echo ""
echo "Rewrite completed! Checking results..."
echo ""
echo "Author summary:"
git log --format='%an <%ae>' | sort | uniq -c | sort -nr

echo ""
echo "Recent commits:"
git log --oneline --format='%h %an <%ae> %s' | head -5

echo ""
echo "SUCCESS: Git history rewritten using mailmap!"
echo "Next steps:"
echo "1. Verify the results above"
echo "2. Force push: git push --force-with-lease origin --all"
echo "3. Force push tags: git push --force-with-lease origin --tags"