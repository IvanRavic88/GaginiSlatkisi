import type { Metadata } from 'next'
import { Poppins, Secular_One } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const secularOne = Secular_One({
  subsets: ['latin', 'latin-ext'],
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
      <body>{children}</body>
    </html>
  )
}
