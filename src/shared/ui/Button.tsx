import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/shared/utils/cn'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost'
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
        'inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-medium transition disabled:opacity-50',
        variant === 'primary' && 'bg-[var(--color-accent)] text-white',
        variant === 'secondary' &&
          'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]',
        variant === 'ghost' && 'bg-transparent text-[var(--color-muted)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
