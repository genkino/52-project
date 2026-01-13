/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/52-project' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/52-project' : '',
}

module.exports = nextConfig
