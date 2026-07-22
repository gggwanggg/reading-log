import type { PropsWithChildren } from 'react'
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
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-md rounded-2xl bg-[var(--color-surface)] p-4 shadow-xl',
        )}
      >
        {title ? <h2 className="mb-3 text-lg font-semibold">{title}</h2> : null}
        {children}
      </div>
    </div>
  )
}
