/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    BASEURL_API: "https://pigeon-box-api.azurewebsites.net/api/v1/",
    // BASEURL_API: "http://localhost:5000/api/v1/",
  },
};

module.exports = nextConfig;
