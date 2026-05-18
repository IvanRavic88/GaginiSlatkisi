import Image from 'next/image'
import Link from 'next/link'

import { Container, Heading, Subheading } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import { FlameIcon, RestaurantIcon, StarIcon } from '@/components/ui/icons'
import { HeartDecor, SprinkleDot, SprinkleStick } from '@/components/ui/sprinkle'
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
    <section id="kolaci" className="bg-[var(--color-cream)] py-[9.6rem]">
      <Container>
        <div className="relative mb-[6.4rem] text-center">
          <SprinkleDot className="absolute left-[20%] top-[-1rem] h-[1rem] w-[1rem] animate-float-gentle" />
          <SprinkleStick
            className="absolute right-[25%] top-[0.5rem] h-[0.6rem] w-[2rem] animate-float-gentle"
            color="var(--color-primary-shade)"
          />
          <HeartDecor className="absolute right-[18%] top-[2rem] h-[1.8rem] w-[1.8rem] animate-float-gentle" />
          <Subheading>Slatkiši</Subheading>
          <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
            Izaberite slatkiš koji odgovara Vašem ukusu
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-[6.4rem] sm:grid-cols-2 lg:grid-cols-3">
          {valid.map((c, idx) => (
            <FadeIn key={c._id} delay={(idx % 3) * 100}>
              <article className="group h-full overflow-hidden rounded-[11px] bg-white shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-[1.2rem] hover:shadow-[0_3.2rem_6.4rem_rgba(246,80,160,0.2)]">
                <Link
                  href={`/${c.slug}`}
                  className="flex h-full flex-col gap-[2rem] text-[var(--color-text-default)]"
                  aria-label={`Otvori stranicu — ${c.name}`}
                >
                  <div className="overflow-hidden">
                    <Image
                      src={c.homepageImageSrc}
                      alt={c.homepageImageAlt}
                      width={600}
                      height={450}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="block w-full transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="px-[4.8rem] pb-[4.8rem] pt-[1.2rem]">
                    <div className="mb-[1.2rem] flex gap-[0.4rem]">
                      <span className="inline-block rounded-full bg-[var(--color-accent)] px-[0.8rem] py-[0.4rem] text-[1.2rem] font-medium uppercase text-white">
                        {c.tag}
                      </span>
                    </div>
                    <p className="mb-[3.2rem] text-[2.4rem] font-semibold text-[var(--color-text-dark)]">
                      {c.name}
                    </p>
                    <ul className="flex flex-col gap-[2rem]">
                      <li className="flex items-center gap-[1.6rem] text-[1.8rem]">
                        <FlameIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                        <span>{c.attributes[0]}</span>
                      </li>
                      <li className="flex items-center gap-[1.6rem] text-[1.8rem]">
                        <RestaurantIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                        <span>{c.attributes[1]}</span>
                      </li>
                      <li className="flex items-center gap-[1.6rem] text-[1.8rem]">
                        <StarIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                        <span>{c.attributes[2]}</span>
                      </li>
                      <li className="text-[1.8rem]">
                        <span className="inline-flex items-center gap-[0.4rem] border-b border-[var(--color-primary-shade)] pb-[2px] text-[var(--color-primary-shade)] transition-all group-hover:border-transparent">
                          Detaljnije
                          <span
                            aria-hidden="true"
                            className="inline-block transition-transform duration-300 group-hover:translate-x-[0.4rem]"
                          >
                            →
                          </span>
                        </span>
                      </li>
                    </ul>
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
