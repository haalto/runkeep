import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from './config';
import { verify } from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.get('Authorization')?.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  if (!decodedToken) {
    throw new Error('Token is not valid!');
  }

  res.locals.decodedToken = decodedToken;
  next();
};
