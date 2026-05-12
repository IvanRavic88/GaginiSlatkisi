import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/ui'

import { MobileNav } from './mobile-nav'

const NAV_LINKS = [
  { href: '/#kolaci', label: 'Torte i kolači' },
  { href: '/#galerija', label: 'Galerija' },
  { href: '/#pricing', label: 'Cene' },
] as const

export function Header() {
  return (
    <Container as="header" className="flex items-center justify-between py-[2.4rem]">
      <Link href="/" aria-label="GaginiSlatkiši — naslovna">
        <Image
          src="/img/GaginiSlatkiši.png"
          alt="GaginiSlatkiši logo"
          width={180}
          height={64}
          priority
          className="h-[5.6rem] w-auto"
        />
      </Link>

      <nav className="hidden md:block" aria-label="Glavna navigacija">
        <ul className="flex items-center gap-[3.2rem]">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[1.8rem] font-medium text-[var(--color-text-dark)] transition-colors hover:text-[var(--color-accent-dark)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#footer"
              className="rounded-[var(--radius-default)] bg-[var(--color-accent)] px-[2.4rem] py-[1.2rem] text-[1.6rem] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </nav>

      <MobileNav links={[...NAV_LINKS, { href: '/#footer', label: 'Kontakt' }]} />
    </Container>
  )
}
