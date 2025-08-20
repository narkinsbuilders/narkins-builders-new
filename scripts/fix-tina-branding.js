#!/usr/bin/env node
// Post-build script to fix TinaCMS branding after it regenerates the HTML

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(process.cwd(), 'public/admin/index.html');

console.log('🔧 Fixing TinaCMS branding...');

try {
  if (!fs.existsSync(htmlPath)) {
    console.log('❌ Admin HTML file not found, skipping branding fix');
    process.exit(0);
  }

  let html = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace title
  html = html.replace(
    /<title>TinaCMS<\/title>/g, 
    '<title>OtherDev CMS Solutions</title>'
  );
  
  // Replace error message
  html = html.replace(
    /Failed loading TinaCMS assets/g,
    'Failed loading CMS assets'
  );
  
  html = html.replace(
    /Your TinaCMS configuration may be misconfigured/g,
    'Your CMS configuration may be misconfigured'
  );
  
  html = html.replace(
    /Please visit <a href="https:\/\/tina\.io\/docs\/tina-cloud\/faq\/#how-do-i-resolve-failed-loading-tinacms-assets-error">this doc<\/a> for help\./g,
    'Please contact team OtherDev for assistance.'
  );

  fs.writeFileSync(htmlPath, html);
  console.log('✅ TinaCMS branding fixed successfully');
  
} catch (error) {
  console.error('❌ Error fixing TinaCMS branding:', error.message);
  process.exit(1);
}