import redisClient from '../utils/redisClient';

async function isLoggedIn(req, res, next) {
  if (req.cookies.sessionID) {
    console.log('isLoggedIn triggered');
    console.log(req.cookies.sessionID);
    next();
  } else {
    return res.status(403).send('You need to login First');
  }
}

export default isLoggedIn;
