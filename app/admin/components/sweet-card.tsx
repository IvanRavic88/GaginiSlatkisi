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
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-cream">
        {image && (
          <SanityImage
            source={image}
            alt={imageAlt}
            width={400}
            height={400}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        <h3 className="truncate text-sm font-semibold text-caramel">{name}</h3>
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <Link
          href={`/admin/${id}`}
          className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-caramel shadow-sm transition hover:bg-white"
        >
          Edit
        </Link>
        <DeleteButton id={id} name={name} />
      </div>
    </article>
  )
}
