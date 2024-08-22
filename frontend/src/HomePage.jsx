import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="welcome-container">
      <h1>Welcome to the ABC School Management App</h1>
      <div className="role-selection">
        <h2>Select the task</h2>
        <div className="button-container">
          <Link to="/student">
            <button>Student Login</button>
          </Link>
          <Link to="/teacher">
            <button>Teacher Login</button>
          </Link>
          <Link to="/marks">
            <button>Upload Marks</button>
          </Link>
          <Link to="/show">
            <button>Uploaded Marks</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
