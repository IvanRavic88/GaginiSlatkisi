'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/ui/icons'

export type GalleryItem = {
  src: string
  alt: string
  span: 'normal' | 'big-first' | 'big-second' | 'big-third'
}

const spanClass: Record<Exclude<GalleryItem['span'], 'normal'>, string> = {
  'big-first': 'md:col-[2/4] md:row-[1/3] lg:col-[2/4] lg:row-[1/3]',
  'big-second': 'md:col-[5/7] md:row-[2/4] lg:col-[8/10] lg:row-[2/4]',
  'big-third': 'md:col-[2/4] md:row-[3/5] lg:col-[5/7] lg:row-[3/5]',
}

export function GalerijaClient({ items }: { items: GalleryItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const isOpen = openIdx !== null

  const close = useCallback(() => setOpenIdx(null), [])
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  )
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, next, prev])

  const current = openIdx !== null ? items[openIdx] : null

  return (
    <>
      <div className="grid grid-cols-2 gap-[1rem] sm:grid-cols-3 md:auto-rows-[16vw] md:grid-cols-6 lg:auto-rows-[12vw] lg:grid-cols-9">
        {items.map((item, idx) => (
          <button
            key={`${item.src}-${idx}`}
            type="button"
            onClick={() => setOpenIdx(idx)}
            aria-label={`Otvori sliku: ${item.alt}`}
            className={[
              'group relative aspect-square overflow-hidden md:aspect-auto',
              'cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
              item.span !== 'normal' ? spanClass[item.span] : '',
            ].join(' ')}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading="lazy"
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 17vw, 50vw"
              quality={70}
              className="object-cover transition-transform duration-400 group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {current && openIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Slika ${openIdx + 1} od ${items.length}: ${current.alt}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-[2rem] backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            aria-label="Zatvori"
            className="absolute top-[2rem] right-[2rem] z-[110] grid h-[5rem] w-[5rem] place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <CloseIcon className="h-[2.4rem] w-[2.4rem]" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Prethodna slika"
            className="absolute top-1/2 left-[2rem] z-[110] grid h-[5rem] w-[5rem] -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-[3.2rem] md:h-[6rem] md:w-[6rem]"
          >
            <ChevronLeftIcon className="h-[2.4rem] w-[2.4rem]" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Sledeća slika"
            className="absolute top-1/2 right-[2rem] z-[110] grid h-[5rem] w-[5rem] -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-[3.2rem] md:h-[6rem] md:w-[6rem]"
          >
            <ChevronRightIcon className="h-[2.4rem] w-[2.4rem]" />
          </button>
          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-[120rem] flex-col items-center"
          >
            <div className="relative h-[80vh] w-full">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 95vw"
                quality={90}
                className="object-contain"
              />
            </div>
            <figcaption className="mt-[1.6rem] text-center text-[1.4rem] text-white/80">
              {openIdx + 1} / {items.length} · {current.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
