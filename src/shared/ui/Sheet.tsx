import type { PropsWithChildren } from 'react'
import { cn } from '@/shared/utils/cn'

type SheetProps = PropsWithChildren<{
  open: boolean
  title?: string
  onClose: () => void
}>

export function Sheet({ open, title, onClose, children }: SheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-auto rounded-t-2xl bg-[var(--color-surface)] p-4 shadow-xl',
        )}
      >
        {title ? <h2 className="mb-3 text-lg font-semibold">{title}</h2> : null}
        {children}
      </div>
    </div>
  )
}
