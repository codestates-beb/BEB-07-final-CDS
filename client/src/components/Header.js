// modules
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Redux Actions
import { setAuth } from '../features/authSlice';

// hooks
import useMetamask from '../utils/hooks/useMetamask';

// css
import '../assets/css/header.css';

//image
import MainLogo from '../img/CDS_Symbol_bright_removebg.png';

function Header() {
  const metamask = useMetamask();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.auth.isLogin);

  // Contracdt & User Setting Handler
  const connectButtonHandler = async () => {
    const result = await metamask.request({ method: 'eth_requestAccounts' });
    console.log(result);
    if (result && result.length > 0) dispatch(setAuth(result[0]));
  };

  return (
    <div className="header py-2 px-16 flex justify-between">
      <div className="header-logo-wrapper">
        <Link to="/" className="logo-link flex">
          <img
            className="service-logo  w-[3rem] h-[3rem]"
            alt="service-logo"
            src={process.env.PUBLIC_URL + '/img/CDS_Symbol_bright_removebg.png'}
          />
          <div className="service-name">
            <p>Crypto</p>
            <p>Default Swap</p>
          </div>
        </Link>
      </div>
      <div className="navbar flex items-center">
        <ul className="navbar-wrapper mr-[2rem] flex">
          <Link>
            <li className="navbar-item mx-[1rem]">MyPage</li>
          </Link>
          <Link>
            <li className="navbar-item mx-[1rem]">About</li>
          </Link>
          <Link to="/createTest">
            <li className="navbar-item mx-[1rem]">Create CDS</li>
          </Link>
        </ul>
        {isLogin ? (
          <></>
        ) : (
          <button className="navbar-button" onClick={connectButtonHandler}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
