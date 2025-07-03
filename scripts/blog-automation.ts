import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    lastModified?: string;
    excerpt: string;
    image: string;
    category?: string;
    season?: string;
    automatedUpdate?: boolean;
  };
  content: string;
}

interface BlogStrategy {
  slug: string;
  targetMonth: number;
  targetDay: number;
  season: 'peak' | 'moderate' | 'low';
  priority: 'high' | 'medium' | 'low';
  description: string;
}

class BlogAutomationSystem {
  private blogDir = path.join(process.cwd(), 'content/blogs');
  private currentYear = new Date().getFullYear();
  private contactNumber = process.env.CONTACT_NUMBER || '+923203243970';
  private companyName = process.env.COMPANY_NAME || "Narkin's Builders";

  // Strategic blog distribution for existing and new blogs
  private blogStrategies: BlogStrategy[] = [
    {
      slug: 'apartments-for-sale-bahria-town-karachi-2025',
      targetMonth: 2,
      targetDay: 28,
      season: 'moderate',
      priority: 'high',
      description: 'Post-Eid property market surge'
    },
    {
      slug: 'luxury-apartments-bahria-town-investment-guide',
      targetMonth: 3,
      targetDay: 15,
      season: 'peak',
      priority: 'high',
      description: 'Financial year-end investment planning'
    },
    {
      slug: '2-bedroom-apartments-bahria-town-karachi-guide',
      targetMonth: 4,
      targetDay: 10,
      season: 'peak',
      priority: 'medium',
      description: 'Summer buying season begins'
    },
    {
      slug: 'bahria-town-karachi-property-investment-guide',
      targetMonth: 5,
      targetDay: 20,
      season: 'peak',
      priority: 'high',
      description: 'Peak buying season momentum'
    },
    {
      slug: 'buying-apartment-bahria-town-first-time-buyer-guide',
      targetMonth: 6,
      targetDay: 5,
      season: 'peak',
      priority: 'medium',
      description: 'Mid-year bonus season for buyers'
    },
    {
      slug: 'hill-crest-vs-boutique-residency-comparison',
      targetMonth: 7,
      targetDay: 18,
      season: 'moderate',
      priority: 'medium',
      description: 'Monsoon season research time'
    },
    {
      slug: 'bahria-town-karachi-market-trends-2025',
      targetMonth: 8,
      targetDay: 25,
      season: 'moderate',
      priority: 'high',
      description: 'Mid-year market analysis'
    },
    {
      slug: 'apartment-vs-house-bahria-town-karachi',
      targetMonth: 9,
      targetDay: 12,
      season: 'peak',
      priority: 'low',
      description: 'Post-summer decision making'
    }
  ];

  // Seasonal market insights for content enhancement
  private seasonalInsights: Record<number, string> = {
    2: "As the post-Eid property market picks up momentum in February, we're seeing increased interest in premium apartments across Bahria Town Karachi.",
    3: "With the financial year-end approaching, March represents an ideal time for property investment planning and portfolio diversification.",
    4: "April marks the beginning of Karachi's peak property buying season, with ideal weather conditions encouraging apartment viewings and purchases.",
    5: "May continues the strong buying momentum with developers offering attractive payment plans and completion timelines.",
    6: "As mid-year bonuses are distributed, June sees a significant increase in apartment purchases from working professionals.",
    7: "The monsoon season provides the perfect time for detailed property research and comparison shopping from the comfort of your home.",
    8: "August's mid-year market analysis reveals strong trends in Bahria Town, with consistent appreciation in property values.",
    9: "September's post-summer period marks the second major buying wave of the year, with families making relocation decisions."
  };

  async run(): Promise<void> {
    console.log('🚀 Starting Blog Automation System...');
    console.log(`📅 Current Date: ${new Date().toLocaleDateString()}`);
    console.log(`📁 Blog Directory: ${this.blogDir}`);

    try {
      // Ensure blog directory exists
      await this.ensureDirectoryExists();
      
      // Process existing blogs
      await this.processExistingBlogs();
      
      // Create missing blogs if needed
      await this.createMissingBlogs();
      
      // Generate automation report
      await this.generateReport();
      
      console.log('✅ Blog automation completed successfully!');
      
    } catch (error) {
      console.error('❌ Blog automation failed:', error);
      throw error;
    }
  }

  private async ensureDirectoryExists(): Promise<void> {
    try {
      await fs.mkdir(this.blogDir, { recursive: true });
      console.log(`📁 Blog directory ready: ${this.blogDir}`);
    } catch (error) {
      console.error('❌ Failed to create blog directory:', error);
      throw error;
    }
  }

