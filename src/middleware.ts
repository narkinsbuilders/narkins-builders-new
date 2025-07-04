// middleware.ts - Add to your root directory
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const searchParams = url.searchParams;
  
  // List of suspicious parameter patterns
  const suspiciousParams = [
    'anapaestic',
    'acetosoluble', 
    'Lohana',
    'basicopic',
    'lapcock',
    'crouse',
    'intriguing',
    'aeronetics',
    'DZGiYHrlDu',
    'bUswm',
    'RzqtclLPgV'
  ];
  
  // Check for known spam parameters
  for (const param of suspiciousParams) {
    if (searchParams.has(param)) {
      console.log(`Blocked spam URL: ${request.url}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  
  // Block URLs with random long parameter patterns
  for (const [key, value] of searchParams.entries()) {
    // Block parameters that are:
    // - 8+ characters long with random letters/numbers
    // - Have numeric values 5+ digits
    if (
      (key.length >= 8 && /^[a-zA-Z0-9]+$/.test(key) && /^[0-9]{5,}$/.test(value)) ||
      (key.length >= 10 && /^[a-zA-Z]+[0-9]+/.test(key)) ||
      (/^[A-Z][a-z]+[A-Z]/.test(key)) // Mixed case suspicious patterns
    ) {
      console.log(`Blocked suspicious pattern: ${key}=${value}`);
      return new NextResponse('Forbidden', { status: 403 });
    }
  }
  
  // WordPress URL redirects (existing functionality)
  const wpBlogRegex = /^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)\/?$/;
  const wpMatch = url.pathname.match(wpBlogRegex);
  
  if (wpMatch) {
    const [, year, month, day, slug] = wpMatch;
    url.pathname = `/blog/${slug.replace(/\/$/, '')}`;
    return NextResponse.redirect(url, 301);
  }
  
  // Other WordPress patterns
  if (url.pathname.startsWith('/category/')) {
    url.pathname = '/blog';
    return NextResponse.redirect(url, 301);
  }
  
  if (url.pathname.startsWith('/wp-admin') || url.pathname.startsWith('/wp-content')) {
    url.pathname = '/';
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except API routes, static files, and Next.js internals
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};