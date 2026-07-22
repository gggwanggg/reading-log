import type { PropsWithChildren } from 'react'
import { PixelTitle } from '@/shared/ui/PixelTitle'
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
        className="absolute inset-0 bg-[var(--color-pixel)]/35"
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-auto border-t-2 border-[var(--color-pixel)] bg-[var(--color-surface)] p-4',
          'shadow-[0_-4px_0_0_var(--color-pixel)] animate-fade-up',
        )}
      >
        {title ? (
          <PixelTitle as="h2" size="sm" className="mb-3">
            {title}
          </PixelTitle>
        ) : null}
        {children}
      </div>
    </div>
  )
}
