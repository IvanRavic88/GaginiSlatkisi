import type { MetadataRoute } from 'next'

import { sanityFetch } from '@/lib/sanity/fetch'
import { ALL_CATEGORIES_QUERY } from '@/lib/sanity/queries'
import type { ALL_CATEGORIES_QUERY_RESULT } from '@/sanity.types'

const SITE = 'https://www.gaginislatkisi.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await sanityFetch<ALL_CATEGORIES_QUERY_RESULT>({
    query: ALL_CATEGORIES_QUERY,
    tags: ['category'],
  })

  return [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...categories
      .filter((c): c is typeof c & { slug: string } => Boolean(c.slug))
      .map((c) => ({
        url: `${SITE}/${c.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })),
  ]
}
