const express = require('express');
const Marks = require('./models/Marks');
const router = express.Router();

// Add marks
router.post('/', async (req, res) => {
    const { studentId, studentName, teacherId, teacherName, subject, marks } = req.body;

    if (!studentId || !studentName  || !teacherName || !subject || marks === undefined) {
      return res.status(400).json({ message: 'undefined fields' });
    }

    try {
      const newMarks = new Marks({ studentId, studentName, teacherId, teacherName, subject, marks });
      await newMarks.save();
      res.status(201).json(newMarks);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Get all marks
router.get('/table', async (req, res) => {
    try {
      const marks = await Marks.find()
      res.json(marks);
    } catch (err) {
      console.error('Error fetching marks:', err); // Log the error for debugging
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
