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
      className="rounded-full border border-caramel/30 px-4 py-2 text-sm font-medium text-caramel transition hover:border-accent hover:text-accent disabled:opacity-50"
    >
      {isPending ? 'Odjava…' : 'Odjava'}
    </button>
  )
}
