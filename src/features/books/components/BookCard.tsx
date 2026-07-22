import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { BookCover, BookStatusBadge } from '@/features/books/components/BookCover'
import { BookDeleteButton } from '@/features/books/components/BookDeleteButton'
import { prefetchBookDetail } from '@/features/books/api/books.cache'
import type { Book } from '@/features/books/types/book'
import { bookDetailPath } from '@/shared/constants/routes'

type BookCardProps = {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  const queryClient = useQueryClient()

  return (
    <Link
      to={bookDetailPath(book.id)}
      onMouseEnter={() => prefetchBookDetail(queryClient, book.id)}
      onTouchStart={() => prefetchBookDetail(queryClient, book.id)}
      className="group relative flex flex-col border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] shadow-[3px_3px_0_0_var(--color-pixel)] transition active:translate-x-px active:translate-y-px active:shadow-none"
    >
      <div className="relative p-3 pb-0">
        <BookDeleteButton
          bookId={book.id}
          bookTitle={book.title}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center border-2 border-[var(--color-pixel)] bg-[var(--color-peach)] text-xs font-bold"
        />
        <BookCover book={book} size="md" />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <div className="flex items-start gap-1.5">
          <p className="min-w-0 flex-1 line-clamp-2 text-sm font-extrabold leading-snug">
            {book.title}
          </p>
          <BookStatusBadge status={book.status} />
        </div>
        <p className="truncate text-xs text-[var(--color-muted)]">
          {book.author ?? '저자 미상'}
        </p>
      </div>
    </Link>
  )
}
