import type {NextFunction} from 'express';
import type {Request, Response} from '../utils/types/AuthorizationTypes';
import {sendError} from './../utils/Util';
import ApiError from './../utils/ApiError';
import {StatusCode} from '../utils/types';
import TokenService from './../services/jwt.service';

export default function isAuthorizied(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader?.split(' ')[1];
    if (!accessToken) {
      throw new ApiError(StatusCode.UNAUTHORIZED, 'The user is not authorized');
    }
    const userData = TokenService.ValidateAccessToken(accessToken);
    if (!userData) {
      throw new ApiError(StatusCode.UNAUTHORIZED, 'The user is not authorized');
    }
    next();
  } catch (err) {
    sendError(err, res);
  }
}
