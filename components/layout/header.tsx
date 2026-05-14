import Image from 'next/image'
import Link from 'next/link'

import { MobileNav } from './mobile-nav'

const NAV_LINKS = [
  { href: '/#kolaci', label: 'Torte i kolači' },
  { href: '/#galerija', label: 'Galerija' },
  { href: '/#pricing', label: 'Cene' },
] as const

export function Header() {
  return (
    <section className="bg-[var(--color-header-bg)]">
      <header className="mx-auto flex h-[9.6rem] max-w-[120rem] items-center justify-between px-[3.2rem]">
        <Link href="/" aria-label="GaginiSlatkiši — naslovna">
          <Image
            src="/img/GaginiSlatkiši.png"
            alt="GaginiSlatkiši logo"
            width={240}
            height={80}
            priority
            className="h-[8rem] w-auto"
          />
        </Link>

        <nav className="hidden md:block" aria-label="Glavna navigacija">
          <ul className="flex items-center gap-[4.8rem]">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[1.8rem] font-medium text-[var(--color-text-dark)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#cta"
                className="inline-block rounded-[9px] bg-[var(--color-accent)] px-[2.4rem] py-[1.2rem] text-[1.8rem] font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
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
