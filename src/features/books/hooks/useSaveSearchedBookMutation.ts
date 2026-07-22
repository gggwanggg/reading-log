import { useMutation, useQueryClient } from '@tanstack/react-query'
import { booksApi } from '@/features/books/api/books.api'
import { upsertBookCache } from '@/features/books/api/books.cache'
import { bookKeys } from '@/features/books/api/books.keys'
import type { BookSearchItem } from '@/features/books/types/book-search'
import { BOOK_STATUS } from '@/shared/constants/book-status'
import { useAuth } from '@/shared/hooks/useAuth'
import { AppError } from '@/shared/api/errors'

export function useSaveSearchedBookMutation() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: (item: BookSearchItem) => {
      if (!user) {
        throw new AppError('로그인이 필요합니다.', 'AUTH_REQUIRED')
      }

      return booksApi.create(
        {
          title: item.title,
          author: item.author,
          cover_url: item.coverUrl,
          status: BOOK_STATUS.wishlist,
        },
        user.id,
      )
    },
    onSuccess: (book) => {
      upsertBookCache(queryClient, book)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: bookKeys.lists() })
    },
  })
}
