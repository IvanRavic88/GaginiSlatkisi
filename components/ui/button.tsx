import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type Variant = 'full' | 'outline'

const variantClass: Record<Variant, string> = {
  full:
    'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] focus-visible:ring-[var(--color-accent-dark)]',
  outline:
    'bg-white text-[var(--color-text-dark)] shadow-[inset_0_0_0_3px_var(--color-accent)] hover:bg-[var(--color-primary)] focus-visible:ring-[var(--color-accent)]',
}

const base =
  'inline-flex items-center justify-center gap-[0.8rem] rounded-[var(--radius-default)] ' +
  'px-[2.4rem] py-[1.6rem] text-[1.6rem] font-semibold ' +
  'transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-60'

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  href?: undefined
}

interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  href: string
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

export function Button({ variant = 'full', className, ...rest }: ButtonProps) {
  const classes = cn(base, variantClass[variant], className)

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest
    return <Link href={href} className={classes} {...anchorRest} />
  }

  return <button type="button" className={classes} {...(rest as ButtonAsButtonProps)} />
}
