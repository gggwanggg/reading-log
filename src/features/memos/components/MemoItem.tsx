import { formatDate } from '@/shared/utils/date'
import type { Memo } from '@/features/memos/types/memo'

type MemoItemProps = {
  memo: Memo & { tags?: Array<{ id: string; name: string }> }
}

export function MemoItem({ memo }: MemoItemProps) {
  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <p className="text-sm leading-relaxed">{memo.content}</p>
      <p className="mt-2 text-xs text-[var(--color-muted)]">
        {formatDate(memo.note_date)}
      </p>
    </article>
  )
}
