import React from 'react';

export default function LandingPage({ onNavigateToLogin, onNavigateToSignup }) {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    background: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  };

  const navGroupStyle = {
    display: 'flex',
    gap: '15px'
  };

  const btnStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'all 0.2s'
  };

  const mainStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
    minHeight: 'calc(100vh - 180px)',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ fontWeight: '800', fontSize: '1.4rem', color: '#0f172a', letterSpacing: '0.5px' }}>
          HOTEL MANAGEMENT DASHBOARD
        </div>
        <div style={navGroupStyle}>
          <button 
            style={{ ...btnStyle, backgroundColor: '#0284c7', color: '#ffffff' }}
            onClick={onNavigateToLogin}
          >
            Login
          </button>
          <button 
            style={{ ...btnStyle, backgroundColor: '#e2e8f0', color: '#1e293b' }}
            onClick={onNavigateToSignup}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Project Content */}
      <main style={mainStyle}>
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '16px' }}>
            Trusted Hotel Management Framework
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>
            A centralized data processing platform designed to aggregate omnichannel booking streams, map real-time performance analytics, and automate dynamic pricing models.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '1.75rem', color: '#1e293b', textAlign: 'center' }}>Core Architecture Components</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px' }}>
            
            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📊</div>
              <h3>KPI Monitoring</h3>
              <p style={{ margin: 0, color: '#64748b' }}>Evaluates statistics including ADR, RevPAR, and occupancy rates in real time.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📈</div>
              <h3>Trend Forecasting</h3>
              <p style={{ margin: 0, color: '#64748b' }}>Processes historical records to generate tactical business projections.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔌</div>
              <h3>Data Integration</h3>
              <p style={{ margin: 0, color: '#64748b' }}>Compiles multi-channel distribution pipelines using persistent live APIs.</p>
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚙️</div>
              <h3>Dynamic Pricing</h3>
              <p style={{ margin: 0, color: '#64748b' }}>Automating structural rate multipliers based on current system occupancy.</p>
            </div>

          </div>
        </section>
      </main>

      <footer style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'center', padding: '25px 20px', marginTop: 'auto' }}>
        <p>&copy; 2026 Hotel Management System Project Framework.</p>
      </footer>
    </div>
  );
}