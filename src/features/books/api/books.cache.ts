import type { QueryClient } from '@tanstack/react-query'
import { bookKeys } from '@/features/books/api/books.keys'
import type { Book } from '@/features/books/types/book'

export function findBookInListCache(queryClient: QueryClient, id: string) {
  const lists = queryClient.getQueriesData<Book[]>({ queryKey: bookKeys.lists() })

  for (const [, books] of lists) {
    const found = books?.find((book) => book.id === id)
    if (found) return found
  }

  return undefined
}

export function getCachedBook(queryClient: QueryClient, id: string) {
  return (
    queryClient.getQueryData<Book>(bookKeys.detail(id)) ??
    findBookInListCache(queryClient, id)
  )
}

export function upsertBookCache(queryClient: QueryClient, book: Book) {
  queryClient.setQueryData(bookKeys.detail(book.id), book)

  queryClient.setQueriesData<Book[]>({ queryKey: bookKeys.lists() }, (previous) => {
    if (!previous) return [book]

    const index = previous.findIndex((item) => item.id === book.id)
    if (index === -1) return [book, ...previous]

    const next = [...previous]
    next[index] = book
    return next
  })
}

export function removeBookCache(queryClient: QueryClient, id: string) {
  queryClient.setQueriesData<Book[]>({ queryKey: bookKeys.lists() }, (previous) =>
    previous?.filter((book) => book.id !== id),
  )
  queryClient.removeQueries({ queryKey: bookKeys.detail(id) })
}

export function prefetchBookDetail(queryClient: QueryClient, id: string) {
  const cached = getCachedBook(queryClient, id)
  if (cached) {
    queryClient.setQueryData(bookKeys.detail(id), cached)
  }
}
