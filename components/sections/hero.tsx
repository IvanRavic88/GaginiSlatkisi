import Image from 'next/image'

import { Button, Container, Heading } from '@/components/ui'

export function Hero() {
  return (
    <Container
      as="section"
      className="grid items-center gap-[6.4rem] py-[6.4rem] lg:grid-cols-2 lg:py-[9.6rem]"
    >
      <div className="space-y-[3.2rem]">
        <Heading as="h1" variant="primary">
          Sočne poslastice koje bude sva čula
        </Heading>
        <p className="text-[2rem] leading-[1.6] text-[var(--color-text-default)]">
          Svi naši kolači i torte su napravljeni od pažljivo odabranih i kvalitetnih sastojaka, po
          proverenim receptima.
        </p>
        <div className="flex flex-wrap gap-[1.6rem]">
          <Button href="/#footer" variant="full">
            Poručite odmah
          </Button>
          <Button href="/#kolaci" variant="outline">
            Pogledajte ponudu
          </Button>
        </div>
      </div>

      <div className="relative">
        <Image
          src="/img/Desktop-3.png"
          alt="Slika prelepo aranžiranih kolača, koje drži nasmejana devojka"
          width={720}
          height={720}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full"
        />
      </div>
    </Container>
  )
}
