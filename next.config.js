/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // config.resolve.fallback = {
    //   fs: false
    // }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

module.exports = nextConfig
