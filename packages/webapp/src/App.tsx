import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AppLayout from './layouts/AppLayout';
import SocialStaking from './pages/SocialStaking';
import Profiles from './pages/Profiles';
import ProfilePage from './pages/ProfilePage';
import Portfolio from './pages/Portfolio';
import Rewards from './pages/Rewards';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<SocialStaking />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profiles/:handle" element={<ProfilePage />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/rewards" element={<Rewards />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App; 