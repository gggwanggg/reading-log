import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'
import type { BookSearchParams } from '@/features/books/types/book-search'

export const bookSearchKeys = {
  all: [...ROOT_QUERY_KEYS.books, 'search'] as const,
  lists: () => [...bookSearchKeys.all, 'list'] as const,
  list: (params: BookSearchParams) => [...bookSearchKeys.lists(), params] as const,
}
