// src/pages/Home.jsx
import React, { useState, useMemo, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import Dashboard from './Dashboard';
import RevenueAnalysis from './RevenueAnalysis';
import BookingChannels from './BookingChannels';
import PricingAdmin from './PricingAdmin';

export default function Home({ onLogout }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  // 🔒 Static role assignment for this view layout structure
  const currentUserRole = 'admin'; 

  // --- CORE SYSTEM DATA STATES ---
  const [baseRates, setBaseRates] = useState({
    'Standard Room': 5000,
    'Deluxe Suite': 9500,
    'Executive Suite': 16000,
    'Presidential Suite': 35000
  });

  const [rules, setRules] = useState([
    { id: 1, condition: 'Occupancy > 80%', action: 'Increase Base Rates +20%', type: 'Surge', status: 'Active' },
    { id: 2, condition: 'Weekend Bookings (Fri-Sun)', action: 'Add Flat +₹1,500', type: 'Seasonal', status: 'Active' },
    { id: 3, condition: 'Last Minute Booking', action: 'Increase Base Rates +30%', type: 'Surge', status: 'Active' }
  ]);

  const [rooms, setRooms] = useState([
    { id: '101', type: 'Standard Room', status: 'Occupied', guest: 'Rohan Sharma' },
    { id: '102', type: 'Standard Room', status: 'Vacant', guest: '-' },
    { id: '103', type: 'Standard Room', status: 'Maintenance', guest: '-' },
    { id: '201', type: 'Deluxe Suite', status: 'Occupied', guest: 'Priya Patel' },
    { id: '202', type: 'Deluxe Suite', status: 'Vacant', guest: '-' },
    { id: '203', type: 'Standard Room', status: 'Vacant', guest: '-' },
    { id: '301', type: 'Deluxe Suite', status: 'Vacant', guest: '-' },
    { id: '302', type: 'Executive Suite', status: 'Occupied', guest: 'Vikram Malhotra' },
    { id: '303', type: 'Executive Suite', status: 'Vacant', guest: '-' },
    { id: '401', type: 'Executive Suite', status: 'Vacant', guest: '-' },
    { id: '402', type: 'Executive Suite', status: 'Occupied', guest: 'Ananya Iyer' },
    { id: '403', type: 'Deluxe Suite', status: 'Maintenance', guest: '-' },
    { id: '501', type: 'Presidential Suite', status: 'Vacant', guest: '-' },
    { id: '502', type: 'Presidential Suite', status: 'Occupied', guest: 'Kabir Kapoor' },
    { id: '503', type: 'Executive Suite', status: 'Maintenance', guest: '-' }
  ]);

  // --- AUTOMATED SURGE CALCULATIONS ---
  const currentOccupancyRate = useMemo(() => {
    const totalOperational = rooms.filter(r => r.status !== 'Maintenance').length;
    const totalOccupied = rooms.filter(r => r.status === 'Occupied').length;
    return totalOperational > 0 ? (totalOccupied / totalOperational) * 100 : 0;
  }, [rooms]);

  const dynamicRoomsData = useMemo(() => {
    return rooms.map(room => {
      let currentPrice = baseRates[room.type] || 5000;
      
      (rules || []).forEach(rule => {
        if (rule.status === 'Active') {
          if (rule.condition === 'Occupancy > 80%' && currentOccupancyRate > 80) {
            currentPrice = currentPrice * 1.20;
          }
          if (rule.condition === 'Weekend Bookings (Fri-Sun)') {
            currentPrice = currentPrice + 1500;
          }
          if (rule.condition === 'Last Minute Booking') {
            currentPrice = currentPrice * 1.30;
          }
        }
      });
      return { ...room, rate: Math.round(currentPrice) };
    });
  }, [rooms, baseRates, rules, currentOccupancyRate]);

  // --- COMPONENT HANDLERS ---
  const handleBookRoom = useCallback((roomId, guestName) => {
    setRooms(prevRooms => prevRooms.map(room => 
      room.id === roomId ? { ...room, status: 'Occupied', guest: guestName } : room
    ));
  }, []);

  const handleCancelBooking = useCallback((roomId) => {
    setRooms(prevRooms => prevRooms.map(room => 
      room.id === roomId ? { ...room, status: 'Vacant', guest: '-' } : room
    ));
  }, []);

  // Sub-tab conditional selector engine
  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard roomsData={dynamicRoomsData} onBookRoom={handleBookRoom} onCancelBooking={handleCancelBooking} />;
      case 'revenue':
        return <RevenueAnalysis />;
      case 'channels':
        return <BookingChannels />;
      case 'pricing':
        return <PricingAdmin rules={rules} setRules={setRules} baseRates={baseRates} setBaseRates={setBaseRates} />;
      default:
        return <Dashboard roomsData={dynamicRoomsData} onBookRoom={handleBookRoom} onCancelBooking={handleCancelBooking} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'sans-serif' }}>
      <Sidebar 
        activeTab={currentTab} 
        setActiveTab={setCurrentTab} 
        userRole={currentUserRole}
        onLogout={onLogout} 
      />
      <main style={{ marginLeft: '260px', flex: 1, padding: '30px', width: 'calc(100% - 260px)', boxSizing: 'border-box' }}>
        {renderContent()}
      </main>
    </div>
  );
}