import { CtaSection } from '@/components/sections/cta-section'
import { Galerija } from '@/components/sections/galerija'
import { Hero } from '@/components/sections/hero'
import { Pricing } from '@/components/sections/pricing'
import { SlatkisiGrid } from '@/components/sections/slatkisi-grid'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export const revalidate = 60

export default async function HomePage() {
  const settings = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })
  const phone = settings?.phone ?? '065/5593-678'

  return (
    <>
      <Hero />
      <SlatkisiGrid />
      <Galerija />
      <Pricing />
      <CtaSection phone={phone} />
    </>
  )
}
