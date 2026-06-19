import React, { useState } from 'react';
import KPIControl from '../components/KPIControl';
import styles from './Dashboard.module.css';

export default function Dashboard({ roomsData, onBookRoom, onCancelBooking }) {
  const [roomFilter, setRoomFilter] = useState('all');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [guestName, setGuestName] = useState('');

  // 1. Live Math Calculators
  const totalRooms = roomsData.length;
  const operationalRooms = roomsData.filter(r => r.status !== 'Maintenance').length;
  const occupiedRooms = roomsData.filter(r => r.status === 'Occupied').length;
  
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / operationalRooms) * 100) : 0;

  const totalOccupiedRevenue = roomsData
    .filter(r => r.status === 'Occupied')
    .reduce((sum, r) => sum + r.rate, 0);
  const calculatedADR = occupiedRooms > 0 ? Math.round(totalOccupiedRevenue / occupiedRooms) : 0;
  const calculatedRevPAR = operationalRooms > 0 ? Math.round(totalOccupiedRevenue / operationalRooms) : 0;

  const kpis = [
    { title: 'ADR (Average Daily Rate)', value: `₹${calculatedADR.toLocaleString('en-IN')}`, change: 'Live check', positive: true },
    { title: 'RevPAR', value: `₹${calculatedRevPAR.toLocaleString('en-IN')}`, change: 'Live yield map', positive: true },
    { title: 'Occupancy Rate', value: `${occupancyRate}%`, change: `${occupiedRooms}/${operationalRooms} Rooms Filled`, positive: occupancyRate >= 70 },
    { title: 'Booking Pace', value: '1.2x vs LY', change: 'Stable trajectory', positive: true },
  ];

  const filteredRooms = roomsData.filter(room => 
    roomFilter === 'all' ? true : room.status.toLowerCase() === roomFilter.toLowerCase()
  );

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedRoomId || !guestName.trim()) {
      alert('Please select a room and enter guest name.');
      return;
    }
    onBookRoom(selectedRoomId, guestName);
    setSelectedRoomId('');
    setGuestName('');
  };

  return (
    <div>
      <h2>Hotel Dashboard & KPI Monitoring</h2>
      <p style={{ color: '#64748b' }}>Manage check-ins, process instant cancellations, and audit real-time KPI impacts.</p>
      
      {/* Dynamic KPI Panels */}
      <div className={styles.kpiGrid}>
        {kpis.map((kpi, idx) => (
          <KPIControl key={idx} {...kpi} />
        ))}
      </div>

      {/* Front Desk Booking Form */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '8px', marginTop: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>⚡ Instant Reservation Front-Desk Form</h3>
        <form onSubmit={handleBookingSubmit} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Select Vacant Room</label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white' }}
            >
              <option value="">-- Choose Available Inventory --</option>
              {roomsData.filter(r => r.status === 'Vacant').map(room => (
                <option key={room.id} value={room.id}>Room {room.id} - {room.type} (₹{room.rate})</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Primary Guest Name</label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
            />
          </div>

          <button
            type="submit"
            style={{ padding: '11px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
          >
            Confirm Booking
          </button>
        </form>
      </div>

      {/* Grid Layout of Rooms with Live Action Toggles */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', marginTop: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>🏢 Live Room Status Display Layout</h3>
          <select 
            value={roomFilter} 
            onChange={(e) => setRoomFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer' }}
          >
            <option value="all">All Rooms ({roomsData.length})</option>
            <option value="occupied">Occupied</option>
            <option value="vacant">Vacant</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
          {filteredRooms.map(room => {
            let bg = '#e0f2fe'; let color = '#0369a1';
            if (room.status === 'Occupied') { bg = '#dcfce7'; color = '#15803d'; }
            if (room.status === 'Maintenance') { bg = '#fee2e2'; color = '#b91c1c'; }

            return (
              <div key={room.id} style={{ background: bg, color: color, padding: '20px', borderRadius: '8px', border: `1px solid ${color}30`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Room {room.id}</div>
                  <div style={{ fontSize: '0.85rem', margin: '2px 0 8px 0', opacity: 0.8 }}>{room.type}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{room.status}</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '4px', fontStyle: 'italic' }}>
                    {room.status === 'Occupied' ? `Guest: ${room.guest}` : `Rate: ₹${room.rate}`}
                  </div>
                </div>

                {/* Show Cancellation Action Button ONLY if room is occupied */}
                {room.status === 'Occupied' && (
                  <button
                    onClick={() => {
                      if(window.confirm(`Are you sure you want to cancel the booking for Room ${room.id}?`)) {
                        onCancelBooking(room.id);
                      }
                    }}
                    style={{ marginTop: '12px', padding: '6px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                  >
                    ❌ Cancel Booking
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}