# Development Guide

## Quick Start

```bash
bun install          # Install dependencies  
bun run dev         # Start development with TinaCMS
bun run dev:next    # Start Next.js only (faster)
```

## Build Commands

```bash
bun run build         # Production build (fast, Vercel-optimized)
bun run build:fast    # Next.js build only
bun run build:tina    # Full build with TinaCMS
bun run build:full    # Complete build with linting & type checking
```

## Code Quality

### Pre-commit Hooks (Automatic)
- **TypeScript checking** on staged `.ts/.tsx` files
- **ESLint auto-fix** on staged JavaScript/TypeScript files  
- **Prettier formatting** on JSON, CSS, Markdown files

### Manual Commands
```bash
bun run typecheck    # Type checking only
bun run lint         # ESLint checking only
bun run check        # Both type checking and linting
```

## CI/CD Pipeline

### GitHub Actions (Automatic)
- **Lint & Type Check** on every PR and push
- **Security Audit** for dependency vulnerabilities
- **SEO Validation** ensures RSS and sitemap generation
- **Auto-format** fixes linting issues in PRs

### Vercel Deployment
- **Fast builds** using `build:vercel` (no linting in production)
- **Cached APIs** for RSS feed and sitemap
- **Security headers** automatically applied

## SEO Features

### New APIs
- `https://narkinsbuilders.com/api/rss.xml` - RSS feed for blog content
- Enhanced sitemap generation with proper priorities
- FAQ schema markup on property pages
- Video schema for YouTube virtual tours

### Schema Markup
- Organization, LocalBusiness, Website schemas
- FAQ schema for property pages  
- Video schema for virtual tours
- Enhanced blog post schemas with breadcrumbs

## Performance Optimizations

### Caching Strategy
- **Static assets**: 1 year cache with immutable flag
- **API responses**: 1 hour cache with stale-while-revalidate
- **RSS/Sitemap**: 1 hour cache with 24-hour stale period

### Security Headers
- HSTS for HTTPS enforcement
- XSS protection enabled
- Content type sniffing disabled  
- DNS prefetch control enabled

## Development Workflow

1. **Code changes** → Pre-commit hooks run automatically
2. **Push to GitHub** → CI pipeline validates code
3. **Merge to main** → Vercel deploys with fast build
4. **Production** → SEO optimizations active

## Troubleshooting

### Pre-commit Hooks Failing
```bash
bunx lint-staged --verbose    # Debug lint-staged
git commit --no-verify       # Skip hooks (emergency only)
```

### Build Issues
```bash
bun run build:fast          # Skip TinaCMS if having issues
bun run typecheck           # Check for TypeScript errors
bun run lint                 # Check for linting errors
```