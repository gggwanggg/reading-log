import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import { cn } from '@/shared/utils/cn'

type IconButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>

export function IconButton({
  children,
  className,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center border-2 border-transparent text-[var(--color-ink)] transition',
        'hover:border-[var(--color-pixel)] hover:bg-[var(--color-accent-soft)]',
        'active:translate-x-px active:translate-y-px',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
