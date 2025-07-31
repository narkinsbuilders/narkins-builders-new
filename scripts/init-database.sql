-- Database schema for Narkins Builders comment system
-- Run this script to create all necessary tables

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_slug VARCHAR(255) NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved BOOLEAN DEFAULT FALSE,
    auto_approved BOOLEAN DEFAULT FALSE,
    moderation_score DECIMAL(3,2) DEFAULT 0.00,
    flagged_reason VARCHAR(255) NULL,
    user_ip VARCHAR(45) NOT NULL,
    user_agent TEXT NULL,
    
    -- Indexes for performance
    INDEX idx_blog_slug (blog_slug),
    INDEX idx_approved (approved),
    INDEX idx_created_at (created_at),
    INDEX idx_user_ip (user_ip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create comment_likes table
CREATE TABLE IF NOT EXISTS comment_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    user_ip VARCHAR(45) NOT NULL,
    user_fingerprint VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraint
    FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE CASCADE,
    
    -- Unique constraint to prevent duplicate likes
    UNIQUE KEY unique_comment_like (comment_id, user_ip),
    
    -- Indexes
    INDEX idx_comment_id (comment_id),
    INDEX idx_user_ip (user_ip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'moderator') DEFAULT 'moderator',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    active BOOLEAN DEFAULT TRUE,
    
    -- Indexes
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create moderation_log table
CREATE TABLE IF NOT EXISTS moderation_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    admin_id INT NULL,
    action ENUM('approved', 'rejected', 'flagged', 'auto_approved') NOT NULL,
    reason TEXT NULL,
    previous_status ENUM('pending', 'approved', 'rejected', 'flagged') NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key constraints
    FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_comment_id (comment_id),
    INDEX idx_admin_id (admin_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create blog_stats table
CREATE TABLE IF NOT EXISTS blog_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_slug VARCHAR(255) NOT NULL UNIQUE,
    total_comments INT DEFAULT 0,
    total_likes INT DEFAULT 0,
    avg_moderation_score DECIMAL(4,2) DEFAULT 0.00,
    last_comment_at TIMESTAMP NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_blog_slug (blog_slug),
    INDEX idx_total_comments (total_comments),
    INDEX idx_last_comment_at (last_comment_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create rate_limits table for rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_ip VARCHAR(45) NOT NULL,
    action_type ENUM('comment', 'like') NOT NULL,
    request_count INT DEFAULT 1,
    window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Unique constraint for IP + action combination
    UNIQUE KEY unique_rate_limit (user_ip, action_type),
    
    -- Indexes
    INDEX idx_user_ip (user_ip),
    INDEX idx_window_start (window_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123 - CHANGE THIS!)
INSERT IGNORE INTO admin_users (username, email, password_hash, role) 
VALUES (
    'admin', 
    'admin@narkinsbuilders.com', 
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3uyGjdQjPK', -- admin123
    'admin'
);

-- Create triggers to update blog_stats automatically

DELIMITER //

-- Trigger to update stats when comment is approved
CREATE TRIGGER IF NOT EXISTS update_stats_on_comment_approve
AFTER UPDATE ON blog_comments
FOR EACH ROW
BEGIN
    IF NEW.approved = TRUE AND OLD.approved = FALSE THEN
        INSERT INTO blog_stats (blog_slug, total_comments, last_comment_at)
        VALUES (NEW.blog_slug, 1, NEW.created_at)
        ON DUPLICATE KEY UPDATE
        total_comments = total_comments + 1,
        last_comment_at = GREATEST(last_comment_at, NEW.created_at),
        last_updated = CURRENT_TIMESTAMP;
    END IF;
END//

-- Trigger to update stats when comment is deleted
CREATE TRIGGER IF NOT EXISTS update_stats_on_comment_delete
AFTER DELETE ON blog_comments
FOR EACH ROW
BEGIN
    IF OLD.approved = TRUE THEN
        UPDATE blog_stats 
        SET total_comments = GREATEST(0, total_comments - 1),
            last_updated = CURRENT_TIMESTAMP
        WHERE blog_slug = OLD.blog_slug;
    END IF;
END//

-- Trigger to update like counts
CREATE TRIGGER IF NOT EXISTS update_like_count_on_insert
AFTER INSERT ON comment_likes
FOR EACH ROW
BEGIN
    UPDATE blog_comments 
    SET likes = likes + 1 
    WHERE id = NEW.comment_id;
    
    UPDATE blog_stats 
    SET total_likes = total_likes + 1,
        last_updated = CURRENT_TIMESTAMP
    WHERE blog_slug = (SELECT blog_slug FROM blog_comments WHERE id = NEW.comment_id);
END//

CREATE TRIGGER IF NOT EXISTS update_like_count_on_delete
AFTER DELETE ON comment_likes
FOR EACH ROW
BEGIN
    UPDATE blog_comments 
    SET likes = GREATEST(0, likes - 1) 
    WHERE id = OLD.comment_id;
    
    UPDATE blog_stats 
    SET total_likes = GREATEST(0, total_likes - 1),
        last_updated = CURRENT_TIMESTAMP
    WHERE blog_slug = (SELECT blog_slug FROM blog_comments WHERE id = OLD.comment_id);
END//

DELIMITER ;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_comments_slug_approved ON blog_comments(blog_slug, approved, created_at);
CREATE INDEX IF NOT EXISTS idx_comments_moderation ON blog_comments(approved, moderation_score);
CREATE INDEX IF NOT EXISTS idx_rate_limits_cleanup ON rate_limits(window_start);

-- Sample data for testing (optional)
-- INSERT INTO blog_comments (blog_slug, author_name, author_email, content, approved, auto_approved, user_ip) 
-- VALUES 
-- ('sample-blog-post', 'John Doe', 'john@example.com', 'Great article! Very informative.', TRUE, TRUE, '127.0.0.1'),
-- ('sample-blog-post', 'Jane Smith', 'jane@example.com', 'Thanks for sharing this valuable information.', TRUE, FALSE, '127.0.0.2');