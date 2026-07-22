import { NavLink } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import { cn } from '@/shared/utils/cn'

const items = [
  { to: ROUTES.books, label: '서재', icon: '▣' },
  { to: ROUTES.home, label: '메모', icon: '▤' },
  { to: ROUTES.graph, label: '정원', icon: '◈' },
  { to: ROUTES.streak, label: '달력', icon: '▦' },
  { to: ROUTES.profile, label: '나', icon: '◎' },
] as const

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-[var(--color-pixel)] bg-[var(--color-surface)]/95 backdrop-blur-sm">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-bold transition',
                  isActive
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent-deep)]'
                    : 'text-[var(--color-muted)]',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'font-[family-name:var(--font-pixel)] text-[9px] leading-none',
                      isActive && 'animate-pixel-pop',
                    )}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
