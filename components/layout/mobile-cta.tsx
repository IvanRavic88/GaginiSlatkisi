'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { PhoneIcon, ViberIcon } from '@/components/ui/icons'

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
    <div
      aria-hidden={!visible}
      className={`fixed right-0 bottom-0 left-0 z-40 flex gap-[1.2rem] border-t border-[var(--color-cta-from)]/40 bg-white/95 px-[1.6rem] py-[1.2rem] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Link
        href="/#cta"
        className="btn-shine flex-1 rounded-[9px] bg-[var(--color-accent)] py-[1.4rem] text-center text-[1.5rem] font-semibold text-white transition-colors hover:bg-[var(--color-accent-dark)]"
      >
        Pošalji upit
      </Link>
      <a
        href={`viber://chat?number=%2B${viberNumber}`}
        aria-label="Viber"
        className="grid h-[4.8rem] w-[4.8rem] flex-none place-items-center rounded-[9px] bg-[#7360F2] text-white transition-colors hover:bg-[#5d4ad0]"
      >
        <ViberIcon className="h-[2.4rem] w-[2.4rem]" />
      </a>
      <a
        href={`tel:${phone.replace(/\s+/g, '')}`}
        aria-label={`Pozovi ${phone}`}
        className="grid h-[4.8rem] w-[4.8rem] flex-none place-items-center rounded-[9px] bg-[var(--color-primary)] text-[var(--color-accent)] transition-colors hover:bg-[var(--color-primary-tint-2)]"
      >
        <PhoneIcon className="h-[2.4rem] w-[2.4rem]" />
      </a>
    </div>
  )
}
