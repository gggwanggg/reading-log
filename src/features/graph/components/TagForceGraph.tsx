import { useRef, useEffect } from 'react'
import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d'
import { useTagGraphData } from '@/features/graph/hooks/useTagGraphData'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'

export function TagForceGraph() {
  const { graph, isLoading, isError, refetch } = useTagGraphData()
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !graphRef.current) return
    graphRef.current.zoomToFit(400, 40)
  }, [graph])

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return <ErrorState onRetry={() => void refetch()} />
  }

  if (!graph.nodes.length) {
    return (
      <EmptyState
        title="그래프를 그릴 태그가 없습니다"
        description="메모에 태그를 두 개 이상 붙이면 연결이 생깁니다."
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-[60dvh] overflow-hidden rounded-2xl bg-[var(--color-surface)]"
    >
      <ForceGraph2D
        ref={graphRef}
        graphData={graph}
        nodeLabel="name"
        nodeAutoColorBy="id"
        linkWidth={(link) => Math.max(1, (link as { weight?: number }).weight ?? 1)}
        backgroundColor="rgba(0,0,0,0)"
      />
    </div>
  )
}
