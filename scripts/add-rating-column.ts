// Add missing rating column
import { executeQuery, testConnection } from '../src/lib/database';

async function addRatingColumn() {
  console.log('INFO: Adding rating column...');
  
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('ERROR: Database connection failed');
      return;
    }
    
    // Add rating column
    await executeQuery(`
      ALTER TABLE blog_comments 
      ADD COLUMN rating TINYINT(1) DEFAULT 5 COMMENT 'Rating 1-5 stars'
    `);
    console.log('SUCCESS: Rating column added');
    
    // Update existing comments
    await executeQuery('UPDATE blog_comments SET rating = 5 WHERE rating IS NULL');
    console.log('SUCCESS: Existing comments updated with default rating');
    
    // Create index
    await executeQuery('CREATE INDEX idx_comments_rating ON blog_comments(rating)');
    console.log('SUCCESS: Rating index created');
    
    // Create helpful votes table
    await executeQuery(`
      CREATE TABLE IF NOT EXISTS comment_helpful_votes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        comment_id INT NOT NULL,
        user_ip VARCHAR(45) NOT NULL,
        user_fingerprint VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE CASCADE,
        UNIQUE KEY unique_helpful_vote (comment_id, user_ip),
        INDEX idx_comment_id (comment_id),
        INDEX idx_user_ip (user_ip)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('SUCCESS: Helpful votes table created');
    
    console.log('\nMigration completed successfully!');
    
  } catch (error) {
    console.error('ERROR:', error);
  }
}

addRatingColumn();