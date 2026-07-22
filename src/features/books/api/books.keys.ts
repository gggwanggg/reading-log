import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'

export const bookKeys = {
  all: ROOT_QUERY_KEYS.books,
  lists: () => [...bookKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...bookKeys.lists(), filters ?? {}] as const,
  details: () => [...bookKeys.all, 'detail'] as const,
  detail: (id: string) => [...bookKeys.details(), id] as const,
}
