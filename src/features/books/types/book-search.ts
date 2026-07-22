export type BookSearchTarget = 'title' | 'author'

export type BookSearchItem = {
  externalId: string
  title: string
  author: string | null
  coverUrl: string | null
  publishedYear: string | null
}

export type BookSearchParams = {
  query: string
  target: BookSearchTarget
}
