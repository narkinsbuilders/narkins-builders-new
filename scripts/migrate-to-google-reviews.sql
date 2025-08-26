-- Migration script to add Google Reviews style fields
-- Run: bun run migrate-google-reviews

-- Step 1: Add new columns to blog_comments table
ALTER TABLE blog_comments 
ADD COLUMN rating TINYINT(1) DEFAULT 5 COMMENT 'Rating 1-5 stars';

ALTER TABLE blog_comments 
ADD COLUMN helpful_count INT DEFAULT 0 COMMENT 'Number of helpful votes';

ALTER TABLE blog_comments 
ADD COLUMN is_verified BOOLEAN DEFAULT FALSE COMMENT 'Verified reviewer status';

-- Step 2: Update existing comments with default rating of 5
UPDATE blog_comments SET rating = 5 WHERE rating IS NULL;

-- Step 3: Create helpful_votes table to track who voted helpful
CREATE TABLE IF NOT EXISTS comment_helpful_votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    user_ip VARCHAR(45) NOT NULL,
    user_fingerprint VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE CASCADE,
    
    -- Unique constraint to prevent duplicate votes
    UNIQUE KEY unique_helpful_vote (comment_id, user_ip),
    
    -- Indexes
    INDEX idx_comment_id (comment_id),
    INDEX idx_user_ip (user_ip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Step 4: Add indexes for new columns
CREATE INDEX idx_comments_rating ON blog_comments(rating);
CREATE INDEX idx_comments_helpful_count ON blog_comments(helpful_count);
CREATE INDEX idx_comments_verified ON blog_comments(is_verified);

-- Note: Triggers will be handled programmatically to avoid delimiter issues

-- Step 5: Update blog_stats to include average rating
ALTER TABLE blog_stats 
ADD COLUMN avg_rating DECIMAL(2,1) DEFAULT 0.0 COMMENT 'Average rating for blog';

-- Create view for Google Reviews style data
CREATE OR REPLACE VIEW google_reviews_view AS
SELECT 
    c.id,
    c.blog_slug,
    c.author_name,
    c.content,
    c.rating,
    c.helpful_count,
    c.likes,
    c.is_verified,
    c.created_at,
    c.updated_at,
    -- Calculate relative time (e.g., "2 weeks ago")
    CASE 
        WHEN TIMESTAMPDIFF(HOUR, c.created_at, NOW()) < 1 THEN 'Just now'
        WHEN TIMESTAMPDIFF(HOUR, c.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, c.created_at, NOW()), ' hours ago')
        WHEN TIMESTAMPDIFF(DAY, c.created_at, NOW()) < 7 THEN CONCAT(TIMESTAMPDIFF(DAY, c.created_at, NOW()), ' days ago')
        WHEN TIMESTAMPDIFF(WEEK, c.created_at, NOW()) < 4 THEN CONCAT(TIMESTAMPDIFF(WEEK, c.created_at, NOW()), ' weeks ago')
        WHEN TIMESTAMPDIFF(MONTH, c.created_at, NOW()) < 12 THEN CONCAT(TIMESTAMPDIFF(MONTH, c.created_at, NOW()), ' months ago')
        ELSE CONCAT(TIMESTAMPDIFF(YEAR, c.created_at, NOW()), ' years ago')
    END as relative_time
FROM blog_comments c
WHERE c.approved = TRUE
ORDER BY c.helpful_count DESC, c.created_at DESC;