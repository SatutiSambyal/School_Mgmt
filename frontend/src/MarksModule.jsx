import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MarksPage() {
  const [marks, setMarks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/marks/table');
      setMarks(response.data);
    } catch (error) {
      console.error('Error fetching marks:', error);
    }
  };

  return (
    <div>
      <h2>Marks Data</h2>
      <button className="form-button" onClick={() => navigate('/marks')}>Upload more Data</button>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {marks.map(mark => (
            <tr key={mark._id}>
              <td>{mark.studentId}</td> 
              <td>{mark.studentName}</td>
              <td>{mark.teacherName}</td>
              <td>{mark.subject}</td>
              <td>{mark.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarksPage;
