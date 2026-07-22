import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBooksQuery } from '@/features/books'
import {
  useCreateMemoMutation,
  useUpdateMemoMutation,
} from '@/features/memos/hooks/useMemos'
import { useMemoForm } from '@/features/memos/hooks/useMemoForm'
import type { MemoWithRelations } from '@/features/memos/api/memos.api'
import {
  useResolveTagIdsMutation,
  useTagsQuery,
  useUpdateTagMutation,
} from '@/features/tags'
import { TagInput } from '@/features/tags'
import type { TagOption } from '@/features/tags/api/tags.api'
import { Button } from '@/shared/ui/Button'
import { EmptyState } from '@/shared/ui/EmptyState'
import { FormField } from '@/shared/ui/FormField'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import { Spinner } from '@/shared/ui/Spinner'
import { Textarea } from '@/shared/ui/Textarea'
import { ROUTES } from '@/shared/constants/routes'
import { toDateKey } from '@/shared/utils/date'

type MemoFormProps = {
  memo?: MemoWithRelations
  bookId?: string | null
  onSuccess?: () => void
}

function tagsFromMemo(memo?: MemoWithRelations): TagOption[] {
  if (!memo?.note_tags) return []
  return memo.note_tags
    .map((row) =>
      row.tags
        ? { id: row.tags.id, name: row.tags.name }
        : { id: row.tag_id, name: row.tag_id },
    )
    .filter((tag) => Boolean(tag.name))
}

export function MemoForm({ memo, bookId, onSuccess }: MemoFormProps) {
  const isEdit = Boolean(memo)
  const booksQuery = useBooksQuery()
  const tagsQuery = useTagsQuery()
  const createMemo = useCreateMemoMutation()
  const updateMemo = useUpdateMemoMutation()
  const resolveTagIds = useResolveTagIdsMutation()
  const updateTag = useUpdateTagMutation()
  const [selectedTags, setSelectedTags] = useState<TagOption[]>(() => tagsFromMemo(memo))

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMemoForm({
    content: memo?.content ?? '',
    book_id: memo?.book_id ?? bookId ?? '',
    note_date: memo?.note_date ?? toDateKey(new Date()),
    tagIds: [],
  })

  useEffect(() => {
    if (!memo) return
    reset({
      content: memo.content,
      book_id: memo.book_id ?? '',
      note_date: memo.note_date,
      tagIds: [],
    })
    setSelectedTags(tagsFromMemo(memo))
  }, [memo, reset])

  const books = booksQuery.data ?? []
  const suggestions: TagOption[] = (tagsQuery.data ?? []).map((tag) => ({
    id: tag.id,
    name: tag.name,
  }))
  const isPending =
    createMemo.isPending ||
    updateMemo.isPending ||
    resolveTagIds.isPending ||
    updateTag.isPending
  const mutationError =
    createMemo.error ?? updateMemo.error ?? resolveTagIds.error ?? updateTag.error

  const onSubmit = handleSubmit(async (values) => {
    const tagIds = await resolveTagIds.mutateAsync(selectedTags)

    if (memo) {
      await updateMemo.mutateAsync({
        id: memo.id,
        input: {
          content: values.content,
          book_id: values.book_id,
          note_date: values.note_date,
          tagIds,
        },
      })
    } else {
      await createMemo.mutateAsync({
        content: values.content,
        book_id: values.book_id,
        note_date: values.note_date,
        tagIds,
      })
      reset({
        content: '',
        book_id: bookId ?? values.book_id,
        note_date: values.note_date,
        tagIds: [],
      })
      setSelectedTags([])
    }
    onSuccess?.()
  })

  if (booksQuery.isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    )
  }

  if (booksQuery.isError) {
    return (
      <EmptyState
        title="서재 책을 불러오지 못했습니다"
        description="잠시 후 다시 시도해 주세요."
      />
    )
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <EmptyState
          title="먼저 서재에 책을 등록해 주세요"
          description="메모는 서재에 있는 책 1권을 선택해 작성합니다."
        />
        <Link to={ROUTES.books}>
          <Button type="button" className="w-full">
            서재로 이동
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <FormField label="책 선택" error={errors.book_id?.message}>
        <Select {...register('book_id')}>
          <option value="" disabled>
            서재에서 책을 선택하세요
          </option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
              {book.author ? ` · ${book.author}` : ''}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="한 줄 메모" error={errors.content?.message}>
        <Textarea {...register('content')} placeholder="오늘 읽은 구절을 남겨 보세요" />
      </FormField>

      <FormField label="태그">
        <TagInput
          value={selectedTags}
          onChange={setSelectedTags}
          suggestions={suggestions}
          disabled={isPending}
          onEditTag={async (tag, nextName) => {
            if (!tag.id) return { name: nextName }
            const updated = await updateTag.mutateAsync({
              id: tag.id,
              input: { name: nextName },
            })
            return { id: updated.id, name: updated.name }
          }}
        />
      </FormField>

      <FormField label="날짜" error={errors.note_date?.message}>
        <Input type="date" {...register('note_date')} />
      </FormField>

      {mutationError ? (
        <p className="text-sm text-red-600">{mutationError.message}</p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? '저장 중…' : isEdit ? '메모 수정' : '메모 저장'}
      </Button>
    </form>
  )
}
