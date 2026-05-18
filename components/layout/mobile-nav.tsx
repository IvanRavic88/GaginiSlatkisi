'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { CloseIcon, MenuIcon } from '@/components/ui/icons'

interface NavLink {
  href: string
  label: string
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Zatvori meni' : 'Otvori meni'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] block rounded p-[0.8rem] text-[var(--color-text-dark)] md:hidden"
      >
        {open ? (
          <CloseIcon className="h-[3.2rem] w-[3.2rem]" />
        ) : (
          <MenuIcon className="h-[3.2rem] w-[3.2rem]" />
        )}
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 bg-[linear-gradient(to_bottom_right,var(--color-header-bg),var(--color-primary))] transition-all duration-400 ease-out md:hidden ${
          open
            ? 'pointer-events-auto translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-full opacity-0'
        }`}
      >
        <nav
          aria-label="Mobilna navigacija"
          className="flex h-full flex-col items-center justify-center gap-[3.2rem]"
        >
          {links.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-[2.6rem] font-medium text-[var(--color-text-dark)] transition-all duration-500 hover:text-[var(--color-accent)] ${
                open
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-[1.6rem] opacity-0'
              }`}
              style={{ transitionDelay: open ? `${150 + idx * 80}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
