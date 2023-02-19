import type {Request, Response, APIErrorJSON} from './types/AuthorizationTypes';
import ApiError from './ApiError';
import {validationResult} from 'express-validator';
import {StatusCode} from './types/StatusCode';
import {UserAgent} from './types/types';

export function sendError(err: unknown, res: Response<APIErrorJSON>) {
  if (!(err instanceof ApiError)) {
    console.error(err);
    const apiErr = ApiError.unhandledError();
    return res.status(apiErr.code).json(apiErr.toJSON());
  }
  return res.status(err.code).json(err.toJSON());
}

export function validateRequest(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      StatusCode.BAD_REQUEST,
      'Validation error received',
      errors.array()
    );
  }
}

export function validateUserAgent(userAgent: UserAgent) {
  const validUserAgents = Object.values(UserAgent);
  if (!validUserAgents.some(agent => agent === userAgent)) {
    throw new ApiError(
      StatusCode.BAD_REQUEST,
      `Expected user agent to be [${validUserAgents}], got '${userAgent}'!`
    );
  }
}

export function getRefreshTokenFromCookies(cookies: unknown): string {
  if (
    !(typeof cookies === 'object') ||
    cookies === null ||
    !('refreshToken' in cookies) ||
    typeof cookies.refreshToken !== 'string'
  ) {
    throw new ApiError(StatusCode.UNAUTHORIZED, 'You need to log in to exit');
  }
  return cookies.refreshToken;
}
