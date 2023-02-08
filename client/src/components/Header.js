// modules
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// apis
import { getNonce, requestLogin, requestLogout } from '../apis/auth';

// Redux Actions
import { setAuth, resetAuth } from '../features/authSlice';

// hooks
import useMetamask from '../utils/hooks/useMetamask';

// css
import '../assets/css/header.css';

function Header() {
  const metamask = useMetamask();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.auth.isLogin);

  /********************/
  //     Handler      //
  /********************/

  // Contract & User Setting Handler
  const connectButtonHandler = async () => {
    const address = await metamask
      .request({ method: 'eth_requestAccounts' })
      .then((address) => address[0]);
    console.log(`user address: ${address}`);

    const nonce = await getNonce(address);

    console.log(nonce);

    if (!nonce) return new Error('Nonce is not valid');

    // sign nonce by address
    const signature = await metamask.request({
      method: 'personal_sign',
      params: [`sign: ${nonce}`, address],
    });

    // request login by signature
    const isSuccess = await requestLogin(address, signature);
    if (!isSuccess) {
      console.log(isSuccess);
      return;
    }

    dispatch(setAuth(address));
  };

  // Logout Handler
  const logoutButtonHandler = async () => {
    const result = await requestLogout();


    if(!result) {
      console.log(result);
      return;
    }

    dispatch(resetAuth());
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
          {isLogin ? (
            <Link to="/mypage">
              <li className="navbar-item mx-[1rem]">MyPage</li>
            </Link>
          ) : (
            <></>
          )}
          <Link>
            <li className="navbar-item mx-[1rem]">About</li>
          </Link>
          <Link to="/create">
            <li className="navbar-item mx-[1rem]">Create CDS</li>
          </Link>
        </ul>
        {isLogin ? (
          <button
            className="navbar-button hover:bg-mintHover transition delay-80 drop-shadow-md"
            onClick={logoutButtonHandler}
          >
            Log Out
          </button>
        ) : (
          <button
            className="navbar-button hover:bg-mintHover transition delay-80 drop-shadow-md"
            onClick={connectButtonHandler}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
