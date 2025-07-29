/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  transpilePackages: [
    'antd', 
    '@ant-design/plots', 
    '@ant-design/icons',
    'rc-util',
    'rc-pagination', 
    'rc-picker', 
    'rc-table', 
    'rc-tree', 
    'rc-tooltip',
    'rc-select',
    'rc-menu',
    'rc-dropdown',
    'rc-input',
    'rc-textarea',
    'rc-checkbox',
    'rc-radio',
    'rc-switch',
    'rc-slider',
    'rc-progress',
    'rc-upload',
    'rc-steps',
    'rc-tabs',
    'rc-collapse',
    'rc-drawer',
    'rc-modal',
    'rc-notification',
    'rc-message',
    'rc-tooltip',
    'rc-popover',
    'rc-popconfirm',
    '@rc-component/util',
    '@rc-component/color-picker',
    '@rc-component/trigger',
    '@rc-component/portal',
    '@rc-component/motion'
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Handle Ant Design ESM modules
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });
    
    return config;
  },
  // Enhanced Security headers for SEO and performance
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Disable caching in development for fresh updates
          ...(isDev ? [{
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          }] : []),
        ],
      },
      // RSS and Sitemap caching
      {
        source: '/api/(rss|sitemap).(xml|txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Blog images - shorter cache for regular updates (must come first)
      {
        source: '/images/blog-images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Other static assets - long-term caching
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'admin.narkinsbuilders.com',
        port: '',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'narkinsbuilders.com',
        port: '',
        pathname: '/**',
      },
      ...(process.env.NODE_ENV === 'development' ? [{
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      }] : [])
    ]
  }
}

module.exports = nextConfig