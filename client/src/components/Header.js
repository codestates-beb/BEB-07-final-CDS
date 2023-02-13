// modules
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ClickAwayListener from 'react-click-away-listener';

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

    if (!result) {
      console.log(result);
      return;
    }

    dispatch(resetAuth());
  };

  // About Menu
  const [popup, setPopup] = useState(false);

  return (
    <>
      <div className="header py-2 px-16 flex justify-between drop-shadow-md">
        <div className="header-logo-wrapper">
          <Link to="/" className="logo-link flex">
            <img
              className="service-logo  w-[3rem] h-[3rem]"
              alt="service-logo"
              src={
                process.env.PUBLIC_URL + '/img/CDS_Symbol_bright_removebg.png'
              }
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
                <li className="navbar-item mx-[1rem] hover:text-grayForText transition delay-80">
                  MyPage
                </li>
              </Link>
            ) : (
              <></>
            )}
            <a
              href="http://snowdelver.iptime.org:48080/"
              target="_blank"
              rel="noreferrer"
            >
              <li className="navbar-item mx-[1rem] hover:text-grayForText transition delay-80">
                Block Explorer
              </li>
            </a>
            <a
              href="http://snowdelver.iptime.org:43000/"
              target="_blank"
              rel="noreferrer"
            >
              <li className="navbar-item mx-[1rem] hover:text-grayForText transition delay-80">
                Node Monitor
              </li>
            </a>
            <div>
              <button
                className="navbar-item mx-[1rem] hover:text-grayForText transition delay-80"
                onClick={() => setPopup(true)}
              >
                About
              </button>
              <div className="absolute mt-[1rem] ml-[0.5rem]">
                {popup && (
                  <ClickAwayListener onClickAway={() => setPopup(false)}>
                    <div className="ballon">
                      <div className={'popup'}>
                        <Link to="/cds">
                          <p className="hover:text-darkGrayColor transition delay-80">
                            CDS
                          </p>
                        </Link>
                        <Link to="/risks">
                          <p className="hover:text-darkGrayColor transition delay-80">
                            DeFi Risks
                          </p>
                        </Link>
                        <Link to="/teams">
                          <p className="hover:text-darkGrayColor transition delay-80">
                            Teams
                          </p>
                        </Link>
                      </div>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>
            <Link to="/create">
              <li className="navbar-item mx-[1rem] hover:text-grayForText transition delay-80">
                Create CDS
              </li>
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
    </>
  );
}

export default Header;
