import { GalerijaClient, type GalleryItem } from '@/components/sections/galerija-client'
import { sanityFetch } from '@/lib/sanity/fetch'
import { GALLERY_QUERY } from '@/lib/sanity/queries'
import type { GALLERY_QUERY_RESULT } from '@/sanity.types'

export async function Galerija() {
  const data = await sanityFetch<GALLERY_QUERY_RESULT>({
    query: GALLERY_QUERY,
    tags: ['gallery'],
  })

  const items: GalleryItem[] = (data?.items ?? [])
    .filter(
      (
        it,
      ): it is {
        src: string
        alt: string
        span: GalleryItem['span']
        order: number | null
      } => Boolean(it.src && it.alt && it.span),
    )
    .map((it) => ({
      src: it.src,
      alt: it.alt,
      span: it.span,
    }))

  if (items.length === 0) return null

  return (
    <section
      id="galerija"
      className="bg-[var(--color-primary)] px-[1.6rem] py-[6.4rem] sm:px-[2.4rem] md:px-[3.2rem] md:py-[9.6rem]"
    >
      <GalerijaClient items={items} />
    </section>
  )
}
