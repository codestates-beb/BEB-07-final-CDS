// module
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';

// pages
import MakeTest from './pages/MakeTest';
import AcceptTest from "./pages/AcceptTest";

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="" element={<MakeTest/>} />
        <Route path="/accepTest/:swapId" element={<AcceptTest/>} />
      </Routes>
    </div>
  );
}

export default App;
