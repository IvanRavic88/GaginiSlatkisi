import Image from 'next/image'

import { Container, Heading, Subheading } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import {
  CheckIcon,
  InfiniteIcon,
  LeafIcon,
  NutritionIcon,
  PauseIcon,
} from '@/components/ui/icons'
import { SprinkleDot, SprinkleStick } from '@/components/ui/sprinkle'

const FEATURES = [
  {
    Icon: InfiniteIcon,
    title: 'Prepustite nama',
    text: 'Da budemo najslađi deo Vaše proslave sa slatkišima kojima ćete se uvek vraćati.',
  },
  {
    Icon: NutritionIcon,
    title: 'Vrhunskog kvaliteta',
    text: 'Naši poslastičari koriste samo najbolje sastojke za Gagine Slatkiše.',
  },
  {
    Icon: LeafIcon,
    title: 'Bez brige',
    text: 'Nakon što izaberete naš proizvod, možete da se opustite, jer mi uvek ispoštujemo naše rokove.',
  },
  {
    Icon: PauseIcon,
    title: 'Šta izabrati?',
    text: 'Ukoliko imate nedoumicu ili posebnu želju, mi ćemo Vam rado pomoći da zajedno kreiramo savršen slatkiš.',
  },
] as const

export function Pricing() {
  return (
    <section id="pricing" className="bg-[var(--color-vanilla)] py-[9.6rem]">
      <Container>
      <div className="relative mb-[9.6rem] text-center">
        <SprinkleStick
          className="absolute left-[22%] top-[-0.5rem] h-[0.6rem] w-[2rem] animate-float-gentle"
          rotate={15}
        />
        <SprinkleDot
          className="absolute right-[20%] top-[1rem] h-[1rem] w-[1rem] animate-float-gentle"
          color="var(--color-caramel)"
        />
        <Subheading>Cene</Subheading>
        <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
          Primeri cena naših najprodavanijih slatkiša
        </Heading>
      </div>

      <div className="mb-[9.6rem] grid grid-cols-1 gap-[6.4rem] md:grid-cols-2">
        {/* Starter */}
        <div className="group w-full overflow-hidden rounded-[11px] border-2 border-[var(--color-primary)] bg-white transition-all duration-500 hover:-translate-y-[0.8rem] hover:border-[var(--color-primary-shade)] hover:shadow-[0_2.4rem_4.8rem_rgba(246,80,160,0.15)]">
          <Image
            src="/img/Groups-img/Gallery-11.webp"
            alt="Slika prelepo spakovanih sitnih kolača."
            width={600}
            height={450}
            sizes="(min-width: 768px) 35vw, 100vw"
            className="block w-full pb-[3.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="px-[4.6rem] pb-[4.6rem]">
            <header className="mb-[4.8rem] text-center">
              <p className="mb-[3.2rem] text-[2rem] font-semibold uppercase tracking-wide text-[var(--color-primary-shade)]">
                Sitni kolači
              </p>
              <p className="mb-[1.6rem] text-[6.2rem] font-semibold leading-none text-[var(--color-text-dark)]">
                1700
                <span className="ml-[0.8rem] text-[3rem] font-medium">RSD</span>
              </p>
              <p className="text-[1.6rem] leading-[1.6] text-[var(--color-text-muted)]">
                po kilogramu.
              </p>
            </header>
            <ul className="flex flex-col gap-[1.6rem]">
              {['Pažljivo odabrani sastojci', 'Različitih ukusa', 'Mogućnost izbora vrste', 'Za sve prilike'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-[1.6rem] text-[1.8rem]">
                    <CheckIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Complete */}
        <div className="group relative w-full overflow-hidden rounded-[11px] bg-[var(--color-primary)] shadow-[0_1.6rem_3.2rem_rgba(246,80,160,0.1)] transition-all duration-500 hover:-translate-y-[0.8rem] hover:shadow-[0_2.4rem_5.6rem_rgba(246,80,160,0.25)]">
          <span
            className="absolute right-[-18%] top-[6%] z-10 rotate-45 bg-[linear-gradient(135deg,#ffd34b,#ffb700)] px-[8rem] py-[0.8rem] text-[1.4rem] font-bold uppercase tracking-wide text-[var(--color-text-dark)] shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            aria-hidden="true"
          >
            ★ Best value
          </span>
          <Image
            src="/img/Groups-img/Gallery-103.webp"
            alt="Slika prelepo spakovanih lux kolača."
            width={600}
            height={450}
            sizes="(min-width: 768px) 35vw, 100vw"
            className="block w-full pb-[3.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="px-[4.6rem] pb-[4.6rem]">
            <header className="mb-[4.8rem] text-center">
              <p className="mb-[3.2rem] text-[2rem] font-semibold uppercase tracking-wide text-[var(--color-primary-shade)]">
                Lux kolači
              </p>
              <p className="mb-[1.6rem] text-[6.2rem] font-semibold leading-none text-[var(--color-text-dark)]">
                2300
                <span className="ml-[0.8rem] text-[3rem] font-medium">RSD</span>
              </p>
              <p className="text-[1.6rem] leading-[1.6] text-[var(--color-text-muted)]">
                po kilogramu.
              </p>
            </header>
            <ul className="flex flex-col gap-[1.6rem]">
              {[
                'Sastojci vrhunskog kvaliteta',
                'Različitih ukusa',
                'Mogućnost izbora vrsta',
                'Za specijalne prilike',
              ].map((item) => (
                <li key={item} className="flex items-center gap-[1.6rem] text-[1.8rem]">
                  <CheckIcon className="h-[3rem] w-[3rem] flex-none text-[var(--color-primary-shade)]" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <aside className="mx-auto mb-[9.6rem] max-w-[80rem] text-center text-[1.6rem] leading-[1.6] text-[var(--color-text-default)]">
        Navedene cene su informativnog karaktera i mogu se promeniti na osnovu specifičnosti
        zahteva. Konačna cena biće utvrđena nakon dogovora.
      </aside>

      <div className="grid grid-cols-1 gap-[6.4rem] sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ Icon, title, text }, idx) => (
          <FadeIn key={title} delay={idx * 120}>
            <div className="text-center">
            <span
              aria-hidden="true"
              className="mx-auto mb-[3.2rem] grid h-[6.4rem] w-[6.4rem] place-items-center rounded-full bg-[var(--color-primary)] p-[1.6rem] text-[var(--color-primary-shade)]"
            >
              <Icon className="h-[3.2rem] w-[3.2rem]" />
            </span>
            <h3 className="mb-[1.6rem] text-[2.4rem] font-bold text-[var(--color-text-dark)]">
              {title}
            </h3>
            <p className="text-[1.8rem] leading-[1.8] text-[var(--color-text-default)]">{text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
      </Container>
    </section>
  )
}
