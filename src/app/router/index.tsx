import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'
import { PublicRoute } from '@/app/router/PublicRoute'
import { AppLayout } from '@/shared/ui/AppLayout'
import { ROUTES } from '@/shared/constants/routes'
import { AuthCallbackPage } from '@/pages/AuthCallbackPage'
import { BookDetailPage } from '@/pages/BookDetailPage'
import { BooksPage } from '@/pages/BooksPage'
import { GraphPage } from '@/pages/GraphPage'
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { MemoFormPage } from '@/pages/MemoFormPage'
import { StreakPage } from '@/pages/StreakPage'
import { TagsPage } from '@/pages/TagsPage'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: ROUTES.login, element: <LoginPage /> }],
  },
  {
    path: ROUTES.authCallback,
    element: <AuthCallbackPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: ROUTES.home, element: <HomePage /> },
          { path: ROUTES.books, element: <BooksPage /> },
          { path: ROUTES.bookDetail, element: <BookDetailPage /> },
          { path: ROUTES.memoNew, element: <MemoFormPage /> },
          { path: ROUTES.tags, element: <TagsPage /> },
          { path: ROUTES.graph, element: <GraphPage /> },
          { path: ROUTES.streak, element: <StreakPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.home} replace />,
  },
])
