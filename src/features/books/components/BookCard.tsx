import { Link } from 'react-router-dom'
import type { Book } from '@/features/books/types/book'
import { BOOK_STATUS_LABEL } from '@/shared/constants/book-status'
import { bookDetailPath } from '@/shared/constants/routes'

type BookCardProps = {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      to={bookDetailPath(book.id)}
      className="flex gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
    >
      <div className="flex h-16 w-12 items-center justify-center rounded-lg bg-[var(--color-accent-soft)] text-xs text-[var(--color-accent)]">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt=""
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          'BOOK'
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{book.title}</p>
        <p className="truncate text-sm text-[var(--color-muted)]">
          {book.author ?? '저자 미상'}
        </p>
        <p className="mt-1 text-xs text-[var(--color-accent)]">
          {BOOK_STATUS_LABEL[book.status]}
        </p>
      </div>
    </Link>
  )
}
