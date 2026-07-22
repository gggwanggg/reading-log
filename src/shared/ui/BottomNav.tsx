import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { cn } from '@/shared/utils/cn'

const items = [
  { to: ROUTES.home, label: '기록' },
  { to: ROUTES.tags, label: '태그' },
  { to: ROUTES.graph, label: '그래프' },
  { to: ROUTES.streak, label: '스트릭' },
] as const

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex h-14 items-center justify-center text-sm',
                  isActive
                    ? 'font-semibold text-[var(--color-accent)]'
                    : 'text-[var(--color-muted)]',
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
