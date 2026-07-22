import { useState } from 'react'
import { BookList } from '@/features/books/components/BookList'
import { BookSearchSection } from '@/features/books/components/BookSearchSection'
import { useBooksQuery } from '@/features/books/hooks/useBooks'
import { AppHeader } from '@/shared/ui/AppHeader'
import { Button } from '@/shared/ui/Button'
import { PixelBadge } from '@/shared/ui/PixelBadge'
import { PixelPanel } from '@/shared/ui/PixelPanel'
import { Sheet } from '@/shared/ui/Sheet'

export function LibrarySection() {
  const [registerOpen, setRegisterOpen] = useState(false)
  const { data } = useBooksQuery()
  const count = data?.length ?? 0

  return (
    <>
      <AppHeader title="서재" />

      <div className="flex flex-col gap-4 p-4 pb-6 animate-fade-up">
        <PixelPanel tone="mint" className="flex items-end justify-between py-3">
          <div>
            <p className="text-xs font-bold text-[var(--color-muted)]">나의 책장</p>
            <p className="mt-1 text-2xl font-extrabold tabular-nums">{count}</p>
            <PixelBadge tone="mint" className="mt-2">
              BOOKS
            </PixelBadge>
          </div>
          <Button
            type="button"
            variant="primary"
            className="h-9 px-3 text-xs"
            onClick={() => setRegisterOpen(true)}
          >
            + 책 등록
          </Button>
        </PixelPanel>

        <BookList />
      </div>

      <Sheet open={registerOpen} title="책 등록" onClose={() => setRegisterOpen(false)}>
        <div className="pb-6">
          <BookSearchSection />
        </div>
      </Sheet>
    </>
  )
}
