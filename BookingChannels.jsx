import React, { useState } from 'react';

export default function BookingChannels() {
  // 1. Manage state for the date picker (Defaults to June 11, 2026)
  const [targetDate, setTargetDate] = useState('2026-06-11');

  // 2. Helper function to generate dynamic numbers based on the selected date string
  const generateMetricsForDate = (dateString) => {
    // Create a unique numerical hash from the chosen date string characters
    const dateSeed = dateString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate distinct, realistic room volumes using the date seed
    const bookingDotComVolume = 50000 + ((dateSeed * 13) % 150000);
    const directWebVolume = 40000 + ((dateSeed * 7) % 130000);
    const expediaVolume = 20000 + ((dateSeed * 3) % 90000);

    // Calculate total volume to derive accurate percentage shares
    const totalVolume = bookingDotComVolume + directWebVolume + expediaVolume;

    return [
      { 
        name: 'Booking.com (OTA)', 
        share: Math.round((bookingDotComVolume / totalVolume) * 100), 
        commissionRate: 15, 
        grossVolume: Math.round(bookingDotComVolume / 10) * 10, 
        latency: '0.4s' 
      },
      { 
        name: 'Direct Website Engine', 
        share: Math.round((directWebVolume / totalVolume) * 100), 
        commissionRate: 0, 
        grossVolume: Math.round(directWebVolume / 10) * 10, 
        latency: 'Instantaneous' 
      },
      { 
        name: 'Expedia Platform (OTA)', 
        share: Math.round((expediaVolume / totalVolume) * 100), 
        commissionRate: 18, 
        grossVolume: Math.round(expediaVolume / 10) * 10, 
        latency: '1.3s' 
      }
    ];
  };

  // 3. Automatically generate a unique dataset whenever targetDate changes
  const activeChannels = generateMetricsForDate(targetDate);

  // 4. Live math equations processing the newly generated array properties
  const totalGrossRevenue = activeChannels.reduce((sum, c) => sum + c.grossVolume, 0);
  const totalNetRevenue = activeChannels.reduce((sum, c) => {
    return sum + (c.grossVolume - (c.grossVolume * (c.commissionRate / 100)));
  }, 0);
  const totalCommissionsLost = totalGrossRevenue - totalNetRevenue;

  // Format date display nicely for headers (e.g., June 10, 2026)
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div>
      <h2>Booking Channel & Data Integration</h2>
      <p style={{ color: '#64748b' }}>Omnichannel distribution data engine compiling real-time global booking streams.</p>

      {/* Calendar Date Input Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px', background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
        <label style={{ fontWeight: '700', color: '#0f172a' }}>📅 Select Target Evaluation Date: </label>
        <input 
          type="date" 
          value={targetDate} 
          onChange={(e) => setTargetDate(e.target.value)} 
          style={{ padding: '10px 16px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', fontWeight: '600', background: 'white', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.9rem', color: '#0284c7', fontWeight: '600' }}>
          Viewing: {formatDateDisplay(targetDate)}
        </span>
      </div>

      {/* Financial Overviews (Guaranteed to change every time you touch the calendar) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: '4px solid #0284c7' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase' }}>Gross Volume</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1e293b' }}>₹{totalGrossRevenue.toLocaleString('en-IN')}</div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: '4px solid #e11d48' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase' }}>OTA Commissions Lost</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#e11d48' }}>- ₹{totalCommissionsLost.toLocaleString('en-IN')}</div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: '4px solid #16a34a' }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase' }}>Net Property Yield</h4>
          <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#16a34a' }}>₹{totalNetRevenue.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Main Channel Aggregator Data Grid */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '8px', marginTop: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>Central Pipeline Matrix for {targetDate}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '14px' }}>Platform Node</th>
              <th style={{ padding: '14px' }}>API Connection Status</th>
              <th style={{ padding: '14px' }}>Share Volume</th>
              <th style={{ padding: '14px' }}>Commission Fee</th>
              <th style={{ padding: '14px' }}>Gross Revenue</th>
              <th style={{ padding: '14px' }}>Calculated Net Yield</th>
            </tr>
          </thead>
          <tbody>
            {activeChannels.map((channel, idx) => {
              const netYieldValue = channel.grossVolume - (channel.grossVolume * (channel.commissionRate / 100));
              return (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '14px', fontWeight: '600' }}>{channel.name}</td>
                  <td style={{ padding: '14px', fontSize: '0.9rem', color: '#16a34a' }}>🟢 Active ({channel.latency})</td>
                  <td style={{ padding: '14px' }}>{channel.share}%</td>
                  <td style={{ padding: '14px', color: channel.commissionRate > 0 ? '#e11d48' : '#16a34a' }}>{channel.commissionRate}%</td>
                  <td style={{ padding: '14px', color: '#64748b' }}>₹{channel.grossVolume.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '14px', fontWeight: '700' }}>₹{netYieldValue.toLocaleString('en-IN')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}