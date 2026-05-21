'use client'

import { useEffect, useState, useTransition } from 'react'
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

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !isPending) setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, isPending])

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
        aria-label={`Obriši ${name}`}
        className="inline-flex h-[4.4rem] w-[4.4rem] flex-shrink-0 items-center justify-center rounded-full bg-[#fdecec] text-[#c44d4d] transition hover:bg-[#c44d4d] hover:text-white"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.6rem] w-[1.6rem]">
          <path
            d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-9 0v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6M10 11v6M14 11v6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[1.6rem] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isPending) setIsOpen(false)
          }}
        >
          <div className="relative w-full max-w-[44rem] overflow-hidden rounded-[2rem] border border-[rgba(184,105,58,0.18)] bg-[#fffaf3] p-[2.8rem] shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.25)]">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[0.5rem] bg-[#c44d4d]"
            />

            <div className="mb-[1.6rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-full bg-[#fdecec]">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[2.8rem] w-[2.8rem] text-[#c44d4d]">
                <path
                  d="M12 2L1 21h22L12 2zM12 9v5M12 17h.01"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2
              id="delete-title"
              className="mb-[0.8rem] text-[2rem] leading-tight font-semibold text-[var(--color-text-dark)]"
            >
              Obrisati „{name}&rdquo;?
            </h2>
            <p className="mb-[2.4rem] text-[1.45rem] leading-[1.5] text-[var(--color-caramel)]/85">
              Slatkiš će biti uklonjen sa sajta i iz baze. Ova akcija se ne može poništiti.
            </p>

            {error && (
              <p
                role="alert"
                className="mb-[1.6rem] rounded-[0.8rem] bg-[#fdecec] px-[1.2rem] py-[1rem] text-[1.35rem] text-[#7a2222]"
              >
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse gap-[1rem] sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
                className="w-full rounded-full border-2 border-[rgba(184,105,58,0.4)] bg-white px-[2rem] py-[1.4rem] text-[1.5rem] font-semibold text-[var(--color-caramel)] transition hover:border-[var(--color-caramel)] hover:bg-[var(--color-cream)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Otkaži
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={isPending}
                className="inline-flex w-full items-center justify-center gap-[0.6rem] rounded-full bg-[#c44d4d] px-[2.4rem] py-[1.4rem] text-[1.5rem] font-bold text-white shadow-[0_0.6rem_1.6rem_rgba(196,77,77,0.35)] transition-all duration-200 hover:-translate-y-[0.1rem] hover:bg-[#a83a3a] hover:shadow-[0_0.8rem_2rem_rgba(196,77,77,0.45)] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {!isPending && (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.6rem] w-[1.6rem]">
                    <path
                      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-9 0v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {isPending ? 'Brišem…' : 'Da, obriši'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
