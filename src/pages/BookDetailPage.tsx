import { useParams } from 'react-router-dom'
import { useBookQuery } from '@/features/books'
import { MemoList } from '@/features/memos'
import { AppHeader } from '@/shared/ui/AppHeader'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { BOOK_STATUS_LABEL } from '@/shared/constants/book-status'

export function BookDetailPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError, refetch } = useBookQuery(id)

  return (
    <div>
      <AppHeader title="책 상세" />
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : null}
        {isError ? <ErrorState onRetry={() => void refetch()} /> : null}
        {data ? (
          <div className="flex flex-col gap-6">
            <section>
              <h2 className="text-xl font-semibold">{data.title}</h2>
              <p className="text-sm text-[var(--color-muted)]">
                {data.author ?? '저자 미상'}
              </p>
              <p className="mt-2 text-sm text-[var(--color-accent)]">
                {BOOK_STATUS_LABEL[data.status]}
              </p>
            </section>
            <section>
              <h3 className="mb-3 text-sm font-semibold">이 책의 메모</h3>
              <MemoList bookId={data.id} />
            </section>
          </div>
        ) : null}
      </div>
    </div>
  )
}
