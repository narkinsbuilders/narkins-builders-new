# Narkin's Builders Website

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green?style=flat-square)](https://web.dev/progressive-web-apps/)

A modern **Progressive Web App** for Narkin's Builders, a premium real estate development company in Karachi, Pakistan. Built with Next.js, TypeScript, Tailwind CSS, and TinaCMS.

## Features

- 📱 **Progressive Web App** - Installable, offline-capable
- 📝 **Visual Content Management** - TinaCMS integration
- 🏢 **Property Showcases** - Interactive galleries and tours
- 📊 **SEO Optimized** - Structured data and meta tags
- ⚡ **Performance Optimized** - SSR and image optimization
- 📧 **Google Sheets Integration** - Form submissions with backup

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **CMS**: TinaCMS for visual editing
- **Runtime**: Bun (recommended)

## Getting Started

1. **Clone and install**
   ```bash
   git clone https://github.com/your-username/narkins-builders.git
   cd narkins-builders
   bun install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Start development**
   ```bash
   bun dev
   ```

4. **Access**
   - Website: http://localhost:3000
   - Admin (TinaCMS): http://localhost:3000/admin

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development with TinaCMS |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun typecheck` | Run TypeScript checking |

## Environment Variables

```env
# Required
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_SITE_URL=https://narkinsbuilders.com

# TinaCMS (for content editing)
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token

# Google Sheets API (for forms)
GOOGLE_SHEETS_CREDENTIALS=your-service-account-json
GOOGLE_SHEET_ID=your-sheet-id
```

## Deployment

```bash
bun run typecheck  # Type check
bun run build      # Build application
bun run start      # Start production server
```

Deploy to Vercel, Netlify, or any HTTPS hosting for full PWA functionality.

## Credits

**Developed by**: [The Other Dev](https://otherdev.com)  
**Contact**: hello@otherdev.com  
**LinkedIn**: [The Other Dev](https://www.linkedin.com/company/theotherdev)

## License

© 2025 Narkin's Builders. All rights reserved.