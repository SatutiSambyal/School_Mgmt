import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherModule() {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' });

  useEffect(() => {
    fetchTeachers();
  }, []);
  const apiBaseUrl = 'http://localhost:5000/api/teachers';
  const fetchTeachers = async () => {
    try {
      const response = await axios.get(apiBaseUrl);
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };
  
  const createTeacher = async () => {
    try {
      await axios.post(apiBaseUrl, newTeacher);
      setNewTeacher({ name: '', subject: '' });
      fetchTeachers();
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };
  const updateTeacher = async (id) => {
    try {
        window.location.href = `/teacher/update/${id}`;
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`${apiBaseUrl}/${id}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  return (
    <div className="teacher-module">
    <h2 className="title">Teacher Module</h2>
    <div className="create-teacher">
      <h3>Create Teacher</h3>
      <input
        className="input-field"
        type="text"
        placeholder="Name"
        value={newTeacher.name}
        onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Subject"
        value={newTeacher.subject}
        onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
      />
      <button className="create-button" onClick={createTeacher}>Create</button>
    </div>
    <br></br>
    <div className="teacher-list">
      <h3>Teachers</h3>
      <ul>
        {teachers.slice(0, 10).map((teacher) => (
          <li key={teacher._id} className="teacher-item">
            <h4>{teacher.name}</h4>
            <p>Subject: {teacher.subject}</p>
            <div className="actions">
              <button className="update-button" onClick={() => updateTeacher(teacher._id)}>Update</button>
              <button className="delete-button" onClick={() => deleteTeacher(teacher._id)}>Delete</button>
            </div>
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default TeacherModule;