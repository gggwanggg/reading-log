import type { BookSearchItem } from '@/features/books/types/book-search'
import { Button } from '@/shared/ui/Button'

type BookSearchResultItemProps = {
  item: BookSearchItem
  isSaving: boolean
  isSaved: boolean
  onSave: (item: BookSearchItem) => void
}

export function BookSearchResultItem({
  item,
  isSaving,
  isSaved,
  onSave,
}: BookSearchResultItemProps) {
  return (
    <article className="flex gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
      <div className="flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-accent-soft)] text-[10px] text-[var(--color-accent)]">
        {item.coverUrl ? (
          <img
            src={item.coverUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          'BOOK'
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold">{item.title}</h3>
        <p className="mt-0.5 truncate text-xs text-[var(--color-muted)]">
          {item.author ?? '저자 미상'}
          {item.publishedYear ? ` · ${item.publishedYear}` : ''}
        </p>
        <div className="mt-2">
          <Button
            type="button"
            variant={isSaved ? 'secondary' : 'primary'}
            className="h-9 px-3 text-xs"
            disabled={isSaving || isSaved}
            onClick={() => onSave(item)}
          >
            {isSaved ? '저장됨' : isSaving ? '저장 중…' : '내 책장에 담기'}
          </Button>
        </div>
      </div>
    </article>
  )
}
