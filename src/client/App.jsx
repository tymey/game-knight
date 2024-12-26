import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Hello from './views/Home';
import Login from './views/Login';
import GameNights from './views/GameNights';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="home" element={<Hello />} />
        <Route path="gamenights" element={<GameNights />} />
      </Routes>
    </div>
  );
}

export default App;
