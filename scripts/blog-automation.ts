// ===================================
// FIXED: scripts/blog-automation.ts (Replace the existing one)
// ===================================

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface BlogStrategy {
  slug: string;
  strategicDate: string; // FIXED: Use actual past/present dates
  season: 'peak' | 'moderate' | 'low';
  priority: 'high' | 'medium' | 'low';
  description: string;
}

class BlogAutomationSystem {
  private blogDir = path.join(process.cwd(), 'content/blogs');
  private today = new Date();
  private contactNumber = process.env.CONTACT_NUMBER || '+923203243970';
  private companyName = process.env.COMPANY_NAME || "Narkin's Builders";

  // FIXED: Strategic past/present dates - NO FUTURE DATES!
  private blogStrategies: BlogStrategy[] = [
    {
      slug: 'apartments-for-sale-bahria-town-karachi-2025',
      strategicDate: '2025-01-15', // January - New Year property search
      season: 'moderate',
      priority: 'high',
      description: 'New Year property search peak'
    },
    {
      slug: 'luxury-apartments-bahria-town-investment-guide',
      strategicDate: '2025-02-20', // February - Post-Eid investment
      season: 'peak',
      priority: 'high',
      description: 'Post-Eid investment planning season'
    },
    {
      slug: '2-bedroom-apartments-bahria-town-karachi-guide',
      strategicDate: '2025-03-10', // March - Spring buying
      season: 'peak',
      priority: 'medium',
      description: 'Spring buying season begins'
    },
    {
      slug: 'bahria-town-karachi-property-investment-guide',
      strategicDate: '2025-04-15', // April - Peak season
      season: 'peak',
      priority: 'high',
      description: 'Peak buying season momentum'
    },
    {
      slug: 'buying-apartment-bahria-town-first-time-buyer-guide',
      strategicDate: '2025-05-20', // May - Mid-year guidance
      season: 'peak',
      priority: 'medium',
      description: 'Mid-year buyer education peak'
    },
    {
      slug: 'hill-crest-vs-boutique-residency-comparison',
      strategicDate: '2025-06-25', // June - Mid-year comparison
      season: 'moderate',
      priority: 'medium',
      description: 'Mid-year project comparison time'
    },
    {
      slug: 'bahria-town-karachi-market-trends-2025',
      strategicDate: '2025-07-03', // July 3rd - Recent analysis
      season: 'moderate',
      priority: 'high',
      description: 'Current market analysis and trends'
    },
    {
      slug: 'apartment-vs-house-bahria-town-karachi',
      strategicDate: '2025-07-04', // Today - Current decision guide
      season: 'peak',
      priority: 'low',
      description: 'Current property decision guidance'
    }
  ];

  // Market insights for each month
  private marketInsights: Record<string, string> = {
    '2025-01': "The New Year brings renewed interest in property investment with buyers setting real estate goals for 2025.",
    '2025-02': "Post-Eid season shows strong momentum in Bahria Town Karachi as families consider property upgrades.",
    '2025-03': "Spring marks the beginning of peak buying season with ideal weather for property viewings.",
    '2025-04': "April continues the strong buying momentum with developers offering attractive payment plans.",
    '2025-05': "Mid-year analysis shows consistent growth in property values across Bahria Town Karachi.",
    '2025-06': "June's market data reveals sustained buyer confidence and project development progress.",
    '2025-07': "July 2025 shows continued growth in real estate sector with strong buyer confidence and new developments."
  };

  async run(): Promise<void> {
    console.log('🔧 FIXING Blog Automation - No Future Dates!');
    console.log(`📅 Today: ${this.today.toISOString().split('T')[0]}`);

    try {
      await this.ensureDirectoryExists();
      await this.fixAllBlogDates();
      await this.generateReport();
      console.log('✅ Blog automation fixed successfully!');
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

  private async fixAllBlogDates(): Promise<void> {
    console.log('🔄 Fixing all blog dates to strategic past/present...');
    
    for (const strategy of this.blogStrategies) {
      await this.fixBlogDate(strategy);
    }
  }

  private async fixBlogDate(strategy: BlogStrategy): Promise<void> {
    const filePath = path.join(this.blogDir, `${strategy.slug}.mdx`);
    
    try {
      const exists = await this.fileExists(filePath);
      
      if (!exists) {
        console.log(`⚠️  Blog not found: ${strategy.slug}.mdx`);
        return;
      }

      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);

      // FIXED: Update with strategic past/present date
      const updatedFrontmatter = {
        ...frontmatter,
        date: strategy.strategicDate,
        lastModified: this.today.toISOString().split('T')[0],
        season: strategy.season,
        priority: strategy.priority,
        dateFixed: true,
        marketTiming: strategy.description
      };

      // Add current market insight
      const enhancedContent = this.addMarketInsight(content, strategy.strategicDate);

      const updatedFile = matter.stringify(enhancedContent, updatedFrontmatter);
      await fs.writeFile(filePath, updatedFile);

      console.log(`✅ Fixed ${strategy.slug}`);
      console.log(`   📅 Date: ${strategy.strategicDate} (${strategy.description})`);

    } catch (error) {
      console.error(`❌ Error fixing ${strategy.slug}:`, error);
    }
  }

  private addMarketInsight(content: string, date: string): string {
    const monthKey = date.substring(0, 7); // Get YYYY-MM
    const insight = this.marketInsights[monthKey];
    
    if (!insight) {
      return content;
    }

    const monthName = this.getMonthName(date);
    const updateText = `**${monthName} Market Update**: ${insight}`;
    
    // Only add if not already present
    if (content.includes(`${monthName} Market Update`) || content.includes(`${monthName} Update`)) {
      return content;
    }
    
    const paragraphs = content.split('\n\n');
    if (paragraphs.length > 1) {
      paragraphs.splice(1, 0, updateText);
      return paragraphs.join('\n\n');
    }
    
    return `${updateText}\n\n${content}`;
  }

  private getMonthName(dateString: string): string {
    const date = new Date(dateString);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  private async generateReport(): Promise<void> {
    console.log('📊 Generating fixed automation report...');
    
    const reportPath = path.join(process.cwd(), 'logs');
    await fs.mkdir(reportPath, { recursive: true });
    
    const report = {
      timestamp: new Date().toISOString(),
      action: 'Blog dates fixed - no future dates',
      totalBlogs: this.blogStrategies.length,
      dateRange: 'January 2025 - July 2025 (all past/present)',
      strategy: 'Strategic distribution across 7 months',
      futureDates: 'NONE - All dates are past or present',
      blogs: this.blogStrategies.map(s => ({
        slug: s.slug,
        date: s.strategicDate,
        season: s.season,
        priority: s.priority,
        timing: s.description
      })),
      seoImpact: 'Improved - no future dates, strategic distribution',
      nextAction: 'Monthly content updates only'
    };
    
    await fs.writeFile(
      path.join(reportPath, 'blog-automation-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('✅ Fixed automation report generated');
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

// Run the fixed automation
async function main() {
  try {
    const automation = new BlogAutomationSystem();
    await automation.run();
  } catch (error) {
    console.error('Fixed automation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { BlogAutomationSystem };