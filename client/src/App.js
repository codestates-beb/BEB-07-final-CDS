// module
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import Header from './components/Header';
import Notice from './components/Notice';

// pages
import Main from './pages/Main';
import Create from './pages/Create';
import Accept from './pages/Accept';
import Detail from './pages/Detail';
import Mypage from './pages/Mypage';
import CardDisplayProposed from './pages/CardDisplayProposed';
import CardDisplayAccepted from './pages/CardDisplayAccepted';
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
        <Route path="/cardAccepted" element={<CardDisplayAccepted />} />
      </Routes>
      <Notice />
    </div>
  );
}

export default App;
