import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { memosApi } from '@/features/memos/api/memos.api'
import { tagsApi } from '@/features/tags/api/tags.api'
import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'
import { buildTagGraph } from '@/features/graph/utils/build-tag-graph'

export function useTagGraphData() {
  const query = useQuery({
    queryKey: [...ROOT_QUERY_KEYS.graph, 'tag-cooccurrence'] as const,
    queryFn: async () => {
      const [memos, tags] = await Promise.all([memosApi.list(), tagsApi.list()])
      return { memos, tags }
    },
  })

  const graph = useMemo(() => {
    if (!query.data) return { nodes: [], links: [] }
    return buildTagGraph(
      query.data.memos as Array<{ note_tags?: Array<{ tag_id: string }> }>,
      query.data.tags,
    )
  }, [query.data])

  return { ...query, graph }
}
