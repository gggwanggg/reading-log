import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { memosApi, type MemoInsert, type MemoWithRelations } from '@/features/memos/api/memos.api'
import { memoKeys } from '@/features/memos/api/memos.keys'
import { useAuth } from '@/shared/hooks/useAuth'
import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'
import { AppError } from '@/shared/api/errors'

const MEMO_STALE_TIME = 1000 * 60

async function invalidateMemoRelated(queryClient: ReturnType<typeof useQueryClient>) {
  await queryClient.invalidateQueries({ queryKey: memoKeys.all })
  await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.streak })
  await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.graph })
}

export function useMemosQuery(filters?: { bookId?: string }) {
  return useQuery({
    queryKey: memoKeys.list(filters),
    queryFn: () => memosApi.list(filters),
    staleTime: MEMO_STALE_TIME,
  })
}

export function useMemoQuery(id: string) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: memoKeys.detail(id),
    queryFn: () => memosApi.getById(id),
    enabled: Boolean(id),
    staleTime: MEMO_STALE_TIME,
    initialData: () => {
      const lists = queryClient.getQueriesData<MemoWithRelations[]>({
        queryKey: memoKeys.lists(),
      })
      for (const [, memos] of lists) {
        const found = memos?.find((memo) => memo.id === id)
        if (found) return found
      }
      return undefined
    },
  })
}

export function useCreateMemoMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (input: MemoInsert) => {
      if (!user) throw new AppError('로그인이 필요합니다.', 'AUTH_REQUIRED')
      return memosApi.create(input, user.id)
    },
    onSuccess: (memo) => {
      queryClient.setQueryData(memoKeys.detail(memo.id), memo)
    },
    onSettled: async () => {
      await invalidateMemoRelated(queryClient)
    },
  })
}

export function useUpdateMemoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<MemoInsert> }) =>
      memosApi.update(id, input),
    onSuccess: (memo) => {
      queryClient.setQueryData(memoKeys.detail(memo.id), memo)
    },
    onSettled: async () => {
      await invalidateMemoRelated(queryClient)
    },
  })
}

export function useDeleteMemoMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => memosApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: memoKeys.all })

      const previousLists = queryClient.getQueriesData<MemoWithRelations[]>({
        queryKey: memoKeys.lists(),
      })
      const previousDetail = queryClient.getQueryData<MemoWithRelations>(
        memoKeys.detail(id),
      )

      queryClient.setQueriesData<MemoWithRelations[]>(
        { queryKey: memoKeys.lists() },
        (previous) => previous?.filter((memo) => memo.id !== id),
      )
      queryClient.removeQueries({ queryKey: memoKeys.detail(id) })

      return { previousLists, previousDetail, id }
    },
    onError: (_error, _id, context) => {
      if (!context) return
      context.previousLists.forEach(([key, data]) => {
        queryClient.setQueryData(key, data)
      })
      if (context.previousDetail) {
        queryClient.setQueryData(memoKeys.detail(context.id), context.previousDetail)
      }
    },
    onSettled: async () => {
      await invalidateMemoRelated(queryClient)
    },
  })
}
