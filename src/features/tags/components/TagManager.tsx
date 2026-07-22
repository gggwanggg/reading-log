import { useState } from 'react'
import { TagInput } from '@/features/tags/components/TagInput'
import {
  useDeleteTagMutation,
  useResolveTagIdsMutation,
  useTagsQuery,
  useUpdateTagMutation,
} from '@/features/tags/hooks/useTags'
import type { TagOption } from '@/features/tags/api/tags.api'
import { EmptyState } from '@/shared/ui/EmptyState'
import { ErrorState } from '@/shared/ui/ErrorState'
import { Spinner } from '@/shared/ui/Spinner'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

export function TagManager() {
  const tagsQuery = useTagsQuery()
  const resolveTagIds = useResolveTagIdsMutation()
  const updateTag = useUpdateTagMutation()
  const deleteTag = useDeleteTagMutation()
  const [draft, setDraft] = useState<TagOption[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const tags = tagsQuery.data ?? []
  const suggestions: TagOption[] = tags.map((tag) => ({ id: tag.id, name: tag.name }))

  const handleSaveDraft = async () => {
    setMessage(null)
    if (draft.length === 0) {
      setMessage('추가할 태그를 입력해 주세요.')
      return
    }

    try {
      await resolveTagIds.mutateAsync(draft)
      setDraft([])
      setMessage('태그를 저장했습니다.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '태그 저장에 실패했습니다.')
    }
  }

  const handleRename = async (id: string) => {
    try {
      await updateTag.mutateAsync({ id, input: { name: editingName } })
      setEditingId(null)
      setEditingName('')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '태그 수정에 실패했습니다.')
    }
  }

  if (tagsQuery.isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    )
  }

  if (tagsQuery.isError) {
    return <ErrorState onRetry={() => void tagsQuery.refetch()} />
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">태그 추가</h2>
        <TagInput
          value={draft}
          onChange={setDraft}
          suggestions={suggestions}
          placeholder="새 태그 입력"
        />
        <Button
          type="button"
          onClick={() => void handleSaveDraft()}
          disabled={resolveTagIds.isPending || draft.length === 0}
        >
          {resolveTagIds.isPending ? '저장 중…' : '태그 저장'}
        </Button>
        {message ? <p className="text-xs text-[var(--color-muted)]">{message}</p> : null}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold">내 태그 ({tags.length})</h2>
        {tags.length === 0 ? (
          <EmptyState
            title="태그가 없습니다"
            description="위에서 태그를 추가하거나 메모 작성 시 만들 수 있습니다."
          />
        ) : (
          <ul className="flex flex-col gap-2">
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2"
              >
                {editingId === tag.id ? (
                  <Input
                    value={editingName}
                    onChange={(event) => setEditingName(event.target.value)}
                    className="h-9 flex-1"
                    autoFocus
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault()
                        void handleRename(tag.id)
                      }
                      if (event.key === 'Escape') {
                        setEditingId(null)
                      }
                    }}
                  />
                ) : (
                  <span className="min-w-0 flex-1 truncate text-sm">{tag.name}</span>
                )}

                {editingId === tag.id ? (
                  <button
                    type="button"
                    className="shrink-0 text-xs font-medium text-[var(--color-accent)]"
                    onClick={() => void handleRename(tag.id)}
                  >
                    저장
                  </button>
                ) : (
                  <button
                    type="button"
                    className="shrink-0 text-xs text-[var(--color-ink)]"
                    onClick={() => {
                      setEditingId(tag.id)
                      setEditingName(tag.name)
                      setMessage(null)
                    }}
                  >
                    수정
                  </button>
                )}
                <button
                  type="button"
                  className="shrink-0 text-xs text-red-600"
                  disabled={deleteTag.isPending}
                  onClick={() => deleteTag.mutate(tag.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
        {deleteTag.error ? (
          <p className="text-xs text-red-600">{deleteTag.error.message}</p>
        ) : null}
      </section>
    </div>
  )
}
