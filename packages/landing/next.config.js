/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false,
    turbotrace: false
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  productionBrowserSourceMaps: false,
  generateBuildId: () => 'build',
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
