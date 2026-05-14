'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

type GalleryItem = {
  num: number
  alt: string
  span?: 'big-first' | 'big-second' | 'big-third'
}

const ITEMS: GalleryItem[] = [
  { num: 1, alt: 'Bogato aranžiran poslužavnik sa raznovrsnim slatkišima', span: 'big-first' },
  { num: 2, alt: 'Detalj torte ukrašen jagodama i kremom' },
  { num: 5, alt: 'Tanjir sa mini kolačima i dekoracijom' },
  { num: 6, alt: 'Čokoladni slatkiš sa preljevom' },
  { num: 7, alt: 'Sitni kolači aranžirani u obliku rozete' },
  { num: 8, alt: 'Bele kupove sa kremom i bobicama' },
  { num: 11, alt: 'Različite vrste sitnih kolača u jednom paketu' },
  { num: 4, alt: 'Kolač sa keksom i čokoladnim preljevom' },
  { num: 9, alt: 'Glaziran kolač sa kandiranim cvećem' },
  { num: 10, alt: 'Slatki zalogaji prelepo poređani' },
  { num: 12, alt: 'Lux kolač sa zlatnim detaljima' },
  { num: 13, alt: 'Penaste bombone u obliku srca' },
  { num: 3, alt: 'Svadbena torta sa belim preljevom', span: 'big-second' },
  { num: 14, alt: 'Medenjaci sa cvetnom dekoracijom' },
  { num: 15, alt: 'Čokoladne čašice sa kremom i bobicama' },
  { num: 16, alt: 'Mini cheese kolači u različitim ukusima' },
  { num: 17, alt: 'Aranžman raznih torti za proslave' },
  { num: 18, alt: 'Mus kolač sa glazurom i bobicama' },
  { num: 19, alt: 'Tart sa svežim voćem' },
  { num: 20, alt: 'Kolač sa lešnicima i čokoladom' },
  { num: 21, alt: 'Šareni medenjaci sa motivima' },
  { num: 22, alt: 'Slatkiši aranžirani za rođendansku proslavu' },
  { num: 23, alt: 'Penaste bombone u kakaou' },
  { num: 24, alt: 'Mini torte na poslužavniku' },
  { num: 25, alt: 'Kolač sa belom čokoladom i jagodama' },
  { num: 26, alt: 'Sitne tortice sa cvetnom dekoracijom' },
  { num: 27, alt: 'Velika torta sa elegantnom dekoracijom', span: 'big-third' },
]

const spanClass: Record<NonNullable<GalleryItem['span']>, string> = {
  'big-first': 'md:col-[2/4] md:row-[1/3] lg:col-[2/4] lg:row-[1/3]',
  'big-second': 'md:col-[5/7] md:row-[2/4] lg:col-[8/10] lg:row-[2/4]',
  'big-third': 'md:col-[2/4] md:row-[3/5] lg:col-[5/7] lg:row-[3/5]',
}

export function Galerija() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const isOpen = openIdx !== null

  const close = useCallback(() => setOpenIdx(null), [])
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % ITEMS.length)),
    [],
  )
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + ITEMS.length) % ITEMS.length)),
    [],
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

  const current = openIdx !== null ? ITEMS[openIdx] : null

  return (
    <>
      <section
        id="galerija"
        className="bg-[var(--color-primary)] px-[3.2rem] py-[9.6rem]"
      >
        <div className="grid grid-cols-2 gap-[1rem] sm:grid-cols-3 md:auto-rows-[16vw] md:grid-cols-6 lg:auto-rows-[12vw] lg:grid-cols-9">
          {ITEMS.map((item, idx) => (
            <button
              key={item.num}
              type="button"
              onClick={() => setOpenIdx(idx)}
              aria-label={`Otvori sliku: ${item.alt}`}
              className={[
                'group relative aspect-square overflow-hidden md:aspect-auto',
                'cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
                item.span ? spanClass[item.span] : '',
              ].join(' ')}
            >
              <Image
                src={`/img/Gallery/27/Gallery-${item.num}.webp`}
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
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Slika ${(openIdx ?? 0) + 1} od ${ITEMS.length}: ${current.alt}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-[2rem] backdrop-blur-sm animate-in fade-in duration-200"
          onClick={close}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            aria-label="Zatvori"
            className="absolute right-[2rem] top-[2rem] z-[110] grid h-[5rem] w-[5rem] place-items-center rounded-full bg-white/15 text-[3.2rem] text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Prethodna slika"
            className="absolute left-[2rem] top-1/2 z-[110] grid h-[5rem] w-[5rem] -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-[3.2rem] md:h-[6rem] md:w-[6rem]"
          >
            <svg viewBox="0 0 24 24" className="h-[2.4rem] w-[2.4rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Sledeća slika"
            className="absolute right-[2rem] top-1/2 z-[110] grid h-[5rem] w-[5rem] -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-[3.2rem] md:h-[6rem] md:w-[6rem]"
          >
            <svg viewBox="0 0 24 24" className="h-[2.4rem] w-[2.4rem]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-full max-w-[120rem] flex-col items-center"
          >
            <div className="relative h-[80vh] w-full">
              <Image
                key={current.num}
                src={`/img/Gallery/27/Gallery-${current.num}.webp`}
                alt={current.alt}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 95vw"
                quality={90}
                className="object-contain"
              />
            </div>
            <figcaption className="mt-[1.6rem] text-center text-[1.4rem] text-white/80">
              {(openIdx ?? 0) + 1} / {ITEMS.length} · {current.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
