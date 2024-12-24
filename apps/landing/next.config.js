/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    // Enable Turborepo features
    turbotrace: {
      logLevel: 'error',
      logAll: false,
      memoryLimit: 4 * 1024 // 4GB
    }
  }
}

module.exports = nextConfig
