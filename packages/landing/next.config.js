// Enable debugging
const debugInfo = require('./debug-build.js')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false,
    turbotrace: {
      memoryLimit: 4096,
      logLevel: 'verbose',
      logAll: true
    }
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'export',
  distDir: '.next',
  onDemandEntries: {
    // Enable page compilation logging
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Print debug info at webpack time
    debugInfo.printDebugInfo();

    // Add source maps for better debugging
    if (dev) {
      config.devtool = 'eval-source-map';
    }

    // Log webpack configuration
    console.log('\n=== Webpack Configuration ===');
    console.log('Entry points:', Object.keys(config.entry));
    console.log('Resolve modules:', config.resolve.modules);
    console.log('Build ID:', buildId);
    console.log('Is Server:', isServer);

    return config;
  }
}

module.exports = nextConfig
