import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memosApi, type MemoInsert } from '@/features/memos/api/memos.api'
import { memoKeys } from '@/features/memos/api/memos.keys'
import { useAuth } from '@/shared/hooks/useAuth'
import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'

export function useMemosQuery(filters?: { bookId?: string }) {
  return useQuery({
    queryKey: memoKeys.list(filters),
    queryFn: () => memosApi.list(filters),
  })
}

export function useCreateMemoMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (input: MemoInsert) => {
      if (!user) throw new Error('로그인이 필요합니다.')
      return memosApi.create(input, user.id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: memoKeys.all })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.streak })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.graph })
    },
  })
}

export function useDeleteMemoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => memosApi.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: memoKeys.all })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.streak })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.graph })
    },
  })
}
