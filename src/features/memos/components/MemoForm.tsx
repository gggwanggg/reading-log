import { useCreateMemoMutation } from '@/features/memos/hooks/useMemos'
import { useMemoForm } from '@/features/memos/hooks/useMemoForm'
import { Button } from '@/shared/ui/Button'
import { FormField } from '@/shared/ui/FormField'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'

type MemoFormProps = {
  bookId?: string | null
  onSuccess?: () => void
}

export function MemoForm({ bookId, onSuccess }: MemoFormProps) {
  const createMemo = useCreateMemoMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useMemoForm(bookId)

  const onSubmit = handleSubmit(async (values) => {
    await createMemo.mutateAsync({
      content: values.content,
      book_id: values.book_id ?? null,
      note_date: values.note_date,
      tagIds: values.tagIds,
    })
    reset()
    onSuccess?.()
  })

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <FormField label="한 줄 메모" error={errors.content?.message}>
        <Textarea {...register('content')} placeholder="오늘 읽은 구절을 남겨 보세요" />
      </FormField>
      <FormField label="날짜" error={errors.note_date?.message}>
        <Input type="date" {...register('note_date')} />
      </FormField>
      <Button type="submit" disabled={createMemo.isPending}>
        {createMemo.isPending ? '저장 중…' : '메모 저장'}
      </Button>
    </form>
  )
}
