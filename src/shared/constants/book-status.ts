export const BOOK_STATUS = {
  reading: 'reading',
  finished: 'finished',
  paused: 'paused',
  wishlist: 'wishlist',
} as const

export type BookStatus = (typeof BOOK_STATUS)[keyof typeof BOOK_STATUS]

export const BOOK_STATUS_LABEL: Record<BookStatus, string> = {
  reading: '읽는 중',
  finished: '완독',
  paused: '일시중지',
  wishlist: '읽고 싶음',
}
