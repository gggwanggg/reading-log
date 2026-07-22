import type { PropsWithChildren, HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type PixelBadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: 'mint' | 'peach' | 'sky' | 'lilac' | 'sun'
  }
>

const toneClass = {
  mint: 'bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]',
  peach: 'bg-[var(--color-peach-soft)] text-[#b87a68]',
  sky: 'bg-[var(--color-sky-soft)] text-[#5a8ab0]',
  lilac: 'bg-[var(--color-lilac-soft)] text-[#7a6a98]',
  sun: 'bg-[var(--color-sun)] text-[#8a7a3a]',
} as const

export function PixelBadge({
  children,
  className,
  tone = 'mint',
  ...props
}: PixelBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center border border-[var(--color-pixel)] px-1.5 py-0.5 text-[10px] font-bold tracking-wide',
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
