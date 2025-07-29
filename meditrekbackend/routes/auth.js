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

// Add this route to your auth.js file

// Protected route - diagnostics
router.get('/diagnostics', auth, async (req, res) => {
  try {
    console.log('Diagnostics route hit by user:', req.user.name); // Debug log
    
    // You can fetch real data from your MongoDB collections here
    // For now, providing sample data that matches your frontend expectations
    
    const diagnosticsData = [
      {
        id: 1,
        patient: 'John Smith',
        type: 'Blood Analysis',
        status: 'completed',
        date: '2025-01-15',
        time: '10:30 AM',
        priority: 'high',
        results: 'Elevated cholesterol levels detected'
      },
      {
        id: 2,
        patient: 'Sarah Johnson',
        type: 'ECG Monitoring',
        status: 'in-progress',
        date: '2025-01-15',
        time: '11:15 AM',
        priority: 'medium',
        results: 'Monitoring ongoing...'
      },
      {
        id: 3,
        patient: 'Michael Brown',
        type: 'X-Ray Chest',
        status: 'completed',
        date: '2025-01-14',
        time: '2:45 PM',
        priority: 'low',
        results: 'No abnormalities detected'
      },
      {
        id: 4,
        patient: 'Emily Davis',
        type: 'MRI Brain',
        status: 'pending',
        date: '2025-01-16',
        time: '9:00 AM',
        priority: 'high',
        results: 'Scheduled for tomorrow'
      },
      {
        id: 5,
        patient: 'David Wilson',
        type: 'Blood Pressure',
        status: 'completed',
        date: '2025-01-14',
        time: '4:20 PM',
        priority: 'medium',
        results: 'Within normal range'
      },
      {
        id: 6,
        patient: 'Lisa Anderson',
        type: 'Ultrasound',
        status: 'pending',
        date: '2025-01-17',
        time: '1:30 PM',
        priority: 'low',
        results: 'Scheduled for later this week'
      },
      {
        id: 7,
        patient: 'Robert Taylor',
        type: 'CT Scan',
        status: 'in-progress',
        date: '2025-01-15',
        time: '3:00 PM',
        priority: 'high',
        results: 'Scan in progress...'
      },
      {
        id: 8,
        patient: 'Jennifer Martinez',
        type: 'Blood Sugar Test',
        status: 'completed',
        date: '2025-01-14',
        time: '9:15 AM',
        priority: 'medium',
        results: 'Glucose levels normal'
      }
    ];

    console.log('Sending diagnostics data:', diagnosticsData.length, 'records'); // Debug log
    res.json(diagnosticsData);
  } catch (error) {
    console.error('Diagnostics API Error:', error);
    res.status(500).json({ message: 'Failed to fetch diagnostics data' });
  }
});

// Add this route to your auth.js file

// Protected route - alerts
router.get('/alerts', auth, async (req, res) => {
  try {
    console.log('Alerts route hit by user:', req.user.name); // Debug log
    
    // You can fetch real data from your MongoDB collections here
    // For now, providing sample data that matches your frontend expectations
    
    const alertsData = [
      {
        id: 1,
        patient: 'John Smith',
        type: 'Critical Blood Pressure',
        severity: 'critical',
        message: 'Blood pressure reading of 180/120 mmHg detected. Immediate attention required.',
        timestamp: '2025-01-15T10:30:00Z',
        status: 'unread',
        value: '180/120 mmHg'
      },
      {
        id: 2,
        patient: 'Sarah Johnson',
        type: 'Low Heart Rate',
        severity: 'warning',
        message: 'Heart rate dropped to 45 BPM. Monitor closely for bradycardia symptoms.',
        timestamp: '2025-01-15T10:18:00Z',
        status: 'unread',
        value: '45 BPM'
      },
      {
        id: 3,
        patient: 'Michael Brown',
        type: 'Temperature Alert',
        severity: 'info',
        message: 'Body temperature elevated to 102.1°F. Consider fever management protocol.',
        timestamp: '2025-01-15T09:45:00Z',
        status: 'read',
        value: '102.1°F'
      },
      {
        id: 4,
        patient: 'Emily Davis',
        type: 'Medication Reminder',
        severity: 'info',
        message: 'Patient due for scheduled medication administration in 30 minutes.',
        timestamp: '2025-01-15T09:30:00Z',
        status: 'read',
        value: 'Due: 10:00 AM'
      },
      {
        id: 5,
        patient: 'David Wilson',
        type: 'Lab Results',
        severity: 'warning',
        message: 'Abnormal glucose levels detected in latest blood work. Review required.',
        timestamp: '2025-01-15T08:15:00Z',
        status: 'resolved',
        value: '285 mg/dL'
      },
      {
        id: 6,
        patient: 'Lisa Anderson',
        type: 'Oxygen Saturation',
        severity: 'critical',
        message: 'Oxygen saturation dropped to 88%. Immediate intervention required.',
        timestamp: '2025-01-15T11:45:00Z',
        status: 'unread',
        value: '88% SpO2'
      },
      {
        id: 7,
        patient: 'Robert Taylor',
        type: 'Cardiac Arrhythmia',
        severity: 'warning',
        message: 'Irregular heart rhythm detected. Continuous monitoring recommended.',
        timestamp: '2025-01-15T11:20:00Z',
        status: 'read',
        value: 'Irregular'
      },
      {
        id: 8,
        patient: 'Jennifer Martinez',
        type: 'Blood Sugar Alert',
        severity: 'warning',
        message: 'Blood glucose level is critically low. Check for hypoglycemia symptoms.',
        timestamp: '2025-01-15T10:55:00Z',
        status: 'unread',
        value: '55 mg/dL'
      },
      {
        id: 9,
        patient: 'Mark Thompson',
        type: 'Equipment Malfunction',
        severity: 'info',
        message: 'Monitoring device requires battery replacement within 2 hours.',
        timestamp: '2025-01-15T08:30:00Z',
        status: 'resolved',
        value: 'Battery: 15%'
      },
      {
        id: 10,
        patient: 'Amanda Clark',
        type: 'Medication Alert',
        severity: 'warning',
        message: 'Potential drug interaction detected. Review current medications.',
        timestamp: '2025-01-15T07:45:00Z',
        status: 'read',
        value: 'Interaction Risk'
      }
    ];

    console.log('Sending alerts data:', alertsData.length, 'records'); // Debug log
    res.json(alertsData);
  } catch (error) {
    console.error('Alerts API Error:', error);
    res.status(500).json({ message: 'Failed to fetch alerts data' });
  }
});


router.put('/alerts/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    console.log(`Updating alert ${id} status to: ${status}`);
    
    
    res.json({ 
      message: 'Alert updated successfully',
      id: parseInt(id),
      status 
    });
  } catch (error) {
    console.error('Alert update error:', error);
    res.status(500).json({ message: 'Failed to update alert' });
  }
});

// Protected route - delete alert
router.delete('/alerts/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log(`Deleting alert ${id}`);
    
    // In a real app, you would delete from the database here
    // For now, just return success
    res.json({ 
      message: 'Alert deleted successfully',
      id: parseInt(id)
    });
  } catch (error) {
    console.error('Alert delete error:', error);
    res.status(500).json({ message: 'Failed to delete alert' });
  }
});
// Logout endpoint
router.post('/logout', auth, async (req, res) => {
  try {
    console.log(`User ${req.user.name} (${req.user.email}) logged out at ${new Date()}`);
    
    res.json({
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
});

module.exports = router;