import Link from 'next/link'
import type { Image as SanityImageType } from 'sanity'

import { Container, Heading, SanityImage, Subheading } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity/fetch'
import { FEATURED_SWEETS_QUERY } from '@/lib/sanity/queries'
import type { FEATURED_SWEETS_QUERY_RESULT } from '@/sanity.types'

export async function FeaturedSweets() {
  const sweets = await sanityFetch<FEATURED_SWEETS_QUERY_RESULT>({
    query: FEATURED_SWEETS_QUERY,
    tags: ['sweet'],
  })

  if (sweets.length === 0) return null

  return (
    <Container as="section" id="galerija" className="py-[6.4rem] text-center">
      <Subheading>Galerija</Subheading>
      <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
        Najpopularniji slatkiši
      </Heading>

      <div className="mt-[4.8rem] grid grid-cols-2 gap-[1.6rem] md:grid-cols-3 lg:grid-cols-4">
        {sweets.map((s) => (
          <Link
            key={s._id}
            href={s.categorySlug ? `/${s.categorySlug}` : '/'}
            className="group block overflow-hidden rounded-[var(--radius-default)]"
            aria-label={`${s.name} — pogledaj kategoriju`}
          >
            <SanityImage
              source={s.image as SanityImageType}
              alt={s.name ?? ''}
              width={400}
              height={400}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="aspect-square w-full transition-transform duration-500 group-hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </Container>
  )
}
