const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import the Student model

// Function to generate a unique student ID
function generateStudentId() {
  // Your logic to generate a unique student ID
  return `S${Date.now()}`;
}

// POST a new student with studentId
router.post('/', async (req, res) => {
  console.log(req.body); // Log the request body
  try {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      studentId: generateStudentId(), // Ensures studentId is set
    });
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // default to page 1, limit 10
  
  try {
    const students = await Student.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalStudents = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudents / limit);

    res.json({ students, totalPages, currentPage: parseInt(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET all students
router.get('/fetch', async (req, res) => {
  try {
    const students = await Student.find()
      .select('name studentId'); // Specify fields to include

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await student.deleteOne();
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
