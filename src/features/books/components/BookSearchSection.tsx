import { useState } from 'react'
import { BookSearchForm } from '@/features/books/components/BookSearchForm'
import { BookSearchResults } from '@/features/books/components/BookSearchResults'
import { BookSearchStatus } from '@/features/books/components/BookSearchStatus'
import { useBookSearchQuery } from '@/features/books/hooks/useBookSearchQuery'
import { useSaveSearchedBookMutation } from '@/features/books/hooks/useSaveSearchedBookMutation'
import type {
  BookSearchItem,
  BookSearchTarget,
} from '@/features/books/types/book-search'

export function BookSearchSection() {
  const [query, setQuery] = useState('')
  const [target, setTarget] = useState<BookSearchTarget>('title')
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set())
  const [saveError, setSaveError] = useState<string | null>(null)

  const search = useBookSearchQuery(query, target)
  const saveBook = useSaveSearchedBookMutation()

  const showResults =
    search.canSearch && !search.isDebouncing && search.isSuccess && !search.isError

  const handleSave = (item: BookSearchItem) => {
    setSaveError(null)
    saveBook.mutate(item, {
      onSuccess: () => {
        setSavedIds((prev) => new Set(prev).add(item.externalId))
      },
      onError: (error) => {
        setSaveError(error instanceof Error ? error.message : '책 저장에 실패했습니다.')
      },
    })
  }

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold">도서 검색</h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          Google Books로 검색하고 내 책장에 저장합니다.
        </p>
      </div>

      <BookSearchForm
        query={query}
        target={target}
        onQueryChange={setQuery}
        onTargetChange={setTarget}
      />

      {saveError ? <p className="text-sm text-red-600">{saveError}</p> : null}

      {showResults ? (
        <BookSearchResults
          items={search.data ?? []}
          savingId={
            saveBook.isPending && saveBook.variables
              ? saveBook.variables.externalId
              : null
          }
          savedIds={savedIds}
          onSave={handleSave}
        />
      ) : (
        <BookSearchStatus
          isIdle={query.trim().length === 0}
          isQueryTooShort={search.isQueryTooShort}
          isDebouncing={search.isDebouncing}
          isLoading={search.isLoading || (search.canSearch && search.isFetching)}
          isError={search.isError}
          errorMessage={search.error instanceof Error ? search.error.message : undefined}
          onRetry={() => void search.refetch()}
        />
      )}
    </section>
  )
}
