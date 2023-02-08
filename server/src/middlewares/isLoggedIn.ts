function isLoggedIn(req, res, next) {
  if (req.session.address) {
    console.log(req.session.address);
    next();
  } else {
    return res.status(403).send('You need to login First');
  }
}

export default isLoggedIn;
