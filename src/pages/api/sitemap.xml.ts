// pages/api/sitemap.xml.ts - FIXED VERSION
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPostsServer } from '../../lib/blog-server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://narkinsbuilders.com';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Static pages with SEO priority
  const staticPages: SitemapUrl[] = [
    {
      loc: `${SITE_URL}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${SITE_URL}/hill-crest-residency`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly', 
      priority: 0.9
    },
    {
      loc: `${SITE_URL}/narkins-boutique-residency`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${SITE_URL}/about`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${SITE_URL}/completed-projects`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${SITE_URL}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.7
    },
  ];

  // Fetch MDX blog posts (NOT WordPress)
  let blogPosts: SitemapUrl[] = [];
  try {
    const posts = await getAllPostsServer();
    
    blogPosts = posts.map((post) => ({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: post.date,
      changefreq: 'monthly' as const,
      priority: 0.6
    }));
  } catch (error) {
    console.error('Error fetching MDX blog posts for sitemap:', error);
  }

  // Combine all URLs
  const allUrls = [...staticPages, ...blogPosts];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(sitemap);
}