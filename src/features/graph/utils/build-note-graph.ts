import {
  buildKnowledgeGardenGraph,
  type NoteForGraph,
  type NoteGraphLink,
  type NoteGraphNode,
} from '@/shared/utils/graph'

export type { NoteGraphLink, NoteGraphNode, NoteForGraph }

/**
 * 지식 정원용 Graph Data 생성 함수
 * Node = Book Note, Edge = 동일 Tag를 공유하는 Note
 */
export function buildNoteGraph(notes: NoteForGraph[]) {
  return buildKnowledgeGardenGraph(notes)
}
