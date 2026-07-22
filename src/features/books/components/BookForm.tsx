import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookSchema, type BookInput } from '@/features/books/schemas/book.schema'
import { useCreateBookMutation } from '@/features/books/hooks/useBooks'
import { BOOK_STATUS, BOOK_STATUS_LABEL } from '@/shared/constants/book-status'
import { Button } from '@/shared/ui/Button'
import { FormField } from '@/shared/ui/FormField'
import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'

type BookFormProps = {
  onSuccess?: () => void
}

export function BookForm({ onSuccess }: BookFormProps) {
  const createBook = useCreateBookMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookInput>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      status: BOOK_STATUS.reading,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    await createBook.mutateAsync({
      title: values.title,
      author: values.author || null,
      status: values.status,
    })
    reset()
    onSuccess?.()
  })

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <FormField label="제목" error={errors.title?.message}>
        <Input {...register('title')} />
      </FormField>
      <FormField label="저자" error={errors.author?.message}>
        <Input {...register('author')} />
      </FormField>
      <FormField label="상태" error={errors.status?.message}>
        <Select {...register('status')}>
          {Object.values(BOOK_STATUS).map((status) => (
            <option key={status} value={status}>
              {BOOK_STATUS_LABEL[status]}
            </option>
          ))}
        </Select>
      </FormField>
      <Button type="submit" disabled={createBook.isPending}>
        {createBook.isPending ? '저장 중…' : '책 추가'}
      </Button>
    </form>
  )
}
