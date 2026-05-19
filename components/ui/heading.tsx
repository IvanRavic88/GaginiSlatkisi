import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'sweet'
}

const variantClass: Record<NonNullable<HeadingProps['variant']>, string> = {
  primary:
    'font-sans text-[3.6rem] sm:text-[4.4rem] md:text-[5.2rem] font-bold leading-[1.1] md:leading-[1.05] tracking-[-0.5px] text-[var(--color-text-dark)]',
  secondary:
    'font-sans text-[3rem] sm:text-[3.6rem] md:text-[4.4rem] font-bold leading-[1.2] tracking-[-0.5px] text-[var(--color-text-dark)]',
  tertiary:
    'font-sans text-[2.4rem] sm:text-[2.7rem] md:text-[3rem] font-bold leading-[1.2] tracking-[-0.5px] text-[var(--color-text-dark)]',
  sweet:
    'font-sans text-[2.8rem] sm:text-[3.2rem] md:text-[3.6rem] font-bold leading-[1.2] tracking-[-0.5px] text-[var(--color-text-dark)]',
}

export function Heading({
  as: Tag = 'h2',
  variant = 'secondary',
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag className={cn(variantClass[variant], className)} {...rest}>
      {children}
    </Tag>
  )
}
