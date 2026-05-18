import type { Image as SanityImageType } from 'sanity'

import { urlForImage } from '@/lib/sanity/image'

interface Sweet {
  name: string
  description: string
  image: SanityImageType
  categoryName: string
}

export function ProductJsonLd({ sweets }: { sweets: Sweet[] }) {
  const data = sweets.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: s.name,
    description: s.description,
    image: urlForImage(s.image).width(800).height(800).url(),
    category: s.categoryName,
    brand: { '@type': 'Brand', name: 'GaginiSlatkiši' },
  }))

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
