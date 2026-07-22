import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'min-h-28 w-full border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] px-3 py-2 text-sm outline-none',
        'shadow-[2px_2px_0_0_var(--color-pixel)] focus:bg-[var(--color-bg-soft)]',
        className,
      )}
      {...props}
    />
  )
}
