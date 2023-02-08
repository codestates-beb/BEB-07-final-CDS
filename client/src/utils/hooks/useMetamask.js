// modules
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux actions
import { 
    setAuth,
    resetAuth,
} from '../../features/authSlice' ;

// apis
import {
    getNonce,
    requestLogin,
    requestLogout,
} from '../../apis/auth';


function useMetamask() {
    const [metamask, setMetamask] = useState();
    const isLogin = useSelector(state=>state.auth.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!window.ethereum) {
            const err = new Error("No installed Metamask")
            console.log(err);
            return false;
        } else {
            window.ethereum.on('accountsChanged', async(accounts)=>{
                if(isLogin) {
                    const resultLogout = await requestLogout()
                };
                
                dispatch( resetAuth() );

                // Login auto
                // const nonce = await getNonce();

                // if(!nonce) return new Error('Nonce is not valid');

                // const signature = await window.ethereum.request({
                //     method: 'personal_sign', 
                //     params: [`sign: ${nonce}`, accounts[0] ] 
                // })

                // const resultLogin = await requestLogin(accounts[0], signature);
                // if(!resultLogin){
                //     console.log(resultLogin);
                //     return;
                // }
            })

            setMetamask(window.ethereum);
        }
    }, [])

    return metamask;
}

export default useMetamask;