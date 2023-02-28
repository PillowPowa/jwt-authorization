export interface SuccessCreateBody {
  accessToken: string;
  refreshToken: string;
  createdAt: number;
  user: UserPayload;
}

export interface UserPayload {
  id: string;
  email: string;
  username: string;
  isActivated: boolean;
}

export enum UserAgent {
  Tablet = 'tablet',
  Mobile = 'mobile',
  Desktop = 'desktop',
}

export interface RegistrationFormBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginFormBody {
  identifier: string;
  password: string;
}

type FormBody = RegistrationFormBody | LoginFormBody;

export interface ServerError<T extends FormBody> {
  param: keyof T;
  msg: string;
}