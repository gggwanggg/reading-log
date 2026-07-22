import { AppError, toAppError } from '@/shared/api/errors'
import { env } from '@/shared/config/env'
import type {
  BookSearchItem,
  BookSearchParams,
} from '@/features/books/types/book-search'

type GoogleBooksVolume = {
  id: string
  volumeInfo?: {
    title?: string
    authors?: string[]
    publishedDate?: string
    imageLinks?: {
      thumbnail?: string
      smallThumbnail?: string
    }
  }
}

type GoogleBooksResponse = {
  totalItems?: number
  items?: GoogleBooksVolume[]
  error?: {
    message?: string
    code?: number
  }
}

function buildQuery({ query, target }: BookSearchParams) {
  const trimmed = query.trim()
  if (target === 'title') return `intitle:${trimmed}`
  return `inauthor:${trimmed}`
}

function toHttps(url?: string) {
  if (!url) return null
  return url.replace(/^http:\/\//i, 'https://')
}

function mapVolume(volume: GoogleBooksVolume): BookSearchItem | null {
  const title = volume.volumeInfo?.title?.trim()
  if (!title) return null

  const authors = volume.volumeInfo?.authors?.filter(Boolean) ?? []
  const publishedDate = volume.volumeInfo?.publishedDate ?? null

  return {
    externalId: volume.id,
    title,
    author: authors.length > 0 ? authors.join(', ') : null,
    coverUrl: toHttps(
      volume.volumeInfo?.imageLinks?.thumbnail ??
        volume.volumeInfo?.imageLinks?.smallThumbnail,
    ),
    publishedYear: publishedDate ? publishedDate.slice(0, 4) : null,
  }
}

export const bookSearchApi = {
  async search(params: BookSearchParams): Promise<BookSearchItem[]> {
    const query = params.query.trim()
    if (query.length < 2) {
      return []
    }

    const searchParams = new URLSearchParams({
      q: buildQuery({ ...params, query }),
      maxResults: '12',
      printType: 'books',
      orderBy: 'relevance',
    })

    if (env.googleBooksApiKey) {
      searchParams.set('key', env.googleBooksApiKey)
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?${searchParams.toString()}`,
      )

      const payload = (await response.json()) as GoogleBooksResponse

      if (!response.ok || payload.error) {
        throw new AppError(
          payload.error?.message ?? '도서 검색에 실패했습니다.',
          'BOOK_SEARCH_FAILED',
          payload.error?.code ?? response.status,
        )
      }

      return (payload.items ?? [])
        .map(mapVolume)
        .filter((item): item is BookSearchItem => item !== null)
    } catch (error) {
      if (error instanceof AppError) throw error
      throw toAppError(error, '도서 검색 중 오류가 발생했습니다.')
    }
  },
}
