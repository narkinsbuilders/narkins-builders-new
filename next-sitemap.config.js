/** @type {import('next-sitemap').IConfig} */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Helper function to recursively read MDX files from nested directories
function readMDXFiles(dir) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      files.push(...readMDXFiles(itemPath));
    } else if (item.endsWith('.mdx')) {
      files.push(itemPath);
    }
  }
  
  return files;
}

// Get all blog posts
function getAllPostsForSitemap() {
  const postsDirectory = path.join(process.cwd(), 'content/blogs');
  const allMDXFiles = readMDXFiles(postsDirectory);
  
  return allMDXFiles.map((fullPath) => {
    const slug = path.basename(fullPath, '.mdx');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    return {
      slug,
      date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
    };
  });
}

// Generate blog URL from date string and slug
function generateBlogUrlFromDateAndSlug(dateString, slug) {
  const postDate = new Date(dateString);
  const year = postDate.getFullYear();
  const month = String(postDate.getMonth() + 1).padStart(2, '0');
  return `/blog/${year}/${month}/${slug}`;
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://narkinsbuilders.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Since we don't have many pages
  
  // Ensure XML declaration is included
  trailingSlash: false,
  autoLastmod: true,
  
  // Static pages with custom priority and changefreq
  transform: async (config, path) => {
    // Default values
    let priority = 0.7;
    let changefreq = 'weekly';

    // Custom priorities for specific pages
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path === '/hill-crest-residency' || path === '/narkins-boutique-residency') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/about' || path === '/completed-projects') {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path === '/blog') {
      priority = 0.7;
      changefreq = 'daily';
    } else if (path.startsWith('/blog/')) {
      // Blog posts
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },

  // Additional paths for dynamic blog routes
  additionalPaths: async (config) => {
    const result = [];

    try {
      // Get all blog posts
      const posts = getAllPostsForSitemap();
      
      // Generate blog post URLs
      for (const post of posts) {
        const blogUrl = generateBlogUrlFromDateAndSlug(post.date, post.slug);
        result.push({
          loc: blogUrl,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: post.date,
        });
      }
    } catch (error) {
      console.error('Error generating blog URLs for sitemap:', error);
    }

    return result;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps if needed in the future
    ],
  },

  exclude: [
    '/api/*',
    '/admin/*',
    '/admin-tina*',
    '/_next/*',
    '/404',
    '/500',
    '/book-*', // Exclude booking pages if they're dynamic
    '/privacy-policy',
    '/terms',
  ],
};