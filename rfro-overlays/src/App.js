import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/Weather';
import PitWindow from './components/PitWindow';  // Import the new component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/pit" element={<PitWindow />} />  {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
