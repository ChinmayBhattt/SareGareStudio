import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SEO } from './components/SEO';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { MusicProvider } from './context/MusicContext';
import AuthGuard from './components/AuthGuard';
import Navbar from './components/Navbar';
import MusicPlayer from './components/Music/MusicPlayer';

// Lazy load pages for performance optimization
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Account = React.lazy(() => import('./pages/Account'));
const JoinTeam = React.lazy(() => import('./pages/JoinTeam'));
const PartnerWithUs = React.lazy(() => import('./pages/PartnerWithUs'));

function App() {
  return (
    <AuthProvider>
      <MusicProvider>
        <Router>
          <SEO
            title="SareGare Studio | Music & Film Production"
            description="Top music label & film production house empowering artists with Hacker's Unity to create masterpieces."
            name="SareGare Studio"
            type="website"
          />
          <Navbar />
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'glass text-white',
              style: {
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
            }}
          />
          <MusicPlayer />
          <Suspense fallback={
            <div className="flex items-center justify-center h-screen w-full bg-black text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/account"
                element={
                  <AuthGuard>
                    <Account />
                  </AuthGuard>
                }
              />
              {/* Add other routes as placeholders or redirect to home for now */}
              <Route path="/join-team" element={<JoinTeam />} />
              <Route path="/partner-with-us" element={<PartnerWithUs />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Router>
      </MusicProvider>
    </AuthProvider>
  );
}

export default App;
