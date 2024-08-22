import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentModule() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiBaseUrl = 'http://localhost:5000/api/students';
  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page) => {
    try {
      const response = await axios.get(apiBaseUrl, {
        params: { page, limit: 10 }
      });
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const createStudent = async () => {
    try {
      await axios.post(apiBaseUrl, newStudent);
      setNewStudent({ name: '', email: '' });
      fetchStudents();
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        
        console.error('No response received:', error.request);
      } else {
       
        console.error('Error setting up request:', error.message);
      }
      console.error('Axios error config:', error.config);
    }
  };
  const updateStudent = async (id) => {
    try {
      window.location.href = `/student/update/${id}`;
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleError = (error) => {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    console.error('Axios error config:', error.config);
  };


  return (
    <div className="student-module">
      <h2 className="title">Student Module</h2>
      <div className="create-student">
        <h3>Create Student</h3>
        <input
          className="input-field"
          type="text"
          placeholder="Name"
          name='name'
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          name='email'
          value={newStudent.email}
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <button className="create-button" onClick={createStudent}>Create</button>
      </div>
      <br />
      <div className="student-list">
        <h3>Students</h3>
        <ul>
        {Array.isArray(students) && students.length > 0 ? (
        students.map((student) => (
          <li key={student._id} className="student-item">
            <h4>{student.name}</h4>
            <p>Email: {student.email}</p>
            <div className="actions">
              <button className="update-button" onClick={() => updateStudent(student._id)}>Update</button>
              <button className="delete-button" onClick={() => deleteStudent(student._id)}>Delete</button>
            </div>
            <br />
          </li>
        ))
      ) : (
        <p>No students found or data is not an array.</p>
      )}
        </ul>
        <div className="pagination">
          <button 
            className="page-button" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            className="page-button" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentModule;
