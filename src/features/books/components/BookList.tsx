import { BookCard } from '@/features/books/components/BookCard'
import { useBooksQuery } from '@/features/books/hooks/useBooks'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'

export function BookList() {
  const { data, isLoading, isError, isFetching, refetch } = useBooksQuery()

  if (isLoading && !data) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (isError && !data) {
    return <ErrorState onRetry={() => void refetch()} />
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="서재가 비어 있습니다"
        description="도서를 검색해 첫 책을 등록해 보세요."
      />
    )
  }

  return (
    <div className="relative">
      {isFetching && !isLoading ? (
        <div className="absolute right-0 -top-1 opacity-40">
          <Spinner />
        </div>
      ) : null}

      <ul className="grid grid-cols-2 gap-3">
        {data.map((book) => (
          <li key={book.id}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  )
}
