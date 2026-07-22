import type { Book } from '@/features/books/types/book'
import { BOOK_STATUS_CLASS, BOOK_STATUS_LABEL } from '@/shared/constants/book-status'
import { cn } from '@/shared/utils/cn'

type BookCoverProps = {
  book: Pick<Book, 'title' | 'cover_url'>
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'h-28 w-[4.5rem]',
  md: 'aspect-[2/3] w-full',
  lg: 'h-48 w-32',
} as const

export function BookCover({ book, className, size = 'md' }: BookCoverProps) {
  return (
    <div
      className={cn(
        'overflow-hidden border-2 border-[var(--color-pixel)] bg-[var(--color-accent-soft)] text-center text-[10px] font-bold text-[var(--color-accent-deep)] shadow-[2px_2px_0_0_var(--color-pixel)]',
        sizeClass[size],
        className,
      )}
    >
      {book.cover_url ? (
        <img
          src={book.cover_url}
          alt=""
          className="h-full w-full object-cover [image-rendering:auto]"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-2">
          {book.title.slice(0, 8)}
        </div>
      )}
    </div>
  )
}

export function BookStatusBadge({ status }: { status: Book['status'] }) {
  return (
    <span
      className={cn(
        'inline-flex w-fit shrink-0 whitespace-nowrap px-1.5 py-0.5 text-[10px] font-bold',
        BOOK_STATUS_CLASS[status],
      )}
    >
      {BOOK_STATUS_LABEL[status]}
    </span>
  )
}
