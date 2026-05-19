import Image from 'next/image'
import Link from 'next/link'

import { Container, Heading, Subheading } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import { CakeIcon, FlameIcon, RibbonIcon } from '@/components/ui/icons'
import { SprinkleCluster } from '@/components/ui/sprinkle'
import { sanityFetch } from '@/lib/sanity/fetch'
import { HOMEPAGE_CATEGORIES_QUERY } from '@/lib/sanity/queries'
import type { HOMEPAGE_CATEGORIES_QUERY_RESULT } from '@/sanity.types'

export async function SlatkisiGrid() {
  const categories = await sanityFetch<HOMEPAGE_CATEGORIES_QUERY_RESULT>({
    query: HOMEPAGE_CATEGORIES_QUERY,
    tags: ['category'],
  })

  const valid = categories.filter(
    (
      c,
    ): c is typeof c & {
      slug: string
      name: string
      tag: string
      homepageImageSrc: string
      homepageImageAlt: string
      attributes: [string, string, string]
    } =>
      Boolean(
        c.slug &&
        c.name &&
        c.tag &&
        c.homepageImageSrc &&
        c.homepageImageAlt &&
        c.attributes &&
        c.attributes.length === 3,
      ),
  )

  if (valid.length === 0) return null

  return (
    <section id="kolaci" className="bg-[var(--color-cream)] py-[6.4rem] md:py-[9.6rem]">
      <Container>
        <div className="relative mb-[4.8rem] text-center md:mb-[6.4rem]">
          <SprinkleCluster side="left" />
          <SprinkleCluster side="right" />
          <Subheading>Slatkiši</Subheading>
          <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
            Izaberite slatkiš koji odgovara Vašem ukusu
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-[4rem] sm:grid-cols-2 sm:gap-[4.8rem] lg:grid-cols-3 lg:gap-[6.4rem]">
          {valid.map((c, idx) => (
            <FadeIn key={c._id} delay={(idx % 3) * 100}>
              <article className="group h-full overflow-hidden rounded-[16px] border border-[var(--color-primary-shade)]/15 bg-white shadow-[0_1.6rem_3.2rem_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-[0.8rem] hover:border-[var(--color-primary-shade)]/40 hover:shadow-[0_2.4rem_5.6rem_rgba(246,80,160,0.18)]">
                <Link
                  href={`/${c.slug}`}
                  className="flex h-full flex-col text-[var(--color-text-default)]"
                  aria-label={`Otvori stranicu — ${c.name}`}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={c.homepageImageSrc}
                      alt={c.homepageImageAlt}
                      width={600}
                      height={450}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[10rem] bg-gradient-to-t from-black/30 via-black/10 to-transparent"
                    />
                    <span className="absolute bottom-[1.6rem] left-[1.6rem] inline-flex items-center rounded-full bg-white/90 px-[1.2rem] py-[0.5rem] text-[1.1rem] font-bold tracking-[0.1em] text-[var(--color-accent-text)] uppercase shadow-[0_4px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm">
                      {c.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-[2.4rem] pt-[2.4rem] pb-[2.8rem] sm:px-[3.2rem] sm:pt-[2.8rem] sm:pb-[3.2rem]">
                    <h3 className="mb-[2rem] text-[2.4rem] leading-[1.2] font-semibold tracking-[-0.01em] text-[var(--color-text-dark)]">
                      {c.name}
                    </h3>
                    <ul className="mb-[2.8rem] flex flex-col gap-[1.4rem]">
                      <li className="flex items-center gap-[1.2rem] text-[1.5rem] text-[var(--color-text-default)]">
                        <FlameIcon className="h-[1.8rem] w-[1.8rem] flex-none text-[var(--color-primary-shade)]" />
                        <span>{c.attributes[0]}</span>
                      </li>
                      <li className="flex items-center gap-[1.2rem] text-[1.5rem] text-[var(--color-text-default)]">
                        <CakeIcon className="h-[1.8rem] w-[1.8rem] flex-none text-[var(--color-primary-shade)]" />
                        <span>{c.attributes[1]}</span>
                      </li>
                      <li className="flex items-center gap-[1.2rem] text-[1.5rem] text-[var(--color-text-default)]">
                        <RibbonIcon className="h-[1.8rem] w-[1.8rem] flex-none text-[var(--color-primary-shade)]" />
                        <span>{c.attributes[2]}</span>
                      </li>
                    </ul>
                    <span className="btn-shine mt-auto inline-flex w-fit items-center gap-[0.6rem] rounded-full border-2 border-[var(--color-primary-shade)]/40 px-[2rem] py-[1rem] text-[1.3rem] font-semibold tracking-[0.1em] text-[var(--color-accent-text)] uppercase transition-all duration-300 group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:shadow-[0_4px_14px_rgba(246,80,160,0.35)]">
                      <span>Pogledaj</span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover:translate-x-[0.4rem]"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
