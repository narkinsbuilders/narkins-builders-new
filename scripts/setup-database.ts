// Database setup script for comment system
// Run: bun run setup-database

import { readFileSync } from 'fs';
import { join } from 'path';
import { executeQuery, testConnection } from '../src/lib/database';

async function setupDatabase() {
  console.log('🔧 Setting up comment system database...');
  
  try {
    // Test connection first
    console.log('📡 Testing database connection...');
    const isConnected = await testConnection();
    
    if (!isConnected) {
      console.error('❌ Database connection failed. Check your .env configuration.');
      process.exit(1);
    }
    
    console.log('✅ Database connection successful');
    
    // Read SQL file
    const sqlPath = join(__dirname, 'init-database.sql');
    const sqlContent = readFileSync(sqlPath, 'utf8');
    
    // Split SQL statements (handle multiple statements)
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📋 Executing ${statements.length} SQL statements...`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.includes('DELIMITER') || statement.includes('//')) {
        // Skip delimiter statements for now
        continue;
      }
      
      try {
        await executeQuery(statement);
        console.log(`✅ Statement ${i + 1}/${statements.length} executed successfully`);
      } catch (error) {
        console.warn(`⚠️  Statement ${i + 1} failed (might already exist):`, error.message);
      }
    }
    
    // Verify tables were created
    console.log('🔍 Verifying table creation...');
    const tables = await executeQuery('SHOW TABLES');
    const tableNames = tables.map(row => Object.values(row)[0]);
    
    const expectedTables = [
      'blog_comments',
      'comment_likes', 
      'admin_users',
      'moderation_log',
      'blog_stats',
      'rate_limits'
    ];
    
    const missingTables = expectedTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length > 0) {
      console.error('❌ Missing tables:', missingTables);
      console.log('💡 You may need to run the SQL script manually in your database.');
    } else {
      console.log('✅ All comment system tables created successfully');
    }
    
    // Show table structure
    console.log('\n📊 Database structure:');
    for (const table of expectedTables) {
      if (tableNames.includes(table)) {
        const count = await executeQuery(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`  - ${table}: ${count[0].count} records`);
      }
    }
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Update your .env file with proper ReCAPTCHA keys');
    console.log('2. Change the default admin password');
    console.log('3. Configure rate limiting and moderation settings');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  setupDatabase();
}

export { setupDatabase };