import React from 'react';
import styles from './KPIControl.module.css';

export default function KPIControl({ title, value, change, positive }) {
  return (
    <div className={styles.kpiCard}>
      <h3>{title}</h3>
      <div className={styles.kpiValue}>{value}</div>
      <span className={positive ? styles.statusPos : styles.statusNeg}>
        {change}
      </span>
    </div>
  );
}