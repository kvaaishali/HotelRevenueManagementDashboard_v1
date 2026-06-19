import React, { useState } from 'react';

export default function RevenueAnalysis() {
  const [forecastDays, setForecastDays] = useState('30');

  const baselineData = {
    '30': { revenue: '₹3,85,000', occupancy: '78%', cancellations: '4.2%' },
    '60': { revenue: '₹8,12,000', occupancy: '82%', cancellations: '5.1%' },
    '90': { revenue: '₹12,45,000', occupancy: '85%', cancellations: '3.8%' },
  };

  return (
    <div>
      <h2>Revenue Trend Analysis & Forecasting</h2>
      <p style={{ color: '#64748b' }}>Historical metrics processing coupled with predictive demand projections.</p>

      {/* Control Switcher */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ fontWeight: '500' }}>Select Projection Range:</span>
        {['30', '60', '90'].map(days => (
          <button
            key={days}
            onClick={() => setForecastDays(days)}
            style={{
              padding: '8px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              backgroundColor: forecastDays === days ? '#0284c7' : 'white',
              color: forecastDays === days ? 'white' : '#1e293b',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {days} Days Out
          </button>
        ))}
      </div>

      {/* Forecast Outputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', borderLeft: '5px solid #0284c7', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Projected Pipeline Revenue</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{baselineData[forecastDays].revenue}</div>
          <span style={{ fontSize: '0.85rem', color: '#10b981' }}>📈 Strong high-season pacing acceleration</span>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', borderLeft: '5px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Expected Median Occupancy</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{baselineData[forecastDays].occupancy}</div>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Based on dynamic corporate lead data</span>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', borderLeft: '5px solid #ef4444', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#64748b' }}>Predicted Cancellation Dips</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{baselineData[forecastDays].cancellations}</div>
          <span style={{ fontSize: '0.85rem', color: '#ef4444' }}>Mitigate via advance deposit rules</span>
        </div>
      </div>

      {/* Visual Analytics Canvas Placeholder Box */}
      <div style={{ background: '#1e293b', color: '#94a3b8', padding: '50px 20px', borderRadius: '8px', textAlign: 'center', marginTop: '25px', fontSize: '0.95rem' }}>
        📊 <strong>Data Visualization Engine Running:</strong> Processing historical variance metrics overlays for the next {forecastDays}-day cycle.
      </div>
    </div>
  );
}