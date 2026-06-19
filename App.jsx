// src/App.jsx
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Home from './pages/Home';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login' | 'signup' | 'home'

  const handleLoginSuccess = () => {
    setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentView('landing');
  };

  if (currentView === 'landing') {
    return (
      <LandingPage 
        onNavigateToLogin={() => setCurrentView('login')} 
        onNavigateToSignup={() => setCurrentView('signup')} 
      />
    );
  }

  if (currentView === 'login' || currentView === 'signup') {
    return (
      <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
        {/* 🚪 Return Navigation Button Container Layout */}
        <button 
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 18px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'sans-serif'
          }}
        >
          ↩️ Logout
        </button>

        <Auth 
          initialIsLogin={currentView === 'login'} 
          onAuthenticate={handleLoginSuccess} 
        />
      </div>
    );
  }

  return <Home onLogout={handleLogout} />;
}