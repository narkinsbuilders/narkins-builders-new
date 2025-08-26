// Migration script for Google Reviews style comments
// Run: bun run migrate-google-reviews

import { readFileSync } from 'fs';
import { join } from 'path';
import { executeQuery, testConnection } from '../src/lib/database';

async function migrateToGoogleReviews() {
  console.log('INFO: Starting migration to Google Reviews style...');
  
  try {
    // Test connection first
    console.log('INFO: Testing database connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('ERROR: Database connection failed. Check your .env configuration.');
      process.exit(1);
    }
    
    console.log('SUCCESS: Database connection successful');
    
    // Read migration SQL file
    const sqlPath = join(__dirname, 'migrate-to-google-reviews.sql');
    const sqlContent = readFileSync(sqlPath, 'utf8');
    
    // Split SQL statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.includes('DELIMITER'));
    
    console.log(`INFO: Executing ${statements.length} migration statements...`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      try {
        await executeQuery(statement);
        console.log(`SUCCESS: Migration statement ${i + 1}/${statements.length} executed`);
      } catch (error) {
        if (error.message.includes('Duplicate column') || 
            error.message.includes('already exists') ||
            error.message.includes('Duplicate key')) {
          console.log(`INFO: Statement ${i + 1} already applied (skipping)`);
        } else {
          console.error(`ERROR: Statement ${i + 1} failed:`, error.message);
          throw error;
        }
      }
    }
    
    // Verify new columns were added
    console.log('INFO: Verifying migration...');
    const columns = await executeQuery(`
      SELECT COLUMN_NAME, DATA_TYPE, COLUMN_DEFAULT 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'blog_comments' 
      AND COLUMN_NAME IN ('rating', 'helpful_count', 'is_verified')
    `);
    
    const expectedColumns = ['rating', 'helpful_count', 'is_verified'];
    const foundColumns = columns.map((col: any) => col.COLUMN_NAME);
    const missingColumns = expectedColumns.filter(col => !foundColumns.includes(col));
    
    if (missingColumns.length > 0) {
      console.error('ERROR: Missing columns after migration:', missingColumns);
      throw new Error('Migration incomplete');
    }
    
    // Check if helpful_votes table was created
    const tables = await executeQuery(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'comment_helpful_votes'
    `);
    
    if (tables.length === 0) {
      console.error('ERROR: comment_helpful_votes table was not created');
      throw new Error('Migration incomplete');
    }
    
    // Show current comment stats
    console.log('\nINFO: Migration summary:');
    const commentCount = await executeQuery('SELECT COUNT(*) as count FROM blog_comments');
    console.log(`  - Total comments: ${commentCount[0].count}`);
    
    const ratingStats = await executeQuery(`
      SELECT 
        AVG(rating) as avg_rating,
        MIN(rating) as min_rating,
        MAX(rating) as max_rating
      FROM blog_comments
    `);
    
    if (ratingStats[0].avg_rating) {
      console.log(`  - Average rating: ${parseFloat(ratingStats[0].avg_rating).toFixed(1)}/5`);
      console.log(`  - Rating range: ${ratingStats[0].min_rating} - ${ratingStats[0].max_rating}`);
    }
    
    const helpfulStats = await executeQuery('SELECT COUNT(*) as count FROM comment_helpful_votes');
    console.log(`  - Helpful votes: ${helpfulStats[0].count}`);
    
    console.log('\nSUCCESS: Migration to Google Reviews style completed!');
    console.log('\nINFO: Next steps:');
    console.log('1. Install react-google-reviews library');
    console.log('2. Update comment APIs to handle rating and helpful votes');
    console.log('3. Create new Google Reviews style components');
    console.log('4. Update blog layout to use new components');
    
  } catch (error) {
    console.error('ERROR: Migration failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  migrateToGoogleReviews();
}

export { migrateToGoogleReviews };