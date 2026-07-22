import { useUpdateBookMutation } from '@/features/books/hooks/useBooks'
import type { Book } from '@/features/books/types/book'
import {
  BOOK_STATUS,
  BOOK_STATUS_LABEL,
  BOOK_STATUS_SELECT_CLASS,
  type BookStatus,
} from '@/shared/constants/book-status'
import { cn } from '@/shared/utils/cn'

type BookStatusPickerProps = {
  bookId: string
  status: Book['status']
  className?: string
}

const STATUS_OPTIONS = Object.values(BOOK_STATUS)

export function BookStatusPicker({ bookId, status, className }: BookStatusPickerProps) {
  const updateBook = useUpdateBookMutation()

  const handleChange = (next: BookStatus) => {
    if (next === status) return
    updateBook.mutate({ id: bookId, input: { status: next } })
  }

  return (
    <div className={cn('inline-flex max-w-full flex-col gap-1', className)}>
      <label
        htmlFor={`book-status-${bookId}`}
        className="text-[11px] text-[var(--color-muted)]"
      >
        읽기 상태
      </label>
      <div className="relative inline-flex w-fit max-w-full">
        <select
          id={`book-status-${bookId}`}
          value={status}
          disabled={updateBook.isPending}
          onChange={(event) => handleChange(event.target.value as BookStatus)}
          className={cn(
            'h-8 w-fit max-w-full appearance-none rounded-full border field-sizing-content',
            'py-0 pl-2.5 pr-7 text-xs font-medium outline-none disabled:opacity-60',
            BOOK_STATUS_SELECT_CLASS[status],
          )}
          aria-label="읽기 상태 변경"
        >
          {STATUS_OPTIONS.map((value) => (
            <option key={value} value={value}>
              {BOOK_STATUS_LABEL[value]}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-70"
        >
          ▾
        </span>
      </div>
      {updateBook.isError ? (
        <p className="text-[11px] text-red-600">
          {updateBook.error instanceof Error
            ? updateBook.error.message
            : '상태 변경에 실패했습니다.'}
        </p>
      ) : null}
    </div>
  )
}
