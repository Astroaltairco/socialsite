/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false
  },
  typescript: {
    ignoreBuildErrors: true
  },
  output: 'standalone',
  distDir: '.next'
}

module.exports = nextConfig
