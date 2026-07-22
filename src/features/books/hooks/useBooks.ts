import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { booksApi, type BookInsert } from '@/features/books/api/books.api'
import {
  getCachedBook,
  removeBookCache,
  upsertBookCache,
} from '@/features/books/api/books.cache'
import { bookKeys } from '@/features/books/api/books.keys'
import type { Book } from '@/features/books/types/book'
import { useAuth } from '@/shared/hooks/useAuth'
import { AppError } from '@/shared/api/errors'

const BOOKS_STALE_TIME = 1000 * 60

export function useBooksQuery() {
  return useQuery({
    queryKey: bookKeys.list(),
    queryFn: () => booksApi.list(),
    staleTime: BOOKS_STALE_TIME,
    gcTime: 1000 * 60 * 30,
  })
}

export function useBookQuery(id: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => booksApi.getById(id),
    enabled: Boolean(id),
    staleTime: BOOKS_STALE_TIME,
    initialData: () => getCachedBook(queryClient, id),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(bookKeys.detail(id))?.dataUpdatedAt ??
      queryClient.getQueryState(bookKeys.list())?.dataUpdatedAt,
  })
}

export function useCreateBookMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (input: BookInsert) => {
      if (!user) throw new AppError('로그인이 필요합니다.', 'AUTH_REQUIRED')
      return booksApi.create(input, user.id)
    },
    onSuccess: (book) => {
      upsertBookCache(queryClient, book)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.lists() })
    },
  })
}

export function useUpdateBookMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<BookInsert> }) =>
      booksApi.update(id, input),
    onMutate: async ({ id, input }) => {
      await queryClient.cancelQueries({ queryKey: bookKeys.all })

      const previousDetail = queryClient.getQueryData<Book>(bookKeys.detail(id))
      const previousLists = queryClient.getQueriesData<Book[]>({
        queryKey: bookKeys.lists(),
      })
      const cached = getCachedBook(queryClient, id)

      if (cached) {
        upsertBookCache(queryClient, {
          ...cached,
          ...input,
          updated_at: new Date().toISOString(),
        })
      }

      return { previousDetail, previousLists }
    },
    onError: (_error, _variables, context) => {
      if (!context) return
      if (context.previousDetail) {
        queryClient.setQueryData(
          bookKeys.detail(context.previousDetail.id),
          context.previousDetail,
        )
      }
      context.previousLists.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
    },
    onSuccess: (book) => {
      upsertBookCache(queryClient, book)
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.lists() })
      await queryClient.invalidateQueries({ queryKey: bookKeys.detail(variables.id) })
    },
  })
}

export function useDeleteBookMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => booksApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: bookKeys.all })

      const previousDetail = queryClient.getQueryData<Book>(bookKeys.detail(id))
      const previousLists = queryClient.getQueriesData<Book[]>({
        queryKey: bookKeys.lists(),
      })

      removeBookCache(queryClient, id)

      return { previousDetail, previousLists, id }
    },
    onError: (_error, _id, context) => {
      if (!context) return
      context.previousLists.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
      if (context.previousDetail) {
        queryClient.setQueryData(bookKeys.detail(context.id), context.previousDetail)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.lists() })
    },
  })
}
