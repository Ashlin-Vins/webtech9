/**
 * Login Page Component
 * Allows existing users to authenticate
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../services/api';
import '../styles/Auth.css';

function Login() {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    identifier: '', // Can be username or email
    password: ''
  });
  
  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Identifier validation (username or email)
    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Username or email is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call login API
      const response = await login(formData);

      // Show success message
      setMessage({ 
        type: 'success', 
        text: response.message || 'Login successful!' 
      });

      // Redirect to dashboard after 500ms
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);

    } catch (error) {
      // Show error message
      setMessage({ 
        type: 'error', 
        text: error.message || 'Login failed. Please check your credentials.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1>🏛️ Auction App</h1>
          <h2>Welcome Back</h2>
          <p>Login to access your account</p>
        </div>

        {/* Message display */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username or Email */}
          <div className="form-group">
            <label htmlFor="identifier">Username or Email *</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className={errors.identifier ? 'error' : ''}
              placeholder="Enter your username or email"
              autoComplete="username"
            />
            {errors.identifier && (
              <span className="error-text">{errors.identifier}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Registration Link */}
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
