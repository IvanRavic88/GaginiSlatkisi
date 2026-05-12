import Image from 'next/image'
import type { Image as SanityImageType } from 'sanity'

import { urlForImage } from '@/lib/sanity/image'
import { cn } from '@/lib/utils'

interface SanityImageProps {
  source: SanityImageType & { alt?: string }
  alt?: string
  width: number
  height: number
  sizes?: string
  className?: string
  priority?: boolean
}

export function SanityImage({
  source,
  alt,
  width,
  height,
  sizes,
  className,
  priority = false,
}: SanityImageProps) {
  const url = urlForImage(source).width(width).height(height).url()
  const resolvedAlt = alt ?? source.alt ?? ''
  return (
    <Image
      src={url}
      alt={resolvedAlt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
    />
  )
}
