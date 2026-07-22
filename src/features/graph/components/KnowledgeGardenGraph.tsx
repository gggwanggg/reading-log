import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d'
import { useKnowledgeGardenData } from '@/features/graph/hooks/useKnowledgeGardenData'
import type { NoteGraphLink, NoteGraphNode } from '@/features/graph/utils/build-note-graph'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { Button } from '@/shared/ui/Button'
import { ROUTES } from '@/shared/constants/routes'

type GraphNodeObject = NoteGraphNode & {
  x?: number
  y?: number
}

type GraphLinkObject = Omit<NoteGraphLink, 'source' | 'target'> & {
  source: string | GraphNodeObject
  target: string | GraphNodeObject
}

export function KnowledgeGardenGraph() {
  const { graph, isLoading, isError, refetch, noteCount, linkCount } =
    useKnowledgeGardenData()
  const graphRef = useRef<ForceGraphMethods<GraphNodeObject, GraphLinkObject> | undefined>(
    undefined,
  )
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 320, height: 420 })
  const didFitRef = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateSize = () => {
      const rect = el.getBoundingClientRect()
      setSize({
        width: Math.max(280, Math.floor(rect.width)),
        height: Math.max(360, Math.floor(rect.height)),
      })
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    didFitRef.current = false
  }, [graph.nodes.length, graph.links.length])

  useEffect(() => {
    if (!graph.nodes.length || !graphRef.current || didFitRef.current) return
    const timer = window.setTimeout(() => {
      graphRef.current?.zoomToFit(400, 48)
      didFitRef.current = true
    }, 350)
    return () => window.clearTimeout(timer)
  }, [graph, size.width, size.height])

  const handleZoomIn = useCallback(() => {
    const current = graphRef.current?.zoom() ?? 1
    graphRef.current?.zoom(current * 1.25, 200)
  }, [])

  const handleZoomOut = useCallback(() => {
    const current = graphRef.current?.zoom() ?? 1
    graphRef.current?.zoom(current / 1.25, 200)
  }, [])

  const handleFit = useCallback(() => {
    graphRef.current?.zoomToFit(300, 48)
  }, [])

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

  if (noteCount === 0) {
    return (
      <div className="flex flex-col gap-4">
        <EmptyState
          title="지식 정원이 비어 있습니다"
          description="기록 탭에서 메모를 작성하고 태그를 붙이면 노트가 연결됩니다."
        />
        <Link to={ROUTES.memoNew}>
          <Button type="button" className="w-full">
            메모 작성하기
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-[var(--color-muted)]">
          노트 {noteCount} · 연결 {linkCount}
          {linkCount === 0 ? ' (공통 태그가 있으면 선이 생깁니다)' : ''}
        </p>
        <div className="flex gap-1">
          <Button
            type="button"
            variant="secondary"
            className="h-8 w-8 px-0 text-sm"
            onClick={handleZoomOut}
            aria-label="축소"
          >
            −
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="h-8 w-8 px-0 text-sm"
            onClick={handleZoomIn}
            aria-label="확대"
          >
            +
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="h-8 px-2 text-xs"
            onClick={handleFit}
          >
            맞춤
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[min(62dvh,520px)] touch-none overflow-hidden border-2 border-[var(--color-pixel)] bg-[var(--color-surface)] shadow-[3px_3px_0_0_var(--color-pixel)]"
      >
        <ForceGraph2D
          ref={graphRef}
          width={size.width}
          height={size.height}
          graphData={graph}
          backgroundColor="rgba(0,0,0,0)"
          nodeId="id"
          nodeLabel={(node) => {
            const item = node as GraphNodeObject
            const book = item.bookTitle ? `${item.bookTitle}\n` : ''
            return `${book}${item.content}`
          }}
          linkLabel={(link) => {
            const item = link as GraphLinkObject
            return `공유 태그 ${item.weight}개`
          }}
          nodeRelSize={6}
          nodeVal={(node) => (node as GraphNodeObject).val ?? 1}
          linkWidth={(link) => Math.max(1, (link as GraphLinkObject).weight)}
          linkColor={() => 'rgba(110, 181, 160, 0.45)'}
          enableNodeDrag
          enableZoomInteraction
          enablePanInteraction
          cooldownTicks={80}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const item = node as GraphNodeObject
            const x = item.x ?? 0
            const y = item.y ?? 0
            const radius = 5 + Math.min(4, (item.val ?? 1) * 0.8)
            const fontSize = Math.max(10, 12 / globalScale)

            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
            ctx.fillStyle = '#6eb5a0'
            ctx.fill()
            ctx.strokeStyle = '#5c7a72'
            ctx.lineWidth = 2 / globalScale
            ctx.stroke()

            ctx.font = `${fontSize}px Nunito, sans-serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'top'
            ctx.fillStyle = '#3d4f4a'
            ctx.fillText(item.name, x, y + radius + 2)
          }}
          nodePointerAreaPaint={(node, color, ctx) => {
            const item = node as GraphNodeObject
            const radius = 10 + Math.min(4, (item.val ?? 1) * 0.8)
            ctx.beginPath()
            ctx.arc(item.x ?? 0, item.y ?? 0, radius, 0, 2 * Math.PI, false)
            ctx.fillStyle = color
            ctx.fill()
          }}
        />
      </div>

      <p className="text-[11px] leading-relaxed text-[var(--color-muted)]">
        드래그로 노드 이동 · 핀치/버튼으로 확대·축소 · 빈 곳을 밀어 이동할 수 있습니다.
      </p>
    </div>
  )
}
