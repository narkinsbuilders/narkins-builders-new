// pages/api/robots.txt.ts - FIXED VERSION
import { NextApiRequest, NextApiResponse } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://narkinsbuilders.com';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const robots = `# Robots.txt for Narkin's Builders
# https://narkinsbuilders.com/robots.txt

User-agent: *
Allow: /

# Important pages for real estate SEO
Allow: /hill-crest-residency
Allow: /narkins-boutique-residency
Allow: /completed-projects
Allow: /about
Allow: /blog

# Allow image crawling for property photos
Allow: /images/
Allow: /_next/image
Allow: /_next/static

# Block development and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin
Disallow: /*?*utm_source=
Disallow: /*?*utm_medium=
Disallow: /*?*utm_campaign=

# Sitemap location
Sitemap: ${SITE_URL}/api/sitemap.xml

# Crawl delay (be nice to servers)
Crawl-delay: 1

# Specific instructions for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot  
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(200).send(robots);
}