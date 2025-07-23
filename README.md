# Narkin's Builders - Premium Real Estate Business Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green?style=flat-square)](https://web.dev/progressive-web-apps/)
[![TinaCMS](https://img.shields.io/badge/TinaCMS-Enabled-orange?style=flat-square)](https://tina.io/)

A comprehensive **digital real estate business platform** for Narkin's Builders, showcasing luxury developments in Bahria Town Karachi. This isn't just a website—it's a complete business solution with CRM integration, strategic content automation, and advanced PWA capabilities.

## 🏢 Active Property Projects

### **Hill Crest Residency** (Delivered)
- Premium 2/3/4 bedroom apartments
- Interactive floor plans with square footage details
- Comprehensive amenity showcases

### **Narkin's Boutique Residency** (Current)
- Luxury apartments in Heritage Commercial area
- Sky Villa Duplex penthouses
- ROI calculators and pricing tables

## 🚀 Core Platform Features

### **Progressive Web App Excellence**
- 📱 **App Installation** - Smart browser-specific install prompts (Safari/Chrome)
- 📴 **Offline Support** - Service worker with custom offline page
- 🏠 **App Shortcuts** - Quick access to Projects, Contact, Blog from home screen
- 🔄 **Share Target API** - Receive shared content from other apps
- 🎯 **Manifest Configuration** - Complete PWA with multiple icon sizes

### **Real Estate Business Platform**
- 🏗️ **Interactive Property Showcases** - Floor plans, galleries, virtual tours
- 📊 **Investment Analysis** - ROI calculators and price comparison tools
- 🎨 **Advanced Galleries** - Lightbox system with Framer Motion animations
- 📍 **Location Intelligence** - Interactive maps and area information
- 🏆 **Customer Testimonials** - Structured reviews with star ratings

### **Integrated CRM & Lead Generation**
- 📋 **Google Sheets CRM** - Automatic lead capture with source tracking
- 📧 **Smart Forms** - Property-specific interest selection
- 📱 **WhatsApp Integration** - Sticky contact button with analytics
- 📈 **Lead Analytics** - User agent, referrer, and attribution tracking
- 🕐 **Pakistan Timezone** - Localized timestamp tracking

### **Strategic Content Marketing System**
- 🤖 **Blog Automation** - Market timing-based content scheduling
- 📅 **Season Intelligence** - Peak/moderate/low season content distribution
- 🎯 **SEO Optimization** - Automated meta descriptions and keyword targeting
- 📝 **MDX Content** - Rich content with custom components (InfoBox, PriceTable, FAQ)
- 📊 **Performance Tracking** - Content analytics and engagement metrics

### **Advanced Analytics & Social Integration**
- 📊 **Google Analytics 4** - Custom event tracking for property views
- 📱 **Social Media Integration** - Facebook posts, Instagram optimization
- 🎬 **Video Analytics** - YouTube integration with play tracking
- 📲 **WhatsApp Analytics** - Click tracking and engagement metrics
- 🔍 **SEO Excellence** - Schema.org markup for organization and properties

### **Technical Excellence**
- ⚡ **Performance Optimized** - SSR, image optimization, lazy loading
- 🎨 **Design System** - shadcn/ui components with custom Tailwind styling
- 🔧 **TypeScript** - Full type safety across the application
- 🗄️ **Database Ready** - MySQL integration capabilities
- 📱 **Responsive Design** - Mobile-first with tablet optimizations

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, shadcn/ui
- **State Management**: Zustand for global state
- **CMS**: TinaCMS with custom schemas and automation
- **Analytics**: Google Analytics 4 with custom event tracking
- **Forms**: Google Sheets API integration for CRM
- **Media**: Custom video player, lightbox gallery system
- **PWA**: Service Worker, Web App Manifest, offline support
- **SEO**: Schema.org structured data, automated sitemaps
- **Runtime**: Bun (recommended), Node.js compatible

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

## 🔧 Environment Variables

```env
# Required - Site Configuration
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_SITE_URL=https://narkinsbuilders.com

# TinaCMS - Content Management System
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token

# Google Sheets API - CRM Integration
GOOGLE_SHEETS_CREDENTIALS=your-service-account-json
GOOGLE_SHEET_ID=your-sheet-id

# Optional - Database Configuration
DATABASE_URL=your-mysql-connection-string
```

## 🚀 Deployment

### Production Build
```bash
bun run typecheck  # Type check
bun run build      # Build application
bun run start      # Start production server
```

### Platform Support
- **Vercel** (recommended) - Automatic deployments with edge functions
- **Netlify** - JAMstack deployment with form handling
- **Any HTTPS hosting** - Required for full PWA functionality

### Post-Deployment Setup
1. Configure environment variables in your hosting platform
2. Set up Google Sheets API credentials for CRM
3. Configure TinaCMS for content management
4. Test PWA installation prompts on mobile devices

## 📊 Key Features in Production

- **Automatic Lead Capture** - Forms integrate directly with Google Sheets CRM
- **SEO-Optimized Content** - Blog automation with market timing intelligence  
- **Mobile App Experience** - Users can install as PWA on their devices
- **Offline Functionality** - Service worker ensures basic functionality without internet
- **Social Media Integration** - WhatsApp contact and Facebook content embedding
- **Performance Analytics** - Google Analytics 4 tracks user interactions and conversions

## Credits

**Developed by**: [The Other Dev](https://otherdev.com)  
**Contact**: hello@otherdev.com  
**LinkedIn**: [The Other Dev](https://www.linkedin.com/company/theotherdev)

## License

© 2025 Narkin's Builders. All rights reserved.