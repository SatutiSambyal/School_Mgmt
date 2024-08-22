const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  studentId:{ type: String, required: true },
  studentName: { type: String, required: true },
  teacherName: { type: String, required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
});

module.exports = mongoose.model('Marks', marksSchema);
