import React, { useState, useEffect } from 'react';
import styles from './Auth.module.css';

export default function Auth({ initialIsLogin, onAuthenticate }) {
  const [isLoginView, setIsLoginView] = useState(initialIsLogin);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Sync internal state if the user clicks back/forth headers
  useEffect(() => {
    setIsLoginView(initialIsLogin);
  }, [initialIsLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoginView && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    onAuthenticate();
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>{isLoginView ? 'Login to Portal' : 'Create Admin Account'}</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Form displays Name field if isLoginView is false */}
          {!isLoginView && (
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                required 
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              required 
              placeholder="admin@hotel.com" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              name="password"
              required 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Form displays Confirm Password field if isLoginView is false */}
          {!isLoginView && (
            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                required 
                placeholder="••••••••" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}

          <button type="submit" className={styles.submitBtn}>
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p onClick={() => setIsLoginView(!isLoginView)} className={styles.toggleText}>
          {isLoginView ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
}