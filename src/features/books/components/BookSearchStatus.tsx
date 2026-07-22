import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'

type BookSearchStatusProps = {
  isIdle: boolean
  isQueryTooShort: boolean
  isDebouncing: boolean
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  onRetry?: () => void
}

export function BookSearchStatus({
  isIdle,
  isQueryTooShort,
  isDebouncing,
  isLoading,
  isError,
  errorMessage,
  onRetry,
}: BookSearchStatusProps) {
  if (isIdle) {
    return (
      <EmptyState
        title="책을 검색해 보세요"
        description="제목 또는 저자로 검색한 뒤 책장에 담을 수 있습니다."
      />
    )
  }

  if (isQueryTooShort) {
    return (
      <EmptyState
        title="글자를 조금 더 입력해 주세요"
        description="검색어는 2자 이상이어야 합니다."
      />
    )
  }

  if (isDebouncing || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <Spinner />
        <p className="text-sm text-[var(--color-muted)]">도서를 검색하는 중…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorState
        title="검색에 실패했습니다"
        description={errorMessage ?? '잠시 후 다시 시도해 주세요.'}
        onRetry={onRetry}
      />
    )
  }

  return null
}
