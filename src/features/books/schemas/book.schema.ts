import { z } from 'zod'
import { BOOK_STATUS } from '@/shared/constants/book-status'

export const bookSchema = z.object({
  title: z.string().min(1, '제목을 입력해 주세요.'),
  author: z.string().optional(),
  status: z.enum([
    BOOK_STATUS.reading,
    BOOK_STATUS.finished,
    BOOK_STATUS.paused,
    BOOK_STATUS.wishlist,
  ]),
  started_at: z.string().nullable().optional(),
  finished_at: z.string().nullable().optional(),
})

export type BookInput = z.infer<typeof bookSchema>
