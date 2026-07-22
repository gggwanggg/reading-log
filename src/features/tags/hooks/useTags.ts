import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { tagsApi, type TagInsert } from '@/features/tags/api/tags.api'
import { tagKeys } from '@/features/tags/api/tags.keys'
import { useAuth } from '@/shared/hooks/useAuth'

export function useTagsQuery() {
  return useQuery({
    queryKey: tagKeys.list(),
    queryFn: () => tagsApi.list(),
  })
}

export function useCreateTagMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (input: TagInsert) => {
      if (!user) throw new Error('로그인이 필요합니다.')
      return tagsApi.create(input, user.id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: tagKeys.all })
    },
  })
}
