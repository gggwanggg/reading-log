import { supabase } from '@/shared/lib/supabase/client'
import { toAppError } from '@/shared/api/errors'
import type { Tables } from '@/shared/types/database'

export type Tag = Tables<'tags'>

export type TagInsert = {
  name: string
  color?: string | null
}

export const tagsApi = {
  async list() {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })
    if (error) throw toAppError(error, '태그 목록을 불러오지 못했습니다.')
    return data as Tag[]
  },

  async create(input: TagInsert, userId: string) {
    const { data, error } = await supabase
      .from('tags')
      .insert({ ...input, user_id: userId })
      .select('*')
      .single()
    if (error) throw toAppError(error, '태그를 추가하지 못했습니다.')
    return data as Tag
  },

  async remove(id: string) {
    const { error } = await supabase.from('tags').delete().eq('id', id)
    if (error) throw toAppError(error, '태그를 삭제하지 못했습니다.')
  },
}
