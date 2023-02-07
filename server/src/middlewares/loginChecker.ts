import { NextFunction, Request, Response } from 'express';

export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies.sessionID) {
    console.log('isLoggedIn triggered');
    console.log(req.cookies.sessionID);
    return next();
  } else {
    return res.status(403).send('You need to login First');
  }
}

export async function isNotLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies.sessionID) {
    console.log('isNotLoggedIn triggered');
    console.log(req.cookies.sessionID);
    return res.status(403).send('You are already logged in');
  } else {
    return next();
  }
}
