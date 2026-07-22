import { MemoItem } from '@/features/memos/components/MemoItem'
import { useMemosQuery } from '@/features/memos/hooks/useMemos'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import type { Memo } from '@/features/memos/types/memo'

type MemoListProps = {
  bookId?: string
}

export function MemoList({ bookId }: MemoListProps) {
  const { data, isLoading, isError, refetch } = useMemosQuery(
    bookId ? { bookId } : undefined,
  )

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
    return <EmptyState title="메모가 없습니다" description="한 줄 메모를 남겨 보세요." />
  }

  return (
    <ul className="flex flex-col gap-3">
      {data.map((memo) => (
        <li key={(memo as Memo).id}>
          <MemoItem memo={memo as Memo} />
        </li>
      ))}
    </ul>
  )
}
