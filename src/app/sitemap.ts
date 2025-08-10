import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devtoolbox.com'
  
  // Static pages and tools
  const routes = [
    '',
    '/about',
    '/privacy',
    '/terms',
    '/tools/json-formatter',
    '/tools/base64',
    '/tools/hash-generator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/tools/') ? 0.8 : 0.5,
  }))

  return routes
}