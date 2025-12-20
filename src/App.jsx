import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SEO } from './components/SEO';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import JoinTeam from './pages/JoinTeam';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <AuthProvider>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/marketplace" element={<Marketplace />} />
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
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
