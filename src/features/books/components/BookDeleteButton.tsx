import { useState } from 'react'
import { useDeleteBookMutation } from '@/features/books/hooks/useBooks'
import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'

type BookDeleteButtonProps = {
  bookId: string
  bookTitle: string
  onDeleted?: () => void
  variant?: 'icon' | 'button'
  className?: string
}

export function BookDeleteButton({
  bookId,
  bookTitle,
  onDeleted,
  variant = 'icon',
  className,
}: BookDeleteButtonProps) {
  const [open, setOpen] = useState(false)
  const deleteBook = useDeleteBookMutation()

  const handleDelete = () => {
    deleteBook.mutate(bookId, {
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
          aria-label={`${bookTitle} 삭제`}
          className={className}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setOpen(true)
          }}
        >
          ✕
        </button>
      ) : (
        <Button
          type="button"
          variant="secondary"
          className={className}
          onClick={() => setOpen(true)}
        >
          서재에서 삭제
        </Button>
      )}

      <Modal open={open} title="책을 삭제할까요?" onClose={() => setOpen(false)}>
        <p className="text-sm text-[var(--color-muted)]">
          <span className="font-medium text-[var(--color-ink)]">{bookTitle}</span>을(를)
          서재에서 제거합니다. 연결된 메모의 책 정보는 비워질 수 있습니다.
        </p>
        {deleteBook.error ? (
          <p className="mt-2 text-sm text-red-600">{deleteBook.error.message}</p>
        ) : null}
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => setOpen(false)}
            disabled={deleteBook.isPending}
          >
            취소
          </Button>
          <Button
            type="button"
            className="flex-1 bg-red-600"
            onClick={handleDelete}
            disabled={deleteBook.isPending}
          >
            {deleteBook.isPending ? '삭제 중…' : '삭제'}
          </Button>
        </div>
      </Modal>
    </>
  )
}
