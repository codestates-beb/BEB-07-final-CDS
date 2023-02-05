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
import Mypage from './pages/Mypage';
import CardDisplayProposed from './pages/CardDisplayProposed';
import OracleTest from './pages/OracleTest';

// css
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/create" element={<Create />} />
        <Route path="/accept/:swapId" element={<Accept />} />
        <Route path="/detail/:swapId" element={<Detail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/oracleTest" element={<OracleTest />} />
        <Route path="/cardProposed" element={<CardDisplayProposed />} />
        <Route path="/cardAccepted" element={<CardDisplayProposed />} />
      </Routes>
    </div>
  );
}

export default App;
