/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // Your website's domain
  siteUrl: 'https://www.narkinsbuilders.com',
  
  // This will automatically generate a robots.txt file for you
  generateRobotsTxt: true, 

  // (Optional) If you have any pages you want to exclude from the sitemap
  exclude: ['/api/*', '/admin/*'], 

  // This is the most important part. It dynamically corrects the settings for each page.
  transform: async (config, path) => {
    
    // Logic for the main blog listing page: /blog
    if (path === '/blog') {
      return {
        loc: path,
        changefreq: 'daily', // You update your blog daily, so this should be 'daily'
        priority: 0.7,       // High priority, but less than individual posts
        lastmod: new Date().toISOString(), // Use the current date of the build
      };
    }

    // Logic for all individual blog posts that start with /blog/
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'daily',    // Crucial for frequent crawling of new content
        priority: 0.8,          // Your most important content should have a high priority
        lastmod: new Date().toISOString(), // Always use the current date
      };
    }

    // Default settings for all other pages (like your homepage)
    return {
      loc: path,
      changefreq: config.changefreq, // Uses the default 'weekly'
      priority: config.priority,     // Uses the default priority
      lastmod: new Date().toISOString(), // Use current date for all other pages
    };
  },
};