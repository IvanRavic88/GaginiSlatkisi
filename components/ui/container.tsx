import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav'
}

export function Container({ as: Tag = 'div', className, children, ...rest }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full max-w-[120rem] px-[1.6rem] sm:px-[2.4rem] md:px-[3.2rem]',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
