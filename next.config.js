/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Cloudflare Pages compatibility
  distDir: 'out',
  trailingSlash: false, // Changed for better Cloudflare Pages compatibility
  // Remove assetPrefix to use relative paths
  // This ensures CSS and JS files load correctly on Cloudflare Pages
  assetPrefix: '',
  basePath: '',
  // Disable x-powered-by header
  poweredByHeader: false,
  // Optimize for production
  productionBrowserSourceMaps: false,
  compress: true,
}

module.exports = nextConfig