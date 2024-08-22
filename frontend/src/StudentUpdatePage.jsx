import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddMarksPage() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [marks, setMarks] = useState({
    student: '',
    studentId: '',
    teacher: '',
    teacherId: '',
    subject: '',
    marks: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students/fetch');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const addMarks = async () => {
    console.log("Marks object before submission:", marks);

    if (!marks.studentId || !marks.teacherId || !marks.subject || !marks.marks) {
      alert('All fields are required.');
      return;
    }

    const payload = {
      studentId: marks.studentId,
      studentName: marks.student,
      teacherId: marks.teacherId,
      teacherName: marks.teacher,
      subject: marks.subject,
      marks: marks.marks,
    };

    console.log("Payload before submission:", payload);

    try {
      await axios.post('http://localhost:5000/api/marks', payload);
      alert('Marks added successfully');
      navigateToMarksData(); // Redirect after successful addition
    } catch (error) {
      console.error('Error adding marks:', error.response ? error.response.data : error.message);
    }
  };

  const navigateToMarksData = () => {
    navigate('/show');
  };

  const handleStudentChange = (e) => {
    const selectedStudent = students.find(student => student.name === e.target.value);
    setMarks({
      ...marks,
      student: e.target.value,
      studentId: selectedStudent ? selectedStudent._id : ''
    });
  };

  const handleTeacherChange = (e) => {
    const selectedTeacher = teachers.find(teacher => teacher.name === e.target.value);
    setMarks({
      ...marks,
      teacher: e.target.value,
      teacherId: selectedTeacher ? selectedTeacher._id : ''
    });
  };

  return (
    <div className="add-marks-page">
      <h2>Add Marks Data</h2>

      <select
        className="form-select"
        onChange={handleStudentChange}
        value={marks.student}
      >
        <option value="">Select Student</option>
        {students.map(student => (
          <option key={student._id} value={student.name}>{student.name}</option>
        ))}
      </select>

      <select
        className="form-select"
        onChange={handleTeacherChange}
        value={marks.teacher}
      >
        <option value="">Select Teacher</option>
        {teachers.map(teacher => (
          <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
        ))}
      </select>

      <input
        type="text"
        className="form-input"
        placeholder="Subject"
        value={marks.subject}
        onChange={(e) => setMarks({ ...marks, subject: e.target.value })}
      />

      <input
        type="number"
        className="form-input"
        max="100"
        min="0"
        placeholder="Marks"
        value={marks.marks}
        onChange={(e) => setMarks({ ...marks, marks: e.target.value })}
      />

      <button className="form-button" onClick={addMarks}>Add Marks</button>
      <br />
      <button className="form-button" onClick={navigateToMarksData}>Added Data</button>
    </div>
  );
}

export default AddMarksPage;
