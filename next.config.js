/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: 'export',
//   typescript: {
//     ignoreBuildErrors: true
//   }
// }
// const withPreact = require('next-plugin-preact');

// module.exports = withPreact(nextConfig);

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ["admin.narkinsbuilders.com", "i.ytimg.com"]
  }
  // webpack: (config, { dev, isServer }) => {
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       "react/jsx-runtime.js": "preact/compat/jsx-runtime",
  //       react: "preact/compat",
  //       "react-dom/test-utils": "preact/test-utils",
  //       "react-dom": "preact/compat",
  //     });
  //   }
  //   return config;
  // },
};