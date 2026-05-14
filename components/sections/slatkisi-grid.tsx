import Link from 'next/link'
import Image from 'next/image'

import { Container, Heading, Subheading } from '@/components/ui'
import { FlameIcon, RestaurantIcon, StarIcon } from '@/components/ui/icons'

type Slatkis = {
  slug: string
  title: string
  tag: string
  image: { src: string; alt: string }
  attributes: [string, string, string]
}

const SLATKISI: Slatkis[] = [
  {
    slug: 'torte',
    title: 'Torte',
    tag: 'Torte',
    image: {
      src: '/img/Groups-img/Gallery-92.png',
      alt: 'Slika čokoladne torte, ukrašena sa jagodama.',
    },
    attributes: [
      'Po proverenim receptima',
      'Idealne za sve Vaše prilike',
      'Mogu se naručiti pojedinačno',
    ],
  },
  {
    slug: 'mus-kolaci',
    title: 'Mus kolači',
    tag: 'Kolači',
    image: {
      src: '/img/Groups-img/Gallery-81.png',
      alt: 'Slika prelepo serviranih mus kolača.',
    },
    attributes: [
      'Mogućnost izbora ukusa',
      'Idealni za svečane prilike',
      'Mogu se naručiti pojedinačno',
    ],
  },
  {
    slug: 'cokoladne-casice',
    title: 'Čokoladne čašice',
    tag: 'Lux kolači',
    image: {
      src: '/img/Groups-img/Gallery-44.png',
      alt: 'Slika čokoladnih čašica',
    },
    attributes: [
      'Omiljeni slatkiš u čokoladnoj čaši',
      'Idealne za sve Vaše proslave',
      'Ne mogu se naručiti zasebno',
    ],
  },
  {
    slug: 'sitni-kolaci',
    title: 'Sitni kolači',
    tag: 'Kolači',
    image: {
      src: '/img/Groups-img/Gallery-11.png',
      alt: 'Slika sitnih kolača, različitih vrsta.',
    },
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se u paketu'],
  },
  {
    slug: 'mini-cheese',
    title: 'Mini cheese',
    tag: 'Kolači',
    image: {
      src: '/img/Groups-img/Gallery-26.png',
      alt: 'Slika mini cheese-a.',
    },
    attributes: ['Različitih ukusa', 'Idealni za sve prilike', 'Naručuju se na kilogram'],
  },
  {
    slug: 'lux-kolaci',
    title: 'Lux kolači',
    tag: 'Lux kolači',
    image: {
      src: '/img/Groups-img/Gallery-103.png',
      alt: 'Slika Lux kolača.',
    },
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se u paketu'],
  },
  {
    slug: 'tart-torte',
    title: 'Tart Torte',
    tag: 'Torte',
    image: {
      src: '/img/Groups-img/Gallery-82.png',
      alt: 'Slika Tart Torte od čokolade i plazme.',
    },
    attributes: [
      'Sa kremastim filom',
      'Idealni za sve Vaše prilike',
      'Naručuju se pojedinačno',
    ],
  },
  {
    slug: 'medenjaci',
    title: 'Medenjaci',
    tag: 'Medenjaci',
    image: {
      src: '/img/Groups-img/Gallery-60.png',
      alt: 'Medenjak sa likom Deda Mraza.',
    },
    attributes: ['Prelepog ukusa i izgleda', 'Idealni za sve prilike', 'Naručuju se pojedinačno'],
  },
  {
    slug: 'penaste-bombone',
    title: 'Penaste Bombone',
    tag: 'Bombone',
    image: {
      src: '/img/Groups-img/Gallery-83.png',
      alt: 'Slika bombone u obliku mede sa srcem, potopljena u kakao.',
    },
    attributes: [
      'Omiljena dečija poslastica',
      'Idealni za dečije rođendane',
      'Naručuju se u paketu',
    ],
  },
]

export function SlatkisiGrid() {
  return (
    <Container as="section" id="kolaci" className="py-[9.6rem]">
      <div className="mb-[6.4rem] text-center">
        <Subheading>Slatkiši</Subheading>
        <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
          Izaberite slatkiš koji odgovara Vašem ukusu
        </Heading>
      </div>

      <div className="grid grid-cols-1 gap-[6.4rem] sm:grid-cols-2 lg:grid-cols-3">
        {SLATKISI.map((s) => (
          <article
            key={s.slug}
            className="overflow-hidden rounded-[11px] shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.1)] transition-all duration-400 hover:-translate-y-[1.2rem] hover:shadow-[0_3.2rem_6.4rem_rgba(0,0,0,0.2)]"
          >
            <Link
              href={`/${s.slug}`}
              className="flex flex-col gap-[2rem] text-[var(--color-text-default)]"
              aria-label={`Otvori stranicu — ${s.title}`}
            >
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={600}
                height={450}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="block w-full"
              />
              <div className="px-[4.8rem] pb-[4.8rem] pt-[1.2rem]">
                <div className="mb-[1.2rem] flex gap-[0.4rem]">
                  <span className="inline-block rounded-full bg-[var(--color-accent)] px-[0.8rem] py-[0.4rem] text-[1.2rem] font-medium uppercase text-white">
                    {s.tag}
                  </span>
                </div>
                <p className="mb-[3.2rem] text-[2.4rem] font-semibold text-[var(--color-text-dark)]">
                  {s.title}
                </p>
                <ul className="flex flex-col gap-[2rem]">
                  <li className="flex items-center gap-[1.6rem] text-[1.8rem]">
                    <FlameIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                    <span>{s.attributes[0]}</span>
                  </li>
                  <li className="flex items-center gap-[1.6rem] text-[1.8rem]">
                    <RestaurantIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                    <span>{s.attributes[1]}</span>
                  </li>
                  <li className="flex items-center gap-[1.6rem] text-[1.8rem]">
                    <StarIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                    <span>{s.attributes[2]}</span>
                  </li>
                  <li className="text-[1.8rem]">
                    <span className="inline-block border-b border-[var(--color-primary-shade)] pb-[2px] text-[var(--color-primary-shade)] transition-all hover:border-transparent">
                      Detaljnije →
                    </span>
                  </li>
                </ul>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Container>
  )
}
