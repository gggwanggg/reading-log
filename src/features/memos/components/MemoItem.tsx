import { Link } from 'react-router-dom'
import { MemoDeleteButton } from '@/features/memos/components/MemoDeleteButton'
import type { MemoWithRelations } from '@/features/memos/api/memos.api'
import { PixelBadge } from '@/shared/ui/PixelBadge'
import { memoEditPath } from '@/shared/constants/routes'
import { formatDate } from '@/shared/utils/date'

type MemoItemProps = {
  memo: MemoWithRelations
}

export function MemoItem({ memo }: MemoItemProps) {
  const tags =
    memo.note_tags
      ?.map((row) => row.tags)
      .filter((tag): tag is NonNullable<typeof tag> => Boolean(tag)) ?? []

  return (
    <article className="border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] p-4 shadow-[3px_3px_0_0_var(--color-pixel)]">
      <div className="mb-2 flex items-start justify-between gap-2">
        {memo.books?.title ? (
          <p className="min-w-0 flex-1 text-xs font-extrabold text-[var(--color-accent-deep)]">
            {memo.books.title}
          </p>
        ) : (
          <span />
        )}
        <div className="flex shrink-0 gap-2 text-xs font-bold">
          <Link
            to={memoEditPath(memo.id)}
            className="text-[var(--color-ink)] underline-offset-2 hover:underline"
          >
            수정
          </Link>
          <MemoDeleteButton
            memoId={memo.id}
            preview={memo.content}
            className="text-[var(--color-danger)]"
          />
        </div>
      </div>
      <p className="text-sm font-semibold leading-relaxed">{memo.content}</p>
      {tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <PixelBadge key={tag.id} tone="lilac">
              {tag.name}
            </PixelBadge>
          ))}
        </div>
      ) : null}
      <p className="mt-2 text-xs text-[var(--color-muted)]">{formatDate(memo.note_date)}</p>
    </article>
  )
}
