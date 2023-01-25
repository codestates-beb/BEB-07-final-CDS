// modules
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux actions
import { 
    setAuth,
    resetAuth,
} from '../../features/authSlice' ;


function useMetamask() {
    const [metamask, setMetamask] = useState();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!window.ethereum) {
            const err = new Error("No installed Metamask")
            console.log(err);
            return false;
        } else {
            window.ethereum.on('accountsChanged', accounts=>{
                console.log(accounts[0]);
                dispatch( setAuth(accounts[0]) );
            })
            setMetamask(window.ethereum);
        }
    }, [])

    return metamask;
}

export default useMetamask;