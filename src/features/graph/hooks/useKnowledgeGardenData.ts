import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { memosApi } from '@/features/memos/api/memos.api'
import { ROOT_QUERY_KEYS } from '@/shared/constants/query-keys'
import { buildNoteGraph } from '@/features/graph/utils/build-note-graph'

export function useKnowledgeGardenData() {
  const query = useQuery({
    queryKey: [...ROOT_QUERY_KEYS.graph, 'knowledge-garden'] as const,
    queryFn: () => memosApi.list(),
    staleTime: 1000 * 60,
  })

  const graph = useMemo(() => {
    if (!query.data) return { nodes: [], links: [] }
    return buildNoteGraph(query.data)
  }, [query.data])

  return {
    ...query,
    graph,
    noteCount: query.data?.length ?? 0,
    linkCount: graph.links.length,
  }
}
