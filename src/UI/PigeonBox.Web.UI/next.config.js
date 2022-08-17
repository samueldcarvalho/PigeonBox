/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BASEURL_API: "https://pigeon-box-api.herokuapp.com",
  },
};

module.exports = nextConfig;
