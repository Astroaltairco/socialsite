/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@social-staking/landing'],
  experimental: {
    optimizeCss: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  distDir: '.next',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
