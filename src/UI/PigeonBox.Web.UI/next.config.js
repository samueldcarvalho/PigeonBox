/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASEURL_API: "https://localhost:44387",
  },
};

module.exports = nextConfig;
