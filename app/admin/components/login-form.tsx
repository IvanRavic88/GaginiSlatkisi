'use client'

import { useState, useTransition, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        if (res.status === 429) {
          setError('Previše pokušaja. Pokušajte ponovo za 10 minuta.')
          return
        }
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string }
          setError(data.error ?? 'Greška. Pokušajte ponovo.')
          return
        }
        router.push('/admin/login/verify')
      } catch {
        setError('Greška u mreži. Pokušajte ponovo.')
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-caramel">Email adresa</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-caramel/30 bg-white px-4 py-3 text-base text-caramel outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="vasa@adresa.com"
          disabled={isPending}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <Button type="submit" variant="full" disabled={isPending}>
        {isPending ? 'Šaljem…' : 'Pošalji link za prijavu'}
      </Button>
    </form>
  )
}
