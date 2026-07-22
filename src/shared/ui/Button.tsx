import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/shared/utils/cn'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'peach'
  }
>

export function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-11 items-center justify-center border-2 border-[var(--color-pixel)] px-4 text-sm font-bold transition',
        'shadow-[3px_3px_0_0_var(--color-pixel)]',
        'active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' &&
          'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-deep)]',
        variant === 'secondary' &&
          'bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-bg-soft)]',
        variant === 'peach' &&
          'bg-[var(--color-peach)] text-[var(--color-ink)] hover:brightness-105',
        variant === 'ghost' &&
          'border-transparent bg-transparent text-[var(--color-muted)] shadow-none active:translate-x-0 active:translate-y-0',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
