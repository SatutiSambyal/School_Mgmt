import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function TeacherUpdatePage() {
  const { id } = useParams(); // Get the teacher ID from the URL
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({ name: '', subject: '' });

  useEffect(() => {
    fetchTeacher();
  }, [id]);
  const apiBaseUrl = 'http://localhost:5000/api/teachers';
  const fetchTeacher = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/${id}`);
      setTeacher(response.data);
    } catch (error) {
      console.error('Error fetching teacher:', error);
    }
  };

  const updateTeacher = async () => {
    try {
      await axios.put(`${apiBaseUrl}/${id}`, teacher);
      navigate('/teacher'); // Redirect to the teacher module page after update
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  return (
    <div className="update-page">
      <h2>Update Teacher</h2>
      <input
        type="text"
        placeholder="Name"
        value={teacher.name}
        onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Subject"
        value={teacher.subject}
        onChange={(e) => setTeacher({ ...teacher, subject: e.target.value })}
      />
      <button onClick={updateTeacher}>Update</button>
    </div>
  );
}

export default TeacherUpdatePage;
