import Link from 'next/link'
import type { Image as SanityImageType } from 'sanity'
import { SanityImage } from '@/components/ui/sanity-image'
import { DeleteButton } from './delete-button'

interface Props {
  id: string
  name: string
  image: (SanityImageType & { alt?: string }) | null
  imageAlt: string
}

export function SweetCard({ id, name, image, imageAlt }: Props) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-[rgba(184,105,58,0.15)] bg-white shadow-[0_0.6rem_1.6rem_rgba(184,105,58,0.08)] transition-all duration-300 hover:-translate-y-[0.3rem] hover:shadow-[0_1.2rem_2.4rem_rgba(184,105,58,0.15)]">
      <Link
        href={`/admin/${id}`}
        className="relative block aspect-square overflow-hidden bg-[var(--color-cream)]"
        aria-label={`Edit ${name}`}
      >
        {image ? (
          <SanityImage
            source={image}
            alt={imageAlt}
            width={400}
            height={400}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-caramel)]/40">
            <svg viewBox="0 0 64 64" aria-hidden="true" className="h-[4rem] w-[4rem]">
              <rect x="8" y="14" width="48" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="22" cy="28" r="4" fill="currentColor" />
              <path d="M10 48 L24 34 L38 46 L46 38 L54 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-[1.2rem] p-[1.2rem] sm:p-[1.4rem]">
        <h3 className="line-clamp-2 min-h-[3.6rem] text-[1.4rem] leading-[1.3] font-semibold text-[var(--color-text-dark)] sm:text-[1.5rem]">
          {name}
        </h3>

        <div className="mt-auto flex items-center gap-[0.8rem]">
          <Link
            href={`/admin/${id}`}
            aria-label={`Izmeni ${name}`}
            className="inline-flex h-[4.4rem] flex-1 items-center justify-center gap-[0.6rem] rounded-full bg-[var(--color-primary)] px-[1.2rem] text-[1.35rem] font-semibold text-[var(--color-accent-text)] transition hover:bg-[var(--color-accent)] hover:text-white"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1.6rem] w-[1.6rem] flex-shrink-0">
              <path
                d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span className="hidden sm:inline">Izmeni</span>
          </Link>
          <DeleteButton id={id} name={name} />
        </div>
      </div>
    </article>
  )
}
