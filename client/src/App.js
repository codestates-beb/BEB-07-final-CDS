// module
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';

// pages
import Main from './pages/Main';
import MakeTest from './pages/MakeTest';
import AcceptTest from "./pages/AcceptTest";

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/createTest' element={<MakeTest/>} />
        <Route path="/acceptTest/:swapId" element={<AcceptTest/>} />
      </Routes>
    </div>
  );
}

export default App;
