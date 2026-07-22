import { STORAGE_BUCKETS } from '@/shared/constants/storage-buckets'

export function coverObjectPath(userId: string, bookId: string, filename: string) {
  const safeName = filename.replace(/[^\w.-]+/g, '_')
  return `${userId}/${bookId}/${safeName}`
}

export function coverPublicPath(userId: string, bookId: string, filename: string) {
  return `${STORAGE_BUCKETS.covers}/${coverObjectPath(userId, bookId, filename)}`
}
