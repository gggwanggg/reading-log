import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'

export const memoKeys = {
  all: ROOT_QUERY_KEYS.memos,
  lists: () => [...memoKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...memoKeys.lists(), filters ?? {}] as const,
  details: () => [...memoKeys.all, 'detail'] as const,
  detail: (id: string) => [...memoKeys.details(), id] as const,
}
