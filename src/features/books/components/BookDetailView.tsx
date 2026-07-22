import { useNavigate } from 'react-router-dom'
import { BookCover } from '@/features/books/components/BookCover'
import { BookDeleteButton } from '@/features/books/components/BookDeleteButton'
import { BookStatusPicker } from '@/features/books/components/BookStatusPicker'
import type { Book } from '@/features/books/types/book'
import { MemoList } from '@/features/memos'
import { PixelPanel } from '@/shared/ui/PixelPanel'
import { PixelTitle } from '@/shared/ui/PixelTitle'
import { ROUTES } from '@/shared/constants/routes'
import { formatDate } from '@/shared/utils/date'

type BookDetailViewProps = {
  book: Book
}

export function BookDetailView({ book }: BookDetailViewProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-5 animate-fade-up">
      <PixelPanel tone="sky" className="flex gap-4">
        <BookCover book={book} size="lg" className="shrink-0" />
        <div className="min-w-0 flex-1 pt-1">
          <PixelTitle as="h2" size="sm" className="leading-relaxed">
            {book.title}
          </PixelTitle>
          <p className="mt-2 text-sm font-semibold text-[var(--color-muted)]">
            {book.author ?? '저자 미상'}
          </p>
          <div className="mt-3">
            <BookStatusPicker bookId={book.id} status={book.status} />
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)]">
            등록 {formatDate(book.created_at)}
          </p>
        </div>
      </PixelPanel>

      <BookDeleteButton
        bookId={book.id}
        bookTitle={book.title}
        variant="button"
        className="w-full"
        onDeleted={() => navigate(ROUTES.books, { replace: true })}
      />

      <section>
        <PixelTitle as="h3" size="sm" className="mb-3">
          이 책의 메모
        </PixelTitle>
        <MemoList bookId={book.id} />
      </section>
    </div>
  )
}
