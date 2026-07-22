export const ROUTES = {
  splash: '/splash',
  home: '/',
  login: '/login',
  authCallback: '/auth/callback',
  books: '/books',
  bookDetail: '/books/:id',
  memoNew: '/memos/new',
  memoEdit: '/memos/:id/edit',
  tags: '/tags',
  graph: '/graph',
  streak: '/streak',
  profile: '/profile',
} as const

export function bookDetailPath(id: string) {
  return `/books/${id}`
}

export function memoEditPath(id: string) {
  return `/memos/${id}/edit`
}
