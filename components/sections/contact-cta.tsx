import { Button, Container, Heading, Subheading } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export async function ContactCta() {
  const settings = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })

  const email = settings?.contactEmail ?? 'gaginislatkisi@gmail.com'
  const phone = settings?.phone

  return (
    <Container as="section" className="py-[6.4rem] text-center">
      <Subheading>Kontakt</Subheading>
      <Heading as="h2" variant="secondary" className="mx-auto max-w-[64rem]">
        Spremni za narudžbinu?
      </Heading>
      <p className="mx-auto mt-[1.6rem] max-w-[60rem] text-[1.8rem] text-[var(--color-text-muted)]">
        Pišite nam ili nas pozovite — odgovaramo u toku istog dana.
      </p>
      <div className="mt-[3.2rem] flex flex-wrap items-center justify-center gap-[1.6rem]">
        <Button href={`mailto:${email}`} variant="full">
          Pošaljite email
        </Button>
        {phone ? (
          <Button href={`tel:${phone.replace(/\s+/g, '')}`} variant="outline">
            Pozovite {phone}
          </Button>
        ) : null}
      </div>
    </Container>
  )
}
