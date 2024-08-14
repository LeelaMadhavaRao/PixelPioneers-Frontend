import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Sports } from './components/sports';
import { Sportspage } from './components/sportsCategory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/sportsPage' element={<Sportspage />} />
          <Route path='/sports' element={<Sports />} />
          <Route path='/sports/:type' element={<Sports />} /> {/* Corrected route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
