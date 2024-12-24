/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: false
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
