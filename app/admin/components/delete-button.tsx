'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteSweet } from '@/app/actions/admin-sweet'

interface Props {
  id: string
  name: string
}

export function DeleteButton({ id, name }: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function confirm() {
    startTransition(async () => {
      setError(null)
      const result = await deleteSweet(id)
      if (!result.ok) {
        setError(result.error ?? 'Greška.')
        return
      }
      setIsOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-red-700 shadow-sm transition hover:bg-red-50"
      >
        Obriši
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="delete-title" className="mb-2 text-lg font-semibold text-caramel">
              Obrisati „{name}&rdquo;?
            </h2>
            <p className="mb-5 text-sm text-caramel/80">
              Ova akcija se ne može poništiti.
            </p>
            {error && <p className="mb-3 text-sm text-red-700">{error}</p>}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="rounded-full border border-caramel/30 px-4 py-2 text-sm text-caramel disabled:opacity-50"
              >
                Otkaži
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={isPending}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {isPending ? 'Brišem…' : 'Obriši'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
