import type { BookSearchTarget } from '@/features/books/types/book-search'
import { Input } from '@/shared/ui/Input'
import { cn } from '@/shared/utils/cn'

type BookSearchFormProps = {
  query: string
  target: BookSearchTarget
  onQueryChange: (value: string) => void
  onTargetChange: (value: BookSearchTarget) => void
}

const targets: Array<{ value: BookSearchTarget; label: string }> = [
  { value: 'title', label: '제목' },
  { value: 'author', label: '저자' },
]

export function BookSearchForm({
  query,
  target,
  onQueryChange,
  onTargetChange,
}: BookSearchFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {targets.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onTargetChange(item.value)}
            className={cn(
              'h-9 rounded-full px-3 text-sm font-medium transition',
              target === item.value
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-muted)] border border-[var(--color-border)]',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder={
          target === 'title' ? '책 제목을 검색하세요' : '저자 이름을 검색하세요'
        }
        aria-label={target === 'title' ? '제목 검색' : '저자 검색'}
      />
    </div>
  )
}