  private async processExistingBlogs(): Promise<void> {
    console.log('🔄 Processing existing blogs...');
    
    for (const strategy of this.blogStrategies) {
      const filePath = path.join(this.blogDir, `${strategy.slug}.mdx`);
      
      try {
        const exists = await this.fileExists(filePath);
        
        if (exists) {
          console.log(`📝 Processing: ${strategy.slug}`);
          await this.updateExistingBlog(filePath, strategy);
        } else {
          console.log(`⚠️  Blog not found: ${strategy.slug}.mdx`);
        }
      } catch (error) {
        console.error(`❌ Error processing ${strategy.slug}:`, error);
      }
    }
  }

  private async updateExistingBlog(filePath: string, strategy: BlogStrategy): Promise<void> {
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);

      // Calculate strategic date
      const strategicDate = new Date(this.currentYear, strategy.targetMonth - 1, strategy.targetDay);
      const today = new Date();

      // Update frontmatter with strategic information
      const updatedFrontmatter = {
        ...frontmatter,
        date: strategicDate.toISOString().split('T')[0],
        lastModified: today.toISOString().split('T')[0],
        season: strategy.season,
        priority: strategy.priority,
        automatedUpdate: true,
        marketTiming: strategy.description
      };

      // Enhance content with seasonal insights
      const enhancedContent = this.enhanceContent(content, strategy.targetMonth);

      // Write updated file
      const updatedFile = matter.stringify(enhancedContent, updatedFrontmatter);
      await fs.writeFile(filePath, updatedFile);

