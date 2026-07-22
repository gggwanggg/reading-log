import { useNavigate, useParams } from 'react-router-dom'
import { MemoForm } from '@/features/memos'
import { useMemoQuery } from '@/features/memos/hooks/useMemos'
import { AppHeader } from '@/shared/ui/AppHeader'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { ROUTES } from '@/shared/constants/routes'

export function MemoEditPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, refetch } = useMemoQuery(id)

  return (
    <div>
      <AppHeader title="메모 수정" onBack={() => navigate(-1)} />
      <div className="p-4">
        {isLoading && !data ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : null}
        {isError && !data ? <ErrorState onRetry={() => void refetch()} /> : null}
        {data ? (
          <MemoForm memo={data} onSuccess={() => navigate(ROUTES.home)} />
        ) : null}
      </div>
    </div>
  )
}
