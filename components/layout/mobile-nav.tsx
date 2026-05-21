'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, type MouseEvent } from 'react'

import { FacebookIcon, InstagramIcon, ViberIcon } from '@/components/ui/icons'
import { HeartDecor, SprinkleDot, SprinkleStick } from '@/components/ui/sprinkle'

interface NavLink {
  href: string
  label: string
}

const PHONE = '065/5593-678'
const VIBER = '381655593678'

function handleAnchorClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('/#')) return
  if (window.location.pathname !== '/') return
  const id = href.slice(2)
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ block: 'start' })
  history.replaceState(null, '', `/#${id}`)
}

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Trap focus inside the menu when open + close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Separate CTA link (last in array) from regular nav
  const ctaLink = links[links.length - 1]
  const navLinks = links.slice(0, -1)

  return (
    <>
      {/* Trigger button — custom asymmetric 3-line icon morphing to X */}
      <button
        type="button"
        aria-label={open ? 'Zatvori meni' : 'Otvori meni'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="relative z-[60] -mr-[0.6rem] inline-flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full text-[var(--color-caramel)] transition-colors duration-200 hover:bg-[var(--color-primary)]/60 hover:text-[var(--color-accent)] md:hidden"
      >
        <span aria-hidden="true" className="relative flex h-[1.8rem] w-[2.4rem] flex-col justify-between">
          <span
            className={`block h-[0.25rem] rounded-full bg-current transition-all duration-300 ease-out ${
              open ? 'translate-y-[0.775rem] rotate-45' : 'w-[2.4rem]'
            }`}
          />
          <span
            className={`block h-[0.25rem] rounded-full bg-current transition-all duration-200 ease-out ${
              open ? 'w-0 opacity-0' : 'ml-auto w-[1.6rem] opacity-100'
            }`}
          />
          <span
            className={`block h-[0.25rem] rounded-full bg-current transition-all duration-300 ease-out ${
              open ? '-translate-y-[0.775rem] -rotate-45 w-[2.4rem]' : 'w-[2rem]'
            }`}
          />
        </span>
      </button>

      {/* Backdrop + panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 overflow-hidden bg-[var(--color-cream)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open
            ? 'pointer-events-auto translate-x-0 opacity-100'
            : 'pointer-events-none translate-x-[2rem] opacity-0'
        }`}
      >
        {/* Backdrop blooms */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(60rem 40rem at 8% 4%, rgba(246, 80, 160, 0.16), transparent 60%),
              radial-gradient(50rem 38rem at 92% 96%, rgba(255, 211, 75, 0.2), transparent 65%),
              radial-gradient(40rem 30rem at 50% 50%, rgba(184, 105, 58, 0.05), transparent 70%)
            `,
          }}
        />

        {/* Floating sprinkles */}
        <div aria-hidden="true" className="pointer-events-none absolute top-[14rem] left-[2.4rem]">
          <SprinkleStick
            rotate={-25}
            color="var(--color-accent)"
            className="animate-float-gentle absolute h-[0.7rem] w-[2.4rem]"
          />
          <SprinkleDot
            color="var(--color-caramel)"
            className="animate-float-gentle absolute top-[2.4rem] left-[1.2rem] h-[0.9rem] w-[0.9rem]"
          />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute right-[3rem] bottom-[18rem]">
          <HeartDecor
            color="var(--color-accent)"
            className="animate-float-gentle h-[2rem] w-[2rem]"
          />
          <SprinkleDot
            color="var(--color-ribbon-bg)"
            className="animate-float-gentle absolute top-[3rem] right-[1rem] h-[0.8rem] w-[0.8rem]"
          />
        </div>

        {/* Top ribbon */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[0.5rem]"
          style={{
            background:
              'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary-shade) 45%, var(--color-ribbon-bg) 100%)',
          }}
        />

        <div className="relative flex h-full flex-col">
          {/* Header — logo + close */}
          <div className="flex items-center justify-between px-[1.6rem] pt-[1.6rem] pb-[2rem]">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              aria-label="Naslovna"
              className="inline-block"
            >
              <Image
                src="/img/GaginiSlatkiši.png"
                alt="GaginiSlatkiši"
                width={200}
                height={80}
                priority={false}
                className="h-[5.6rem] w-auto drop-shadow-[0_0.3rem_0.6rem_rgba(184,105,58,0.15)]"
              />
            </Link>
            {/* Close button is the hamburger button itself (z-60 above panel) */}
          </div>

          {/* Nav body */}
          <nav
            aria-label="Mobilna navigacija"
            className="flex flex-1 flex-col justify-center gap-[3.2rem] overflow-y-auto px-[2.4rem] pb-[2rem]"
          >
            <div>
              <span
                className={`-rotate-[3deg] inline-block font-[family-name:var(--font-caveat)] text-[2.6rem] leading-none font-bold text-[var(--color-accent)] transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-[1.6rem] opacity-0'
                }`}
                style={{ transitionDelay: open ? '150ms' : '0ms' }}
              >
                Šta vas zanima?
              </span>
            </div>

            <ul className="flex flex-col gap-[1.4rem]">
              {navLinks.map((link, idx) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleAnchorClick(e, link.href)
                      setOpen(false)
                    }}
                    className={`group inline-flex items-center gap-[1.2rem] font-[family-name:var(--font-caveat)] text-[3.6rem] leading-none font-bold text-[var(--color-text-dark)] transition-all duration-500 hover:text-[var(--color-accent)] ${
                      open ? 'translate-x-0 opacity-100' : '-translate-x-[1.6rem] opacity-0'
                    }`}
                    style={{ transitionDelay: open ? `${250 + idx * 80}ms` : '0ms' }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-[0.8rem] w-[0.8rem] flex-shrink-0 rounded-full bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-150"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div
              aria-hidden="true"
              className={`h-[0.1rem] bg-[rgba(184,105,58,0.2)] transition-opacity duration-500 ${
                open ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: open ? `${250 + navLinks.length * 80 + 100}ms` : '0ms' }}
            />

            {/* CTA */}
            {ctaLink && (
              <Link
                href={ctaLink.href}
                onClick={(e) => {
                  handleAnchorClick(e, ctaLink.href)
                  setOpen(false)
                }}
                className={`btn-shine inline-flex items-center justify-center gap-[0.8rem] self-stretch rounded-full bg-[var(--color-accent)] px-[2.4rem] py-[1.6rem] text-[1.6rem] font-bold text-white shadow-[0_0.6rem_1.6rem_rgba(246,80,160,0.35)] transition-all duration-500 hover:bg-[var(--color-accent-dark)] ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-[1.6rem] opacity-0'
                }`}
                style={{
                  transitionDelay: open ? `${250 + navLinks.length * 80 + 200}ms` : '0ms',
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.8rem] w-[1.8rem]">
                  <path
                    d="M12 21s-7-4.5-9-9C1.4 8 4 4 8 4c2 0 3.2 1 4 2.5C12.8 5 14 4 16 4c4 0 6.6 4 5 8-2 4.5-9 9-9 9z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  />
                </svg>
                {ctaLink.label}
              </Link>
            )}
          </nav>

          {/* Footer — phone + socials */}
          <div
            className={`relative border-t border-[rgba(184,105,58,0.15)] bg-white/40 backdrop-blur-sm px-[2.4rem] py-[1.8rem] transition-opacity duration-500 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transitionDelay: open ? `${250 + navLinks.length * 80 + 300}ms` : '0ms',
            }}
          >
            <a
              href={`tel:${PHONE.replace(/\s+/g, '')}`}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-[1rem] text-[1.45rem] text-[var(--color-text-dark)]"
            >
              <span className="grid h-[3.6rem] w-[3.6rem] place-items-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_0.2rem_0.6rem_rgba(0,0,0,0.06)] transition-all group-hover:bg-[var(--color-accent)] group-hover:text-white">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.6rem] w-[1.6rem]">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-[1.15rem] tracking-wide text-[var(--color-text-muted)] uppercase">
                  Pozovite
                </span>
                <span className="font-semibold text-[var(--color-text-dark)] group-hover:text-[var(--color-accent)]">
                  {PHONE}
                </span>
              </span>
            </a>

            <div className="mt-[1.4rem] flex items-center gap-[1rem]">
              <a
                href="https://instagram.com/gaginislatkisi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-[3.6rem] w-[3.6rem] place-items-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_0.2rem_0.6rem_rgba(0,0,0,0.06)] transition-all hover:-translate-y-[0.2rem] hover:bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] hover:text-white"
              >
                <InstagramIcon className="h-[1.8rem] w-[1.8rem]" />
              </a>
              <a
                href="https://m.facebook.com/Gagini-slatkisi-101539355408806/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-[3.6rem] w-[3.6rem] place-items-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_0.2rem_0.6rem_rgba(0,0,0,0.06)] transition-all hover:-translate-y-[0.2rem] hover:bg-[#1877f2] hover:text-white"
              >
                <FacebookIcon className="h-[1.8rem] w-[1.8rem]" />
              </a>
              <a
                href={`viber://chat?number=%2B${VIBER}`}
                aria-label="Viber"
                className="grid h-[3.6rem] w-[3.6rem] place-items-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_0.2rem_0.6rem_rgba(0,0,0,0.06)] transition-all hover:-translate-y-[0.2rem] hover:bg-[#7360f2] hover:text-white"
              >
                <ViberIcon className="h-[2rem] w-[2rem]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
