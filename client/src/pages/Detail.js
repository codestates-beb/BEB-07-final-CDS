// modules
import { useParams } from 'react-router-dom';

// components
import Card from '../components/Card';
import MarketPrice from '../components/MarketPrice';

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
            <p className='detail-issued'>Issued on Jan 22, 2023</p>
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
        <div className='detail-content-section'>
          <h2 className='content-section-title'>Claim</h2>
          <div className='content-box'>
            <div className='content-item'>
              <p className='item-name'>Claim Price</p>
              <p className='item-figures'>$ 150,000</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>Drop Rate</p>
              <p className='item-figures'>28.4 %</p>
            </div>
          </div>
        </div>
        <div className='detail-content-section'>
          <h2 className='content-section-title'>Premium</h2>
          <div className='content-box'>
            <div className='content-item'>
              <p className='item-name'>Premium Rate</p>
              <p className='item-figures'>2 %</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>Premium Price</p>
              <p className='item-figures'>$ 10,000</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>Premium Interval</p>
              <p className='item-figures'>6 months</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>Premium Rounds</p>
              <p className='item-figures'>4</p>
            </div>
          </div>
        </div>
        <div className='detail-content-section'>
          <h2 className='content-section-title'>Liquidation</h2>
          <div className='content-box'>
            <div className='content-item'>
              <p className='item-name'>Seller Deposit</p>
              <p className='item-figures'>$ 100,000</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>Liquidation Price</p>
              <p className='item-figures'>$ 10,964</p>
            </div>
            <div className='content-item'>
              <p className='item-name'>Buyer Deposit</p>
              <p className='item-figures'>$ 3,579</p>
            </div>
          </div>
        </div>
      </div>{/* content */}
      <div className='flex justify-center mt-16 py-14'>
        <hr className='line w-[720px] border-b-2 border-primaryColor' />
      </div>
      <div className='detail-tail flex justify-center mb-24'>
        <MarketPrice/>
      </div>
    </div>
  )
}

export default Detail;