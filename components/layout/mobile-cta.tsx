'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { ArrowUpIcon, PhoneIcon, ViberIcon } from '@/components/ui/icons'

export function MobileCta({ phone }: { phone: string }) {
  const [visible, setVisible] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const heroPast = y > 400
      const scrollingDown = y > lastY.current
      lastY.current = y
      setVisible(heroPast && !scrollingDown ? true : heroPast && scrollingDown ? false : heroPast)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const viberNumber = phone.replace(/[^0-9]/g, '').replace(/^0/, '381')

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Vrati se na vrh"
        aria-hidden={!visible}
        tabIndex={visible ? 0 : -1}
        className={`fixed right-[1.6rem] bottom-[8.4rem] z-40 grid h-[4.8rem] w-[4.8rem] place-items-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_4px_14px_rgba(246,80,160,0.35)] transition-all duration-300 hover:-translate-y-[0.2rem] hover:bg-[var(--color-accent-dark)] hover:shadow-[0_8px_22px_rgba(246,80,160,0.45)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-dark)] focus-visible:ring-offset-2 md:hidden ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-[1rem] opacity-0'
        }`}
      >
        <ArrowUpIcon className="h-[2.2rem] w-[2.2rem]" />
      </button>
      <div
        aria-hidden={!visible}
        className={`fixed right-0 bottom-0 left-0 z-40 flex gap-[1.2rem] border-t border-[var(--color-cta-from)]/40 bg-white/95 px-[1.6rem] py-[1.2rem] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform duration-300 md:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
      <Link
        href="/#cta"
        className="btn-shine flex-1 rounded-[9px] bg-[var(--color-accent)] py-[1.4rem] text-center text-[1.5rem] font-bold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
      >
        Pošalji upit
      </Link>
      <a
        href={`viber://chat?number=%2B${viberNumber}`}
        aria-label="Viber"
        className="group relative grid h-[4.8rem] w-[4.8rem] flex-none place-items-center overflow-hidden rounded-[9px] bg-white text-[var(--color-accent)] shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_4px_12px_rgba(115,96,242,0.3)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#7360f2] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <ViberIcon className="relative h-[3rem] w-[3rem] transition-colors duration-300 group-hover:text-white" />
      </a>
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        aria-label={`Pozovi ${phone}`}
        className="grid h-[4.8rem] w-[4.8rem] flex-none place-items-center rounded-[9px] bg-[var(--color-primary)] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-primary-tint-2)]"
      >
        <PhoneIcon className="h-[2.4rem] w-[2.4rem]" />
      </a>
      </div>
    </>
  )
}
