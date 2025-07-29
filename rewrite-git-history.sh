#!/bin/sh

# POSIX-compliant shell script to rewrite Git history using git-filter-repo
# This script rewrites commits from specific authors/committers to a new identity

set -e  # Exit on any error

# Configuration
REPO_URL="https://github.com/imossaidqadri/narkins-builders"
NEW_NAME="Ossaid Qadri"
NEW_EMAIL="imossaidquadri@gmail.com"
TEMP_DIR="narkins-builders-rewrite"

# Function to print status messages
log() {
    printf "[$(date '+%Y-%m-%d %H:%M:%S')] %s\n" "$1"
}

# Function to handle errors
error_exit() {
    printf "ERROR: %s\n" "$1" >&2
    exit 1
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main execution
main() {
    log "Starting Git history rewrite process..."
    
    # Check prerequisites
    if ! command_exists git; then
        error_exit "git is not installed"
    fi
    
    if ! command_exists python3; then
        error_exit "python3 is not installed"
    fi
    
    # Install git-filter-repo
    log "Installing git-filter-repo..."
    if ! command_exists git-filter-repo; then
        log "Downloading git-filter-repo..."
        if ! curl -o /tmp/git-filter-repo https://raw.githubusercontent.com/newren/git-filter-repo/main/git-filter-repo; then
            error_exit "Failed to download git-filter-repo"
        fi
        chmod +x /tmp/git-filter-repo
        if ! echo "081222" | sudo -S cp /tmp/git-filter-repo /usr/local/bin/; then
            # Try without sudo if it fails
            if ! cp /tmp/git-filter-repo "$HOME/.local/bin/" 2>/dev/null; then
                mkdir -p "$HOME/.local/bin"
                cp /tmp/git-filter-repo "$HOME/.local/bin/"
                export PATH="$HOME/.local/bin:$PATH"
            fi
        fi
        rm -f /tmp/git-filter-repo
    fi
    
    # Remove existing temp directory if it exists
    if [ -d "$TEMP_DIR" ]; then
        log "Removing existing temporary directory..."
        rm -rf "$TEMP_DIR"
    fi
    
    # Clone repository as mirror
    log "Cloning repository as mirror..."
    if ! git clone --mirror "$REPO_URL" "$TEMP_DIR"; then
        error_exit "Failed to clone repository"
    fi
    
    # Change to repository directory
    cd "$TEMP_DIR" || error_exit "Failed to change to repository directory"
    
    # Create mailmap for git-filter-repo
    log "Creating author/committer mapping..."
    cat > author-map <<'EOF'
Blog Automation (Bun) <action@github.com> = Ossaid Qadri <imossaidquadri@gmail.com>
google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com> = Ossaid Qadri <imossaidquadri@gmail.com>
narkinsbuilders <narkinsbuilders@gmail.com> = Ossaid Qadri <imossaidquadri@gmail.com>
EOF
    
    # Run git-filter-repo to rewrite history
    log "Rewriting Git history..."
    if ! git filter-repo --mailmap author-map --force; then
        error_exit "Failed to rewrite Git history"
    fi
    
    # Clean up mailmap file
    rm -f author-map
    
    # Add back the origin remote (git-filter-repo removes it)
    log "Adding origin remote..."
    if ! git remote add origin "$REPO_URL"; then
        error_exit "Failed to add origin remote"
    fi
    
    # Force push to origin only
    log "Force pushing to origin..."
    if ! git push --force origin --all; then
        error_exit "Failed to force push branches to origin"
    fi
    
    if ! git push --force origin --tags; then
        error_exit "Failed to force push tags to origin"
    fi
    
    # Clean up
    cd ..
    rm -rf "$TEMP_DIR"
    
    log "Git history rewrite completed successfully!"
    log "The following commits were rewritten:"
    log "- Blog Automation (Bun) <action@github.com> -> $NEW_NAME <$NEW_EMAIL>"
    log "- google-labs-jules[bot] <161369871+google-labs-jules[bot]@users.noreply.github.com> -> $NEW_NAME <$NEW_EMAIL>"
    log "- narkinsbuilders <narkinsbuilders@gmail.com> -> $NEW_NAME <$NEW_EMAIL>"
    log ""
    log "The following commits were preserved:"
    log "- Kabeer Jaffri <kabeer11000@gmail.com>"
    log "- kabeer11000 <kabeer11000@gmail.com or kabeer@kabeersnetwork.tk>"
    log "- tina-cloud-app[bot] <58178390+tina-cloud-app[bot]@users.noreply.github.com>"
}

# Run main function
main "$@"