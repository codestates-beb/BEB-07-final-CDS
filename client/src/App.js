// module
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';

// components
import Header from './components/Header';

// pages
import Main from './pages/Main';
import Create from './pages/Create';
import Accept from './pages/Accept';
import Detail from './pages/Detail';
import MakeTest from './pages/MakeTest';
import AcceptTest from './pages/AcceptTest';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<Create />} />
        <Route path="/accept" element={<Accept />} />
        <Route path='/detail' element={<Detail/>}/>
        <Route path="/createTest" element={<MakeTest />} />
        <Route path="/acceptTest/:swapId" element={<AcceptTest />} />
      </Routes>
    </div>
  );
}

export default App;
