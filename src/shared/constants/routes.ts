export const ROUTES = {
  home: '/',
  login: '/login',
  authCallback: '/auth/callback',
  books: '/books',
  bookDetail: '/books/:id',
  memoNew: '/memos/new',
  tags: '/tags',
  graph: '/graph',
  streak: '/streak',
} as const

export function bookDetailPath(id: string) {
  return `/books/${id}`
}
