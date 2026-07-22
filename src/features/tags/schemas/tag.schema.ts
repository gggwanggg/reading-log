import { z } from 'zod'

export const tagSchema = z.object({
  name: z.string().min(1, '태그 이름을 입력해 주세요.').max(30),
  color: z.string().nullable().optional(),
})

export type TagInput = z.infer<typeof tagSchema>
