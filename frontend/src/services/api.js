/**
 * API Service
 * Handles all HTTP requests to the backend
 */

import axios from 'axios';

// Base URL for API (change this if backend runs on different port)
const API_URL = 'http://localhost:5000/api';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} Response with user data and token
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    
    // Store token in localStorage if registration successful
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response.data.data._id,
        full_name: response.data.data.full_name,
        email: response.data.data.email,
        username: response.data.data.username
      }));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

/**
 * Login user
 * @param {Object} credentials - Login credentials (identifier and password)
 * @returns {Promise} Response with user data and token
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    // Store token in localStorage if login successful
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: response.data.data._id,
        full_name: response.data.data.full_name,
        email: response.data.data.email,
        username: response.data.data.username
      }));
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

/**
 * Get current user data (protected route)
 * @returns {Promise} Response with user data
 */
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    // Clear localStorage if token is invalid
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw error.response?.data || { message: 'Failed to get user data' };
  }
};

/**
 * Logout user
 * Clears localStorage
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Get stored user data
 * @returns {Object|null} User data or null
 */
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
