function Card() {
    return (
        <div className='card'>
            <div className='card-head'>
                <div className='cds-image'>
                    <img className='cds-icon'/>
                </div>
                <div className='cds-type'>
                    <h2>Bitcoin CDS</h2>
                </div>
            </div>
            <div className='card-body'>
                <div className='body-content'>
                    <h3 className='content-name'>Premium</h3>
                    <p className='content'>2 ETH (per 4 weeks)</p>
                </div>
                <div className='body-content'>
                    <h3 className='content-name'>Requested Seller Deposit</h3>
                    <p className='content'>100 ETH</p>
                </div>
                <div className='body-content'>
                    <h3 className='content-name'>Premium</h3>
                    <p className='content'>16 weeks later from sign</p>
                </div>
            </div>
        </div>
    )
}

export default Card;