import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Image as SanityImageType } from 'sanity'

import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import { ProductJsonLd } from '@/components/seo/product-jsonld'
import { Container, Heading, SanityImage, Subheading } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity/fetch'
import {
  ALL_CATEGORIES_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  SWEETS_BY_CATEGORY_QUERY,
} from '@/lib/sanity/queries'
import type {
  ALL_CATEGORIES_QUERY_RESULT,
  CATEGORY_BY_SLUG_QUERY_RESULT,
  SWEETS_BY_CATEGORY_QUERY_RESULT,
} from '@/sanity.types'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await sanityFetch<ALL_CATEGORIES_QUERY_RESULT>({
    query: ALL_CATEGORIES_QUERY,
  })
  return categories
    .filter((c): c is typeof c & { slug: string } => Boolean(c.slug))
    .map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await sanityFetch<CATEGORY_BY_SLUG_QUERY_RESULT>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: ['category'],
  })
  if (!category) return {}
  const secondary = category.secondaryHeading ?? ''
  return {
    title: category.name ?? undefined,
    description:
      `${category.name} po porudžbini iz Lazarevca. ${secondary} Pišite nam preko forme ili WhatsApp-a.`.trim(),
    alternates: { canonical: `/${slug}` },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const [category, sweets] = await Promise.all([
    sanityFetch<CATEGORY_BY_SLUG_QUERY_RESULT>({
      query: CATEGORY_BY_SLUG_QUERY,
      params: { slug },
      tags: ['category'],
    }),
    sanityFetch<SWEETS_BY_CATEGORY_QUERY_RESULT>({
      query: SWEETS_BY_CATEGORY_QUERY,
      params: { slug },
      tags: ['sweet'],
    }),
  ])

  if (!category) notFound()

  return (
    <>
      <BreadcrumbJsonLd
        crumbs={[
          { name: 'Naslovna', url: 'https://www.gaginislatkisi.com/' },
          { name: category.name!, url: `https://www.gaginislatkisi.com/${slug}` },
        ]}
      />
      {sweets.length > 0 ? (
        <ProductJsonLd
          sweets={sweets
            .filter((s): s is typeof s & { name: string; description: string; image: SanityImageType } => Boolean(s.name && s.description && s.image))
            .map((s) => ({
              name: s.name,
              description: s.description,
              image: s.image,
              categoryName: category.name!,
            }))}
        />
      ) : null}
    <Container as="section" className="py-[6.4rem] text-center">
      <Subheading>{category.subheading ?? category.name}</Subheading>
      <Heading as="h1" variant="sweet" className="mx-auto max-w-[64rem]">
        {category.secondaryHeading ?? category.name}
      </Heading>

      {sweets.length === 0 ? (
        <p className="mt-[4.8rem] text-[1.8rem] text-[var(--color-text-muted)]">
          Trenutno nema slatkiša u ovoj kategoriji. Pišite nam za detalje.
        </p>
      ) : (
        <div className="mt-[4.8rem] grid grid-cols-1 gap-[3.2rem] text-left sm:grid-cols-2 lg:grid-cols-3">
          {sweets.map((s) => (
            <article
              key={s._id}
              className="overflow-hidden rounded-[var(--radius-default)] bg-white shadow-[var(--shadow-card)]"
            >
              <SanityImage
                source={s.image as SanityImageType}
                alt={s.name ?? ''}
                width={600}
                height={450}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[4/3] w-full"
              />
              <div className="p-[2.4rem]">
                <h2 className="text-[2.4rem] font-semibold text-[var(--color-text-dark)]">
                  {s.name}
                </h2>
                <p className="mt-[1.2rem] text-[1.6rem] text-[var(--color-text-muted)]">
                  {s.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </Container>
    </>
  )
}
