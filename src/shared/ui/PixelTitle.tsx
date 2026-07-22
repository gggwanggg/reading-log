import type { PropsWithChildren, HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type PixelTitleProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3'
    size?: 'sm' | 'md' | 'lg'
  }
>

const sizeClass = {
  sm: 'text-[10px] leading-relaxed',
  md: 'text-xs leading-relaxed',
  lg: 'text-sm leading-loose sm:text-base',
} as const

export function PixelTitle({
  children,
  className,
  as: Tag = 'h1',
  size = 'md',
  ...props
}: PixelTitleProps) {
  return (
    <Tag
      className={cn(
        'font-[family-name:var(--font-pixel)] text-[var(--color-ink)]',
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
