import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import './index.css'
import store from './store/store.ts'
import { AuthProvider } from './context/AuthContext.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="container">
      <ErrorBoundary fallback={<div>Algo ha ido mal :(</div>}>
      <AuthProvider>
          <Provider store={store}>
            <App />
          </Provider>
      </AuthProvider>
      </ErrorBoundary>
    </main>
  </StrictMode>
)
