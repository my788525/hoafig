/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true
  // Security headers are delivered via `public/_headers` on Cloudflare Pages.
};

module.exports = nextConfig;
