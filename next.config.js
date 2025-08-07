import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Build optimizations  
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/plots', '@ant-design/icons'],
  },
  // Turbopack configuration (stable)
  turbopack: {
    rules: {
      // CSS modules for Turbopack
      '*.module.css': {
        loaders: ['css-loader'],
        as: '*.module.css',
      },
      // SCSS modules for Turbopack  
      '*.module.scss': {
        loaders: ['sass-loader', 'css-loader'],
        as: '*.module.css',
      },
      // Handle SVG files
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      '@': './src',
      '@/components': './src/components',
      '@/lib': './src/lib',
      '@/styles': './src/styles',
    },
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
  webpack: (config, { isServer, dev }) => {
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

    // Production build optimizations
    if (!dev) {
      // Enable parallel processing
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Better chunk splitting for blog components
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          antd: {
            name: 'antd',
            test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
            priority: 20,
          },
          charts: {
            name: 'charts', 
            test: /[\\/]node_modules[\\/]@ant-design[\\/]plots[\\/]/,
            priority: 30,
          },
          mdx: {
            name: 'mdx',
            test: /[\\/]node_modules[\\/](next-mdx-remote|remark|rehype)[\\/]/,
            priority: 25,
          }
        },
      };
    }
    
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
      // Force cache refresh for critical updates (remove after users update)
      {
        source: '/_next/static/chunks/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
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
  async redirects() {
    return [
      {
        source: '/blog/bahria-town-uncertainty-smart-investors-choose-established-developers-2025',
        destination: '/blog/bahria-town-shutdown-scare-investment-security',
        permanent: true,
      },
    ]
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

export default bundleAnalyzer(nextConfig);