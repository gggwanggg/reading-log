import { useState } from 'react'
import { useDeleteMemoMutation } from '@/features/memos/hooks/useMemos'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'

type MemoDeleteButtonProps = {
  memoId: string
  preview: string
  onDeleted?: () => void
  variant?: 'icon' | 'button'
  className?: string
}

export function MemoDeleteButton({
  memoId,
  preview,
  onDeleted,
  variant = 'icon',
  className,
}: MemoDeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const deleteMemo = useDeleteMemoMutation()

  const handleDelete = () => {
    deleteMemo.mutate(memoId, {
      onSuccess: () => {
        setOpen(false)
        onDeleted?.()
      },
    })
  }

  return (
    <>
      {variant === 'icon' ? (
        <button
          type="button"
          aria-label="메모 삭제"
          className={className}
          onClick={() => setOpen(true)}
        >
          삭제
        </button>
      ) : (
        <Button
          type="button"
          variant="secondary"
          className={className}
          onClick={() => setOpen(true)}
        >
          메모 삭제
        </Button>
      )}

      <Modal open={open} title="메모를 삭제할까요?" onClose={() => setOpen(false)}>
        <p className="text-sm text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-ink)]">
            {preview.length > 40 ? `${preview.slice(0, 40)}…` : preview}
          </span>
          을(를) 삭제합니다.
        </p>
        {deleteMemo.error ? (
          <p className="mt-2 text-sm text-red-600">{deleteMemo.error.message}</p>
        ) : null}
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => setOpen(false)}
            disabled={deleteMemo.isPending}
          >
            취소
          </Button>
          <Button
            type="button"
            className="flex-1 bg-red-600"
            onClick={handleDelete}
            disabled={deleteMemo.isPending}
          >
            {deleteMemo.isPending ? '삭제 중…' : '삭제'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
