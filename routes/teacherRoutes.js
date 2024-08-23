const express = require('express');
const router = express.Router();
const Teacher = require('./models/Teacher');

// GET all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new teacher
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher({
      name: req.body.name,
      subject: req.body.subject,
    });
    const newTeacher = await teacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
      res.json(teacher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update a teacher
  router.put('/:id', async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  
      teacher.name = req.body.name || teacher.name;
      teacher.subject = req.body.subject || teacher.subject;
  
      const updatedTeacher = await teacher.save();
      res.json(updatedTeacher);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
// DELETE a teacher
router.delete('/:id', async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id);
      if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  
      await teacher.deleteOne();
      res.json({ message: 'Teacher deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
