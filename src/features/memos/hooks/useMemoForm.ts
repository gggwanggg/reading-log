import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memoSchema, type MemoInput } from '@/features/memos/schemas/memo.schema'
import { toDateKey } from '@/shared/utils/date'

export function useMemoForm(defaultBookId?: string | null) {
  return useForm<MemoInput>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      content: '',
      book_id: defaultBookId ?? null,
      note_date: toDateKey(new Date()),
      tagIds: [],
    },
  })
}
