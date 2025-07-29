const mongoose = require('mongoose');
const User = require('./models/User');
const DiagnosticTest = require('./models/DiagnosticTest');
const Alert = require('./models/Alert');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/meditrek');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await DiagnosticTest.deleteMany({});
    await Alert.deleteMany({});
    console.log('Existing data cleared');

    // Create sample users
    const users = await User.create([
      {
        name: 'Sakhile Ndlazi',
        email: 'sakhile@monkeyandriver.com',
        password: 'password123',
        notificationThreshold: 7,
        emailNotifications: true
      },
      {
        name: 'Zethe Ndlazi',
        email: 'zethe@momentum.com',
        password: 'password123',
        notificationThreshold: 5,
        emailNotifications: false
      }
    ]);
    console.log('Users created:', users.length);

    // Create sample diagnostic tests
    const tests = await DiagnosticTest.create([
      {
        name: 'Blood Glucose Test',
        result: 'Normal - 95 mg/dL',
        date: new Date('2024-01-15'),
        userId: users[0]._id,
        status: 'completed',
        notes: 'Fasting blood glucose test performed'
      },
      {
        name: 'Cholesterol Panel',
        result: 'Elevated LDL - 160 mg/dL',
        date: new Date('2024-01-20'),
        userId: users[0]._id,
        status: 'completed',
        notes: 'Follow-up recommended in 3 months'
      },
      {
        name: 'Complete Blood Count',
        result: 'Pending analysis',
        date: new Date('2024-01-25'),
        userId: users[0]._id,
        status: 'pending',
        notes: 'Routine CBC ordered'
      },
      {
        name: 'Thyroid Function Test',
        result: 'Normal TSH - 2.1 uIU/mL',
        date: new Date('2024-02-01'),
        userId: users[1]._id,
        status: 'completed',
        notes: 'Annual thyroid screening'
      },
      {
        name: 'HbA1c Test',
        result: 'Elevated - 7.2%',
        date: new Date('2024-02-05'),
        userId: users[1]._id,
        status: 'completed',
        notes: 'Diabetes monitoring test'
      }
    ]);
    console.log('Diagnostic tests created:', tests.length);

    // Create sample alerts
    const alerts = await Alert.create([
      {
        title: 'Welcome to MediTrek!',
        message: 'Thank you for joining our health tracking platform. Start by adding your first diagnostic test.',
        type: 'info',
        priority: 'low',
        user: users[0]._id,
        isRead: false,
        isDismissed: false
      },
      {
        title: 'Blood Glucose Test Completed',
        message: 'Your blood glucose test results are now available. Click to view details.',
        type: 'success',
        priority: 'medium',
        user: users[0]._id,
        isRead: false,
        isDismissed: false
      },
      {
        title: 'Cholesterol Follow-up Required',
        message: 'Your LDL cholesterol is elevated. Please schedule a follow-up appointment with your doctor.',
        type: 'warning',
        priority: 'high',
        user: users[0]._id,
        isRead: false,
        isDismissed: false
      },
      {
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 2-4 AM. Some features may be temporarily unavailable.',
        type: 'info',
        priority: 'low',
        user: users[0]._id,
        isRead: true,
        isDismissed: false
      },
      {
        title: 'Welcome to MediTrek!',
        message: 'Thank you for joining our health tracking platform. Start by adding your first diagnostic test.',
        type: 'info',
        priority: 'low',
        user: users[1]._id,
        isRead: false,
        isDismissed: false
      },
      {
        title: 'HbA1c Test Results',
        message: 'Your HbA1c test shows elevated levels. Please consult with your healthcare provider.',
        type: 'error',
        priority: 'critical',
        user: users[1]._id,
        isRead: false,
        isDismissed: false
      }
    ]);
    console.log('Alerts created:', alerts.length);

    console.log('Seed data completed successfully!');
    console.log('\nSample login credentials:');
    console.log('Email: sakhile@monkeyandriver.com, Password: password123');
    console.log('Email: zethe@momentum.com, Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;
