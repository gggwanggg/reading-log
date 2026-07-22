import { z } from 'zod'

export const memoSchema = z.object({
  content: z
    .string()
    .min(1, '한 줄 메모를 입력해 주세요.')
    .max(280, '280자 이내로 작성해 주세요.'),
  book_id: z.string().uuid().nullable().optional(),
  note_date: z.string().min(1, '날짜를 선택해 주세요.'),
  tagIds: z.array(z.string().uuid()),
})

export type MemoInput = z.infer<typeof memoSchema>
