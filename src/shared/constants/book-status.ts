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

/** 상태 태그용 배경/글자 색 (파스텔 픽셀) */
export const BOOK_STATUS_CLASS: Record<BookStatus, string> = {
  wishlist: 'border border-[var(--color-pixel)] bg-[var(--color-lilac-soft)] text-[#7a6a98]',
  reading: 'border border-[var(--color-pixel)] bg-[var(--color-sky-soft)] text-[#5a8ab0]',
  paused: 'border border-[var(--color-pixel)] bg-[var(--color-sun)] text-[#8a7a3a]',
  finished: 'border border-[var(--color-pixel)] bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]',
}

export const BOOK_STATUS_SELECT_CLASS: Record<BookStatus, string> = {
  wishlist: 'border-2 border-[var(--color-pixel)] bg-[var(--color-lilac-soft)] text-[#7a6a98]',
  reading: 'border-2 border-[var(--color-pixel)] bg-[var(--color-sky-soft)] text-[#5a8ab0]',
  paused: 'border-2 border-[var(--color-pixel)] bg-[var(--color-sun)] text-[#8a7a3a]',
  finished:
    'border-2 border-[var(--color-pixel)] bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]',
}
