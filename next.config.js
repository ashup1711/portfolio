/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  ...(isGitHubPages ? {
    basePath: '/portfolio',
    assetPrefix: '/portfolio/'
  } : {})
}

module.exports = nextConfig
