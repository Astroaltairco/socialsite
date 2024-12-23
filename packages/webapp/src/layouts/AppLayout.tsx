import { type FC, type ReactNode } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0A0A1B] text-white">
        <div className="container mx-auto px-4 py-8">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default AppLayout
