import type { Metadata } from 'next'
import { Caveat, Poppins } from 'next/font/google'

import { Chrome } from '@/components/layout/chrome'
import { FloatingSocials } from '@/components/layout/floating-socials'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { MobileCta } from '@/components/layout/mobile-cta'
import { LocalBusinessJsonLd } from '@/components/seo/local-business-jsonld'
import { ToastProvider } from '@/components/ui'
import { sanityFetch } from '@/lib/sanity/fetch'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SITE_SETTINGS_QUERY_RESULT } from '@/sanity.types'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin-ext'],
  weight: ['700'],
  variable: '--font-caveat',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gaginislatkisi.com'),
  title: {
    default: 'GaginiSlatkiši — Domaći kolači i Torte Lazarevac',
    template: '%s | GaginiSlatkiši',
  },
  description:
    'Domaći kolači i torte po porudžbini iz Lazarevca. Torte za rođendane, svadbe i sve posebne prilike. Kontaktirajte nas preko forme ili Vibera.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SITE_SETTINGS_QUERY_RESULT>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })
  const phone = settings?.phone ?? '065/5593-678'

  return (
    <html lang="sr" className={`${poppins.variable} ${caveat.variable}`}>
      <body>
        <ToastProvider>
          <Chrome
            header={<Header />}
            floatingSocials={<FloatingSocials />}
            footer={<Footer />}
            mobileCta={<MobileCta phone={phone} />}
            jsonLd={<LocalBusinessJsonLd />}
          >
            {children}
          </Chrome>
        </ToastProvider>
      </body>
    </html>
  )
}
