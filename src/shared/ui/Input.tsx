import type { InputHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'h-11 w-full border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] px-3 text-sm outline-none',
        'shadow-[2px_2px_0_0_var(--color-pixel)] focus:bg-[var(--color-bg-soft)]',
        className,
      )}
      {...props}
    />
  )
}
