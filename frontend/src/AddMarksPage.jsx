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
      console.log('Students fetched:', response.data);
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teachers');
      console.log('Teachers fetched:', response.data);
      setTeachers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    }
  };

  const addMarks = async () => {
    console.log("Marks object before submission:", marks);

    if (!marks.studentId || !marks.teacher || !marks.subject || !marks.marks) {
      alert('All fields are required.');
      return;
    }

    const payload = {
      studentId: marks.studentId,
      studentName: marks.student,
      teacherName: marks.teacher,
      subject: marks.subject,
      marks: marks.marks,
    };

    console.log("Payload before submission:", payload);

    try {
      await axios.post('http://localhost:5000/api/marks', payload);
      alert('Marks added successfully');
      navigate('/show'); // Redirect after successful addition
    } catch (error) {
      console.error('Error adding marks:', error.response ? error.response.data : error.message);
    }
  };

  const handleStudentChange = (e) => {
    const selectedStudent = students.find(student => student.name === e.target.value);
    setMarks({
      ...marks,
      student: e.target.value,
      studentId: selectedStudent ? selectedStudent.studentId : ''
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
        {students.length > 0 ? (
          students.map(student => (
            <option key={student.studentId} value={student.name}>
              {student.name}
            </option>
          ))
        ) : (
          <option value="">No students available</option>
        )}
      </select>

      <select
        className="form-select"
        onChange={handleTeacherChange}
        value={marks.teacher}
      >
        <option value="">Select Teacher</option>
        {teachers.length > 0 ? (
          teachers.map(teacher => (
            <option key={teacher._id} value={teacher.name}>{teacher.name}</option>
          ))
        ) : (
          <option value="">No teachers available</option>
        )}
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
      <button className="form-button" onClick={() => navigate('/show')}>View Added Data</button>
    </div>
  );
}

export default AddMarksPage;
