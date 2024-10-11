// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Weather from './components/Weather';
import './App.css'; // Ensure this is imported

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/weather" element={<div className="weather-container"><Weather /></div>} />
        <Route path="/" element={
          <div>
            <h1>RFRO Overlays</h1>
            <p>Visit the /weather route for the weather widget.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;