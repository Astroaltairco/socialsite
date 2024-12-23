import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import SocialStaking from './pages/SocialStaking';
import Profiles from './pages/Profiles';
import ProfilePage from './pages/ProfilePage';
import Portfolio from './pages/Portfolio';
import Rewards from './pages/Rewards';
import { ProfilesProvider } from './contexts/ProfilesContext';
import { Suspense, type FC } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <SocialStaking />,
      },
      {
        path: "profiles",
        element: <Profiles />,
      },
      {
        path: "profiles/:handle",
        element: <ProfilePage />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "rewards",
        element: <Rewards />,
      },
    ],
  },
]);

const App: FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen bg-[#0A0A1B] text-white flex items-center justify-center">
          Loading...
        </div>
      }>
        <ProfilesProvider>
          <RouterProvider router={router} />
        </ProfilesProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App; 