import { CtaSection } from '@/components/sections/cta-section'
import { Galerija } from '@/components/sections/galerija'
import { Hero } from '@/components/sections/hero'
import { Pricing } from '@/components/sections/pricing'
import { SlatkisiGrid } from '@/components/sections/slatkisi-grid'

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <Hero />
      <SlatkisiGrid />
      <Galerija />
      <Pricing />
      <CtaSection />
    </>
  )
}
