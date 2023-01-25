// modules
import { useParams } from 'react-router-dom';

// components
import Card from '../components/Card';

// css
import '../assets/css/detail.css';

function Detail() {
  const {swapId} = useParams();

  return (
    <div className='container container-detail'>
      <div className='detail-head'>
        <div className='detail-head-section'>
          <div className='detail-title-group'>
            <h1 className='detail-title'>Bitcoin Crypto Default Swap</h1>
            <p className='detail-issued'>Issued On Jan 22, 2023</p>
          </div>
          <div className='detail-party'>
            <div className='party-item'>
              <p className='party-role'>Buyer Address</p>
              <p className='party-address'>0x247b669CbDD58FCa982DBf337C5D94880852E3Fa</p>
            </div>
            <div className='party-item'>
              <p className='party-role'>Seller Address</p>
              <p className='party-address'>0x734c49630caC28EaaC33e9722268e64cA80AbcFd</p>
            </div>
          </div>
        </div>
        <div className='detail-head-section'>
          <Card />
        </div>
      </div>{/* head */}
      <div className='detail-content'>
        <div className='detail-content-section'>
          <h2 className='content-section-title'>Assets</h2>
          <div className='content-box'>
            <div className='content-item'>
              <p className='item-name'>Initial Price of Assets</p>
              <p className='item-figures'>$ 20,964</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>The Amount of Assets</p>
              <p className='item-figures'>10</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>Total Assets</p>
              <p className='item-figures'>$ 209,640</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail;