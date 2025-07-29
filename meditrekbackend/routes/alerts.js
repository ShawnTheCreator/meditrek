const express = require('express');
const Alert = require('../models/Alert');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);

// GET /api/alerts - Get all alerts for the authenticated user
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, read, dismissed, type, priority } = req.query;
    
    // Build filter object
    const filter = { user: req.user._id };
    
    if (read !== undefined) {
      filter.isRead = read === 'true';
    }
    
    if (dismissed !== undefined) {
      filter.isDismissed = dismissed === 'true';
    }
    
    if (type) {
      filter.type = type;
    }
    
    if (priority) {
      filter.priority = priority;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get alerts with pagination
    const alerts = await Alert.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('user', 'name email');

    // Get total count for pagination
    const total = await Alert.countDocuments(filter);

    res.json({
      alerts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalAlerts: total,
        hasNextPage: skip + alerts.length < total,
        hasPrevPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ message: 'Error fetching alerts', error: error.message });
  }
});

// GET /api/alerts/:id - Get single alert
router.get('/:id', async (req, res) => {
  try {
    const alert = await Alert.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('user', 'name email');

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json(alert);
  } catch (error) {
    console.error('Error fetching alert:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid alert ID' });
    }
    res.status(500).json({ message: 'Error fetching alert', error: error.message });
  }
});

// PATCH /api/alerts/:id/read - Mark alert as read
router.patch('/:id/read', async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      {
        isRead: true,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('user', 'name email');

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({
      message: 'Alert marked as read',
      alert
    });
  } catch (error) {
    console.error('Error marking alert as read:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid alert ID' });
    }
    res.status(500).json({ message: 'Error marking alert as read', error: error.message });
  }
});

// PATCH /api/alerts/:id/dismiss - Dismiss alert
router.patch('/:id/dismiss', async (req, res) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      {
        isDismissed: true,
        updatedAt: new Date()
      },
      { new: true }
    ).populate('user', 'name email');

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({
      message: 'Alert dismissed',
      alert
    });
  } catch (error) {
    console.error('Error dismissing alert:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid alert ID' });
    }
    res.status(500).json({ message: 'Error dismissing alert', error: error.message });
  }
});

// POST /api/alerts - Create new alert
router.post('/', async (req, res) => {
  try {
    const { title, message, type, priority, expiresAt } = req.body;

    // Validate required fields
    if (!title || !message) {
      return res.status(400).json({ 
        message: 'Title and message are required' 
      });
    }

    // Validate type if provided
    if (type && !['info', 'warning', 'error', 'success'].includes(type)) {
      return res.status(400).json({ 
        message: 'Type must be one of: info, warning, error, success' 
      });
    }

    // Validate priority if provided
    if (priority && !['low', 'medium', 'high', 'critical'].includes(priority)) {
      return res.status(400).json({ 
        message: 'Priority must be one of: low, medium, high, critical' 
      });
    }

    // Create new alert
    const alert = new Alert({
      title,
      message,
      type: type || 'info',
      priority: priority || 'medium',
      user: req.user._id,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });

    await alert.save();
    
    // Populate user info
    await alert.populate('user', 'name email');

    res.status(201).json({
      message: 'Alert created successfully',
      alert
    });
  } catch (error) {
    console.error('Error creating alert:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ message: 'Error creating alert', error: error.message });
  }
});

// Additional utility endpoints

// GET /api/alerts/unread/count - Get count of unread alerts
router.get('/unread/count', async (req, res) => {
  try {
    const count = await Alert.countDocuments({
      user: req.user._id,
      isRead: false,
      isDismissed: false
    });

    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Error counting unread alerts:', error);
    res.status(500).json({ message: 'Error counting unread alerts', error: error.message });
  }
});

// PATCH /api/alerts/read-all - Mark all alerts as read
router.patch('/read-all', async (req, res) => {
  try {
    const result = await Alert.updateMany(
      {
        user: req.user._id,
        isRead: false,
        isDismissed: false
      },
      {
        isRead: true,
        updatedAt: new Date()
      }
    );

    res.json({
      message: 'All alerts marked as read',
      updatedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error marking all alerts as read:', error);
    res.status(500).json({ message: 'Error marking all alerts as read', error: error.message });
  }
});

module.exports = router; 