import { Button, Container, Heading, Subheading } from '@/components/ui'

const TIERS = [
  {
    name: 'Pojedinačno',
    description: 'Idealno za male prilike i lične poklone.',
    features: [
      'Naručujete po komadu',
      'Standardno pakovanje',
      'Spreman za preuzimanje u Lazarevcu',
    ],
  },
  {
    name: 'Paket',
    description: 'Za rođendane, krštenja i veće porodične proslave.',
    features: [
      '20–50 komada raznovrsnih kolača',
      'Lično dogovaranje sastava',
      'Dekorativno pakovanje',
    ],
  },
  {
    name: 'Veliki događaj',
    description: 'Za svadbe, slave i firmske događaje.',
    features: ['50+ komada + torta(e)', 'Konsultacija na licu mesta', 'Dostava po dogovoru'],
  },
]

export function Pricing() {
  return (
    <Container as="section" id="pricing" className="py-[6.4rem] text-center">
      <Subheading>Cene</Subheading>
      <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
        Cene zavise od izbora i količine
      </Heading>
      <p className="mx-auto mt-[1.6rem] max-w-[64rem] text-[1.8rem] text-[var(--color-text-muted)]">
        Pošaljite poruku sa detaljima i odgovaramo u toku istog dana sa konkretnom ponudom.
      </p>

      <div className="mt-[4.8rem] grid grid-cols-1 gap-[2.4rem] text-left md:grid-cols-3">
        {TIERS.map((tier) => (
          <article
            key={tier.name}
            className="rounded-[var(--radius-default)] bg-white p-[3.2rem] shadow-[var(--shadow-card)]"
          >
            <h3 className="text-[2.4rem] font-semibold text-[var(--color-text-dark)]">
              {tier.name}
            </h3>
            <p className="mt-[0.8rem] text-[1.6rem] text-[var(--color-text-muted)]">
              {tier.description}
            </p>
            <ul className="mt-[2.4rem] space-y-[1.2rem] text-[1.6rem]">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-[1.2rem]">
                  <span aria-hidden="true" className="text-[var(--color-accent-dark)]">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-[4.8rem]">
        <Button href="/#footer" variant="full">
          Pošaljite upit
        </Button>
      </div>
    </Container>
  )
}
