'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { MobileNav } from './mobile-nav'

const NAV_LINKS = [
  { href: '/#kolaci', label: 'Torte i kolači' },
  { href: '/#galerija', label: 'Galerija' },
  { href: '/#pricing', label: 'Cene' },
] as const

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(null)
      return
    }

    const sectionIds = NAV_LINKS.map((l) => l.href.split('#')[1]).filter((id): id is string =>
      Boolean(id),
    )
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.5, 1] },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

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
              'group-hover:scale-105 group-hover:-rotate-2',
              scrolled ? 'h-[5.6rem]' : 'h-[8rem]',
            ].join(' ')}
          />
        </Link>

        <nav className="hidden md:block" aria-label="Glavna navigacija">
          <ul className="flex items-center gap-[4.8rem]">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.split('#')[1]
              const isActive = activeSection === sectionId
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group relative inline-block py-[0.4rem] text-[1.8rem] font-medium transition-colors hover:text-[var(--color-accent)] ${
                      isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-dark)]'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-[0.2rem] left-0 h-[2px] bg-[var(--color-accent)] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
            <li>
              <Link
                href="/#cta"
                className="btn-shine inline-block rounded-[9px] bg-[var(--color-accent)] px-[2.4rem] py-[1.2rem] text-[1.8rem] font-medium text-white shadow-[0_4px_12px_rgba(246,80,160,0.25)] transition-all duration-300 hover:-translate-y-[0.2rem] hover:bg-[var(--color-accent-dark)] hover:shadow-[0_8px_20px_rgba(246,80,160,0.4)]"
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
