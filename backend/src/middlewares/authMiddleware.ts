
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users/user';
import { createResponse } from '../utils/apiResponse';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json(createResponse(401, 'Not authorized to access this route', null));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json(createResponse(401, 'Not authorized to access this route', null));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json(createResponse(401, 'Not authorized to access this route', null));
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.is_admin) {
    next();
  } else {
    res.status(403).json(createResponse(403, 'Not authorized as admin', null));
  }
};

export const shopOwner = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.is_shop_owner || req.user.is_admin)) {
    next();
  } else {
    res.status(403).json(createResponse(403, 'Not authorized as shop owner', null));
  }
};