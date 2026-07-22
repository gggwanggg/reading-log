export type GraphNode = {
  id: string
  name: string
  val?: number
  color?: string | null
}

export type GraphLink = {
  source: string
  target: string
  weight: number
}

type TaggedItem = {
  tagIds: string[]
}

/**
 * 같은 아이템에 함께 등장한 태그 쌍을 엣지로 변환합니다.
 */
export function buildCoOccurrenceGraph(
  items: TaggedItem[],
  tagMeta: Record<string, { name: string; color?: string | null }>,
): { nodes: GraphNode[]; links: GraphLink[] } {
  const weightMap = new Map<string, number>()
  const usedTagIds = new Set<string>()

  for (const item of items) {
    const unique = [...new Set(item.tagIds)].sort()
    unique.forEach((id) => usedTagIds.add(id))

    for (let i = 0; i < unique.length; i += 1) {
      for (let j = i + 1; j < unique.length; j += 1) {
        const key = `${unique[i]}::${unique[j]}`
        weightMap.set(key, (weightMap.get(key) ?? 0) + 1)
      }
    }
  }

  const nodes: GraphNode[] = [...usedTagIds].map((id) => ({
    id,
    name: tagMeta[id]?.name ?? id,
    color: tagMeta[id]?.color,
    val: 1,
  }))

  const links: GraphLink[] = [...weightMap.entries()].map(([key, weight]) => {
    const [source, target] = key.split('::')
    return { source, target, weight }
  })

  return { nodes, links }
}
