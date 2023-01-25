//css
import '../assets/css/accept.css' ;

function Accept() {
  return (
    <>
      <div className='accept-banner'>
        <img/>
      </div>
      <div className='container container-accept'>
        <div className='accept-head'>
          <h1 className='accept-head-title'>Check Crypto Default Swap</h1>
          <p className='accept-head-notice text-2xl font-semibold py-2'>Cehck Your Crypto Default Swap Contract in detail and sign it!</p>
          <hr className='line w-[150px] color-[var(--primary-color)]'/>
        </div>
        <div className='accept-form'>
          <div className='form-section'>
            <h2 className='section-title'>Address</h2>
            <div className='input-group'>
              <div className='input-button'>
                <input placeholder='Buyer Address' disabled/>
              </div>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Assets</h2>
            <div className='input-group'>
              <input placeholder='Initial Price of Assets' disabled/>
              <input placeholder='The Amount of Assets' disabled/>
              <input placeholder='Total Assets' disabled/>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Claim</h2>
            <div className='input-group'>
              <input placeholder='Claim Price' disabled/>
              <input placeholder='Drop Rate' disabled/>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Premium</h2>
            <div className='input-group'>
              <input placeholder='Premium Rate' disabled/>
              <input placeholder='Premium Price' disabled/>
              <div className='input-select'>
                <input placeholder='Premium Interval' disabled></input>
              </div>
              <input placeholder='Premium Rounds' disabled/>
            </div>
          </div>
          <div className='form-section'>
            <h2 className='section-title'>Liquiditaion</h2>
            <div className='input-group'>
              <input placeholder='Seller Deposit' disabled/>
              <input placeholder='Liquidated Price' disabled/>
              <input placeholder='Buyer Deposit' disabled/>
            </div>
          </div>
          <div className='form-section'>
            <div className='button-group'>
              <button className='accept-button'>Sign CDS</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Accept ;