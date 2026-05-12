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
        'inline-block text-[1.6rem] font-medium uppercase tracking-[0.75px] text-[var(--color-accent-dark)]',
        'mb-[1.6rem]',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
