import type { Metadata } from 'next'
import { Poppins, Secular_One } from 'next/font/google'

import { FloatingSocials } from '@/components/layout/floating-socials'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { SkipLink } from '@/components/layout/skip-link'
import { LocalBusinessJsonLd } from '@/components/seo/local-business-jsonld'
import { ToastProvider } from '@/components/ui'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const secularOne = Secular_One({
  subsets: ['latin-ext'],
  weight: '400',
  variable: '--font-secular-one',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gaginislatkisi.com'),
  title: {
    default: 'GaginiSlatkiši — Domaći kolači i Torte Lazarevac',
    template: '%s | GaginiSlatkiši',
  },
  description:
    'GaginiSlatkiši iz Lazarevca priprema domaće kolače i torte, savršene za ulepšavanje svih vaših posebnih trenutaka.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${poppins.variable} ${secularOne.variable}`}>
      <body>
        <ToastProvider>
          <SkipLink />
          <Header />
          <FloatingSocials />
          <main id="main-content">{children}</main>
          <Footer />
          <LocalBusinessJsonLd />
        </ToastProvider>
      </body>
    </html>
  )
}
