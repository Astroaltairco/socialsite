import { Link, useLocation, Outlet } from 'react-router-dom'
import { useEffect, type FC } from 'react'
import { useProfiles } from '../contexts/ProfilesContext'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { logger } from '../utils/logger'

// Performance monitoring utility
const logPerformance = (componentName: string, duration: number) => {
  if (process.env.NODE_ENV === 'development') {
    logger.info(`[Performance] ${componentName} rendered in ${duration}ms`)
  }
}

// Navigation link components
interface NavigationLinkProps {
  to: string
  currentPath: string
  icon: FC<{ className?: string }>
  children: React.ReactNode
}

const NavigationLink: FC<NavigationLinkProps> = ({ to, currentPath, icon: Icon, children }) => (
  <Link
    to={to}
    className={`flex items-center px-6 py-3 transition-colors ${
      currentPath === to || (to !== '/' && currentPath.startsWith(to))
        ? 'text-purple-400 bg-purple-500/10'
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="text-sm font-medium">{children}</span>
  </Link>
)

interface ExternalLinkProps {
  href: string
  icon: FC<{ className?: string }>
  children: React.ReactNode
}

const ExternalLink: FC<ExternalLinkProps> = ({ href, icon: Icon, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
  >
    <Icon className="w-5 h-5 mr-3" />
    {children}
  </a>
)

interface ProfileLinkProps {
  profile: { handle: string; name: string; initial: string }
  currentPath: string
  onRemove: (handle: string) => void
}

const ProfileLink: FC<ProfileLinkProps> = ({ profile, currentPath, onRemove }) => (
  <div key={profile.handle} className="group relative">
    <Link
      to={`/profiles/${profile.handle}`}
      className={`flex items-center pr-12 px-6 py-2 text-sm transition-colors ${
        currentPath === `/profiles/${profile.handle}`
          ? 'text-purple-400 bg-purple-500/10'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
        <span className="text-xs font-bold">{profile.initial}</span>
      </div>
      <span className="text-sm truncate">{profile.name}</span>
    </Link>
    <button
      onClick={() => onRemove(profile.handle)}
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
    >
      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
)

// Icon components
const StakingIcon: FC<{ className?: string }> = props => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ProfilesIcon: FC<{ className?: string }> = props => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
    />
  </svg>
)

const PortfolioIcon: FC<{ className?: string }> = props => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
    />
  </svg>
)

const RewardsIcon: FC<{ className?: string }> = props => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
    />
  </svg>
)

const DocsIcon: FC<{ className?: string }> = props => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  </svg>
)

const SocialIcon: FC<{ className?: string }> = props => (
  <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
    />
  </svg>
)

/**
 * Main application layout component
 * Provides navigation sidebar and error boundary for content
 */
export const AppLayout: FC = () => {
  const location = useLocation()
  const { openProfiles, removeProfile } = useProfiles()
  const startTime = performance.now()

  // Monitor rendering performance
  useEffect(() => {
    const duration = performance.now() - startTime
    logPerformance('AppLayout', duration)
  }, [startTime])

  // Handle profile removal with error handling
  const handleProfileRemove = (handle: string) => {
    try {
      removeProfile(handle)
    } catch (error) {
      logger.error('Error removing profile:', error)
    }
  }

  useEffect(() => {
    logger.info('App layout mounted')
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A1B] text-white">
      {/* Sidebar Navigation */}
      <nav className="fixed inset-y-0 left-0 w-64 bg-[#0F0F23] border-r border-white/5">
        {/* Logo Section */}
        <div className="p-6 flex justify-center items-center">
          <a href="#preview" className="flex items-center group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-lg font-bold">S</span>
            </div>
            <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-pink-500 transition-all">
              Social Staking
            </h1>
          </a>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col h-[calc(100vh-88px)]">
          <div className="flex-1">
            {/* Navigation Links */}
            <NavigationLink to="/" currentPath={location.pathname} icon={StakingIcon}>
              Staking
            </NavigationLink>

            {/* Profiles Section */}
            <div>
              <NavigationLink to="/profiles" currentPath={location.pathname} icon={ProfilesIcon}>
                Profiles
              </NavigationLink>

              {/* Open Profiles List */}
              <ErrorBoundary>
              {openProfiles.length > 0 && (
                <div className="pl-4">
                    {openProfiles.map(profile => (
                      <ProfileLink
                      key={profile.handle}
                        profile={profile}
                        currentPath={location.pathname}
                        onRemove={handleProfileRemove}
                      />
                  ))}
                </div>
              )}
              </ErrorBoundary>
            </div>

            {/* Other Navigation Links */}
            <NavigationLink to="/portfolio" currentPath={location.pathname} icon={PortfolioIcon}>
              Portfolio
            </NavigationLink>

            <NavigationLink to="/rewards" currentPath={location.pathname} icon={RewardsIcon}>
              Rewards
            </NavigationLink>
          </div>

          {/* External Links */}
          <div className="border-t border-white/5 py-4 px-6 space-y-3">
            <ExternalLink href="https://docs.social.xyz" icon={DocsIcon}>
              Docs
            </ExternalLink>
            <ExternalLink href="https://x.com/social_xyz" icon={SocialIcon}>
              Project X
            </ExternalLink>
          </div>
          </div>
        </nav>

      {/* Main Content Area */}
      <div className="pl-64">
        <ErrorBoundary>
        <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  )
}
