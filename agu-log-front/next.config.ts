import type { NextConfig } from 'next'
const { codeInspectorPlugin } = require('code-inspector-plugin')

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // Google の画像ドメインを許可
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }))
    return config
  },
}

export default nextConfig
