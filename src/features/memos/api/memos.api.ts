import { supabase } from '@/shared/lib/supabase/client'
import { toAppError } from '@/shared/api/errors'
import type { Tables } from '@/shared/types/database'

export type Memo = Tables<'book_notes'>

export type MemoBook = {
  id: string
  title: string
  author: string | null
}

export type MemoWithRelations = Memo & {
  note_tags?: Array<{
    tag_id: string
    tags?: { id: string; name: string; color: string | null } | null
  }>
  books?: MemoBook | null
}

export type MemoInsert = {
  content: string
  book_id: string
  note_date?: string
  tagIds?: string[]
}

const MEMO_SELECT =
  '*, note_tags(tag_id, tags(id, name, color)), books(id, title, author)'

export const memosApi = {
  async list(filters?: { bookId?: string }) {
    let query = supabase
      .from('book_notes')
      .select(MEMO_SELECT)
      .order('note_date', { ascending: false })

    if (filters?.bookId) {
      query = query.eq('book_id', filters.bookId)
    }

    const { data, error } = await query
    if (error) throw toAppError(error, '메모 목록을 불러오지 못했습니다.')
    return data as MemoWithRelations[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('book_notes')
      .select(MEMO_SELECT)
      .eq('id', id)
      .single()
    if (error) throw toAppError(error, '메모를 불러오지 못했습니다.')
    return data as MemoWithRelations
  },

  async create(input: MemoInsert, userId: string) {
    const { tagIds = [], ...noteInput } = input
    const { data, error } = await supabase
      .from('book_notes')
      .insert({ ...noteInput, user_id: userId })
      .select(MEMO_SELECT)
      .single()
    if (error) throw toAppError(error, '메모를 저장하지 못했습니다.')

    if (tagIds.length > 0) {
      const { error: tagError } = await supabase.from('note_tags').insert(
        tagIds.map((tag_id) => ({
          note_id: (data as Memo).id,
          tag_id,
        })),
      )
      if (tagError) throw toAppError(tagError, '태그 연결에 실패했습니다.')
    }

    return data as MemoWithRelations
  },

  async update(id: string, input: Partial<MemoInsert>) {
    const { tagIds, ...noteInput } = input
    const { data, error } = await supabase
      .from('book_notes')
      .update(noteInput)
      .eq('id', id)
      .select(MEMO_SELECT)
      .single()
    if (error) throw toAppError(error, '메모를 수정하지 못했습니다.')

    if (tagIds) {
      await supabase.from('note_tags').delete().eq('note_id', id)
      if (tagIds.length > 0) {
        const { error: tagError } = await supabase
          .from('note_tags')
          .insert(tagIds.map((tag_id) => ({ note_id: id, tag_id })))
        if (tagError) throw toAppError(tagError, '태그 연결에 실패했습니다.')
      }
    }

    return data as MemoWithRelations
  },

  async remove(id: string) {
    const { error } = await supabase.from('book_notes').delete().eq('id', id)
    if (error) throw toAppError(error, '메모를 삭제하지 못했습니다.')
  },
}
