import { BookSearchResultItem } from '@/features/books/components/BookSearchResultItem'
import type { BookSearchItem } from '@/features/books/types/book-search'
import { EmptyState } from '@/shared/ui/EmptyState'

type BookSearchResultsProps = {
  items: BookSearchItem[]
  savingId: string | null
  savedIds: Set<string>
  onSave: (item: BookSearchItem) => void
}

export function BookSearchResults({
  items,
  savingId,
  savedIds,
  onSave,
}: BookSearchResultsProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="검색 결과가 없습니다"
        description="다른 제목이나 저자로 다시 검색해 보세요."
      />
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.externalId}>
          <BookSearchResultItem
            item={item}
            isSaving={savingId === item.externalId}
            isSaved={savedIds.has(item.externalId)}
            onSave={onSave}
          />
        </li>
      ))}
    </ul>
  )
}
