import { dayjs } from '@/shared/lib/dayjs'

export function formatDate(value: string | Date, template = 'YYYY.MM.DD') {
  return dayjs(value).format(template)
}

export function toDateKey(value: string | Date) {
  return dayjs(value).format('YYYY-MM-DD')
}

export function startOfMonth(value: string | Date = new Date()) {
  return dayjs(value).startOf('month')
}

export function endOfMonth(value: string | Date = new Date()) {
  return dayjs(value).endOf('month')
}
