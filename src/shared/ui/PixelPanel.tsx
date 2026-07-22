import type { PropsWithChildren, HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

type PixelPanelProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    tone?: 'cream' | 'mint' | 'peach' | 'sky' | 'lilac'
  }
>

const toneClass = {
  cream: 'bg-[var(--color-surface)]',
  mint: 'bg-[var(--color-accent-soft)]',
  peach: 'bg-[var(--color-peach-soft)]',
  sky: 'bg-[var(--color-sky-soft)]',
  lilac: 'bg-[var(--color-lilac-soft)]',
} as const

/** 픽셀 테두리 패널 — 힐링 게임 UI 기본 컨테이너 */
export function PixelPanel({
  children,
  className,
  tone = 'cream',
  ...props
}: PixelPanelProps) {
  return (
    <div
      className={cn(
        'border-2 border-[var(--color-pixel)] p-4',
        'shadow-[3px_3px_0_0_var(--color-pixel)]',
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
