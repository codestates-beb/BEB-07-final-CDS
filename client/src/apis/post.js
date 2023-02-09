// modules
import axios from 'axios';

// URL
import config from '../config/config';

// dummydata
const { postErrorDummy } = require('../assets/errorDummydata/postDummydata');

export async function postEmailData(changeEmail) {
  try {
    const requestURL = `${config.apiURL}/users/my`;

    const response = await axios.post(
      requestURL,
      {
        email: changeEmail,
      },
      { withCredentials: true },
    );
    return response;
  } catch (e) {
    return postErrorDummy;
  }
}

export async function postNicknameData(changeNickname) {
  try {
    const requestURL = `${config.apiURL}/users/my`;

    const response = await axios.post(
      requestURL,
      {
        nickname: changeNickname,
      },
      { withCredentials: true },
    );
    return response;
  } catch (e) {
    return postErrorDummy;
  }
}
