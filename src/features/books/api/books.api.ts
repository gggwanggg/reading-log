import { supabase } from '@/shared/lib/supabase/client'
import { toAppError } from '@/shared/api/errors'
import { STORAGE_BUCKETS } from '@/shared/constants/storage-buckets'
import { coverObjectPath } from '@/shared/utils/storage-path'
import type { Tables } from '@/shared/types/database'
import type { BookStatus } from '@/shared/constants/book-status'

export type Book = Tables<'books'>

export type BookInsert = {
  title: string
  author?: string | null
  cover_url?: string | null
  status?: BookStatus
  started_at?: string | null
  finished_at?: string | null
}

export const booksApi = {
  async list() {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('updated_at', { ascending: false })
    if (error) throw toAppError(error, '책 목록을 불러오지 못했습니다.')
    return data as Book[]
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('books').select('*').eq('id', id).single()
    if (error) throw toAppError(error, '책 정보를 불러오지 못했습니다.')
    return data as Book
  },

  async create(input: BookInsert, userId: string) {
    const { data, error } = await supabase
      .from('books')
      .insert({ ...input, user_id: userId })
      .select('*')
      .single()
    if (error) throw toAppError(error, '책을 추가하지 못했습니다.')
    return data as Book
  },

  async update(id: string, input: Partial<BookInsert>) {
    const { data, error } = await supabase
      .from('books')
      .update(input)
      .eq('id', id)
      .select('*')
      .single()
    if (error) throw toAppError(error, '책을 수정하지 못했습니다.')
    return data as Book
  },

  async remove(id: string) {
    const { error } = await supabase.from('books').delete().eq('id', id)
    if (error) throw toAppError(error, '책을 삭제하지 못했습니다.')
  },

  async uploadCover(userId: string, bookId: string, file: File) {
    const path = coverObjectPath(userId, bookId, file.name)
    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.covers)
      .upload(path, file, {
        upsert: true,
      })
    if (error) throw toAppError(error, '표지 업로드에 실패했습니다.')

    const { data } = supabase.storage.from(STORAGE_BUCKETS.covers).getPublicUrl(path)
    return data.publicUrl
  },
}
