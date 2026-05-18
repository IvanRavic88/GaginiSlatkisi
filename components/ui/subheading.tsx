import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Subheading({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-block font-[family-name:var(--font-caveat)] text-[3rem] font-bold leading-none text-[var(--color-primary-shade)]',
        'mb-[1.6rem]',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
