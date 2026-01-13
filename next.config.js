/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/52-project',
  assetPrefix: '/52-project',
  trailingSlash: true,
}

module.exports = nextConfig
