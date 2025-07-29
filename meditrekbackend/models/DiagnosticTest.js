const mongoose = require('mongoose');

const diagnosticTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Test name is required'],
    trim: true
  },
  result: {
    type: String,
    required: [true, 'Test result is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Test date is required'],
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
diagnosticTestSchema.index({ userId: 1, date: -1 });
diagnosticTestSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('DiagnosticTest', diagnosticTestSchema);
