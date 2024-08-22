import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import StudentModule from './StudentModule';
import TeacherModule from './TeacherModule';
import MarksModule from './MarksModule';
import AddMarksPage from './AddMarksPage';
import StudentUpdatePage from './StudentUpdatePage';
import TeacherUpdatePage from './TeacherUpdatePage';
import { Navbar,  Button, Container } from 'react-bootstrap';
import './App.css'

function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}

function AppWithRouter() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/'); 
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href="/" className="navbar-brand">ABC School </Navbar.Brand>
          
            <Button  onClick={handleExit}>
              Exit
            </Button>
          
        </Container>
      </Navbar>

      {/* Routes */}
      <Container className="container-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/student" element={<StudentModule />} />
          <Route path="/teacher" element={<TeacherModule />} />
          <Route path="/marks" element={< AddMarksPage />} />
          <Route path="/show" element={<MarksModule />} />
          <Route path="/student/update/:id" element={<StudentUpdatePage />} />
        <Route path="/teacher/update/:id" element={<TeacherUpdatePage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;