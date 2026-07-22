import { Chip } from '@/shared/ui/Chip'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { useTagsQuery } from '@/features/tags/hooks/useTags'

export function TagList() {
  const { data, isLoading, isError, refetch } = useTagsQuery()

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
        title="태그가 없습니다"
        description="메모에 붙일 태그를 만들어 보세요."
      />
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {data.map((tag) => (
        <Chip key={tag.id}>{tag.name}</Chip>
      ))}
    </div>
  )
}
