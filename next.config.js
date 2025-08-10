/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // Cloudflare Pages compatibility
  distDir: 'out',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  generateBuildId: async () => {
    // Generate build ID for cache invalidation
    return Date.now().toString()
  },
  // Ensure proper asset prefix for Cloudflare Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Disable x-powered-by header
  poweredByHeader: false,
  // Optimize for production
  productionBrowserSourceMaps: false,
  compress: true,
}

module.exports = nextConfig