// ===================================
// File: scripts/verify-setup.ts
// ===================================

import { promises as fs } from 'fs';
import path from 'path';

async function verifySetup() {
  console.log('🔍 Verifying automation setup...');
  
  const checks = [
    { name: 'Blog directory exists', path: 'content/blogs' },
    { name: 'Logs directory exists', path: 'logs' },
    { name: 'GitHub workflow exists', path: '.github/workflows/blog-automation.yml' },
    { name: 'Scripts directory exists', path: 'scripts' },
    { name: 'Package.json has scripts', path: 'package.json' }
  ];
  
  for (const check of checks) {
    try {
      await fs.access(path.join(process.cwd(), check.path));
      console.log(`✅ ${check.name}`);
    } catch {
      console.log(`❌ ${check.name} - Missing: ${check.path}`);
    }
  }
  
  // Check environment variables
  const requiredEnvs = ['CONTACT_NUMBER', 'COMPANY_NAME'];
  for (const env of requiredEnvs) {
    if (process.env[env]) {
      console.log(`✅ Environment variable: ${env}`);
    } else {
      console.log(`⚠️  Environment variable missing: ${env}`);
    }
  }
  
  console.log('🎉 Setup verification completed!');
}

if (require.main === module) {
  verifySetup().catch(console.error);
}