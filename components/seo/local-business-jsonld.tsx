import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export async function LocalBusinessJsonLd() {
  const s = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })
  if (!s) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'GaginiSlatkiši',
    url: 'https://www.gaginislatkisi.com',
    email: s.contactEmail,
    telephone: s.phone,
    address: s.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: s.address.street,
          addressLocality: s.address.city,
          postalCode: s.address.postalCode,
          addressCountry: s.address.country ?? 'RS',
        }
      : undefined,
    sameAs: [s.instagramUrl, s.facebookUrl].filter(Boolean),
    openingHoursSpecification: s.openingHours?.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.day,
      opens: h.opens,
      closes: h.closes,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
