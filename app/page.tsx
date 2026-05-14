import { CategoryGrid } from '@/components/sections/category-grid'
import { ContactForm } from '@/components/sections/contact-form'
import { FeaturedSweets } from '@/components/sections/featured-sweets'
import { Hero } from '@/components/sections/hero'
import { Pricing } from '@/components/sections/pricing'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

export const revalidate = 60

export default async function HomePage() {
  const settings = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })

  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedSweets />
      <Pricing />
      <ContactForm phone={settings?.phone} email={settings?.contactEmail} />
    </>
  )
}
