// module
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';

// pages
import Test from './pages/Test';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Routes>
        <Route path="" element={<Test/>} />
      </Routes>
    </div>
  );
}

export default App;
