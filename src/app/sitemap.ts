import { MetadataRoute } from 'next'
import { siteOrigin } from '~/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteOrigin

  // Static pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fyt`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Add dynamic routes here if needed
  // const dynamicRoutes = await getDynamicRoutes()

  return [
    ...staticRoutes,
    // ...dynamicRoutes,
  ]
}
