# Narkin's Builders Website

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TinaCMS](https://img.shields.io/badge/TinaCMS-2.2.6-blue?style=flat-square&logo=tinacms)](https://tina.io/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green?style=flat-square)](https://web.dev/progressive-web-apps/)

A modern **Progressive Web App (PWA)** for Narkin's Builders, a premium real estate development company in Karachi, Pakistan. Built with Next.js, TypeScript, Tailwind CSS, and integrated with **TinaCMS** for seamless content management.

## 🚀 Key Features

- **📱 Progressive Web App (PWA)** - Installable, offline-capable, and app-like experience
- **📝 Visual Content Management** - TinaCMS integration for non-technical content editing
- **🏢 Responsive Property Showcases** - Interactive galleries and virtual tours
- **📊 SEO Optimized** - Structured data, meta tags, and search engine optimization
- **⚡ Performance Optimized** - Server-side rendering, static generation, and image optimization
- **📈 Analytics Integration** - Google Analytics and conversion tracking
- **📧 Google Sheets Integration** - Reliable form submissions with IndexedDB backup

## 🛠️ Tech Stack

### Core Framework
- **Frontend**: Next.js 15.3.5, React 18.3.1, TypeScript 5.4.5
- **Styling**: Tailwind CSS 3.4.3, Framer Motion
- **Runtime**: Bun (recommended), Node.js 18+

### Content & CMS
- **Content Management**: TinaCMS 2.2.6 with visual editing
- **Content Format**: MDX with Gray Matter frontmatter
- **Blog System**: Automated content generation and SEO optimization

### UI & Components
- **Component Library**: Radix UI, Headless UI
- **Icons**: Lucide React
- **Styling**: PostCSS, Autoprefixer

### Integrations & APIs
- **Forms**: Google Sheets API with service account authentication
- **Analytics**: Google Analytics 4, Google Search Console
- **PWA**: Service Worker, Web App Manifest, offline capabilities

## 📱 Progressive Web App (PWA)

This website is a fully functional PWA with:

- **🔧 Installable**: Can be installed on desktop and mobile devices
- **📶 Offline Support**: Works without internet connection
- **⚡ Fast Loading**: Optimized performance and caching
- **📱 Mobile-First**: Native app-like experience
- **🔔 Push Notifications**: Ready for future notification features

### PWA Assets
- Multiple icon sizes (16x16 to 512x512)
- Optimized for various devices and platforms
- Theme color and splash screen configuration

## 🎨 TinaCMS Integration

**Visual content editing** for non-technical team members:

### Features
- **WYSIWYG Editor**: Rich text editing with live preview
- **Form-Based Editing**: User-friendly forms for all content metadata
- **Image Management**: Drag-and-drop image uploads and organization
- **Git-Based**: All changes automatically committed to repository
- **Developer-Friendly**: Can still edit MDX files directly

### Content Management
- **Blog Posts**: Full visual editing with SEO metadata
- **Property Information**: Edit project details and descriptions
- **Images & Media**: Upload and manage property photos and videos
- **SEO Control**: Meta tags, descriptions, and structured data

### Access
- **Development**: `http://localhost:3000/admin`
- **Production**: `https://yourdomain.com/admin` (requires TinaCMS Cloud setup)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **Bun** (recommended) or npm/yarn
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/narkins-builders.git
   cd narkins-builders
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   bun dev
   ```

5. **Access the website**
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin (TinaCMS): [http://localhost:3000/admin](http://localhost:3000/admin)

### TinaCMS Setup

For content editing capabilities:

1. **Create TinaCMS account** at [app.tina.io](https://app.tina.io)
2. **Get credentials** (Client ID and Token)
3. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
   TINA_TOKEN=your_token
   ```
4. **Restart development server**

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Shared components (UI, schema, SEO)
│   ├── features/       # Feature-specific components
│   └── layout/         # Layout components (header, footer)
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints (sheets, sitemap)
│   ├── blog/          # Blog pages and dynamic routes
│   └── admin.tsx      # TinaCMS admin interface
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── data/               # Static data and configuration
├── contexts/           # React contexts
└── styles/             # Global styles and Tailwind config

content/
└── blogs/              # MDX blog posts with frontmatter

tina/
├── config.ts           # TinaCMS configuration
├── database.ts         # TinaCMS database setup
└── __generated__/      # Auto-generated TinaCMS files

public/
├── icons/              # PWA icons (16x16 to 512x512)
├── images/             # Property images and media
└── videos/             # Property showcase videos
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with TinaCMS |
| `bun dev:next` | Start Next.js development server only |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run ESLint |
| `bun typecheck` | Run TypeScript checking |
| `bun check` | Run linting and type checking |
| `bun tina:dev` | Start TinaCMS development server |
| `bun tina:build` | Build TinaCMS |

## ⚙️ Configuration

### Environment Variables

Required variables for `.env.local`:

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://narkinsbuilders.com

# Database (if using)
DATABASE_URL=your-database-url

# TinaCMS (for content editing)
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token

# Google Sheets API (for forms)
GOOGLE_SHEETS_CREDENTIALS=your-service-account-json
GOOGLE_SHEET_ID=your-sheet-id
```

### PWA Configuration

The PWA is configured in:
- **Manifest**: Defined in `_document.tsx`
- **Icons**: Located in `public/icons/`
- **Service Worker**: Auto-generated by Next.js
- **Theme Color**: `#FFFFFF`

### SEO & Analytics

- **Google Analytics 4**: Integrated with custom events
- **Google Search Console**: Verified and configured
- **Structured Data**: Schema.org markup for better search results
- **Meta Tags**: Comprehensive SEO optimization
- **Sitemap**: Auto-generated for search engines

## 🚀 Deployment

### Build for Production

```bash
bun run check    # Type check and lint
bun run build    # Build application
bun run start    # Start production server
```

### TinaCMS Production Setup

1. **Sign up for TinaCMS Cloud** (free tier available)
2. **Add environment variables** to your hosting platform
3. **Deploy with TinaCMS build** included

### PWA Deployment

The PWA will automatically work when deployed to:
- **Vercel** (recommended)
- **Netlify**
- **Any HTTPS hosting**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open a Pull Request

### Development Guidelines

- **Code Style**: Follow ESLint and TypeScript strict mode
- **Components**: Use TypeScript and follow existing patterns
- **Content**: Add blog posts via TinaCMS or MDX files
- **Images**: Optimize images and use appropriate formats
- **PWA**: Maintain offline functionality and performance

## 📄 License

This project is proprietary and confidential. All rights reserved by Narkin's Builders.

## 🆘 Support

### Technical Support
- **Email**: hello@otherdev.com
- **Website**: [The Other Dev](https://otherdev.com)
- **LinkedIn**: [The Other Dev](https://www.linkedin.com/company/theotherdev)

### Content Management
- **TinaCMS Documentation**: [tina.io/docs](https://tina.io/docs)
- **Admin Interface**: Access via `/admin` route
- **File-Based Editing**: Direct MDX file editing supported

---

**🏢 Built for Narkin's Builders** | **💻 Developed by The Other Dev** | **📱 PWA Ready** | **📝 TinaCMS Integrated**

© 2025 Narkin's Builders. All rights reserved.