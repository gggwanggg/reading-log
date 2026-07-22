import type { PropsWithChildren } from 'react'
import { PixelTitle } from '@/shared/ui/PixelTitle'
import { cn } from '@/shared/utils/cn'

type ModalProps = PropsWithChildren<{
  open: boolean
  title?: string
  onClose: () => void
}>

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="닫기"
        className="absolute inset-0 bg-[var(--color-pixel)]/35"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-md border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] p-4',
          'shadow-[4px_4px_0_0_var(--color-pixel)] animate-pixel-pop',
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
