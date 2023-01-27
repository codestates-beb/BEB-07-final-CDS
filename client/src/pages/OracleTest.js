// modules
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// hooks
import useOracle from '../utils/hooks/useOracle'

// utils
import { onlyNumber } from '../utils/validation';

function OracleTest () {
    const oracle = useOracle();
    const adminAddress = useSelector(state=>state.admin.address)
    const [currentPrice, setCurrentPrice] = useState(0);
    const [priceToUpdate, setPriceToUpdate] = useState(0);

    const setButtonHandler = async ()=>{
        console.log(`${adminAddress}: ${priceToUpdate}로 가격을 업데이트합니다.`);
        try {
            const result = await oracle.setPrice(priceToUpdate).send({from: adminAddress});
            setCurrentPrice(priceToUpdate);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        if(oracle){
            oracle.getPrice().call()
            .then(result=>{
                setCurrentPrice(result);
            });
        }
    }, [oracle])

    return (
        <div className='py-20 flex flex-col items-center'>
            <h1 className='text-5xl font-bold mb-10'>Oracle Price</h1>
            <div className='input-group'>
                <label>Current Price</label>
                <input className='text-right' value={currentPrice} disabled/>
            </div>
            <div className='input-group flex items-center'>
                <label className='mr-3'>Set Price</label>
                <input 
                    className='mr-3' 
                    onChange={e=>{
                        const result = onlyNumber(e.target.value);
                        setPriceToUpdate(result);
                    }}
                />
                <button 
                    className='p-4 bg-primaryColor rounded-xl'
                    onClick={setButtonHandler}
                >
                    Set
                </button>
            </div>
        </div>
    )
}

export default OracleTest;