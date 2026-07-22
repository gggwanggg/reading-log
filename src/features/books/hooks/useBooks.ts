import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { booksApi, type BookInsert } from '@/features/books/api/books.api'
import { bookKeys } from '@/features/books/api/books.keys'
import { useAuth } from '@/shared/hooks/useAuth'

export function useBooksQuery() {
  return useQuery({
    queryKey: bookKeys.list(),
    queryFn: () => booksApi.list(),
  })
}

export function useBookQuery(id: string) {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => booksApi.getById(id),
    enabled: Boolean(id),
  })
}

export function useCreateBookMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (input: BookInsert) => {
      if (!user) throw new Error('로그인이 필요합니다.')
      return booksApi.create(input, user.id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.all })
    },
  })
}

export function useUpdateBookMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<BookInsert> }) =>
      booksApi.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.all })
      await queryClient.invalidateQueries({ queryKey: bookKeys.detail(variables.id) })
    },
  })
}

export function useDeleteBookMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => booksApi.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.all })
    },
  })
}
