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

export type NoteGraphNode = GraphNode & {
  content: string
  bookTitle?: string | null
  tagIds: string[]
}

export type NoteGraphLink = GraphLink & {
  sharedTagIds: string[]
}

export type NoteForGraph = {
  id: string
  content: string
  books?: { title?: string | null } | null
  note_tags?: Array<{ tag_id: string }>
}

function uniqueSorted(ids: string[]) {
  return [...new Set(ids)].sort()
}

function truncateLabel(text: string, max = 18) {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= max) return normalized
  return `${normalized.slice(0, max)}…`
}

/**
 * 지식 정원 그래프 데이터 생성
 * - Node: Book Note
 * - Edge: 하나 이상의 동일 Tag를 공유하는 Note 쌍 (weight = 공유 태그 수)
 */
export function buildKnowledgeGardenGraph(notes: NoteForGraph[]): {
  nodes: NoteGraphNode[]
  links: NoteGraphLink[]
} {
  const nodes: NoteGraphNode[] = notes.map((note) => {
    const tagIds = uniqueSorted((note.note_tags ?? []).map((row) => row.tag_id))
    const bookTitle = note.books?.title ?? null
    const labelSource = bookTitle || note.content || '메모'

    return {
      id: note.id,
      name: truncateLabel(labelSource),
      content: note.content,
      bookTitle,
      tagIds,
      val: Math.max(1, tagIds.length),
    }
  })

  const links: NoteGraphLink[] = []

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const left = nodes[i]
      const right = nodes[j]
      if (!left || !right) continue

      const rightSet = new Set(right.tagIds)
      const sharedTagIds = left.tagIds.filter((id) => rightSet.has(id))
      if (sharedTagIds.length === 0) continue

      links.push({
        source: left.id,
        target: right.id,
        weight: sharedTagIds.length,
        sharedTagIds,
      })
    }
  }

  return { nodes, links }
}

type TaggedItem = {
  tagIds: string[]
}

/**
 * @deprecated 태그 공출현 그래프용. 지식 정원은 buildKnowledgeGardenGraph를 사용하세요.
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
