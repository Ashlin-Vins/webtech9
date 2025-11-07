/**
 * Authentication Controller
 * Handles user registration, login, and profile retrieval
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { full_name, email, username, password } = req.body;

    // Validation: Check if all fields are provided
    if (!full_name || !email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists (email or username)
    const userExists = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered'
        });
      }
      if (userExists.username === username) {
        return res.status(400).json({
          success: false,
          message: 'Username already taken'
        });
      }
    }

    // Create new user (password will be hashed automatically by pre-save hook)
    const user = await User.create({
      full_name,
      email,
      username,
      password
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        created_at: user.created_at,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validation: Check if both fields are provided
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username/email and password'
      });
    }

    // Find user by email or username (include password field)
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    }).select('+password');

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private (requires JWT token)
 */
const getMe = async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    const user = req.user;

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        username: user.username,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user data',
      error: error.message
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
