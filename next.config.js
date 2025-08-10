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
}

module.exports = nextConfig