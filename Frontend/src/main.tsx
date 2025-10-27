import ReactDOM, { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './components/ui/theme-provider'
import { StrictMode } from 'react'
import './index.css'
import LandingPage from './layouts/LandingPage'
import LoginPage from './layouts/LoginPage'
import SignupPage from './layouts/SignupPage'
import UserAuthStore from './stores/UserAuthStore'
import Dashboard from './layouts/Dashboard'
import { AuthProtectedRoutes, CheckBoardMembership, RestrictIfAuthenticated } from './helpers/RestrictRoute.tsx'
import BoardStore from './stores/BoardStore.tsx'
import BoardPage from './layouts/BoardPage.tsx'
import TaskStore from './stores/TaskStore.tsx'
import { Toaster } from 'sonner'
import SocketStore from './stores/BoardSocketStore.tsx'
import ChatRoom from './components/ChatSocket.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/auth/login',
    element: <RestrictIfAuthenticated>
      <LoginPage />
    </RestrictIfAuthenticated>
  },
  {
    path: '/auth/signup',
    element: <RestrictIfAuthenticated>
      <SignupPage />
    </RestrictIfAuthenticated>
  },
  {
    path: '/dashboard',
    element: <AuthProtectedRoutes>
      <BoardStore>
        <Dashboard />
      </BoardStore>
    </AuthProtectedRoutes>
  },
  {
    path: '/chat',
    element: <ChatRoom room='fiajsdifjiasdf' username='faishdifhasd' />
  },
  {
    path: '/board/:boardId',
    element: <AuthProtectedRoutes>
      <BoardStore>
        <CheckBoardMembership>
          <TaskStore>
            <BoardPage />
          </TaskStore>
        </CheckBoardMembership>
      </BoardStore>
    </AuthProtectedRoutes>
  },
  {
    path: '*',
    element: "Page not found."
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <UserAuthStore>
        <SocketStore>
          <Toaster />
          <RouterProvider router={router} />
        </SocketStore>
      </UserAuthStore>
    </ThemeProvider>
  </StrictMode>
)