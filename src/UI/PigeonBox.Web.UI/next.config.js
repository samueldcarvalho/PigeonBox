/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASEURL_API:"http://localhost:33406"
  }
}

module.exports = nextConfig
