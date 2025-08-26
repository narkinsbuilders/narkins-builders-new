// Check database column structure
import { executeQuery, testConnection } from '../src/lib/database';

async function checkColumns() {
  console.log('INFO: Checking database structure...');
  
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('ERROR: Database connection failed');
      return;
    }
    
    // Check blog_comments table structure
    const columns = await executeQuery(`
      SELECT COLUMN_NAME, DATA_TYPE, COLUMN_DEFAULT, IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'blog_comments'
      ORDER BY ORDINAL_POSITION
    `);
    
    console.log('\nblog_comments table columns:');
    columns.forEach((col: any) => {
      console.log(`  - ${col.COLUMN_NAME}: ${col.DATA_TYPE} (default: ${col.COLUMN_DEFAULT}, nullable: ${col.IS_NULLABLE})`);
    });
    
    // Check if helpful votes table exists
    const tables = await executeQuery(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'comment_helpful_votes'
    `);
    
    console.log(`\ncomment_helpful_votes table: ${tables.length > 0 ? 'EXISTS' : 'MISSING'}`);
    
    // Check sample data
    const commentCount = await executeQuery('SELECT COUNT(*) as count FROM blog_comments');
    console.log(`\nTotal comments: ${commentCount[0].count}`);
    
    if (commentCount[0].count > 0) {
      const sample = await executeQuery('SELECT id, author_name, rating, helpful_count, is_verified FROM blog_comments LIMIT 3');
      console.log('\nSample data:');
      sample.forEach((row: any) => {
        console.log(`  - ID: ${row.id}, Name: ${row.author_name}, Rating: ${row.rating}, Helpful: ${row.helpful_count}, Verified: ${row.is_verified}`);
      });
    }
    
  } catch (error) {
    console.error('ERROR:', error);
  }
}

checkColumns();