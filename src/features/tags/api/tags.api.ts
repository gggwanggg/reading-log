import { supabase } from '@/shared/lib/supabase/client'
import { toAppError } from '@/shared/api/errors'
import type { Tables } from '@/shared/types/database'

export type Tag = Tables<'tags'>

export type TagInsert = {
  name: string
  color?: string | null
}

export type TagOption = {
  id?: string
  name: string
}

export function normalizeTagName(name: string) {
  return name.trim().replace(/\s+/g, ' ')
}

export function isSameTagName(a: string, b: string) {
  return normalizeTagName(a).toLowerCase() === normalizeTagName(b).toLowerCase()
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
    const name = normalizeTagName(input.name)
    if (!name) throw toAppError(new Error('태그 이름이 비어 있습니다.'), 'TAG_EMPTY')

    const { data, error } = await supabase
      .from('tags')
      .insert({ ...input, name, user_id: userId })
      .select('*')
      .single()
    if (error) throw toAppError(error, '태그를 추가하지 못했습니다.')
    return data as Tag
  },

  async update(id: string, input: Partial<TagInsert>) {
    const payload = {
      ...input,
      ...(input.name != null ? { name: normalizeTagName(input.name) } : {}),
    }
    if (payload.name === '') {
      throw toAppError(new Error('태그 이름이 비어 있습니다.'), 'TAG_EMPTY')
    }

    const { data, error } = await supabase
      .from('tags')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single()
    if (error) throw toAppError(error, '태그를 수정하지 못했습니다.')
    return data as Tag
  },

  async remove(id: string) {
    const { error } = await supabase.from('tags').delete().eq('id', id)
    if (error) throw toAppError(error, '태그를 삭제하지 못했습니다.')
  },

  /** 이름 기준(대소문자 무시)으로 찾거나 생성. 중복 생성 방지. */
  async findOrCreateByName(name: string, userId: string, existing?: Tag[]) {
    const trimmed = normalizeTagName(name)
    if (!trimmed) throw toAppError(new Error('태그 이름이 비어 있습니다.'), 'TAG_EMPTY')

    const pool = existing ?? (await this.list())
    const found = pool.find((tag) => isSameTagName(tag.name, trimmed))
    if (found) return found

    return this.create({ name: trimmed }, userId)
  },

  async resolveIds(options: TagOption[], userId: string) {
    const existing = await this.list()
    const ids: string[] = []

    for (const option of options) {
      const trimmed = normalizeTagName(option.name)
      if (!trimmed) continue

      if (option.id) {
        const byId = existing.find((tag) => tag.id === option.id)
        if (byId) {
          ids.push(byId.id)
          continue
        }
      }

      const tag = await this.findOrCreateByName(trimmed, userId, existing)
      if (!existing.some((item) => item.id === tag.id)) {
        existing.push(tag)
      }
      if (!ids.includes(tag.id)) ids.push(tag.id)
    }

    return ids
  },
}
