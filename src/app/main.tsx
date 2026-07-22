import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { AppProviders } from '@/app/providers/AppProviders'
import '@/styles/index.css'

const SPLASH_KEY = 'reading-log-splash-seen'
const path = window.location.pathname
if (
  !sessionStorage.getItem(SPLASH_KEY) &&
  path !== '/splash' &&
  !path.startsWith('/auth')
) {
  sessionStorage.setItem(SPLASH_KEY, '1')
  window.history.replaceState(null, '', '/splash')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
