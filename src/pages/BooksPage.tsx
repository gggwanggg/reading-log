import { BookForm, BookList } from '@/features/books'
import { AppHeader } from '@/shared/ui/AppHeader'

export function BooksPage() {
  return (
    <div>
      <AppHeader title="내 책장" />
      <div className="flex flex-col gap-6 p-4">
        <BookForm />
        <BookList />
      </div>
    </div>
  )
}
