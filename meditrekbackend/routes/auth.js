const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      notificationThreshold: user.notificationThreshold,
      emailNotifications: user.emailNotifications,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      id: user._id,
      email: user.email,
      name: user.name,
      type: 'Bearer'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route - get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      notificationThreshold: req.user.notificationThreshold,
      emailNotifications: req.user.emailNotifications
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected route - dashboard (UPDATED)
router.get('/dashboard', auth, async (req, res) => {
  try {
    console.log('Dashboard route hit by user:', req.user.name); // Debug log
    
    // You can fetch real data from your MongoDB collections here
    // For now, I'll provide sample data that matches your frontend expectations
    
    const dashboardData = {
      stats: {
        activePatients: '156',
        activePatientsChange: '+12%',
        activePatientsChangeType: 'positive',
        criticalAlerts: '3',
        criticalAlertsChange: '-25%',
        criticalAlertsChangeType: 'negative',
        diagnosticsToday: '24',
        diagnosticsTodayChange: '+8%',
        diagnosticsTodayChangeType: 'positive',
        systemUptime: '99.8%',
        systemUptimeChange: '+0.2%',
        systemUptimeChangeType: 'positive'
      },
      recentAlerts: [
        {
          id: 1,
          patient: 'John Doe',
          type: 'Blood Pressure Alert',
          severity: 'high',
          time: '2 mins ago',
          value: '180/120'
        },
        {
          id: 2,
          patient: 'Jane Smith',
          type: 'Heart Rate Alert',
          severity: 'medium',
          time: '15 mins ago',
          value: '105 BPM'
        },
        {
          id: 3,
          patient: 'Bob Johnson',
          type: 'Temperature Alert',
          severity: 'low',
          time: '1 hour ago',
          value: '99.8°F'
        },
        {
          id: 4,
          patient: 'Sarah Wilson',
          type: 'Blood Pressure Alert',
          severity: 'medium',
          time: '45 mins ago',
          value: '145/90'
        },
        {
          id: 5,
          patient: 'Mike Davis',
          type: 'Heart Rate Alert',
          severity: 'low',
          time: '2 hours ago',
          value: '95 BPM'
        }
      ]
    };

    console.log('Sending dashboard data:', dashboardData); // Debug log
    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API Error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;