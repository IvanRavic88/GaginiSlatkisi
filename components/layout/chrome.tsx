'use client'

import { usePathname } from 'next/navigation'

import { SkipLink } from './skip-link'

interface ChromeProps {
  header: React.ReactNode
  floatingSocials: React.ReactNode
  footer: React.ReactNode
  mobileCta: React.ReactNode
  jsonLd: React.ReactNode
  children: React.ReactNode
}

export function Chrome({
  header,
  floatingSocials,
  footer,
  mobileCta,
  jsonLd,
  children,
}: ChromeProps) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio') ?? false
  const isAdmin = pathname?.startsWith('/admin') ?? false

  if (isStudio || isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <SkipLink />
      {header}
      {floatingSocials}
      <main id="main-content" className="pb-[8rem] md:pb-0">
        {children}
      </main>
      {footer}
      {mobileCta}
      {jsonLd}
    </>
  )
}
