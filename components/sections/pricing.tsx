import Image from 'next/image'

import { Container, Heading, Subheading } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import {
  ChatHeartIcon,
  CheckIcon,
  ShieldCheckIcon,
  SparkleIcon,
  WheatIcon,
} from '@/components/ui/icons'
import { SprinkleCluster } from '@/components/ui/sprinkle'

const FEATURES = [
  {
    Icon: SparkleIcon,
    title: 'Prepustite nama',
    text: 'Da budemo najslađi deo Vaše proslave sa slatkišima kojima ćete se uvek vraćati.',
  },
  {
    Icon: WheatIcon,
    title: 'Vrhunskog kvaliteta',
    text: 'Naši poslastičari koriste samo najbolje sastojke za Gagine Slatkiše.',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'Bez brige',
    text: 'Nakon što izaberete naš proizvod, možete da se opustite, jer mi uvek ispoštujemo naše rokove.',
  },
  {
    Icon: ChatHeartIcon,
    title: 'Šta izabrati?',
    text: 'Ukoliko imate nedoumicu ili posebnu želju, mi ćemo Vam rado pomoći da zajedno kreiramo savršen slatkiš.',
  },
] as const

export function Pricing() {
  return (
    <section id="pricing" className="bg-[var(--color-vanilla)] py-[6.4rem] md:py-[9.6rem]">
      <Container>
        <div className="relative mb-[5.6rem] text-center md:mb-[9.6rem]">
          <SprinkleCluster side="left" />
          <SprinkleCluster side="right" />
          <Subheading>Cene</Subheading>
          <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
            Primeri cena naših najprodavanijih slatkiša
          </Heading>
        </div>

        <div className="mb-[2.4rem] grid grid-cols-1 gap-[4.8rem] md:grid-cols-2 md:gap-[6.4rem]">
          {/* Starter */}
          <div className="group w-full overflow-hidden rounded-[11px] border-2 border-[var(--color-primary)] bg-white transition-all duration-500 hover:-translate-y-[0.8rem] hover:border-[var(--color-primary-shade)] hover:shadow-[0_2.4rem_4.8rem_rgba(246,80,160,0.15)]">
            <Image
              src="/img/Groups-img/Gallery-11.webp"
              alt="Spakovani sitni kolači, raznovrsnih ukusa — domaći slatkiši Lazarevac"
              width={600}
              height={450}
              sizes="(min-width: 768px) 35vw, 100vw"
              className="block w-full pb-[3.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="px-[2.4rem] pb-[3.2rem] sm:px-[3.6rem] md:px-[4.6rem] md:pb-[4.6rem]">
              <header className="mb-[3.6rem] text-center md:mb-[4.8rem]">
                <p className="mb-[2.4rem] text-[1.8rem] font-bold tracking-wide text-[var(--color-primary-shade)] uppercase md:mb-[3.2rem] md:text-[2rem]">
                  Sitni kolači
                </p>
                <p className="mb-[1.6rem] text-[4.8rem] leading-none font-bold text-[var(--color-text-dark)] sm:text-[5.6rem] md:text-[6.2rem]">
                  1800
                  <span className="ml-[0.8rem] text-[2.4rem] font-medium sm:text-[2.7rem] md:text-[3rem]">
                    RSD
                  </span>
                </p>
                <p className="text-[1.6rem] leading-[1.6] text-[var(--color-text-muted)]">
                  po kilogramu.
                </p>
              </header>
              <ul className="flex flex-col gap-[1.6rem]">
                {[
                  'Pažljivo odabrani sastojci',
                  'Različitih ukusa',
                  'Mogućnost izbora vrste',
                  'Za sve prilike',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-[1.2rem] text-[1.6rem] sm:gap-[1.6rem] sm:text-[1.8rem]"
                  >
                    <CheckIcon className="h-[2.4rem] w-[2.4rem] flex-none text-[var(--color-primary-shade)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Complete */}
          <div className="group relative w-full overflow-hidden rounded-[11px] bg-[var(--color-primary)] shadow-[0_1.6rem_3.2rem_rgba(246,80,160,0.1)] transition-all duration-500 hover:-translate-y-[0.8rem] hover:shadow-[0_2.4rem_5.6rem_rgba(246,80,160,0.25)]">
            <span
              aria-hidden="true"
              className="absolute top-[1.6rem] right-[1.6rem] z-10 rounded-full bg-[var(--color-accent)] px-[1.4rem] py-[0.6rem] text-[1.2rem] font-bold tracking-[0.1em] text-white uppercase shadow-[0_4px_14px_rgba(246,80,160,0.4)]"
            >
              Preporučeno
            </span>
            <Image
              src="/img/Groups-img/Gallery-103.webp"
              alt="Lux kolači u elegantnoj kutiji — porudžbina po komadu, Lazarevac"
              width={600}
              height={450}
              sizes="(min-width: 768px) 35vw, 100vw"
              className="block w-full pb-[3.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="px-[2.4rem] pb-[3.2rem] sm:px-[3.6rem] md:px-[4.6rem] md:pb-[4.6rem]">
              <header className="mb-[3.6rem] text-center md:mb-[4.8rem]">
                <p className="mb-[2.4rem] text-[1.8rem] font-bold tracking-wide text-[var(--color-primary-shade)] uppercase md:mb-[3.2rem] md:text-[2rem]">
                  Lux kolači
                </p>
                <p className="mb-[1.6rem] text-[4.8rem] leading-none font-bold text-[var(--color-text-dark)] sm:text-[5.6rem] md:text-[6.2rem]">
                  2800
                  <span className="ml-[0.8rem] text-[2.4rem] font-medium sm:text-[2.7rem] md:text-[3rem]">
                    RSD
                  </span>
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
                  <li
                    key={item}
                    className="flex items-center gap-[1.2rem] text-[1.6rem] sm:gap-[1.6rem] sm:text-[1.8rem]"
                  >
                    <CheckIcon className="h-[3rem] w-[3rem] flex-none text-[var(--color-primary-shade)]" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="mx-auto mb-[6.4rem] max-w-[72rem] text-center text-[1.3rem] leading-[1.6] text-[var(--color-text-muted)] italic md:mb-[9.6rem]">
          <span
            aria-hidden="true"
            className="mr-[0.4rem] font-bold text-[var(--color-accent)] not-italic"
          >
            *
          </span>
          Navedene cene su informativnog karaktera i mogu se promeniti na osnovu specifičnosti
          zahteva. Konačna cena biće utvrđena nakon dogovora.
        </aside>

        <div className="grid grid-cols-1 gap-[4.8rem] sm:grid-cols-2 sm:gap-[6.4rem] lg:grid-cols-4">
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
                <p className="text-[1.8rem] leading-[1.8] text-[var(--color-text-default)]">
                  {text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  )
}
