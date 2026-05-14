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
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right_bottom,rgba(247,141,167,0.25),rgba(249,175,193,0.25))]"
      />

      <div className="px-[3.2rem] py-[4.8rem] md:px-[9.6rem]">
        <div className="mx-auto grid max-w-[130rem] items-center gap-[6.4rem] px-[3.2rem] lg:grid-cols-2 lg:gap-[12.8rem]">
          <div>
            <Heading as="h1" variant="primary" className="mb-[3.2rem]">
              Sočne poslastice koje bude sva čula
            </Heading>
            <p className="mb-[4.8rem] text-[2rem] leading-[1.6] text-[var(--color-text-default)]">
              Svi naši kolači i torte su napravljeni od pažljivo odabranih i kvalitetnih sastojaka,
              po proverenim receptima.
            </p>
            <Button href="/#cta" variant="full">
              Poručite odmah
            </Button>
          </div>

          <div className="relative">
            <Image
              src="/img/Desktop-3.png"
              alt="Slika prelepo aranžiranih kolača, koje drži nasmejana devojka"
              width={720}
              height={720}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full shadow-[0.2rem_0.2rem_1.3rem_0_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
