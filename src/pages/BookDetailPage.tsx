import { useNavigate, useParams } from 'react-router-dom'
import { BookDetailView, useBookQuery } from '@/features/books'
import { AppHeader } from '@/shared/ui/AppHeader'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { ROUTES } from '@/shared/constants/routes'

export function BookDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch, isFetching } = useBookQuery(id)

  return (
    <div>
      <AppHeader title="책 상세" onBack={() => navigate(ROUTES.books)} />
      <div className="p-4 pb-8">
        {isLoading && !data ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : null}

        {isError && !data ? <ErrorState onRetry={() => void refetch()} /> : null}

        {data ? (
          <div className="relative">
            {isFetching ? (
              <div className="absolute right-0 top-0 opacity-50">
                <Spinner />
              </div>
            ) : null}
            <BookDetailView book={data} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
