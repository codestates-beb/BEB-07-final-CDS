// modules
import axios from 'axios';

// URL
import config from '../config/config';

export async function postEmailData(changeEmail) {
  try {
    const requestURL = `${config.apiURL}/users/my`;

    const response = await axios.post(requestURL, {
      email: changeEmail,
    });
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
}
