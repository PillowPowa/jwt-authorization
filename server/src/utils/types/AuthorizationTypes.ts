import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import type * as core from 'express-serve-static-core';
import type {UserAgent, UserPayload} from './types';
import type {StatusCode} from './StatusCode';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Request<TBodyType extends RequestBodies = unknown> = ExpressRequest<
  core.ParamsDictionary,
  any,
  TBodyType,
  core.Query,
  Record<string, any>
>;

type RequestBodies = RegistrationRequestBody | ActivationRequestBody | unknown;

export interface RegistrationRequestBody {
  email: string;
  username: string;
  password: string;
  userAgent: UserAgent;
}

export interface ActivationRequestBody {
  activationLink: string;
}

export type Response<TBodyType extends ResponseBodies> =
  ExpressResponse<TBodyType>;

type ResponseBodies =
  | RegistrationResponseBody
  | ActivationResponseBody
  | unknown;

export type RegistrationResponseBody = SuccessRegistrationBody | Error;

export interface SuccessRegistrationBody {
  accessToken: string;
  refreshToken: string;
  createdAt: number;
  user: UserPayload;
}

export type ActivationResponseBody = UserPayload | Error;

type Error = {message: string; code: StatusCode};
