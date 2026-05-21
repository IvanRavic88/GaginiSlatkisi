'use client'

import { useTransition } from 'react'

export function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  function onClick() {
    startTransition(async () => {
      await fetch('/api/admin/logout', { method: 'POST' })
      window.location.assign('/admin/login')
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      aria-label="Odjava"
      className="inline-flex h-[4.4rem] items-center justify-center gap-[0.6rem] rounded-full border-2 border-[rgba(184,105,58,0.25)] bg-white px-[1.2rem] text-[1.35rem] font-semibold text-[var(--color-caramel)] transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-primary)]/40 hover:text-[var(--color-accent-text)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-[1.8rem]"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.6rem] w-[1.6rem]">
        <path
          d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span className="hidden sm:inline">{isPending ? 'Odjava…' : 'Odjava'}</span>
    </button>
  )
}
