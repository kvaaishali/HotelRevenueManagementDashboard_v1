import React from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 KPI Dashboard' },
    { id: 'revenue', label: '📈 Revenue Analysis' },
    { id: 'channels', label: '🔌 Booking Channels' },
    { id: 'pricing', label: '⚙️ Pricing & Admin' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <h2>Hotel Revenue Management</h2>
      </div>
      <nav className={styles.navMenu}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navLink} ${activeTab === item.id ? styles.active : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className={styles.logoutBtn} onClick={onLogout}>
        🚪 Logout Portal
      </button>
    </aside>
  );
}