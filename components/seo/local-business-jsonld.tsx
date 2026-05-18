import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export async function LocalBusinessJsonLd() {
  const s = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })
  if (!s) return null

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'GaginiSlatkiši',
    url: 'https://www.gaginislatkisi.com',
    image: 'https://www.gaginislatkisi.com/img/Gallery-65-hero.webp',
    description:
      'Domaći kolači i torte po porudžbini iz Lazarevca. Torte za rođendane, svadbe i sve posebne prilike.',
    priceRange: '$$',
    email: s.contactEmail,
    telephone: s.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: s.address?.city ?? 'Lazarevac',
      addressCountry: s.address?.country ?? 'RS',
    },
    areaServed: [
      { '@type': 'City', name: 'Lazarevac' },
      { '@type': 'City', name: 'Beograd' },
    ],
    sameAs: [s.instagramUrl, s.facebookUrl].filter(Boolean),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
