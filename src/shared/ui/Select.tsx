import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'h-11 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm outline-none focus:border-[var(--color-accent)]',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
