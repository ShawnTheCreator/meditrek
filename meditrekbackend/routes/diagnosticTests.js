const express = require('express');
const router = express.Router();
const DiagnosticTest = require('../models/DiagnosticTest');
const auth = require('../middleware/auth');

// Get all diagnostic tests for user
router.get('/', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { userId: req.user.id };
    if (status) query.status = status;

    const tests = await DiagnosticTest.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await DiagnosticTest.countDocuments(query);

    res.json({
      tests,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single diagnostic test
router.get('/:id', auth, async (req, res) => {
  try {
    const test = await DiagnosticTest.findOne({ _id: req.params.id, userId: req.user.id });
    if (!test) {
      return res.status(404).json({ message: 'Diagnostic test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new diagnostic test
router.post('/', auth, async (req, res) => {
  try {
    const { name, result, date, notes } = req.body;
    
    if (!name || !result) {
      return res.status(400).json({ message: 'Name and result are required' });
    }

    const test = new DiagnosticTest({
      name,
      result,
      date: date || new Date(),
      notes,
      userId: req.user.id
    });

    await test.save();
    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update diagnostic test
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, result, date, notes, status } = req.body;
    
    const test = await DiagnosticTest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { name, result, date, notes, status },
      { new: true, runValidators: true }
    );

    if (!test) {
      return res.status(404).json({ message: 'Diagnostic test not found' });
    }

    res.json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete diagnostic test
router.delete('/:id', auth, async (req, res) => {
  try {
    const test = await DiagnosticTest.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    
    if (!test) {
      return res.status(404).json({ message: 'Diagnostic test not found' });
    }

    res.json({ message: 'Diagnostic test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update test status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const test = await DiagnosticTest.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status },
      { new: true }
    );

    if (!test) {
      return res.status(404).json({ message: 'Diagnostic test not found' });
    }

    res.json(test);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
