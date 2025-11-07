/**
 * Dashboard Page Component
 * Protected page - displays logged in user information
 * Only accessible with valid JWT token
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, isAuthenticated, getStoredUser } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Handle logout
  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [navigate]);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        navigate('/login');
        return;
      }

      try {
        // Try to get user from localStorage first (faster)
        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        }

        // Then fetch fresh data from API to verify token is still valid
        const response = await getCurrentUser();
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        // If token is invalid, redirect to login
        setError('Session expired. Please login again.');
        setTimeout(() => {
          handleLogout();
        }, 2000);
      }
    };

    fetchUserData();
  }, [navigate, handleLogout]);

  // (handleLogout defined above with useCallback)

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🏛️ Auction App Dashboard</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-card">
            <div className="user-avatar">
              {user?.full_name?.charAt(0).toUpperCase()}
            </div>
            <h2>Welcome, {user?.full_name}! 👋</h2>
            <p className="welcome-text">
              You're successfully logged into your auction account
            </p>
          </div>
        </section>

        {/* User Info Section */}
        <section className="user-info-section">
          <h3>Your Profile Information</h3>
          
          <div className="info-grid">
            {/* Full Name */}
            <div className="info-card">
              <div className="info-icon">👤</div>
              <div className="info-content">
                <label>Full Name</label>
                <p>{user?.full_name}</p>
              </div>
            </div>

            {/* Username */}
            <div className="info-card">
              <div className="info-icon">🏷️</div>
              <div className="info-content">
                <label>Username</label>
                <p>@{user?.username}</p>
              </div>
            </div>

            {/* Email */}
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <label>Email Address</label>
                <p>{user?.email}</p>
              </div>
            </div>

            {/* Member Since */}
            <div className="info-card">
              <div className="info-icon">📅</div>
              <div className="info-content">
                <label>Member Since</label>
                <p>{user?.created_at ? formatDate(user.created_at) : 'N/A'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="actions-section">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <span>🔨</span>
              <span>Browse Auctions</span>
            </button>
            <button className="action-btn">
              <span>➕</span>
              <span>Create Auction</span>
            </button>
            <button className="action-btn">
              <span>💰</span>
              <span>My Bids</span>
            </button>
            <button className="action-btn">
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
          <p className="note">* These features will be implemented in future exercises</p>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <h3>Account Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>0</h4>
              <p>Active Bids</p>
            </div>
            <div className="stat-card">
              <h4>0</h4>
              <p>Won Auctions</p>
            </div>
            <div className="stat-card">
              <h4>0</h4>
              <p>Watchlist Items</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>© 2025 Auction App - Exercise 9: Login and User Registration</p>
      </footer>
    </div>
  );
}

export default Dashboard;
