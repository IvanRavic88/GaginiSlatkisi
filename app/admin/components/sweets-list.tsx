'use client'

import { useOptimistic, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Image as SanityImageType } from 'sanity'
import { deleteSweet } from '@/app/actions/admin-sweet'
import { useToast } from '@/components/ui'
import { SweetCard } from './sweet-card'

interface SweetRow {
  _id: string
  name: string
  image: { asset: { _ref: string }; alt?: string } | null
  categoryName: string | null
}

interface Props {
  sweets: SweetRow[]
}

export function SweetsList({ sweets }: Props) {
  const router = useRouter()
  const { show } = useToast()
  const [, startTransition] = useTransition()
  const [optimisticSweets, removeSweet] = useOptimistic<SweetRow[], string>(
    sweets,
    (state, idToRemove) => state.filter((s) => s._id !== idToRemove),
  )

  function handleDelete(id: string, name: string) {
    startTransition(async () => {
      removeSweet(id)
      const result = await deleteSweet(id)
      if (!result.ok) {
        show(result.error ?? `Greška pri brisanju „${name}".`, 'error')
        return
      }
      show(`„${name}" je obrisan.`, 'success')
      router.refresh()
    })
  }

  const grouped = new Map<string, SweetRow[]>()
  for (const s of optimisticSweets) {
    const key = s.categoryName ?? 'Bez kategorije'
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(s)
  }

  return (
    <div className="flex flex-col gap-[4rem]">
      {[...grouped.entries()].map(([categoryName, rows]) => (
        <section key={categoryName}>
          <div className="mb-[1.6rem] flex items-baseline gap-[1.2rem]">
            <h2 className="text-[2rem] font-bold text-[var(--color-text-dark)]">
              {categoryName}
            </h2>
            <span className="inline-flex h-[2.4rem] min-w-[2.4rem] items-center justify-center rounded-full bg-[var(--color-primary)] px-[0.8rem] text-[1.2rem] font-semibold text-[var(--color-accent-text)]">
              {rows.length}
            </span>
            <span
              aria-hidden="true"
              className="ml-[0.4rem] h-[0.1rem] flex-1 bg-[rgba(184,105,58,0.18)]"
            />
          </div>
          <div className="grid grid-cols-2 gap-[1.6rem] sm:grid-cols-3 lg:grid-cols-4 lg:gap-[2rem]">
            {rows.map((s) => (
              <SweetCard
                key={s._id}
                id={s._id}
                name={s.name}
                image={s.image as unknown as (SanityImageType & { alt?: string }) | null}
                imageAlt={s.image?.alt ?? s.name}
                onDelete={() => handleDelete(s._id, s.name)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
