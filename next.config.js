/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    rules: {
      quotes: ["error", "single"],
    },
  },
};

module.exports = nextConfig
