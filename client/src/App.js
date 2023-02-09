// module
import React, { useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// apis
import { requestVerify } from './apis/auth';

// actions
import { setAuth } from './features/authSlice';

// hooks
import useMetamask from './utils/hooks/useMetamask';

// components
import Header from './components/Header';
import Notice from './components/Notice';
import ScrollToTop from './components/ScrollToTop';

// pages
import Main from './pages/Main';
import Create from './pages/Create';
import Accept from './pages/Accept';
import Detail from './pages/Detail';
import Mypage from './pages/Mypage';
import CardDisplayProposed from './pages/CardDisplayProposed';
import CardDisplayAccepted from './pages/CardDisplayAccepted';
import OracleTest from './pages/OracleTest';
import PageNotFound from './pages/PageNotFound';

// css
import './App.css';

function App() {
  const dispatch = useDispatch();
  const metamask = useMetamask();

  useEffect(() => {
    if (metamask) {
      (async () => {
        const isLoginSuccess = await requestVerify();

        if (!isLoginSuccess) {
          console.log(new Error('Not User Logined'));
          return;
        }

        const address = await metamask
          .request({ method: 'eth_requestAccounts' })
          .then((result) => result[0]);

        dispatch(setAuth(address));
      })();
    }
  }, [metamask]);

  return (
    <div className="App">
      <ScrollToTop />
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Notice />
    </div>
  );
}

export default App;
