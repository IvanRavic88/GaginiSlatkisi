import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Image as SanityImageType } from 'sanity'

import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-jsonld'
import { ProductJsonLd } from '@/components/seo/product-jsonld'
import { Button, Container, Heading, SanityImage, Subheading } from '@/components/ui'
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

      {category.seoCopy ? (
        <p className="mx-auto mt-[2.4rem] max-w-[64rem] whitespace-pre-line text-[1.6rem] leading-[1.7] text-[var(--color-text-default)]">
          {category.seoCopy}
        </p>
      ) : null}

      {sweets.length === 0 ? (
        <div className="mx-auto mt-[6.4rem] max-w-[56rem] rounded-[16px] border border-[var(--color-primary-shade)]/20 bg-white px-[3.2rem] py-[6.4rem] shadow-[0_1.6rem_3.2rem_rgba(0,0,0,0.05)]">
          <p className="mb-[2.4rem] font-[family-name:var(--font-caveat)] text-[4.2rem] font-bold leading-none text-[var(--color-primary-shade)]">
            Uskoro stiže…
          </p>
          <p className="mb-[3.2rem] text-[1.6rem] leading-[1.6] text-[var(--color-text-default)]">
            Još uvek pripremamo slatkiše u ovoj kategoriji. U međuvremenu nas slobodno
            kontaktirajte za posebne želje i porudžbine.
          </p>
          <Button href="/#cta" variant="full">
            Pošaljite upit
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-[6.4rem] grid grid-cols-1 gap-[6.4rem] text-left sm:grid-cols-2 lg:grid-cols-3">
            {sweets.map((s) => (
              <article
                key={s._id}
                className="group h-full overflow-hidden rounded-[16px] border border-[var(--color-primary-shade)]/15 bg-white shadow-[0_1.6rem_3.2rem_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-[0.8rem] hover:border-[var(--color-primary-shade)]/40 hover:shadow-[0_2.4rem_5.6rem_rgba(246,80,160,0.18)]"
              >
                <div className="relative overflow-hidden">
                  <SanityImage
                    source={s.image as SanityImageType}
                    alt={s.name ?? ''}
                    width={600}
                    height={450}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-[3.2rem] pb-[3.2rem] pt-[2.8rem]">
                  <h2 className="mb-[1.2rem] text-[2.4rem] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--color-text-dark)]">
                    {s.name}
                  </h2>
                  <p className="mb-[2.8rem] text-[1.5rem] leading-[1.6] text-[var(--color-text-default)]">
                    {s.description}
                  </p>
                  <Link
                    href="/#cta"
                    className="btn-shine mt-auto inline-flex w-fit items-center gap-[0.6rem] rounded-full border-2 border-[var(--color-primary-shade)]/40 px-[2rem] py-[1rem] text-[1.3rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-text)] transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:shadow-[0_4px_14px_rgba(246,80,160,0.35)]"
                  >
                    <span>Pošalji upit</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-300 group-hover:translate-x-[0.4rem]"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-[9.6rem] text-center">
            <p className="mb-[2.4rem] text-[1.6rem] text-[var(--color-text-muted)]">
              Ne vidite što tražite? Posebne želje i porudžbine šaljemo na upit.
            </p>
            <Button href="/#cta" variant="full">
              Pošaljite upit
            </Button>
          </div>
        </>
      )}
    </Container>
    </>
  )
}
