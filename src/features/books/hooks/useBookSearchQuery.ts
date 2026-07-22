import { useQuery } from '@tanstack/react-query'
import { bookSearchApi } from '@/features/books/api/book-search.api'
import { bookSearchKeys } from '@/features/books/api/book-search.keys'
import type { BookSearchTarget } from '@/features/books/types/book-search'
import { useDebounce } from '@/shared/hooks/useDebounce'

const MIN_QUERY_LENGTH = 2
const DEBOUNCE_MS = 400

export function useBookSearchQuery(query: string, target: BookSearchTarget) {
  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_MS)
  const enabled = debouncedQuery.length >= MIN_QUERY_LENGTH

  const result = useQuery({
    queryKey: bookSearchKeys.list({ query: debouncedQuery, target }),
    queryFn: () => bookSearchApi.search({ query: debouncedQuery, target }),
    enabled,
  })

  return {
    ...result,
    debouncedQuery,
    isDebouncing: query.trim() !== debouncedQuery && query.trim().length >= MIN_QUERY_LENGTH,
    isQueryTooShort: query.trim().length > 0 && query.trim().length < MIN_QUERY_LENGTH,
    canSearch: enabled,
  }
}
