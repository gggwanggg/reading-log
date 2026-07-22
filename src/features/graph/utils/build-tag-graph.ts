import {
  buildCoOccurrenceGraph,
  type GraphLink,
  type GraphNode,
} from '@/shared/utils/graph'

type NoteWithTags = {
  note_tags?: Array<{ tag_id: string }>
}

type TagMeta = {
  id: string
  name: string
  color?: string | null
}

export function buildTagGraph(
  notes: NoteWithTags[],
  tags: TagMeta[],
): { nodes: GraphNode[]; links: GraphLink[] } {
  const tagMeta = Object.fromEntries(
    tags.map((tag) => [tag.id, { name: tag.name, color: tag.color }]),
  )

  const items = notes.map((note) => ({
    tagIds: (note.note_tags ?? []).map((row) => row.tag_id),
  }))

  return buildCoOccurrenceGraph(items, tagMeta)
}
