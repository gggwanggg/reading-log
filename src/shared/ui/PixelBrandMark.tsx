import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type PixelBrandMarkProps = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'h-10 w-10',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
} as const

/** 브랜드 픽셀 마크 — CSS만으로 책 실루엣 */
export function PixelBrandMark({
  className,
  size = 'md',
  ...props
}: PixelBrandMarkProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center border-2 border-[var(--color-pixel)] bg-[var(--color-sun)] shadow-[3px_3px_0_0_var(--color-pixel)]',
        sizeClass[size],
        className,
      )}
      aria-hidden
      {...props}
    >
      <div className="relative h-[55%] w-[48%]">
        <div className="absolute inset-y-0 left-0 w-[46%] border border-[var(--color-pixel)] bg-[var(--color-peach)]" />
        <div className="absolute inset-y-0 right-0 w-[46%] border border-[var(--color-pixel)] bg-[var(--color-accent-soft)]" />
        <div className="absolute inset-y-[12%] left-1/2 w-[12%] -translate-x-1/2 bg-[var(--color-pixel)]" />
      </div>
    </div>
  )
}
