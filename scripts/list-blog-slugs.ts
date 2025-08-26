// List blog slugs that have comments
import { executeQuery, testConnection } from '../src/lib/database';

async function listBlogSlugs() {
  console.log('INFO: Checking blog slugs with comments...');
  
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('ERROR: Database connection failed');
      return;
    }
    
    const slugs = await executeQuery(`
      SELECT DISTINCT blog_slug, COUNT(*) as comment_count
      FROM blog_comments 
      GROUP BY blog_slug
      ORDER BY comment_count DESC
    `);
    
    console.log('\nBlog slugs with comments:');
    slugs.forEach((row: any) => {
      console.log(`  - ${row.blog_slug} (${row.comment_count} comments)`);
    });
    
  } catch (error) {
    console.error('ERROR:', error);
  }
}

listBlogSlugs();