import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'

export const tagKeys = {
  all: ROOT_QUERY_KEYS.tags,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: () => [...tagKeys.lists()] as const,
}
