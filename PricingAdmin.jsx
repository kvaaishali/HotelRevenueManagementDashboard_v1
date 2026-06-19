import React, { useState } from 'react';

export default function PricingAdmin({ rules = [], setRules, baseRates = {}, setBaseRates }) {
  // Local form inputs configuration
  const [newCondition, setNewCondition] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newType, setNewType] = useState('Surge');
  const [selectedRoomType, setSelectedRoomType] = useState('Standard Room');
  const [overridePrice, setOverridePrice] = useState('');

  const systemUsers = [
    { username: 'Admin', role: 'Administrator', scope: 'Global Control (All Modules)', badgeColor: '#ef4444' },
    { username: 'Manager', role: 'Revenue Manager', scope: 'Modify Pricing & Channel Sync Only', badgeColor: '#f59e0b' },
    { username: 'Receptionist', role: 'Receptionist', scope: 'Read-Only Pricing (Block Modifications)', badgeColor: '#3b82f6' },
  ];

  // Handler: Add a new dynamic pricing strategy rule
  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newCondition.trim() || !newAction.trim()) return;

    const newRule = { 
      id: Date.now(), // Unique hidden key for React rendering lists
      condition: newCondition.trim(), 
      action: newAction.trim(), 
      type: newType, 
      status: 'Active' 
    };

    setRules([...rules, newRule]);
    setNewCondition('');
    setNewAction('');
  };

  // Handler: Toggle rule active/disabled status
  const toggleRuleStatus = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Disabled' : 'Active' } : r));
  };

  // 🔴 Core Feature: Delete a rule completely from state
  const handleDeleteRule = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this pricing rule?')) {
      setRules(rules.filter(rule => rule.id !== id));
    }
  };

  // Handler: Update base prices properties
  const handlePriceOverride = (e) => {
    e.preventDefault();
    if (!overridePrice || isNaN(overridePrice)) return;

    setBaseRates({
      ...baseRates,
      [selectedRoomType]: parseInt(overridePrice, 10)
    });
    setOverridePrice('');
  };

  // Convert object dictionary values to arrays safely for presentation grids
  const baseRatesArray = Object.keys(baseRates || {}).map(key => ({
    type: key,
    currentPrice: baseRates[key],
    updatedBy: 'dharmika_p'
  }));

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2>Pricing & Revenue Administration</h2>
      <p style={{ color: '#64748b' }}>Configure automated dynamic pricing algorithms, manage inventory tiers, and audit security control frameworks.</p>

      {/* SECTION 1: RULE CONFIGURATION INTERFACE */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '8px', marginTop: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 5px 0' }}>📈 Automated Yield & Dynamic Pricing Rules</h3>
        <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>Define algorithms that scale base accommodation rates based on active capacity thresholds.</p>

        <form onSubmit={handleAddRule} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '6px' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Trigger Condition</label>
            <input type="text" placeholder="e.g., Occupancy > 80%" value={newCondition} onChange={(e) => setNewCondition(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Target Execution Action</label>
            <input type="text" placeholder="e.g., Increase Base Rates +20%" value={newAction} onChange={(e) => setNewAction(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Rule Category</label>
            <select value={newType} onChange={(e) => setNewType(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: 'white', height: '35px' }}>
              <option value="Surge">Surge Pricing</option>
              <option value="Seasonal">Seasonal Event</option>
              <option value="Markdown">Markdown Promo</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '600', alignSelf: 'flex-end', cursor: 'pointer', height: '35px' }}>Deploy Rule</button>
        </form>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '12px' }}>Rule No.</th>
              <th style={{ padding: '12px' }}>Condition Pattern</th>
              <th style={{ padding: '12px' }}>Trigger Action</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Status Toggle</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rules || []).map((rule, index) => (
              <tr key={rule.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', color: '#0284c7', fontWeight: '700' }}>Rule {index + 1}</td>
                <td style={{ padding: '12px', fontWeight: '600', color: '#334155' }}>{rule.condition}</td>
                <td style={{ padding: '12px', color: '#16a34a', fontWeight: '600' }}>{rule.action}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {rule.type}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => toggleRuleStatus(rule.id)} style={{ padding: '4px 10px', backgroundColor: rule.status === 'Active' ? '#dcfce7' : '#fee2e2', color: rule.status === 'Active' ? '#15803d' : '#b91c1c', border: 'none', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>
                    {rule.status === 'Active' ? '🟢 Operational' : '🔴 Suspended'}
                  </button>
                </td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button 
                    onClick={() => handleDeleteRule(rule.id)} 
                    style={{ padding: '5px 12px', backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SECTION 2: BASE RATE OVERRIDES */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginTop: '25px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>🛠️ Core Rate Override</h3>
          <form onSubmit={handlePriceOverride}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569', fontWeight: '600' }}>Target Inventory Tier</label>
              <select value={selectedRoomType} onChange={(e) => setSelectedRoomType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white' }}>
                {baseRatesArray.map(rate => <option key={rate.type} value={rate.type}>{rate.type}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569', fontWeight: '600' }}>New Base Price (₹)</label>
              <input type="number" placeholder="Enter target valuation" value={overridePrice} onChange={(e) => setOverridePrice(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} min="0" required />
            </div>
            <button type="submit" style={{ width: '100%', padding: '11px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>Publish Updated Rates</button>
          </form>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 15px 0' }}>📊 Active Room Type Standard Pricing Matrix</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '14px' }}>Room Type Class</th>
                <th style={{ padding: '14px' }}>Standard Baseline Rate</th>
                
              </tr>
            </thead>
            <tbody>
              {baseRatesArray.map((rate, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '14px', fontWeight: '600' }}>{rate.type}</td>
                  <td style={{ padding: '14px', fontSize: '1.1rem', fontWeight: '700', color: '#16a34a' }}>₹{rate.currentPrice.toLocaleString('en-IN')} / night</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}