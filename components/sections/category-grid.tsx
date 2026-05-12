import Link from 'next/link'
import type { Image as SanityImageType } from 'sanity'

import { Container, Heading, SanityImage, Subheading } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity/fetch'
import { CATEGORIES_WITH_PREVIEW_QUERY } from '@/lib/sanity/queries'
import type { CATEGORIES_WITH_PREVIEW_QUERY_RESULT } from '@/sanity.types'

export async function CategoryGrid() {
  const categories = await sanityFetch<CATEGORIES_WITH_PREVIEW_QUERY_RESULT>({
    query: CATEGORIES_WITH_PREVIEW_QUERY,
    tags: ['category', 'sweet'],
  })

  return (
    <Container as="section" id="kolaci" className="py-[6.4rem] text-center">
      <Subheading>Slatkiši</Subheading>
      <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
        Izaberite slatkiš koji odgovara Vašem ukusu
      </Heading>

      <div className="mt-[4.8rem] grid grid-cols-1 gap-[3.2rem] text-left sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/${cat.slug}`}
            className="group block overflow-hidden rounded-[var(--radius-default)] bg-white shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-soft)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-primary-tint)]">
              {cat.previewImage ? (
                <SanityImage
                  source={cat.previewImage as SanityImageType}
                  alt={cat.name ?? 'Kategorija'}
                  width={600}
                  height={450}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}
            </div>
            <div className="p-[2.4rem]">
              <p className="mb-[0.8rem] text-[1.2rem] font-medium tracking-wide text-[var(--color-accent-text)] uppercase">
                {cat.subheading ?? cat.name}
              </p>
              <h3 className="text-[2.4rem] font-semibold text-[var(--color-text-dark)]">
                {cat.name}
              </h3>
              {cat.secondaryHeading ? (
                <p className="mt-[0.8rem] text-[1.6rem] text-[var(--color-text-muted)]">
                  {cat.secondaryHeading}
                </p>
              ) : null}
              <span className="mt-[1.6rem] inline-block text-[1.4rem] font-semibold text-[var(--color-accent-text)] underline-offset-4 group-hover:underline">
                Detaljnije →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}
