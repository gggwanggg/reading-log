import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'h-11 w-full border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] px-3 text-sm outline-none',
        'shadow-[2px_2px_0_0_var(--color-pixel)] focus:bg-[var(--color-bg-soft)]',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
