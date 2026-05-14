'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { MobileNav } from './mobile-nav'

const NAV_LINKS = [
  { href: '/#kolaci', label: 'Torte i kolači' },
  { href: '/#galerija', label: 'Galerija' },
  { href: '/#pricing', label: 'Cene' },
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className={[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 shadow-[0_1.2rem_3.2rem_rgba(0,0,0,0.06)] backdrop-blur-md'
          : 'bg-[var(--color-header-bg)]',
      ].join(' ')}
    >
      <header
        className={[
          'mx-auto flex max-w-[120rem] items-center justify-between px-[3.2rem] transition-all duration-300',
          scrolled ? 'h-[7.2rem]' : 'h-[9.6rem]',
        ].join(' ')}
      >
        <Link href="/" aria-label="GaginiSlatkiši — naslovna" className="group inline-block">
          <Image
            src="/img/GaginiSlatkiši.png"
            alt="GaginiSlatkiši logo"
            width={240}
            height={80}
            priority
            className={[
              'w-auto transition-all duration-300 ease-out',
              'group-hover:-rotate-2 group-hover:scale-105',
              scrolled ? 'h-[5.6rem]' : 'h-[8rem]',
            ].join(' ')}
          />
        </Link>

        <nav className="hidden md:block" aria-label="Glavna navigacija">
          <ul className="flex items-center gap-[4.8rem]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative inline-block py-[0.4rem] text-[1.8rem] font-medium text-[var(--color-text-dark)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-[0.2rem] left-0 h-[2px] w-0 bg-[var(--color-accent)] transition-all duration-300 group-hover:w-full"
                  />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#cta"
                className="inline-block rounded-[9px] bg-[var(--color-accent)] px-[2.4rem] py-[1.2rem] text-[1.8rem] font-medium text-white shadow-[0_4px_12px_rgba(246,80,160,0.25)] transition-all duration-300 hover:-translate-y-[0.2rem] hover:bg-[var(--color-accent-dark)] hover:shadow-[0_8px_20px_rgba(246,80,160,0.4)]"
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>

        <MobileNav links={[...NAV_LINKS, { href: '/#cta', label: 'Kontakt' }]} />
      </header>
    </section>
  )
}
