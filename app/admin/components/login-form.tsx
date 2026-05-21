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
    <form onSubmit={onSubmit} className="flex flex-col gap-[1.6rem]" noValidate>
      <div className="flex flex-col gap-[0.6rem]">
        <label
          htmlFor="admin-email"
          className="font-[family-name:var(--font-caveat)] text-[2rem] leading-none text-[var(--color-caramel)]"
        >
          Vaš email
        </label>
        <div className="group relative">
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            placeholder="vasa@adresa.com"
            className="peer w-full rounded-[1rem] border border-[rgba(184,105,58,0.25)] bg-white px-[1.6rem] py-[1.4rem] text-[1.6rem] text-[var(--color-text-dark)] placeholder:text-[var(--color-caramel)]/40 outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_0.4rem_rgba(246,80,160,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
          />
          {/* Subtle inset shimmer on focus */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[1.2rem] -bottom-[0.2rem] h-[0.2rem] origin-center scale-x-0 rounded-full bg-[var(--color-accent)] transition-transform duration-300 peer-focus:scale-x-100"
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="animate-form-shake flex items-center gap-[0.6rem] rounded-[0.8rem] bg-[#fdecec] px-[1.2rem] py-[0.8rem] text-[1.35rem] leading-[1.4] text-[#7a2222]"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="full"
        disabled={isPending}
        className="!w-full !py-[1.4rem] !text-[1.5rem]"
      >
        {isPending ? 'Šaljem…' : 'Pošalji link za prijavu'}
      </Button>
    </form>
  )
}
