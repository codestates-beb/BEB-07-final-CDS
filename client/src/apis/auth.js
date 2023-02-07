//modules
import axios from 'axios';

//config
import config from '../config/config';

// Get nonce data for Login
export async function getNonce(address) {
    const requestURL = new URL(`${config.apiURL}/auth/nonce`);
    const params = requestURL.searchParams;
    params.append("address", address);

    const result = await axios.get(requestURL.toString())
    .then(result=>result.data.nonce)
    .catch(err=>err);

    return result;
}

// Request login to Server
export async function requestLogin(address, signature) {
    const requestURL = new URL(`${config.apiURL}/auth/login`);
    
    const result = await axios.post(
        requestURL.toString(), 
        {address, signature},
        {withCredentials: true}
    )
    .then(result=>result)
    .catch(err=>{
        console.log(err.response)
        return false;
    });

    return result;
}

export async function requestLogout() {
    const requestURL = new URL(`${config.apiURL}/auth/logout`);

    const result = await axios.get(requestURL, {withCredentials:true})
    .then(result=>result)
    .catch(err=> {
        console.log(err);
        return false;
    })

    return result;
}

export async function requestVerify() {
    const requestURL = new URL(`${config.apiURL}/auth/verify`);

    const result = await axios.get(
        requestURL.toString(),
        {withCredentials: true}
    )
    .then(result=>result)
    .catch(err=>{
        console.log(err);
        return false;
    })

    return result;
}

export async function requestMyData() {
    const requestURL = new URL(`${config.apiURL}/users/my`);

    const result = await axios.get(requestURL.toString(), {withCredentials:true})
    .then(result=>result.data)
    .catch(err=>err);

    return result;
}