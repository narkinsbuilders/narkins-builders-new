# Narkin's Builders Website

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A modern responsive website for Narkin's Builders, a premium real estate development company in Karachi, Pakistan. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive property showcases with interactive galleries
- Automated blog content management with MDX
- SEO optimization with structured data
- Server-side rendering and static generation
- Real-time construction progress updates

## Tech Stack

- **Frontend**: Next.js 15.3.5, React 18.3.1, TypeScript 5.4.5
- **Styling**: Tailwind CSS 3.4.3, Framer Motion
- **Content**: MDX, Gray Matter, Remark
- **UI Components**: Radix UI, Headless UI, Lucide React
- **Development**: Bun, ESLint, PostCSS

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- Bun (recommended) or npm/yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/narkins-builders.git
   cd narkins-builders
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
bun run check    # Type check and lint
bun run build    # Build application
bun run start    # Start production server
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript checking |
| `bun check` | Run linting and type checking |

## Project Structure

```
src/
├── components/          # React components
├── pages/              # Next.js pages and API routes
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── data/               # Static data and configuration
└── styles/             # Global styles

content/
└── blogs/              # MDX blog posts

public/
├── images/             # Property images and media
└── videos/             # Property showcase videos
```

## Configuration

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_SITE_URL=https://narkinsbuilders.com
DATABASE_URL=your-database-url
```

### Key Features

- Image optimization for external domains
- TypeScript strict mode enabled
- ESLint configuration
- Automated blog content generation
- SEO optimization with meta tags
- Structured data markup

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open a Pull Request

## License

This project is proprietary and confidential. All rights reserved by Narkin's Builders.
Website development by The Other Dev.

## Support

For technical support:
- **Email**: hello@otherdev.com
- **Website**: [The Other Dev](https://otherdev.com)
- **LinkedIn**: [The Other Dev](https://www.linkedin.com/company/theotherdev)

---

© 2025 Narkin's Builders. All rights reserved. Website by The Other Dev.