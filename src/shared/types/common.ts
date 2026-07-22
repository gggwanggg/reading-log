export type { Database, Tables, Json } from '@/shared/lib/supabase/types'

export type Id = string

export type Timestamps = {
  created_at: string
  updated_at: string
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}
