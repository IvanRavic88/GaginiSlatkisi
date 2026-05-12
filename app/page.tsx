import { CategoryGrid } from '@/components/sections/category-grid'
import { ContactCta } from '@/components/sections/contact-cta'
import { FeaturedSweets } from '@/components/sections/featured-sweets'
import { Hero } from '@/components/sections/hero'
import { Pricing } from '@/components/sections/pricing'

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedSweets />
      <Pricing />
      <ContactCta />
    </>
  )
}
