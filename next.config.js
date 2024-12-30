/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    rules: {
      quotes: ["error", "double"],
    },
  },
  async rewrites() {
    return [
      {
        source: '/funding.json',
        destination: '/api/.well-known/funding-manifest-urls',
      },
      {
        source: '/.well-known/funding.json',
        destination: '/api/funding',
      },
      {
        source: '/.well-known/funding-manifest-urls',
        destination: '/api/.well-known/funding-manifest-urls',
      }
    ];
  },
};

module.exports = nextConfig
