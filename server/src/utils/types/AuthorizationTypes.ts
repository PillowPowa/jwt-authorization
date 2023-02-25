import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import type * as core from 'express-serve-static-core';
import type {ValidationError} from 'express-validator/src/base';
import type {UserAgent, UserPayload} from './types';

export type Request<
  TBodyType extends RequestBodies = unknown,
  TParams extends RequestParams = undefined,
  TQuery extends RequestQueries = core.Query
> = ExpressRequest<
  TParams,
  unknown,
  TBodyType,
  TQuery,
  Record<string, unknown>
>;

type RequestBodies = RegistrationRequestBody | LoginRequestBody | unknown;
type RequestParams = ActivationRequestParam | undefined;
type RequestQueries = core.Query | RefreshRequestQuery;

export interface RegistrationRequestBody {
  email: string;
  username: string;
  password: string;
  userAgent: UserAgent;
}

export interface LoginRequestBody {
  identifier: string;
  password: string;
  userAgent: UserAgent;
}

export interface RefreshRequestQuery {
  userAgent: UserAgent;
}

export interface ActivationRequestParam {
  activationLink: string;
}

export type Response<TBodyType extends ResponseBodies = unknown> =
  ExpressResponse<TBodyType>;

type ResponseBodies = LogoutResponseBody | CreateResponseBody | unknown;

export type LogoutResponseBody =
  | {
      refreshToken: string | null;
      userAgent: UserAgent | null;
    }
  | APIErrorJSON;

export type CreateResponseBody = SuccessCreateBody | APIErrorJSON;

export interface SuccessCreateBody {
  accessToken: string;
  refreshToken: string;
  createdAt: number;
  user: UserPayload;
}

export interface APIErrorJSON {
  message: string;
  errors: ValidationError[];
}
