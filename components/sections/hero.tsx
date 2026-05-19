import Image from 'next/image'

import { Button, Heading } from '@/components/ui'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/img/Gallery-65-hero.webp"
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={75}
        className="-z-10 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right_bottom,rgba(247,141,167,0.25),rgba(249,175,193,0.25))]"
      />

      <div className="px-[1.6rem] py-[3.6rem] sm:px-[3.2rem] sm:py-[4.8rem] md:px-[9.6rem]">
        <div className="mx-auto grid max-w-[130rem] items-center gap-[4.8rem] lg:grid-cols-2 lg:gap-[12.8rem]">
          <div>
            <Heading as="h1" variant="primary" className="mb-[2.4rem] sm:mb-[3.2rem]">
              <span
                data-testid="hero-accent"
                className="mr-[0.4rem] inline-block origin-bottom-left -rotate-[3deg] font-[family-name:var(--font-caveat)] font-bold text-[var(--color-accent)]"
              >
                Sočne
              </span>{' '}
              poslastice koje bude sva čula
            </Heading>
            <p className="mb-[3.2rem] text-[1.7rem] leading-[1.6] text-[var(--color-text-default)] sm:mb-[4.8rem] sm:text-[2rem]">
              Domaći kolači i torte iz Lazarevca, napravljeni od pažljivo odabranih sastojaka po
              proverenim receptima. Idealni za rođendane, svadbe i sve posebne prilike.
            </p>
            <Button href="/#cta" variant="full">
              Poručite odmah
            </Button>
          </div>

          <div className="relative">
            <Image
              src="/img/Desktop-3.webp"
              alt="Nasmejana devojka aranžira kolače — domaće torte Lazarevac"
              width={720}
              height={720}
              loading="lazy"
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 80vw, 100vw"
              quality={75}
              className="h-auto w-full shadow-[0.2rem_0.2rem_1.3rem_0_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
