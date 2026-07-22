import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  tagsApi,
  type Tag,
  type TagInsert,
  type TagOption,
} from '@/features/tags/api/tags.api'
import { tagKeys } from '@/features/tags/api/tags.keys'
import { useAuth } from '@/shared/hooks/useAuth'
import { AppError } from '@/shared/api/errors'
import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'

export function useTagsQuery() {
  return useQuery({
    queryKey: tagKeys.list(),
    queryFn: () => tagsApi.list(),
    staleTime: 1000 * 60,
  })
}

export function useCreateTagMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (input: TagInsert) => {
      if (!user) throw new AppError('로그인이 필요합니다.', 'AUTH_REQUIRED')
      return tagsApi.create(input, user.id)
    },
    onSuccess: (tag) => {
      queryClient.setQueryData<Tag[]>(tagKeys.list(), (previous) => {
        if (!previous) return [tag]
        if (previous.some((item) => item.id === tag.id)) return previous
        return [...previous, tag].sort((a, b) => a.name.localeCompare(b.name, 'ko'))
      })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: tagKeys.all })
    },
  })
}

export function useUpdateTagMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<TagInsert> }) =>
      tagsApi.update(id, input),
    onSuccess: (tag) => {
      queryClient.setQueryData<Tag[]>(tagKeys.list(), (previous) =>
        previous
          ?.map((item) => (item.id === tag.id ? tag : item))
          .sort((a, b) => a.name.localeCompare(b.name, 'ko')),
      )
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: tagKeys.all })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.memos })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.graph })
    },
  })
}

export function useDeleteTagMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tagsApi.remove(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: tagKeys.all })
      const previous = queryClient.getQueryData<Tag[]>(tagKeys.list())
      queryClient.setQueryData<Tag[]>(tagKeys.list(), (current) =>
        current?.filter((tag) => tag.id !== id),
      )
      return { previous }
    },
    onError: (_error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(tagKeys.list(), context.previous)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: tagKeys.all })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.memos })
      await queryClient.invalidateQueries({ queryKey: ROOT_QUERY_KEYS.graph })
    },
  })
}

export function useResolveTagIdsMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (options: TagOption[]) => {
      if (!user) throw new AppError('로그인이 필요합니다.', 'AUTH_REQUIRED')
      return tagsApi.resolveIds(options, user.id)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: tagKeys.all })
    },
  })
}
