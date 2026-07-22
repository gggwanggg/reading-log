import { BookCard } from '@/features/books/components/BookCard'
import { useBooksQuery } from '@/features/books/hooks/useBooks'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'

export function BookList() {
  const { data, isLoading, isError, refetch } = useBooksQuery()

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="아직 등록된 책이 없습니다"
        description="첫 책을 추가해 보세요."
      />
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {data.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  )
}
