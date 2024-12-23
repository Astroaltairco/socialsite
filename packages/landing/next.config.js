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
  distDir: '.next',
  output: 'standalone',
  basePath: '',
}

module.exports = nextConfig
