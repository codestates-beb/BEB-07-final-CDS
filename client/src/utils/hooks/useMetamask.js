//modules
import { useState, useEffect } from 'react';

function useMetamask() {
    const [metamask, setMetamask] = useState();

    useEffect(()=>{
        if(!window.ethereum) {
            const err = new Error("No installed Metamask")
            console.log(err);
            return false;
        } else {
            setMetamask(window.ethereum);
        }
    }, [])

    return metamask;
}

export default useMetamask;