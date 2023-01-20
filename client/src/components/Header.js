// modules
import { Link } from 'react-router-dom';

// css
import '../assets/css/header.css'

function Header() {
  return (
    <div className="header py-2 px-4 flex justify-between">
      <div className="header-logo-wrapper">
        <Link link="/" className="logo-link">
            <img className="service-logo" />
            <div className="service-name">
              <p>Crypto</p>
              <p>Default Swap</p>
            </div>
        </Link>
      </div>
      <div className="navbar flex items-center">
        <ul className="navbar-wrapper flex">
          <Link><li className="navbar-item">MyPage</li></Link>
          <Link><li className="navbar-item">About</li></Link>
          <Link><li className="navbar-item">Create CDS</li></Link>
        </ul>
        <button>Connect Wallet</button>
      </div>
    </div>
  )
}

export default Header;
