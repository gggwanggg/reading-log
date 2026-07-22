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
        'inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-ink)] transition hover:bg-black/5',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