      console.log(`✅ Updated ${strategy.slug} - Date: ${strategicDate.toDateString()}`);
      
    } catch (error) {
      console.error(`❌ Failed to update ${strategy.slug}:`, error);
      throw error;
    }
  }

  private enhanceContent(content: string, month: number): string {
    const seasonalInsight = this.seasonalInsights[month];
    
    if (!seasonalInsight) {
      return content;
    }

    // Add seasonal context after the first paragraph
    const paragraphs = content.split('\n\n');
    
    if (paragraphs.length > 1) {
      // Insert seasonal insight after first paragraph
      const enhancedParagraphs = [
        paragraphs[0],
        `**${this.getMonthName(month)} ${this.currentYear} Market Update**: ${seasonalInsight}`,
        ...paragraphs.slice(1)
      ];
      
      return enhancedParagraphs.join('\n\n');
    }

    return content;
  }

  private async createMissingBlogs(): Promise<void> {
    console.log('🆕 Checking for missing blogs...');
    
    for (const strategy of this.blogStrategies) {
      const filePath = path.join(this.blogDir, `${strategy.slug}.mdx`);
      const exists = await this.fileExists(filePath);
      
      if (!exists) {
        console.log(`📝 Creating missing blog: ${strategy.slug}`);
        await this.createBlogTemplate(strategy);
      }
    }
  }

  private async createBlogTemplate(strategy: BlogStrategy): Promise<void> {
    const strategicDate = new Date(this.currentYear, strategy.targetMonth - 1, strategy.targetDay);
    const today = new Date();

    const frontmatter = {
      title: this.generateTitle(strategy.slug),
      excerpt: this.generateExcerpt(strategy.slug),
      date: strategicDate.toISOString().split('T')[0],
      lastModified: today.toISOString().split('T')[0],
      image: `/images/blog/${strategy.slug}.webp`,
      readTime: "8 min read",
      category: "Real Estate",
      season: strategy.season,
      priority: strategy.priority,
      automatedUpdate: true,
      marketTiming: strategy.description
    };

    const content = this.generateContent(strategy);
    
    const blogFile = matter.stringify(content, frontmatter);
    const filePath = path.join(this.blogDir, `${strategy.slug}.mdx`);
    
    await fs.writeFile(filePath, blogFile);
    console.log(`✅ Created blog template: ${strategy.slug}`);
  }

  private generateTitle(slug: string): string {
    const titles: Record<string, string> = {
      'apartments-for-sale-bahria-town-karachi-2025': 'Apartments for Sale in Bahria Town Karachi 2025 - Premium Properties',
      'luxury-apartments-bahria-town-investment-guide': 'Luxury Apartments Bahria Town Investment Guide - High ROI Properties',
      '2-bedroom-apartments-bahria-town-karachi-guide': '2 Bedroom Apartments in Bahria Town Karachi - Complete Buyer Guide',
      'bahria-town-karachi-property-investment-guide': 'Bahria Town Karachi Property Investment Guide - Expert Analysis',
      'buying-apartment-bahria-town-first-time-buyer-guide': 'First-Time Buyer Guide for Bahria Town Apartments - Step by Step',
      'hill-crest-vs-boutique-residency-comparison': 'Hill Crest vs Boutique Residency Comparison - Which is Better?',
      'bahria-town-karachi-market-trends-2025': 'Bahria Town Karachi Market Trends 2025 - Expert Analysis',
      'apartment-vs-house-bahria-town-karachi': 'Apartment vs House in Bahria Town Karachi - Complete Comparison'
    };

    return titles[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  private generateExcerpt(slug: string): string {
    const excerpts: Record<string, string> = {
      'apartments-for-sale-bahria-town-karachi-2025': 'Discover premium apartments for sale in Bahria Town Karachi with Narkin\'s Builders. Hill Crest Residency and Boutique Residency offer luxury living.',
      'luxury-apartments-bahria-town-investment-guide': 'Complete investment guide for luxury apartments in Bahria Town Karachi. Expert analysis of ROI, market trends, and investment opportunities.',
      '2-bedroom-apartments-bahria-town-karachi-guide': 'Find the perfect 2 bedroom apartment in Bahria Town Karachi. Compare prices, amenities, and locations for your ideal home.',
      'bahria-town-karachi-property-investment-guide': 'Comprehensive property investment guide for Bahria Town Karachi. Market analysis, ROI projections, and expert recommendations.',
      'buying-apartment-bahria-town-first-time-buyer-guide': 'First-time buyer guide for Bahria Town apartments. Step-by-step process, financing options, and expert tips for new buyers.',
      'hill-crest-vs-boutique-residency-comparison': 'Detailed comparison between Hill Crest Residency and Boutique Residency. Amenities, pricing, and location analysis.',
      'bahria-town-karachi-market-trends-2025': 'Latest market trends and analysis for Bahria Town Karachi real estate. Price forecasts and investment opportunities.',
      'apartment-vs-house-bahria-town-karachi': 'Should you buy an apartment or house in Bahria Town Karachi? Complete comparison of pros, cons, and investment potential.'
    };

    return excerpts[slug] || `Expert insights about ${slug.replace(/-/g, ' ')} in Bahria Town Karachi.`;
  }

  private generateContent(strategy: BlogStrategy): string {
    const month = this.getMonthName(strategy.targetMonth);
    const seasonalInsight = this.seasonalInsights[strategy.targetMonth];

    return `# ${this.generateTitle(strategy.slug)}

**${month} ${this.currentYear} Market Update**: ${seasonalInsight}

## Introduction

Welcome to our comprehensive guide about ${strategy.slug.replace(/-/g, ' ')}. At ${this.companyName}, we bring over 30 years of construction excellence to help you make informed property decisions in Bahria Town Karachi.

## Key Highlights

- Premium locations in Bahria Town Karachi
- Modern amenities and facilities
- Flexible payment plans available
- Expert guidance from experienced professionals

## Market Analysis

The ${month} ${this.currentYear} market shows strong indicators for property investment in Bahria Town Karachi. Our analysis reveals:

- Consistent price appreciation
- High demand for quality apartments
- Growing infrastructure development
- Excellent ROI potential

## Why Choose ${this.companyName}?

With 30 years of experience in construction and real estate development, we offer:

- **Quality Construction**: Premium materials and modern techniques
- **Prime Locations**: Strategic locations in Bahria Town Karachi
- **Customer Focus**: Personalized service and support
- **Proven Track Record**: Successful project completions

## Contact Information

Ready to explore your options? Contact our expert team today:

📞 **Call us**: ${this.contactNumber}
🏢 **Visit us**: Bahria Town Karachi
🌐 **Website**: Professional consultation available

---

*${this.companyName} - 30 Years of Construction Excellence in Bahria Town Karachi*`;
  }

  private async generateReport(): Promise<void> {
    console.log('📊 Generating automation report...');
    
    const reportPath = path.join(process.cwd(), 'logs');
    await fs.mkdir(reportPath, { recursive: true });
    
    const report = {
      timestamp: new Date().toISOString(),
      processedBlogs: this.blogStrategies.length,
      strategies: this.blogStrategies.map(s => ({
        slug: s.slug,
        targetDate: new Date(this.currentYear, s.targetMonth - 1, s.targetDay).toISOString().split('T')[0],
        season: s.season,
        priority: s.priority,
        description: s.description
      })),
      nextRun: new Date(this.currentYear, new Date().getMonth() + 1, 1).toISOString().split('T')[0]
    };
    
    await fs.writeFile(
      path.join(reportPath, 'automation-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('✅ Automation report generated');
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  private getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  }
}

// Run the automation
async function main() {
  try {
    const automation = new BlogAutomationSystem();
    await automation.run();
  } catch (error) {
    console.error('Blog automation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { BlogAutomationSystem };

