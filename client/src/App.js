// module
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';

// pages
import Create from './pages/Create';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Routes>
        <Route path="" element={<Create/>} />
      </Routes>
    </div>
  );
}

export default App;
