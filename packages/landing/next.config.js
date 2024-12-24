/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false,
    turbotrace: {
      memoryLimit: 8 * 1024, // 8GB
      logLevel: 'error',
      logAll: false
    }
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  productionBrowserSourceMaps: false,
  generateBuildId: () => 'build',
  poweredByHeader: false,
  compress: true
}

module.exports = nextConfig
