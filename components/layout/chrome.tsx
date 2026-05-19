'use client'

import { usePathname } from 'next/navigation'

import { LocalBusinessJsonLd } from '@/components/seo/local-business-jsonld'

import { FloatingSocials } from './floating-socials'
import { Footer } from './footer'
import { Header } from './header'
import { MobileCta } from './mobile-cta'
import { SkipLink } from './skip-link'

interface ChromeProps {
  phone: string
  children: React.ReactNode
}

export function Chrome({ phone, children }: ChromeProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio') ?? false

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <SkipLink />
      <Header />
      <FloatingSocials />
      <main id="main-content" className="pb-[8rem] md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileCta phone={phone} />
      <LocalBusinessJsonLd />
    </>
  )
}
